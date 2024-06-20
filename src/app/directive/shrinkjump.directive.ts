import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { InterceptionDirective } from './interception.directive';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[shrinkjump]',
  standalone: true,
  host: {
    class: 'shrink-jump',
  },
})
export class ShrinkjumpDirective implements OnDestroy, OnInit {
  @Input() delay: number = 0;
  private destroy$ = new Subject<void>();
  private timeout: any;
  private done:boolean = false;

  constructor(
    private parent: InterceptionDirective,
    private el: ElementRef,
    private render: Renderer2
  ) {}

  ngOnInit(): void {
    this.parent.visible.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value && this.done===false) {
        this.timeout = setTimeout(() => {
          this.render.addClass(this.el.nativeElement, 'active');
        }, this.delay);
        this.done = true;
      } else {
        clearTimeout(this.timeout);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    event.preventDefault();
    this.render.addClass(this.el.nativeElement, 'active');
  }

  @HostListener('animationend', ['$event'])
  animationend(event: Event): void {
    event.preventDefault();
    this.render.removeClass(this.el.nativeElement, 'active');
  }
}

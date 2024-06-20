import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { InterceptionDirective } from './interception.directive';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[drop]',
  standalone: true,
  host: {
    class: 'drop',
  },
})
export class DropDirective implements OnDestroy, OnInit {
  @Input() delay: number = 0;
  private destroy$ = new Subject<void>();
  private timeout!: NodeJS.Timeout;
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
        //this.render.removeClass(this.el.nativeElement, 'active');
        clearTimeout(this.timeout);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

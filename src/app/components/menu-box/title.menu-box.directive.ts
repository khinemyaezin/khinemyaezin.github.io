import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BarDirective } from '../../directive/bars/bar.directive';

@Directive({
  selector: '[titleMenuBox]',
  standalone: true,
})
export class TitleMenuBoxDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  constructor(private bar: BarDirective, private el:ElementRef, private render:Renderer2) {}

  ngOnInit(): void {
    this.bar.expend
    .pipe(takeUntil(this.destroy$))
    .subscribe((value) => {
      if(value) this.render.addClass(this.el.nativeElement, "expend");
      else this.render.removeClass(this.el.nativeElement, "expend");
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

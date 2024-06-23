import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
} from "@angular/core";
import { InterceptionDirective } from "./interception.directive";
import { Subject, takeUntil } from "rxjs";

@Directive({
  selector: "[aos]",
  standalone: true,
})
export class AosDirective implements AfterViewInit, OnDestroy {
  @Input() dataDepth: number = 0;
  @Input() initValue: number = 0;
  private destroy$ = new Subject<void>();

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private intercept: InterceptionDirective
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.setTranslateX(this.el.nativeElement, -100);

    this.intercept.scrollPercentage
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.setParallax(this.el.nativeElement, value);
      });
  }

  private setTranslateX(element: HTMLElement, value: number) {
    this.renderer.setStyle(element, "transform", `translateX(${value}%)`);
  }

  setParallax(element: any, value: { percentage: number; value: number }) {
    console.log(value.percentage);
    
    let transform = Math.min(
      -value.percentage * (this.dataDepth > 0 ? this.dataDepth : 1),
      0
    );
    this.setTranslateX(element, transform);
  }
}

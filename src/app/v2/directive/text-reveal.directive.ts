import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
} from "@angular/core";
import { IntersectionDirective } from "./intersection.directive";
import { Subject, takeUntil } from "rxjs";

@Directive({
  selector: "[textReveal]",
  standalone: true,
  host: {
    class: "text__reveal",
  },
})
export class TextRevealDirective implements AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private element: ElementRef,
    private render: Renderer2,
    private intersection: IntersectionDirective
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    let string = this.element.nativeElement.innerText;

    this.render.setProperty(this.element.nativeElement, "innerHTML", "");

    let spanList: any[] = [];

    for (let i = 0; i < string.length; i++) {
      const span = this.render.createElement("span");
      const text = this.render.createText(string[i]);
      this.render.appendChild(span, text);
      spanList.push(span);
      this.render.appendChild(this.element.nativeElement, span);
    }

    this.intersection.visible
      .pipe(takeUntil(this.destroy$))
      .subscribe((visible) => {
        for (let i = 0; i < spanList.length; i++) {
          if (visible) {
            setTimeout(() => {
              this.render.setStyle(spanList[i], "transform", `translateY(0)`);
            }, (i + 1) * 50);
          } else {
            this.render.setStyle(spanList[i], "transform", `translateY(110%)`);
          }
        }
      });
  }
}

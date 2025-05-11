import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  Renderer2,
} from "@angular/core";
import { SmoothScroll } from "../lb/smooth-scroll";
import { SmoothScrollV1 } from "../lb/smooth-scroll-1.0";

@Directive({
  selector: "[scrollEmitter]",
  standalone: true,
})
export class ScrollEmitterDirective {
  @Output() scrollChange = new EventEmitter<any>();
  private smoothScroll!: SmoothScroll;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.smoothScroll = new SmoothScrollV1(el, renderer);
    this.smoothScroll.scrollChangeEvent(this.scrollChange);
  }

  @HostListener("touchstart", ["$event"])
  onTouchStart(event: TouchEvent) {
    event.preventDefault();
    const normalizedDelta = this.smoothScroll.normalizeWheelDelta(event);
    this.smoothScroll.updateTarget(normalizedDelta);
    this.smoothScroll.startAnimation();
  }

  @HostListener("touchmove", ["$event"])
  onTouchMove(event: TouchEvent) {
    event.preventDefault();
    const normalizedDelta = this.smoothScroll.normalizeWheelDelta(event);
    this.smoothScroll.updateTarget(normalizedDelta);
    this.smoothScroll.startAnimation();
  }

  @HostListener("touchend", ["$event"])
  onTouchEnd(event: TouchEvent) {
    event.preventDefault();
    (this.smoothScroll as SmoothScrollV1).reset();
  }

  @HostListener("wheel", ["$event"])
  onScrollWheel(event: WheelEvent) {
    event.preventDefault();
    const normalizedDelta = this.smoothScroll.normalizeWheelDelta(event);
    this.smoothScroll.updateTarget(normalizedDelta);
    this.smoothScroll.startAnimation();
  }
}

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
export class ScrollEmitterDirective{
  @Output() scrollChange = new EventEmitter<any>();
  private smoothScroll!:SmoothScroll;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.smoothScroll = new SmoothScrollV1(el,renderer);
    this.smoothScroll.scrollChangeEvent(this.scrollChange);
  }

  @HostListener("scroll", ["$event"])
  onTouchMove(event: Event) {
    event.preventDefault();
    const normalizedDelta = 0;
    this.smoothScroll.updateTarget(normalizedDelta);
    this.smoothScroll.startAnimation();
  }


  @HostListener("wheel", ["$event"])
  onScrollWheel(event: WheelEvent) {
    event.preventDefault();
    const normalizedDelta = this.smoothScroll.normalizeWheelDelta(event);
    this.smoothScroll.updateTarget(normalizedDelta);
    this.smoothScroll.startAnimation();
  }
}

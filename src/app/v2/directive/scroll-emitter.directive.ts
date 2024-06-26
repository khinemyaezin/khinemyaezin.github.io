import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from "@angular/core";

@Directive({
  selector: "[scrollEmitter]",
  standalone: true,
})
export class ScrollEmitterDirective {
  @Output() scrollChange = new EventEmitter<any>();
  @Input() speed = 1.5;
  @Input() smooth = 12;

  pos = 0;
  moving = false;
  lastKnownScrollPosition = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener("scroll", ["$event"])
  onTouchMove(event: Event) {
    //console.log("scroll.");
    this.filterScrollEvent(0);
  }

  @HostListener("wheel", ["$event"])
  onScrollWheel(event: WheelEvent) {
    event.preventDefault();
    //console.log("whell move.");
    this.filterScrollEvent(event.deltaY);
  }

  filterScrollEvent(delta: number) {
    if (delta == 0) {
      this.scrollChange.emit();
    } else {
      const normalizedDelta = this.normalizeWheelDelta(delta);
      this.setPostion(normalizedDelta);
      if (!this.moving) {
        this.updateScroll(() => this.scrollChange.emit());
      }
    }
  }

  setPostion(normalizedDelta: number) {
    const target = this.el.nativeElement;
    const frame = target === document.body ? document.documentElement : target;
    this.pos += normalizedDelta * this.speed;

    // Limit scrolling to element boundaries
    this.pos = Math.max(
      0,
      Math.min(this.pos, target.scrollHeight - frame.clientHeight)
    );
  }

  normalizeWheelDelta(delta: number) {
    const withDetail = Math.abs(delta) < 120;
    return delta / (withDetail ? 3 : 120);
  }

  updateScroll(callback: Function | undefined) {
    this.moving = true;
    const target = this.el.nativeElement;

    const delta = (this.pos - target.scrollTop) / this.smooth;
    const result = target.scrollTop + delta;

    this.renderer.setProperty(target, "scrollTop", result);

    const i = Math.abs(delta);
    if (i > 1) {
      requestAnimationFrame(() => {
        this.updateScroll(callback);
        if (callback) callback();
      });
    } else {
      this.moving = false;
    }
  }
}

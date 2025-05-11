import { ElementRef, EventEmitter, Renderer2 } from "@angular/core";
import { SmoothScroll } from "./smooth-scroll";

export class SmoothScrollV1 implements SmoothScroll {
    scrollChange!: EventEmitter<any>;
    private targetPos = 0;
    private moving = false;
    private lastTouchY: number = 0;
    private isTouchStart: boolean = true;

    private speed = 0.7;
    private smooth = 30;
    private momentumFactor = 0.85;
    private minDelta = 0.5;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    scrollChangeEvent(scrollEvent: EventEmitter<any>) {
        this.scrollChange = scrollEvent;
    }

    filterScrollEvent(delta: WheelEvent) {
        delta.preventDefault();
        const normalizedDelta = this.normalizeWheelDelta(delta);
        this.updateTarget(normalizedDelta);
        this.startAnimation();
    }

    normalizeWheelDelta(delta: WheelEvent | TouchEvent): number {
        if (delta instanceof WheelEvent) {
            console.log("Wheel event detected");
            let wheelDelta = delta.deltaY;
            switch (delta.deltaMode) {
                case WheelEvent.DOM_DELTA_LINE:  // Mouse wheel (line mode)
                    wheelDelta *= 40;  // Convert lines to pixels
                    break;
                case WheelEvent.DOM_DELTA_PAGE:  // Page scroll
                    wheelDelta *= this.el.nativeElement.clientHeight;
                    break;
            }
            return wheelDelta * (delta.deltaMode === WheelEvent.DOM_DELTA_LINE ? 0.4 : 1);

        } else if (delta instanceof TouchEvent) {
            console.log("Touch event detected");
            const touchEvent = delta;
            const currentTouchY = touchEvent.touches[0].clientY;

            if (this.isTouchStart) {
                this.lastTouchY = currentTouchY;
                this.isTouchStart = false;
                return 0;
            }

            const deltaY = this.lastTouchY - currentTouchY;
            this.lastTouchY = currentTouchY;

            // Adjust touch sensitivity
            const touchSensitivity = 1.5;
            return deltaY * touchSensitivity;
        }
        return 0;
    }

    // Call this method when touch ends to reset the touch state
    reset() {
        this.isTouchStart = true;
        this.lastTouchY = 0;
    }

    updateTarget(delta: number) {
        const element = this.el.nativeElement;
        const maxScroll = element.scrollHeight - element.clientHeight;

        this.targetPos += delta * this.speed;
        this.targetPos = Math.max(0, Math.min(this.targetPos, maxScroll));
    }

    startAnimation() {
        if (this.moving) return;

        this.moving = true;
        this.animate();
    }

    private animate() {
        const element = this.el.nativeElement;
        const currentScroll = element.scrollTop;

        const delta = (this.targetPos - currentScroll) * this.momentumFactor;
        const newPos = currentScroll + delta / this.smooth;

        this.renderer.setProperty(element, 'scrollTop', newPos);
        this.scrollChange.emit(newPos);

        if (Math.abs(delta) > this.minDelta) {
            requestAnimationFrame(() => this.animate());
        } else {
            this.moving = false;
        }
    }
}
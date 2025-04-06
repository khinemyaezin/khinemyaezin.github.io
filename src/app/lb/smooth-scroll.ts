import { EventEmitter } from "@angular/core";

export interface SmoothScroll {
    filterScrollEvent(delta: WheelEvent): any;
    scrollChangeEvent(event:EventEmitter<any>):any;
    normalizeWheelDelta(delta: WheelEvent):any;
    updateTarget(delta: number):any;
    startAnimation():any;
}
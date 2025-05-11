import { EventEmitter } from "@angular/core";

export interface SmoothScroll {
    scrollChangeEvent(event:EventEmitter<any>):any;
    reset():any;
    normalizeWheelDelta(event:WheelEvent|TouchEvent):number;
    updateTarget(delta: number):any;
    startAnimation():any;
}
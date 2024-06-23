import { AfterViewInit, Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { BarDirective } from './bar.directive';
import { InterceptionDirective } from '../interception.directive';
import { Subject, filter, takeUntil } from 'rxjs';
import { BackgroundBarDirective } from './background.bar.directive';

@Directive({
  selector: '[bars]',
  standalone: true
})
export class BarsDirective implements AfterViewInit {
  private bars: BackgroundBarDirective[] = [];
  private destroy$ = new Subject<void>();
  
  constructor(
    //private intersection: InterceptionDirective
     private el:ElementRef, private render:Renderer2) {

  }

  ngAfterViewInit(): void {
    this.intersect();
  
   }

  addChild(bar: BackgroundBarDirective) {
    this.bars.push(bar);
  }

  distributePercentages() {
    let n = this.bars.length;
    let heights = [];
    let totalHeight = 30; // Total percentage to be shared among items
    let decrement = totalHeight / ((n * (n - 1)) / 2); // Dynamic decrement

    for (let i = 0; i < n; i++) {
        let currentHeight = 100 - (i * decrement);
        heights.push(currentHeight);
    }
    return heights;
  }

  intersect() {
    // if( this.intersection ) {
    //   this.intersection.visible
    //   .pipe(
    //     filter(value=> value),
    //     takeUntil(this.destroy$)
    //   )
    //   .subscribe(() => {
    //     this.render.addClass(this.el.nativeElement, "expend")
    //   });
    // }
  }

}

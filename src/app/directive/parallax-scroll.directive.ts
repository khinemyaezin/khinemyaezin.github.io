import {
  AfterContentInit,
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';

export interface ParallaxScrollValues {
  max: number;
  value: number;
  scrollValue:number;
}

@Directive({
  selector: '[parallaxScroll]',
  standalone: true,
  host:{
    class:"parallax-container"
  }
})
export class ParallaxScrollDirective
  implements AfterViewInit, OnInit, AfterContentInit
{
  @Output() scrollChange = new EventEmitter<ParallaxScrollValues>();

  private ticking = false;

  public scVal: ParallaxScrollValues = {
    max: 0,
    value: 0,
    scrollValue:0
  };

  constructor(private el: ElementRef) {}

  ngAfterContentInit(): void {
    const value = this.calculateScrollValues(this.el.nativeElement, 0);
    this.insertScrollLeft(value);
    this.scVal = value;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: Event): void {
    event.preventDefault();

    const value = this.calculateScrollValues(this.el.nativeElement, 0);
    this.insertScrollLeft(value);
    this.scVal = value;

    if (this.isReachEdge()) return;

    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.scrollChange.emit(value);
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    event.preventDefault();
  
    const value = this.calculateScrollValues(
      this.el.nativeElement,
      event.deltaY
    );
    this.insertScrollLeft(value);
    
    this.scVal = value;

    if (this.isReachEdge()) return;    

    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.scrollChange.emit(value);
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  private isReachEdge() {
    return this.scVal.value < 0 || this.scVal.value > this.scVal.max;
  }

  private calculateScrollValues(
    scrCont: any,
    scrollValue: number
  ): ParallaxScrollValues {
    
    const max = scrCont.scrollWidth - scrCont.clientWidth;
    const value = scrCont.scrollLeft + scrollValue;

    const scrollValues: ParallaxScrollValues = {
      max: max,
      value: value < 0 ? 0 : value,
      scrollValue: scrollValue
    };
    return scrollValues;
  }

  private insertScrollLeft(value: ParallaxScrollValues) {
    this.el.nativeElement.scrollLeft = value.value;
  }
}

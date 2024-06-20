import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  ParallaxScrollDirective,
  ParallaxScrollValues,
} from './parallax-scroll.directive';

@Directive({
  selector: '[parallaxItem]',
  standalone: true,
  host: {
    class: 'parallax-image',
  },
})
export class ParallaxItemDirective implements OnInit, AfterViewInit {
  @Input() dataDepth: number = 0;
  @Input() initValue: number = 0;
  @Input() axis: string = 'x';
  @Input() setDefaultPosition: boolean = false;
  @Input() direction: string = 'right';

  private rect: any;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private parent: ParallaxScrollDirective
  ) {}

  ngOnInit(): void {
    this.parent.scrollChange.subscribe((value) => {
      this.setParallax(value);
    });
  }

  ngAfterViewInit(): void {
    if (this.setDefaultPosition) {
      this.rect = this.el.nativeElement?.getBoundingClientRect();
      const scrollValue = this.parent.scVal;
      this.setPositionByPercentage(scrollValue);
    } else {
      this.setPosition();
    }
  }

  get getEl() {
    return this.el;
  }

  setPositionByPercentage(value: ParallaxScrollValues) {
    const scrollPercentage = (this.rect.left / value.max) * 100;
    const width = (scrollPercentage / 100) * this.el.nativeElement.clientWidth;
    this.initValue = -width;
    if (this.dataDepth > 0) this.initValue * this.dataDepth;
    this.setTranslateX(this.el.nativeElement, this.initValue);
  }

  setPosition() {
    this.setTranslateX(this.el.nativeElement, this.initValue);
  }

  setParallax(value: ParallaxScrollValues) {
    const element = this.el.nativeElement;
    const scrollPercentage = (value.value / value.max) * 100;
    const width = (scrollPercentage / 100) * this.el.nativeElement.clientWidth;
    let transform = Math.round(this.initValue + width);
    if (this.dataDepth > 0) transform *= this.dataDepth;
    this.setTranslateX(element, transform);
  }

  private setTranslateX(element: HTMLElement, value: number) {
    this.renderer.setStyle(element, 'transform', `translateX(${value}px)`);
  }
}

import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';
import { InterceptionDirective } from './interception.directive';
import {
  ParallaxScrollDirective,
  ParallaxScrollValues,
} from './parallax-scroll.directive';
import { filter } from 'rxjs';

@Directive({
  selector: '[moveOnScroll]',
  standalone: true,
})
export class MovingCardDirective implements AfterViewInit {
  @Input() direction: string = 'top';
  @Input() range: number = 0;

  private visible: boolean = false;

  constructor(
    private element: ElementRef,
    private render: Renderer2,
    private intercept: InterceptionDirective,
    private scroll: ParallaxScrollDirective
  ) {}

  ngAfterViewInit(): void {
    this.intercept.visible.subscribe((visible) => {
      this.visible = visible;
    });

    this.scroll.scrollChange
      .pipe(filter((value) => this.visible == true))
      .subscribe((value: ParallaxScrollValues) => {
        let distance = this.getDistance(value);
        console.log(distance);

        this.moveElement(distance);
      });
  }

  moveElement(value: number) {
    switch (this.direction) {
      case 'top': {
        this.render.setStyle(
          this.element.nativeElement,
          'transform',
          `translateY(-${value}vh)`
        );
        break;
      }
      case 'bottom': {
        this.render.setStyle(
          this.element.nativeElement,
          'transform',
          `translateY(${value}vh)`
        );
        break;
      }
      case 'left': {
        this.render.setStyle(
          this.element.nativeElement,
          'transform',
          `translateX(-${value}vh)`
        );
        break;
      }
      case 'right': {
        this.render.setStyle(
          this.element.nativeElement,
          'transform',
          `translateX(${value}vh)`
        );
        break;
      }
    }
  }

  getDistance(scrollValue: ParallaxScrollValues) {
    let scrollTop = scrollValue.value;

    // Define the maximum scroll height at which the height reaches 20vh and returns to 0vh
    let maxScroll = scrollValue.max; // 200vh scroll range

    // Calculate the new height based on scroll position
    let newHeight;
    newHeight = (scrollTop / maxScroll) * this.range;

    if (!this.visible) newHeight = 0;

    // Ensure the height stays within 0 to 20vh range
    newHeight = Math.max(0, Math.min(20, newHeight));
    return Math.floor(newHeight);
  }
}

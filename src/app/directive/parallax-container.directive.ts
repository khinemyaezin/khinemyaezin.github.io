import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appParallaxContainer]',
  exportAs: "appParallaxContainer",
  standalone: true
})
export class ParallaxContainerDirective {

  constructor(public el: ElementRef) {}

}

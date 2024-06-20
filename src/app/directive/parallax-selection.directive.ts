import { Directive } from '@angular/core';

@Directive({
  selector: '[parallaxSelection]',
  standalone: true,
  host:{
    class:"parallax-selection"
  }
})
export class ParallaxSelectionDirective {

  constructor() { }

}

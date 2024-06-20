import { Directive } from '@angular/core';

@Directive({
  selector: '[parallaxText]',
  standalone: true,
  host: {
    class: "parallax-text"
  }
})
export class ParallaxTextDirective {

  constructor() { }

}

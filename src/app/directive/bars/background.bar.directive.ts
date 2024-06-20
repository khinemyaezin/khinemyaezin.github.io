import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { BarsDirective } from './bars.directive';

@Directive({
  selector: '[bgBar]',
  standalone: true,
  host: {
    class:"backgound-bar"
  }
})
export class BackgroundBarDirective {

  constructor(private parent: BarsDirective, private el: ElementRef, private render:Renderer2) {
    this.parent.addChild(this);
  }
  setHeight(val:any) {
    //this.render.setStyle(this.el.nativeElement,"transform","translateY("+ val +"px)");
  }
}

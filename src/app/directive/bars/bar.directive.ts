import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { BarsDirective } from './bars.directive';

@Directive({
  selector: '[bar]',
  standalone: true
})
export class BarDirective {
  @Output() expend = new EventEmitter<boolean>;
  
  constructor( private el: ElementRef, private render:Renderer2) {
  }
  
  @HostListener('mouseover', ['$event'])
  overMouse(event: Event): void {
    event.preventDefault();
    this.expand();
  }

  @HostListener('mouseout', ['$event'])
  outMouse(event: Event): void {
    event.preventDefault();

    this.collapse();
  }

  expand() {
    this.render.addClass(this.el.nativeElement,"expand");
    this.expend.emit(true)
  }
  collapse() {
    this.render.removeClass(this.el.nativeElement,"expand");
    this.expend.emit(false)
  }
}

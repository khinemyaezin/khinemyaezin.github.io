import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[main]',
  standalone: true
})
export class WindowResizeDirective {
 @Output() windowResize = new EventEmitter<any>();
  constructor(public el:ElementRef) { }

  @HostListener('window:resize', ['$event'])
  onResize(event:Event) {
    window.requestAnimationFrame(() => {
      this.windowResize.emit(event);
    });
  }
}

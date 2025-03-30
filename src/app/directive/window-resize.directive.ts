import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[main]',
  standalone: true
})
export class WindowResizeDirective {
 @Output() windowResize = new EventEmitter<any>();
  constructor(private el:ElementRef) { }

  get getWindow() {
    return this.el;
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event:Event) {
    window.requestAnimationFrame(() => {
      this.windowResize.emit(event);
    });
  }
}

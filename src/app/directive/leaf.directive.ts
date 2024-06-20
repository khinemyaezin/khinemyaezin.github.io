import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[leaf]',
  standalone: true,
  host: {
    class: 'leaves',
  },
})
export class LeafDirective implements AfterViewInit {
  constructor(private el: ElementRef, private render: Renderer2) {}
  
  ngAfterViewInit(): void {
    const leafI = new Array(15).fill(null);
    leafI.forEach(() => {
      this.render.appendChild(
        this.el.nativeElement,
        this.render.createElement('i')
      );
    });
  }
}

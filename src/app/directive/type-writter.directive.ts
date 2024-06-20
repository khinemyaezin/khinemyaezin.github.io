import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[typeWritter]',
  standalone: true,
})
export class TypeWritterDirective implements OnChanges{
  @Input() values: string[] = [];


  constructor(private el: ElementRef, private renderer: Renderer2) {
   
  }
  ngOnChanges() {
    // if (this.values.length > 0) {
    //   this.getTypewriterEffect(this.values).subscribe(value => {
    //     this.renderer.setProperty(this.el.nativeElement, 'innerHTML', '<span class="wrap">' + value + "</span>");
    //   });
    // }
  }

}

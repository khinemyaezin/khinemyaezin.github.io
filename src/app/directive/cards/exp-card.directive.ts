import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { ExpCardsDirective } from './exp-cards.directive';

@Directive({
  selector: '[expCard]',
  standalone: true,
  host: {
    class:"my-card"
  }
})
export class ExpCardDirective {
  public next!:ExpCardDirective;

  isCurrent = false;

  constructor(
    private el: ElementRef,
    private cardsDirective: ExpCardsDirective,
    private render: Renderer2
  ) {
    this.cardsDirective.addChild(this);
  }

  ngAfterViewInit(): void {}

  makeCurrent(): void {
    this.render.addClass(this.el.nativeElement, 'card--current');
  }

  removeCurrent(): void {
    this.render.removeClass(this.el.nativeElement, 'card--current');
    this.render.removeClass(this.el.nativeElement, 'card--out');
    this.render.removeClass(this.el.nativeElement, 'card--next');
  }

  addCardOut(){
    this.render.addClass(this.el.nativeElement, 'card--out');
  }

  addCardNext(){
    this.render.addClass(this.el.nativeElement, 'card--next');
  }

  @HostListener('click',["$event"])
  onClick(e:Event): void {
    e.preventDefault();
    this.cardsDirective.cardClicked(this);
  }
}

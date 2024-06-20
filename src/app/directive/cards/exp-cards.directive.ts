import {
  AfterViewInit,
  ContentChildren,
  Directive,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ExpCardDirective } from './exp-card.directive';

@Directive({
  selector: '[expCards]',
  standalone: true,
  host: {
    class:"my-cards"
  }
})
export class ExpCardsDirective implements AfterViewInit {
  private cards: ExpCardDirective[] = [];

  private current!: ExpCardDirective;

  constructor() {
  }

  ngAfterViewInit(): void {
    if (!this.current) {
      this.current = this.cards[this.cards.length - 1];
      this.cardClicked(this.cards[0]);
    }
  }

  addChild(c: ExpCardDirective) {
    if (this.cards.length > 0) {
      this.cards[this.cards.length - 1].next = c;
    }
    this.cards.push(c);
  }

  cardClicked(card: ExpCardDirective): void {
    if (this.current !== card && (this.current.next ? card == this.current.next : true)) {
      this.cards.forEach((element) => {
        element.removeCurrent();
      });
      this.current.addCardOut();
      card.makeCurrent();
      this.current = card;
      this.current.next = this.current.next ? this.current.next : this.cards[0];
      this.current.next.addCardNext();
    }
  }
}

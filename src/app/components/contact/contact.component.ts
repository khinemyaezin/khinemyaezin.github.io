import { Component } from '@angular/core';
import { MovingCardDirective } from '../../directive/moving-card.directive';
import { InterceptionDirective } from '../../directive/interception.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MovingCardDirective, InterceptionDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}

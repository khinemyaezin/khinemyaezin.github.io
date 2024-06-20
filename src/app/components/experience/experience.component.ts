import { Component } from '@angular/core';
import { ExpCardDirective } from '../../directive/cards/exp-card.directive';
import { ExpCardsDirective } from '../../directive/cards/exp-cards.directive';
import { InterceptionDirective } from '../../directive/interception.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ExpCardDirective, ExpCardsDirective, InterceptionDirective, CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {

}

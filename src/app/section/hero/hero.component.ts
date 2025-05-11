import { Component } from '@angular/core';
import { IntersectionDirective } from '../../directive/intersection.directive';
import { TextRevealDirective } from '../../directive/text-reveal.directive';

@Component({
  selector: 'section-hero',
  standalone: true,
  imports: [
    IntersectionDirective,
    TextRevealDirective
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  host: {ngSkipHydration: 'true'},
})
export class HeroComponent {

}

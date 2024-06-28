import { Component } from '@angular/core';
import { ParallaxItemDirective } from '../../directive/parallax-item.directive';
import { InterceptionDirective } from '../../directive/interception.directive';
import { DropDirective } from '../../directive/drop.directive';
import { ShrinkjumpDirective } from '../../v2/directive/shrinkjump.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    ParallaxItemDirective, 
    InterceptionDirective, 
    DropDirective,
    ShrinkjumpDirective
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  interact(value: boolean) {}
}

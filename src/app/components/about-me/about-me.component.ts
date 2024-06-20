import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InterceptionDirective } from '../../directive/interception.directive';
import { BarDirective } from '../../directive/bars/bar.directive';
import { BarsDirective } from '../../directive/bars/bars.directive';
import { LeafDirective } from '../../directive/leaf.directive';


@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, InterceptionDirective, BarDirective, BarsDirective],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {
  public pictures: string[] = [
    "The quick brown fox jumps over the lazy dog in the meadow.",
    "She enjoyed reading books under the old oak tree in the park.",
    "He decided to take a walk along the beach at sunset today.",
    "The concert was amazing with lights and music filling the air.",
    "They found a hidden treasure map inside an old library book.",
    "She wore a red dress that matched the roses in the garden.",
    "He built a treehouse in the backyard for his children to play.",
    "The storm last night left branches scattered all over the yard.",
    "He has a collection of vintage cars in his garage that shine.",
    "They watched the stars from the hilltop, feeling the cool breeze.",
    "She painted a beautiful sunset scene on the canvas last night.",
    "The cat slept peacefully on the windowsill, basking in the sunlight."
  ];
}

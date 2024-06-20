import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ParallaxScrollDirective } from '../../directive/parallax-scroll.directive';
import { ParallaxItemDirective } from '../../directive/parallax-item.directive';
import { ParallaxSelectionDirective } from '../../directive/parallax-selection.directive';
import { ParallaxTextDirective } from '../../directive/parallax-text.directive';
import { AboutMeGridComponent } from '../about-me-grid/about-me-grid.component';

@Component({
  selector: 'app-about-me-home',
  standalone: true,
  imports: [
    CommonModule,
    ParallaxScrollDirective,
    ParallaxItemDirective,
    ParallaxSelectionDirective,
    ParallaxTextDirective,
    AboutMeGridComponent
  ],
  templateUrl: './about-me-home.component.html',
  styleUrl: './about-me-home.component.scss'
})
export class AboutMeHomeComponent {

}

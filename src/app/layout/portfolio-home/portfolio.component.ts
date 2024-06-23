import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParallaxScrollDirective } from '../../directive/parallax-scroll.directive';
import { ParallaxItemDirective } from '../../directive/parallax-item.directive';
import { MainPageGridComponent } from '../main-grid/main-page-grid.component';
import { ParallaxSelectionDirective } from '../../directive/parallax-selection.directive';
import { ParallaxTextDirective } from '../../directive/parallax-text.directive';
import { ExperienceGridComponent } from '../experience-grid/experience-grid.component';
import { AboutMeGridComponent } from '../about-me-grid/about-me-grid.component';
import { ContactGridComponent } from '../contact-grid/contact-grid.component';
import { InterceptionDirective } from '../../directive/interception.directive';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    ParallaxScrollDirective,
    ParallaxItemDirective,
    ParallaxSelectionDirective,
    ParallaxTextDirective,
    MainPageGridComponent,
    ExperienceGridComponent,
    AboutMeGridComponent,
    ContactGridComponent,
    InterceptionDirective
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  items: string[] = [];
  constructor() {}

  ngOnInit(): void {
    // Generate sample items
    for (let i = 1; i <= 10; i++) {
      this.items.push(`Item ${i}`);
    }
  }

  onScroll(event: WheelEvent): void {
    const scrollContainer = event.currentTarget as HTMLElement;
    if (event.deltaY !== 0) {
      // Prevent vertical scroll
      event.preventDefault();
      // Scroll horizontally
      scrollContainer.scrollLeft += event.deltaY;
    }
  }
}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { HeroComponent } from '../../section/hero/hero.component';
import { ScrollEmitterDirective } from '../../directive/scroll-emitter.directive';
import { WindowResizeDirective } from '../../directive/window-resize.directive';
import { ExperienceComponent } from '../../section/experience/exp.component';
import { TitleComponent } from '../../section/title/title.component';
import { DiscoverComponent } from '../../section/discover/discover.component';
import { Section2Component } from '../../section/section2/section2.component';
import { StoryComponent } from '../../section/story/story.component';
import { MovingComponent } from '../../section/moving-title/moving-title.component';
import { ProjectWrapperComponent } from '../../section/project-wrapper/project-wrapper.component';

@Component({
  selector: 'portfolio',
  standalone: true,
  imports: [
    HeroComponent,
    ProjectWrapperComponent,
    ExperienceComponent,
    DiscoverComponent,
    Section2Component,
    StoryComponent,
    TitleComponent,
    MovingComponent,
    ScrollEmitterDirective,
    WindowResizeDirective
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  host: {ngSkipHydration: 'true'},

})
export class PortfolioComponent {
  @ViewChild("mainRef") main!: ElementRef;
}

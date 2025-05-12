import { Component, ElementRef, ViewChild } from '@angular/core';
import { HeroComponent } from '../../section/hero/hero.component';
import { ScrollEmitterDirective } from '../../directive/scroll-emitter.directive';
import { WindowResizeDirective } from '../../directive/window-resize.directive';
import { ExperienceComponent } from '../../section/experience/exp.component';
import { TitleComponent } from '../../section/title/title.component';
import { ContactComponent } from '../../section/contact/contact.component';
import { StoryComponent } from '../../section/story/story.component';
import { ProjectWrapperComponent } from '../../section/project-wrapper/project-wrapper.component';
import { IntroductionComponent } from '../../section/introduction/introduction.component';

@Component({
  selector: 'portfolio',
  standalone: true,
  imports: [
    HeroComponent,
    ProjectWrapperComponent,
    ExperienceComponent,
    ContactComponent,
    IntroductionComponent,
    StoryComponent,
    TitleComponent,
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

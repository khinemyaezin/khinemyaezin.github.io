import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { HeroComponent } from '../../section/hero/hero.component';
import { ScrollEmitterDirective } from '../../directive/scroll-emitter.directive';
import { WindowResizeDirective } from '../../directive/window-resize.directive';
import { CursorDirective } from '../../directive/cursor.directive';
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
    CommonModule,
    HeroComponent,
    ProjectWrapperComponent,
    ExperienceComponent,
    ContactComponent,
    IntroductionComponent,
    StoryComponent,
    TitleComponent,
    ScrollEmitterDirective,
    WindowResizeDirective,
    CursorDirective
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  host: {ngSkipHydration: 'true'},

})
export class PortfolioComponent {
  @ViewChild("mainRef") main!: ElementRef;

  scrollProgress = 0;
  isBrowser = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  onMainScroll(event: Event): void {
    if (!this.isBrowser) return;
    const element = event.target as HTMLElement;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight - element.clientHeight;
    this.scrollProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  }
}

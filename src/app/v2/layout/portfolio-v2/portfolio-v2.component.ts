import { Component, ElementRef, ViewChild } from '@angular/core';
import { HeroComponent } from '../../section/hero/hero.component';
import { ScrollEmitterDirective } from '../../directive/scroll-emitter.directive';
import { VideoComponent } from '../../section/video/video.component';
import { ProjectComponent } from '../../section/project/project.component';
import { WindowResizeDirective } from '../../directive/window-resize.directive';
import { BlogComponent } from '../../section/blog/blog.component';
import { CircleComponent } from '../../section/circle/circle.component';
import { DiscoverComponent } from '../../section/discover/discover.component';
import { DoorComponent } from '../../section/door/door.component';
import { StoryComponent } from '../../section/story/story.component';

@Component({
  selector: 'app-portfolio-v2',
  standalone: true,
  imports: [
    HeroComponent,
    VideoComponent,
    ProjectComponent,
    BlogComponent,
    DiscoverComponent,
    DoorComponent,
    StoryComponent,
    CircleComponent,
    ScrollEmitterDirective,
    WindowResizeDirective
  ],
  templateUrl: './portfolio-v2.component.html',
  styleUrl: './portfolio-v2.component.scss',
  host: {ngSkipHydration: 'true'},

})
export class PortfolioV2Component {
  @ViewChild("mainRef") main!: ElementRef;
}

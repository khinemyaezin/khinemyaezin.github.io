import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { IntersectionDirective } from '../../directive/intersection.directive';
import { combineLatest, filter, Subject, takeUntil } from 'rxjs';
import { DadComponent } from '../../dad-component';
import { ScrollEmitterDirective } from '../../directive/scroll-emitter.directive';
import storyData from './story.data.json';
import { CommonModule } from '@angular/common';

interface StoryParagraph {
  text: string;
  classes: string;
}

interface StoryData {
  profileImage: string;
  paragraphs: StoryParagraph[];
}

@Component({
  selector: 'section-story',
  standalone: true,
  imports: [IntersectionDirective, CommonModule],
  templateUrl: './story.component.html',
  styleUrl: './story.component.scss'
})
export class StoryComponent extends DadComponent implements AfterViewInit {
  @ViewChild("media") media!: ElementRef;
  @ViewChild("section") section!: ElementRef;
  @ViewChildren("content") contents!: ElementRef[];
  @ViewChild(IntersectionDirective) intersection!: IntersectionDirective;

  storyData: StoryData = storyData;

  constructor(private render: Renderer2, private scroll: ScrollEmitterDirective) {
    super();
  }

  ngAfterViewInit(): void {
    combineLatest([this.intersection.visible, this.scroll.scrollChange])
      .pipe(
        takeUntil(this.destroy$),
        filter(([visible, scroll]) => visible === true)
      )
      .subscribe(() => {
        let { bottom } = this.section.nativeElement.getBoundingClientRect();
        this.animateMedia(bottom);
        this.animateStoryPotion(bottom);
      });
  }

  animateMedia(bottom: number) {
    let scale = 1 - (bottom - window.innerHeight) * 0.0005;
    scale = scale < 0.2 ? 0.2 : scale > 1 ? 1 : scale;

    let rotate = 1 - (bottom - window.innerHeight) * 0.05;
    rotate = rotate < 0 ? rotate : 0;

    this.render.setStyle(
      this.media.nativeElement,
      "transform",
      `scale(${scale}) rotate(${rotate}deg)`
    );
  }

  animateStoryPotion(bottom: number) {
    const scrollPercentage = Math.max(0, (bottom - window.innerHeight) / window.innerHeight * 100);
    const thresholds = [100, 70, 50];

    const animate = () => {
      this.contents.forEach((content: ElementRef, index: number) => {
        if (scrollPercentage < thresholds[index]) {
          this.render.addClass(content.nativeElement, 'show');
        } else {
          this.render.removeClass(content.nativeElement, 'show');
        }
      });
    }
    requestAnimationFrame(animate);
  }
}

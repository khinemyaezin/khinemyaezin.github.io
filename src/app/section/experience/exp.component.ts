import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from "@angular/core";
import { IntersectionDirective } from "../../directive/intersection.directive";
import { TextRevealDirective } from "../../directive/text-reveal.directive";
import { DadComponent } from "../../dad-component";
import { combineLatest, filter, takeUntil } from "rxjs";
import { ScrollEmitterDirective } from "../../directive/scroll-emitter.directive";
import experienceData from './experience.json';

interface ExperiencePost {
  title: string;
  company: string;
  duration: string;
  languages: string[];
  image: string;
  desc: string;
}

@Component({
  selector: "section-exp",
  standalone: true,
  imports: [CommonModule, IntersectionDirective, TextRevealDirective],
  templateUrl: "./exp.component.html",
  styleUrl: "./exp.component.scss",
})
export class ExperienceComponent extends DadComponent implements AfterViewInit {
  @ViewChild(IntersectionDirective) intersection!: IntersectionDirective;
  @ViewChild("section") section!: ElementRef;
  @ViewChildren('expPost') expPostsView!: QueryList<ElementRef>;

  expPosts: ExperiencePost[] = experienceData.expPosts;

  private isThrottled = false;

  constructor(private render: Renderer2, private scroll: ScrollEmitterDirective) {
    super();
  }

  ngAfterViewInit(): void {
    this.setScrollHeight();
    combineLatest([this.intersection.visible, this.scroll.scrollChange])
      .pipe(
        takeUntil(this.destroy$),
        filter(([visible, scroll]) => visible === true)
      )
      .subscribe(() => {
        if (!this.isThrottled) {
          this.isThrottled = true;
          this.addOverlay();
          setTimeout(() => (this.isThrottled = false), 100); // Throttle for 100ms
        }
      });
  }

  setScrollHeight() {
    this.render.setStyle(this.section.nativeElement, 'height', `${((this.expPosts.length) * 100)+50}%`);
  }

  addOverlay() {
    const animate = () => {
      /**
       * 1. Get the current element in the viewport
       * 2. Make current element inactive if it is on the top of the viewport and 
       *    the next element is over 60% in the viewport.
       */
      this.expPostsView
        .filter((expPost) => expPost.nativeElement.getBoundingClientRect().top < (window.innerHeight * 0.5))
        .forEach((expPost, index) => {
          const nextEl = this.expPostsView.get(index + 1);
          const minPercentage = window.innerHeight * 0.6;
          this.render.removeClass(expPost.nativeElement, 'inactive');

          if (nextEl && (nextEl.nativeElement.getBoundingClientRect().top < minPercentage)) {
            this.render.addClass(expPost.nativeElement, 'inactive');
            this.render.removeClass(nextEl.nativeElement, 'inactive');
          } else if (nextEl) {
            this.render.addClass(nextEl.nativeElement, 'inactive');
          }
        });
    }
    requestAnimationFrame(animate);
  }
}

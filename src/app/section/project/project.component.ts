import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { ScrollEmitterDirective } from "../../directive/scroll-emitter.directive";
import { combineLatest, filter, takeUntil } from "rxjs";
import { IntersectionDirective } from "../../directive/intersection.directive";
import { WindowResizeDirective } from "../../directive/window-resize.directive";
import { DadComponent } from "../../dad-component";
import projectsData from './projects.json';

interface ProjectLink {
  icon: string;
  url: string;
}

interface Project {
  languages: string[];
  published_year: string;
  subtitle: string;
  links: ProjectLink[];
  title: string;
  desc: string;
  imgSrc: string;
  active: boolean;
}

@Component({
  selector: "project",
  standalone: true,
  imports: [CommonModule, IntersectionDirective],
  templateUrl: "./project.component.html",
  styleUrl: "./project.component.scss",
})
export class ProjectComponent extends DadComponent implements AfterViewInit {
  @ViewChild("projectSection") section!: ElementRef;
  @ViewChild("projectSticky") projectSticky!: ElementRef;
  @ViewChild("projectsSlider") projectsSlider!: ElementRef;

  @ViewChild(IntersectionDirective) intersection!: IntersectionDirective;
  @Input("offsetTop") parentOffsetTop!: number;

  private _projects: Project[] = projectsData.projects;

  get projects() {
    return this._projects;
  }

  toX = 0;
  currentX = 0;
  totalHeight = 0;

  constructor(
    private scroll: ScrollEmitterDirective,
    private windowResize: WindowResizeDirective,
    private render: Renderer2
  ) {
    super();
  }

  ngAfterViewInit(): void {
    if (typeof window == 'undefined') return;

    this.setTargetX();
    this.setScrollContainerHeight();
    this.animateScrolling();
    this.handleWindowSizeChange();
  }

  animateScrolling() {
    combineLatest([this.intersection.visible, this.scroll.scrollChange])
      .pipe(
        takeUntil(this.destroy$),
        filter(([visible, scroll]) => visible === true)
      )
      .subscribe(() => {
        this.animateProjects();
      });
   
  }

  handleWindowSizeChange() {
    combineLatest([this.intersection.visible,  this.windowResize.windowResize])
    .pipe( takeUntil(this.destroy$),filter(([visible, scroll]) => visible === true))
    .subscribe(()=>{
      this.setTargetX();
      this.setScrollContainerHeight();
      //this.animateProjects();
    })
  }

  setScrollContainerHeight() {
    const isPortrait = window.innerHeight > window.innerWidth;
    const scrollDistanceMultiplier = isPortrait ? 1.8 : 1;
    this.totalHeight = window.innerHeight + this.toX * scrollDistanceMultiplier;
    this.render.setStyle(this.section.nativeElement, 'height', `${this.totalHeight}px`);
  }

  setTargetX() {
    const sliderWidth = this.projectsSlider.nativeElement.scrollWidth;
    this.toX = Math.max(0, sliderWidth - window.innerWidth);
  }

  animateProjects() {
    const animate = () => {
      let scrolledDistanceFromTop = Math.max(0, -this.section.nativeElement.getBoundingClientRect().top);
      const height = Math.max(1, this.totalHeight - window.innerHeight);

      let percentage = scrolledDistanceFromTop / height;
      percentage = Math.max(0, Math.min(1, percentage));
      this.currentX = this.lerp(0, this.toX, percentage);

      this.render.setStyle(
        this.projectsSlider.nativeElement,
        "transform",
        `translate3d(${-this.currentX}px, 0 , 0)`
      );
    }
    requestAnimationFrame(animate);

  }

  lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
  }
}

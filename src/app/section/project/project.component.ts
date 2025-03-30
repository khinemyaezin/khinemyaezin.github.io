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

  private _projects: any[] = [
    {
      languages: ["Javascript with Jquery", "Firebase", "Bootstrap"],
      published_year: "Nov 2022",
      subtitle: "Cable Locator",
      links: [
        {
          icon: "box-arrow-up-right",
          url: "https://cablelocator.net",
        },
      ],
      title: "Featured Project",
      desc: "Cable Detection Service landing website with ability to submit quote requests and control by admin page.",
      imgSrc:
        "cablelocator.png",
      active: true,
    },
    {
      languages: ["C#"],
      published_year: "2020",
      subtitle: "Unicode Typing Master",
      links: [
        {
          icon: "github",
          url: "https://github.com/khinemyaezin/unicode-typing-master",
        },
        {
          icon: "download",
          url: "https://github.com/khinemyaezin/unicode-typing-master/tree/main/bin/Debug",
        },
      ],
      title: "Featured Project",
      desc: 'Developed during transitional period of Zawgyi to Unicode.',
      imgSrc:
        "unicode-typing-master.png",
      active: true,
    }
  ];

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

    this.setScrollContainerHeight();
    this.setTargetX();
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
      this.setScrollContainerHeight();
      this.setTargetX();
      //this.animateProjects();
    })
  }

  setScrollContainerHeight() {
    const projectCount = this._projects.length;
    const projectHeight = window.innerWidth; // Or the height of each project
    this.totalHeight = projectCount * projectHeight;
    this.render.setStyle(this.section.nativeElement, 'height', `${this.totalHeight}px`);
  }

  setTargetX() {
    this.toX = this.totalHeight - window.innerWidth;
  }

  animateProjects() {
    const animate = () => {
      let scrolledDistanceFromTop = Math.max(0, -this.section.nativeElement.getBoundingClientRect().top);
      const height = this.totalHeight - window.innerHeight;

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

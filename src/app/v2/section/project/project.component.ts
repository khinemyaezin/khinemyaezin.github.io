import { CommonModule } from "@angular/common";
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { ScrollEmitterDirective } from "../../directive/scroll-emitter.directive";
import { Subject, combineLatest, filter, takeUntil } from "rxjs";
import { IntersectionDirective } from "../../directive/intersection.directive";
import { WindowResizeDirective } from "../../directive/window-resize.directive";

@Component({
  selector: "section-project",
  standalone: true,
  imports: [CommonModule, IntersectionDirective],
  templateUrl: "./project.component.html",
  styleUrl: "./project.component.scss",
})
export class ProjectComponent
  implements AfterViewInit, OnDestroy, AfterViewChecked
{
  @ViewChild("projectSticky") projectSticky!: ElementRef;
  @ViewChild("projectsSlider") projectsSlider!: ElementRef;
  @ViewChild(IntersectionDirective) intersection!: IntersectionDirective;

  private destroy$ = new Subject<void>();

  projects: any[] = [
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
    },
  ];

  projectTargetX = 0;
  projectCurrentX = 0;

  constructor(
    private scroll: ScrollEmitterDirective,
    private windowResize: WindowResizeDirective,
    private render: Renderer2
  ) {}
  ngAfterViewChecked(): void {
    //this.animateProjects();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    combineLatest([this.intersection.visible, this.scroll.scrollChange])
      .pipe(
        takeUntil(this.destroy$),
        filter(([visible, scroll]) => visible === true)
      )
      .subscribe(() => {
        this.animateProjects();
      });
  }

  animateProjects() {
    // distance of session from window bar
    let sessionOffsetTop =
      this.projectSticky.nativeElement.parentElement.offsetTop;

    // scrolled pixel
    const mainScrolledPixel = this.windowResize.el.nativeElement.scrollTop;

    // if 1836, 1836
    const difference = mainScrolledPixel - sessionOffsetTop;
    let percentage = difference / window.innerHeight;

    percentage = percentage < 0 ? 0 : percentage > 1 ? 1 : percentage;

    this.projectTargetX =
      this.projectsSlider.nativeElement.clientWidth - window.innerWidth;

    this.projectCurrentX = this.lerp(0, this.projectTargetX, percentage);

    this.render.setStyle(
      this.projectsSlider.nativeElement,
      "transform",
      `translate3d(${-this.projectCurrentX}px, 0 , 0)`
    );
  }

  lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
  }
}

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { IntersectionDirective } from "../../directive/intersection.directive";
import { Subject, combineLatest, filter, takeUntil } from "rxjs";
import { ScrollEmitterDirective } from "../../directive/scroll-emitter.directive";
import { WindowResizeDirective } from "../../directive/window-resize.directive";

@Component({
  selector: "section-moving",
  standalone: true,
  imports: [IntersectionDirective],
  templateUrl: "./moving-title.component.html",
  styleUrl: "./moving-title.component.scss",
})
export class MovingComponent implements AfterViewInit, OnDestroy {
  @ViewChild(IntersectionDirective) intersection!: IntersectionDirective;
  @ViewChild("textHeaderLeft") textHeaderLeft!: ElementRef;

  private destroy$ = new Subject<void>();

  constructor(
    private scroll: ScrollEmitterDirective,
    private windowResize: WindowResizeDirective,
    private render: Renderer2
  ) {}

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
    let scrolledDistanceFromTop = this.textHeaderLeft.nativeElement.getBoundingClientRect().top
    let percentage = scrolledDistanceFromTop / window.innerHeight;

    const x = this.lerp(0, window.innerWidth, percentage);
    this.render.setStyle(
      this.textHeaderLeft.nativeElement,
      "transform",
      `translate3d(${x}px, 0 , 0)`
    );
  }

  lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
  }
}

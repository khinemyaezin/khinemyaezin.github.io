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
  templateUrl: "./moving.component.html",
  styleUrl: "./moving.component.scss",
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
    // distance of session from window bar
    let sessionOffsetTop =
      this.textHeaderLeft.nativeElement.parentElement.offsetTop;

    // scrolled pixel
    const mainScrolledPixel = this.windowResize.el.nativeElement.scrollTop;

    // if 1836, 1836
    const difference = mainScrolledPixel - sessionOffsetTop;
    this.render.setStyle(
      this.textHeaderLeft.nativeElement,
      "transform",
      `translate3d(${-difference}px, 0 , 0)`
    );
  }
}

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { ScrollEmitterDirective } from "../../directive/scroll-emitter.directive";
import { IntersectionDirective } from "../../directive/intersection.directive";
import { Subject, combineLatest, filter, takeUntil } from "rxjs";

@Component({
  selector: "section-video",
  standalone: true,
  imports: [IntersectionDirective],
  templateUrl: "./video.component.html",
  styleUrl: "./video.component.scss",
})
export class VideoComponent implements AfterViewInit, OnDestroy {
  @ViewChild("textHeaderLeft") textHeaderLeft!: ElementRef;
  @ViewChild("textHeaderRight") textHeaderRight!: ElementRef;
  @ViewChild("section") section!: ElementRef;
  @ViewChild("video") video!: ElementRef;
  @ViewChild(IntersectionDirective) intersection!: IntersectionDirective;

  private destroy$ = new Subject<void>();

  constructor(
    private scroll: ScrollEmitterDirective,
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
        let { bottom } = this.section.nativeElement.getBoundingClientRect();                
        this.animateVideo(bottom);
        this.animateText(bottom);       
      });
  }

  animateVideo(bottom:number) {
    let scale = 1 - (bottom - window.innerHeight) * 0.0005;
    scale = scale < 0.2 ? 0.2 : scale > 1 ? 1 : scale;
    this.render.setStyle(
      this.video.nativeElement,
      "transform",
      `scale(${scale})`
    );
  }

  animateText(bottom:number) {
    let textTrans = bottom - window.innerHeight;
    textTrans = textTrans < 0 ? 0 : textTrans;
    this.render.setStyle(
      this.textHeaderLeft.nativeElement,
      "transform",
      `translateX(${-textTrans}px)`
    );
    this.render.setStyle(
      this.textHeaderRight.nativeElement,
      "transform",
      `translateX(${textTrans}px)`
    );
  }
}

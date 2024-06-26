import { Component, ElementRef, Input, Renderer2, ViewChild } from "@angular/core";
import { Subject, combineLatest, filter, takeUntil } from "rxjs";
import { ScrollEmitterDirective } from "../../directive/scroll-emitter.directive";
import { IntersectionDirective } from "../../directive/intersection.directive";

@Component({
  selector: "section-discover",
  standalone: true,
  imports: [IntersectionDirective],
  templateUrl: "./discover.component.html",
  styleUrl: "./discover.component.scss",
})
export class DiscoverComponent {
  @ViewChild("container") containerRef!: ElementRef;
  @ViewChild("leftText") leftText!: ElementRef;
  @ViewChild("rightText") rightText!: ElementRef;
  @ViewChild(IntersectionDirective) intersection!: IntersectionDirective;

  @Input() contact:string = "";
  @Input() linledin:string = "";
  private destroy$ = new Subject<void>();

  constructor(
    private scroll: ScrollEmitterDirective,
    // private windowResize: WindowResizeDirective,
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
        this.scrollDiscover();
      });
  }

  scrollDiscover() {
    let { bottom } = this.containerRef.nativeElement.getBoundingClientRect();
    let textTrans = bottom - window.innerHeight;
    textTrans = textTrans < 0 ? 0 : textTrans;

    this.render.setStyle(
      this.leftText.nativeElement,
      "transform",
      `translateX(${-textTrans}px)`
    );
    this.render.setStyle(
      this.rightText.nativeElement,
      "transform",
      `translateX(${textTrans}px)`
    );
  }
}

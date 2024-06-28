import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Query,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { ScrollEmitterDirective } from "../../directive/scroll-emitter.directive";
import { IntersectionDirective } from "../../directive/intersection.directive";
import { Subject, combineLatest, filter, takeUntil } from "rxjs";
import { ShrinkjumpDirective } from "../../directive/shrinkjump.directive";

@Component({
  selector: "section-door",
  standalone: true,
  imports: [IntersectionDirective, ShrinkjumpDirective],
  templateUrl: "./door.component.html",
  styleUrl: "./door.component.scss",
})
export class DoorComponent implements AfterViewInit, OnDestroy {
  @ViewChild("leftDoor") leftDoor!: ElementRef;
  @ViewChild("rightDoor") rightDoor!: ElementRef;
  @ViewChild("textHeaderLeft") textHeaderLeft!: ElementRef;
  @ViewChild("textHeaderRight") textHeaderRight!: ElementRef;
  @ViewChild("section") section!: ElementRef;
  @ViewChild("video") video!: ElementRef;

  @ViewChild(IntersectionDirective) intersection!: IntersectionDirective;
  @ViewChildren(ShrinkjumpDirective) shrinks!: QueryList<ShrinkjumpDirective>;

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
        //this.animateDoor();
        this.animateText(bottom);
      });
  }

  animateVideo(bottom: number) {
    let scale = 1 - (bottom - window.innerHeight) * 0.0005;
    scale = scale < 0.2 ? 0.2 : scale > 1 ? 1 : scale;

    let rotate  =1 - (bottom - window.innerHeight) * 0.05;
    rotate = rotate < 0 ? rotate : 0;

    this.render.setStyle(
      this.video.nativeElement,
      "transform",
      `scale(${scale}) rotate(${rotate}deg)`
    );
  }

  animateDoor() {
    let { top } = this.section.nativeElement.getBoundingClientRect();
    let textTrans = top < 0 ? top : 0;
    // // Set the transformation for the left text header element
    this.render.setStyle(
      this.leftDoor.nativeElement,
      "transform",
      `translateX(${textTrans}px)`
    );

    // Set the transformation for the right text header element
    this.render.setStyle(
      this.rightDoor.nativeElement,
      "transform",
      `translateX(${-textTrans}px)`
    );
  }

  animateText(bottom: number) {
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
    console.log(textTrans);

    if (textTrans == 0) {
      this.animateShrink();
    }
  }

  animateShrink() {
    this.shrinks.forEach((shrink,index) => {
      shrink.active.next(index);
    });
  }
}

import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { IntersectionDirective } from "../../directive/intersection.directive";
import { Subject, combineLatest, filter, takeUntil } from "rxjs";
import { ScrollEmitterDirective } from "../../directive/scroll-emitter.directive";
import { TextRevealDirective } from "../../directive/text-reveal.directive";

@Component({
  selector: "section-circle",
  standalone: true,
  imports: [IntersectionDirective,TextRevealDirective],
  templateUrl: "./circle.component.html",
  styleUrl: "./circle.component.scss",
})
export class CircleComponent implements AfterViewInit, OnDestroy {
  @ViewChild("session") sessionRef!: ElementRef;
  @ViewChild("circle") circleRef!: ElementRef;
  @ViewChild(IntersectionDirective) intersection!: IntersectionDirective;

  @Input() title:string = "";
  @Input() theme:string = "white";
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
        this.scrollCircle();
      });
  }

  scrollCircle() {
    let { top } = this.sessionRef.nativeElement.getBoundingClientRect();
    let scaleTop = Math.abs(top);
    let scale = scaleTop / window.innerHeight;
    scale = scale < 0 ? 0 : scale > 1 ? 1 : scale;

    if (top <= 0) {
      this.render.setStyle(
        this.circleRef.nativeElement,
        "transform",
        `translate(-50%, -50%) scale(${scale})`
      );
    } else {
      this.render.setStyle(
        this.circleRef.nativeElement,
        "transform",
        `translate(-50%, -50%) scale(${0})`
      );
    }
  }
}

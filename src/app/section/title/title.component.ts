import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { IntersectionDirective } from "../../directive/intersection.directive";
import { combineLatest, filter, takeUntil } from "rxjs";
import { ScrollEmitterDirective } from "../../directive/scroll-emitter.directive";
import { TextRevealDirective } from "../../directive/text-reveal.directive";
import { DadComponent } from "../../dad-component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "section-title",
  standalone: true,
  imports: [CommonModule, IntersectionDirective, TextRevealDirective],
  templateUrl: "./title.component.html",
  styleUrl: "./title.component.scss",
})
export class TitleComponent extends DadComponent implements AfterViewInit, OnInit {
  @ViewChild("session") sessionRef!: ElementRef;
  @ViewChild(IntersectionDirective) intersection!: IntersectionDirective;
  @ViewChildren("text") textsView!: QueryList<ElementRef>;
  @Input("message") texts: string[] | string | undefined;

  _texts: string[] = [];

  constructor(
    private scroll: ScrollEmitterDirective,
    private render: Renderer2
  ) {
    super();

  }

  ngOnInit(): void {
    if (typeof this.texts === 'string') {
      this._texts = [...this.texts.split(',').map(text => text.trim()),''];
    } else {
      this._texts = Array.isArray(this.texts) ? this.texts : [];
    }
  }

  ngAfterViewInit(): void {
    if (typeof window == 'undefined') return;

    this.subscribeScrollChanges();
    this.setSectionHeight();
  }

  subscribeScrollChanges() {
    combineLatest([this.intersection.visible, this.scroll.scrollChange])
      .pipe(
        takeUntil(this.destroy$),
        filter(([visible, scroll]) => visible === true)
      )
      .subscribe(() => {
        this.animate();
      });
  }

  setSectionHeight() {
    this.render.setStyle(this.sessionRef.nativeElement, 'height', `${this._texts.length * 100}vh`);
  }

  animate() {
    const animate = () => {
      const sessionRect = this.sessionRef.nativeElement.getBoundingClientRect();
      const scrolledDistanceFromTop = Math.max(0, sessionRect.bottom - window.innerHeight);
      const totalHeight = sessionRect.height - window.innerHeight;
      const scrolledPercentage = totalHeight == 0 ? 0 : Math.floor(100 - ((scrolledDistanceFromTop / totalHeight) * 100));
      const activeIndex = scrolledPercentage == 0 ? scrolledPercentage : Math.floor(scrolledPercentage / 100 * this._texts.length);

      this.textsView.forEach((word, index) => {
        this.render[index === activeIndex ? 'addClass' : 'removeClass'](word.nativeElement, "active");
      });
    };
    requestAnimationFrame(animate);

  }
}

import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { ScrollEmitterDirective } from "../../directive/scroll-emitter.directive";
import { IntersectionDirective } from "../../directive/intersection.directive";
import { combineLatest, filter, takeUntil } from "rxjs";
import { ShrinkjumpDirective } from "../../directive/shrinkjump.directive";
import { DadComponent } from "../../dad-component";

@Component({
  selector: "section-2",
  standalone: true,
  imports: [IntersectionDirective, ShrinkjumpDirective],
  templateUrl: "./section2.component.html",
  styleUrl: "./section2.component.scss",
})
export class Section2Component extends DadComponent implements AfterViewInit {
  @ViewChild("hero") hero!: ElementRef;
  @ViewChild("textHeaderLeft") textHeaderLeft!: ElementRef;
  @ViewChild("textHeaderRight") textHeaderRight!: ElementRef;
  @ViewChild("section") section!: ElementRef;
  @ViewChild("media") media!: ElementRef;
  @ViewChild("footer") footer!: ElementRef;

  @ViewChild(IntersectionDirective) intersection!: IntersectionDirective;
  @ViewChildren(ShrinkjumpDirective) shrinks!: QueryList<ShrinkjumpDirective>;

  private leftChars: ElementRef[] = [];
  private rightChars: ElementRef[] = [];

  constructor(private render: Renderer2,private scroll: ScrollEmitterDirective) {
    super();
  }

  ngAfterViewInit(): void {
    this.splitTextToChars();
    combineLatest([this.intersection.visible, this.scroll.scrollChange])
      .pipe(
        takeUntil(this.destroy$),
        filter(([visible, scroll]) => visible === true)
      )
      .subscribe(() => {
        let { bottom } = this.section.nativeElement.getBoundingClientRect();
        this.animateText(bottom);
        this.animateFooter(bottom);
      });
  }

  splitTextToChars() {
    let leftChars = Array.from(this.textHeaderLeft.nativeElement.textContent.replace(/\s/g, ''));
    let rightChars = Array.from(this.textHeaderRight.nativeElement.textContent.replace(/\s/g, ''));

    this.textHeaderLeft.nativeElement.innerHTML = '';
    this.textHeaderRight.nativeElement.innerHTML = '';

    leftChars.map((char) => {
      let span = this.render.createElement('span');
      this.render.setProperty(span, 'textContent', char);
      this.render.appendChild(this.textHeaderLeft.nativeElement, span);
      return span;
    }).forEach((span) => this.leftChars.push(span));

    rightChars.map((char) => {
      let span = this.render.createElement('span');
      this.render.setProperty(span, 'textContent', char);
      this.render.appendChild(this.textHeaderRight.nativeElement, span);
      return span;
    }).forEach((span) => this.rightChars.push(span));

  }



  animateText(bottom: number) {
    let textTrans = Math.max(0, bottom - window.innerHeight);
    const minScroll = 20;
    const maxSpacing = 100;
    const minSpacing = 0;

    textTrans = textTrans < minScroll ? minScroll : textTrans;

    const addGradientColor = (span:ElementRef)=> {
      if(textTrans == minScroll) {
        this.render.addClass(span, 'gradient-text');
        this.render.addClass(span, 'animate');
      } else {
        this.render.removeClass(span, 'gradient-text');
        this.render.removeClass(span, 'animate');
      }
    }

    const animate = () => {
      this.leftChars.forEach((char: any, index: number) => {
        let spacing = Math.max(minSpacing, (textTrans / window.innerHeight) * maxSpacing);
        let px = -textTrans + index * spacing;
        this.render.setStyle(char, "transform", `translateX(${px}px)`);
        addGradientColor(char);
      });

      this.rightChars.forEach((char: any, index: number) => {
        let spacing = Math.max(minSpacing, (textTrans / window.innerHeight) * maxSpacing);
        let px = textTrans + index * spacing;
        this.render.setStyle(char, "transform", `translateX(${px}px)`);
        addGradientColor(char);
      });
      
      if(textTrans == minScroll) {
        this.render.addClass(this.hero.nativeElement, "door-closed");
      }else {
        this.render.removeClass(this.hero.nativeElement, "door-closed");
      }

      
    };
    requestAnimationFrame(animate);
  }

  animateFooter(bottom: number) {
    let textTrans = Math.max(0, bottom - window.innerHeight);
    const animate = () => {
      if(textTrans > 20) {
        this.render.removeClass(this.footer.nativeElement, "show");
      } else {
        this.render.addClass(this.footer.nativeElement, "show");
      }
    }
    requestAnimationFrame(animate);
  }


  animateShrink() {
    this.shrinks.forEach((shrink, index) => {
      shrink.active.next(index);
    });
  }
}

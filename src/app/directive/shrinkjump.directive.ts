import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from "@angular/core";
import {
  Subject,
  debounceTime,
  delay,
  filter,
  switchMap,
  takeUntil,
} from "rxjs";
import { IntersectionDirective } from "./intersection.directive";

@Directive({
  selector: "[shrinkjump]",
  standalone: true,
  host: {
    class: "shrink-jump",
  },
})
export class ShrinkjumpDirective implements OnDestroy, OnInit, AfterViewInit {
  @Input() active = new Subject<number>();
  private destroy$ = new Subject<void>();
  private __running = false;

  constructor(
    private parent: IntersectionDirective,
    private el: ElementRef,
    private render: Renderer2
  ) {}

  ngAfterViewInit(): void {
    let string = this.el.nativeElement.innerText;

    this.render.setProperty(this.el.nativeElement, "innerHTML", "");

    let spanList: any[] = [];

    for (let i = 0; i < string.length; i++) {
      const span = this.render.createElement("span");
      const text = this.render.createText(string[i]);
      this.render.appendChild(span, text);
      spanList.push(span);
      this.render.appendChild(this.el.nativeElement, span);

      // this.render.listen(span, "animationend", (event) => {
      //   event.preventDefault();
      //   this.render.removeClass(span, "active");
      // });
    }

    this.active
      .pipe(
        takeUntil(this.destroy$),
        filter(() => !this.__running),
        //debounceTime(300)
      )
      .subscribe((callback: number) => {
        this.__running = true;
        setTimeout(
          () => this.activateSpans(spanList),
          callback * spanList.length * 100
        );
      });
  }

  private activateSpans(spanList: any) {
    this.__running = true;

    spanList.forEach((span: any, index: number) => {
      setTimeout(() => {
        this.render.addClass(span, "active");
        if (index === spanList.length - 1) {
          //this.__running = false;
        }
      }, (index + 1) * 50);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  Renderer2,
} from "@angular/core";
import { Subject, filter, takeUntil } from "rxjs";
import {
  ParallaxScrollDirective,
  ParallaxScrollValues,
} from "./parallax-scroll.directive";

@Directive({
  selector: "[interception]",
  standalone: true,
})
export class InterceptionDirective implements OnDestroy, AfterViewInit {
  @Input() debounceTime = 0; // Optional debounce delay (milliseconds)
  @Input() name: string = "";
  @Output() visible = new EventEmitter<boolean>();
  @Output() scrollPercentage = new EventEmitter<{
    percentage: number;
    value: number;
  }>();

  private observer: IntersectionObserver | null = null;
  private visibilityChange = new Subject<boolean>();
  private _visible = false;
  private destroy$ = new Subject<void>();

  constructor(
    private element: ElementRef,
    private render: Renderer2,
    private scroll: ParallaxScrollDirective
  ) {}

  @Input() delay: number = 0;

  ngAfterViewInit(): void {
    this.createObserver();
    this.setupDebouncedVisibility();
    this.listenScrollChanges();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.disconnectObserver();
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: Event): void {
    event.preventDefault();

   
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    event.preventDefault();
  
   
  }

  private createObserver() {
    const options: IntersectionObserverInit = {
      root: null, // Observe relative to viewport
      threshold: 0.1, // Emit events when 10% of element is visible
    };

    this.observer = new IntersectionObserver((entries) => {
      this.handleIntersection(entries);
    }, options);
    this.observer.observe(this.element.nativeElement);
  }

  private handleIntersection(entries: IntersectionObserverEntry[]) {
    const entry = entries[0]; // Assuming only one element is observed
    const isVisible = entry.isIntersecting;
    this.visibilityChange.next(isVisible);
  }

  private setupDebouncedVisibility() {
    this.visibilityChange
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((isVisible) => {
        this._visible = isVisible;
        this.visible.emit(isVisible);
        this.addVisibility(isVisible);
      });
  }

  private addVisibility(isVisible: boolean) {
    if (isVisible) this.render.addClass(this.element.nativeElement, "visible");
    else this.render.removeClass(this.element.nativeElement, "visible");
  }

  private disconnectObserver() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  private listenScrollChanges() {
    this.scroll.scrollChange
      .pipe(
        takeUntil(this.destroy$),
        filter(() => this._visible)
      )
      .subscribe((value) =>
        this.calculateScrollPercentageWithinInterseption()
      );
  }

  private calculateScrollPercentageWithinInterseption() {
    const start = this.element.nativeElement.getBoundingClientRect().left;
    const scrollPercentage = (start / this.element.nativeElement.clientWidth) * 100;

    const output = {
      percentage: scrollPercentage,
      value: 0,
    };

    this.scrollPercentage.emit(output);
  }
}

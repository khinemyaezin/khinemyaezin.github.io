import { isPlatformBrowser } from "@angular/common";
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  Renderer2,
} from "@angular/core";
import { Subject, takeUntil } from "rxjs";

@Directive({
  selector: "[intersection]",
  standalone: true,
})
export class IntersectionDirective implements OnDestroy, AfterViewInit, OnInit {
  @Input() debounceTime = 0; // Optional debounce delay (milliseconds)
  @Input() name: string = "";
  @Output() visible = new EventEmitter<boolean>();
  @Output() scrollPercentage = new EventEmitter<{
    percentage: number;
    value: number;
  }>();

  private observer: IntersectionObserver | null = null;
  private visibilityChange = new Subject<boolean>();
  private destroy$ = new Subject<void>();

  constructor(
    private element: ElementRef,
    private render: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  @Input() delay: number = 0;

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.createObserver();
      this.setupDebouncedVisibility();
    }
  }

  ngOnDestroy() {
    this.disconnectObserver();
    this.destroy$.next();
    this.destroy$.complete();
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
      .pipe(takeUntil(this.destroy$))
      .subscribe((isVisible) => {
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
}

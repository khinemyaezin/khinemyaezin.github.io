import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Directive({
  selector: '[interception]',
  standalone: true,
})
export class InterceptionDirective implements OnDestroy, AfterViewInit {
  @Input() debounceTime = 0; // Optional debounce delay (milliseconds)
  @Output() visible = new EventEmitter<boolean>();

  private observer: IntersectionObserver | null = null;
  private visibilityChange = new Subject<boolean>();
  private destroy$ = new Subject<void>();

  constructor(private element: ElementRef, private render: Renderer2) {}
  @Input() delay: number = 0;
  ngAfterViewInit(): void {
    this.createObserver();
    this.setupDebouncedVisibility();
  }

  ngOnInit() {}

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
      .pipe(debounceTime(this.debounceTime), takeUntil(this.destroy$))
      .subscribe((isVisible) => {
        setTimeout(() => {
          this.visible.emit(isVisible);
          if (isVisible)
            this.render.addClass(this.element.nativeElement, 'visible');
          else this.render.removeClass(this.element.nativeElement, 'visible');
        }, this.delay);
      });
  }

  private disconnectObserver() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

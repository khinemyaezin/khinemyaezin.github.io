import {
  Directive,
  HostListener,
  Inject,
  PLATFORM_ID,
  Renderer2,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[cursor]',
  standalone: true
})
export class CursorDirective implements AfterViewInit, OnDestroy {
  private cursorX = 0;
  private cursorY = 0;
  private trailX = 0;
  private trailY = 0;
  private isHovering = false;
  private isBrowser = false;
  private animationFrameId: number | null = null;

  private cursorElement: HTMLElement | null = null;
  private trailElement: HTMLElement | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.createCursorElements();
      this.animateCursor();
    }
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.removeCursorElements();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isBrowser) return;
    this.cursorX = event.clientX;
    this.cursorY = event.clientY;

    const target = event.target as HTMLElement;
    this.isHovering = target.closest('a, button, [role="button"]') !== null;

    this.updateCursorPosition();
  }

  private createCursorElements(): void {
    this.cursorElement = this.renderer.createElement('div');
    this.renderer.addClass(this.cursorElement, 'custom-cursor');

    this.trailElement = this.renderer.createElement('div');
    this.renderer.addClass(this.trailElement, 'cursor-trail');

    this.renderer.appendChild(this.document.body, this.cursorElement);
    this.renderer.appendChild(this.document.body, this.trailElement);
  }

  private removeCursorElements(): void {
    if (this.cursorElement) {
      this.renderer.removeChild(this.document.body, this.cursorElement);
    }
    if (this.trailElement) {
      this.renderer.removeChild(this.document.body, this.trailElement);
    }
  }

  private updateCursorPosition(): void {
    if (this.cursorElement) {
      this.renderer.setStyle(this.cursorElement, 'left', `${this.cursorX}px`);
      this.renderer.setStyle(this.cursorElement, 'top', `${this.cursorY}px`);

      if (this.isHovering) {
        this.renderer.addClass(this.cursorElement, 'cursor-hover');
      } else {
        this.renderer.removeClass(this.cursorElement, 'cursor-hover');
      }
    }
  }

  private animateCursor(): void {
    this.trailX += (this.cursorX - this.trailX) * 0.15;
    this.trailY += (this.cursorY - this.trailY) * 0.15;

    if (this.trailElement) {
      this.renderer.setStyle(this.trailElement, 'left', `${this.trailX}px`);
      this.renderer.setStyle(this.trailElement, 'top', `${this.trailY}px`);
    }

    this.animationFrameId = requestAnimationFrame(() => this.animateCursor());
  }
}

import { Component, ElementRef, Input, Renderer2, ViewChild } from "@angular/core";
import { Subject, combineLatest, filter, takeUntil } from "rxjs";
import { ScrollEmitterDirective } from "../../directive/scroll-emitter.directive";
import { IntersectionDirective } from "../../directive/intersection.directive";
import { DadComponent } from "../../dad-component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "section-contact",
  standalone: true,
  imports: [CommonModule,IntersectionDirective],
  templateUrl: "./contact.component.html",
  styleUrl: "./contact.component.scss",
})
export class ContactComponent extends DadComponent {
  @ViewChild("container") containerRef!: ElementRef;
  @ViewChild("text") textEl!: ElementRef;
  @ViewChild(IntersectionDirective) intersection!: IntersectionDirective;
 
  get today() {
    return new Date();
  }

  constructor(
    private scroll: ScrollEmitterDirective,
    private render: Renderer2
  ) {
    super();

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
    
  }
}

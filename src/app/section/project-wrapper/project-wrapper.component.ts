import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ProjectComponent } from '../project/project.component';
import { DadComponent } from '../../dad-component';

@Component({
  selector: 'section-project',
  standalone: true,
  imports: [ProjectComponent],
  templateUrl: './project-wrapper.component.html',
  styleUrl: './project-wrapper.component.scss'
})
export class ProjectWrapperComponent extends DadComponent implements AfterViewInit {
  @ViewChild("projectWrapper") section!: ElementRef;
  private _sessionOffsetTop: number = 0;

  get sessionOffsetTop(): number {
    return this._sessionOffsetTop;
  }

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngAfterViewInit(): void {
    this._sessionOffsetTop = this.section.nativeElement.offsetTop || 0;
    this.cdr.detectChanges();
  }
}

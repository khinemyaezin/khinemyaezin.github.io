import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-parallax-item',
  standalone: true,
  imports: [],
  templateUrl: './parallax-item.component.html',
  styleUrl: './parallax-item.component.scss'
})
export class ParallaxItemComponent {
  @Input() url:string = "";
  @Input() dataDepth: number = 0;
  @Input() initPx: number = 0;
  @Input() axis: string = 'x';
  @Input() index:number = 1;

}

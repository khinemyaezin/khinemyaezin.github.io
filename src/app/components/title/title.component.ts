import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { InterceptionDirective } from '../../directive/interception.directive';
import { EventEmitter } from 'stream';
import { ParallaxItemDirective } from '../../directive/parallax-item.directive';
import { NgFor } from '@angular/common';
import { MovingCardDirective } from '../../directive/moving-card.directive';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [InterceptionDirective, ParallaxItemDirective, NgFor, MovingCardDirective],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
})
export class TitleComponent implements OnInit {
  @Input() prefix: string = '';
  @Input() suffex: string = '';
  @Input() title: string = '';

  _prefix: string[] = [];
  _suffex: string[] = [];
  ngOnInit(): void {
    this._prefix = this.prefix.split(',');
    this._suffex = this.suffex.split(',');
  }
}

import { Component, Input, OnInit } from "@angular/core";
import { NgFor } from "@angular/common";
import { MovingCardDirective } from "../../directive/moving-card.directive";
import { AosDirective } from "../../directive/aos.directive";
import { Observable } from "rxjs";

@Component({
  selector: "app-title",
  standalone: true,
  imports: [AosDirective, NgFor, MovingCardDirective],
  templateUrl: "./title.component.html",
  styleUrl: "./title.component.scss",
})
export class TitleComponent implements OnInit {
  @Input() prefix: string = "";
  @Input() suffex: string = "";
  @Input() title: string = "";

  _prefix: string[] = [];
  _suffex: string[] = [];
  ngOnInit(): void {
    this._prefix = this.prefix.split(",");
    this._suffex = this.suffex.split(",");
  }
}

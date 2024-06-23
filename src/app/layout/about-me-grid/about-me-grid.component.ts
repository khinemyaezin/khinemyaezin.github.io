import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { TitleComponent } from "../../components/title/title.component";
import { InterceptionDirective } from "../../directive/interception.directive";
import { AboutMeComponent } from "../../components/about-me/about-me.component";
import { LeafDirective } from "../../directive/leaf.directive";
import { Observable, Subject, fromEvent } from "rxjs";

@Component({
  selector: "app-about-me-grid",
  standalone: true,
  imports: [
    TitleComponent,
    InterceptionDirective,
    AboutMeComponent,
    LeafDirective,
  ],
  templateUrl: "./about-me-grid.component.html",
  styleUrl: "./about-me-grid.component.scss",
})
export class AboutMeGridComponent {
  interceptionEvent: Subject<any> = new Subject<any>();

  handleInterceptionEvent(event: any) {
    this.interceptionEvent.next(event);
  }
}

import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { IntersectionDirective } from "../../directive/intersection.directive";
import { TextRevealDirective } from "../../directive/text-reveal.directive";

@Component({
  selector: "section-blog",
  standalone: true,
  imports: [CommonModule, IntersectionDirective,TextRevealDirective],
  templateUrl: "./blog.component.html",
  styleUrl: "./blog.component.scss",
})
export class BlogComponent {
  blogPosts = [
    {
      title: "Backend Developer - Yomabank",
      time: "3 MIN",
      image:
        "",
      desc:"Develop and create APIs used to construct for the bank, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices."
    },
    {
      title: "Developer - MIT",
      time: "3 MIN",
      image:
        "",
      desc:"Developed software solutions diverse array of projects such as Retail, Delivery,Survey and point-of-sale applications. Collaborated with other developers to integrate systems for the clients."
    }
  ];
}

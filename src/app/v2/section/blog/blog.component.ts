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
      title: "Senior Backend Developer",
      company:"@Yomabank",
      duration:"2023 - 2024",
      languages: ["Spring boot", "Microservices"],
      image:
        "https://upload.wikimedia.org/wikipedia/en/3/3c/Yoma_Bank_Logo.svg",
      desc:"Develop and create APIs used to construct for the bank, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices."
    },
    {
      title: "Developer",
      company:"@MIT",
      duration:"2019 - 2021",
      languages: ["Spring MVC","C#", "Angular", "Ionic"],
      image:
        "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_300,w_300,f_auto,q_auto/1113117/s5fcprkr6p67qbdyl2y0.png",
      desc:"Developed software solutions diverse array of projects such as Retail, Delivery,Survey and point-of-sale applications. Collaborated with other developers to integrate systems for the clients."
    }
  ];
}

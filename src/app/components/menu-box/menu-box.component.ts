import { Component } from '@angular/core';
import { BarsDirective } from '../../directive/bars/bars.directive';
import { BarDirective } from '../../directive/bars/bar.directive';
import { InterceptionDirective } from '../../directive/interception.directive';
import { TitleMenuBoxDirective } from './title.menu-box.directive';
import { BackgroundBarDirective } from '../../directive/bars/background.bar.directive';
import { CommonModule } from '@angular/common';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-menu-box',
  standalone: true,
  imports: [
    CommonModule,
    BarsDirective, 
    BarDirective,
    InterceptionDirective,
    TitleMenuBoxDirective,
    BackgroundBarDirective,
    LinkComponent
   
  ],
  templateUrl: './menu-box.component.html',
  styleUrl: './menu-box.component.scss'
})
export class MenuBoxComponent {
  public experiences = [
    {
      title:"Story",
      href:"#story",
      background:"blur bg-warning",
      backgroundImage:"https://images.ctfassets.net/yradwo9j96ad/Je136XLKs3Zl5Klr9DESA/31c9a0ebf318d468d82dcf3c0f459a78/Screen_Shot_2022-07-05_at_7.22.44_AM.png"
    },
    {
      title:"Timeline",
      href:"#timeline",
      background:"blur bg-danger"
    },
  
    {
      title:"Contact",
      href:"#contact",
      background:"blur bg-info"
    }
  ]
  hoverMouse(event:any){

  }
}

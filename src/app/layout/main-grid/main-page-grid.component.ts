import { Component, ElementRef, OnInit } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { HeroPropertiesComponent } from '../../components/hero-properties/hero-properties.component';
import { ParallaxItemDirective } from '../../directive/parallax-item.directive';
import { MenuBoxComponent } from '../../components/menu-box/menu-box.component';
import { InterceptionDirective } from '../../directive/interception.directive';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    HeroComponent,
    MenuComponent,
    HeroPropertiesComponent,
    ParallaxItemDirective,
    MenuBoxComponent,
    InterceptionDirective
  ],
  templateUrl: './main-page-grid.component.html',
  styleUrl: './main-page-grid.component.scss'
})
export class MainPageGridComponent implements OnInit{
  constructor(
    private el: ElementRef
  ) {}
  ngOnInit(): void {
  }

  
}

import { Component } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { InterceptionDirective } from '../../directive/interception.directive';
import { AboutMeComponent } from '../../components/about-me/about-me.component';
import { LeafDirective } from '../../directive/leaf.directive';

@Component({
  selector: 'app-about-me-grid',
  standalone: true,
  imports: [TitleComponent,InterceptionDirective,AboutMeComponent,LeafDirective],
  templateUrl: './about-me-grid.component.html',
  styleUrl: './about-me-grid.component.scss'
})
export class AboutMeGridComponent {

}

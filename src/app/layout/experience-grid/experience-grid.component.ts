import { Component } from '@angular/core';
import { ExperienceComponent } from '../../components/experience/experience.component';
import { TitleComponent } from '../../components/title/title.component';
import { InterceptionDirective } from '../../directive/interception.directive';

@Component({
  selector: 'app-experience-grid',
  standalone: true,
  imports: [ExperienceComponent,TitleComponent,InterceptionDirective],
  templateUrl: './experience-grid.component.html',
  styleUrl: './experience-grid.component.scss'
})
export class ExperienceGridComponent {

}

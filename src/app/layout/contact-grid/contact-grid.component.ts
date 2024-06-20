import { Component } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { InterceptionDirective } from '../../directive/interception.directive';

@Component({
  selector: 'app-contact-grid',
  standalone: true,
  imports: [TitleComponent, ContactComponent,InterceptionDirective],
  templateUrl: './contact-grid.component.html',
  styleUrl: './contact-grid.component.scss'
})
export class ContactGridComponent {

}

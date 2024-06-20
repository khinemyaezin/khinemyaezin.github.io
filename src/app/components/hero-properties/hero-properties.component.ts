import { AfterViewInit, Component, inject } from '@angular/core';
import { TypeWritterDirective } from '../../directive/type-writter.directive';
import { TypeWritterService } from '../../directive/type-writter.service';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-hero-properties',
  standalone: true,
  imports: [TypeWritterDirective,AsyncPipe],
  templateUrl: './hero-properties.component.html',
  styleUrl: './hero-properties.component.scss'
})
export class HeroPropertiesComponent{
  public properties:string[] = [
    "Data Whisperer.",
    "Code Conjurer.",
    "Backend Enchanter.",
    "Data Dynamo.",
  ];

  private typewriterService = inject(TypeWritterService);

  // typedText$ = this.typewriterService
  //   .getTypewriterEffect(this.properties)
  //   .pipe(map((text) => text));

  constructor(){}
}

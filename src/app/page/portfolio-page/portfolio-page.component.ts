import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PortfolioComponent } from '../../layout/portfolio-home/portfolio.component';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [RouterModule, PortfolioComponent],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.scss',
})
export class PortfolioPageComponent {}

import { Routes } from '@angular/router';
import { PortfolioPageComponent } from './page/portfolio-page/portfolio-page.component';
import { PortfolioComponent } from './layout/portfolio-home/portfolio.component';
import { AboutMeHomeComponent } from './layout/about-me-home/about-me-home.component';

export const routes: Routes = [
  {
    path: '',
    component: PortfolioPageComponent,
    children: [
      {
        path:"", redirectTo:"home", pathMatch:"full"
      },
      {
        path: 'home',
        component: PortfolioComponent,
      },
      {
        path: 'about',
        component: AboutMeHomeComponent,
      },
    ],
  },
];

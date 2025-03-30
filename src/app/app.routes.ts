import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { PortfolioComponent } from './layout/portfolio/portfolio.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path:"", redirectTo:"home", pathMatch:"full"
      },
      {
        path: 'home',
        component: PortfolioComponent
      }
    ],
  },
];

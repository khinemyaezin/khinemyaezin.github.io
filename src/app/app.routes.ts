import { Routes } from '@angular/router';
import { HomeComponent } from './v2/layout/home/home.component';
import { PortfolioV2Component } from './v2/layout/portfolio-v2/portfolio-v2.component';

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
        component: PortfolioV2Component
      }
    ],
  },
];

import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'statistics',
    loadComponent: () =>
      import('./pages/statistics/statistics').then((m) => m.Statistics),
  },
  {
    path: 'global-businesses',
    loadComponent: () =>
      import('./pages/global-businesses/global-businesses').then(
        (m) => m.GlobalBusinesses
      ),
  },
  {
    path: 'user-section',
    loadComponent: () =>
      import('./pages/user-section/user-section').then((m) => m.UserSection),
  },
  {
    path: 'top-businesses',
    loadComponent: () =>
      import('./pages/top-businesses/top-businesses').then(
        (m) => m.TopBusinesses
      ),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

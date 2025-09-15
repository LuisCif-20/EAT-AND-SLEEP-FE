import { Routes } from '@angular/router';
import { MainLayout } from './shared/layouts/main-layout/main-layout';
import { publicRoutesGuard } from './core/guards/public-routes-guard';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'auth',
    canMatch: [publicRoutesGuard],
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: '404',
    loadComponent: () => import('./shared/pages/error404-page/error404-page'),
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./shared/pages/home-page/home-page'),
      },
      {
        path: 'profile',
        canMatch: [authGuard],
        loadComponent: () => import('./shared/pages/profile-page/profile-page'),
      },
      {
        path: 'edit-profile',
        canMatch: [authGuard],
        loadComponent: () => import('./shared/pages/edit-profile-page/edit-profile-page'),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

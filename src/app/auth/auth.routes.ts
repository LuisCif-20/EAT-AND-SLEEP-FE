import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';

const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login-page/login-page'),
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/register-page/register-page'),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
    ],
  },
];

export default routes;

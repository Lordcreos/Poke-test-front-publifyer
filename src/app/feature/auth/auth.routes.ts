import { Routes } from '@angular/router';

const loadLoginPage = () => import('./pages/login-page/login-page.component');
const loadRegisterPage = () => import('./pages/register-page/register-page.component');

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: loadLoginPage,
  },
  {
    path: 'register',
    loadComponent: loadRegisterPage,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

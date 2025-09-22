import { Routes } from '@angular/router';
import { authRoutes } from './feature/auth/auth.routes';
import { authGuard, guessGuard } from './core/guards';
import { mainRoutes } from './feature/main/main.routes';

const loadAuthLayout = () => import('@feature/auth/layout/auth-layout.component');
const loadMainLayout = () => import('@feature/main/layout/main-layout.component');
const loadLandingPage = () => import('@feature/landing/pages/landing-page/landing-page.component');

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: loadAuthLayout,
    canActivate: [authGuard],
    children: authRoutes,
  },
  {
    path: 'landing',
    loadComponent: loadLandingPage,
    // Sin guard - accesible para todos
  },
  {
    path: '',
    loadComponent: loadMainLayout,
    canActivate: [guessGuard],
    children: mainRoutes,
  },
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
];

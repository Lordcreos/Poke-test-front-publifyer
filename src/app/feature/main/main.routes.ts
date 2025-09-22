import { Routes } from '@angular/router';
import { canManagePokedexGuard, canManageTeamsGuard, visitorGuard } from '@core/guards';

const loadHomePage = () => import('./pages/home-page/home-page.component');
const loadPokedexPage = () => import('./pages/pokedex-page/pokedex-page.component');
const loadMisEquiposPage = () => import('./pages/my-team-page/my-team-page.component');
const loadTeamPage = () => import('./pages/team-page/team-page.component');
const loadProfilePage = () => import('./pages/profile-page/profile-page.component');

export const mainRoutes: Routes = [
  {
    path: '',
    loadComponent: loadHomePage,
    canActivate: [visitorGuard], // Home es accesible para todos
  },
  {
    path: 'profile',
    loadComponent: loadProfilePage,
    canActivate: [visitorGuard], // Perfil accesible para usuarios logueados
  },
  {
    path: 'pokedex',
    loadComponent: loadPokedexPage,
    canActivate: [canManagePokedexGuard], // Solo Admin y Trainer pueden gestionar pokédex
  },
  {
    path: 'my-teams',
    canActivate: [canManageTeamsGuard], // Solo Admin y Trainer pueden gestionar equipos
    children: [
      {
        path: '',
        loadComponent: loadMisEquiposPage,
      },
      {
        path: ':id',
        loadComponent: loadTeamPage,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

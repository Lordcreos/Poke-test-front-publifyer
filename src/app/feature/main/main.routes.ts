import { Routes } from '@angular/router';

const loadHomePage = () => import('./pages/home-page/home-page.component');
const loadPokedexPage = () => import('./pages/pokedex-page/pokedex-page.component');
const loadMisEquiposPage = () => import('./pages/my-team-page/my-team-page.component');
const loadTeamPage = () => import('./pages/team-page/team-page.component');

export const mainRoutes: Routes = [
  {
    path: '',
    loadComponent: loadHomePage,
  },
  {
    path: 'pokedex',
    loadComponent: loadPokedexPage,
  },
  {
    path: 'my-teams',
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

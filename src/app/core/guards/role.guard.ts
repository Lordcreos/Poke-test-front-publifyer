import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services';
import { UserRole } from '../models';

/**
 * Guard genérico para verificar múltiples roles
 * @param allowedRoles Array de roles permitidos
 * @returns CanActivateFn
 */
export function roleGuard(allowedRoles: UserRole[]): CanActivateFn {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isLoggedIn()) {
      router.navigate(['/auth/login']);
      return false;
    }

    if (authService.hasAnyRole(allowedRoles)) {
      return true;
    }

    // Redirigir a una página de acceso denegado o home según el rol
    router.navigate(['/']);
    return false;
  };
}

/**
 * Guard específico para administradores
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/auth/login']);
    return false;
  }

  if (authService.isAdmin()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};

/**
 * Guard para entrenadores y administradores
 */
export const trainerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/auth/login']);
    return false;
  }

  if (authService.isAdmin() || authService.isTrainer()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};

/**
 * Guard específico para visitantes (acceso público)
 */
export const visitorGuard: CanActivateFn = (route, state) => {
  // Los visitantes pueden acceder a rutas públicas sin estar logueados
  return true;
};

/**
 * Guard para verificar permisos específicos
 */
export const canManagePokedexGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/auth/login']);
    return false;
  }

  if (authService.canManagePokedex()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};

/**
 * Guard para verificar permisos de gestión de equipos
 */
export const canManageTeamsGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/auth/login']);
    return false;
  }

  if (authService.canManageTeams()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
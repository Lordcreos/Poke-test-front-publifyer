import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '@core/services';

export const guessGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();

  if (!isLoggedIn) {
    // Si no está logueado y está intentando acceder a la raíz, redirigir a landing
    if (state.url === '/') {
      router.navigate(['/landing']);
      return false;
    }
    // Para otras rutas protegidas, redirigir a login
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};

import { Component, inject } from '@angular/core';
import { AuthService } from '@core/services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-role-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (currentUser) {
      <div class="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
           [ngClass]="getRoleClasses(currentUser.role)">
        <span class="w-2 h-2 rounded-full bg-current"></span>
        <span>{{ getRoleLabel(currentUser.role) }}</span>
      </div>
    }
  `
})
export class UserRoleIndicatorComponent {
  private authService = inject(AuthService);
  
  get currentUser() {
    return this.authService.getCurrentUser();
  }

  getRoleClasses(role: string): string {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'trainer':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'visitor':
        return 'bg-gray-100 text-gray-800 border border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  }

  getRoleLabel(role: string): string {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'trainer':
        return 'Entrenador';
      case 'visitor':
        return 'Visitante';
      default:
        return 'Usuario';
    }
  }
}
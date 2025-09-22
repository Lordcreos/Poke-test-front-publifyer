import { inject, Injectable, signal } from '@angular/core';
import { NewUser, User, UserEntity, UserRole } from '../models';
import { Router } from '@angular/router';
import { MockDataService } from './mock-data.service';
import { ToastService } from './toast.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private mockDataService = inject(MockDataService);
  private toastService = inject(ToastService);
  private translateService = inject(TranslateService);

  private currentUser = signal<User | null>(null);

  async login(email: string, password: string, rememberMe: boolean): Promise<void> {
    // Primero intentar con usuarios mock
    const mockUser = this.mockDataService.validateCredentials(email, password);
    
    if (mockUser) {
      const { password: _password, ...rest } = mockUser;
      const currentUser: User = rest;
      this.currentUser.set(currentUser);
      
      try {
        if (rememberMe) {
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
          sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
        this.router.navigate(['/']);
        return;
      } catch (error) {
        throw new Error('TOAST.LOGIN.ERROR');
      }
    }

    // Fallback a usuarios registrados tradicionalmente
    const users: UserEntity[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u) => u.email === email && u.password === password);

    if (user === undefined) throw new Error('TOAST.LOGIN.INVALID_CREDENTIALS');

    const { password: _password, ...rest } = user;
    const currentUser: User = rest;
    this.currentUser.set(currentUser);
    try {
      if (rememberMe) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      } else {
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
      }
      this.router.navigate(['/']);
    } catch (error) {
      throw new Error('TOAST.LOGIN.ERROR');
    }
  }

  async register(newUser: NewUser): Promise<void> {
    const users: UserEntity[] = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((u) => u.email === newUser.email);
    
    // También verificar en usuarios mock
    const existingMockUser = this.mockDataService.findUserByEmail(newUser.email);

    if (existingUser || existingMockUser) {
      throw new Error('TOAST.REGISTER.INVALID_CREDENTIALS');
    }

    const user: UserEntity = {
      id: this.generateId(),
      ...newUser,
      role: UserRole.TRAINER, // Usuarios registrados son trainers por defecto
    };

    try {
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      throw new Error('TOAST.REGISTER.ERROR');
    }
  }

  async logout(): Promise<void> {
    try {
      localStorage.removeItem('currentUser');
      sessionStorage.removeItem('currentUser');
      this.currentUser.set(null);
      await this.router.navigate(['auth', 'login']);
    } catch (error) {
      throw new Error('TOAST.LOGOUT.ERROR');
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getCurrentUserFromStorage();
    return user !== null;
  }

  private generateId(): string {
    return (
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    );
  }

  private getCurrentUserFromStorage(): User | null {
    const userData = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    return userData ? (JSON.parse(userData) as User) : null;
  }

  public getCurrentUser(): User | null {
    // Solo retornar el valor actual sin modificar el signal en computed
    const current = this.currentUser();
    if (current === null) {
      return this.getCurrentUserFromStorage();
    }
    return current;
  }

  // Método para inicializar el usuario desde storage (llamar fuera de computed)
  public initializeCurrentUser(): void {
    if (this.currentUser() === null) {
      const user = this.getCurrentUserFromStorage();
      this.currentUser.set(user);
    }
  }

  // ============ MÉTODOS DE ROLES Y PERMISOS ============

  // Verificación de roles específicos
  public isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === UserRole.ADMIN;
  }

  public isTrainer(): boolean {
    const user = this.getCurrentUser();
    return user?.role === UserRole.TRAINER;
  }

  public isVisitor(): boolean {
    const user = this.getCurrentUser();
    return user?.role === UserRole.VISITOR;
  }

  // Verificación de roles
  public hasRole(role: UserRole): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  public hasAnyRole(roles: UserRole[]): boolean {
    const user = this.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }

  // Verificación de capacidades/permisos
  public canManagePokedex(): boolean {
    return this.isAdmin() || this.isTrainer();
  }

  public canManageTeams(): boolean {
    return this.isAdmin() || this.isTrainer();
  }

  public canViewAdvancedStats(): boolean {
    return this.isAdmin() || this.isTrainer();
  }

  // Método para obtener cuentas de prueba (para mostrar en login)
  public getTestAccounts() {
    return this.mockDataService.getTestAccounts();
  }

  // ============ MÉTODOS DE CONTROL DE ACCESO ============

  /**
   * Verifica si el usuario puede acceder a una funcionalidad específica
   * Si no puede, muestra un toast de error apropiado
   */
  public checkAccessWithToast(requiredPermission: 'pokedex' | 'teams' | 'admin'): boolean {
    const user = this.getCurrentUser();
    
    if (!user) {
      this.showAccessDeniedToast('loginRequired');
      return false;
    }

    if (user.role === UserRole.VISITOR) {
      this.showAccessDeniedToast('visitorLimitation');
      return false;
    }

    switch (requiredPermission) {
      case 'admin':
        if (!this.isAdmin()) {
          this.showAccessDeniedToast('insufficientPermissions');
          return false;
        }
        break;
      case 'pokedex':
      case 'teams':
        if (!this.canManagePokedex()) {
          this.showAccessDeniedToast('accessDeniedMessage');
          return false;
        }
        break;
    }

    return true;
  }

  /**
   * Muestra un toast de acceso denegado con el mensaje apropiado
   */
  private showAccessDeniedToast(messageKey: string): void {
    const detail = this.translateService.instant(`toast.${messageKey}`);
    this.toastService.showError(detail);
  }

  /**
   * Método simple para verificar y mostrar toast cuando se intenta acceder sin permisos
   */
  public requirePermission(permission: 'pokedex' | 'teams' | 'admin'): boolean {
    return this.checkAccessWithToast(permission);
  }
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenubarModule } from 'primeng/menubar';
import { LanguageSwitcherComponent } from '@shared/components/language-switcher/language-switcher.component';
import { AvatarComponent } from '@shared/components/avatar/avatar.component';
import { UserRoleIndicatorComponent } from '@shared/components/user-role-indicator/user-role-indicator.component';
import { MenuItem } from 'primeng/api';
import { AuthService } from '@core/services';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-main-layout',
  imports: [
    CommonModule,
    MenubarModule,
    AvatarComponent,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    LanguageSwitcherComponent,
    UserRoleIndicatorComponent,
    ToastModule,
  ],
  templateUrl: './main-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MainLayoutComponent {
  private translate = inject(TranslateService);
  private authService = inject(AuthService);
  private router = inject(Router);

  private menuKeys: { key: string; route: string; permission?: 'pokedex' | 'teams' }[] = [
    { key: 'main-layout.home', route: '/' },
    { key: 'main-layout.pokedex', route: '/pokedex', permission: 'pokedex' },
    { key: 'main-layout.myTeam', route: '/my-teams', permission: 'teams' },
  ];

  private labels = this.menuKeys.map((item) => signal(this.translate.instant(item.key)));

  items = computed<MenuItem[]>(() =>
    this.menuKeys
      .filter(item => {
        // Filtrar elementos según permisos
        if (!item.permission) return true; // Home siempre visible
        return item.permission === 'pokedex' ? this.authService.canManagePokedex() :
               item.permission === 'teams' ? this.authService.canManageTeams() : true;
      })
      .map((item, index) => ({
        label: this.labels[this.menuKeys.indexOf(item)](),
        command: () => this.navigateWithPermissionCheck(item.route, item.permission),
        showIcon: item.route !== '/', // No mostrar ícono para Home
      }))
  );

  constructor() {
    this.translate.onLangChange.subscribe(() => {
      this.menuKeys.forEach((item, index) => {
        this.labels[index].set(this.translate.instant(item.key));
      });
    });
  }

  /**
   * Navega a la ruta verificando permisos y mostrando toast si no los tiene
   */
  navigateWithPermissionCheck(route: string, permission?: 'pokedex' | 'teams'): void {
    if (!permission) {
      // Sin permisos requeridos, navegar directamente
      this.router.navigate([route]);
      return;
    }

    // Verificar permisos y mostrar toast si no los tiene
    if (this.authService.requirePermission(permission)) {
      this.router.navigate([route]);
    }
    // El toast se muestra automáticamente desde requirePermission
  }
}

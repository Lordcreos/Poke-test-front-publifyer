import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'avatar',
  imports: [AvatarModule, MenuModule],
  templateUrl: './avatar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  private translate = inject(TranslateService);
  private authService = inject(AuthService);
  private router = inject(Router);

  private menuConfig: { key: string; icon: string; command: () => void; adminOnly?: boolean }[] = [
    { key: 'avatar.profile', icon: 'pi pi-user', command: () => this.goToProfile() },
    { key: 'avatar.dashboard', icon: 'pi pi-chart-line', command: () => this.goToDashboard(), adminOnly: true },
    { key: 'avatar.logout', icon: 'pi pi-sign-out', command: () => this.logout() },
  ];

  private labels = this.menuConfig.map((item) => signal(this.translate.instant(item.key)));

  items = computed<MenuItem[]>(() =>
    this.menuConfig
      .filter(item => !item.adminOnly || this.authService.isAdmin()) // Filtrar items solo para admin
      .map((item, index) => ({
        label: this.labels[this.menuConfig.indexOf(item)](),
        icon: item.icon,
        command: item.command,
      }))
  );

  constructor() {
    this.translate.onLangChange.subscribe(() => {
      this.menuConfig.forEach((item, index) => {
        this.labels[index].set(this.translate.instant(item.key));
      });
    });
  }

  logout() {
    this.authService.logout();
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}

import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
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

  private menuConfig: { key: string; icon: string; command: () => void }[] = [
    { key: 'avatar.logout', icon: 'pi pi-sign-out', command: () => this.logout() },
  ];

  private labels = this.menuConfig.map((item) => signal(this.translate.instant(item.key)));

  items = computed<MenuItem[]>(() =>
    this.menuConfig.map((item, index) => ({
      label: this.labels[index](),
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
}

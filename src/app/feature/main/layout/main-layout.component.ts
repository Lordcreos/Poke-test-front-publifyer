import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenubarModule } from 'primeng/menubar';
import { LanguageSwitcherComponent } from '@shared/components/language-switcher/language-switcher.component';
import { AvatarComponent } from '@shared/components/avatar/avatar.component';
import { MenuItem } from 'primeng/api';

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
  ],
  templateUrl: './main-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MainLayoutComponent {
  private translate = inject(TranslateService);

  private menuKeys: { key: string; route: string }[] = [
    { key: 'main-layout.home', route: '/' },
    { key: 'main-layout.pokedex', route: '/pokedex' },
    { key: 'main-layout.my-teams', route: '/my-teams' },
  ];

  private labels = this.menuKeys.map((item) => signal(this.translate.instant(item.key)));

  items = computed<MenuItem[]>(() =>
    this.menuKeys.map((item, index) => ({
      label: this.labels[index](),
      routerLink: item.route,
    }))
  );

  constructor() {
    this.translate.onLangChange.subscribe(() => {
      this.menuKeys.forEach((item, index) => {
        this.labels[index].set(this.translate.instant(item.key));
      });
    });
  }
}

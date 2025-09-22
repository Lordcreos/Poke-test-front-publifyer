import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { LanguageService, Language } from '@core/services';

@Component({
  selector: 'language-switcher',
  imports: [CommonModule, SelectModule, FormsModule],
  templateUrl: './language-switcher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent {
  private language = inject(LanguageService);

  public availableLangs = this.language.availableLangs;
  public currentLang = this.language.currentLang;

  public onLanguageChange(lang: Language) {
    if (lang) {
      this.language.changeLanguage(lang.lang);
    }
  }
}

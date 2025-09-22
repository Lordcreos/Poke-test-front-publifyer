import { computed, inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getLanguageFlag, getLanguageName } from '@shared/utils';
import { CookieService } from 'ngx-cookie-service';

export interface Language {
  name: string;
  lang: string;
  flag: string;
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translate = inject(TranslateService);
  private cookies = inject(CookieService);

  private langs = signal<readonly string[]>(this.translate.getLangs());

  public currentLang = signal<Language>(this.createLanguage(this.getInitialLang()));

  public availableLangs = computed<Language[]>(() => this.langs().map(this.createLanguage));

  private getInitialLang(): string {
    return this.cookies.get('lang') || this.translate.getBrowserLang() || 'es';
  }

  private createLanguage(lang: string): Language {
    return {
      name: getLanguageName(lang),
      lang,
      flag: getLanguageFlag(lang),
    };
  }

  public changeLanguage(lang: string): boolean {
    if (!lang) return false;
    this.cookies.set('lang', lang);
    this.currentLang.set(this.createLanguage(lang));
    this.translate.use(lang);
    return true;
  }
}

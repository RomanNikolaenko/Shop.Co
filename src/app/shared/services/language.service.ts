import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '^environments/environment';

interface LangsModel {
  value: string;
  viewValue: string;
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly translateService = inject(TranslateService);
  private readonly document = inject(DOCUMENT);
  private readonly platformId: object = inject(PLATFORM_ID);
  static readonly langKey = environment.LANGUAGE_KEY;

  public langs: LangsModel[] = [];

  constructor() {
    this.getTranslations();
    this.langInit();
  }

  public langInit(): void {
    const lang = this.getLang();

    this.translateService.setDefaultLang('en');
    this.translateService.use(lang);
    if (isPlatformBrowser(this.platformId)) {
      this.document.documentElement.lang = lang;
    }
  }

  public setLang(value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(LanguageService.langKey, value);
    }
  }

  public getLang(): string {
    if (isPlatformBrowser(this.platformId)) {
      const language = this.langs.map(({ value }) => value);
      const langFromNavigator = navigator.language.split('-')[0];
      const includeLang = language.includes(langFromNavigator);
      const storedLang = localStorage.getItem(LanguageService.langKey);

      if (storedLang) {
        return storedLang;
      }

      if (includeLang) {
        return langFromNavigator;
      }

      return 'en';
    } else {
      // На сервері повертаємо дефолтну мову або 'en'
      return 'en';
    }
  }

  public clearLang(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(LanguageService.langKey);
    }
  }

  public getTranslations() {
    this.translateService
      .stream(['language.english', 'language.ukrainian'])
      .pipe(takeUntilDestroyed())
      .subscribe((translations) => {
        this.langs = [
          { value: 'en', viewValue: translations['language.english'] },
          { value: 'uk', viewValue: translations['language.ukrainian'] },
        ];
      });
  }
}

import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Loading } from '^shared/components/loading/loading';
import { LanguageService } from '^shared/services/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Loading],
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'wrapper' },
})
export class App implements OnInit, OnDestroy, AfterViewInit {
  private readonly languageService = inject(LanguageService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cdr = inject(ChangeDetectorRef);
  protected isLoading: boolean = true;

  private loadHandler = () => {
    setTimeout(() => {
      this.isLoading = false;
      this.cdr.markForCheck();
    }, 500);
  };

  ngOnInit(): void {
    this.languageService.langInit();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (document.readyState === 'complete') {
        this.isLoading = false;
        this.cdr.markForCheck();
      } else {
        window.addEventListener('load', this.loadHandler);
      }
    } else {
      this.isLoading = false;
      this.cdr.markForCheck();
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('load', this.loadHandler);
    }
  }
}

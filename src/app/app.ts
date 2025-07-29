import {
  Component,
  ChangeDetectionStrategy,
  inject,
  effect,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LanguageService } from '^services/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'wrapper' },
})
export class App {
  private readonly languageService = inject(LanguageService);

  constructor() {
    effect(() => {
      this.languageService.langInit();
    });
  }
}

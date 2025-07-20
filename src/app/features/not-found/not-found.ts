import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { STATIC_ROUTES } from '^app/core/static-routes';

@Component({
  selector: 'app-not-found',
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {
  protected year: number = Date.now();
  protected STATIC_ROUTES = STATIC_ROUTES;
}

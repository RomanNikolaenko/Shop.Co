import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { STATIC_ROUTES } from '^core/static-routes';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterModule, TranslateModule],
  standalone: true,
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {
  private readonly router = inject(Router);

  protected STATIC_ROUTES = STATIC_ROUTES;

  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }
}

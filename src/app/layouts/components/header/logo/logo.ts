import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { STATIC_ROUTES } from '^core/static-routes';
import { Icon } from '^shared/components/icon/icon';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterLink, Icon],
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Logo {
  private readonly router = inject(Router);
  protected STATIC_ROUTES = STATIC_ROUTES;

  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }
}

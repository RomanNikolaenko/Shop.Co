import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { STATIC_ROUTES } from '^core/static-routes';
import { UiStateService } from '^services/ui-state';

@Component({
  selector: 'app-menu',
  imports: [RouterModule, TranslateModule],
  standalone: true,
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {
  private readonly router = inject(Router);
  private readonly uiStateService = inject(UiStateService);

  protected STATIC_ROUTES = STATIC_ROUTES;

  protected isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }

  protected onBackgroundClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('nav')) {
      this.uiStateService.closeMenu();
    }
  }
}

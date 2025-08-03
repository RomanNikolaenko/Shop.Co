import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { STATIC_ROUTES } from '^core/static-routes';
import { IsCurrentRouteService } from '^services/is-current-route';
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
  private readonly uiStateService = inject(UiStateService);
  private readonly isCurrentRouteService = inject(IsCurrentRouteService);

  protected currentRoute = this.isCurrentRouteService.currentRoute;
  protected STATIC_ROUTES = STATIC_ROUTES;

  protected isAbout = computed(
    () => this.currentRoute() === STATIC_ROUTES.ABOUT.RouterLink,
  );

  protected isContact = computed(
    () => this.currentRoute() === STATIC_ROUTES.CONTACTS.RouterLink,
  );

  protected onBackgroundClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('nav')) {
      this.uiStateService.closeMenu();
    }
  }
}

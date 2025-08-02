import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { STATIC_ROUTES } from '^core/static-routes';
import { UiStateService } from '^services/ui-state';
import { Icon } from '^shared/components/icon/icon';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [RouterModule, RouterLink, Icon, TranslateModule],
  templateUrl: './actions.html',
  styleUrl: './actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Actions {
  private readonly router = inject(Router);
  private readonly uiStateService = inject(UiStateService);

  protected STATIC_ROUTES = STATIC_ROUTES;

  get showFormSearch() {
    return this.uiStateService.showFormSearch;
  }

  toggleSearch() {
    this.uiStateService.toggleSearch();
  }

  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }
}

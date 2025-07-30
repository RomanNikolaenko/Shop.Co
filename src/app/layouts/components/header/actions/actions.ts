import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { STATIC_ROUTES } from '^core/static-routes';
import { SearchService } from '^services/search';
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
  private readonly searchService = inject(SearchService);

  protected STATIC_ROUTES = STATIC_ROUTES;

  get showFormSearch() {
    return this.searchService.showFormSearch;
  }

  toggleSearch() {
    this.searchService.toggleSearch();
  }

  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }
}

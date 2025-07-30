import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  ChangeDetectorRef,
} from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';

import { loadingAnim } from '^shared/animations/loading';
import { Loading } from '^shared/components/loading/loading';

@Component({
  standalone: true,
  selector: 'app-auth-layout',
  imports: [RouterModule, Loading],
  animations: [loadingAnim],
  template: `
    @if (isLoading()) {
      <loading @loadingAnimation [fullPage]="true"></loading>
    } @else {
      <main class="wrapper">
        <router-outlet />
      </main>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'wrapper' },
})
export class AuthLayout {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly router = inject(Router);

  isLoading = signal(true);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading.set(true);
      }

      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.isLoading.set(false);
          this.cdr.markForCheck();
        }, 150);
      }
    });
  }
}

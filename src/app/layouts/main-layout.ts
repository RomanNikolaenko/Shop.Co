import {
  Component,
  ChangeDetectionStrategy,
  inject,
  ChangeDetectorRef,
  signal,
} from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';

import { Loading } from '^shared/components/loading/loading';

@Component({
  standalone: true,
  selector: 'app-main-layout',
  imports: [RouterModule, Loading],
  template: `
    @if (isLoading()) {
      <loading [fullPage]="true"></loading>
    } @else {
      <header><h1>Main Layout Header</h1></header>
      <main class="wrapper">
        <router-outlet />
      </main>
      <footer><p>Footer</p></footer>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'wrapper' },
})
export class MainLayout {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly router = inject(Router);

  isLoading = signal(true);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading.set(true);
      }

      if (event instanceof NavigationEnd) {
        this.isLoading.set(false);
        this.cdr.markForCheck();
      }
    });
  }
}

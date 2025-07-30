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

import { loadingAnim } from '^shared/animations/loading';
import { Loading } from '^shared/components/loading/loading';

import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';

@Component({
  standalone: true,
  selector: 'app-main-layout',
  imports: [RouterModule, Loading, Header, Footer],
  animations: [loadingAnim],
  template: `
    @if (isLoading()) {
      <loading @loadingAnimation [fullPage]="true"></loading>
    } @else {
      <app-header></app-header>
      <main class="wrapper">
        <router-outlet />
      </main>
      <app-footer></app-footer>
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
        setTimeout(() => {
          this.isLoading.set(false);
          this.cdr.markForCheck();
        }, 150);
      }
    });
  }
}

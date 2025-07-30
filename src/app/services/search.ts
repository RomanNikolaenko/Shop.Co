import { isPlatformBrowser } from '@angular/common';
import {
  computed,
  DestroyRef,
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly screenWidthState = 768;
  private readonly platformId = inject(PLATFORM_ID);
  private destroyRef? = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly screenWidth: WritableSignal<number> = signal(
    this.isBrowser ? window.innerWidth : this.screenWidthState,
  );

  readonly showFormSearch: WritableSignal<boolean> = signal(false);
  readonly showBtnSearch: WritableSignal<boolean> = signal(false);
  readonly querySignal: WritableSignal<string> = signal('');

  readonly lowerCaseQuery = computed(() => this.querySignal().toLowerCase());

  constructor() {
    if (this.isBrowser) {
      effect(() => {
        if (
          this.showFormSearch() &&
          this.screenWidth() < this.screenWidthState
        ) {
          document.body.classList.add('lock');
        } else {
          document.body.classList.remove('lock');
        }
      });
    }
  }

  initialize(destroyRef: DestroyRef) {
    this.destroyRef = destroyRef;

    if (this.isBrowser) {
      fromEvent<KeyboardEvent>(window, 'keydown')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((event) => {
          if (event.key === 'Escape') {
            this.closeSearch();
          }
        });

      fromEvent(window, 'resize')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.updateScreenWidth(window.innerWidth);
        });
    }
  }

  updateScreenWidth(width: number): void {
    this.screenWidth.set(width);
    if (width >= this.screenWidthState) {
      this.showFormSearch.set(true);
      this.showBtnSearch.set(false);
    } else {
      this.showFormSearch.set(false);
      this.showBtnSearch.set(true);
    }
  }

  toggleSearch(): void {
    if (this.screenWidth() < this.screenWidthState) {
      this.showFormSearch.update((value) => !value);
    }
  }

  closeSearch(): void {
    if (this.screenWidth() < this.screenWidthState && this.showFormSearch()) {
      this.showFormSearch.set(false);
      this.querySignal.set('');
    }
  }

  setQuery(value: string): void {
    this.querySignal.set(value);
  }
}

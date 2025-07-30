import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { FocusWithin } from '^directives/focusWithin';
import { SearchService } from '^services/search';
import { dropdownAnim } from '^shared/animations/dropdown';
import { popupAnim } from '^shared/animations/popup';
import { Icon } from '^shared/components/icon/icon';

@Component({
  selector: 'app-search',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    Icon,
    FocusWithin,
    A11yModule,
  ],
  standalone: true,
  templateUrl: './search.html',
  styleUrl: './search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [dropdownAnim, popupAnim],
})
export class Search implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchService = inject(SearchService);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly screenWidth = this.searchService.screenWidth;
  protected readonly showFormSearch = this.searchService.showFormSearch;
  protected readonly showBtnSearch = this.searchService.showBtnSearch;
  protected readonly querySignal = this.searchService.querySignal;
  protected readonly lowerCaseQuery = this.searchService.lowerCaseQuery;

  protected form: FormGroup = this.formBuilder.group({
    query: [''],
  });

  constructor() {
    this.form.get('query')?.valueChanges.subscribe((value) => {
      this.searchService.setQuery(value);
    });
  }

  ngOnInit() {
    this.searchService.initialize(this.destroyRef);

    if (isPlatformBrowser(this.platformId)) {
      this.searchService.updateScreenWidth(window.innerWidth);
    }

    this.form.reset();
    this.searchService.setQuery('');
  }

  onBackgroundClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('search')) {
      this.searchService.closeSearch();
    }
  }

  toggleSearch(): void {
    this.searchService.toggleSearch();
  }

  onSubmit(): void {
    const value = this.form.value.query;
    console.log('🔍 Search submitted:', value);
  }
}

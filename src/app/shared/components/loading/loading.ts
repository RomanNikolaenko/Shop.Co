import { NgClass } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';

@Component({
  selector: 'loading',
  standalone: true,
  imports: [NgClass],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.ngSkipHydration]': 'true',
  },
})
export class Loading {
  fullPage = input<boolean>(false);

  containerClasses = computed(() => ({
    loading__full: this.fullPage(),
  }));
}

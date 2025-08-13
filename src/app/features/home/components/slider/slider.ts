import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { register as registerSwiperElements } from 'swiper/element/bundle';

import { SwiperDirective } from '^directives/swiper';
import { SwiperService } from '^services/swiper';
import { Icon } from '^shared/components/icon/icon';
import { Rating } from '^shared/components/rating/rating';

if (typeof window !== 'undefined') {
  registerSwiperElements();
}

@Component({
  selector: 'slider',
  imports: [CommonModule, Rating, TranslateModule, Icon, SwiperDirective],
  standalone: true,
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Slider {
  private readonly swiperService = inject(SwiperService);

  get options() {
    return this.swiperService.getOptions();
  }

  protected slides = [
    {
      rating: 4,
      name: 'Jon Doe',
      text: '"I\'m blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I\'ve bought has exceeded my expectations.”',
    },
    {
      rating: 5,
      name: 'Jon Doe',
      text: '"I\'m blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I\'ve bought has exceeded my expectations.”',
    },
    {
      rating: 2,
      name: 'Jon Doe',
      text: '"I\'m blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I\'ve bought has exceeded my expectations.”',
    },
    {
      rating: 3,
      name: 'Jon Doe',
      text: '"I\'m blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I\'ve bought has exceeded my expectations.”',
    },
    {
      rating: 4,
      name: 'Jon Doe',
      text: '"I\'m blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I\'ve bought has exceeded my expectations.”',
    },
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BrowseByDressStyleModel } from '^interfaces/browse-by-dress-style';
import { CardModel } from '^interfaces/card';
import { Products } from '^shared/components/products/products';

import { BrowseByDressStyle } from './components/browse-by-dress-style/browse-by-dress-style';
import { Company } from './components/company/company';
import { Hero } from './components/hero/hero';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, Company, Products, BrowseByDressStyle],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected data: CardModel[] = [
    {
      url: '/',
      title: 'SKINNY FIT JEANS',
      img: 'assets/images/card.png',
      alt: 'Назва картинки',
      price: {
        new: 268,
        old: undefined,
      },
      save: undefined,
    },
    {
      url: '/',
      title: 'LOOSE FIT BERMUDA SHORTS',
      img: 'assets/images/card.png',
      alt: 'Назва картинки',
      price: {
        new: 352,
        old: 458,
      },
      save: '-23',
    },
  ];

  protected dataBrowse: BrowseByDressStyleModel[] = [
    {
      title: 'Casual',
      alt: 'Casual',
      src: 'assets/images/browse/image@1x.jpg',
      srcset:
        'assets/images/browse/image@1x.jpg 1x, assets/images/browse/image@2x.jpg 2x, assets/images/browse/image@3x.jpg 3x',
    },
    {
      title: 'Formal',
      alt: 'Formal',
      src: 'assets/images/browse/image@1x.jpg',
      srcset:
        'assets/images/browse/image@1x.jpg 1x, assets/images/browse/image@2x.jpg 2x, assets/images/browse/image@3x.jpg 3x',
    },
    {
      title: 'Party',
      alt: 'Party',
      src: 'assets/images/browse/image@1x.jpg',
      srcset:
        'assets/images/browse/image@1x.jpg 1x, assets/images/browse/image@2x.jpg 2x, assets/images/browse/image@3x.jpg 3x',
    },
    {
      title: 'Gym',
      alt: 'Gym',
      src: 'assets/images/browse/image@1x.jpg',
      srcset:
        'assets/images/browse/image@1x.jpg 1x, assets/images/browse/image@2x.jpg 2x, assets/images/browse/image@3x.jpg 3x',
    },
  ];
}

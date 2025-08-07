import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Company } from './components/company/company';
import { Hero } from './components/hero/hero';
import { Products } from '^shared/components/products/products';
import { CardModel } from '^interfaces/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, Company, Products],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected data: Array<CardModel> = [
    {
      url: '/',
      title: 'SKINNY FIT JEANS',
      img: 'assets/images/card.png',
      alt: 'Назва картинки',
      price: {
        new: 268,
        old: undefined,
      },
      save: undefined
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
    }
  ]
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Rating } from '../rating/rating';

@Component({
  selector: 'product-card',
  imports: [Rating],
  standalone: true,
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {}

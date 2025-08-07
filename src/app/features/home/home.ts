import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ProductCard } from '^shared/components/product-card/product-card';

import { Company } from './components/company/company';
import { Hero } from './components/hero/hero';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, Company, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}

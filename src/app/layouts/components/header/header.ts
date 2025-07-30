import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Search } from '^layouts/components/header/search/search';

import { Actions } from './actions/actions';
import { Burger } from './burger/burger';
import { Logo } from './logo/logo';
import { Menu } from './menu/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Logo, Menu, Search, Actions, Burger],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {}

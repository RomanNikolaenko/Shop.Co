import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Hero } from './components/hero/hero';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}

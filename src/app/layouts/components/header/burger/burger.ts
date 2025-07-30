import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-burger',
  imports: [TranslateModule],
  standalone: true,
  templateUrl: './burger.html',
  styleUrl: './burger.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Burger {
  openMenu = false;

  toggleMenu() {
    this.openMenu = !this.openMenu;
  }
}

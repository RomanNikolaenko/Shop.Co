import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-main-layout',
  imports: [CommonModule, RouterModule],
  template: `
    <header><h1>Main Layout Header</h1></header>
    <main class="wrapper">
      <router-outlet />
    </main>
    <footer><p>Footer</p></footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'wrapper' },
})
export class MainLayout {}

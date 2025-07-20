import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-auth-layout',
  imports: [CommonModule, RouterModule],
  template: ' <main class="wrapper"><router-outlet /></main> ',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'wrapper' },
})
export class AuthLayout {}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { STATIC_ROUTES } from '^core/static-routes';
import { FormField } from '^shared/components/form-field/form-field';
import { Icon } from '^shared/components/icon/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormField, TranslateModule, RouterLink, Icon],
  templateUrl: './register.html',
  styleUrls: ['./register.scss', '../user.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'wrapper' },
})
export class Register {
  private readonly formBuilder = inject(FormBuilder);
  protected STATIC_ROUTES = STATIC_ROUTES;

  protected loading = false;

  protected form = this.formBuilder.nonNullable.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*)(+=._-]).{6,20}',
        ),
        Validators.minLength(6),
        Validators.maxLength(20),
      ],
    ],
  });

  protected onSubmit() {
    this.loading = true;
    console.log('Form submitted:', this.form.value);
  }
}

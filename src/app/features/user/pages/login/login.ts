import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { FormField } from '^shared/components/form-field/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormField, TranslateModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss', '../../user.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'wrapper' },
})
export class Login {
  private readonly formBuilder = inject(FormBuilder);

  protected loading = false;

  protected form = this.formBuilder.nonNullable.group({
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

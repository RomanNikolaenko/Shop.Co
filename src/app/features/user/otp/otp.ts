import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { STATIC_ROUTES } from '^core/static-routes';
import { Icon } from '^shared/components/icon/icon';
import { OtpInput } from '^shared/components/otp-input/otp-input';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterLink,
    Icon,
    OtpInput,
  ],
  templateUrl: './otp.html',
  styleUrls: ['./otp.scss', '../user.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'wrapper' },
})
export class Otp {
  private readonly formBuilder = inject(FormBuilder);
  protected STATIC_ROUTES = STATIC_ROUTES;

  protected loading = false;
  protected otpPattern = /^\d{6}$/;
  protected isOtpTouched = false;
  protected isFormSubmitted = false;

  protected form = this.formBuilder.group({
    otp: ['', [Validators.required, Validators.pattern(this.otpPattern)]],
  });

  protected onOtpBlur() {
    this.isOtpTouched = true;
  }

  protected onSubmit() {
    this.isFormSubmitted = true;

    if (this.form.invalid) return;

    this.loading = true;
    console.log('✅ Form submitted:', this.form.value);
  }
}

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  QueryList,
  ViewChildren,
  OnInit,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';

@Component({
  selector: 'otp-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './otp-input.html',
  styleUrls: ['./otp-input.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OtpInput),
      multi: true,
    },
  ],
})
export class OtpInput implements ControlValueAccessor, OnInit {
  @Input() length = 6;
  @Input() showError = false;
  @Output() blur = new EventEmitter<void>();

  @ViewChildren('otpInput') inputs!: QueryList<ElementRef<HTMLInputElement>>;

  protected otp: string[] = [];

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    this.otp = Array(this.length).fill('');
  }

  get otpArray() {
    return Array(this.length);
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const val = input.value;

    if (/^\d$/.test(val)) {
      this.otp[index] = val;
      if (index < this.length - 1) {
        this.inputs.toArray()[index + 1].nativeElement.focus();
      }
    } else {
      this.otp[index] = '';
      input.value = '';
    }
    this.emit();
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.otp[index] && index > 0) {
      this.inputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  handleBlur() {
    setTimeout(() => {
      const focusedInside = this.inputs
        .toArray()
        .some((inputRef) => inputRef.nativeElement === document.activeElement);
      if (!focusedInside) {
        console.log('Blur fired — focus left all inputs');
        this.onTouched();
        this.blur.emit();
      }
    }, 0);
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();

    const pastedText = event.clipboardData?.getData('text')?.trim() ?? '';
    const digits = pastedText
      .replace(/\D/g, '')
      .split('')
      .slice(0, this.length);

    if (digits.length === 0) return;

    this.otp = Array(this.length).fill('');
    digits.forEach((digit, i) => {
      this.otp[i] = digit;
    });

    this.inputs.forEach((ref, i) => {
      ref.nativeElement.value = this.otp[i] || '';
    });

    this.emit();

    const firstEmpty = this.otp.findIndex((d) => d === '');
    const focusIndex = firstEmpty === -1 ? this.length - 1 : firstEmpty;
    this.inputs.toArray()[focusIndex]?.nativeElement.focus();
  }

  writeValue(value: string): void {
    this.otp = Array(this.length)
      .fill('')
      .map((_, i) => value?.[i] ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.inputs?.forEach((ref) => (ref.nativeElement.disabled = isDisabled));
  }

  private emit() {
    this.onChange(this.otp.join(''));
  }
}

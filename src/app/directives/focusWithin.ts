import {
  Directive,
  HostListener,
  Input,
  signal,
  computed,
  effect,
  ElementRef,
  Renderer2,
  inject,
  Signal,
} from '@angular/core';

@Directive({
  selector: '[focusWithin]',
  standalone: true,
})
export class FocusWithin {
  private readonly className = 'focus-within';

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  private _isActive = signal(false);
  readonly isActive = computed(() => this._isActive());

  @Input('focusWithin')
    excludeSelectors: string | string[] | Signal<string | string[]> = [];

  constructor() {
    effect(() => {
      const host = this.el.nativeElement;
      if (this.isActive()) {
        this.renderer.addClass(host, this.className);
      } else {
        this.renderer.removeClass(host, this.className);
      }
    });
  }

  @HostListener('focusin', ['$event'])
  onFocusIn(event: FocusEvent) {
    const target = event.target as HTMLElement;

    const rawSelectors =
      typeof this.excludeSelectors === 'function'
        ? this.excludeSelectors()
        : this.excludeSelectors;

    const rawSelectorsTyped: string | string[] = rawSelectors;

    const selectors: string[] = Array.isArray(rawSelectorsTyped)
      ? rawSelectorsTyped
      : [rawSelectorsTyped];

    const shouldExclude = selectors.some((sel) => target.matches(sel));

    this._isActive.set(!shouldExclude);
  }

  @HostListener('focusout')
  onFocusOut() {
    this._isActive.set(false);
  }
}

import { A11yModule } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  Type,
  ViewChild,
  ViewContainerRef,
  input,
  signal,
  effect,
  EventEmitter,
} from '@angular/core';

import { popupAnim } from '^shared/animations/popup';

import { Icon } from '../icon/icon';

@Component({
  selector: 'popup',
  standalone: true,
  imports: [Icon, A11yModule],
  templateUrl: './popup.html',
  styleUrls: ['./popup.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [popupAnim],
})
export class Popup<T extends object = object> {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  protected container!: ViewContainerRef;

  readonly childComponentType = input<Type<T>>();
  readonly childComponentInputs = input<Partial<T>>({});

  readonly animationState = signal<'void' | 'enter'>('void');
  readonly closed = new EventEmitter<void>();

  private touchStartX = 0;
  private touchEndX = 0;

  private readonly classes = {
    POPUP_OPEN: 'lock',
    POPUP_BACKDROP: 'popup-backdrop',
  };

  constructor() {
    effect(() => {
      const componentType = this.childComponentType();
      if (!componentType || !this.container) return;

      const ref = this.container.createComponent<T>(componentType);

      Object.assign(ref.instance, {
        ...this.childComponentInputs(),
        close: () => this.close(),
      });

      document.body.classList.add(this.classes.POPUP_OPEN);
      document.addEventListener('keydown', this.handleKeyDown);

      requestAnimationFrame(() => {
        this.animationState.set('enter');
      });
    });
  }

  ngOnDestroy() {
    document.body.classList.remove(this.classes.POPUP_OPEN);
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  protected close() {
    this.animationState.set('void');
    setTimeout(() => this.closed.emit(), 200);
  }

  protected onBackdropClick(event: MouseEvent) {
    if (
      (event.target as HTMLElement).classList.contains(
        this.classes.POPUP_BACKDROP,
      )
    ) {
      this.close();
    }
  }

  protected handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.close();
    }
  };

  protected onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  protected onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    if (this.touchStartX - this.touchEndX > 70) {
      this.close();
    }
  }
}

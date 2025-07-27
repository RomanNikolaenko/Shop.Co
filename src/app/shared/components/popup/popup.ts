import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { popupAnim } from '^shared/animations/popup';

import { Icon } from '../icon/icon';

@Component({
  selector: 'popup',
  standalone: true,
  imports: [CommonModule, Icon, A11yModule],
  templateUrl: './popup.html',
  styleUrls: ['./popup.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [popupAnim],
})
export class Popup<T extends object = object>
implements AfterViewInit, OnDestroy {
  @ViewChild('container', { read: ViewContainerRef, static: true })
    container!: ViewContainerRef;

  @Input() childComponentType!: Type<T>;
  @Input() childComponentInputs: Partial<T> = {};
  @Output() closed = new EventEmitter<void>();

  protected animationState: 'void' | 'enter' = 'void';

  private readonly cdr = inject(ChangeDetectorRef);
  private touchStartX = 0;
  private touchEndX = 0;

  private readonly classes = {
    POPUP_OPEN: 'popup-open',
    POPUP_BACKDROP: 'popup-backdrop',
  };

  private readonly selectors = {
    POPUP: '.popup-open',
  };

  ngAfterViewInit() {
    const ref = this.container.createComponent<T>(this.childComponentType);

    Object.assign(ref.instance, {
      ...this.childComponentInputs,
      close: () => this.close(),
    });

    document.body.classList.add(this.classes.POPUP_OPEN);
    document.addEventListener('keydown', this.handleKeyDown);

    requestAnimationFrame(() => {
      this.cdr.markForCheck();
      this.animationState = 'enter';
    });
  }

  ngOnDestroy() {
    document.body.classList.remove(this.classes.POPUP_OPEN);
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  protected close() {
    this.animationState = 'void';
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

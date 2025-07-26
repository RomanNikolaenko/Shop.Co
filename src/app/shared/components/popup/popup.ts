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

import { Icon } from '../icon/icon';

@Component({
  selector: 'popup',
  standalone: true,
  imports: [Icon],
  templateUrl: './popup.html',
  styleUrls: ['./popup.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Popup<T extends object = object>
  implements AfterViewInit, OnDestroy {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  @Input() childComponentType!: Type<T>;
  @Input() childComponentInputs: Partial<T> = {};
  @Output() closed = new EventEmitter<void>();

  private readonly cdr = inject(ChangeDetectorRef);

  private touchStartX = 0;
  private touchEndX = 0;

  ngAfterViewInit() {
    const ref = this.container.createComponent<T>(this.childComponentType);

    // Передаємо всі інпути + метод `close`
    Object.assign(ref.instance, {
      ...this.childComponentInputs,
      close: () => this.close(),
    });

    this.cdr.markForCheck();

    document.addEventListener('keydown', this.handleKeyDown);
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  close() {
    this.closed.emit();
  }

  // Закриття по overlay (backdrop)
  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('popup-backdrop')) {
      this.close();
    }
  }

  // Закриття по Escape
  handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.close();
    }
  };

  // Свайп вліво для мобільного
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    const swipeDistance = this.touchStartX - this.touchEndX;
    if (swipeDistance > 100) {
      this.close();
    }
  }
}

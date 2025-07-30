import {
  ApplicationRef,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
  createComponent,
  signal,
  inject,
  computed,
} from '@angular/core';

import { Popup as PopupHostComponent } from '^shared/components/popup/popup';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(Injector);

  // ✅ signal: список відкритих попапів
  private readonly popups = signal<ComponentRef<PopupHostComponent<object>>[]>(
    [],
  );

  private readonly baseZIndex = 1000;

  /** Відкрити попап з переданим компонентом */
  open<T extends object>(
    component: Type<T>,
    componentInputs?: Partial<T>,
  ): void {
    const popupRef = createComponent(PopupHostComponent<T>, {
      environmentInjector: this.appRef.injector,
      elementInjector: this.injector,
    });

    const hostView = popupRef.hostView as EmbeddedViewRef<
      PopupHostComponent<T>
    >;
    const domElem = hostView.rootNodes[0] as HTMLElement;

    // Z-index
    const currentZIndex = this.baseZIndex + this.popups().length;
    domElem.style.zIndex = String(currentZIndex);
    document.body.appendChild(domElem);

    // Передача @Input значень без set()
    popupRef.setInput('childComponentType', component);
    popupRef.setInput('childComponentInputs', componentInputs || {});

    popupRef.instance.closed.subscribe(() => {
      this.close(
        popupRef as unknown as ComponentRef<PopupHostComponent<object>>,
      );
    });

    this.appRef.attachView(popupRef.hostView);
    this.popups.update((list) => [
      ...list,
      popupRef as unknown as ComponentRef<PopupHostComponent<object>>,
    ]);
  }

  /** Закрити попап */
  close(popupRef: ComponentRef<PopupHostComponent<object>>) {
    this.appRef.detachView(popupRef.hostView);
    popupRef.destroy();
    this.popups.update((list) => list.filter((p) => p !== popupRef));
  }

  /** (Опціонально) Отримати кількість активних попапів як computed */
  readonly popupCount = computed(() => this.popups().length);
}

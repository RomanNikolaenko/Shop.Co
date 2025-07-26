import {
  ApplicationRef,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
  createComponent,
  inject,
} from '@angular/core';

import { Popup as PopupHostComponent } from '^shared/components/popup/popup';

@Injectable({
  providedIn: 'root',
})
export class Popup {
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(Injector);
  private popups: ComponentRef<PopupHostComponent<object>>[] = [];

  open<T extends object>(
    component: Type<T>,
    componentInputs?: Partial<T>,
  ): void {
    // Створення PopupHostComponent (обгортки)
    const popupRef = createComponent(PopupHostComponent<T>, {
      environmentInjector: this.appRef.injector,
      elementInjector: this.injector,
    });

    // Отримуємо DOM-елемент без any
    const hostView = popupRef.hostView as EmbeddedViewRef<
      PopupHostComponent<T>
    >;
    const domElem = hostView.rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    // Встановлюємо дочірній компонент і його інпути
    popupRef.instance.childComponentType = component;
    popupRef.instance.childComponentInputs = componentInputs || {};

    popupRef.instance.closed.subscribe(() =>
      this.close(popupRef as ComponentRef<PopupHostComponent<object>>),
    );

    this.appRef.attachView(popupRef.hostView);
    this.popups.push(popupRef as ComponentRef<PopupHostComponent<object>>);
  }

  close(popupRef: ComponentRef<PopupHostComponent<object>>) {
    this.appRef.detachView(popupRef.hostView);
    popupRef.destroy();
    this.popups = this.popups.filter((p) => p !== popupRef);
  }
}

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

  private baseZIndex = 1000;

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

    const currentZIndex = this.baseZIndex + this.popups.length;
    domElem.style.zIndex = String(currentZIndex);

    document.body.appendChild(domElem);

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

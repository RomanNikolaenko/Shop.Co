import { trigger, transition, style, animate } from '@angular/animations';

export const accordionAnim = trigger('flyInBottom', [
  transition('void => *', [
    style({ height: 0, opacity: 0 }),
    animate(
      '0.3s cubic-bezier(0.42, 0, 0.58, 1)',
      style({ height: '*', opacity: 1 }),
    ),
  ]),
  transition('* => void', [
    style({ height: '*', opacity: 1 }),
    animate(
      '0.3s cubic-bezier(0.42, 0, 0.58, 1)',
      style({ height: 0, opacity: 0 }),
    ),
  ]),
]);

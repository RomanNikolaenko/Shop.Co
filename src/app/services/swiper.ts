import { Injectable, signal, WritableSignal } from '@angular/core';
import { SwiperOptions } from 'swiper/types';

@Injectable({
  providedIn: 'root',
})
export class SwiperService {
  private defaultOptions: SwiperOptions = {
    centeredSlides: false,
    spaceBetween: 20,
    speed: 1500,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      enabled: true,
      prevEl: '.slider__prev',
      nextEl: '.slider__next',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 1.5,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  };

  protected optionsSignal: WritableSignal<SwiperOptions> = signal(
    this.defaultOptions,
  );

  getOptions() {
    return this.optionsSignal();
  }

  setOptions(newOptions: Partial<typeof this.defaultOptions>) {
    this.optionsSignal.set({ ...this.optionsSignal(), ...newOptions });
  }
}

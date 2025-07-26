import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'icon',
  standalone: true,
  templateUrl: './icon.html',
  styleUrls: ['./icon.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.ngSkipHydration]': 'true',
  },
})
export class Icon implements OnChanges, OnDestroy {
  @Input() name!: string;
  
  private readonly http = inject(HttpClient);
  private readonly el = inject(ElementRef<HTMLElement>);
  private currentSubscription$: Subscription | null = null;

  private loadIcon(name: string): void {
    const path = `assets/icons/${name}.svg`;

    this.unCurrentSubscription();

    this.currentSubscription$ = this.http.get(path, { responseType: 'text' }).subscribe({
      next: (svg) => {
        this.el.nativeElement.innerHTML = svg;
      },
      error: (err) => {
        console.error(`Error loading icon: ${path}`, err);
        this.el.nativeElement.innerHTML = '';
      }
    });
  }

  private unCurrentSubscription() {
    if (this.currentSubscription$) {
      this.currentSubscription$.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name'] && this.name) {
      this.loadIcon(this.name);
    }
  }

  ngOnDestroy(): void {
    this.unCurrentSubscription()
  }
}

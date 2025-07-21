import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';

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
export class Icon implements OnChanges {
  @Input() name!: string;

  private http = inject(HttpClient);
  private el = inject(ElementRef<HTMLElement>);

  ngOnChanges(changes: SimpleChanges) {
    if (changes.name && this.name) {
      const path = `assets/icons/${this.name}.svg`;
      this.http.get(path, { responseType: 'text' }).subscribe(
        (svg) => {
          const container = this.el.nativeElement;
          container.innerHTML = svg;
        },
        (error) => {
          console.error(`Icon not found: ${path}`, error);
          this.el.nativeElement.innerHTML = '';
        },
      );
    }
  }
}

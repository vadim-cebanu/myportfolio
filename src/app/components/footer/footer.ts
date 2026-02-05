import { Component, output } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  legalClick = output<void>();
  imprintClick = output<void>();

  onLegalClick(event: Event): void {
    event.preventDefault();
    this.legalClick.emit();
  }

  onImprintClick(event: Event): void {
    event.preventDefault();
    this.imprintClick.emit();
  }
}

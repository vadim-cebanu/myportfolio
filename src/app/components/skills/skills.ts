import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  private translationService = inject(TranslationService);
  readonly t = this.translationService.t;

  scrollToContact(event: Event): void {
    event.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

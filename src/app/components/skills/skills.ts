import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Skills section component displaying technology stack and competencies.
 * Features a grid of skill icons with hover effects and a CTA to contact section.
 *
 * @component
 */
@Component({
  selector: 'app-skills',
  imports: [TranslateModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {

  /**
   * Scrolls smoothly to the contact section.
   *
   * @param {Event} event - Click event to prevent default behavior
   * @returns {void}
   */
  scrollToContact(event: Event): void {
    event.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

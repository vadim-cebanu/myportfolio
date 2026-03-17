import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Hero section component displaying main landing area.
 * Features name, title, CTA button, and vertical decorative text.
 *
 * @component
 */
@Component({
  selector: 'app-hero',
  imports: [TranslateModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {

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

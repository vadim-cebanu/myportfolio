import { Component, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Represents a testimonial from a colleague or client.
 *
 * @interface Testimonial
 */
interface Testimonial {
  /** Translation key for the testimonial quote */
  quoteKey: string;
  /** Translation key for the author name and role */
  authorKey: string;
  /** Path to the author's profile image */
  image: string;
}

/**
 * Testimonials carousel component displaying peer reviews and recommendations.
 * Features navigation controls and dot indicators for browsing testimonials.
 *
 * @component
 */
@Component({
  selector: 'app-testimonials',
  imports: [TranslateModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class Testimonials {
  /** Array of testimonials to display */
  testimonials: Testimonial[] = [
    {
      quoteKey: 'testimonials.quote1',
      authorKey: 'testimonials.author1',
      image: 'img/my.png',
    },
    {
      quoteKey: 'testimonials.quote2',
      authorKey: 'testimonials.author2',
      image: 'img/my.png',
    },
    {
      quoteKey: 'testimonials.quote3',
      authorKey: 'testimonials.author3',
      image: 'img/my.png',
    },
  ];

  /** Signal tracking current testimonial index */
  currentIndex = signal(0);

  /**
   * Navigates to the previous testimonial with wrapping.
   *
   * @returns {void}
   */
  prev() {
    this.currentIndex.update(i => (i - 1 + this.testimonials.length) % this.testimonials.length);
  }

  /**
   * Navigates to the next testimonial with wrapping.
   *
   * @returns {void}
   */
  next() {
    this.currentIndex.update(i => (i + 1) % this.testimonials.length);
  }

  /**
   * Navigates to a specific testimonial by index.
   *
   * @param {number} index - Zero-based index of the testimonial
   * @returns {void}
   */
  goTo(index: number) {
    this.currentIndex.set(index);
  }
}

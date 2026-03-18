import { Component, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

/**
 * Skills section component displaying technology stack and competencies.
 * Features a grid of skill icons with hover effects and a CTA to contact section.
 *
 * @component
 */
@Component({
  selector: 'app-skills',
  imports: [TranslateModule, CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  /** Signal to control modal visibility */
  showLearningModal = signal(false);

  /**
   * Opens the learning modal to display certifications.
   */
  openLearningModal(): void {
    this.showLearningModal.set(true);
  }

  /**
   * Closes the learning modal.
   */
  closeLearningModal(): void {
    this.showLearningModal.set(false);
  }

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

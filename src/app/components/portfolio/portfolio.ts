import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Represents a project in the portfolio.
 *
 * @interface Project
 */
interface Project {
  /** Path to the project image */
  image: string;
  /** Alt text for the project image */
  alt: string;
  /** GitHub repository URL */
  github: string;
  /** Live demo URL */
  live: string;
  /** Translation key for project title */
  titleKey: string;
  /** Translation key for project description */
  descKey: string;
  /** Array of technologies used in the project */
  tech: string[];
}

/**
 * Portfolio component displaying a carousel of projects.
 * Features infinite loop carousel with smooth transitions and mobile toggle functionality.
 *
 * @component
 */
@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, TranslateModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio {
  /** Duration of carousel transition animation in milliseconds */
  private readonly transitionDurationMs = 450;

  /** Signal tracking which project is currently active on mobile */
  activeProject = signal<number | null>(null);

  /** Array of portfolio projects to display */
  readonly projects: Project[] = [
    {
      image: 'img/pokedex.png',
      alt: 'Pokedex project',
      github: 'https://github.com/vadim-cebanu/pokedex',
      live: 'https://pokedex.vadimcebanu.dev/',
      titleKey: 'portfolio.pokedexTitle',
      descKey: 'portfolio.pokedexDesc',
      tech: ['JavaScript', 'HTML', 'CSS', 'API'],
    },
    {
      image: 'img/pollo.png',
      alt: 'El Pollo Loco project',
      github: 'https://github.com/vadim-cebanu/El-Pollo-Loco',
      live: 'https://elpollo.vadimcebanu.dev/',
      titleKey: 'portfolio.polloTitle',
      descKey: 'portfolio.polloDesc',
      tech: ['JavaScript', 'HTML', 'CSS'],
    },
    {
      image: 'img/join_in.png',
      alt: 'Join project preview',
      github: 'https://github.com/vadim-cebanu/Join',
      live: 'https://join.vadimcebanu.dev/',
      titleKey: 'portfolio.joinTitle',
      descKey: 'portfolio.joinDesc',
      tech: ['TypeScript', 'Angular', 'Tailwind CSS'],
    },
  ];

  /** Computed signal that creates infinite loop by adding clones at start and end */
  readonly loopItems = computed(() => [
    this.projects[this.projects.length - 1],
    ...this.projects,
    this.projects[0],
  ]);

  /** Signal tracking current carousel slide position */
  currentSlide = signal(1);

  /** Signal controlling whether CSS transitions are enabled */
  transitionEnabled = signal(true);

  /**
   * Gets the array of visible items including loop clones.
   *
   * @returns {Project[]} Array of projects with clones for infinite loop
   */
  get visibleItems() {
    return this.loopItems();
  }

  /**
   * Gets the total number of actual projects (excluding clones).
   *
   * @returns {number} Number of projects
   */
  get slidesCount() {
    return this.projects.length;
  }

  /**
   * Navigates to the previous project in carousel.
   *
   * @returns {void}
   */
  prev() {
    this.slideTo(this.currentSlide() - 1);
  }

  /**
   * Navigates to the next project in carousel.
   *
   * @returns {void}
   */
  next() {
    this.slideTo(this.currentSlide() + 1);
  }

  /**
   * Navigates to a specific project by index.
   *
   * @param {number} index - Zero-based index of the project
   * @returns {void}
   */
  goTo(index: number) {
    this.slideTo(index + 1);
  }

  /**
   * Toggles project details visibility on mobile devices.
   * No effect on desktop (viewport > 992px).
   *
   * @param {number} index - Index of the project to toggle
   * @returns {void}
   */
  toggleProject(index: number) {
    if (!this.isMobile()) {
      return;
    }

    this.activeProject.update(current => (current === index ? null : index));
  }

  /**
   * Checks if current viewport is mobile size.
   *
   * @private
   * @returns {boolean} True if viewport width is 992px or less
   */
  private isMobile(): boolean {
    return window.matchMedia('(max-width: 992px)').matches;
  }

  /**
   * Slides carousel to specified position with infinite loop logic.
   * Handles wrapping from clone slides to real slides seamlessly.
   *
   * @private
   * @param {number} position - Target slide position
   * @returns {void}
   */
  private slideTo(position: number) {
    this.transitionEnabled.set(true);
    this.currentSlide.set(position);

    const itemsLength = this.loopItems().length;
    if (position === 0) {
      // jumped to the cloned last item; snap back to real last
      setTimeout(() => {
        this.transitionEnabled.set(false);
        this.currentSlide.set(itemsLength - 2);
      }, this.transitionDurationMs);
    }

    if (position === itemsLength - 1) {
      // jumped to the cloned first item; snap back to real first
      setTimeout(() => {
        this.transitionEnabled.set(false);
        this.currentSlide.set(1);
      }, this.transitionDurationMs);
    }
  }
}

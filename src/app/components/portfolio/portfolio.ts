import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface Project {
  image: string;
  alt: string;
  github: string;
  live: string;
  titleKey: string;
  descKey: string;
  tech: string[];
}

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, TranslateModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio {
  private readonly transitionDurationMs = 450;

  activeProject = signal<number | null>(null);

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

  readonly loopItems = computed(() => [
    this.projects[this.projects.length - 1],
    ...this.projects,
    this.projects[0],
  ]);

  currentSlide = signal(1);
  transitionEnabled = signal(true);

  get visibleItems() {
    return this.loopItems();
  }

  get slidesCount() {
    return this.projects.length;
  }

  prev() {
    this.slideTo(this.currentSlide() - 1);
  }

  next() {
    this.slideTo(this.currentSlide() + 1);
  }

  goTo(index: number) {
    this.slideTo(index + 1);
  }

  toggleProject(index: number) {
    if (!this.isMobile()) {
      return;
    }

    this.activeProject.update(current => (current === index ? null : index));
  }

  private isMobile(): boolean {
    return window.matchMedia('(max-width: 992px)').matches;
  }

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

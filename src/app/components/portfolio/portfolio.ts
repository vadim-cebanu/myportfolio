import { Component } from '@angular/core';
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
 * Portfolio component displaying a grid of projects.
 * Features responsive layout with alternating project card designs.
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
}

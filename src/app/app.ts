import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Skills } from './components/skills/skills';
import { Portfolio } from './components/portfolio/portfolio';
import { Testimonials } from './components/testimonials/testimonials';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';
import { PrivacyModal } from './pages/privacy-modal/privacy-modal';
import { filter } from 'rxjs/operators';

/**
 * Root application component managing main layout and navigation.
 * Handles route changes, section scrolling, and language initialization.
 *
 * @component
 */
@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Navbar, Hero, About, Skills, Portfolio, Testimonials, Contact, Footer, PrivacyModal],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  /** Translation service for managing application language */
  private translate = inject(TranslateService);

  /** Flag indicating whether user is on the home page */
  isHomePage = true;

  /**
   * Creates an instance of App component.
   * Initializes default language and sets up route change listener.
   *
   * @param {Router} router - Angular router for navigation
   */
  constructor(private router: Router) {
    this.translate.use('en');

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isHomePage = event.urlAfterRedirects === '/' || event.urlAfterRedirects === '';

      // Scroll to top on route change - works across all browsers and devices
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 0);
    });
  }

  /**
   * Handles navigation link clicks from navbar.
   * Navigates to home page first if on different page, then scrolls to section.
   *
   * @param {string} section - Section ID to scroll to
   * @returns {void}
   */
  onNavClick(section: string): void {
    if (!this.isHomePage) {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scrollToSection(section), 100);
      });
    } else {
      this.scrollToSection(section);
    }
  }

  /**
   * Scrolls to a specific section by ID with smooth animation.
   * Scrolls to top if section is empty string.
   *
   * @private
   * @param {string} section - Section ID to scroll to, or empty string for top
   * @returns {void}
   */
  private scrollToSection(section: string): void {
    if (section === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}

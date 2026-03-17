import { Component, HostListener, OnDestroy, signal, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

/**
 * Navigation bar component with auto-hide on scroll, mobile menu, and language switching.
 * Implements scroll-based visibility logic and manages body scroll lock on mobile.
 *
 * @component
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnDestroy {
  /** Translation service injected for language switching */
  private translate = inject(TranslateService);

  /** Signal indicating whether navbar should be hidden on scroll down */
  isHidden = signal(false);

  /** Signal indicating whether page has been scrolled past threshold */
  isScrolled = signal(false);

  /** Signal indicating whether mobile menu is open */
  isMenuOpen = signal(false);

  /** Tracks last scroll position for scroll direction detection */
  private lastScrollTop = 0;

  /** Minimum scroll distance before hiding navbar */
  private scrollThreshold = 100;

  /** Output event emitted when navigation link is clicked */
  navClick = output<string>();

  /** Signal tracking current language code */
  currentLang = signal(this.translate.currentLang || 'en');

  /**
   * Toggles mobile menu open/closed state.
   * Locks body scroll when opening menu on mobile devices.
   *
   * @returns {void}
   */
  toggleMenu(): void {
    this.isMenuOpen.update(v => {
      const next = !v;
      if (this.isMobile() && next) {
        this.setBodyScrollEnabled(false);
      }
      return next;
    });
  }

  /**
   * Closes the mobile menu and re-enables body scrolling.
   *
   * @returns {void}
   */
  closeMenu(): void {
    this.isMenuOpen.set(false);
    this.setBodyScrollEnabled(true);
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
   * Enables or disables body scrolling by setting overflow styles.
   * Used to prevent background scrolling when mobile menu is open.
   *
   * @private
   * @param {boolean} enabled - True to enable scrolling, false to disable
   * @returns {void}
   */
  private setBodyScrollEnabled(enabled: boolean): void {
    document.body.style.overflow = enabled ? '' : 'hidden';
    document.documentElement.style.overflow = enabled ? '' : 'hidden';
  }

  /**
   * Angular lifecycle hook called when component is destroyed.
   * Re-enables body scrolling if on mobile to prevent scroll lock.
   *
   * @returns {void}
   */
  ngOnDestroy(): void {
    if (this.isMobile()) {
      this.setBodyScrollEnabled(true);
    }
  }

  /**
   * Changes the application language.
   *
   * @param {string} lang - Language code (e.g., 'en', 'de')
   * @returns {void}
   */
  setLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLang.set(lang);
  }

  /**
   * Handles navigation link clicks.
   * Closes mobile menu and emits navigation event.
   *
   * @param {Event} event - Click event to prevent default behavior
   * @param {string} section - Target section identifier
   * @returns {void}
   */
  onNavClick(event: Event, section: string): void {
    event.preventDefault();
    this.closeMenu();
    this.navClick.emit(section);
  }

  /**
   * Window scroll event handler.
   * Manages navbar visibility and scroll state based on scroll position and direction.
   *
   * @returns {void}
   */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    this.isScrolled.set(currentScroll > 50);

    if (currentScroll > this.scrollThreshold) {
      if (currentScroll > this.lastScrollTop) {
        this.isHidden.set(true);
      } else {
        this.isHidden.set(false);
      }
    } else {
      this.isHidden.set(false);
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }
}

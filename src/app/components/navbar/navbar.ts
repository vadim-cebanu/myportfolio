import { Component, HostListener, signal, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService, Language } from '../../services/translation.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private translationService = inject(TranslationService);

  isHidden = signal(false);
  isScrolled = signal(false);
  isMenuOpen = signal(false);
  private lastScrollTop = 0;
  private scrollThreshold = 100;

  navClick = output<string>();

  readonly t = this.translationService.t;
  readonly currentLang = this.translationService.language;

  toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  setLanguage(lang: Language): void {
    this.translationService.setLanguage(lang);
  }

  onNavClick(event: Event, section: string): void {
    event.preventDefault();
    this.closeMenu();
    this.navClick.emit(section);
  }

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

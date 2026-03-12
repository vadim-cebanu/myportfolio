import { Component, HostListener, OnDestroy, signal, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnDestroy {
  private translate = inject(TranslateService);

  isHidden = signal(false);
  isScrolled = signal(false);
  isMenuOpen = signal(false);
  private lastScrollTop = 0;
  private scrollThreshold = 100;

  navClick = output<string>();

  currentLang = signal(this.translate.currentLang || 'en');

  toggleMenu(): void {
    this.isMenuOpen.update(v => {
      const next = !v;
      if (this.isMobile() && next) {
        this.setBodyScrollEnabled(false);
      }
      return next;
    });
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
    this.setBodyScrollEnabled(true);
  }

  private isMobile(): boolean {
    return window.matchMedia('(max-width: 992px)').matches;
  }

  private setBodyScrollEnabled(enabled: boolean): void {
    document.body.style.overflow = enabled ? '' : 'hidden';
    document.documentElement.style.overflow = enabled ? '' : 'hidden';
  }

  ngOnDestroy(): void {
    if (this.isMobile()) {
      this.setBodyScrollEnabled(true);
    }
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLang.set(lang);
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

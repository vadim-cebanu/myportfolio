import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  isHidden = signal(false);
  isScrolled = signal(false);
  private lastScrollTop = 0;
  private scrollThreshold = 100; // Navbar va dispărea după 100px scroll

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Adaugă background când scroll-ul depășește hero section
    this.isScrolled.set(currentScroll > 50);

    // Hide pe scroll down, show pe scroll up
    if (currentScroll > this.scrollThreshold) {
      if (currentScroll > this.lastScrollTop) {
        // Scrolling down
        this.isHidden.set(true);
      } else {
        // Scrolling up
        this.isHidden.set(false);
      }
    } else {
      // În top - always show
      this.isHidden.set(false);
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }
}

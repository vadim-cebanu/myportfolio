import { Component, HostListener, signal, output } from '@angular/core';
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
  private scrollThreshold = 100;

  navClick = output<string>();

  onNavClick(event: Event, section: string): void {
    event.preventDefault();
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

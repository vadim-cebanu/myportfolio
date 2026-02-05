import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Skills } from './components/skills/skills';
import { Portfolio } from './components/portfolio/portfolio';
import { Testimonials } from './components/testimonials/testimonials';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Navbar, Hero, About, Skills, Portfolio, Testimonials, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  showLegal = false;
  showImprint = false;

  onNavClick(section: string): void {
    this.showLegal = false;
    this.showImprint = false;

    setTimeout(() => {
      if (section === '') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 50);
  }

  openLegal(): void {
    this.showLegal = true;
    this.showImprint = false;
    setTimeout(() => {
      const legalSection = document.getElementById('legal');
      if (legalSection) {
        legalSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  }

  hideLegal(): void {
    this.showLegal = false;
    window.scrollTo({ top: document.body.scrollHeight - window.innerHeight - 100, behavior: 'smooth' });
  }

  openImprint(): void {
    this.showImprint = true;
    this.showLegal = false;
    setTimeout(() => {
      const imprintSection = document.getElementById('imprint');
      if (imprintSection) {
        imprintSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  }

  hideImprint(): void {
    this.showImprint = false;
    window.scrollTo({ top: document.body.scrollHeight - window.innerHeight - 100, behavior: 'smooth' });
  }
}

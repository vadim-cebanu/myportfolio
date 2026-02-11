import { Component, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

interface Testimonial {
  quoteKey: string;
  authorKey: string;
  image: string;
}

@Component({
  selector: 'app-testimonials',
  imports: [TranslateModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class Testimonials {
  testimonials: Testimonial[] = [
    {
      quoteKey: 'testimonials.quote1',
      authorKey: 'testimonials.author1',
      image: 'img/mypng.png',
    },
    {
      quoteKey: 'testimonials.quote2',
      authorKey: 'testimonials.author2',
      image: 'img/mypng.png',
    },
    {
      quoteKey: 'testimonials.quote3',
      authorKey: 'testimonials.author3',
      image: 'img/mypng.png',
    },
  ];

  currentIndex = signal(0);

  prev() {
    this.currentIndex.update(i => (i - 1 + this.testimonials.length) % this.testimonials.length);
  }

  next() {
    this.currentIndex.update(i => (i + 1) % this.testimonials.length);
  }

  goTo(index: number) {
    this.currentIndex.set(index);
  }
}

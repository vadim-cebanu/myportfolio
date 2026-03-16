import { Component, signal, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [TranslateModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements AfterViewInit, OnDestroy {
  private privacyLinkListener?: (e: Event) => void;
  showWarning = signal(false);
  isSending = signal(false);
  sendSuccess = signal(false);
  sendError = signal(false);

  private apiUrl = 'https://formspree.io/f/xdalaywj';

  constructor(private http: HttpClient, private router: Router) {}

  ngAfterViewInit(): void {
    // Add click listener for privacy policy link
    setTimeout(() => {
      const privacyLabel = document.querySelector('label[for="privacy"] a');
      if (privacyLabel) {
        this.privacyLinkListener = (e: Event) => {
          e.preventDefault();
          this.router.navigate(['/privacy']);
        };
        privacyLabel.addEventListener('click', this.privacyLinkListener as EventListener);
      }
    }, 100);
  }

  ngOnDestroy(): void {
    const privacyLabel = document.querySelector('label[for="privacy"] a');
    if (privacyLabel && this.privacyLinkListener) {
      privacyLabel.removeEventListener('click', this.privacyLinkListener as EventListener);
    }
  }

  isFormValid(): boolean {
    const name = (document.getElementById('name') as HTMLInputElement)?.value;
    const email = (document.getElementById('email') as HTMLInputElement)?.value;
    const message = (document.getElementById('message') as HTMLTextAreaElement)?.value;
    const privacy = (document.getElementById('privacy') as HTMLInputElement)?.checked;

    return !!(name && email && message && privacy);
  }

  async sendEmail(): Promise<void> {
    if (!this.isFormValid()) return;

    const name = (document.getElementById('name') as HTMLInputElement)?.value;
    const email = (document.getElementById('email') as HTMLInputElement)?.value;
    const message = (document.getElementById('message') as HTMLTextAreaElement)?.value;

    this.isSending.set(true);
    this.sendError.set(false);

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    this.http.post(this.apiUrl, { name, email, message }, { headers }).subscribe({
      next: () => {
        this.isSending.set(false);
        this.sendSuccess.set(true);
        // Clear form
        (document.getElementById('name') as HTMLInputElement).value = '';
        (document.getElementById('email') as HTMLInputElement).value = '';
        (document.getElementById('message') as HTMLTextAreaElement).value = '';
        (document.getElementById('privacy') as HTMLInputElement).checked = false;
      },
      error: () => {
        this.isSending.set(false);
        this.sendError.set(true);
      }
    });
  }

  onButtonHover(): void {
    if (!this.isFormValid()) {
      this.showWarning.set(true);
      setTimeout(() => {
        this.showWarning.set(false);
      }, 3000);
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

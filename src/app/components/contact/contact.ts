import { Component, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  imports: [TranslateModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  buttonEscaped = signal(false);
  showWarning = signal(false);
  isSending = signal(false);
  sendSuccess = signal(false);
  sendError = signal(false);

  private apiUrl = '/api/contact.php';

  constructor(private http: HttpClient) {}

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

    this.http.post(this.apiUrl, { name, email, message }).subscribe({
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
      this.buttonEscaped.set(true);
      this.showWarning.set(true);
      setTimeout(() => {
        this.buttonEscaped.set(false);
      }, 2000);
      setTimeout(() => {
        this.showWarning.set(false);
      }, 3000);
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

import { Component, signal, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

/**
 * Contact component for handling user contact form submissions.
 * Manages form validation, email sending via Formspree API, and privacy policy link navigation.
 *
 * @component
 * @implements {AfterViewInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-contact',
  imports: [TranslateModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements AfterViewInit, OnDestroy {
  /** Event listener for privacy policy link clicks */
  private privacyLinkListener?: (e: Event) => void;

  /** Signal indicating whether form validation warning should be shown */
  showWarning = signal(false);

  /** Signal indicating whether email is currently being sent */
  isSending = signal(false);

  /** Signal indicating whether email was sent successfully */
  sendSuccess = signal(false);

  /** Signal indicating whether email sending failed */
  sendError = signal(false);

  /** Validation signals for each field */
  nameTouched = signal(false);
  emailTouched = signal(false);
  messageTouched = signal(false);
  privacyTouched = signal(false);

  nameValid = signal(false);
  emailValid = signal(false);
  messageValid = signal(false);
  privacyValid = signal(false);

  /** Formspree API endpoint URL */
  private apiUrl = 'https://formspree.io/f/xdalaywj';

  /**
   * Creates an instance of Contact component.
   *
   * @param {HttpClient} http - Angular HTTP client for API requests
   * @param {Router} router - Angular router for navigation
   */
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Angular lifecycle hook that runs after the component's view has been initialized.
   * Sets up event listener for privacy policy link to enable programmatic navigation.
   *
   * @returns {void}
   */
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

  /**
   * Angular lifecycle hook that runs when the component is destroyed.
   * Removes event listener to prevent memory leaks.
   *
   * @returns {void}
   */
  ngOnDestroy(): void {
    const privacyLabel = document.querySelector('label[for="privacy"] a');
    if (privacyLabel && this.privacyLinkListener) {
      privacyLabel.removeEventListener('click', this.privacyLinkListener as EventListener);
    }
  }

  /**
   * Validates name field
   */
  validateName(value: string): void {
    this.nameTouched.set(true);
    this.nameValid.set(value.trim().length > 0);
  }

  /**
   * Validates email field
   */
  validateEmail(value: string): void {
    this.emailTouched.set(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailValid.set(emailRegex.test(value));
  }

  /**
   * Validates message field
   */
  validateMessage(value: string): void {
    this.messageTouched.set(true);
    this.messageValid.set(value.trim().length > 0);
  }

  /**
   * Validates privacy checkbox
   */
  validatePrivacy(checked: boolean): void {
    this.privacyTouched.set(true);
    this.privacyValid.set(checked);
  }

  /**
   * Validates the contact form by checking if all required fields are filled.
   *
   * @returns {boolean} True if all fields (name, email, message, privacy) are valid, false otherwise
   */
  isFormValid(): boolean {
    return this.nameValid() && this.emailValid() && this.messageValid() && this.privacyValid();
  }

  /**
   * Sends the contact form email via Formspree API.
   * Validates form before sending, updates loading/success/error states, and clears form on success.
   *
   * @async
   * @returns {Promise<void>} Promise that resolves when the email operation completes
   */
  async sendEmail(): Promise<void> {
    // Mark all fields as touched for validation display
    this.nameTouched.set(true);
    this.emailTouched.set(true);
    this.messageTouched.set(true);
    this.privacyTouched.set(true);

    const name = (document.getElementById('name') as HTMLInputElement)?.value;
    const email = (document.getElementById('email') as HTMLInputElement)?.value;
    const message = (document.getElementById('message') as HTMLTextAreaElement)?.value;
    const privacy = (document.getElementById('privacy') as HTMLInputElement)?.checked;

    // Validate all fields
    this.validateName(name);
    this.validateEmail(email);
    this.validateMessage(message);
    this.validatePrivacy(privacy);

    if (!this.isFormValid()) return;

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
        // Reset validation states
        this.nameTouched.set(false);
        this.emailTouched.set(false);
        this.messageTouched.set(false);
        this.privacyTouched.set(false);
        this.nameValid.set(false);
        this.emailValid.set(false);
        this.messageValid.set(false);
        this.privacyValid.set(false);
      },
      error: () => {
        this.isSending.set(false);
        this.sendError.set(true);
      }
    });
  }

  /**
   * Handles submit button hover event.
   * Shows a warning message if form validation fails when user hovers over the button.
   * Warning automatically disappears after 3 seconds.
   *
   * @returns {void}
   */
  onButtonHover(): void {
    if (!this.isFormValid()) {
      this.showWarning.set(true);
      setTimeout(() => {
        this.showWarning.set(false);
      }, 3000);
    }
  }

  /**
   * Scrolls the page to the top with smooth animation.
   *
   * @returns {void}
   */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

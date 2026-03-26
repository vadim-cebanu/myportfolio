import { Injectable, signal } from '@angular/core';

/**
 * Service for managing privacy modal state
 */
@Injectable({
  providedIn: 'root'
})
export class PrivacyModalService {
  /** Signal to control modal visibility */
  isOpen = signal(false);

  /**
   * Opens the privacy modal
   */
  open() {
    this.isOpen.set(true);
  }

  /**
   * Closes the privacy modal
   */
  close() {
    this.isOpen.set(false);
  }
}

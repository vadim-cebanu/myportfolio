import { Component, signal, output, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PrivacyModalService } from '../../services/privacy-modal.service';

/**
 * Privacy Policy modal component.
 * Displays privacy policy information in a modal overlay.
 *
 * @component
 */
@Component({
  selector: 'app-privacy-modal',
  imports: [CommonModule, TranslateModule],
  templateUrl: './privacy-modal.html',
  styleUrl: './privacy-modal.scss',
})
export class PrivacyModal {
  /** Privacy modal service */
  private modalService = inject(PrivacyModalService);

  /** Signal to control modal visibility */
  isOpen = this.modalService.isOpen;

  /** Event emitted when modal should be closed */
  close = output<void>();

  /**
   * Closes the modal
   */
  closeModal() {
    this.modalService.close();
    this.close.emit();
  }

  /**
   * Handles backdrop click to close modal
   */
  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeModal();
    }
  }
}

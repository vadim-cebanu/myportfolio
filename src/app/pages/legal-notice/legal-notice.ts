import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Legal notice (Imprint) page component.
 * Displays required legal information and company details.
 *
 * @component
 */
@Component({
  selector: 'app-legal-notice',
  imports: [RouterLink],
  templateUrl: './legal-notice.html',
  styleUrl: './legal-notice.scss',
})
export class LegalNotice {}

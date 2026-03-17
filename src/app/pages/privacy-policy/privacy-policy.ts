import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Privacy policy page component.
 * Displays data protection and privacy information in compliance with GDPR.
 *
 * @component
 */
@Component({
  selector: 'app-privacy-policy',
  imports: [RouterLink],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss',
})
export class PrivacyPolicy {}

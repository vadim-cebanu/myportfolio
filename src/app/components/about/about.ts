import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

/**
 * About section component displaying developer introduction and key features.
 * Presents personal information, location, expertise, and collaboration approach.
 *
 * @component
 */
@Component({
  selector: 'app-about',
  imports: [TranslateModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {}

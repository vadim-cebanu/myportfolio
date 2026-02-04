import { Routes } from '@angular/router';
import { LegalNotice } from './pages/legal-notice/legal-notice';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';

export const routes: Routes = [
  { path: 'legal', component: LegalNotice },
  { path: 'privacy', component: PrivacyPolicy }
];

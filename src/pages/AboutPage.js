import { renderAboutSection } from '../components/AboutSection.js';

export function renderAboutPage() {
  return `
    <div class="page-fade-in" style="padding-top: 60px;">
      ${renderAboutSection()}
    </div>
  `;
}

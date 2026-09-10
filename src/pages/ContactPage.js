import { renderContactSection, setupContactListeners } from '../components/ContactSection.js';

export function renderContactPage() {
  return `
    <div class="page-fade-in" style="padding-top: 60px;">
      ${renderContactSection()}
    </div>
  `;
}

export function setupContactPageListeners() {
  setupContactListeners();
}

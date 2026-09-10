import { renderServicesSection, setupServicesListeners } from '../components/ServicesSection.js';

export function renderServicesPage() {
  return `
    <div class="page-fade-in" style="padding-top: 60px;">
      ${renderServicesSection()}
    </div>
  `;
}

export function setupServicesPageListeners() {
  setupServicesListeners();
}

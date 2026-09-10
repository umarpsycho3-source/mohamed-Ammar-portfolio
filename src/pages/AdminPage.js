import { renderAdminDashboard, setupAdminListeners } from '../components/AdminDashboard.js';

export function renderAdminPage() {
  return `
    <div class="page-fade-in" style="padding-top: 40px;">
      ${renderAdminDashboard()}
    </div>
  `;
}

export function setupAdminPageListeners() {
  setupAdminListeners();
}

import { renderProjectGallery, setupProjectGalleryListeners } from '../components/ProjectGallery.js';

export function renderProjectsPage() {
  return `
    <div class="page-fade-in" style="padding-top: 60px;">
      ${renderProjectGallery()}
    </div>
  `;
}

export function setupProjectsPageListeners() {
  setupProjectGalleryListeners();
}

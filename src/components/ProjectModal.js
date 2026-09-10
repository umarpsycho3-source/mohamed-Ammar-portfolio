import { store } from '../state/store.js';

export function renderProjectModal() {
  const { selectedProject } = store;
  if (!selectedProject) return '';

  const imagesToShow = selectedProject.images && selectedProject.images.length > 0 
    ? selectedProject.images 
    : [selectedProject.thumbnail];

  return `
    <div class="modal-overlay open" id="project-lightbox-modal">
      <div class="modal-content glass-card">
        <button class="modal-close-btn" id="close-lightbox-btn">
          <i class="fa-solid fa-xmark"></i>
        </button>

        <div style="margin-bottom: 24px;">
          <span class="section-tag" style="margin-bottom: 8px;">${selectedProject.category} • ${selectedProject.year}</span>
          <h2 style="font-size: 2.2rem; margin-bottom: 8px;">${selectedProject.title}</h2>
          <p style="color: var(--text-muted);">Client: <strong style="color: var(--text-main);">${selectedProject.client}</strong></p>
        </div>

        <!-- 3 Showcase Images Stack -->
        <div style="display: flex; flex-direction: column; gap: 24px; margin-bottom: 32px;">
          ${imagesToShow.map((imgUrl, idx) => `
            <div style="position: relative; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-glow); box-shadow: var(--shadow-card);">
              <img src="${imgUrl}" alt="${selectedProject.title} - Showcase ${idx + 1}" style="width: 100%; height: auto; max-height: 600px; object-fit: cover; display: block;" />
              <span style="position: absolute; bottom: 14px; right: 14px; padding: 4px 12px; background: rgba(10, 12, 18, 0.85); backdrop-filter: blur(10px); border-radius: var(--radius-full); font-size: 0.78rem; font-weight: 600; color: var(--accent-cyan); border: 1px solid var(--border-color);">
                Showcase View ${idx + 1} of ${imagesToShow.length}
              </span>
            </div>
          `).join('')}
        </div>

        <div style="background: rgba(0, 0, 0, 0.4); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 30px;">
          <h4 style="font-size: 1.1rem; color: var(--accent-cyan); margin-bottom: 10px;">Project Overview & Documentation</h4>
          <p style="color: var(--text-muted); line-height: 1.7; font-size: 1rem; margin-bottom: 16px;">
            ${selectedProject.description}
          </p>
          <div style="font-size: 0.9rem; color: var(--text-muted);">
            Documentation Link: 
            <a href="${selectedProject.liveUrl}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-cyan); text-decoration: underline; word-break: break-all;">
              ${selectedProject.liveUrl} <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </div>

        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px;">
          <div class="project-tags">
            ${selectedProject.tags.map(tag => `<span class="tag-pill" style="padding: 6px 14px; font-size: 0.85rem;">${tag}</span>`).join('')}
          </div>

          <a href="${selectedProject.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding: 12px 28px;">
            <span>View Full Case Study & Documentation</span>
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      </div>
    </div>
  `;
}

export function setupProjectModalListeners() {
  const closeBtn = document.getElementById('close-lightbox-btn');
  const modalOverlay = document.getElementById('project-lightbox-modal');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => store.setSelectedProject(null));
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        store.setSelectedProject(null);
      }
    });
  }
}

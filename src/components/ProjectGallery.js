import { store } from '../state/store.js';

let activeCategory = 'All';
let searchQuery = '';

export function renderProjectGallery() {
  const { projects } = store;

  // Categories list
  const categories = ['All', 'Brand Identity', 'UI/UX & Web', '3D & Motion', 'Packaging'];

  // Filter projects logic
  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          project.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return `
    <section id="projects" class="section-padding" style="background: rgba(10, 12, 18, 0.4);">
      <div class="container">
        <div class="section-header">
          <span class="section-tag"><i class="fa-solid fa-shapes"></i> Selected Work</span>
          <h2>Graphic & Visual Portfolio</h2>
          <p>Explore recent brand identities, 3D render art, digital product designs, and packaging solutions.</p>
        </div>

        <!-- Filter Buttons -->
        <div class="filter-container">
          ${categories.map(cat => `
            <button class="filter-btn ${activeCategory === cat ? 'active' : ''}" data-category="${cat}">
              ${cat}
            </button>
          `).join('')}
        </div>

        <!-- Search Input -->
        <div class="search-box">
          <i class="fa-solid fa-magnifying-glass search-icon"></i>
          <input type="text" id="project-search-input" class="search-input" placeholder="Search by project name, tool, or client..." value="${searchQuery}" />
        </div>

        <!-- Project Grid -->
        ${filteredProjects.length === 0 ? `
          <div style="text-align: center; padding: 60px; color: var(--text-muted);">
            <i class="fa-solid fa-folder-open" style="font-size: 3rem; margin-bottom: 16px; color: var(--text-dim);"></i>
            <h3>No Projects Found</h3>
            <p>Try adjusting your search or category filter.</p>
          </div>
        ` : `
          <div class="project-grid">
            ${filteredProjects.map(project => `
              <div class="project-card glass-card" data-project-id="${project.id}">
                <div class="project-thumb-wrapper">
                  <img src="${project.thumbnail}" alt="${project.title}" class="project-thumb" />
                  <div class="project-overlay">
                    <div style="width: 100%; display: flex; align-items: center; justify-content: space-between;">
                      <span style="color: #ffffff; font-weight: 600; font-size: 0.9rem;">View Case Study</span>
                      
                      <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-icon doc-link-btn" title="Open Case Study / Documentation Link" style="width: 40px; height: 40px; background: #00f0ff; color: #000; border: none; font-size: 1.1rem; box-shadow: 0 0 15px rgba(0,240,255,0.6);">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    </div>
                  </div>
                  ${project.featured ? `
                    <span style="position: absolute; top: 16px; left: 16px; padding: 4px 10px; background: var(--grad-primary); border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 700; color: #fff;">Featured</span>
                  ` : ''}
                </div>

                <div class="project-body">
                  <div>
                    <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 6px;">
                      <span>${project.category}</span>
                      <span>${project.year}</span>
                    </div>
                    <h3 class="project-title">${project.title}</h3>
                  </div>

                  <div class="project-tags">
                    ${project.tags.slice(0, 3).map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    </section>
  `;
}

export function setupProjectGalleryListeners() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.getAttribute('data-category');
      const galleryContainer = document.getElementById('project-gallery-section');
      if (galleryContainer) {
        galleryContainer.innerHTML = renderProjectGallery();
        setupProjectGalleryListeners();
      }
    });
  });

  const searchInput = document.getElementById('project-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      const galleryContainer = document.getElementById('project-gallery-section');
      if (galleryContainer) {
        galleryContainer.innerHTML = renderProjectGallery();
        setupProjectGalleryListeners();
        const newSearchInput = document.getElementById('project-search-input');
        if (newSearchInput) {
          newSearchInput.focus();
          newSearchInput.setSelectionRange(searchQuery.length, searchQuery.length);
        }
      }
    });
  }

  // Prevent parent lightbox click when clicking external documentation link button
  const docBtns = document.querySelectorAll('.doc-link-btn');
  docBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  // Click card to open Lightbox detail modal
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projId = card.getAttribute('data-project-id');
      const targetProj = store.projects.find(p => p.id === projId);
      if (targetProj) {
        store.setSelectedProject(targetProj);
      }
    });
  });
}

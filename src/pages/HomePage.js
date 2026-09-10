import { store } from '../state/store.js';
import { renderHero } from '../components/Hero.js';

export function renderHomePage() {
  const { projects, config } = store;
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  return `
    <div class="page-fade-in">
      ${renderHero()}

      <!-- Featured Projects Section -->
      <section class="section-padding" style="background: rgba(10, 12, 18, 0.4);">
        <div class="container">
          <div style="display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 20px; margin-bottom: 48px;">
            <div>
              <span class="section-tag"><i class="fa-solid fa-fire"></i> Featured Highlights</span>
              <h2 style="font-size: clamp(2rem, 3.5vw, 2.8rem);">Recent Graphic Artwork</h2>
            </div>
            <a href="#projects" class="btn btn-secondary">
              <span>View Full Gallery</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>

          <div class="project-grid">
            ${featuredProjects.map(project => `
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
        </div>
      </section>

      <!-- Quick Services & Estimator Banner -->
      <section class="section-padding">
        <div class="container">
          <div class="glass-card" style="padding: 50px; text-align: center; background: linear-gradient(135deg, rgba(14, 18, 28, 0.9) 0%, rgba(28, 20, 48, 0.85) 100%); border-color: var(--border-glow); box-shadow: var(--shadow-glow);">
            <span class="section-tag" style="margin-bottom: 12px;"><i class="fa-solid fa-calculator"></i> Price Calculator</span>
            <h2 style="font-size: clamp(2rem, 3.5vw, 2.8rem); margin-bottom: 16px;">Calculate Your Project Estimate Instantly</h2>
            <p style="color: var(--text-muted); max-width: 600px; margin: 0 auto 32px auto; font-size: 1.1rem;">
              Use our interactive pricing tool to select deliverables, timeline, and scope for instant ballpark quotes.
            </p>
            <a href="#services" class="btn btn-primary" style="padding: 14px 32px; font-size: 1rem;">
              <span>Open Price Estimator</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>
    </div>
  `;
}

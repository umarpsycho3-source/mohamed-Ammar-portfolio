import { store } from '../state/store.js';

export function renderHero() {
  const { config } = store;

  return `
    <section id="home" class="hero-section">
      <div class="container">
        <div class="hero-grid">
          <div class="hero-content">
            <div class="hero-badge">
              <span class="status-dot"></span>
              <span>${config.availabilityStatus}</span>
            </div>

            <h1 class="hero-title">
              Crafting Bold <br />
              <span class="gradient-text">Brand Identities & Posters</span>
            </h1>

            <p class="hero-description">
              ${config.bio}
            </p>

            <div class="hero-ctas">
              <a href="#projects" class="btn btn-primary">
                <i class="fa-solid fa-layer-group"></i>
                <span>Explore Portfolio</span>
              </a>

              <a href="${config.cvUrl}" download="Mohamed_Shafi_Ammar_CV.pdf" class="btn btn-secondary" style="border-color: var(--accent-cyan);">
                <i class="fa-solid fa-file-arrow-down" style="color: var(--accent-cyan);"></i>
                <span>Download CV</span>
              </a>
            </div>

            <div class="hero-stats">
              <div class="stat-item">
                <h3>${config.experienceYears}+</h3>
                <p>Year Experience</p>
              </div>
              <div class="stat-item">
                <h3>${config.projectsCompleted}+</h3>
                <p>Completed Works</p>
              </div>
              <div class="stat-item">
                <h3>${config.happyClients}+</h3>
                <p>Satisfied Clients</p>
              </div>
              <div class="stat-item">
                <h3>100%</h3>
                <p>Professional Quality</p>
              </div>
            </div>
          </div>

          <div class="hero-3d-wrapper">
            <div class="hero-3d-card" id="hero-3d-container">
              <!-- Three.js 3D canvas injected here -->
              <div class="hero-3d-badge">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <i class="fa-solid fa-cubes-stacked" style="color: var(--accent-cyan);"></i>
                  <span style="font-size: 0.85rem; font-weight: 600;">Interactive 3D Object Canvas</span>
                </div>
                <span style="font-size: 0.75rem; color: var(--text-muted);"><i class="fa-solid fa-hand-pointer"></i> Drag & Move Mouse</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

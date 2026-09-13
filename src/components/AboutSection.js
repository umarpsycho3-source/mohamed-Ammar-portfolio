import { store } from '../state/store.js';

export function renderAboutSection() {
  const { config } = store;

  return `
    <section id="about" class="section-padding">
      <div class="container">
        <div class="section-header">
          <span class="section-tag"><i class="fa-solid fa-user"></i> About The Designer</span>
          <h2>Driven by Passion, Built on Precision</h2>
          <p>Graphic Designer based in Gampola, Ulapane specializing in branding, poster design, advertising layouts, and multimedia visuals.</p>
        </div>

        <div class="about-grid">
          <div class="about-image-wrapper glass-card">
            <img src="${config.avatarUrl}" alt="${config.designerName}" class="about-img" />
            <div class="about-floating-experience">
              <h4>${config.experienceYears}+ Yrs</h4>
              <p style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Graphic Design Exp.</p>
            </div>
          </div>

          <div class="about-content">
            <h3 style="font-size: 2.2rem; margin-bottom: 16px;">Hello! I'm <span class="gradient-text">${config.designerName}</span></h3>
            <p style="color: var(--text-muted); font-size: 1.05rem; margin-bottom: 24px; line-height: 1.7;">
              ${config.bio}
            </p>

            <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 32px;">
              <a href="${config.cvUrl}" download="Mohamed_Shafi_Ammar_CV.pdf" class="btn btn-primary" style="padding: 12px 28px;">
                <i class="fa-solid fa-file-arrow-down"></i>
                <span>Download Official CV (PDF)</span>
              </a>

              <a href="#contact" class="btn btn-secondary">
                <i class="fa-solid fa-paper-plane"></i>
                <span>Get In Touch</span>
              </a>
            </div>

            <h4 style="font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent-cyan); margin-bottom: 16px;">
              Core Design Skills
            </h4>

            <div class="skills-matrix">
              ${config.skills.map(skill => `
                <div class="skill-item">
                  <div class="skill-item-header">
                    <span>${skill.name}</span>
                    <span style="color: var(--accent-cyan);">${skill.percentage}%</span>
                  </div>
                  <div class="skill-bar-bg">
                    <div class="skill-bar-fill" style="width: ${skill.percentage}%;"></div>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Languages -->
            <div style="margin-top: 30px;">
              <h4 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 12px;">Languages</h4>
              <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                ${config.languages.map(lang => `
                  <span class="tag-pill" style="padding: 8px 16px; border: 1px solid var(--border-glow); background: rgba(0, 240, 255, 0.08); font-size: 0.88rem; color: var(--text-main); font-weight: 600;">
                    <i class="fa-solid fa-language" style="color: var(--accent-cyan); margin-right: 6px;"></i>
                    ${lang.name} • ${lang.level}
                  </span>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Experience & Education Timeline Grid -->
        <div style="margin-top: 90px;">
          <div class="section-header" style="margin-bottom: 50px;">
            <span class="section-tag"><i class="fa-solid fa-graduation-cap"></i> Experience & Qualifications</span>
            <h2>Work Experience & Education Timeline</h2>
          </div>

          <div class="timeline-grid">
            <!-- Work Experience -->
            <div class="glass-card" style="padding: 36px;">
              <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 24px;">
                <div class="btn-icon" style="width: 46px; height: 46px; background: rgba(0, 240, 255, 0.15); color: var(--accent-cyan); border-color: var(--accent-cyan);">
                  <i class="fa-solid fa-briefcase"></i>
                </div>
                <h3 style="font-size: 1.6rem;">Work Experience</h3>
              </div>

              ${config.experienceTimeline.map(exp => `
                <div style="border-left: 2px solid var(--accent-cyan); padding-left: 20px; margin-bottom: 24px; position: relative;">
                  <div style="position: absolute; left: -7px; top: 0; width: 12px; height: 12px; border-radius: 50%; background: var(--accent-cyan); box-shadow: 0 0 10px var(--accent-cyan);"></div>
                  <span style="font-size: 0.8rem; color: var(--accent-cyan); font-weight: 700; text-transform: uppercase;">${exp.period}</span>
                  <h4 style="font-size: 1.2rem; margin: 4px 0;">${exp.role}</h4>
                  <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-muted); margin-bottom: 12px;">${exp.company}</div>
                  <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
                    ${exp.details.map(d => `
                      <li style="font-size: 0.9rem; color: var(--text-muted); display: flex; align-items: flex-start; gap: 8px;">
                        <i class="fa-solid fa-angle-right" style="color: var(--accent-cyan); margin-top: 4px;"></i>
                        <span>${d}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>

            <!-- Education & Professional Qualifications -->
            <div class="glass-card" style="padding: 36px;">
              <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 24px;">
                <div class="btn-icon" style="width: 46px; height: 46px; background: rgba(138, 43, 238, 0.15); color: var(--accent-violet); border-color: var(--accent-violet);">
                  <i class="fa-solid fa-graduation-cap"></i>
                </div>
                <h3 style="font-size: 1.6rem;">Education & Qualifications</h3>
              </div>

              ${config.education.map(edu => `
                <div style="border-left: 2px solid var(--accent-violet); padding-left: 20px; margin-bottom: 24px; position: relative;">
                  <div style="position: absolute; left: -7px; top: 0; width: 12px; height: 12px; border-radius: 50%; background: var(--accent-violet); box-shadow: 0 0 10px var(--accent-violet);"></div>
                  <span style="font-size: 0.8rem; color: var(--accent-violet); font-weight: 700; text-transform: uppercase;">${edu.year}</span>
                  <h4 style="font-size: 1.15rem; margin: 4px 0;">${edu.degree}</h4>
                  <div style="font-size: 0.9rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">${edu.institution}</div>
                  <p style="font-size: 0.88rem; color: var(--text-dim);">${edu.description}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

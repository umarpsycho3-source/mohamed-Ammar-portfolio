import { store } from '../state/store.js';

export function renderNavigation(currentRoute = '#home') {
  const links = [
    { label: 'Home', route: '#home', icon: 'fa-house' },
    { label: 'About', route: '#about', icon: 'fa-user' },
    { label: 'Projects', route: '#projects', icon: 'fa-shapes' },
    { label: 'Services', route: '#services', icon: 'fa-wand-magic-sparkles' },
    { label: 'Contact', route: '#contact', icon: 'fa-envelope' }
  ];

  return `
    <nav class="navbar">
      <a href="#home" class="nav-brand">
        <img src="${store.config.avatarUrl}" alt="Ammar" class="brand-avatar" />
        <span class="brand-name">Ammar</span>
      </a>

      <ul class="nav-links">
        ${links.map(link => `
          <li>
            <a href="${link.route}" class="nav-link ${currentRoute === link.route ? 'active' : ''}">
              ${link.label}
            </a>
          </li>
        `).join('')}
      </ul>

      <div class="nav-actions">
        <a href="#contact" class="btn btn-primary" style="padding: 10px 22px; font-size: 0.9rem;">
          <span>Hire Me</span>
          <i class="fa-solid fa-arrow-right"></i>
        </a>

        <button class="mobile-toggle" id="mobile-menu-btn" aria-label="Toggle Navigation Menu" title="Toggle Navigation Menu">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </nav>

    <!-- Slide-over Glassmorphism Mobile Menu Drawer -->
    <div class="mobile-drawer-backdrop" id="mobile-drawer-backdrop">
      <div class="mobile-menu-drawer">
        <div>
          <div class="mobile-drawer-header">
            <a href="#home" class="nav-brand drawer-close-trigger">
              <img src="${store.config.avatarUrl}" alt="Ammar" class="brand-avatar" />
              <span class="brand-name">Ammar</span>
            </a>

            <button class="mobile-drawer-close" id="mobile-drawer-close-btn" aria-label="Close Menu">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <ul class="mobile-drawer-nav">
            ${links.map(link => `
              <li>
                <a href="${link.route}" class="mobile-drawer-link drawer-close-trigger ${currentRoute === link.route ? 'active' : ''}">
                  <i class="fa-solid ${link.icon}" style="color: var(--accent-cyan); width: 20px;"></i>
                  <span>${link.label}</span>
                </a>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="mobile-drawer-footer">
          <a href="#contact" class="btn btn-primary drawer-close-trigger" style="width: 100%; padding: 14px;">
            <span>Hire Me</span>
            <i class="fa-solid fa-paper-plane"></i>
          </a>

          <a href="${store.config.cvUrl}" download="Mohamed_Shafi_Ammar_CV.pdf" class="btn btn-secondary drawer-close-trigger" style="width: 100%; padding: 12px; border-color: var(--accent-cyan);">
            <i class="fa-solid fa-file-arrow-down" style="color: var(--accent-cyan);"></i>
            <span>Download Official CV</span>
          </a>

          <div style="display: flex; justify-content: center; gap: 16px; margin-top: 8px;">
            <a href="${store.config.whatsappUrl}" target="_blank" rel="noopener noreferrer" style="color: #25D366; font-size: 1.3rem;">
              <i class="fa-brands fa-whatsapp"></i>
            </a>
            <a href="${store.config.instagramUrl}" target="_blank" rel="noopener noreferrer" style="color: #e6683c; font-size: 1.3rem;">
              <i class="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function setupNavigationListeners(navigateCallback) {
  const navLinks = document.querySelectorAll('.nav-link, .nav-brand, .mobile-drawer-link');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-drawer-close-btn');

  const closeMobileMenu = () => {
    if (backdrop) backdrop.classList.remove('active');
    document.body.classList.remove('menu-open');
  };

  const openMobileMenu = () => {
    if (backdrop) backdrop.classList.add('active');
    document.body.classList.add('menu-open');
  };

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openMobileMenu();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMobileMenu);
  }

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeMobileMenu();
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetRoute = link.getAttribute('href');
      if (targetRoute && targetRoute.startsWith('#')) {
        closeMobileMenu();
        if (navigateCallback) {
          navigateCallback(targetRoute);
        }
      }
    });
  });

  // Secret shortcut for Admin Login: Ctrl + Shift + A
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      closeMobileMenu();
      if (navigateCallback) {
        navigateCallback('#admin');
      }
    }
  });
}

import { store } from '../state/store.js';

export function renderNavigation(currentRoute = '#home') {
  const { config } = store;

  const links = [
    { label: 'Home', route: '#home' },
    { label: 'About', route: '#about' },
    { label: 'Projects', route: '#projects' },
    { label: 'Services', route: '#services' },
    { label: 'Contact', route: '#contact' }
  ];

  return `
    <nav class="navbar">
      <a href="#home" class="nav-brand">
        <img src="${config.avatarUrl}" alt="${config.designerName}" class="brand-avatar" />
        <span>${config.designerName}</span>
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

        <button class="mobile-toggle" id="mobile-menu-btn" title="Toggle Navigation Menu">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </nav>
  `;
}

export function setupNavigationListeners(navigateCallback) {
  const navLinks = document.querySelectorAll('.nav-link, .nav-brand');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetRoute = link.getAttribute('href');
      if (targetRoute && navigateCallback) {
        navigateCallback(targetRoute);
      }
    });
  });

  // Secret shortcut for Admin Login: Ctrl + Shift + A
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      if (navigateCallback) {
        navigateCallback('#admin');
      }
    }
  });
}

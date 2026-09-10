import { renderNavigation, setupNavigationListeners } from './components/Navigation.js';
import { renderHomePage } from './pages/HomePage.js';
import { renderAboutPage } from './pages/AboutPage.js';
import { renderProjectsPage, setupProjectsPageListeners } from './pages/ProjectsPage.js';
import { renderServicesPage, setupServicesPageListeners } from './pages/ServicesPage.js';
import { renderContactPage, setupContactPageListeners } from './pages/ContactPage.js';
import { renderAdminPage, setupAdminPageListeners } from './pages/AdminPage.js';
import { renderSocialFloating } from './components/SocialFloating.js';
import { renderProjectModal, setupProjectModalListeners } from './components/ProjectModal.js';
import { initThreeCanvas } from './components/ThreeCanvas.js';

let cleanupHeroCanvas = null;

export function initRouter() {
  const getHashRoute = () => window.location.hash || '#home';

  const navigateTo = (route) => {
    window.location.hash = route;
  };

  const handleRoute = () => {
    const route = getHashRoute();
    const appContainer = document.getElementById('app-main-content');
    const navContainer = document.getElementById('nav-container');

    // Update Header Navigation
    if (navContainer) {
      navContainer.innerHTML = renderNavigation(route);
      setupNavigationListeners(navigateTo);
    }

    // Render dedicated Page View
    if (appContainer) {
      if (route === '#about') {
        appContainer.innerHTML = renderAboutPage();
      } else if (route === '#projects') {
        appContainer.innerHTML = renderProjectsPage();
        setupProjectsPageListeners();
      } else if (route === '#services') {
        appContainer.innerHTML = renderServicesPage();
        setupServicesPageListeners();
      } else if (route === '#contact') {
        appContainer.innerHTML = renderContactPage();
        setupContactPageListeners();
      } else if (route === '#admin') {
        appContainer.innerHTML = renderAdminPage();
        setupAdminPageListeners();
      } else {
        // Default Home Route
        appContainer.innerHTML = renderHomePage();
        // Init 3D canvas if on home page
        setTimeout(() => {
          const hero3d = document.getElementById('hero-3d-container');
          if (hero3d) {
            initThreeCanvas('hero-3d-container');
          }
        }, 50);
      }

      // Scroll to top on page navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Floating Social Widgets
    const socialContainer = document.getElementById('social-floating-container');
    if (socialContainer) {
      socialContainer.innerHTML = renderSocialFloating();
    }

    // Lightbox Modal
    const modalContainer = document.getElementById('project-modal-container');
    if (modalContainer) {
      modalContainer.innerHTML = renderProjectModal();
      setupProjectModalListeners();
    }
  };

  // Listen for hash changes
  window.addEventListener('hashchange', handleRoute);

  // Initial Route Handle
  handleRoute();
}

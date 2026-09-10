import { store } from './state/store.js';
import { initRouter } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
  // Boot router
  initRouter();

  // Subscribe to state updates
  store.subscribe(() => {
    initRouter();
  });

  // Footer year & designer name update
  const footerYear = document.getElementById('footer-year');
  const footerDesigner = document.getElementById('footer-designer-name');
  if (footerYear) footerYear.innerText = new Date().getFullYear();
  if (footerDesigner) footerDesigner.innerText = store.config.designerName;

  // Add event listener to discreet footer admin link
  const footerAdminLink = document.getElementById('footer-admin-link');
  if (footerAdminLink) {
    footerAdminLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '#admin';
    });
  }
});

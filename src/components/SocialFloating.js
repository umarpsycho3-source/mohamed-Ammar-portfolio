import { store } from '../state/store.js';

export function renderSocialFloating() {
  const { config } = store;

  return `
    <a href="${config.whatsappUrl}" target="_blank" rel="noopener noreferrer" class="floating-whatsapp" title="Instant WhatsApp Chat with ${config.designerName}">
      <i class="fa-brands fa-whatsapp"></i>
    </a>
  `;
}

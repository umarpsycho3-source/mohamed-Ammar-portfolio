import { store } from '../state/store.js';

export function renderContactSection() {
  const { config } = store;

  return `
    <section id="contact" class="section-padding" style="background: rgba(10, 12, 18, 0.4);">
      <div class="container">
        <div class="section-header">
          <span class="section-tag"><i class="fa-solid fa-envelope"></i> Get In Touch</span>
          <h2>Let's Craft Something Extraordinary</h2>
          <p>Have a project in mind, an inquiry, or looking to collaborate? Send a message or connect directly on WhatsApp / Instagram.</p>
        </div>

        <div class="contact-grid">
          <!-- Left Info & Social Card -->
          <div class="contact-info-card glass-card">
            <h3 style="font-size: 1.8rem; margin-bottom: 24px;">Direct Contact Info</h3>

            <div class="contact-item">
              <button class="contact-icon-btn copy-btn" data-copy="${config.email}" title="Copy Email">
                <i class="fa-solid fa-envelope"></i>
              </button>
              <div>
                <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Gmail / Email</span>
                <div style="font-weight: 700; font-size: 1.05rem;">${config.email}</div>
              </div>
            </div>

            <div class="contact-item">
              <button class="contact-icon-btn copy-btn" data-copy="${config.phone}" title="Copy Phone">
                <i class="fa-solid fa-phone"></i>
              </button>
              <div>
                <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Phone Number</span>
                <div style="font-weight: 700; font-size: 1.05rem;">${config.phone}</div>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon-btn">
                <i class="fa-solid fa-location-dot"></i>
              </div>
              <div>
                <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Studio Location</span>
                <div style="font-weight: 700; font-size: 1.05rem;">${config.location}</div>
              </div>
            </div>

            <h4 style="font-size: 1rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 36px; margin-bottom: 16px;">
              Instant Messaging & Socials
            </h4>

            <div class="social-links-row">
              <a href="${config.whatsappUrl}" target="_blank" rel="noopener noreferrer" class="social-btn social-btn-whatsapp">
                <i class="fa-brands fa-whatsapp" style="font-size: 1.3rem;"></i>
                <span>WhatsApp Chat</span>
              </a>

              <a href="${config.instagramUrl}" target="_blank" rel="noopener noreferrer" class="social-btn social-btn-instagram">
                <i class="fa-brands fa-instagram" style="font-size: 1.3rem;"></i>
                <span>@${config.instagram}</span>
              </a>
            </div>

            <!-- Embedded Map Visual Mock -->
            <div style="margin-top: 36px; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-color); height: 160px; position: relative; background: #121622;">
              <iframe 
                src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style="border:0; filter: invert(90%) hue-rotate(180deg);" 
                allowfullscreen="" 
                loading="lazy">
              </iframe>
            </div>
          </div>

          <!-- Right Lead Form Card -->
          <div class="glass-card" style="padding: 40px;">
            <h3 style="font-size: 1.8rem; margin-bottom: 24px;">Send Project Inquiry</h3>

            <form id="contact-lead-form">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div class="form-group">
                  <label class="form-label">Your Name *</label>
                  <input type="text" id="contact-name" class="form-input" placeholder="e.g. Sarah Jenkins" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Email Address *</label>
                  <input type="email" id="contact-email" class="form-input" placeholder="sarah@company.com" required />
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div class="form-group">
                  <label class="form-label">Phone Number</label>
                  <input type="tel" id="contact-phone" class="form-input" placeholder="+1 (555) 000-0000" />
                </div>
                <div class="form-group">
                  <label class="form-label">Service Interested In</label>
                  <select id="contact-service-select" class="form-select">
                    <option value="Brand Identity & Strategy">Brand Identity & Strategy</option>
                    <option value="UI/UX & Web Design">UI/UX & Web Design</option>
                    <option value="3D Asset Modeling & Visuals">3D Asset Modeling & Visuals</option>
                    <option value="Packaging & Print Design">Packaging & Print Design</option>
                    <option value="General Consultation">General Consultation</option>
                  </select>
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div class="form-group">
                  <label class="form-label">Estimated Budget</label>
                  <select id="contact-budget-select" class="form-select">
                    <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                    <option value="$5,000 - $10,000" selected>$5,000 - $10,000</option>
                    <option value="$10,000 - $20,000">$10,000 - $20,000</option>
                    <option value="$20,000+">$20,000+</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Target Timeline</label>
                  <select id="contact-timeline-select" class="form-select">
                    <option value="2 Weeks">2 Weeks (Urgent)</option>
                    <option value="1 Month" selected>1 Month</option>
                    <option value="2-3 Months">2-3 Months</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Project Details & Message *</label>
                <textarea id="contact-message-input" class="form-textarea" rows="4" placeholder="Tell us about your brand vision, deliverables needed, or design goals..." required></textarea>
              </div>

              <button type="submit" class="btn btn-primary" style="width: 100%; padding: 16px;">
                <span>Send Inquiry & Create Lead</span>
                <i class="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function setupContactListeners() {
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}" to clipboard!`);
      });
    });
  });

  const form = document.getElementById('contact-lead-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const phone = document.getElementById('contact-phone').value;
      const service = document.getElementById('contact-service-select').value;
      const budget = document.getElementById('contact-budget-select').value;
      const timeline = document.getElementById('contact-timeline-select').value;
      const message = document.getElementById('contact-message-input').value;

      store.addLead({
        name,
        email,
        phone,
        service,
        budget,
        timeline,
        message
      });

      showToast('🎉 Message sent successfully! Your lead is logged and we will respond within 24h.');
      form.reset();
    });
  }
}

export function showToast(msg) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-cyan);"></i> <span>${msg}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

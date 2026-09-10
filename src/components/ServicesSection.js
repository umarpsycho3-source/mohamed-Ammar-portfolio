import { store } from '../state/store.js';

let selectedService = 'Brand Identity & Strategy';
let selectedComplexity = 'Standard';
let selectedAddons = [];

export function renderServicesSection() {
  const services = [
    {
      title: "Brand Identity & Strategy",
      icon: "fa-compass-drafting",
      description: "Comprehensive brand positioning, vector logo marks, color hierarchy, typography rules, and 50-page brand strategy PDF.",
      features: ["3 Logo Concepts", "Color & Typography Guide", "Brand Guidelines PDF", "Vector & Raw Files"]
    },
    {
      title: "UI/UX & Web Design",
      icon: "fa-laptop-code",
      description: "High-conversion Figma UI design systems, responsive web templates, mobile app wireframes, and Webflow implementation.",
      features: ["Figma Component Library", "Mobile & Desktop UI", "Interactive Prototype", "Design System Specs"]
    },
    {
      title: "3D Asset Modeling & Visuals",
      icon: "fa-cube",
      description: "Custom 3D geometric art, product key visual renders, metallic glTF assets for websites, and raytraced Blender renders.",
      features: ["High-Res 4K Renders", "glTF / OBJ 3D Files", "Custom Studio Lighting", "Alpha Channel PNGs"]
    },
    {
      title: "Packaging & Print Design",
      icon: "fa-box-open",
      description: "Luxury botanical packaging, foil-embossed cosmetic bottle labels, merchandise lines, and print-ready die-lines.",
      features: ["Die-cut Print Files", "Gold/Silver Foil Specs", "3D Bottle Mockups", "Supplier Print Prep"]
    }
  ];

  // Price Estimator Math
  let basePrice = 1500;
  if (selectedService === 'UI/UX & Web Design') basePrice = 2200;
  if (selectedService === '3D Asset Modeling & Visuals') basePrice = 1800;
  if (selectedService === 'Packaging & Print Design') basePrice = 1600;

  let multiplier = 1.0;
  if (selectedComplexity === 'Premium') multiplier = 1.5;
  if (selectedComplexity === 'Enterprise') multiplier = 2.2;

  let addonsCost = selectedAddons.length * 350;
  let estimatedTotal = Math.round((basePrice * multiplier) + addonsCost);

  return `
    <section id="services" class="section-padding">
      <div class="container">
        <div class="section-header">
          <span class="section-tag"><i class="fa-solid fa-wand-magic-sparkles"></i> Capabilities</span>
          <h2>Services & Creative Solutions</h2>
          <p>End-to-end design execution tailored for ambitious brands looking for world-class visual aesthetics.</p>
        </div>

        <div class="services-grid">
          ${services.map(service => `
            <div class="service-card glass-card">
              <div class="service-icon-box">
                <i class="fa-solid ${service.icon}"></i>
              </div>
              <h3 style="font-size: 1.4rem; margin-bottom: 12px;">${service.title}</h3>
              <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 24px; line-height: 1.6;">${service.description}</p>
              
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
                ${service.features.map(f => `
                  <li style="display: flex; align-items: center; gap: 10px; font-size: 0.88rem; color: var(--text-main);">
                    <i class="fa-solid fa-circle-check" style="color: var(--accent-cyan);"></i>
                    ${f}
                  </li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

        <!-- Interactive Service Quote Estimator Widget -->
        <div class="estimator-card glass-card">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
            <div>
              <span class="section-tag" style="margin-bottom: 8px;"><i class="fa-solid fa-calculator"></i> Price Calculator</span>
              <h3 style="font-size: 2rem;">Interactive Project Quote Estimator</h3>
              <p style="color: var(--text-muted);">Select your scope requirements to generate an instant ballpark estimate.</p>
            </div>
            <div class="btn-icon" style="width: 50px; height: 50px; background: rgba(0, 240, 255, 0.15); color: var(--accent-cyan); border-color: var(--accent-cyan);">
              <i class="fa-solid fa-coins" style="font-size: 1.4rem;"></i>
            </div>
          </div>

          <div style="margin-top: 30px;">
            <h4 style="font-size: 0.95rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 14px;">1. Choose Primary Service</h4>
            <div class="estimator-options">
              ${['Brand Identity & Strategy', 'UI/UX & Web Design', '3D Asset Modeling & Visuals', 'Packaging & Print Design'].map(srv => `
                <button class="estimator-option-btn ${selectedService === srv ? 'selected' : ''}" data-estimator-service="${srv}">
                  <div style="font-weight: 700; margin-bottom: 4px;">${srv}</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted);">From \$${srv.includes('UI') ? '2,200' : '1,500'}</div>
                </button>
              `).join('')}
            </div>

            <h4 style="font-size: 0.95rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 14px;">2. Select Project Scope Depth</h4>
            <div class="estimator-options">
              ${['Essential', 'Standard', 'Premium', 'Enterprise'].map(comp => `
                <button class="estimator-option-btn ${selectedComplexity === comp ? 'selected' : ''}" data-estimator-complexity="${comp}">
                  <div style="font-weight: 700; margin-bottom: 4px;">${comp}</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted);">${comp === 'Enterprise' ? 'Full Suite + 3D' : 'Core Deliverables'}</div>
                </button>
              `).join('')}
            </div>

            <!-- Price Output & Direct CTA -->
            <div class="estimator-price-display">
              <div>
                <span style="font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Estimated Investment</span>
                <div style="font-size: 2.4rem; font-weight: 800; font-family: var(--font-display); background: var(--grad-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                  \$${estimatedTotal.toLocaleString()} <span style="font-size: 1rem; color: var(--text-muted); -webkit-text-fill-color: initial;">USD (Est.)</span>
                </div>
              </div>

              <button id="estimator-submit-btn" class="btn btn-primary">
                <span>Book This Project</span>
                <i class="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function setupServicesListeners() {
  const serviceBtns = document.querySelectorAll('[data-estimator-service]');
  serviceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedService = btn.getAttribute('data-estimator-service');
      refreshEstimator();
    });
  });

  const compBtns = document.querySelectorAll('[data-estimator-complexity]');
  compBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedComplexity = btn.getAttribute('data-estimator-complexity');
      refreshEstimator();
    });
  });

  const submitBtn = document.getElementById('estimator-submit-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Pre-fill contact form
        const serviceSelect = document.getElementById('contact-service-select');
        const messageInput = document.getElementById('contact-message-input');
        if (serviceSelect) serviceSelect.value = selectedService;
        if (messageInput) {
          messageInput.value = `Hi! I used the price calculator for ${selectedService} (${selectedComplexity} scope). Ballpark estimate: ~\$${calculateCurrentEstimate()}`;
        }
      }
    });
  }
}

function calculateCurrentEstimate() {
  let basePrice = 1500;
  if (selectedService === 'UI/UX & Web Design') basePrice = 2200;
  if (selectedService === '3D Asset Modeling & Visuals') basePrice = 1800;
  if (selectedService === 'Packaging & Print Design') basePrice = 1600;

  let multiplier = 1.0;
  if (selectedComplexity === 'Premium') multiplier = 1.5;
  if (selectedComplexity === 'Enterprise') multiplier = 2.2;

  return Math.round((basePrice * multiplier)).toLocaleString();
}

function refreshEstimator() {
  const servicesSection = document.getElementById('services-section-container');
  if (servicesSection) {
    servicesSection.innerHTML = renderServicesSection();
    setupServicesListeners();
  }
}

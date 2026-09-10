import { store } from '../state/store.js';
import { showToast } from './ContactSection.js';

let activeAdminTab = 'projects'; // 'projects' | 'leads' | 'profile'
let editingProjectId = null;
let projectModalOpen = false;

let uploadedImage1 = null;
let uploadedImage2 = null;
let uploadedImage3 = null;

export function renderAdminDashboard() {
  const { isAdminLoggedIn, projects, leads, config } = store;

  if (!isAdminLoggedIn) {
    return `
      <div class="admin-login-wrapper">
        <div class="login-card glass-card">
          <div class="btn-icon" style="margin: 0 auto 20px auto; width: 64px; height: 64px; background: rgba(0,240,255,0.15); color: var(--accent-cyan); border-color: var(--accent-cyan); font-size: 1.8rem;">
            <i class="fa-solid fa-lock"></i>
          </div>
          <h2 style="font-size: 2.2rem; margin-bottom: 8px;">Admin Portal</h2>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 28px;">Log in to manage projects, lead inquiries & live settings.</p>

          <form id="admin-login-form">
            <div class="form-group" style="text-align: left;">
              <label class="form-label">Username</label>
              <input type="text" id="admin-username" class="form-input" value="admin" required />
            </div>
            <div class="form-group" style="text-align: left;">
              <label class="form-label">Password</label>
              <input type="password" id="admin-password" class="form-input" value="admin123" required />
            </div>
            <p id="login-error-msg" style="color: #ff4757; font-size: 0.85rem; margin-bottom: 16px; display: none;"></p>

            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px; margin-bottom: 14px; font-size: 1rem;">
              <span>Login to Dashboard</span>
              <i class="fa-solid fa-right-to-bracket"></i>
            </button>
            
            <button type="button" id="close-admin-overlay-btn" class="btn btn-secondary" style="width: 100%; padding: 12px; font-size: 0.9rem;">
              <span>Back to Portfolio Home</span>
            </button>
          </form>
        </div>
      </div>
    `;
  }

  return `
    <div class="container">
      <div class="admin-overlay">
        <div class="admin-header">
          <div style="display: flex; align-items: center; gap: 16px;">
            <h2 style="font-size: 1.4rem;">${config.designerName} - Admin Dashboard</h2>
            <span style="padding: 4px 12px; background: rgba(0,240,255,0.15); color: var(--accent-cyan); border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 700;">Live Control Mode</span>
          </div>

          <div style="display: flex; align-items: center; gap: 16px;">
            <button id="admin-logout-btn" class="btn btn-secondary" style="padding: 8px 18px; font-size: 0.85rem;">
              <i class="fa-solid fa-right-from-bracket"></i>
              <span>Exit Admin</span>
            </button>
          </div>
        </div>

        <div class="admin-body">
          <div class="admin-sidebar">
            <button class="admin-nav-item ${activeAdminTab === 'projects' ? 'active' : ''}" data-admin-tab="projects">
              <i class="fa-solid fa-shapes"></i>
              <span>Projects CRUD</span>
            </button>
            <button class="admin-nav-item ${activeAdminTab === 'leads' ? 'active' : ''}" data-admin-tab="leads">
              <i class="fa-solid fa-inbox"></i>
              <span>Leads & Inquiries (${leads.filter(l => l.status === 'New').length})</span>
            </button>
            <button class="admin-nav-item ${activeAdminTab === 'profile' ? 'active' : ''}" data-admin-tab="profile">
              <i class="fa-solid fa-user-gear"></i>
              <span>Profile & Contact Editor</span>
            </button>
          </div>

          <div class="admin-content">
            ${renderTabContent()}
          </div>
        </div>

        ${projectModalOpen ? renderProjectFormModal() : ''}
      </div>
    </div>
  `;
}

function renderTabContent() {
  const { projects, leads, config } = store;

  if (activeAdminTab === 'projects') {
    return `
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
          <div>
            <h3 style="font-size: 1.8rem;">Project Portfolio Management</h3>
            <p style="color: var(--text-muted);">Add projects with up to 3 showcase images, documentation links, or delete items.</p>
          </div>
          <button id="add-project-trigger-btn" class="btn btn-primary">
            <i class="fa-solid fa-plus"></i>
            <span>Add New Project</span>
          </button>
        </div>

        <div class="admin-stats-grid">
          <div class="admin-stat-card">
            <h4>Total Projects</h4>
            <div class="value">${projects.length}</div>
          </div>
          <div class="admin-stat-card">
            <h4>Featured Items</h4>
            <div class="value">${projects.filter(p => p.featured).length}</div>
          </div>
          <div class="admin-stat-card">
            <h4>Categories</h4>
            <div class="value">4</div>
          </div>
        </div>

        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Category</th>
                <th>Images</th>
                <th>Documentation Link</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${projects.map(p => `
                <tr>
                  <td><img src="${p.thumbnail}" alt="" style="width: 50px; height: 35px; object-fit: cover; border-radius: 6px;" /></td>
                  <td><strong>${p.title}</strong></td>
                  <td>${p.category}</td>
                  <td><span style="font-weight: 700; color: var(--accent-cyan);">${p.images ? p.images.length : 1} Images</span></td>
                  <td>
                    <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-cyan); text-decoration: underline; font-size: 0.85rem;">
                      <i class="fa-solid fa-up-right-from-square"></i> Open Doc
                    </a>
                  </td>
                  <td>
                    <span class="status-badge ${p.featured ? 'New' : 'Archived'}">${p.featured ? 'Yes' : 'No'}</span>
                  </td>
                  <td>
                    <div style="display: flex; gap: 8px;">
                      <button class="btn-icon edit-proj-btn" data-id="${p.id}" style="width: 32px; height: 32px;" title="Edit Project">
                        <i class="fa-solid fa-pen"></i>
                      </button>
                      <button class="btn-icon delete-proj-btn" data-id="${p.id}" style="width: 32px; height: 32px; color: #ff4757;" title="Delete Project">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  if (activeAdminTab === 'leads') {
    return `
      <div>
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 1.8rem;">Client Leads & Inquiries</h3>
          <p style="color: var(--text-muted);">Manage incoming contact form & price estimator submissions.</p>
        </div>

        <div class="admin-stats-grid">
          <div class="admin-stat-card">
            <h4>Total Submissions</h4>
            <div class="value">${leads.length}</div>
          </div>
          <div class="admin-stat-card">
            <h4>New Inquiries</h4>
            <div class="value" style="color: var(--accent-cyan);">${leads.filter(l => l.status === 'New').length}</div>
          </div>
          <div class="admin-stat-card">
            <h4>In Progress</h4>
            <div class="value" style="color: var(--accent-violet);">${leads.filter(l => l.status === 'In Progress').length}</div>
          </div>
        </div>

        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Email & Phone</th>
                <th>Service Interested</th>
                <th>Budget</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${leads.map(l => `
                <tr>
                  <td><strong>${l.name}</strong></td>
                  <td>
                    <div>${l.email}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">${l.phone}</div>
                  </td>
                  <td>${l.service}</td>
                  <td><strong style="color: var(--accent-cyan);">${l.budget}</strong></td>
                  <td><span style="font-size: 0.8rem; color: var(--text-muted);">${l.date}</span></td>
                  <td>
                    <select class="form-select lead-status-select" data-lead-id="${l.id}" style="padding: 4px 8px; font-size: 0.8rem; width: auto;">
                      <option value="New" ${l.status === 'New' ? 'selected' : ''}>New</option>
                      <option value="Contacted" ${l.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
                      <option value="In Progress" ${l.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                      <option value="Archived" ${l.status === 'Archived' ? 'selected' : ''}>Archived</option>
                    </select>
                  </td>
                  <td>
                    <button class="btn-icon delete-lead-btn" data-id="${l.id}" style="width: 32px; height: 32px; color: #ff4757;" title="Delete Lead">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  if (activeAdminTab === 'profile') {
    return `
      <div style="max-width: 800px;">
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 1.8rem;">Profile & Contact Details Editor</h3>
          <p style="color: var(--text-muted);">Update your graphic designer name, email, phone number, WhatsApp number, Instagram handle, and bio live.</p>
        </div>

        <form id="admin-profile-form" class="glass-card" style="padding: 32px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="form-group">
              <label class="form-label">Designer Name</label>
              <input type="text" id="prof-name" class="form-input" value="${config.designerName}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Professional Title</label>
              <input type="text" id="prof-title" class="form-input" value="${config.designerTitle}" required />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Avatar Profile Image URL</label>
            <input type="url" id="prof-avatar" class="form-input" value="${config.avatarUrl}" required />
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="form-group">
              <label class="form-label">Contact Gmail / Email</label>
              <input type="email" id="prof-email" class="form-input" value="${config.email}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Phone Number</label>
              <input type="text" id="prof-phone" class="form-input" value="${config.phone}" required />
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="form-group">
              <label class="form-label">WhatsApp Number (e.g. +15552348900)</label>
              <input type="text" id="prof-whatsapp" class="form-input" value="${config.whatsapp}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Instagram Handle (without @)</label>
              <input type="text" id="prof-instagram" class="form-input" value="${config.instagram}" required />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Bio & Overview</label>
            <textarea id="prof-bio" class="form-textarea" rows="3" required>${config.bio}</textarea>
          </div>

          <div style="display: flex; gap: 16px; margin-top: 10px;">
            <button type="submit" class="btn btn-primary" style="flex: 1; padding: 14px;">
              <span>Save & Publish Live Updates</span>
              <i class="fa-solid fa-floppy-disk"></i>
            </button>
            <button type="button" id="reset-demo-data-btn" class="btn btn-secondary">
              <i class="fa-solid fa-rotate-left"></i>
              <span>Reset Demo Data</span>
            </button>
          </div>
        </form>
      </div>
    `;
  }
}

function renderProjectFormModal() {
  const isEditing = Boolean(editingProjectId);
  const targetProj = isEditing ? store.projects.find(p => p.id === editingProjectId) : null;

  const targetImgs = targetProj && targetProj.images ? targetProj.images : [];
  const defaultImg = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80';

  const img1Src = uploadedImage1 || targetImgs[0] || (targetProj ? targetProj.thumbnail : defaultImg);
  const img2Src = uploadedImage2 || targetImgs[1] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80';
  const img3Src = uploadedImage3 || targetImgs[2] || 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=80';

  return `
    <div class="modal-overlay open" id="project-crud-modal">
      <div class="modal-content glass-card" style="max-width: 720px; max-height: 92vh; overflow-y: auto;">
        <button class="modal-close-btn" id="close-project-modal-btn">
          <i class="fa-solid fa-xmark"></i>
        </button>

        <h3 style="font-size: 1.8rem; margin-bottom: 20px;">${isEditing ? 'Edit Project Details' : 'Add New Graphic Project'}</h3>

        <form id="project-crud-form">
          <div class="form-group">
            <label class="form-label">Project Title *</label>
            <input type="text" id="proj-form-title" class="form-input" value="${targetProj ? targetProj.title : ''}" placeholder="e.g. AURA - Futuristic Brand Identity" required />
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="form-group">
              <label class="form-label">Category</label>
              <select id="proj-form-category" class="form-select">
                <option value="Brand Identity" ${targetProj && targetProj.category === 'Brand Identity' ? 'selected' : ''}>Brand Identity</option>
                <option value="UI/UX & Web" ${targetProj && targetProj.category === 'UI/UX & Web' ? 'selected' : ''}>UI/UX & Web</option>
                <option value="3D & Motion" ${targetProj && targetProj.category === '3D & Motion' ? 'selected' : ''}>3D & Motion</option>
                <option value="Packaging" ${targetProj && targetProj.category === 'Packaging' ? 'selected' : ''}>Packaging</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Completion Year</label>
              <input type="text" id="proj-form-year" class="form-input" value="${targetProj ? targetProj.year : new Date().getFullYear()}" required />
            </div>
          </div>

          <!-- Documentation Link -->
          <div class="form-group">
            <label class="form-label">Documentation / Case Study Link (URL) *</label>
            <input type="url" id="proj-form-liveurl" class="form-input" value="${targetProj ? targetProj.liveUrl : 'https://behance.net'}" placeholder="https://behance.net/gallery/... or https://dribbble.com/..." required />
          </div>

          <!-- 3 Showcase Images Upload Section -->
          <div style="background: rgba(0, 0, 0, 0.4); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 24px;">
            <label class="form-label" style="color: var(--accent-cyan); font-weight: 700; font-size: 1rem; margin-bottom: 14px; display: block;">
              <i class="fa-solid fa-images"></i> Upload Up To 3 Showcase Images (For Lightbox View)
            </label>

            <!-- Image 1 (Cover / Thumbnail) -->
            <div style="padding: 14px; background: rgba(255,255,255,0.03); border-radius: var(--radius-md); margin-bottom: 16px; border: 1px solid var(--border-color);">
              <label class="form-label" style="font-size: 0.85rem; font-weight: 700;">Showcase Image 1 (Cover Thumbnail) *</label>
              <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 8px;">
                <input type="file" id="proj-file-1" accept="image/*" class="form-input" style="padding: 6px; font-size: 0.8rem; flex: 1;" />
              </div>
              <input type="url" id="proj-thumb-1" class="form-input" value="${img1Src}" placeholder="Or enter image URL 1" required />
              <div style="margin-top: 8px; display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 0.75rem; color: var(--text-muted);">Preview 1:</span>
                <img id="prev-img-1" src="${img1Src}" style="width: 70px; height: 45px; object-fit: cover; border-radius: 4px; border: 1px solid var(--accent-cyan);" />
              </div>
            </div>

            <!-- Image 2 -->
            <div style="padding: 14px; background: rgba(255,255,255,0.03); border-radius: var(--radius-md); margin-bottom: 16px; border: 1px solid var(--border-color);">
              <label class="form-label" style="font-size: 0.85rem; font-weight: 700;">Showcase Image 2 (Detail View 2)</label>
              <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 8px;">
                <input type="file" id="proj-file-2" accept="image/*" class="form-input" style="padding: 6px; font-size: 0.8rem; flex: 1;" />
              </div>
              <input type="url" id="proj-thumb-2" class="form-input" value="${img2Src}" placeholder="Or enter image URL 2" />
              <div style="margin-top: 8px; display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 0.75rem; color: var(--text-muted);">Preview 2:</span>
                <img id="prev-img-2" src="${img2Src}" style="width: 70px; height: 45px; object-fit: cover; border-radius: 4px; border: 1px solid var(--border-color);" />
              </div>
            </div>

            <!-- Image 3 -->
            <div style="padding: 14px; background: rgba(255,255,255,0.03); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <label class="form-label" style="font-size: 0.85rem; font-weight: 700;">Showcase Image 3 (Detail View 3)</label>
              <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 8px;">
                <input type="file" id="proj-file-3" accept="image/*" class="form-input" style="padding: 6px; font-size: 0.8rem; flex: 1;" />
              </div>
              <input type="url" id="proj-thumb-3" class="form-input" value="${img3Src}" placeholder="Or enter image URL 3" />
              <div style="margin-top: 8px; display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 0.75rem; color: var(--text-muted);">Preview 3:</span>
                <img id="prev-img-3" src="${img3Src}" style="width: 70px; height: 45px; object-fit: cover; border-radius: 4px; border: 1px solid var(--border-color);" />
              </div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="form-group">
              <label class="form-label">Client Name</label>
              <input type="text" id="proj-form-client" class="form-input" value="${targetProj ? targetProj.client : 'Private Client'}" />
            </div>
            <div class="form-group">
              <label class="form-label">Tags (comma separated)</label>
              <input type="text" id="proj-form-tags" class="form-input" value="${targetProj ? targetProj.tags.join(', ') : 'Branding, 3D, UI'}" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Description / Case Study Story</label>
            <textarea id="proj-form-desc" class="form-textarea" rows="3">${targetProj ? targetProj.description : ''}</textarea>
          </div>

          <div class="form-group" style="display: flex; align-items: center; gap: 10px;">
            <input type="checkbox" id="proj-form-featured" ${targetProj && targetProj.featured ? 'checked' : ''} style="width: 18px; height: 18px;" />
            <label for="proj-form-featured" style="cursor: pointer; font-weight: 600;">Feature on Home Gallery</label>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px; margin-top: 10px;">
            <span>${isEditing ? 'Save Changes' : 'Create Project'}</span>
            <i class="fa-solid fa-check"></i>
          </button>
        </form>
      </div>
    </div>
  `;
}

export function setupAdminListeners() {
  const loginForm = document.getElementById('admin-login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const u = document.getElementById('admin-username').value;
      const p = document.getElementById('admin-password').value;
      const res = store.loginAdmin(u, p);
      if (!res.success) {
        const errEl = document.getElementById('login-error-msg');
        if (errEl) {
          errEl.innerText = res.error;
          errEl.style.display = 'block';
        }
      } else {
        showToast('🔓 Admin login successful!');
      }
    });
  }

  const closeOverlayBtn = document.getElementById('close-admin-overlay-btn');
  if (closeOverlayBtn) {
    closeOverlayBtn.addEventListener('click', () => {
      window.location.hash = '#home';
    });
  }

  const logoutBtn = document.getElementById('admin-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      store.logoutAdmin();
      showToast('Logged out of admin panel.');
    });
  }

  // Sidebar Tab Switcher
  const tabBtns = document.querySelectorAll('[data-admin-tab]');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeAdminTab = btn.getAttribute('data-admin-tab');
      refreshAdminUI();
    });
  });

  // Projects CRUD Listeners
  const addProjBtn = document.getElementById('add-project-trigger-btn');
  if (addProjBtn) {
    addProjBtn.addEventListener('click', () => {
      editingProjectId = null;
      uploadedImage1 = null;
      uploadedImage2 = null;
      uploadedImage3 = null;
      projectModalOpen = true;
      refreshAdminUI();
    });
  }

  const editProjBtns = document.querySelectorAll('.edit-proj-btn');
  editProjBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      editingProjectId = btn.getAttribute('data-id');
      uploadedImage1 = null;
      uploadedImage2 = null;
      uploadedImage3 = null;
      projectModalOpen = true;
      refreshAdminUI();
    });
  });

  // File Upload Handlers for Image 1, 2, 3
  setupImageFileHandler('proj-file-1', 'proj-thumb-1', 'prev-img-1', (val) => { uploadedImage1 = val; });
  setupImageFileHandler('proj-file-2', 'proj-thumb-2', 'prev-img-2', (val) => { uploadedImage2 = val; });
  setupImageFileHandler('proj-file-3', 'proj-thumb-3', 'prev-img-3', (val) => { uploadedImage3 = val; });

  // Direct URL Handlers
  setupUrlPreviewHandler('proj-thumb-1', 'prev-img-1');
  setupUrlPreviewHandler('proj-thumb-2', 'prev-img-2');
  setupUrlPreviewHandler('proj-thumb-3', 'prev-img-3');

  const deleteProjBtns = document.querySelectorAll('.delete-proj-btn');
  deleteProjBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Are you sure you want to delete this project?')) {
        store.deleteProject(id);
        showToast('Project deleted.');
      }
    });
  });

  // CRUD Form Submit
  const projForm = document.getElementById('project-crud-form');
  if (projForm) {
    projForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('proj-form-title').value;
      const category = document.getElementById('proj-form-category').value;
      const year = document.getElementById('proj-form-year').value;
      const liveUrl = document.getElementById('proj-form-liveurl').value;

      const img1 = document.getElementById('proj-thumb-1').value;
      const img2 = document.getElementById('proj-thumb-2').value;
      const img3 = document.getElementById('proj-thumb-3').value;

      const images = [img1, img2, img3].filter(Boolean);
      const thumbnail = img1 || (images[0] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80');

      const client = document.getElementById('proj-form-client').value;
      const tags = document.getElementById('proj-form-tags').value;
      const description = document.getElementById('proj-form-desc').value;
      const featured = document.getElementById('proj-form-featured').checked;

      if (editingProjectId) {
        store.updateProject(editingProjectId, {
          title, category, year, thumbnail, images, liveUrl, client, tags, description, featured
        });
        showToast('Project updated with 3 showcase images!');
      } else {
        store.addProject({
          title, category, year, thumbnail, images, liveUrl, client, tags, description, featured
        });
        showToast('✨ New project added with 3 showcase images!');
      }

      projectModalOpen = false;
      editingProjectId = null;
      uploadedImage1 = null;
      uploadedImage2 = null;
      uploadedImage3 = null;
      refreshAdminUI();
    });
  }

  const closeProjModalBtn = document.getElementById('close-project-modal-btn');
  if (closeProjModalBtn) {
    closeProjModalBtn.addEventListener('click', () => {
      projectModalOpen = false;
      editingProjectId = null;
      uploadedImage1 = null;
      uploadedImage2 = null;
      uploadedImage3 = null;
      refreshAdminUI();
    });
  }

  // Leads Status Change & Delete
  const statusSelects = document.querySelectorAll('.lead-status-select');
  statusSelects.forEach(select => {
    select.addEventListener('change', (e) => {
      const leadId = select.getAttribute('data-lead-id');
      store.updateLeadStatus(leadId, e.target.value);
      showToast(`Lead status updated to ${e.target.value}`);
    });
  });

  const deleteLeadBtns = document.querySelectorAll('.delete-lead-btn');
  deleteLeadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const leadId = btn.getAttribute('data-id');
      if (confirm('Delete this lead inquiry?')) {
        store.deleteLead(leadId);
        showToast('Lead deleted.');
      }
    });
  });

  // Profile Form Submit
  const profileForm = document.getElementById('admin-profile-form');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const designerName = document.getElementById('prof-name').value;
      const designerTitle = document.getElementById('prof-title').value;
      const avatarUrl = document.getElementById('prof-avatar').value;
      const email = document.getElementById('prof-email').value;
      const phone = document.getElementById('prof-phone').value;
      const whatsapp = document.getElementById('prof-whatsapp').value;
      const instagram = document.getElementById('prof-instagram').value;
      const bio = document.getElementById('prof-bio').value;

      store.updateConfig({
        designerName,
        designerTitle,
        avatarUrl,
        email,
        phone,
        whatsapp,
        instagram,
        instagramUrl: `https://instagram.com/${instagram}`,
        whatsappUrl: `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`,
        bio
      });

      showToast('🎨 Profile & Contact settings updated live across portfolio!');
    });
  }

  const resetBtn = document.getElementById('reset-demo-data-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset to default initial demo projects and leads?')) {
        store.resetData();
        showToast('Data reset to default.');
      }
    });
  }
}

function setupImageFileHandler(fileInputId, urlInputId, previewImgId, setVariable) {
  const fileInput = document.getElementById(fileInputId);
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const val = event.target.result;
          setVariable(val);
          const urlInput = document.getElementById(urlInputId);
          const previewImg = document.getElementById(previewImgId);
          if (urlInput) urlInput.value = val;
          if (previewImg) previewImg.src = val;
          showToast('🖼️ Image loaded into slot!');
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

function setupUrlPreviewHandler(urlInputId, previewImgId) {
  const urlInput = document.getElementById(urlInputId);
  if (urlInput) {
    urlInput.addEventListener('input', (e) => {
      const previewImg = document.getElementById(previewImgId);
      if (previewImg) previewImg.src = e.target.value;
    });
  }
}

function refreshAdminUI() {
  const adminContainer = document.getElementById('app-main-content');
  if (adminContainer) {
    adminContainer.innerHTML = renderAdminDashboard();
    setupAdminListeners();
  }
}

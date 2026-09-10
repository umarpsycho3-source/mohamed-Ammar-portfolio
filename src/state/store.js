import { DEFAULT_CONFIG } from '../config.js';
import { INITIAL_PROJECTS, INITIAL_LEADS } from '../utils/mockData.js';
import { DatabaseService } from '../services/dbService.js';

class StateStore {
  constructor() {
    this.listeners = new Set();
    this.loadState();
    this.syncFromCloud();
  }

  loadState() {
    // Load config
    const savedConfig = localStorage.getItem('gdp_config');
    this.config = savedConfig ? JSON.parse(savedConfig) : { ...DEFAULT_CONFIG };

    // Brand name set to clean Ammar
    this.config.designerName = "Ammar";
    this.config.fullName = "Mohamed Shafi Ammar";

    if (!this.config.avatarUrl || this.config.avatarUrl.includes('unsplash')) {
      this.config.avatarUrl = "/ammar-profile.jpg";
    }
    if (!this.config.cvUrl) {
      this.config.cvUrl = "/Mohamed_Shafi_Ammar_CV.pdf";
    }

    // Load projects
    const savedProjects = localStorage.getItem('gdp_projects');
    this.projects = savedProjects ? JSON.parse(savedProjects) : [...INITIAL_PROJECTS];

    // Load leads
    const savedLeads = localStorage.getItem('gdp_leads');
    this.leads = savedLeads ? JSON.parse(savedLeads) : [...INITIAL_LEADS];

    // Admin Auth State
    this.isAdminLoggedIn = false;

    // Theme state
    this.theme = 'dark';
    document.documentElement.setAttribute('data-theme', 'dark');

    // Active project for lightbox modal
    this.selectedProject = null;

    // Quote modal state
    this.quoteModalOpen = false;
    this.prefilledQuoteData = null;
  }

  async syncFromCloud() {
    try {
      const cloudProjects = await DatabaseService.fetchProjects();
      if (cloudProjects && cloudProjects.length > 0) {
        this.projects = cloudProjects;
        this.saveProjects();
      }

      const cloudLeads = await DatabaseService.fetchLeads();
      if (cloudLeads && cloudLeads.length > 0) {
        this.leads = cloudLeads;
        localStorage.setItem('gdp_leads', JSON.stringify(this.leads));
      }

      const cloudConfig = await DatabaseService.fetchConfig();
      if (cloudConfig) {
        this.config = { ...this.config, ...cloudConfig, designerName: "Ammar" };
        localStorage.setItem('gdp_config', JSON.stringify(this.config));
      }

      this.notify();
    } catch (err) {
      console.warn("Cloud sync notice:", err);
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this);
    }
  }

  // --- Theme Management ---
  setTheme(themeName) {
    this.theme = 'dark';
    document.documentElement.setAttribute('data-theme', 'dark');
    this.notify();
  }

  // --- Admin Auth ---
  loginAdmin(username, password) {
    if (username === 'admin' && password === 'admin123') {
      this.isAdminLoggedIn = true;
      this.notify();
      return { success: true };
    }
    return { success: false, error: 'Invalid admin credentials. Use admin / admin123' };
  }

  logoutAdmin() {
    this.isAdminLoggedIn = false;
    this.notify();
  }

  // --- Config / Profile Settings Management ---
  updateConfig(newConfigData) {
    this.config = { ...this.config, ...newConfigData };
    localStorage.setItem('gdp_config', JSON.stringify(this.config));
    DatabaseService.saveConfig(this.config);
    this.notify();
  }

  // --- Projects CRUD ---
  addProject(projectData) {
    const newProj = {
      id: 'proj-' + Date.now(),
      title: projectData.title,
      category: projectData.category,
      categorySlug: projectData.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      thumbnail: projectData.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      images: projectData.images && projectData.images.length ? projectData.images : [projectData.thumbnail],
      client: projectData.client || 'Private Client',
      year: projectData.year || new Date().getFullYear().toString(),
      tags: typeof projectData.tags === 'string' ? projectData.tags.split(',').map(t => t.trim()) : (projectData.tags || []),
      description: projectData.description || '',
      featured: Boolean(projectData.featured),
      liveUrl: projectData.liveUrl || 'https://behance.net'
    };

    this.projects.unshift(newProj);
    this.saveProjects();
    DatabaseService.saveProject(newProj);
    this.notify();
    return newProj;
  }

  updateProject(id, updatedFields) {
    const index = this.projects.findIndex(p => p.id === id);
    if (index !== -1) {
      if (typeof updatedFields.tags === 'string') {
        updatedFields.tags = updatedFields.tags.split(',').map(t => t.trim());
      }
      this.projects[index] = { ...this.projects[index], ...updatedFields };
      this.saveProjects();
      DatabaseService.saveProject(this.projects[index]);
      this.notify();
    }
  }

  deleteProject(id) {
    this.projects = this.projects.filter(p => p.id !== id);
    this.saveProjects();
    DatabaseService.deleteProject(id);
    this.notify();
  }

  saveProjects() {
    localStorage.setItem('gdp_projects', JSON.stringify(this.projects));
  }

  // --- Leads Management ---
  addLead(leadData) {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newLead = {
      id: 'lead-' + Date.now(),
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone || 'N/A',
      service: leadData.service || 'General Inquiry',
      budget: leadData.budget || 'Unspecified',
      timeline: leadData.timeline || 'Flexible',
      message: leadData.message,
      status: 'New',
      date: formattedDate
    };

    this.leads.unshift(newLead);
    localStorage.setItem('gdp_leads', JSON.stringify(this.leads));
    DatabaseService.saveLead(newLead);
    this.notify();
    return newLead;
  }

  updateLeadStatus(id, status) {
    const lead = this.leads.find(l => l.id === id);
    if (lead) {
      lead.status = status;
      localStorage.setItem('gdp_leads', JSON.stringify(this.leads));
      DatabaseService.saveLead(lead);
      this.notify();
    }
  }

  deleteLead(id) {
    this.leads = this.leads.filter(l => l.id !== id);
    localStorage.setItem('gdp_leads', JSON.stringify(this.leads));
    DatabaseService.deleteLead(id);
    this.notify();
  }

  // --- Lightbox / Modal ---
  setSelectedProject(project) {
    this.selectedProject = project;
    this.notify();
  }

  openQuoteModal(prefillData = null) {
    this.prefilledQuoteData = prefillData;
    this.quoteModalOpen = true;
    this.notify();
  }

  closeQuoteModal() {
    this.quoteModalOpen = false;
    this.prefilledQuoteData = null;
    this.notify();
  }

  // --- Reset Demo Data ---
  resetData() {
    localStorage.removeItem('gdp_config');
    localStorage.removeItem('gdp_projects');
    localStorage.removeItem('gdp_leads');
    this.loadState();
    this.notify();
  }
}

export const store = new StateStore();

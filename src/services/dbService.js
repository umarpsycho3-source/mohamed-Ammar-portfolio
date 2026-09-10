import { db } from './firebaseConfig.js';
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc, 
  getDoc 
} from 'firebase/firestore';

export class DatabaseService {
  // Sync Projects
  static async fetchProjects() {
    if (!db) return null;
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projects = [];
      querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() });
      });
      return projects.length > 0 ? projects : null;
    } catch (err) {
      console.warn("Firestore fetch projects warning:", err);
      return null;
    }
  }

  static async saveProject(project) {
    if (!db) return;
    try {
      await setDoc(doc(db, 'projects', project.id), project);
    } catch (err) {
      console.warn("Firestore save project error:", err);
    }
  }

  static async deleteProject(projectId) {
    if (!db) return;
    try {
      await deleteDoc(doc(db, 'projects', projectId));
    } catch (err) {
      console.warn("Firestore delete project error:", err);
    }
  }

  // Sync Leads
  static async fetchLeads() {
    if (!db) return null;
    try {
      const querySnapshot = await getDocs(collection(db, 'leads'));
      const leads = [];
      querySnapshot.forEach((doc) => {
        leads.push({ id: doc.id, ...doc.data() });
      });
      return leads.length > 0 ? leads : null;
    } catch (err) {
      console.warn("Firestore fetch leads warning:", err);
      return null;
    }
  }

  static async saveLead(lead) {
    if (!db) return;
    try {
      await setDoc(doc(db, 'leads', lead.id), lead);
    } catch (err) {
      console.warn("Firestore save lead error:", err);
    }
  }

  static async deleteLead(leadId) {
    if (!db) return;
    try {
      await deleteDoc(doc(db, 'leads', leadId));
    } catch (err) {
      console.warn("Firestore delete lead error:", err);
    }
  }

  // Sync Config
  static async fetchConfig() {
    if (!db) return null;
    try {
      const docRef = doc(db, 'settings', 'config');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
    } catch (err) {
      console.warn("Firestore fetch config warning:", err);
    }
    return null;
  }

  static async saveConfig(configData) {
    if (!db) return;
    try {
      await setDoc(doc(db, 'settings', 'config'), configData);
    } catch (err) {
      console.warn("Firestore save config error:", err);
    }
  }
}

// Authentication helper functions
class Auth {
  constructor() {
    this.userSession = JSON.parse(localStorage.getItem('userSession')) || null;
    this.setupEventListeners();
  }

  isLoggedIn() {
    return this.userSession && this.userSession.isLoggedIn;
  }

  getCurrentUser() {
    return this.userSession;
  }

  logout() {
    // Update last login before logging out
    if (this.userSession) {
      this.userSession.lastLogin = new Date().getTime();
      localStorage.setItem('userSession', JSON.stringify(this.userSession));
    }
    
    localStorage.removeItem('userSession');
    this.userSession = null;
    window.location.href = 'login.html';
  }

  checkAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = 'login.html';
    }
  }

  setupEventListeners() {
    // Listen for settings modal open
    const settingsBtn = document.getElementById('settingsBtn');
    const accountTab = document.querySelector('.settings-tab[data-tab="account"]');
    
    if (settingsBtn && accountTab) {
      settingsBtn.addEventListener('click', () => {
        if (this.isLoggedIn()) {
          // Switch to account tab if user is signed in
          setTimeout(() => {
            accountTab.click();
          }, 100);
        }
      });
    }
  }

  updateUserProfile(updates) {
    if (!this.userSession) return;
    this.userSession = { ...this.userSession, ...updates };
    localStorage.setItem('userSession', JSON.stringify(this.userSession));
  }
}

// Initialize auth on page load
window.addEventListener('DOMContentLoaded', () => {
  window.auth = new Auth();
  
  if (!window.location.pathname.includes('login.html') && 
      !window.location.pathname.includes('signup.html')) {
    auth.checkAuth();
  }
});

// Export Auth class
window.Auth = Auth;
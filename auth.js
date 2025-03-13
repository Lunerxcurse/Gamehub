// Authentication helper functions
class Auth {
  constructor() {
    this.userSession = JSON.parse(localStorage.getItem('userSession')) || null;
    this.setupEventListeners();
    this.initializeGuestSession();
  }

  isLoggedIn() {
    return this.userSession && (this.userSession.isLoggedIn || this.userSession.isGuest);
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
      // Create guest session instead of redirecting
      this.createGuestSession();
    }
  }

  createGuestSession() {
    this.userSession = {
      isGuest: true,
      username: 'Guest',
      email: 'guest@example.com',
      isLoggedIn: false,
      timestamp: new Date().getTime()
    };
    localStorage.setItem('userSession', JSON.stringify(this.userSession));
  }

  initializeGuestSession() {
    // Don't automatically create guest session if no session exists
    // Only create guest sessions when explicitly requested from login page
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
  
  // Add method to check if achievements and stats need to be initialized
  initializeUserData() {
    if (window.achievements) {
      // Update achievements completed stats
      const achievementsProgress = window.achievements.getProgress();
      const achievementsCompletedStat = document.getElementById('achievementsCompletedStat');
      if (achievementsCompletedStat) {
        achievementsCompletedStat.textContent = `${achievementsProgress.percentage}%`;
      }
      
      // Update all stats
      window.achievements.updateStatsUI();
      window.achievements.updateAchievementUI();
    }
  }
}

// Initialize auth on page load
window.addEventListener('DOMContentLoaded', () => {
  window.auth = new Auth();
  
  if (!window.location.pathname.includes('login.html') && 
      !window.location.pathname.includes('signup.html')) {
    auth.checkAuth();
    
    // Initialize user data after short delay
    setTimeout(() => {
      auth.initializeUserData();
    }, 500);
  }
});

// Export Auth class
window.Auth = Auth;
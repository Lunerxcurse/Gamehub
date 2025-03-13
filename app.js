// Initialize WebProxy after DOM is loaded
class WebProxy {
  constructor() {
    this.proxyUrls = [
      'https://corsproxy.io/?',
      'https://api.allorigins.win/raw?url='
    ];
  }
  
  setup() {
    console.log('WebProxy initialized');
    // This proxy would handle requests but isn't fully implemented in this demo
  }
  
  getProxiedUrl(url) {
    const proxyUrl = this.proxyUrls[0];
    return proxyUrl + encodeURIComponent(url);
  }
}

const webProxy = new WebProxy();
webProxy.setup();

// Notification system
window.showNotification = function(message, type = 'info') {
  // Remove any existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  
  let icon = 'ph-info';
  if (type === 'success') icon = 'ph-check-circle';
  if (type === 'error') icon = 'ph-x-circle';
  
  notification.innerHTML = `
    <i class="ph ${icon}"></i>
    <p>${message}</p>
  `;
  
  document.body.appendChild(notification);
  
  // Show notification with animation
  setTimeout(() => notification.classList.add('show'), 10);
  
  // Auto hide after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
};

function fixMobileLayout() {
  if (window.innerWidth <= 768) {
    // Adjust content heights
    const modalContents = document.querySelectorAll('.modal-content');
    modalContents.forEach(content => {
      const viewportHeight = window.innerHeight;
      content.style.maxHeight = `${viewportHeight}px`;
    });
    
    // Show mobile navigation bar
    const mobileNavBar = document.querySelector('.mobile-nav-bar');
    if (mobileNavBar) {
      mobileNavBar.style.display = 'flex';
    }
    
    // Improve scrolling in settings tabs
    document.querySelectorAll('.settings-tab-content').forEach(elem => {
      elem.style.maxHeight = `${window.innerHeight - 150}px`;
      elem.style.overflowY = 'auto';
      elem.style.webkitOverflowScrolling = 'touch';
    });
    
    // Improve scrolling in other modal content
    document.querySelectorAll('.favorites-body, .game-info-body').forEach(elem => {
      elem.style.overflowY = 'auto';
      elem.style.webkitOverflowScrolling = 'touch';
    });
  }
}

// Display games function
function displayGames(category = 'all', searchQuery = '', sortBy = 'popular', loadMore = false) {
  const gamesGrid = document.getElementById('gamesGrid');
  const gameTotalCounter = document.getElementById('gameTotalCounter');
  
  if (!gamesGrid || !window.games) return;
  
  // Filter games by category if specified
  let filteredGames = window.games;
  
  if (category && category !== 'all') {
    filteredGames = filteredGames.filter(game => game.category === category);
  }
  
  // Filter by search query if provided
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredGames = filteredGames.filter(game => 
      game.title.toLowerCase().includes(query) ||
      game.description.toLowerCase().includes(query) ||
      game.category.toLowerCase().includes(query)
    );
  }
  
  // Sort games based on sort option
  switch (sortBy) {
    case 'newest':
      filteredGames.sort(() => 0.5 - Math.random()); // Random for demo
      break;
    case 'rating':
      filteredGames.sort(() => 0.5 - Math.random()); // Random for demo
      break;
    case 'name':
      filteredGames.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default: // popular
      // Ensure featured games come first, then random order
      filteredGames.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0.5 - Math.random();
      });
  }
  
  // Update games counter
  if (gameTotalCounter) {
    gameTotalCounter.textContent = `${filteredGames.length} games found`;
  }
  
  // Show max 24 games at once for performance, or more if loadMore is true
  const currentCount = loadMore ? gamesGrid.querySelectorAll('.game-card').length : 0;
  const gamesToShow = filteredGames.slice(currentCount, currentCount + 24);
  
  // Only replace HTML if not loading more
  if (!loadMore) {
    gamesGrid.innerHTML = '';
  }
  
  // Create game cards
  gamesToShow.forEach(game => {
    const gameCard = document.createElement('div');
    gameCard.className = 'game-card';
    gameCard.dataset.gameId = game.id;
    
    // Generate a random rating for demo purposes
    const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
    
    gameCard.innerHTML = `
      <div class="game-thumbnail">
        <i class="ph ${game.icon || 'ph-game-controller'}"></i>
      </div>
      ${game.featured ? '<div class="game-badge">Featured</div>' : ''}
      <div class="game-info">
        <button class="game-info-btn" aria-label="Game info">
          <i class="ph ph-info"></i>
        </button>
        <h3>${game.title}</h3>
        <p>${game.description}</p>
        <div class="game-meta">
          <span class="game-category">${game.category}</span>
          <div class="game-rating">
            <i class="ph ph-star-fill"></i>
            <span>${rating}</span>
          </div>
        </div>
      </div>
    `;
    
    gamesGrid.appendChild(gameCard);
  });
  
  // Show/hide load more button based on if there are more games
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = currentCount + gamesToShow.length < filteredGames.length ? 'flex' : 'none';
  }
}

class RecentGamesManager {
  constructor() {
    this.maxRecentGames = 10;
  }
  
  addRecentGame(game) {
    // Check if game history saving is enabled
    const saveHistory = localStorage.getItem('saveHistory') !== 'false';
    const incognitoMode = localStorage.getItem('incognitoMode') === 'true';
    
    if (!saveHistory || incognitoMode) return;
    
    // Get existing recent games
    let recentGames = this.getRecentGames();
    
    // Remove duplicate if game already exists
    recentGames = recentGames.filter(g => g.id !== game.id);
    
    // Add new game to the start of the array
    recentGames.unshift(game);
    
    // Limit to max recent games
    recentGames = recentGames.slice(0, this.maxRecentGames);
    
    // Save to localStorage
    localStorage.setItem('recentGames', JSON.stringify(recentGames));
    
    // Update display
    this.updateRecentGamesDisplay();
  }
  
  getRecentGames() {
    const saved = localStorage.getItem('recentGames');
    return saved ? JSON.parse(saved) : [];
  }
  
  updateRecentGamesDisplay() {
    const jumpBackGrid = document.getElementById('jumpBackGrid');
    const emptyState = `
      <div class="jump-back-empty">
        <i class="ph ph-hourglass"></i>
        <h3>No Recently Played Games</h3>
        <p>Games you play will appear here for quick access</p>
      </div>
    `;
    
    if (!jumpBackGrid) return;
    
    const recentGames = this.getRecentGames();
    
    if (recentGames.length === 0) {
      jumpBackGrid.innerHTML = emptyState;
      return;
    }
    
    // Generate jump back cards
    const recentGamesHtml = recentGames.map(game => `
      <div class="jump-back-card" data-game='${JSON.stringify(game)}'>
        <div class="game-thumbnail">
          <i class="ph ${game.icon || 'ph-game-controller'}"></i>
        </div>
        <div class="jump-back-card-content">
          <h3>${game.title}</h3>
          <p>${game.description}</p>
        </div>
      </div>
    `).join('');
    
    jumpBackGrid.innerHTML = recentGamesHtml;
    
    // Add click event listeners for recent games
    jumpBackGrid.querySelectorAll('.jump-back-card').forEach(card => {
      card.addEventListener('click', () => {
        try {
          const gameData = JSON.parse(card.getAttribute('data-game'));
          openGame(gameData);
        } catch (err) {
          console.error('Error opening recent game:', err);
        }
      });
    });
    
    // Update mobile sidebar recent games
    const mobileSidebarRecentGames = document.getElementById('mobileSidebarRecentGames');
    if (mobileSidebarRecentGames) {
      const mobileRecentGamesHtml = recentGames.slice(0, 5).map(game => `
        <div class="recent-game-item" data-game='${JSON.stringify(game)}'>
          <i class="ph ${game.icon || 'ph-game-controller'}"></i>
          <div>
            <h4>${game.title}</h4>
            <p>${game.category}</p>
          </div>
        </div>
      `).join('');
      
      mobileSidebarRecentGames.innerHTML = mobileRecentGamesHtml;
      
      // Add click event listeners for mobile recent games
      mobileSidebarRecentGames.querySelectorAll('.recent-game-item').forEach(item => {
        item.addEventListener('click', () => {
          try {
            const gameData = JSON.parse(item.getAttribute('data-game'));
            openGame(gameData);
            
            // Close mobile sidebar
            const sidebar = document.querySelector('.mobile-sidebar');
            const overlay = document.querySelector('.mobile-sidebar-overlay');
            
            if (sidebar) sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
          } catch (err) {
            console.error('Error opening mobile recent game:', err);
          }
        });
      });
    }
  }
}

// Add function to open games
function openGame(game) {
  if (!game || !game.url) return;
  
  const gameModal = document.getElementById('gameModal');
  const modalTitle = document.getElementById('modalTitle');
  const gameFrame = document.getElementById('gameFrame');
  
  if (gameModal && modalTitle && gameFrame) {
    modalTitle.innerHTML = `<i class="ph ${game.icon || 'ph-game-controller'}"></i> ${game.title}`;
    gameFrame.src = game.url;
    gameModal.style.display = 'flex';
    
    // Add enhanced loading indicator
    const modalBody = document.querySelector('.modal-body');
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'game-loading-indicator';
    loadingIndicator.innerHTML = `
      <div class="loading-animation">
        <div class="loading-spinner"></div>
      </div>
      <div class="loading-text">
        <h3>Loading ${game.title}...</h3>
        <p>Get ready to play!</p>
      </div>
    `;
    modalBody.appendChild(loadingIndicator);
    
    // Remove loading indicator when game loads
    gameFrame.onload = () => {
      const indicator = document.querySelector('.game-loading-indicator');
      if (indicator) {
        indicator.classList.add('fade-out');
        setTimeout(() => indicator.remove(), 500);
      }
    };
    
    // Add to recent games
    const recentGamesManager = new RecentGamesManager();
    recentGamesManager.addRecentGame(game);
    
    // Dispatch game opened event for achievements
    document.dispatchEvent(new CustomEvent('gameOpened', { 
      detail: { game }
    }));
  }
}

// Update account settings display
function updateAccountSettingsDisplay() {
  const userSession = JSON.parse(localStorage.getItem('userSession')) || {};
  const isGuest = userSession.isGuest || false;
  const provider = userSession.provider || null;
  
  // Add null checks before accessing elements
  const accountUsername = document.getElementById('accountUsername');
  const accountEmail = document.getElementById('accountEmail');
  const emailInput = document.getElementById('emailInput');
  const displayNameInput = document.getElementById('displayNameInput');
  const accountAvatarIcon = document.getElementById('accountAvatarIcon');
  const favoritesCount = document.getElementById('favoritesCount');
  const memberSince = document.getElementById('memberSince');
  const lastLogin = document.getElementById('lastLogin');
  const guestMessage = document.getElementById('guestAccountMessage');
  const providerBadge = document.getElementById('providerBadge');

  if (accountUsername) accountUsername.textContent = userSession.username || userSession.email?.split('@')[0] || 'User';
  if (accountEmail) accountEmail.textContent = userSession.email || '';
  if (emailInput) emailInput.value = userSession.email || '';
  if (displayNameInput) displayNameInput.value = userSession.displayName || userSession.username || '';
  
  // Display provider badge if exists
  if (providerBadge && provider) {
    providerBadge.textContent = provider === 'google' ? 'Google' : 'Discord';
    providerBadge.className = `provider-badge ${provider}`;
    providerBadge.style.display = 'inline-flex';
  } else if (providerBadge) {
    providerBadge.style.display = 'none';
  }
  
  // Update avatar icon or use custom avatar if provided
  if (accountAvatarIcon) {
    if (userSession.avatar) {
      accountAvatarIcon.innerHTML = `<img src="${userSession.avatar}" alt="User Avatar">`;
    } else {
      accountAvatarIcon.innerHTML = '<i class="ph ph-user"></i>';
      accountAvatarIcon.className = userSession.avatarIcon || 'ph ph-user';
    }
  }

  // Show guest message if user is a guest
  if (guestMessage) {
    guestMessage.style.display = isGuest ? 'block' : 'none';
  }
  
  // Get favorites count
  const favorites = JSON.parse(localStorage.getItem('favoriteGames') || '[]');
  if (favoritesCount) favoritesCount.textContent = favorites.length || '0';

  // Format dates with null checks
  if (memberSince && userSession.timestamp) {
    const date = new Date(userSession.timestamp);
    memberSince.textContent = date.toLocaleDateString();
  }

  if (lastLogin && userSession.lastLogin) {
    const date = new Date(userSession.lastLogin);
    lastLogin.textContent = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (lastLogin && userSession.timestamp) {
    const date = new Date(userSession.timestamp);
    lastLogin.textContent = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

// Add account action buttons functionality
function setupAccountActionButtons() {
  const updateProfileBtn = document.getElementById('updateProfileBtn');
  const displayNameInput = document.getElementById('displayNameInput');
  const accountUsername = document.getElementById('accountUsername');
  const createAccountBtn = document.getElementById('createAccountBtn');
  const userSession = JSON.parse(localStorage.getItem('userSession') || '{}');
  const isGuest = userSession.isGuest || false;

  // Show/hide buttons based on guest status
  if (updateProfileBtn) {
    updateProfileBtn.style.display = isGuest ? 'none' : 'block';
  }
  
  if (createAccountBtn) {
    createAccountBtn.style.display = isGuest ? 'block' : 'none';
    createAccountBtn.addEventListener('click', () => {
      window.location.href = 'signup.html';
    });
  }

  if (updateProfileBtn && displayNameInput && accountUsername) {
    updateProfileBtn.addEventListener('click', () => {
      const displayName = displayNameInput.value;
      const userSession = JSON.parse(localStorage.getItem('userSession') || '{}');
      userSession.displayName = displayName;
      localStorage.setItem('userSession', JSON.stringify(userSession));
      accountUsername.textContent = displayName || userSession.username || userSession.email?.split('@')[0] || 'User';
      showNotification('Profile updated successfully!', 'success');
    });
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to sign out?')) {
        const userSession = JSON.parse(localStorage.getItem('userSession') || '{}');
        userSession.lastLogin = new Date().getTime();
        localStorage.setItem('userSession', JSON.stringify(userSession));
        
        if (window.auth && typeof window.auth.logout === 'function') {
          window.auth.logout();
        } else {
          localStorage.removeItem('userSession');
          window.location.href = 'login.html';
        }
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const settingsModal = document.getElementById('settingsModal'); 
  const settingsBtn = document.getElementById('settingsBtn');

  if (settingsBtn && settingsModal) {
    settingsBtn.addEventListener('click', () => {
      updateAccountSettingsDisplay();
    });
  }

  setupAccountActionButtons();

  const privacyPolicyLink = document.getElementById('privacyPolicyLink');
  if (privacyPolicyLink) {
    privacyPolicyLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'privacy-policy.html';
    });
  }
  
  const contactLink = document.getElementById('contactLink');
  if (contactLink) {
    contactLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'contact.html';
    });
  }
  
  fixMobileLayout();
});
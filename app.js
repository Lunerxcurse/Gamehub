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

//! Fix mobile layout issues immediately

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
    
    // Add loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.innerHTML = '<i class="ph ph-spinner ph-spin"></i><span>Loading game...</span>';
    document.querySelector('.modal-body').appendChild(loadingIndicator);
    
    // Remove loading indicator when game loads
    gameFrame.onload = () => {
      const indicator = document.querySelector('.loading-indicator');
      if (indicator) indicator.remove();
    };
    
    // Add to recent games
    const recentGamesManager = new RecentGamesManager();
    recentGamesManager.addRecentGame(game);
  }
}

document.addEventListener('DOMContentLoaded', () => {
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
});
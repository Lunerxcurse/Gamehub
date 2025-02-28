function openGame(game) {
  if (game && game.url) {
    // Track recent game
    const recentGamesManager = new RecentGamesManager();
    recentGamesManager.addRecentGame(game);
    
    window.open(game.url, '_blank');
    showNotification(`Launching ${game.title}...`, 'info');
  } else {
    console.warn('Invalid game or URL:', game);
    showNotification('Unable to launch game. Please try again.', 'error');
  }
}

function showNotification(message, type = 'info') {
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
}

function createGameCard(game) {
  const card = document.createElement('div');
  card.className = 'game-card';
  card.setAttribute('data-game-id', game.id);
  
  // Add badge for featured games
  if (game.featured) {
    card.innerHTML += `<div class="game-badge">Featured</div>`;
  }
  
  // Generate random star rating between 3.5 and 5.0
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
  
  card.innerHTML += `
    <div class="game-thumbnail">
      <i class="ph ${game.icon}"></i>
    </div>
    <div class="game-info">
      <h3>${game.title}</h3>
      <p>${game.description}</p>
      <div class="game-meta">
        <div class="game-category">${game.category}</div>
        <div class="game-rating">
          <i class="ph ph-star-fill"></i>
          <span>${rating}</span>
        </div>
      </div>
    </div>
  `;
  
  card.addEventListener('click', () => {
    openGame(game);
  });
  
  return card;
}

function showLoading() {
  const gamesGrid = document.getElementById('gamesGrid');
  if (!gamesGrid) return;
  
  gamesGrid.innerHTML = Array(12).fill(0).map(() => `
    <div class="game-card loading">
      <div class="game-thumbnail loading" style="height: 120px;"></div>
      <div class="game-info">
        <div class="loading" style="height: 20px; width: 80%; margin-bottom: 10px;"></div>
        <div class="loading" style="height: 15px; width: 60%; margin-bottom: 20px;"></div>
        <div class="loading" style="height: 15px; width: 100%;"></div>
      </div>
    </div>
  `).join('');
}

function displayGames(category = 'all', searchTerm = '') {
  showLoading();
  
  setTimeout(() => {
    const gamesGrid = document.getElementById('gamesGrid');
    
    if (!gamesGrid) {
      console.error('Games grid element not found');
      return;
    }
    
    if (!window.games || !Array.isArray(window.games)) {
      showNotification('Error loading games data', 'error');
      return;
    }
    
    const filteredGames = window.games.filter(game => {
      const matchesCategory = category === 'all' || game.category === category;
      const matchesSearch = searchTerm === '' || 
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    
    gamesGrid.innerHTML = '';
    
    if (filteredGames.length === 0) {
      gamesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
          <i class="ph ph-magnifying-glass" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
          <p>No games found. Try a different search term or category.</p>
        </div>
      `;
      return;
    }
    
    filteredGames.forEach(game => {
      const card = createGameCard(game);
      gamesGrid.appendChild(card);
    });
  }, 600);
}

class RecentGamesManager {
  constructor() {
    this.MAX_RECENT_GAMES = 6;
    this.STORAGE_KEY = 'recentGames';
  }

  addRecentGame(game) {
    if (!game || !game.id) return;

    let recentGames = this.getRecentGames();
    
    // Remove duplicate if exists
    recentGames = recentGames.filter(g => g.id !== game.id);
    
    // Add to the beginning of the array
    recentGames.unshift(game);
    
    // Trim to max number of recent games
    recentGames = recentGames.slice(0, this.MAX_RECENT_GAMES);
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(recentGames));
    this.updateRecentGamesDisplay();
  }

  getRecentGames() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  updateRecentGamesDisplay() {
    const jumpBackGrid = document.getElementById('jumpBackGrid');
    const mobileSidebarRecentGames = document.getElementById('mobileSidebarRecentGames');
    
    if (!jumpBackGrid) return;

    const recentGames = this.getRecentGames();
    jumpBackGrid.innerHTML = '';

    if (recentGames.length === 0) {
      jumpBackGrid.innerHTML = `
        <div class="jump-back-empty">
          <i class="ph ph-smiley-meh"></i>
          <p>No recently played games</p>
          <p style="font-size: 0.9rem; margin-top: 0.5rem;">Games you play will appear here</p>
        </div>
      `;
    } else {
      recentGames.forEach(game => {
        const card = document.createElement('div');
        card.className = 'jump-back-card';
        card.innerHTML = `
          <div class="jump-back-card-content">
            <h3>${game.title}</h3>
            <p>${game.description}</p>
          </div>
        `;
        card.addEventListener('click', () => openGame(game));
        jumpBackGrid.appendChild(card);
      });
    }

    // Update mobile sidebar recent games
    if (mobileSidebarRecentGames) {
      mobileSidebarRecentGames.innerHTML = '';
      
      if (recentGames.length === 0) {
        mobileSidebarRecentGames.innerHTML = `
          <div class="recent-game-item">
            <i class="ph ph-info"></i>
            <span>No recent games</span>
          </div>
        `;
      } else {
        recentGames.forEach(game => {
          const item = document.createElement('div');
          item.className = 'recent-game-item';
          item.setAttribute('data-game', JSON.stringify(game));
          item.innerHTML = `
            <i class="ph ${game.icon}"></i>
            <span>${game.title}</span>
          `;
          item.addEventListener('click', () => {
            openGame(game);
          });
          mobileSidebarRecentGames.appendChild(item);
        });
      }
    }
  }
}

class SearchSystem {
  constructor() {
    this.searchInput = document.getElementById('searchInput');
    this.searchSuggestions = document.getElementById('searchSuggestions');
    
    if (this.searchInput && this.searchSuggestions) {
      this.initializeSearch();
    }
  }

  initializeSearch() {
    this.searchInput.addEventListener('input', () => {
      const query = this.searchInput.value.toLowerCase().trim();
      
      if (!query) {
        this.searchSuggestions.classList.remove('active');
        return;
      }

      const suggestions = this.getSuggestions(query);
      this.displaySuggestions(suggestions);
    });

    document.addEventListener('click', (e) => {
      if (!this.searchInput.contains(e.target) && !this.searchSuggestions.contains(e.target)) {
        this.searchSuggestions.classList.remove('active');
      }
    });
  }

  getSuggestions(query) {
    if (!window.games || !Array.isArray(window.games)) {
      return [];
    }
    
    return window.games
      .filter(game => {
        if (!game) return false;
        
        const matchesTitle = game.title.toLowerCase().includes(query);
        const matchesDescription = game.description.toLowerCase().includes(query);
        const matchesCategory = game.category.toLowerCase().includes(query);
        
        return matchesTitle || matchesDescription || matchesCategory;
      })
      .slice(0, 5);
  }

  displaySuggestions(suggestions) {
    if (!suggestions.length) {
      this.searchSuggestions.classList.remove('active');
      return;
    }

    this.searchSuggestions.innerHTML = suggestions
      .map(game => `
        <div class="suggestion-item" data-game='${JSON.stringify(game)}'>
          <i class="ph ${game.icon}"></i>
          <span class="game-title">${game.title}</span>
          <span class="game-category">${game.category}</span>
        </div>
      `)
      .join('');

    this.searchSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
      item.addEventListener('click', () => {
        try {
          const gameData = JSON.parse(item.dataset.game);
          openGame(gameData);
          this.searchSuggestions.classList.remove('active');
          this.searchInput.value = '';
        } catch (err) {
          console.error('Error handling suggestion click:', err);
        }
      });
    });

    this.searchSuggestions.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize modules
  new SearchSystem();
  
  const recentGamesManager = new RecentGamesManager();
  recentGamesManager.updateRecentGamesDisplay();
  
  // Set up event listeners for category filters
  const filterChips = document.querySelectorAll('.filter-chip');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      // Remove active class from all chips
      filterChips.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked chip
      chip.classList.add('active');
      
      // Get selected category and update game grid
      const category = chip.getAttribute('data-category');
      displayGames(category);
    });
  });
  
  // Initialize the game grid with all games
  displayGames();
  
  // Fullscreen button functionality
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      const gameFrame = document.getElementById('gameFrame');
      if (gameFrame) {
        if (gameFrame.requestFullscreen) {
          gameFrame.requestFullscreen();
        } else if (gameFrame.webkitRequestFullscreen) {
          gameFrame.webkitRequestFullscreen();
        } else if (gameFrame.msRequestFullscreen) {
          gameFrame.msRequestFullscreen();
        }
      }
    });
  }
  
  // Close modal button
  const closeModalBtn = document.getElementById('closeModalBtn');
  const gameModal = document.getElementById('gameModal');
  if (closeModalBtn && gameModal) {
    closeModalBtn.addEventListener('click', () => {
      gameModal.style.display = 'none';
      document.getElementById('gameFrame').src = '';
    });
  }
});
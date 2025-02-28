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

class WebProxy {
  constructor() {
    this.proxyUrl = '';
    this.isActive = false;
    this.proxyProviders = [
      {
        name: 'AllOrigins',
        urlTemplate: 'https://api.allorigins.win/raw?url=',
        corsAnywhere: false
      },
      {
        name: 'CORS Anywhere',
        urlTemplate: 'https://cors-anywhere.herokuapp.com/',
        corsAnywhere: true
      },
      {
        name: 'CORS.sh',
        urlTemplate: 'https://cors.sh/',
        corsAnywhere: true,
        headers: { 'x-cors-api-key': 'temporary-demo-key' }
      }
    ];
    this.activeProvider = 0;
    this.history = [];
    this.bookmarks = [];
  }

  setup() {
    // Create proxy UI
    this.createProxyUI();
    
    // Load saved state
    this.loadState();
  }

  createProxyUI() {
    // Add proxy tab to settings
    const settingsTabs = document.querySelector('.settings-tabs');
    if (settingsTabs) {
      const proxyTab = document.createElement('div');
      proxyTab.className = 'settings-tab';
      proxyTab.dataset.tab = 'proxy';
      proxyTab.innerHTML = '<i class="ph ph-globe-simple"></i> Web Proxy';
      
      settingsTabs.appendChild(proxyTab);
      
      proxyTab.addEventListener('click', () => {
        document.querySelectorAll('.settings-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.settings-tab-content').forEach(content => content.classList.remove('active'));
        
        proxyTab.classList.add('active');
        document.querySelector('[data-tab-content="proxy"]').classList.add('active');
      });
    }
    
    // Create proxy settings content
    const settingsPanelContent = document.querySelector('.settings-panel');
    if (settingsPanelContent) {
      const proxyContent = document.createElement('div');
      proxyContent.className = 'settings-tab-content';
      proxyContent.dataset.tabContent = 'proxy';
      
      proxyContent.innerHTML = `
        <div class="settings-grid">
          <div class="settings-section">
            <h3><i class="ph ph-globe-simple"></i> Web Proxy</h3>
            <div class="setting-item">
              <p style="margin-bottom: 1rem;">
                Use our client-side web proxy to browse websites. This proxy works by loading content through a CORS proxy.
              </p>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <label style="margin-bottom: 0;">Enable Proxy</label>
                <label class="toggle-switch">
                  <input type="checkbox" id="enableProxy">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
            <div class="setting-item">
              <label>Proxy Provider</label>
              <select id="proxyProvider">
                ${this.proxyProviders.map((provider, index) => `
                  <option value="${index}">${provider.name}</option>
                `).join('')}
              </select>
            </div>
            <div class="setting-item">
              <label>Enter URL to visit</label>
              <div style="display: flex; gap: 0.5rem;">
                <input type="url" id="proxyUrl" placeholder="https://example.com" style="flex: 1;">
                <button id="proxyGo" class="play-now-btn" style="width: auto; padding: 0 1rem;">Go</button>
              </div>
            </div>
          </div>
          
          <div class="settings-section">
            <h3><i class="ph ph-bookmark-simple"></i> Bookmarks</h3>
            <div class="setting-item" style="max-height: 150px; overflow-y: auto;" id="proxyBookmarks">
              <p class="text-center" style="color: var(--text-secondary); padding: 1rem 0;">No bookmarks yet</p>
            </div>
            <div class="setting-item">
              <h3><i class="ph ph-clock-clockwise"></i> History</h3>
              <div style="max-height: 150px; overflow-y: auto;" id="proxyHistory">
                <p class="text-center" style="color: var(--text-secondary); padding: 1rem 0;">No history yet</p>
              </div>
            </div>
          </div>
        </div>
      `;
      
      settingsPanelContent.appendChild(proxyContent);
      
      // Add event listeners
      this.initProxyControls();
    }
  }
  
  initProxyControls() {
    const enableProxyToggle = document.getElementById('enableProxy');
    const proxyUrlInput = document.getElementById('proxyUrl');
    const proxyGoBtn = document.getElementById('proxyGo');
    const proxyProviderSelect = document.getElementById('proxyProvider');
    
    if (enableProxyToggle) {
      enableProxyToggle.checked = this.isActive;
      enableProxyToggle.addEventListener('change', () => {
        this.isActive = enableProxyToggle.checked;
        this.saveState();
        
        if (this.isActive) {
          showNotification('Web proxy enabled', 'success');
        } else {
          showNotification('Web proxy disabled', 'info');
        }
      });
    }
    
    if (proxyProviderSelect) {
      proxyProviderSelect.value = this.activeProvider;
      proxyProviderSelect.addEventListener('change', () => {
        this.activeProvider = parseInt(proxyProviderSelect.value);
        this.saveState();
        showNotification(`Proxy provider changed to ${this.proxyProviders[this.activeProvider].name}`, 'info');
      });
    }
    
    if (proxyGoBtn && proxyUrlInput) {
      proxyGoBtn.addEventListener('click', () => {
        const url = proxyUrlInput.value.trim();
        if (!url) {
          showNotification('Please enter a valid URL', 'error');
          return;
        }
        
        if (!this.isActive) {
          showNotification('Please enable the proxy first', 'error');
          return;
        }
        
        this.openProxyUrl(url);
      });
      
      // Allow enter key to submit
      proxyUrlInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && proxyUrlInput.value.trim()) {
          proxyGoBtn.click();
        }
      });
    }
    
    // Update bookmarks and history displays
    this.updateBookmarksUI();
    this.updateHistoryUI();
  }
  
  openProxyUrl(url) {
    // Make sure URL has protocol
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }
    
    // Create a proxy modal to display the proxied content
    this.createProxyModal(url);
    
    // Save to history
    this.saveProxyHistory(url);
  }
  
  createProxyModal(url) {
    // Remove any existing proxy modal
    const existingModal = document.getElementById('proxyModal');
    if (existingModal) {
      existingModal.remove();
    }
    
    // Create a modal to display the proxied content
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'proxyModal';
    modal.style.display = 'flex';
    
    // Get current provider
    const provider = this.proxyProviders[this.activeProvider];
    
    // Create the proxied URL
    let proxyUrl;
    if (provider.corsAnywhere) {
      proxyUrl = `${provider.urlTemplate}${url}`;
    } else {
      proxyUrl = `${provider.urlTemplate}${encodeURIComponent(url)}`;
    }
    
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2><i class="ph ph-globe-simple"></i> Web Proxy</h2>
          <div class="modal-controls">
            <button class="fullscreen-btn" id="proxyFullscreenBtn">
              <i class="ph ph-arrows-out"></i>
            </button>
            <button class="close-btn" id="proxyCloseBtn">
              <i class="ph ph-x"></i>
            </button>
          </div>
        </div>
        <div class="proxy-browser">
          <div class="proxy-toolbar">
            <div class="proxy-url-bar">
              <i class="ph ph-globe"></i>
              <input type="text" class="proxy-url-input" value="${url}" id="proxyUrlBar">
            </div>
            <div class="proxy-actions">
              <button class="proxy-action-btn" id="proxyReloadBtn" title="Reload">
                <i class="ph ph-arrow-clockwise"></i>
              </button>
              <button class="proxy-action-btn" id="proxyBookmarkBtn" title="Bookmark">
                <i class="ph ph-bookmark-simple"></i>
              </button>
              <button class="proxy-action-btn" id="proxyProviderBtn" title="Change Provider">
                <i class="ph ph-swap"></i>
              </button>
            </div>
          </div>
          <div class="proxy-frame-container">
            <div id="proxyLoading" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; justify-content: center; align-items: center; background: var(--surface);">
              <div style="text-align: center;">
                <i class="ph ph-spinner ph-spin" style="font-size: 2rem; color: var(--primary); display: block; margin-bottom: 1rem;"></i>
                <p>Loading content...</p>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.5rem;">Using ${provider.name}</p>
              </div>
            </div>
            <iframe id="proxyFrame" src="${proxyUrl}" frameborder="0" style="width: 100%; height: 100%; display: none;" sandbox="allow-same-origin allow-scripts allow-forms"></iframe>
            <div id="proxyError" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: none; padding: 2rem; text-align: center; background: var(--surface); display: flex; flex-direction: column; justify-content: center; align-items: center;">
              <i class="ph ph-warning" style="font-size: 3rem; color: #ef4444; margin-bottom: 1rem;"></i>
              <h3 style="margin-bottom: 1rem;">Failed to load content</h3>
              <p style="margin-bottom: 1rem;">This website may not be compatible with our proxy, or it may be blocking proxy access.</p>
              <div>
                <button id="proxyTryAnotherBtn" class="action-btn">
                  <i class="ph ph-swap"></i>
                  Try Another Provider
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeBtn = document.getElementById('proxyCloseBtn');
    const fullscreenBtn = document.getElementById('proxyFullscreenBtn');
    const proxyFrame = document.getElementById('proxyFrame');
    const loading = document.getElementById('proxyLoading');
    const error = document.getElementById('proxyError');
    const reloadBtn = document.getElementById('proxyReloadBtn');
    const bookmarkBtn = document.getElementById('proxyBookmarkBtn');
    const providerBtn = document.getElementById('proxyProviderBtn');
    const urlBar = document.getElementById('proxyUrlBar');
    const tryAnotherBtn = document.getElementById('proxyTryAnotherBtn');
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        modal.remove();
      });
    }
    
    if (fullscreenBtn && proxyFrame) {
      fullscreenBtn.addEventListener('click', () => {
        if (proxyFrame.requestFullscreen) {
          proxyFrame.requestFullscreen();
        }
      });
    }
    
    if (reloadBtn && proxyFrame) {
      reloadBtn.addEventListener('click', () => {
        loading.style.display = 'flex';
        error.style.display = 'none';
        proxyFrame.style.display = 'none';
        proxyFrame.src = proxyFrame.src;
      });
    }
    
    if (bookmarkBtn) {
      bookmarkBtn.addEventListener('click', () => {
        this.addBookmark(url);
        showNotification('Bookmark added', 'success');
      });
    }
    
    if (providerBtn) {
      providerBtn.addEventListener('click', () => {
        this.cycleProvider();
        this.openProxyUrl(url);
      });
    }
    
    if (tryAnotherBtn) {
      tryAnotherBtn.addEventListener('click', () => {
        this.cycleProvider();
        this.openProxyUrl(url);
      });
    }
    
    if (urlBar) {
      urlBar.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const newUrl = urlBar.value.trim();
          if (newUrl) {
            this.openProxyUrl(newUrl);
          }
        }
      });
    }
    
    if (proxyFrame) {
      proxyFrame.addEventListener('load', () => {
        try {
          loading.style.display = 'none';
          proxyFrame.style.display = 'block';
          
          // Try to access iframe content - may fail due to CORS
          const frameDocument = proxyFrame.contentDocument || proxyFrame.contentWindow.document;
          if (!frameDocument || !frameDocument.body) {
            throw new Error('Cannot access frame content');
          }
          
          // Update URL bar if redirect happened
          try {
            const frameUrl = proxyFrame.contentWindow.location.href;
            if (frameUrl && !frameUrl.includes(provider.urlTemplate)) {
              // Extract the actual URL from the proxy URL
              let actualUrl = frameUrl;
              if (!provider.corsAnywhere) {
                // For non-CORS-Anywhere providers, the URL is usually a parameter
                const urlMatch = frameUrl.match(/url=([^&]+)/);
                if (urlMatch && urlMatch[1]) {
                  actualUrl = decodeURIComponent(urlMatch[1]);
                }
              } else {
                // For CORS-Anywhere providers, remove the proxy prefix
                actualUrl = frameUrl.replace(provider.urlTemplate, '');
              }
              
              urlBar.value = actualUrl;
            }
          } catch (err) {
            // Ignore errors when trying to access location due to CORS
          }
        } catch (err) {
          // If access fails, show error
          loading.style.display = 'none';
          proxyFrame.style.display = 'none';
          error.style.display = 'flex';
        }
      });
      
      proxyFrame.addEventListener('error', () => {
        loading.style.display = 'none';
        proxyFrame.style.display = 'none';
        error.style.display = 'flex';
      });
      
      // Set timeout for loading
      setTimeout(() => {
        if (loading.style.display !== 'none') {
          loading.style.display = 'none';
          proxyFrame.style.display = 'none';
          error.style.display = 'flex';
        }
      }, 20000); // Longer timeout for slow services
    }
  }
  
  cycleProvider() {
    this.activeProvider = (this.activeProvider + 1) % this.proxyProviders.length;
    this.saveState();
    
    const provider = this.proxyProviders[this.activeProvider];
    showNotification(`Switched to ${provider.name} proxy`, 'info');
    
    const proxyProviderSelect = document.getElementById('proxyProvider');
    if (proxyProviderSelect) {
      proxyProviderSelect.value = this.activeProvider;
    }
  }
  
  addBookmark(url) {
    if (!url || this.bookmarks.includes(url)) return;
    
    this.bookmarks.unshift(url);
    
    // Limit to 10 bookmarks
    if (this.bookmarks.length > 10) {
      this.bookmarks = this.bookmarks.slice(0, 10);
    }
    
    this.saveState();
    this.updateBookmarksUI();
  }
  
  updateBookmarksUI() {
    const bookmarksContainer = document.getElementById('proxyBookmarks');
    if (!bookmarksContainer) return;
    
    if (this.bookmarks.length === 0) {
      bookmarksContainer.innerHTML = `<p class="text-center" style="color: var(--text-secondary); padding: 1rem 0;">No bookmarks yet</p>`;
      return;
    }
    
    bookmarksContainer.innerHTML = this.bookmarks.map(url => `
      <div class="proxy-bookmark-item" style="display: flex; align-items: center; padding: 0.5rem; margin-bottom: 0.5rem; background: var(--surface-hover); border-radius: var(--radius-sm);">
        <i class="ph ph-bookmark-simple" style="margin-right: 0.5rem; color: var(--primary);"></i>
        <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.9rem;">${url}</span>
        <button class="proxy-bookmark-open" data-url="${url}" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; padding: 0.3rem;">
          <i class="ph ph-arrow-square-out"></i>
        </button>
        <button class="proxy-bookmark-delete" data-url="${url}" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; padding: 0.3rem;">
          <i class="ph ph-x"></i>
        </button>
      </div>
    `).join('');
    
    // Add event listeners
    bookmarksContainer.querySelectorAll('.proxy-bookmark-open').forEach(btn => {
      btn.addEventListener('click', () => {
        const url = btn.getAttribute('data-url');
        if (url) {
          this.openProxyUrl(url);
        }
      });
    });
    
    bookmarksContainer.querySelectorAll('.proxy-bookmark-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const url = btn.getAttribute('data-url');
        if (url) {
          this.bookmarks = this.bookmarks.filter(bookmark => bookmark !== url);
          this.saveState();
          this.updateBookmarksUI();
        }
      });
    });
  }
  
  saveProxyHistory(url) {
    // Save visited URLs to history
    if (!url || this.history.includes(url)) {
      // If URL exists, move it to the top
      this.history = this.history.filter(item => item !== url);
    }
    
    this.history.unshift(url);
    
    // Limit history to 10 items
    if (this.history.length > 10) {
      this.history = this.history.slice(0, 10);
    }
    
    this.saveState();
    this.updateHistoryUI();
  }
  
  updateHistoryUI() {
    const historyContainer = document.getElementById('proxyHistory');
    if (!historyContainer) return;
    
    if (this.history.length === 0) {
      historyContainer.innerHTML = `<p class="text-center" style="color: var(--text-secondary); padding: 1rem 0;">No history yet</p>`;
      return;
    }
    
    historyContainer.innerHTML = this.history.map(url => `
      <div class="proxy-history-item" style="display: flex; align-items: center; padding: 0.5rem; margin-bottom: 0.5rem; background: var(--surface-hover); border-radius: var(--radius-sm);">
        <i class="ph ph-clock-clockwise" style="margin-right: 0.5rem; color: var(--text-secondary);"></i>
        <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.9rem;">${url}</span>
        <button class="proxy-history-open" data-url="${url}" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; padding: 0.3rem;">
          <i class="ph ph-arrow-square-out"></i>
        </button>
      </div>
    `).join('');
    
    // Add event listeners
    historyContainer.querySelectorAll('.proxy-history-open').forEach(btn => {
      btn.addEventListener('click', () => {
        const url = btn.getAttribute('data-url');
        if (url) {
          this.openProxyUrl(url);
        }
      });
    });
  }
  
  loadState() {
    const state = localStorage.getItem('proxyState');
    if (state) {
      try {
        const { isActive, activeProvider, bookmarks, history } = JSON.parse(state);
        
        this.isActive = isActive || false;
        this.activeProvider = activeProvider || 0;
        this.bookmarks = bookmarks || [];
        this.history = history || [];
        
        // Update UI
        const enableProxyToggle = document.getElementById('enableProxy');
        const proxyProviderSelect = document.getElementById('proxyProvider');
        
        if (enableProxyToggle) {
          enableProxyToggle.checked = this.isActive;
        }
        
        if (proxyProviderSelect) {
          proxyProviderSelect.value = this.activeProvider;
        }
        
        this.updateBookmarksUI();
        this.updateHistoryUI();
      } catch (error) {
        console.error('Error loading proxy state:', error);
      }
    }
  }
  
  saveState() {
    localStorage.setItem('proxyState', JSON.stringify({
      isActive: this.isActive,
      activeProvider: this.activeProvider,
      bookmarks: this.bookmarks,
      history: this.history
    }));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize modules
  new SearchSystem();
  const webProxy = new WebProxy();
  webProxy.setup();
  
  const recentGamesManager = new RecentGamesManager();
  recentGamesManager.updateRecentGamesDisplay();
  
  // Set up event listeners for category filters
  const filterChips = document.querySelectorAll('.filter-chip');
  
  // Add settings close button functionality
  const settingsModal = document.getElementById('settingsModal');
  const settingsCloseBtn = document.getElementById('settingsCloseBtn');
  const settingsOpenBtn = document.getElementById('settingsBtn');
  
  if (settingsCloseBtn && settingsModal) {
    settingsCloseBtn.addEventListener('click', () => {
      settingsModal.style.display = 'none';
    });
  }
  
  if (settingsOpenBtn && settingsModal) {
    settingsOpenBtn.addEventListener('click', () => {
      settingsModal.style.display = 'flex';
    });
  }
  
  // Also make the settings-close-btn work (the original class that might still be in use)
  const settingsCloseButtons = document.querySelectorAll('.settings-close-btn');
  settingsCloseButtons.forEach(btn => {
    if (btn && settingsModal) {
      btn.addEventListener('click', () => {
        settingsModal.style.display = 'none';
      });
    }
  });
  
  // Set up event listeners for category filters
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
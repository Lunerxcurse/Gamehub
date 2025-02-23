function openGame(game) {
  if (game && game.url) {
    // Track recent game
    const recentGamesManager = new RecentGamesManager();
    recentGamesManager.addRecentGame(game);
    
    window.open(game.url, '_blank');
  } else {
    console.warn('Invalid game or URL:', game);
  }
}

class NotificationSystem {
  static show(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <i class="ph ph-info"></i>
      <p>${message}</p>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

function createGameCard(game) {
  const card = document.createElement('div');
  card.className = 'game-card';
  
  // Add badge for featured games
  if (game.featured) {
    card.innerHTML += `<span class="game-badge">Featured</span>`;
  }
  
  card.innerHTML += `
    <div class="game-thumbnail">
      <i class="ph ${game.icon}"></i>
    </div>
    <div class="game-info">
      <h3>${game.title}</h3>
      <p>${game.description}</p>
    </div>
  `;
  
  card.addEventListener('click', () => {
    openGame(game);
    NotificationSystem.show(`Launching ${game.title}...`);
  });
  
  return card;
}

function showLoading() {
  const gamesGrid = document.getElementById('gamesGrid');
  gamesGrid.innerHTML = Array(8).fill(0).map(() => `
    <div class="game-card loading">
      <div class="game-thumbnail loading"></div>
      <div class="game-info">
        <div class="loading" style="height: 20px; width: 80%;"></div>
        <div class="loading" style="height: 15px; width: 60%; margin-top: 10px;"></div>
      </div>
    </div>
  `).join('');
}

function displayGames(category = 'all', searchTerm = '') {
  showLoading();
  
  setTimeout(() => {
    const gamesGrid = document.getElementById('gamesGrid');
    const featuredGrid = document.querySelector('.featured-grid');
    
    if (!window.games || !Array.isArray(window.games)) {
      NotificationSystem.show('Error loading games', 'error');
      return;
    }
    
    const filteredGames = window.games.filter(game => {
      const matchesCategory = category === 'all' || game.category === category;
      const matchesSearch = searchTerm === '' || 
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        game.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    
    gamesGrid.innerHTML = '';
    if (featuredGrid) featuredGrid.innerHTML = '';
    
    filteredGames.forEach(game => {
      const card = createGameCard(game);
      if (game.featured && featuredGrid) {
        const featuredCard = card.cloneNode(true);
        featuredCard.className = 'featured-card';
        featuredGrid.appendChild(featuredCard);
      }
      gamesGrid.appendChild(card);
    });
    
    if (filteredGames.length === 0) {
      gamesGrid.innerHTML = `
        <div class="no-results">
          <i class="ph ph-smiley-sad"></i>
          <p>No games found. Try a different search term.</p>
        </div>
      `;
    }
  }, 500);
}

function setupEventListeners() {
  const gamesGrid = document.getElementById('gamesGrid');
  const searchInput = document.getElementById('searchInput');
  const categoryButtons = document.querySelectorAll('.categories button');

  // Category Filter
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get selected category
      const category = button.getAttribute('data-category');
      displayGames(category);
    });
  });

  // Search Functionality
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    displayGames('all', searchTerm);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.mobile-sidebar');
  const sidebarOverlay = document.querySelector('.mobile-sidebar-overlay');
  
  let touchStartX = 0;
  let touchEndX = 0;
  let isSwiping = false;

  // Handle touch start
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    isSwiping = true;
  }, { passive: true });

  // Handle touch move
  document.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    
    touchEndX = e.touches[0].clientX;
    const swipeDistance = touchStartX - touchEndX;
    
    // If swiping from left edge to right
    if (touchStartX < 50 && swipeDistance < -50) {
      openSidebar();
      isSwiping = false;
    }
    
    // If swiping from right to left while sidebar is open
    if (sidebar.classList.contains('open') && swipeDistance > 50) {
      closeSidebar();
      isSwiping = false;
    }
  }, { passive: true });

  // Handle touch end
  document.addEventListener('touchend', () => {
    isSwiping = false;
  }, { passive: true });

  function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
  }

  // Close sidebar when clicking overlay
  sidebarOverlay.addEventListener('click', closeSidebar);

  // Initialize mobile recent games
  function updateMobileRecentGames() {
    const recentGamesContainer = document.getElementById('mobileSidebarRecentGames');
    const recentGames = new RecentGamesManager().getRecentGames();

    if (!recentGamesContainer) return;

    if (recentGames.length === 0) {
      recentGamesContainer.innerHTML = `
        <div class="recent-game-item">
          <i class="ph ph-info"></i>
          <span>No recent games</span>
        </div>
      `;
      return;
    }

    recentGamesContainer.innerHTML = recentGames
      .map(game => `
        <div class="recent-game-item" data-game='${JSON.stringify(game)}'>
          <i class="ph ${game.icon}"></i>
          <span>${game.title}</span>
        </div>
      `)
      .join('');

    // Add click handlers for recent games
    recentGamesContainer.querySelectorAll('.recent-game-item').forEach(item => {
      item.addEventListener('click', () => {
        const gameData = JSON.parse(item.dataset.game);
        openGame(gameData);
        closeSidebar();
      });
    });
  }

  // Update recent games when sidebar opens
  sidebar.addEventListener('transitionend', () => {
    if (sidebar.classList.contains('open')) {
      updateMobileRecentGames();
    }
  });

  // Export the function if needed for other scripts
  window.displayGames = displayGames;
  setupEventListeners();
});
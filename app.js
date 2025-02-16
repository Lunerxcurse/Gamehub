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

function displayGames(category = 'all', searchTerm = '') {
  const gamesGrid = document.getElementById('gamesGrid');
  const featuredGrid = document.querySelector('.featured-grid');

  // Ensure window.games exists and is an array
  if (!window.games || !Array.isArray(window.games)) {
    console.error('Games data not available');
    return;
  }

  // Clear existing games
  gamesGrid.innerHTML = '';
  if (featuredGrid) featuredGrid.innerHTML = '';

  // Filter games based on category and search term
  const filteredGames = window.games.filter(game => {
    const matchesCategory = category === 'all' || game.category === category;
    const matchesSearch = searchTerm === '' || 
      game.title.toLowerCase().includes(searchTerm) || 
      game.description.toLowerCase().includes(searchTerm);
    
    return matchesCategory && matchesSearch;
  });

  // Sort games: featured first, then alphabetically
  filteredGames.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.title.localeCompare(b.title);
  });

  // Create game cards
  filteredGames.forEach(game => {
    const gameCard = document.createElement('div');
    gameCard.className = 'game-card';
    gameCard.innerHTML = `
      <div class="game-thumbnail">
        <i class="ph ${game.icon}"></i>
      </div>
      <div class="game-info">
        <h3>${game.title}</h3>
        <p>${game.description}</p>
      </div>
    `;
    
    gameCard.addEventListener('click', () => openGame(game));
    
    if (game.featured && featuredGrid) {
      const featuredCard = document.createElement('div');
      featuredCard.className = 'featured-card';
      featuredCard.innerHTML = `
        <div class="featured-card-content">
          <h3>${game.title}</h3>
          <p>${game.description}</p>
        </div>
      `;
      featuredCard.addEventListener('click', () => openGame(game));
      featuredGrid.appendChild(featuredCard);
    }
    
    gamesGrid.appendChild(gameCard);
  });
}

// Export the function if needed for other scripts
window.displayGames = displayGames;
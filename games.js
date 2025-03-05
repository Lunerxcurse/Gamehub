(function() {
  window.games = window.games || [];

  const newGames = [
    {
      id: 'adrenaline-rush',
      title: 'Adrenaline Rush',
      description: 'High-intensity action game with thrilling challenges and fast-paced gameplay',
      category: 'action',
      icon: 'ph-speedometer',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/adrenaline-rush/index.html',
      featured: false
    },
    {
      id: 'age-of-war',
      title: 'Age of War',
      description: 'Strategic game where you evolve your civilization and battle through different historical eras',
      category: 'strategy',
      icon: 'ph-sword',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/age-of-war/index.html',
      featured: true
    },
    {
      id: 'mr-bullet',
      title: 'Mr Bullet',
      description: 'Physics-based puzzle shooter where you aim and eliminate targets with precision',
      category: 'puzzle',
      icon: 'ph-crosshair',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/mr-bullet/index.html',
      featured: false
    },
    {
      id: 'defend-the-tank',
      title: 'Defend the Tank',
      description: 'Strategic defense game where you protect your tank from incoming enemy waves',
      category: 'action',
      icon: 'ph-army-knife',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/defend-the-tank/index.html',
      featured: false
    },
    {
      id: 'pandemic-2',
      title: 'Pandemic 2',
      description: 'Strategy simulation where you develop and spread a deadly pandemic across the world',
      category: 'simulation',
      icon: 'ph-virus',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/pandemic-2/index.html',
      featured: false
    },
    {
      id: 'drive-mad',
      title: 'Drive Mad',
      description: 'Intense driving game with challenging obstacles and crazy vehicle physics',
      category: 'racing',
      icon: 'ph-car',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/drive-mad/index.html',
      featured: false
    }
  ];

  window.games = [...window.games, ...newGames];

  // Re-run existing deduplication logic
  const ids = new Set();
  window.games = window.games.filter(game => {
    if (!game.id) return false;
    
    if (ids.has(game.id)) {
      game.id = `${game.id}-${Math.random().toString(36).substring(2, 7)}`;
    }
    
    ids.add(game.id);
    return true;
  });

  window.dispatchEvent(new Event('gamesDataReady'));
})();
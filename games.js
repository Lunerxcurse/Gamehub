(function() {
  window.games = window.games || [];

  const newGames = [
    {
      id: 'geometry-dash',
      title: 'Geometry Dash',
      description: 'Rhythmic platformer with challenging levels',
      category: 'arcade',
      icon: 'ph-arrow-up-right',
      url: 'https://mathplayground.com/games/geometry-dash/game.html',
      featured: false
    },
    {
      id: 'run-3',
      title: 'Run 3',
      description: 'Endless running game in space',
      category: 'arcade',
      icon: 'ph-rocket',
      url: 'https://mathplayground.com/run-3/index.html',
      featured: false
    },
    {
      id: 'fireboy-watergirl',
      title: 'Fireboy and Watergirl',
      description: 'Cooperative puzzle platformer',
      category: 'puzzle',
      icon: 'ph-fire',
      url: 'https://mathplayground.com/fireboy-watergirl/game.html',
      featured: false
    },
    {
      id: 'idle-breakout',
      title: 'Idle Breakout',
      description: 'Incremental brick-breaking game',
      category: 'arcade',
      icon: 'ph-cube',
      url: 'https://mathplayground.com/idle-breakout/index.html',
      featured: false
    },
    {
      id: 'gd-tower',
      title: 'Geometry Dash Tower',
      description: 'Vertical platforming challenge',
      category: 'arcade',
      icon: 'ph-arrow-up-right',
      url: 'https://mathplayground.com/geometrydash-tower/index.html',
      featured: false
    },
    {
      id: 'worlds-hardest-game',
      title: 'World\'s Hardest Game',
      description: 'Incredibly challenging precision game',
      category: 'arcade',
      icon: 'ph-target',
      url: 'https://mathplayground.com/worldshardestgame/index.html',
      featured: false
    },
    {
      id: 'stick-hero',
      title: 'Stick Hero',
      description: 'Minimalist bridge-building challenge',
      category: 'arcade',
      icon: 'ph-person',
      url: 'https://htmlgames.github.io/stick-hero/index.html',
      featured: false
    },
    {
      id: 'tiny-fishing',
      title: 'Tiny Fishing',
      description: 'Relaxing fishing simulation game',
      category: 'simulation',
      icon: 'ph-fish',
      url: 'https://mathplayground.com/tiny-fishing/index.html',
      featured: false
    },
    {
      id: 'idle-mining',
      title: 'Idle Mining',
      description: 'Resource mining and upgrade game',
      category: 'simulation',
      icon: 'ph-pickaxe',
      url: 'https://htmlgames.github.io/idle-mining/index.html',
      featured: false
    },
    {
      id: 'dungeon-rush',
      title: 'Dungeon Rush',
      description: 'Fast-paced dungeon crawler',
      category: 'action',
      icon: 'ph-sword',
      url: 'https://htmlgames.github.io/dungeon-rush/index.html',
      featured: false
    },
    {
      id: 'merge-defense',
      title: 'Merge Defense',
      description: 'Strategic tower defense game',
      category: 'strategy',
      icon: 'ph-shield',
      url: 'https://htmlgames.github.io/merge-defense/index.html',
      featured: false
    },
    {
      id: 'cut-the-rope',
      title: 'Cut the Rope',
      description: 'Physics-based puzzle game',
      category: 'puzzle',
      icon: 'ph-scissors',
      url: 'https://mathplayground.com/cut-the-rope/index.html',
      featured: false
    },
    {
      id: 'gravity-master',
      title: 'Gravity Master',
      description: 'Unique physics manipulation platformer',
      category: 'puzzle',
      icon: 'ph-arrow-bend-down-right',
      url: 'https://mathplayground.com/gravity-master/index.html',
      featured: false
    }
  ];

  // Merge existing games with new games, preserving order
  window.games = [
    ...window.games,
    ...newGames
  ];
})();
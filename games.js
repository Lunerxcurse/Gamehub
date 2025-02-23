(function() {
  window.games = window.games || [];

  const additionalGames = [
    {
      id: 'run-3',
      title: 'Run 3',
      description: 'Navigate through space in this endless runner',
      category: 'arcade',
      icon: 'ph-person-simple-run',
      url: 'https://en.gameslol.net/data/run-3/index.html',
      featured: false
    },
    {
      id: 'drift-boss',
      title: 'Drift Boss',
      description: 'Master the art of drifting in this endless driving game',
      category: 'racing',
      icon: 'ph-car',
      url: 'https://www.mathplayground.com/drift-boss-v3/index.html',
      featured: false
    },
    {
      id: 'fireboy-watergirl',
      title: 'Fireboy & Watergirl',
      description: 'Cooperative puzzle platformer',
      category: 'puzzle',
      icon: 'ph-fire',
      url: 'https://html5.gamedistribution.com/62c49c90c7404b6689d7c4f3f6506fd8/',
      featured: false
    },
    {
      id: 'dvd-logo',
      title: 'DVD Logo',
      description: 'Classic bouncing DVD logo game',
      category: 'arcade',
      icon: 'ph-tv',
      url: 'https://aidanspeakss.github.io/dvd-logo-game/',
      featured: false
    },
    {
      id: 'fnaf-2',
      title: 'Five Nights at Freddy\'s 2',
      description: 'Second installment of the horror survival game series',
      category: 'horror',
      icon: 'ph-ghost',
      url: 'https://en.gameslol.net/data/fnaf/fnaf2.html',
      featured: false
    },
    {
      id: 'fnaf-4',
      title: 'Five Nights at Freddy\'s 4',
      description: 'Fourth installment of the horror survival game series',
      category: 'horror',
      icon: 'ph-ghost',
      url: 'https://run3.io/popgame/fnaf/fnaf4.html',
      featured: false
    },
    {
      id: 'fnaf-3',
      title: 'Five Nights at Freddy\'s 3',
      description: 'Third installment of the horror survival game series',
      category: 'horror',
      icon: 'ph-ghost',
      url: 'https://run3.io/popgame/fnaf/fnaf3.html',
      featured: false
    },
    {
      id: 'ragdoll-archers',
      title: 'Ragdoll Archers',
      description: 'Engage in hilarious archer battles with ragdoll physics',
      category: 'action',
      icon: 'ph-bow-arrow',
      url: 'https://codelab.sitescms.com/game/ragdollarchers/index.html',
      featured: false
    },
    {
      id: 'poly-track',
      title: 'Poly Track',
      description: 'High-speed racing game with minimalist graphics',
      category: 'racing',
      icon: 'ph-car',
      url: 'https://storytellergame.io/gg/polytrack-unblocked/',
      featured: false
    },
    {
      id: 'slow-roads',
      title: 'Slow Roads',
      description: 'Relaxing driving simulation game',
      category: 'simulation',
      icon: 'ph-car',
      url: 'https://slowroads.io/#A2-973f4ca9@0',
      featured: false
    },
    {
      id: 'hyper-cars-ramp-crash',
      title: 'Hyper Cars: Ramp Crash',
      description: 'Intense car crash racing game',
      category: 'racing',
      icon: 'ph-car',
      url: 'https://www.twoplayergames.org/embed/hyper-cars-ramp-crash',
      featured: false
    },
    {
      id: 'fluid-match',
      title: 'Fluid Match',
      description: 'Color-matching puzzle game with fluid mechanics',
      category: 'puzzle',
      icon: 'ph-drop',
      url: 'https://labgstore311.github.io/g69/class-635/', 
      featured: false
    },
    {
      id: 'swingo',
      title: 'Swingo',
      description: 'Swing and navigate through challenging levels',
      category: 'arcade',
      icon: 'ph-arrow-swing',  
      url: 'https://labgstore311.github.io/g69/class-636/',
      featured: false
    },
    {
      id: 'flight-simulator',
      title: 'Flight Simulator',
      description: 'Realistic airplane piloting experience',
      category: 'simulation',
      icon: 'ph-airplane',
      url: 'https://www.silvergames.com/en/airplane-simulator/gameframe',
      featured: true
    },
    {
      id: 'temple-run',
      title: 'Temple Run',
      description: 'Endless running adventure game',
      category: 'arcade',
      icon: 'ph-person-simple-run',
      url: 'https://azgames.io/game/temple-run-2/',
      featured: false
    },
    {
      id: 'gta',
      title: 'Grand Theft Auto',
      description: 'Classic action-adventure game',
      category: 'action',
      icon: 'ph-car',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/gta-gba/index.html',
      featured: true  
    },
    {
      id: 'slope',
      title: 'Slope',
      description: 'Challenging rolling ball game',
      category: 'arcade',
      icon: 'ph-arrow-bend-down-right',
      url: 'https://education76.github.io/g/slope/',
      featured: false
    },
    {
      id: 'flappy-bird',
      title: 'Flappy Bird',
      description: 'Iconic arcade flying game',
      category: 'arcade',
      icon: 'ph-bird',
      url: 'https://playcanv.as/p/2OlkUaxF/',
      featured: false
    },
    {
      id: 'fnaf',
      title: 'Five Nights at Freddy\'s',
      description: 'Survival horror game',
      category: 'horror',
      icon: 'ph-ghost',
      url: 'https://run3.io/popgame/fnaf/fnaf1/',
      featured: false
    },
    {
      id: 'friday-night-funkin',
      title: 'Friday Night Funkin\'',
      description: 'Rhythm-based music game',
      category: 'arcade',
      icon: 'ph-music-notes',
      url: 'https://fnf.kdata1.com/2024/fnf/530/',
      featured: false
    },
    {
      id: '2048',
      title: '2048',
      description: 'Number sliding puzzle game',
      category: 'puzzle',
      icon: 'ph-numbers',
      url: 'games/2048.html',
      featured: false
    },
    {
      id: 'snake',
      title: 'Snake',
      description: 'Classic snake arcade game',
      category: 'arcade',
      icon: 'ph-gamepad',
      url: 'https://kdata1.com/5000/2024/snakesolver/',
      featured: false
    },
    {
      id: 'minecraft',
      title: 'Minecraft',
      description: 'Browser-based Minecraft experience',
      category: 'simulation',
      icon: 'ph-cube',
      url: 'https://bagelcomics.com/eaglercraft-main/eaglercraft-main/stable-download/web/index.html',
      featured: true  
    },
    {
      id: 'pac-man',
      title: 'Pac-Man',
      description: 'Classic maze chase game',
      category: 'arcade',
      icon: 'ph-ghost',
      url: 'https://www.google.com/logos/2010/pacman10-i.html',
      featured: false
    },
    {
      id: 'stack',
      title: 'Stack',
      description: 'Tower stacking skill game',
      category: 'puzzle',
      icon: 'ph-stack',
      url: 'https://www.silvergames.com/en/stack/gameframe',
      featured: false
    },
    {
      id: 'doodle-jump',
      title: 'Doodle Jump',
      description: 'Endless jumping platformer',
      category: 'arcade',
      icon: 'ph-arrow-up',
      url: 'https://www.crazygames.com/game/doodle-jump',
      featured: false
    },
    {
      id: 'among-us',
      title: 'Among Us',
      description: 'Multiplayer social deduction game',
      category: 'io',
      icon: 'ph-users',
      url: 'https://html5.gamedistribution.com/9abe6af0fbb440b98a3e24bf7fb0636a/?gd_sdk_referrer_url=https://kbhgames.com/game/among-us-single-player',
      featured: true  
    },
    {
      id: 'subway-surfers',
      title: 'Subway Surfers',
      description: 'Endless running mobile game',
      category: 'arcade',
      icon: 'ph-train',
      url: 'https://stickman.pro/iframe/index.html',
      featured: false
    },
    {
      id: 'moto-x3m',
      title: 'Moto X3M',
      description: 'Motorcycle stunt racing game',
      category: 'racing',
      icon: 'ph-motorcycle',
      url: 'https://html5.gamedistribution.com/f804d079d19f44d3b951ead4588e974a/?gd_sdk_referrer_url=https://kbhgames.com/game/moto-x3m-3',
      featured: false
    },
    {
      id: 'cod-zombies',
      title: 'COD Zombies: Portable',
      description: 'Zombie survival shooter',
      category: 'action',
      icon: 'ph-skull',
      url: 'https://nzp.gay/',
      featured: false
    },
    {
      id: 'retro-bowl',
      title: 'Retro Bowl',
      description: 'Classic American football management game',
      category: 'sports',
      icon: 'ph-football',
      url: 'https://webglmath.github.io/retro-bowl/',
      featured: false
    },
    {
      id: 'drift-hunters',
      title: 'Drift Hunters',
      description: 'Intense drift racing simulator',
      category: 'racing',
      icon: 'ph-car',
      url: 'https://1games.io/game/drift-hunters/',
      featured: false
    },
    {
      id: 'tunnel-rush',
      title: 'Tunnel Rush',
      description: 'High-speed endless tunnel runner',
      category: 'arcade',
      icon: 'ph-arrow-bend-down-right',
      url: 'https://unblockedgames911.gitlab.io/tunnel-rush/',
      featured: false
    },
    {
      id: 'chess',
      title: 'Classic Chess',
      description: 'Strategic board game of kings',
      category: 'puzzle',
      icon: 'ph-chess-piece',
      url: 'https://games.cdn.famobi.com/html5games/c/chess-classic/v410/?fg_domain=play.famobi.com&fg_aid=A-IOCJF&fg_uid=9fff4399-7428-43e6-a023-d2ecd21bae37&fg_pid=725ca73f-aa33-4436-bdac-df8e93e343ae&fg_beat=456&original_ref=',
      featured: false
    },
    {
      id: 'tank-trouble',
      title: 'Tank Trouble',
      description: 'Multiplayer tank battle game',
      category: 'action',
      icon: 'ph-army-knife',
      url: 'https://www.silvergames.com/en/tank-trouble/gameframe',
      featured: false
    },
    {
      id: 'cookie-clicker',
      title: 'Cookie Clicker',
      description: 'Addictive cookie production game',
      category: 'simulation',
      icon: 'ph-cookie',
      url: 'https://orteil.dashnet.org/cookieclicker/',
      featured: false
    },
    {
      id: 'tag',
      title: 'Tag Game',
      description: 'Classic multiplayer chase and escape game',
      category: 'multiplayer',
      icon: 'ph-users',
      url: 'https://labgstore311.github.io/g69/class-633/',
      featured: false
    },
    {
      id: 'stickman-hook',
      title: 'Stickman Hook',
      description: 'Swing and navigate through challenging levels',
      category: 'arcade',
      icon: 'ph-person',
      url: 'https://stickman.pro/iframe/index.html',  
      featured: false
    },
    {
      id: 'paper-io',
      title: 'Paper.io',
      description: 'Conquer territory in this multiplayer strategy game',
      category: 'io',
      icon: 'ph-paper-plane',
      url: 'https://paperio.site/', 
      featured: false
    },
    {
      id: 'vex-6',
      title: 'Vex 6',  
      description: 'Challenging platformer with intricate obstacle courses',
      category: 'action',
      icon: 'ph-arrow-up-right',
      url: 'https://htmlxm.github.io/h9/vex-6/',
      featured: false
    },
    {
      id: 'core-ball',
      title: 'Core Ball',
      description: 'Arcade ball bouncing strategy game', 
      category: 'arcade',
      icon: 'ph-circle',
      url: 'https://www.onlinescientificresearch.com/games/core-ball/core-ball/index.html',
      featured: false
    },
    {
      id: 'basket-random',
      title: 'Basket Random',
      description: 'Chaotic basketball with unpredictable physics',
      category: 'sports', 
      icon: 'ph-basketball',
      url: 'https://basketball-random.com/gg/basketball-random/',  
      featured: false
    },
    {
      id: '1v1-lol',
      title: '1v1.LOL',
      description: 'Fast-paced building and shooting battle game',
      category: 'action',
      icon: 'ph-crosshair', 
      url: 'https://1v1.lol/',
      featured: false
    },
    {
      id: 'rooftop-snipers',
      title: 'Rooftop Snipers',
      description: 'Hilarious multiplayer sniper duel game',
      category: 'action',
      icon: 'ph-target',
      url: 'https://games.playtropolis.com/rooftop-snipers/',
      featured: false
    },
    {
      id: 'bitlife',
      title: 'BitLife',
      description: 'Life simulation game where every choice matters',
      category: 'simulation',
      icon: 'ph-person',
      url: 'https://2048taylorswift.github.io/bitlife/',
      featured: false
    },
    {
      id: 'baldis-basics',
      title: "Baldi's Basics",
      description: 'Horror educational game with unexpected twists',
      category: 'horror',
      icon: 'ph-ruler',
      url: 'https://www.silvergames.com/en/baldis-basics-in-education-and-learning/gameframe',
      featured: false
    },
    {
      id: 'defly-io',
      title: 'Defly.io',
      description: 'Build, destroy and survive in this multiplayer arena',
      category: 'io',
      icon: 'ph-sword',
      url: 'https://defly.io/',
      featured: false
    },
    {
      id: 'stumble-guys',
      title: 'Stumble Guys',
      description: 'Multiplayer knockout party game',
      category: 'io',
      icon: 'ph-person-simple-run',
      url: 'https://www.stumbleguys.com/play',
      featured: false
    },
    {
      id: 'shell-shockers',
      title: 'Shell Shockers',
      description: 'Egg-themed first-person shooter',
      category: 'action',
      icon: 'ph-egg',
      url: 'https://shellshock.io/',
      featured: false
    },
    {
      id: 'superhot',
      title: 'SUPERHOT',
      description: 'Time moves only when you move',
      category: 'action',
      icon: 'ph-timer',
      url: 'https://timeshooter.io/wp-content/uploads/games/html5/S/super-hot%20(2)/index.html',
      featured: true
    },
    {
      id: 'gun-mayhem',
      title: 'Gun Mayhem',
      description: 'Action-packed shooter with multiple characters',
      category: 'action',
      icon: 'ph-crosshair',
      url: 'https://www.silvergames.com/en/gun-mayhem/gameframe',  
      featured: false
    },
    {
      id: 'escape-the-room',
      title: 'Escape the Room',
      description: 'Puzzle adventure to escape a mysterious room',
      category: 'puzzle',
      icon: 'ph-door-open',
      url: 'https://kdata1.com/2024/10/escapeseries/',
      featured: false
    },
    {
      id: 'tomb-of-the-mask',
      title: 'Tomb of the Mask',
      description: 'Challenging maze-based adventure game',
      category: 'arcade',
      icon: 'ph-map',
      url: 'https://tomb-of-the-mask-online.github.io/file/',
      featured: false
    },
    {
      id: 'sister-location',
      title: 'Five Nights at Freddy\'s: Sister Location',
      description: 'Horror survival game in the FNAF universe',
      category: 'horror',
      icon: 'ph-ghost',
      url: 'https://run3.io/popgame/fnaf/fnafsl.html',
      featured: false
    },
    {
      id: 'sniper-assassin',
      title: 'Sniper Assassin',
      description: 'Test your precision in this strategic shooter game',
      category: 'action',
      icon: 'ph-crosshair',
      url: 'https://www.silvergames.com/en/sniper-assassin-4/gameframe',
      featured: false
    },
    {
      id: 'gun-mayhem',
      title: 'Gun Mayhem',
      description: 'Action-packed shooter with multiple characters',
      category: 'action',
      icon: 'ph-crosshair',
      url: 'https://www.silvergames.com/en/gun-mayhem/gameframe',  
      featured: false
    },
    {
      id: 'flee-the-complex',
      title: 'Flee the Complex',
      description: 'Strategic escape adventure game',
      category: 'action',
      icon: 'ph-door-open',
      url: 'https://www.silvergames.com/en/fleeing-the-complex/gameframe',
      featured: false
    },
    {
      id: 'escaping-the-prison',
      title: 'Escaping the Prison',
      description: 'Strategic escape adventure game',
      category: 'action',
      icon: 'ph-door-open',
      url: 'https://www.silvergames.com/en/escaping-the-prison/gameframe',
      featured: false
    },
    {
      id: 'backrooms',
      title: 'Backrooms',
      description: 'Survive the unsettling, procedurally generated liminal spaces',
      category: 'horror',
      icon: 'ph-ghost',
      url: 'https://backroomsgame.io/game/backrooms/',
      featured: false
    },
    {
      id: 'fortnite',
      title: 'Fortnite',
      description: 'Battle Royale browser game experience',
      category: 'action',
      icon: 'ph-target',
      url: 'https://www.xbox.com/en-US/play/games/fortnite/BT5P2X999VH2',
      featured: true
    }
  ];

  window.games = [...window.games, ...additionalGames];

  window.dispatchEvent(new Event('gamesDataReady'));
})();
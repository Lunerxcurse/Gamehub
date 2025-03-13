(function() {
  window.games = window.games || [];

  const additionalGames = [
    {
      id: 'count-stickman-masters',
      title: 'Count Stickman Masters',
      description: 'Strategic stickman combat and counting game',
      category: 'action',
      icon: 'ph-chart-bar',
      url: 'https://storage.y8.com/y8-studio/html5/yyg/count_stickman_masters/?key=y8&value=default',
      featured: false
    },
    {
      id: 'there-is-no-game',
      title: 'There Is No Game',
      description: 'A game that tells you there is no game... or is there?',
      category: 'puzzle',
      icon: 'ph-question',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/projects/there-is-no-game/index.html',
      featured: false
    },
    {
      id: 'run-3',
      title: 'Run 3',
      description: 'Navigate through space in this endless runner',
      category: 'arcade',
      icon: 'ph-person-simple-run',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/run3/index.html',
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
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/dvdlogo/index.html',
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
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/ragdoll-archers/index.html',
      featured: false
    },
    {
      id: 'poly-track',
      title: 'Poly Track',
      description: 'High-speed racing game with minimalist graphics',
      category: 'racing',
      icon: 'ph-car',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/polytrack/index.html',
      featured: false
    },
    {
      id: 'slow-roads',
      title: 'Slow Roads',
      description: 'Relaxing driving simulation game',
      category: 'simulation',
      icon: 'ph-car',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/slow-roads/index.html',
      featured: false
    },
    {
      id: 'hyper-cars-ramp-crash',
      title: 'Hyper Cars: Ramp Crash',
      description: 'Intense car crash racing game',
      category: 'racing',
      icon: 'ph-car',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/hypercars/index.html',
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
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/swingo/index.html',
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
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/projects/temple-run-2/index.html',
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
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/slope-3/index.html',
      featured: false
    },
    {
      id: 'flappy-bird',
      title: 'Flappy Bird',
      description: 'Iconic arcade flying game',
      category: 'arcade',
      icon: 'ph-bird',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/flappybirb/index.html',
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
      url: 'https://www.google.com/search?q=google+snake&rlz=1CAWOAL_enUS1139&oq=google+snake&gs_lcrp=EgZjaHJvbWUyDAgAEEUYORixAxiABDIKCAEQABixAxiABDIKCAIQABixAxiABDIHCAMQABiABDIKCAQQABiLAxiABDIKCAUQABiLAxiABDIGCAcQRRg80gEINDY0NGoxajeoAgCwAgA&sourceid=chrome&ie=UTF-8&surl=1&safe=active&ssui=on',
      featured: false
    },
    {
      id: 'minecraft',
      title: 'Minecraft',
      description: 'Browser-based Minecraft experience',
      category: 'simulation',
      icon: 'ph-cube',
      url: 'https://d1tm91r4ytbt54.cloudfront.net/2779cbcb-a02f-48a3-9e2e-95a8d123d165/1685483461665/web/index.html',
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
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/nzp-gay/index.html',
      featured: false
    },
    {
      id: 'retro-bowl',
      title: 'Retro Bowl',
      description: 'Classic American football management game',
      category: 'sports',
      icon: 'ph-football',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/projects/retro-bowl/index.html',
      featured: false
    },
    {
      id: 'drift-hunters',
      title: 'Drift Hunters',
      description: 'Intense drift racing simulator',
      category: 'racing',
      icon: 'ph-car',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/driftboss2/index.html',
      featured: false
    },
    {
      id: 'tunnel-rush',
      title: 'Tunnel Rush',
      description: 'High-speed endless tunnel runner',
      category: 'arcade',
      icon: 'ph-arrow-bend-down-right',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/tunnel-rush/game/index.html',
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
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/projects/tank-trouble-2/index.html',
      featured: false
    },
    {
      id: 'cookie-clicker',
      title: 'Cookie Clicker',
      description: 'Addictive cookie production game',
      category: 'simulation',
      icon: 'ph-cookie',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/projects/cookie-clicker/index.html',
      featured: false
    },
    {
      id: 'tag',
      title: 'Tag Game',
      description: 'Classic multiplayer chase and escape game',
      category: 'multiplayer',
      icon: 'ph-users',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/tagfix/index.html',
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
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/projects/vex6/index.html',
      featured: false
    },
    {
      id: 'core-ball',
      title: 'Core Ball',
      description: 'Arcade ball bouncing strategy game', 
      category: 'arcade',
      icon: 'ph-circle',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/projects/core-ball/index.html',
      featured: false
    },
    {
      id: 'basket-random',
      title: 'Basket Random',
      description: 'Chaotic basketball with unpredictable physics',
      category: 'sports', 
      icon: 'ph-basketball',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/basketrandom/index.html',  
      featured: false
    },
    {
      id: '1v1-lol',
      title: '1v1.LOL',
      description: 'Fast-paced building and shooting battle game',
      category: 'action',
      icon: 'ph-crosshair', 
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/1v1lolagain/1v1-lol-2/index.html',
      featured: false
    },
    {
      id: 'rooftop-snipers',
      title: 'Rooftop Snipers',
      description: 'Hilarious multiplayer sniper duel game',
      category: 'action',
      icon: 'ph-target',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/rooftop-snipers/index.html',
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
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/tombmask/game/index.html',
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
      id: 'hexgl',
      title: 'HexGL',
      description: 'Futuristic racing game',
      category: 'racing',
      icon: 'ph-triangle',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/projects/HexGL/index.html',
      featured: false
    },
    {
      id: 'agar-io',
      title: 'Agar.io',
      description: 'Grow your cell by consuming others',
      category: 'io',
      icon: 'ph-circles-three',
      url: 'https://agar.io/',
      featured: false
    },
    {
      id: 'clicker-heroes',
      title: 'Clicker Heroes',
      description: 'Incremental game with RPG elements',
      category: 'idle',
      icon: 'ph-hand-pointing',
      url: 'https://www.clickerheroes.com/',
      featured: false
    },
    {
      id: 'death-run-3d',
      title: 'Death Run 3D',
      description: 'Fast-paced tunnel runner game',
      category: 'arcade',
      icon: 'ph-triangle',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/projects/death-run-3d/index.html',
      featured: false
    },
    {
      id: 'pokemon-showdown',
      title: 'Pokémon Showdown',
      description: 'Competitive Pokémon battle simulator',
      category: 'simulation',
      icon: 'ph-lightning',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/pokemon-emerald/index.html',
      featured: false
    },
    {
      id: 'cut-the-rope',
      title: 'Cut the Rope',
      description: 'Physics-based puzzle game',
      category: 'puzzle',
      icon: 'ph-scissors',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/projects/ctr/index.html',
      featured: false
    },
    {
      id: 'crossy-road',
      title: 'Crossy Road',
      description: 'Challenging arcade hopper game',
      category: 'arcade',
      icon: 'ph-road-horizon',
      url: 'https://poki.com/en/g/crossy-road',
      featured: false
    },
    {
      id: 'a-dark-room',
      title: 'A Dark Room',
      description: 'Text-based adventure with incremental mechanics',
      category: 'idle',
      icon: 'ph-moon',
      url: 'https://adarkroom.doublespeakgames.com/',
      featured: false
    },
    {
      id: 'basketball-stars',
      title: 'Basketball Stars',
      description: 'Fast-paced basketball game',
      category: 'sports',
      icon: 'ph-basketball',
      url: 'https://www.basketballstars.io/',
      featured: false
    },
    {
      id: 'bloxorz',
      title: 'Bloxorz',
      description: 'Roll the block to the goal',
      category: 'puzzle',
      icon: 'ph-cube',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/projects/bloxors/index.html',
      featured: false
    },
    {
      id: 'ski-safari',
      title: 'Ski Safari',
      description: 'Endless downhill skiing adventure',
      category: 'arcade',
      icon: 'ph-mountains',
      url: 'https://html5.gamedistribution.com/b5b6635d870a4386a93ddbc0954dcee7/',
      featured: false
    },
    {
      id: 'short-life',
      title: 'Short Life',
      description: 'Dark humor platformer with ragdoll physics',
      category: 'action',
      icon: 'ph-bandage',
      url: 'https://www.silvergames.com/en/short-life/gameframe',
      featured: false
    },
    {
      id: 'just-one-boss',
      title: 'Just One Boss',
      description: 'Challenging boss fight game',
      category: 'action',
      icon: 'ph-sword',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/projects/just-one-boss/index.html',
      featured: false
    },
    {
      id: 'monkey-mart',
      title: 'Monkey Mart',
      description: 'Build and manage your supermarket empire',
      category: 'simulation',
      icon: 'ph-storefront',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/monkeymart/file/index.html',
      featured: false
    },
    {
      id: 'rocket-soccer-derby',
      title: 'Rocket Soccer Derby',
      description: 'Vehicle-based soccer game',
      category: 'sports',
      icon: 'ph-car',
      url: 'https://www.crazygames.com/game/rocket-soccer-derby',
      featured: false
    },
    {
      id: 'n-gon',
      title: 'N-gon',
      description: 'Physics-based action game with modular power-ups',
      category: 'action',
      icon: 'ph-hexagon',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/n-gon/index.html',
      featured: false
    },
    {
      id: 'connect-4',
      title: 'Connect 4',
      description: 'Classic strategy game where you drop discs to connect four',
      category: 'puzzle',
      icon: 'ph-circles-four',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/connect4/index.html',
      featured: false
    },
    {
      id: 'super-star-car',
      title: 'Super Star Car',
      description: 'Arcade racing game with colorful graphics and power-ups',
      category: 'racing',
      icon: 'ph-car',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/super-star-car/index.html',
      featured: false
    },
    {
      id: 'choir',
      title: 'Choir Game',
      description: 'Create harmonious musical compositions by coordinating choir singers',
      category: 'music',
      icon: 'ph-microphone-stage',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/choir/game.html',
      featured: false
    },
    {
      id: 'tic-tac-toe',
      title: 'Tic Tac Toe',
      description: 'Classic strategy game of placing X and O on a 3x3 grid',
      category: 'puzzle',
      icon: 'ph-grid-four',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/tictactoe/index.html',
      featured: false
    },
    {
      id: 'air-horn',
      title: 'Air Horn Soundboard',
      description: 'Interactive soundboard with various air horn sounds',
      category: 'music',
      icon: 'ph-speaker-high',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/airhorn/index.html',
      featured: false
    },
    {
      id: 'elastic-man',
      title: 'Elastic Man',
      description: 'Stretch and manipulate a stretchy character through physics-based challenges',
      category: 'puzzle',
      icon: 'ph-person-simple',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/projects/elasticman/index.html',
      featured: false
    },
    {
      id: 'eel-slap',
      title: 'Eel Slap',
      description: 'Humorous game where you slap an eel across the screen',
      category: 'arcade',
      icon: 'ph-fish',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/eelslap/index.html',
      featured: false
    },
    {
      id: 'terraria-dino',
      title: 'Terraria Dino Game',
      description: 'Pixelated dinosaur adventure inspired by Terraria',
      category: 'action',
      icon: 'ph-dinosaur',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/Terraria/game/index.html',
      featured: false
    },
    {
      id: 'doge-miner',
      title: 'Doge Miner',
      description: 'Incremental mining game featuring the famous Doge meme',
      category: 'idle',
      icon: 'ph-dog',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/projects/DogeMiner/index.html',
      featured: false
    },
    {
      id: 'impossible-quiz',
      title: 'The Impossible Quiz',
      description: 'Challenging quiz game with tricky and unexpected questions',
      category: 'puzzle',
      icon: 'ph-question',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/projects/impossiblequiz/index.html',
      featured: false
    },
    {
      id: 'soundboard',
      title: 'Ultimate Soundboard',
      description: 'Collection of fun and quirky sound effects to play',
      category: 'music',
      icon: 'ph-speaker-simple-none',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/projects/soundboard/index.html',
      featured: false
    },
    {
      id: 'mario',
      title: 'Super Mario',
      description: 'Classic side-scrolling adventure with everyone\'s favorite plumber',
      category: 'action',
      icon: 'ph-game-controller',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/mario-classic/index.html',
      featured: true
    },
    {
      id: 'chrome-dino',
      title: 'Chrome Dino Game',
      description: 'The classic offline dinosaur game from Chrome browser',
      category: 'arcade',
      icon: 'ph-dinosaur',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/projects/chrome-dino/index.html',
      featured: false
    },
    {
      id: 'geoguesser',
      title: 'GeoGuesser',
      description: 'Explore the world and guess your location based on street view images',
      category: 'puzzle',
      icon: 'ph-map-pin',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/worldgussr/index.html',
      featured: false
    },
    {
      id: 'cluster-rush',
      title: 'Cluster Rush',  
      description: 'High-speed truck jumping and navigation challenge',
      category: 'action',
      icon: 'ph-truck',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/cluster-rush/index.html',
      featured: false
    },
    {
      id: 'tetris-new',
      title: 'Tetris',
      description: 'Classic block-stacking puzzle game',
      category: 'puzzle',
      icon: 'ph-squares-four',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/tetris/index.html',
      featured: false
    },
    {
      id: 'dab',
      title: 'Dab Game',
      description: 'A fun game all about the classic dab dance move',
      category: 'arcade',
      icon: 'ph-hand-pointing',
      url: 'https://d21u3ic0kp9e91.cloudfront.net/dab/app.html',
      featured: false
    },
    {
      id: 'rampage',
      title: 'Rampage', 
      description: 'Classic city destruction game where you play as giant monsters',
      category: 'action',
      icon: 'ph-explosion',
      url: 'https://d3b4yo2b5lbfy.cloudfront.net/rampage/index.html',
      featured: false
    },
    {
      id: 'big-mac-heroes',
      title: 'Big Mac Heroes',
      description: 'Unique adventure game featuring burger-based characters', 
      category: 'arcade',
      icon: 'ph-hamburger',
      url: 'https://d2edvleactrkkb.cloudfront.net/',
      featured: false
    }
  ];

  window.games = [...window.games, ...additionalGames];

  window.games.push(
    {
      id: 'mr-bullet',
      title: 'Mr. Bullet',
      description: 'Precision shooting puzzle game with physics mechanics',
      category: 'puzzle',
      icon: 'ph-target',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/mr-bullet/game/index.html',
      featured: false
    },
    {
      id: 'drive-mad',
      title: 'Drive Mad',
      description: 'Extreme stunt driving game with realistic physics',
      category: 'racing',
      icon: 'ph-car',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/projects/drive-mad/index.html',
      featured: false
    },
    {
      id: 'pandemic-2',
      title: 'Pandemic 2',
      description: 'Create and spread a deadly virus to wipe out humanity',
      category: 'simulation',
      icon: 'ph-virus',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/projects/pandemic2/index.html',
      featured: false
    },
    {
      id: 'defend-the-tank',
      title: 'Defend the Tank',
      description: 'Protect your tank from waves of enemies in this defense game',
      category: 'action',
      icon: 'ph-army-tank',
      url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/projects/defend-the-tank/index.html',
      featured: false
    }
  );

  window.games.push({
    id: 'you-vs-skibidi-toilets',
    title: 'You vs 100 Skibidi Toilets',
    description: 'Battle against an army of Skibidi Toilets in this action-packed game',
    category: 'action',
    icon: 'ph-toilet',
    url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/skidibi/index.html',
    featured: false
  });

  window.games.push({
    id: 'mx-offroad-mountain-bike',
    title: 'MX OffRoad Mountain Bike',
    description: 'Thrilling mountain bike racing with challenging terrain and stunts',
    category: 'racing',
    icon: 'ph-bicycle',
    url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/mxoffroad/game.html',
    featured: false
  });

  window.games.push({
    id: 'portal',
    title: 'Portal Flash',
    description: 'Mind-bending puzzle game with teleportation portals',
    category: 'puzzle',
    icon: 'ph-circle-half',
    url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/projects/portalflash/index.html',
    featured: false
  });

  window.games.push({
    id: 'interactive-buddy',
    title: 'Interactive Buddy',
    description: 'Sandbox game where you interact with a ragdoll character',
    category: 'simulation',
    icon: 'ph-person-simple',
    url: 'https://d3rtzzzsiu7gdr.cloudfront.net/files/projects/interactivebuddy/index.html',
    featured: false
  });

  const ids = new Set();
  window.games = window.games.filter(game => {
    if (!game.id) return false;
    
    if (ids.has(game.id)) {
      game.id = `${game.id}-${Math.random().toString(36).substring(2, 7)}`;
    }
    
    ids.add(game.id);
    return true;
  });

  const clusterRush = window.games.find(game => game.id === 'cluster-rush');
  if (clusterRush) {
    clusterRush.url = 'https://d3rtzzzsiu7gdr.cloudfront.net/files/cluster-rush/index.html';
  }

  window.dispatchEvent(new Event('gamesDataReady'));
})();
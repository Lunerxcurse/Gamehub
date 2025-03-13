// Achievement system for GameHub Pro
(function() {
  class AchievementSystem {
    constructor() {
      this.achievements = [
        {
          id: 'first_game',
          title: 'First Steps',
          description: 'Play your first game',
          icon: 'ph-play',
          reward: 10,
          unlocked: false,
          secret: false
        },
        {
          id: 'game_explorer',
          title: 'Game Explorer',
          description: 'Play 5 different games',
          icon: 'ph-compass',
          reward: 25,
          unlocked: false,
          secret: false
        },
        {
          id: 'game_master',
          title: 'Game Master',
          description: 'Play 20 different games',
          icon: 'ph-crown',
          reward: 100,
          unlocked: false,
          secret: false
        },
        {
          id: 'daily_streak_3',
          title: 'Consistent Player',
          description: 'Log in for 3 days in a row',
          icon: 'ph-calendar-check',
          reward: 15,
          unlocked: false,
          secret: false
        },
        {
          id: 'daily_streak_7',
          title: 'Weekly Warrior',
          description: 'Log in for 7 days in a row',
          icon: 'ph-fire',
          reward: 50,
          unlocked: false,
          secret: false
        },
        {
          id: 'night_owl',
          title: 'Night Owl',
          description: 'Play games after midnight',
          icon: 'ph-moon-stars',
          reward: 20,
          unlocked: false,
          secret: true
        },
        {
          id: 'category_master',
          title: 'Category Master',
          description: 'Play games from all categories',
          icon: 'ph-stack',
          reward: 75,
          unlocked: false,
          secret: false
        },
        {
          id: 'social_butterfly',
          title: 'Social Butterfly',
          description: 'Share a game with friends',
          icon: 'ph-share-network',
          reward: 30,
          unlocked: false,
          secret: false
        },
        {
          id: 'customizer',
          title: 'Customizer',
          description: 'Change theme settings',
          icon: 'ph-paint-brush',
          reward: 15,
          unlocked: false,
          secret: false
        },
        {
          id: 'hidden_achievement',
          title: '???',
          description: 'Secret achievement',
          revealedTitle: 'Easter Egg Hunter',
          revealedDescription: 'Find the hidden easter egg',
          icon: 'ph-question',
          revealedIcon: 'ph-egg',
          reward: 50,
          unlocked: false,
          secret: true
        }
      ];
      
      this.stats = {
        totalGamesPlayed: 0,
        uniqueGamesPlayed: [],
        categoriesPlayed: [],
        totalPlayTime: 0,
        loginDays: [],
        currentStreak: 0,
        longestStreak: 0,
        points: 0,
        level: 1
      };
      
      this.init();
    }
    
    init() {
      // Load saved achievements and stats
      this.loadProgress();
      
      // Check for daily login
      this.checkDailyLogin();
      
      // Check for time-based achievements
      this.checkTimeBasedAchievements();
      
      // Setup listeners
      this.setupListeners();
    }
    
    loadProgress() {
      const savedAchievements = localStorage.getItem('gameHubAchievements');
      const savedStats = localStorage.getItem('gameHubStats');
      
      if (savedAchievements) {
        try {
          const parsed = JSON.parse(savedAchievements);
          this.achievements = this.achievements.map(achievement => {
            const saved = parsed.find(a => a.id === achievement.id);
            return saved ? { ...achievement, unlocked: saved.unlocked } : achievement;
          });
        } catch (error) {
          console.error('Error loading achievements:', error);
        }
      }
      
      if (savedStats) {
        try {
          this.stats = { ...this.stats, ...JSON.parse(savedStats) };
        } catch (error) {
          console.error('Error loading stats:', error);
        }
      }
    }
    
    saveProgress() {
      localStorage.setItem('gameHubAchievements', JSON.stringify(this.achievements));
      localStorage.setItem('gameHubStats', JSON.stringify(this.stats));
    }
    
    checkDailyLogin() {
      const today = new Date().toDateString();
      
      // If already logged in today, return
      if (this.stats.loginDays.includes(today)) return;
      
      // Add today to login days
      this.stats.loginDays.push(today);
      
      // Keep only last 30 days
      if (this.stats.loginDays.length > 30) {
        this.stats.loginDays = this.stats.loginDays.slice(-30);
      }
      
      // Calculate streak
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toDateString();
      
      if (this.stats.loginDays.includes(yesterdayString)) {
        this.stats.currentStreak++;
      } else {
        this.stats.currentStreak = 1;
      }
      
      // Update longest streak
      if (this.stats.currentStreak > this.stats.longestStreak) {
        this.stats.longestStreak = this.stats.currentStreak;
      }
      
      // Check streak achievements
      if (this.stats.currentStreak >= 3) {
        this.unlockAchievement('daily_streak_3');
      }
      
      if (this.stats.currentStreak >= 7) {
        this.unlockAchievement('daily_streak_7');
      }
      
      this.saveProgress();
    }
    
    checkTimeBasedAchievements() {
      const hour = new Date().getHours();
      
      // Night Owl achievement (between 12AM and 5AM)
      if (hour >= 0 && hour < 5) {
        this.unlockAchievement('night_owl');
      }
    }
    
    setupListeners() {
      // Listen for game plays
      document.addEventListener('gameOpened', (e) => {
        if (!e.detail || !e.detail.game) return;
        
        const game = e.detail.game;
        
        // Track total games played
        this.stats.totalGamesPlayed++;
        
        // Track unique games played
        if (!this.stats.uniqueGamesPlayed.includes(game.id)) {
          this.stats.uniqueGamesPlayed.push(game.id);
          
          // First game achievement
          if (this.stats.uniqueGamesPlayed.length === 1) {
            this.unlockAchievement('first_game');
          }
          
          // Game explorer achievement
          if (this.stats.uniqueGamesPlayed.length >= 5) {
            this.unlockAchievement('game_explorer');
          }
          
          // Game master achievement
          if (this.stats.uniqueGamesPlayed.length >= 20) {
            this.unlockAchievement('game_master');
          }
        }
        
        // Track categories played
        if (!this.stats.categoriesPlayed.includes(game.category)) {
          this.stats.categoriesPlayed.push(game.category);
          
          // Check for category master achievement
          const allCategories = ['arcade', 'action', 'racing', 'simulation', 'puzzle', 'sports', 'horror', 'io', 'idle'];
          const hasAllCategories = allCategories.every(category => 
            this.stats.categoriesPlayed.includes(category)
          );
          
          if (hasAllCategories) {
            this.unlockAchievement('category_master');
          }
        }
        
        this.saveProgress();
      });
      
      // Listen for theme changes
      document.addEventListener('themeChanged', () => {
        this.unlockAchievement('customizer');
        this.saveProgress();
      });
      
      // Listen for game shares
      document.addEventListener('gameShared', () => {
        this.unlockAchievement('social_butterfly');
        this.saveProgress();
      });
      
      // Track play time
      setInterval(() => {
        const gameModal = document.getElementById('gameModal');
        if (gameModal && gameModal.style.display === 'flex') {
          this.stats.totalPlayTime += 5;
          this.saveProgress();
        }
      }, 5000); // Every 5 seconds
    }
    
    unlockAchievement(id) {
      const achievement = this.achievements.find(a => a.id === id);
      
      if (!achievement || achievement.unlocked) return;
      
      // Unlock achievement
      achievement.unlocked = true;
      
      // Add points
      this.addPoints(achievement.reward);
      
      // Show notification
      window.showNotification(`Achievement Unlocked: ${achievement.title}! +${achievement.reward} points`, 'success');
      
      // Save progress
      this.saveProgress();
      
      // Update UI if it exists
      this.updateAchievementUI();
    }
    
    addPoints(points) {
      this.stats.points += points;
      
      // Calculate level (each level requires 100 points)
      const newLevel = Math.floor(this.stats.points / 100) + 1;
      
      // Check for level up
      if (newLevel > this.stats.level) {
        this.stats.level = newLevel;
        window.showNotification(`Leveled Up! You are now level ${newLevel}!`, 'success');
      }
      
      // Update UI
      this.updateStatsUI();
      this.saveProgress();
    }
    
    updateAchievementUI() {
      const achievementList = document.getElementById('achievementsList');
      if (!achievementList) return;
      
      achievementList.innerHTML = this.achievements.map(achievement => {
        // Skip secret achievements that aren't unlocked
        if (achievement.secret && !achievement.unlocked) {
          return `
            <div class="achievement-item secret">
              <div class="achievement-icon">
                <i class="ph ph-question"></i>
              </div>
              <div class="achievement-info">
                <h3>???</h3>
                <p>Secret achievement</p>
              </div>
              <div class="achievement-status">
                <i class="ph ph-lock"></i>
              </div>
            </div>
          `;
        }
        
        // Show unlocked or regular achievements
        return `
          <div class="achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}">
            <div class="achievement-icon">
              <i class="ph ${achievement.unlocked && achievement.revealedIcon ? achievement.revealedIcon : achievement.icon}"></i>
              ${achievement.unlocked ? `<span class="achievement-reward">+${achievement.reward}</span>` : ''}
            </div>
            <div class="achievement-info">
              <h3>${achievement.unlocked && achievement.revealedTitle ? achievement.revealedTitle : achievement.title}</h3>
              <p>${achievement.unlocked && achievement.revealedDescription ? achievement.revealedDescription : achievement.description}</p>
            </div>
            <div class="achievement-status">
              <i class="ph ${achievement.unlocked ? 'ph-check-circle' : 'ph-lock'}"></i>
            </div>
          </div>
        `;
      }).join('');
    }
    
    updateStatsUI() {
      // Update points and level display
      const pointsDisplay = document.getElementById('userPoints');
      const levelDisplay = document.getElementById('userLevel');
      const progressBar = document.getElementById('levelProgressBar');
      
      if (pointsDisplay) pointsDisplay.textContent = this.stats.points;
      if (levelDisplay) levelDisplay.textContent = this.stats.level;
      
      if (progressBar) {
        const levelProgress = this.stats.points % 100;
        progressBar.style.width = `${levelProgress}%`;
      }
      
      // Update stats in profile
      const gamesPlayedStat = document.getElementById('gamesPlayedStat');
      const uniqueGamesStat = document.getElementById('uniqueGamesStat');
      const categoriesPlayedStat = document.getElementById('categoriesPlayedStat');
      const playTimeStat = document.getElementById('playTimeStat');
      const streakStat = document.getElementById('streakStat');
      
      if (gamesPlayedStat) gamesPlayedStat.textContent = this.stats.totalGamesPlayed;
      if (uniqueGamesStat) uniqueGamesStat.textContent = this.stats.uniqueGamesPlayed.length;
      if (categoriesPlayedStat) categoriesPlayedStat.textContent = this.stats.categoriesPlayed.length;
      
      if (playTimeStat) {
        // Format play time
        const hours = Math.floor(this.stats.totalPlayTime / 3600);
        const minutes = Math.floor((this.stats.totalPlayTime % 3600) / 60);
        playTimeStat.textContent = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
      }
      
      if (streakStat) streakStat.textContent = `${this.stats.currentStreak} days`;
    }
    
    // Methods to be called from outside
    getStats() {
      return this.stats;
    }
    
    getAchievements() {
      return this.achievements;
    }
    
    getUnlockedAchievements() {
      return this.achievements.filter(a => a.unlocked);
    }
    
    getProgress() {
      const total = this.achievements.length;
      const unlocked = this.achievements.filter(a => a.unlocked).length;
      return {
        total,
        unlocked,
        percentage: Math.floor((unlocked / total) * 100)
      };
    }
  }
  
  // Initialize achievement system
  window.achievements = new AchievementSystem();
})();
(function() {
  if (window.Settings) return;

  class Settings {
    constructor() {
      try {
        this.originalTitle = document.title;
        this.originalIcon = this.getOriginalIcon();
        
        this.defaultSettings = {
          theme: {
            primary: '#7c3aed',
            background: '#0f0f13', 
            surface: '#1a1a1f'
          },
          hotkeys: {
            panic: 'Escape',
            fullscreen: 'F'
          },
          panicUrl: 'https://classroom.google.com',
          language: 'en'
        };
        
        this.translations = {
          en: {
            settings: 'Settings',
            themeColors: 'Theme Colors',
            primaryColor: 'Primary Color',
            backgroundColor: 'Background Color',
            surfaceColor: 'Surface Color',
            hotkeys: 'Hotkeys',
            panicKey: 'Panic Key (Quick Exit)',
            fullscreenKey: 'Fullscreen Key',
            panicUrl: 'Panic URL',
            tabCloak: 'Tab Cloak',
            cloakPresets: 'Cloak Presets',
            customTitle: 'Custom Title',
            customIcon: 'Custom Icon',
            language: 'Language',
            resetToDefault: 'Reset to Default',
            saveChanges: 'Save Changes',
            searchGames: 'Search games...',
            suggestGame: 'Suggest a Game',
            aiCopilot: 'AI Copilot',
            allGames: 'All Games',
            arcade: 'Arcade',
            action: 'Action',
            racing: 'Racing',
            simulation: 'Simulation',
            puzzle: 'Puzzle',
            sports: 'Sports',
            horror: 'Horror',
            ioGames: '.io Games'
          },
          es: {
            settings: 'Ajustes',
            themeColors: 'Colores del Tema',
            primaryColor: 'Color Primario',
            backgroundColor: 'Color de Fondo',
            surfaceColor: 'Color de Superficie',
            hotkeys: 'Teclas Rápidas',
            panicKey: 'Tecla de Pánico (Salida Rápida)',
            fullscreenKey: 'Tecla de Pantalla Completa',
            panicUrl: 'URL de Pánico',
            tabCloak: 'Camuflaje de Pestaña',
            cloakPresets: 'Preajustes de Camuflaje',
            customTitle: 'Título Personalizado',
            customIcon: 'Icono Personalizado',
            language: 'Idioma',
            resetToDefault: 'Restablecer Valores',
            saveChanges: 'Guardar Cambios',
            searchGames: 'Buscar juegos...',
            suggestGame: 'Sugerir un Juego',
            aiCopilot: 'Copiloto IA',
            allGames: 'Todos los Juegos',
            arcade: 'Arcade',
            action: 'Acción',
            racing: 'Carreras',
            simulation: 'Simulación',
            puzzle: 'Rompecabezas',
            sports: 'Deportes',
            horror: 'Terror',
            ioGames: 'Juegos .io'
          },
          fr: {
            settings: 'Paramètres',
            themeColors: 'Couleurs du Thème',
            primaryColor: 'Couleur Primaire',
            backgroundColor: 'Couleur de Fond',
            surfaceColor: 'Couleur de Surface',
            hotkeys: 'Raccourcis',
            panicKey: 'Touche Panique (Sortie Rapide)',
            fullscreenKey: 'Touche Plein Écran',
            panicUrl: 'URL de Panique',
            tabCloak: 'Camouflage Onglet',
            cloakPresets: 'Préréglages de Camouflage',
            customTitle: 'Titre Personnalisé',
            customIcon: 'Icône Personnalisée',
            language: 'Langue',
            resetToDefault: 'Réinitialiser',
            saveChanges: 'Enregistrer',
            searchGames: 'Rechercher des jeux...',
            suggestGame: 'Suggérer un Jeu',
            aiCopilot: 'Copilote IA',
            allGames: 'Tous les Jeux',
            arcade: 'Arcade',
            action: 'Action',
            racing: 'Course',
            simulation: 'Simulation',
            puzzle: 'Puzzle',
            sports: 'Sports',
            horror: 'Horreur',
            ioGames: 'Jeux .io'
          }
        };
        
        this.settings = this.loadSettings();
        this.initializeSettings();
        this.setupHotkeys();
        this.setupColorInputs();
        this.setupHotkeyInputs();
        this.setupLanguageSelector();
        this.applyLanguage(this.settings.language);

        // Add reset button listener
        const resetBtn = document.querySelector('.reset-btn');
        if (resetBtn) {
          resetBtn.addEventListener('click', () => this.resetSettings());
        }
      } catch (error) {
        console.error('Settings initialization error:', error);
      }
    }

    loadSettings() {
      const saved = localStorage.getItem('settings');
      return saved ? JSON.parse(saved) : {...this.defaultSettings};
    }

    saveSettings() {
      localStorage.setItem('settings', JSON.stringify(this.settings));
      this.applyTheme();
      this.applyLanguage(this.settings.language);
    }

    initializeSettings() {
      this.applyTheme();
      this.setupSettingsModal();
    }

    applyTheme() {
      const root = document.documentElement;
      Object.entries(this.settings.theme).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
        // Update color inputs
        const input = document.getElementById(`${key}Color`);
        if (input) input.value = value;
      });
    }

    setupColorInputs() {
      const colorInputs = ['primary', 'background', 'surface'].map(
        key => document.getElementById(`${key}Color`)
      );

      colorInputs.forEach(input => {
        if (!input) return;
        
        input.value = this.settings.theme[input.id.replace('Color', '')];
        
        input.addEventListener('change', (e) => {
          const key = e.target.id.replace('Color', '');
          this.settings.theme[key] = e.target.value;
          this.saveSettings();
        });
      });
    }

    setupHotkeyInputs() {
      const panicKeyInput = document.getElementById('panicKey');
      const fullscreenKeyInput = document.getElementById('fullscreenKey');
      const panicUrlInput = document.getElementById('panicUrl');

      if (panicKeyInput) {
        panicKeyInput.value = this.settings.hotkeys.panic;
        panicKeyInput.addEventListener('keydown', (e) => {
          e.preventDefault();
          this.settings.hotkeys.panic = e.key;
          panicKeyInput.value = e.key;
          this.saveSettings();
        });
      }

      if (fullscreenKeyInput) {
        fullscreenKeyInput.value = this.settings.hotkeys.fullscreen;
        fullscreenKeyInput.addEventListener('keydown', (e) => {
          e.preventDefault();
          this.settings.hotkeys.fullscreen = e.key;
          fullscreenKeyInput.value = e.key;
          this.saveSettings();
        });
      }

      if (panicUrlInput) {
        panicUrlInput.value = this.settings.panicUrl;
        panicUrlInput.addEventListener('change', (e) => {
          this.settings.panicUrl = e.target.value;
          this.saveSettings();
        });
      }
    }

    setupLanguageSelector() {
      const languageSelect = document.getElementById('languageSelect');
      if (languageSelect) {
        languageSelect.value = this.settings.language;
        languageSelect.addEventListener('change', (e) => {
          this.settings.language = e.target.value;
          this.saveSettings();
          this.applyLanguage(e.target.value);
        });
      }
    }

    applyLanguage(lang) {
      const translations = this.translations[lang] || this.translations.en;
      document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[key]) {
          element.textContent = translations[key];
        }
      });

      // Update placeholders
      const searchInput = document.getElementById('searchInput');
      const suggestGameBtn = document.getElementById('suggestGameBtn');
      const aiCopilotBtn = document.getElementById('aiCopilotBtn');

      if (searchInput) searchInput.placeholder = translations.searchGames;
      if (suggestGameBtn) suggestGameBtn.textContent = translations.suggestGame;
      if (aiCopilotBtn) aiCopilotBtn.textContent = translations.aiCopilot;

      // Update category buttons
      document.querySelectorAll('.categories button').forEach(button => {
        const category = button.getAttribute('data-category');
        const translationKey = category === 'all' ? 'allGames' : category;
        if (translations[translationKey]) {
          const icon = button.querySelector('i')?.outerHTML || '';
          button.innerHTML = `${icon} ${translations[translationKey]}`;
        }
      });
    }

    setupHotkeys() {
      document.addEventListener('keydown', (e) => {
        if (e.key === this.settings.hotkeys.panic) {
          window.open(this.settings.panicUrl, '_blank');
        }
        
        if (e.key.toLowerCase() === this.settings.hotkeys.fullscreen.toLowerCase()) {
          const gameFrame = document.getElementById('gameFrame');
          if (gameFrame && gameFrame.requestFullscreen) {
            gameFrame.requestFullscreen();
          }
        }
      });
    }

    setupSettingsModal() {
      const settingsBtn = document.createElement('button');
      settingsBtn.className = 'cloak-btn';
      settingsBtn.innerHTML = '<i class="ph ph-gear"></i> Settings';
      settingsBtn.onclick = () => document.getElementById('settingsModal').style.display = 'block';
      
      document.querySelector('.nav-controls')?.appendChild(settingsBtn);
    }

    resetSettings() {
      this.settings = JSON.parse(JSON.stringify(this.defaultSettings));
      localStorage.setItem('settings', JSON.stringify(this.settings));
      this.applyTheme();
      this.applyLanguage(this.settings.language);
      
      // Reset all inputs
      const colorInputs = ['primary', 'background', 'surface'];
      colorInputs.forEach(key => {
        const input = document.getElementById(`${key}Color`);
        if (input) {
          input.value = this.defaultSettings.theme[key];
        }
      });
      
      const panicKeyInput = document.getElementById('panicKey');
      const fullscreenKeyInput = document.getElementById('fullscreenKey');
      const panicUrlInput = document.getElementById('panicUrl');
      const languageSelect = document.getElementById('languageSelect');
      
      if (panicKeyInput) {
        panicKeyInput.value = this.defaultSettings.hotkeys.panic;
      }
      if (fullscreenKeyInput) {
        fullscreenKeyInput.value = this.defaultSettings.hotkeys.fullscreen;
      }
      if (panicUrlInput) {
        panicUrlInput.value = this.defaultSettings.panicUrl;
      }
      if (languageSelect) {
        languageSelect.value = this.defaultSettings.language;
      }
      
      alert('Settings have been reset to default values');
    }

    getOriginalIcon() {
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      return link.href;
    }
  }

  window.Settings = Settings;
})();
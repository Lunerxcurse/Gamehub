(function() {
  // Check if Settings is already defined to prevent redeclaration
  if (window.Settings) return;

  class Settings {
    constructor() {
      try {
        this.defaultSettings = {
          theme: {
            primary: '#7c3aed',
            secondary: '#5b21b6',
            background: '#0f0f13',
            surface: '#1a1a1f',
            surfaceHover: '#24242b',
            text: '#ffffff',
            textSecondary: '#94a3b8'
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
            language: 'Language',
            saveChanges: 'Save Changes',
            resetToDefault: 'Reset to Default'
          },
          es: {
            settings: 'Configuraciones',
            themeColors: 'Colores de Tema',
            primaryColor: 'Color Principal',
            backgroundColor: 'Color de Fondo',
            surfaceColor: 'Color de Superficie',
            hotkeys: 'Teclas de Acceso Rápido',
            panicKey: 'Tecla de Pánico (Salida Rápida)',
            fullscreenKey: 'Tecla de Pantalla Completa',
            panicUrl: 'URL de Pánico',
            tabCloak: 'Cloaking de Pestaña',
            language: 'Idioma',
            saveChanges: 'Guardar Cambios',
            resetToDefault: 'Restablecer a Predeterminado'
          },
          fr: {
            settings: 'Paramètres',
            themeColors: 'Couleurs du Thème',
            primaryColor: 'Couleur Principale',
            backgroundColor: 'Couleur de Fond',
            surfaceColor: 'Couleur de Surface',
            hotkeys: 'Touches de Raccourci',
            panicKey: 'Touche de Panique (Sortie Rapide)',
            fullscreenKey: 'Touche Plein Écran',
            panicUrl: 'URL de Panique',
            tabCloak: 'Masquage d\'Onglet',
            language: 'Langue',
            saveChanges: 'Enregistrer les Modifications',
            resetToDefault: 'Réinitialiser par Défaut'
          }
        };
        
        this.settings = this.loadSettings();
        this.initializeSettings();
        this.setupHotkeys();
        this.setupLanguageSelector();
      } catch (error) {
        console.error('Settings initialization error:', error);
      }
    }

    loadSettings() {
      const saved = localStorage.getItem('settings');
      const settings = saved ? JSON.parse(saved) : {...this.defaultSettings};
      
      this.applyTranslations(settings.language);
      
      return settings;
    }

    saveSettings() {
      localStorage.setItem('settings', JSON.stringify(this.settings));
      this.applyTheme();
    }

    initializeSettings() {
      this.applyTheme();
      this.setupSettingsModal();
    }

    applyTheme() {
      const root = document.documentElement;
      Object.entries(this.settings.theme).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
      });
    }

    setupHotkeys() {
      document.addEventListener('keydown', (e) => {
        if (e.key === this.settings.hotkeys.panic) {
          window.location.href = this.settings.panicUrl;
        }
        
        if (e.key.toLowerCase() === this.settings.hotkeys.fullscreen.toLowerCase()) {
          const gameFrame = document.getElementById('gameFrame');
          if (gameFrame) {
            if (gameFrame.requestFullscreen) {
              gameFrame.requestFullscreen();
            }
          }
        }
      });
    }

    setupSettingsModal() {
      const settingsBtn = document.createElement('button');
      settingsBtn.className = 'cloak-btn';
      settingsBtn.innerHTML = '<i class="ph ph-gear"></i> Settings';
      settingsBtn.onclick = () => document.getElementById('settingsModal').style.display = 'block';
      
      document.querySelector('.nav-controls').appendChild(settingsBtn);
    }

    setupLanguageSelector() {
      const languageSelect = document.getElementById('languageSelect');
      if (languageSelect) {
        languageSelect.value = this.settings.language || 'en';
        
        languageSelect.addEventListener('change', (e) => {
          this.updateLanguage(e.target.value);
        });
      }
    }

    updateTheme(color, value) {
      this.settings.theme[color] = value;
      this.saveSettings();
    }

    updateHotkey(action, key) {
      this.settings.hotkeys[action] = key;
      this.saveSettings();
    }

    updatePanicUrl(url) {
      this.settings.panicUrl = url;
      this.saveSettings();
    }

    resetSettings() {
      this.settings = {...this.defaultSettings};
      this.saveSettings();
    }

    updateLanguage(lang) {
      this.settings.language = lang;
      this.saveSettings();
      this.applyTranslations(lang);
    }

    applyTranslations(lang) {
      const translations = this.translations[lang] || this.translations['en'];
      
      document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        el.textContent = translations[key] || el.textContent;
      });

      const settingsTitle = document.querySelector('.modal-header h2');
      if (settingsTitle) settingsTitle.textContent = translations.settings;

      const saveBtn = document.querySelector('.settings-actions .save-btn');
      if (saveBtn) saveBtn.textContent = translations.saveChanges;

      const resetBtn = document.querySelector('.settings-actions .reset-btn');
      if (resetBtn) resetBtn.textContent = translations.resetToDefault;
    }
  }

  // Attach to window only if not already defined
  window.Settings = Settings;
})();
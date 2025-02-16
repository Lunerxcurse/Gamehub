(function() {
  // If TabCloak is already defined, don't redefine
  if (window.TabCloak) return;

  class TabCloak {
    constructor() {
      try {
        this.originalTitle = document.title;
        this.originalIcon = this.getOriginalIcon();
        
        this.setupCloakPresetListener();
        this.init();
      } catch (error) {
        console.error('TabCloak initialization error:', error);
      }
    }

    getOriginalIcon() {
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      return link.href;
    }

    setupCloakPresetListener() {
      const cloakPreset = document.getElementById('cloakPreset');
      const cloakTitle = document.getElementById('cloakTitle');
      const cloakIcon = document.getElementById('cloakIcon');

      if (cloakPreset) {
        cloakPreset.addEventListener('change', (e) => {
          const presets = {
            classroom: { title: 'Google Classroom', icon: 'ph-books' },
            docs: { title: 'Google Docs', icon: 'ph-file-doc' },
            drive: { title: 'Google Drive', icon: 'ph-chart-line' },
            calendar: { title: 'Calendar', icon: 'ph-calendar' }
          };
          const preset = presets[e.target.value];
          if (preset) {
            cloakTitle.value = preset.title;
            cloakIcon.value = preset.icon;
            this.setCloak(preset.title, preset.icon);
          }
        });
      }

      // Add event listeners for custom cloak inputs
      if (cloakTitle) {
        cloakTitle.addEventListener('change', () => {
          if (cloakTitle.value && cloakIcon.value) {
            this.setCloak(cloakTitle.value, cloakIcon.value);
          }
        });
      }

      if (cloakIcon) {
        cloakIcon.addEventListener('change', () => {
          if (cloakTitle.value && cloakIcon.value) {
            this.setCloak(cloakTitle.value, cloakIcon.value);
          }
        });
      }
    }

    setCloak(title, iconClass) {
      // Set page title
      document.title = title;

      // Create or update favicon
      let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      
      // Generate favicon from Phosphor icon
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="${this.getIconPath(iconClass)}"/></svg>`;
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      
      link.href = url;
      document.head.appendChild(link);

      // Save to localStorage
      localStorage.setItem('tabCloak', JSON.stringify({ title, iconClass }));
    }

    getIconPath(iconClass) {
      // Basic path mapping for common icons
      const paths = {
        'ph-books': 'M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48ZM32,64H224V96H32Zm0,128V112H224v80Z',
        'ph-file-doc': 'M200,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V40A16,16,0,0,0,200,24Zm0,192H56V40H200ZM80,84A12,12,0,0,1,92,72h72a12,12,0,0,1,0,24H92A12,12,0,0,1,80,84Zm0,44A12,12,0,0,1,92,116h72a12,12,0,0,1,0,24H92A12,12,0,0,1,80,128Zm0,44A12,12,0,0,1,92,160h72a12,12,0,0,1,0,24H92A12,12,0,0,1,80,172Z',
        'ph-chart-line': 'M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V200H224A8,8,0,0,1,232,208ZM224,72a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h48A8,8,0,0,1,224,72ZM96,136a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H88A8,8,0,0,1,96,136Zm64-32a8,8,0,0,1-8,8H104a8,8,0,0,1,0-16h48A8,8,0,0,1,160,104Z',
        'ph-calendar': 'M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM48,48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48ZM208,208H48V96H208V208Z'
      };
      return paths[iconClass] || paths['ph-file-doc'];
    }

    resetCloak() {
      document.title = this.originalTitle;
      let link = document.querySelector("link[rel*='icon']");
      if (link) link.href = this.originalIcon;
      localStorage.removeItem('tabCloak');
    }

    // Initialize cloak from localStorage if exists
    init() {
      const saved = localStorage.getItem('tabCloak');
      if (saved) {
        const { title, iconClass } = JSON.parse(saved);
        this.setCloak(title, iconClass);
      }
    }
  }

  // Expose TabCloak to the global window object
  window.TabCloak = TabCloak;

  // Initialize Tab Cloak on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    new TabCloak();
  });
})();
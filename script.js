document.addEventListener('DOMContentLoaded', () => {
    // Check if setup has been completed
    if (!localStorage.getItem('setupComplete')) {
        showSetupWizard();
    }
    
    // Wrap key initialization functions in try-catch blocks
    try {
        // Show login screen on page load
        const loginScreen = document.getElementById('loginScreen');
        if (loginScreen) {
            loginScreen.classList.add('active');
        }

        // Initialize time and date
        updateClock();
        setInterval(updateClock, 1000); // Update every second

        // Initialize Start Menu
        const startButton = document.getElementById('startButton');
        const startMenu = document.getElementById('startMenu');
        
        if (startButton && startMenu) {
            startButton.addEventListener('click', () => {
                startMenu.classList.toggle('active');
            });

            // Close start menu when clicking elsewhere
            document.addEventListener('click', (e) => {
                if (!startMenu.contains(e.target) && !startButton.contains(e.target)) {
                    startMenu.classList.remove('active');
                }
            });
        }

        // Safe function to add event listeners
        function safeAddEventListener(selector, event, callback) {
            const element = document.querySelector(selector);
            if (element) {
                element.addEventListener(event, callback);
            } else {
                console.warn(`Element not found: ${selector}`);
            }
        }

        // Initialize power menu
        initPowerMenu();

        // Initialize Desktop Icons
        const desktopIcons = document.querySelectorAll('.icon');
        
        desktopIcons.forEach(icon => {
            icon.addEventListener('dblclick', () => {
                const appName = icon.getAttribute('data-name');
                if (appName) {
                    openApp(appName);
                }
            });
        });

        // Initialize Taskbar Icons
        initTaskbarIcons();

        // Initialize File Explorer
        const fileExplorer = document.getElementById('fileExplorer');
        
        // Make windows draggable
        makeWindowsDraggable();

        // Initialize window controls
        initializeWindowControls();

        // Make desktop icons and taskbar icons sortable
        initSortable();

        // Initialize device settings
        initDeviceSettings();

        // Initialize Settings App
        const settingsApp = document.getElementById('settingsApp');
        settingsApp.addEventListener('click', () => {
            startMenu.classList.remove('active'); // Close start menu when opening settings
            openApp('Settings');
        });

        // Initialize Store App in the Start Menu
        const storeApp = document.querySelector('.app-item:nth-child(4)');
        if (storeApp) {
            storeApp.addEventListener('click', () => {
                startMenu.classList.remove('active');
                openApp('Store');
            });
        }

        // Initialize YouTube app
        const youtubeApp = document.getElementById('youtubeApp');
        if (youtubeApp) {
            youtubeApp.addEventListener('click', () => {
                startMenu.classList.remove('active');
                openApp('YouTube');
            });
        }
        
        // Initialize COD Zombies app
        const codZombiesApp = document.getElementById('codZombiesApp');
        if (codZombiesApp) {
            codZombiesApp.addEventListener('click', () => {
                startMenu.classList.remove('active');
                openApp('COD Zombies: Portable');
            });
        }

        // Initialize Minecraft app in store
        const minecraftApp = document.getElementById('minecraftApp');
        if (minecraftApp) {
            // Update the Minecraft icon in the store display
            minecraftApp.querySelector('.store-app-image').innerHTML = '<img src="/minecraft-icon-13.png" style="width: 80px; height: 80px;" alt="Minecraft">';
            
            minecraftApp.querySelector('.store-app-button').addEventListener('click', () => {
                const button = minecraftApp.querySelector('.store-app-button');
                if (button.textContent === 'Get') {
                    button.textContent = 'Installing...';
                    button.disabled = true;
                    
                    // Add loading animation
                    const progressBar = document.createElement('div');
                    progressBar.className = 'download-progress';
                    minecraftApp.querySelector('.store-app-info').appendChild(progressBar);
                    
                    // Simulate download progress
                    let progress = 0;
                    const interval = setInterval(() => {
                        progress += 5;
                        progressBar.style.width = `${progress}%`;
                        
                        if (progress >= 100) {
                            clearInterval(interval);
                            setTimeout(() => {
                                button.textContent = 'Open';
                                button.disabled = false;
                                progressBar.remove();
                                showSystemNotification('Minecraft has been installed!');
                                
                                // Add Minecraft to desktop with the image instead of svg
                                addAppToDesktop("Minecraft", "");
                            }, 500);
                        }
                    }, 150);
                    
                    showSystemNotification('Downloading Minecraft...');
                } else if (button.textContent === 'Open') {
                    openApp('Minecraft');
                }
            });
        }
        
        // Initialize COD Zombies app in store
        const codZombiesStoreApp = document.getElementById('codZombiesStoreApp');
        if (codZombiesStoreApp) {
            // Update the COD Zombies icon in the store display
            codZombiesStoreApp.querySelector('.store-app-image').innerHTML = '<img src="/Screenshot_2025-04-04_202904-removebg-preview.png" style="width: 80px; height: 80px;" alt="COD Zombies: Portable">';
            
            codZombiesStoreApp.querySelector('.store-app-button').addEventListener('click', () => {
                const button = codZombiesStoreApp.querySelector('.store-app-button');
                if (button.textContent === 'Get') {
                    button.textContent = 'Installing...';
                    button.disabled = true;
                    
                    // Add loading animation
                    const progressBar = document.createElement('div');
                    progressBar.className = 'download-progress';
                    codZombiesStoreApp.querySelector('.store-app-info').appendChild(progressBar);
                    
                    // Simulate download progress
                    let progress = 0;
                    const interval = setInterval(() => {
                        progress += 5;
                        progressBar.style.width = `${progress}%`;
                        
                        if (progress >= 100) {
                            clearInterval(interval);
                            setTimeout(() => {
                                button.textContent = 'Open';
                                button.disabled = false;
                                progressBar.remove();
                                showSystemNotification('COD Zombies: Portable has been installed!');
                                
                                // Add COD Zombies to desktop with specific icon
                                addAppToDesktop("COD Zombies: Portable", '');
                            }, 500);
                        }
                    }, 150);
                    
                    showSystemNotification('Downloading COD Zombies: Portable...');
                } else if (button.textContent === 'Open') {
                    openApp('COD Zombies: Portable');
                }
            });
        }

        // Initialize FNAF app in store
        const fnafStoreApp = document.getElementById('fnafStoreApp');
        if (fnafStoreApp) {
            // Update the FNAF icon in the store display
            fnafStoreApp.querySelector('.store-app-image').innerHTML = '<img src="/fnaf_1_logo_by_esoteriques_df2b7us-fullview-2719929492.jpg" style="width: 80px; height: 80px;" alt="Five Nights at Freddy\'s">';
            
            fnafStoreApp.querySelector('.store-app-button').addEventListener('click', () => {
                const button = fnafStoreApp.querySelector('.store-app-button');
                if (button.textContent === 'Get') {
                    button.textContent = 'Installing...';
                    button.disabled = true;
                    
                    // Add loading animation
                    const progressBar = document.createElement('div');
                    progressBar.className = 'download-progress';
                    fnafStoreApp.querySelector('.store-app-info').appendChild(progressBar);
                    
                    // Simulate download progress
                    let progress = 0;
                    const interval = setInterval(() => {
                        progress += 5;
                        progressBar.style.width = `${progress}%`;
                        
                        if (progress >= 100) {
                            clearInterval(interval);
                            setTimeout(() => {
                                button.textContent = 'Open';
                                button.disabled = false;
                                progressBar.remove();
                                showSystemNotification('Five Nights at Freddy\'s has been installed!');
                                
                                // Add FNAF to desktop with the image instead of svg
                                addAppToDesktop("Five Nights at Freddy's", "");
                            }, 500);
                        }
                    }, 150);
                    
                    showSystemNotification('Downloading Five Nights at Freddy\'s...');
                } else if (button.textContent === 'Open') {
                    openApp('Five Nights at Freddy\'s');
                }
            });
        }

        // Initialize user menu and login screen
        initUserMenu();

        // Fetch weather information
        fetchWeatherInfo();

        // Initialize Search functionality
        initSearch();

        // Initialize desktop selection
        initDesktopSelection();

        // Initialize context menu
        initContextMenu();

        // Initialize volume control
        const volumeIcon = document.getElementById('volumeIcon');
        const volumeSlider = document.getElementById('volumeSlider');
        const volumeSliderInner = document.getElementById('volumeSliderInner');
        
        // Create an audio context and oscillator for sound testing
        let audioContext = null;
        let oscillator = null;
        
        function initAudio() {
            if (audioContext) return;
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.type = 'sine';
            oscillator.frequency.value = 440;
            gainNode.gain.value = 0.1; // Low volume
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1); // Play for 0.1 seconds
        }
        
        volumeIcon.addEventListener('click', () => {
            volumeSlider.classList.toggle('active');
            // Play a short sound when clicking the volume icon
            initAudio();
        });
        
        volumeSlider.addEventListener('click', (e) => {
            const sliderWidth = volumeSlider.clientWidth;
            const clickX = e.offsetX;
            const volume = Math.min(Math.max(clickX / sliderWidth, 0), 1);
            volumeSliderInner.style.width = `${volume * 100}%`;
            
            // Play a test sound at the selected volume
            initAudio();
            if (audioContext) {
                const gainNode = audioContext.createGain();
                const oscillator = audioContext.createOscillator();
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                gainNode.gain.value = volume * 0.2; // Scale volume
                oscillator.frequency.value = 440;
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.1);
            }
            
            // Update volume icon based on level
            const volumeIconPath = volumeIcon.querySelector('svg path');
            if (volumeIconPath) {
                if (volume < 0.3) {
                    volumeIconPath.setAttribute('d', 'M7,9V15H11L16,20V4L11,9H7Z');
                } else if (volume < 0.7) {
                    volumeIconPath.setAttribute('d', 'M5,9V15H9L14,20V4L9,9H5M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z');
                } else {
                    volumeIconPath.setAttribute('d', 'M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z');
                }
            }
        });
        
        // Hide volume slider when clicking elsewhere
        document.addEventListener('click', (e) => {
            if (!volumeIcon.contains(e.target) && !volumeSlider.contains(e.target)) {
                volumeSlider.classList.remove('active');
            }
        });
    } catch (error) {
        console.error('Initialization error:', error);
        showSystemNotification('An error occurred during page load');
    }
});

async function fetchWeatherInfo() {
    const temperatureEl = document.getElementById('temperature');
    const locationEl = document.getElementById('location');

    try {
        // Use a free, simple weather API that doesn't require an API key
        const response = await fetch('https://ipapi.co/json/');
        const locationData = await response.json();
        
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${locationData.latitude}&longitude=${locationData.longitude}&current_weather=true`);
        const weatherData = await weatherResponse.json();

        const temperature = Math.round(weatherData.current_weather.temperature);
        
        temperatureEl.textContent = `${temperature}°C`;
        locationEl.textContent = locationData.city || 'Unknown Location';
    } catch (error) {
        console.error('Error fetching weather:', error);
        temperatureEl.textContent = '--°';
        locationEl.textContent = 'Unable to fetch';
    }
}

function updateClock() {
    const now = new Date();
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    
    timeElement.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    dateElement.textContent = now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    
    // Update login screen time too
    const loginTimeEl = document.getElementById('loginTime');
    const loginDateEl = document.getElementById('loginDate');
    
    if (loginTimeEl && loginDateEl) {
        loginTimeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        loginDateEl.textContent = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
    }
}

function openApp(appName) {
    try {
        // Deactivate existing active windows
        const activeWindows = document.querySelectorAll('.window.active');
        activeWindows.forEach(win => {
            win.classList.remove('active');
        });

        // Safely select and activate the specific app window
        function safeActivateWindow(windowId, taskbarSelector) {
            const window = document.getElementById(windowId);
            if (window) {
                activateWindow(window, taskbarSelector);
                
                // If it's a game window, ensure iframe is loaded
                const iframe = window.querySelector('iframe');
                if (iframe) {
                    // Add error handling for iframe
                    iframe.onerror = () => {
                        showSystemNotification(`Failed to load ${appName}`);
                    };
                }
            } else {
                console.warn(`Window not found: ${windowId}`);
                showSystemNotification(`Could not open ${appName}`);
            }
        }

        // Specific app opening logic with error handling
        switch(appName) {
            case 'File Explorer':
                safeActivateWindow('fileExplorer', '.taskbar-icon svg[d*="20,18H4V8H20"]');
                break;
            case 'Edge':
                const edgeWindow = document.getElementById('edgeWindow');
                const edgeIframe = document.getElementById('edgeIframe');
                if (edgeIframe) {
                    edgeIframe.src = 'https://swiftgaurd-com.pages.dev/'; 
                }
                safeActivateWindow('edgeWindow', '.taskbar-icon img');
                break;
            case 'Settings':
                safeActivateWindow('settingsWindow', '.taskbar-icon svg[d*="3,5H9V11H3V5M5,7V9H7V7H5M11,7H21V9H11V7"]');
                break;
            case 'Store':
                safeActivateWindow('storeWindow', '.taskbar-icon svg[d*="3,5H9V11H3V5M5,7V9H7V7H5M11,7H21V9H11V7"]');
                break;
            case 'YouTube':
                safeActivateWindow('youtubeWindow', '.taskbar-icon svg[d*="10,15L15.19,12L10,9V15M21.56,7.17"]');
                const youtubeIframe = document.getElementById('youtubeIframe');
                if (youtubeIframe) {
                    youtubeIframe.src = 'https://youtube-com.pages.dev/';
                }
                break;
            case 'Minecraft':
                safeActivateWindow('minecraftWindow', '.taskbar-icon svg[d*="4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1"]');
                const minecraftIframe = document.getElementById('minecraftIframe');
                if (minecraftIframe) {
                    minecraftIframe.src = 'https://eaglercraft.com/mc/1.8.8-wasm/';
                }
                break;
            case 'COD Zombies: Portable':
                safeActivateWindow('codZombiesWindow', '.taskbar-icon svg[d*="21,5C19.89,4.65 18.67,4.5 17.5,4.5C15.55"]');
                const codZombiesIframe = document.getElementById('codZombiesIframe');
                if (codZombiesIframe) {
                    codZombiesIframe.src = 'https://d3rtzzzsiu7gdr.cloudfront.net/files/nzp-gay/index.html';
                }
                break;
            case 'Five Nights at Freddy\'s':
                safeActivateWindow('fnafWindow', '.taskbar-icon svg[d*="12,3C7.58,3 4,4.79 4,7V17C4,19.21"]');
                const fnafIframe = document.getElementById('fnafIframe');
                if (fnafIframe) {
                    fnafIframe.src = 'https://run3.io/popgame/fnaf/fnaf1/';
                }
                break;
            // ... other cases remain the same ...
        }
    } catch (error) {
        console.error(`Error opening ${appName}:`, error);
        showSystemNotification(`Failed to open ${appName}`);
    }
}

function activateWindow(windowElement, taskbarIconSelector) {
    windowElement.classList.add('active');
    windowElement.style.left = '100px';
    windowElement.style.top = '50px';

    // Activate corresponding taskbar icon
    const taskbarIcons = document.querySelectorAll('.taskbar-icon');
    taskbarIcons.forEach(icon => {
        const svg = icon.querySelector('svg path');
        if (svg && svg.getAttribute('d').includes(taskbarIconSelector.split('[d*="')[1].split('"]')[0])) {
            icon.classList.add('active');
        }
    });
}

function initTaskbarIcons() {
    const taskbarIcons = document.querySelectorAll('.taskbar-icon');
    
    taskbarIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const svgPath = icon.querySelector('svg path').getAttribute('d');
            
            // File Explorer
            if (svgPath.includes('20,18H4V8H20')) {
                toggleWindow('fileExplorer', icon);
            } 
            // Edge
            else if (svgPath.includes('21.86,12.5C21.1,11.63')) {
                toggleWindow('edgeWindow', icon);
            }
        });
    });
}

function toggleWindow(windowId, taskbarIcon) {
    const window = document.getElementById(windowId);
    
    if (windowId === 'edgeWindow') {
        const edgeIframe = document.getElementById('edgeIframe');
        edgeIframe.src = 'https://swiftgaurd-com.pages.dev/'; 
    }

    if (window.classList.contains('active')) {
        window.classList.remove('active');
        taskbarIcon.classList.remove('active');
    } else {
        // First deactivate all windows
        const activeWindows = document.querySelectorAll('.window.active');
        activeWindows.forEach(win => win.classList.remove('active'));
        
        // Deactivate all taskbar icons
        const taskbarIcons = document.querySelectorAll('.taskbar-icon');
        taskbarIcons.forEach(icon => icon.classList.remove('active'));
        
        // Activate this window and its icon
        window.classList.add('active');
        taskbarIcon.classList.add('active');
        
        // Position the window
        window.style.left = '100px';
        window.style.top = '50px';
    }
}

function initPowerMenu() {
    const powerButton = document.querySelector('.power-button');
    const powerMenu = document.getElementById('powerMenu');
    const powerOff = document.getElementById('powerOff');
    const restart = document.getElementById('restart');
    
    powerButton.addEventListener('click', (e) => {
        e.stopPropagation();
        powerMenu.classList.toggle('active');
    });
    
    document.addEventListener('click', (e) => {
        if (!powerMenu.contains(e.target) && !powerButton.contains(e.target)) {
            powerMenu.classList.remove('active');
        }
    });
    
    powerOff.addEventListener('click', () => {
        showSystemNotification('Shutting down...');
        setTimeout(() => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 2s';
        }, 1000);
    });
    
    restart.addEventListener('click', () => {
        showSystemNotification('Restarting...');
        setTimeout(() => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 1s';
            setTimeout(() => {
                document.body.style.opacity = '1';
                showSystemNotification('System restarted');
            }, 2000);
        }, 1000);
    });
}

function showSystemNotification(message) {
    try {
        const notification = document.createElement('div');
        notification.classList.add('system-notification');
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Use requestAnimationFrame to ensure proper DOM insertion
        requestAnimationFrame(() => {
            notification.classList.add('show');
            
            // Ensure removal even if something goes wrong
            setTimeout(() => {
                try {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                } catch (removeError) {
                    console.error('Error removing notification:', removeError);
                }
            }, 2000);
        });
    } catch (error) {
        // Fallback error logging
        console.error('Failed to show system notification:', error);
        alert(message);  // Last resort fallback
    }
}

function makeWindowsDraggable() {
    const windows = document.querySelectorAll('.window');
    
    windows.forEach(win => {
        const header = win.querySelector('.window-header');
        
        let isDragging = false;
        let offsetX, offsetY;
        
        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - win.getBoundingClientRect().left;
            offsetY = e.clientY - win.getBoundingClientRect().top;
            
            // Bring the window to front
            windows.forEach(w => {
                w.style.zIndex = "10";
            });
            win.style.zIndex = "20";
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            win.style.left = `${e.clientX - offsetX}px`;
            win.style.top = `${e.clientY - offsetY}px`;
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    });
}

function initializeWindowControls() {
    const windows = document.querySelectorAll('.window');
    
    windows.forEach(win => {
        const minimizeBtn = win.querySelector('.minimize');
        const maximizeBtn = win.querySelector('.maximize');
        const closeBtn = win.querySelector('.close');
        
        closeBtn.addEventListener('click', () => {
            win.classList.remove('active');
            
            // Specific handling for game windows to stop sounds
            if (win.id === 'minecraftWindow' || 
                win.id === 'codZombiesWindow' || 
                win.id === 'fnafWindow') {
                
                // Reset iframe source to stop sounds and interactions
                const iframe = win.querySelector('iframe');
                if (iframe) {
                    iframe.src = 'about:blank';
                }
            }
            
            // Deactivate the corresponding taskbar icon
            if (win.id === 'fileExplorer') {
                const taskbarIcons = document.querySelectorAll('.taskbar-icon');
                taskbarIcons.forEach(icon => {
                    if (icon.querySelector('svg path').getAttribute('d').includes('20,18H4V8H20')) {
                        icon.classList.remove('active');
                    }
                });
            }
        });
        
        minimizeBtn.addEventListener('click', () => {
            win.classList.remove('active');
        });
        
        maximizeBtn.addEventListener('click', () => {
            if (win.style.width === '100vw') {
                win.style.width = '800px';
                win.style.height = '600px';
                win.style.top = '50px';
                win.style.left = '100px';
                win.style.borderRadius = '8px';
            } else {
                win.style.width = '100vw';
                win.style.height = `calc(100vh - var(--taskbar-height))`;
                win.style.top = '0';
                win.style.left = '0';
                win.style.borderRadius = '0';
            }
        });
    });
}

const Sortable = window.Sortable;

function initSortable() {
    // Make desktop icons sortable
    new Sortable(document.querySelector('.desktop-icons'), {
        animation: 150,
        ghostClass: 'sortable-ghost'
    });
    
    // Make taskbar icons sortable
    new Sortable(document.getElementById('taskbarIcons'), {
        animation: 150,
        direction: 'horizontal'
    });
}

function initDeviceSettings() {
    // Brightness control
    const brightnessSlider = document.querySelector('.settings-group:nth-child(1) .settings-item:nth-child(1) input[type="range"]');
    if (brightnessSlider) {
        brightnessSlider.value = 100; // Default value
        brightnessSlider.addEventListener('input', (e) => {
            const brightness = e.target.value;
            document.body.style.filter = `brightness(${brightness / 100})`;
            localStorage.setItem('brightness', brightness);
            showSystemNotification(`Brightness: ${brightness}%`);
        });
        
        // Load saved brightness
        const savedBrightness = localStorage.getItem('brightness');
        if (savedBrightness) {
            brightnessSlider.value = savedBrightness;
            document.body.style.filter = `brightness(${savedBrightness / 100})`;
        }
    }

    // Night light toggle
    const nightLightToggle = document.querySelector('.settings-group:nth-child(1) .settings-item:nth-child(2) input[type="checkbox"]');
    if (nightLightToggle) {
        nightLightToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.style.filter = document.body.style.filter + ' sepia(30%)';
                localStorage.setItem('nightLight', 'on');
                showSystemNotification('Night light: On');
            } else {
                document.body.style.filter = document.body.style.filter.replace(' sepia(30%)', '');
                localStorage.setItem('nightLight', 'off');
                showSystemNotification('Night light: Off');
            }
        });
        
        // Load saved night light setting
        if (localStorage.getItem('nightLight') === 'on') {
            nightLightToggle.checked = true;
            document.body.style.filter = document.body.style.filter + ' sepia(30%)';
        }
    }

    // Volume control
    const volumeSlider = document.querySelector('.settings-group:nth-child(2) .settings-item:nth-child(1) input[type="range"]');
    if (volumeSlider) {
        volumeSlider.value = 50; // Default value
        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value;
            localStorage.setItem('volume', volume);
            
            // Update volume icon
            const volumeIcon = document.querySelector('.volume-icon svg path');
            if (volumeIcon) {
                if (volume < 30) {
                    volumeIcon.setAttribute('d', 'M7,9V15H11L16,20V4L11,9H7Z');
                } else if (volume < 70) {
                    volumeIcon.setAttribute('d', 'M5,9V15H9L14,20V4L9,9H5M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z');
                } else {
                    volumeIcon.setAttribute('d', 'M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z');
                }
            }
            
            showSystemNotification(`Volume: ${volume}%`);
        });
        
        // Load saved volume
        const savedVolume = localStorage.getItem('volume');
        if (savedVolume) {
            volumeSlider.value = savedVolume;
            // Update the volume icon to match saved setting
            const volumeIcon = document.querySelector('.volume-icon svg path');
            if (volumeIcon) {
                if (savedVolume < 30) {
                    volumeIcon.setAttribute('d', 'M7,9V15H11L16,20V4L11,9H7Z');
                } else if (savedVolume < 70) {
                    volumeIcon.setAttribute('d', 'M5,9V15H9L14,20V4L9,9H5M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z');
                } else {
                    volumeIcon.setAttribute('d', 'M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z');
                }
            }
        }
    }

    // Sound scheme dropdown
    const soundSchemeSelect = document.querySelector('.settings-group:nth-child(2) .settings-item:nth-child(2) select');
    if (soundSchemeSelect) {
        soundSchemeSelect.addEventListener('change', (e) => {
            const selectedScheme = e.target.value;
            localStorage.setItem('soundScheme', selectedScheme);
            showSystemNotification(`Sound scheme changed to: ${selectedScheme}`);
        });
        
        // Load saved sound scheme
        const savedSoundScheme = localStorage.getItem('soundScheme');
        if (savedSoundScheme) {
            soundSchemeSelect.value = savedSoundScheme;
        }
    }

    // Power mode dropdown
    const powerModeSelect = document.querySelector('.settings-group:nth-child(3) select');
    if (powerModeSelect) {
        powerModeSelect.addEventListener('change', (e) => {
            const selectedMode = e.target.value;
            localStorage.setItem('powerMode', selectedMode);
            
            if (selectedMode === 'Battery saver') {
                document.body.style.filter = document.body.style.filter + ' brightness(0.8)';
                showSystemNotification('Power mode: Battery saver');
            } else if (selectedMode === 'Best performance') {
                document.body.style.filter = document.body.style.filter.replace(' brightness(0.8)', '');
                document.body.style.filter = document.body.style.filter + ' brightness(1.1)';
                showSystemNotification('Power mode: Best performance');
            } else {
                document.body.style.filter = document.body.style.filter.replace(' brightness(0.8)', '');
                document.body.style.filter = document.body.style.filter.replace(' brightness(1.1)', '');
                showSystemNotification('Power mode: Balanced');
            }
        });
        
        // Load saved power mode
        const savedPowerMode = localStorage.getItem('powerMode');
        if (savedPowerMode) {
            powerModeSelect.value = savedPowerMode;
            if (savedPowerMode === 'Battery saver') {
                document.body.style.filter = document.body.style.filter + ' brightness(0.8)';
            } else if (savedPowerMode === 'Best performance') {
                document.body.style.filter = document.body.style.filter + ' brightness(1.1)';
            }
        }
    }

    // Settings navigation
    const navItems = document.querySelectorAll('.settings-nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            showSystemNotification(`Navigated to: ${item.querySelector('span').textContent}`);
        });
    });
}

function initUserMenu() {
    const userProfile = document.getElementById('userProfile');
    const userMenu = document.getElementById('userMenu');
    const lockAccount = document.getElementById('lockAccount');
    const signOut = document.getElementById('signOut');
    const loginScreen = document.getElementById('loginScreen');
    const loginPassword = document.getElementById('loginPassword');
    
    userProfile.addEventListener('click', (e) => {
        e.stopPropagation();
        userMenu.classList.toggle('active');
    });
    
    document.addEventListener('click', (e) => {
        if (!userMenu.contains(e.target) && !userProfile.contains(e.target)) {
            userMenu.classList.remove('active');
        }
    });
    
    lockAccount.addEventListener('click', () => {
        showLoginScreen();
    });
    
    signOut.addEventListener('click', () => {
        showLoginScreen();
    });
    
    const userPin = localStorage.getItem('userPin');
    if (userPin) {
        loginPassword.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                if (loginPassword.value === userPin) {
                    hideLoginScreen();
                } else {
                    const pinHint = localStorage.getItem('pinHint');
                    showSystemNotification(pinHint ? `Incorrect PIN. Hint: ${pinHint}` : 'Incorrect PIN');
                    loginPassword.value = '';
                }
            }
        });
    } else {
        loginPassword.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                hideLoginScreen();
                loginPassword.value = '';
            }
        });
    }
    
    // Update login screen time
    function updateLoginClock() {
        const now = new Date();
        const loginTimeEl = document.getElementById('loginTime');
        const loginDateEl = document.getElementById('loginDate');
        
        if (loginTimeEl && loginDateEl) {
            loginTimeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            loginDateEl.textContent = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
        }
    }
    
    function showLoginScreen() {
        updateLoginClock();
        const startMenu = document.getElementById('startMenu');
        startMenu.classList.remove('active');
        userMenu.classList.remove('active');
        loginScreen.classList.add('active');
        setTimeout(() => {
            loginPassword.focus();
        }, 500);
    }
    
    function hideLoginScreen() {
        loginScreen.classList.remove('active');
        loginPassword.value = '';
    }
    
    // Initialize login screen time
    updateLoginClock();
    setInterval(updateLoginClock, 60000);
}

function addAppToDesktop(appName, svgPath) {
    const desktopIcons = document.querySelector('.desktop-icons');
    
    // Check if the app is already installed
    const existingApp = Array.from(desktopIcons.querySelectorAll('.icon')).find(
        icon => icon.getAttribute('data-name') === appName
    );
    
    if (!existingApp) {
        const appIcon = document.createElement('div');
        appIcon.className = 'icon';
        appIcon.setAttribute('data-name', appName);
        
        if (appName === 'Minecraft') {
            appIcon.innerHTML = `
                <img src="/minecraft-icon-13.png" class="icon-svg" alt="Minecraft">
                <span>${appName}</span>
            `;
        } else if (appName === 'COD Zombies: Portable') {
            appIcon.innerHTML = `
                <img src="/Screenshot_2025-04-04_202904-removebg-preview.png" class="icon-svg" alt="COD Zombies: Portable">
                <span>${appName}</span>
            `;
        } else if (appName === 'Five Nights at Freddy\'s') {
            appIcon.innerHTML = `
                <img src="/fnaf_1_logo_by_esoteriques_df2b7us-fullview-2719929492.jpg" class="icon-svg" alt="Five Nights at Freddy's">
                <span>${appName}</span>
            `;
        } else {
            appIcon.innerHTML = `
                <svg viewBox="0 0 24 24" class="icon-svg">
                    ${svgPath}
                </svg>
                <span>${appName}</span>
            `;
        }
        
        desktopIcons.appendChild(appIcon);
        
        // Add double-click event listener
        appIcon.addEventListener('dblclick', () => {
            openApp(appName);
        });
        
        // Make desktop icons sortable again to include the new icon
        initSortable();
    }
}

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    // List of apps for search
    const apps = [
        { name: 'File Explorer', icon: '<path d="M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z" fill="#FFB900"/>' },
        { name: 'Edge', isImage: true, imgSrc: '/ChatGPT Image Apr 4, 2025, 09_11_49 PM.png' },
        { name: 'Settings', icon: '<path d="M3,5H9V11H3V5M5,7V9H7V7H5M11,7H21V9H11V7M11,15H21V17H11V15M5,13V15H7V13H5M3,13H9V19H3V13Z" fill="#0078D7"/>' },
        { name: 'Store', icon: '<path d="M3,5H9V11H3V5M5,7V9H7V7H5M11,7H21V9H11V7M11,15H21V17H11V15M5,13V15H7V13H5M3,13H9V19H3V13Z" fill="#7F7F7F"/>' },
        { name: 'YouTube', icon: '<path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" fill="#FF0000"/>' },
        { name: 'Minecraft', isImage: true },
        { name: 'COD Zombies: Portable', icon: '<path d="M21,5C19.89,4.65 18.67,4.5 17.5,4.5C15.55,4.5 13.45,4.9 12,6C10.55,4.9 8.45,4.5 6.5,4.5C4.55,4.5 2.45,4.9 1,6V20.65C1,20.9 1.25,21.15 1.5,21.15C1.6,21.15 1.65,21.1 1.75,21.1C3.1,20.45 5.05,20 6.5,20C8.45,20 10.55,20.4 12,21.5C13.35,20.65 15.8,20 17.5,20C19.15,20 20.85,20.3 22.25,21.05C22.35,21.1 22.4,21.1 22.5,21.1C22.75,21.1 23,20.85 23,20.6V6C22.4,5.55 21.75,5.25 21,5M21,18.5C19.9,18.15 18.7,18 17.5,18C15.8,18 13.35,18.65 12,19.5V8C13.35,7.15 15.8,6.5 17.5,6.5C18.7,6.5 19.9,6.65 21,7V18.5Z" fill="#aa3333"/>' },
        { name: 'Five Nights at Freddy\'s', icon: '<path d="M12,3C7.58,3 4,4.79 4,7V17C4,19.21 7.59,21 12,21C16.41,21 20,19.21 20,17V7C20,4.79 16.42,3 12,3M12,5C16.08,5 18,6.37 18,7C18,7.63 16.08,9 12,9C7.92,9 6,7.63 6,7C6,6.37 7.92,5 12,5M6,9.12C7.47,9.67 9.61,10 12,10C14.39,10 16.53,9.67 18,9.12V12.41C17.38,12.18 16.64,12 15.85,12C13.18,12 11.87,13.6 10.42,15.36C9.38,16.67 8.88,17 7.65,17C6.09,17 6,15.37 6,15.37V9.12M18,14.09V16C18,16.65 16.17,18 12,18C7.83,18 6,16.65 6,16V15.36C6.64,15.67 7.14,15.91 8.08,15.91C9.89,15.91 10.56,15.28 11.89,13.6C13.16,12 14.23,10 16.15,10C16.83,10 17.45,10.03 18,10.09V14.09Z" fill="#AA0000"/>' }
    ];
    
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        // Clear previous results
        searchResults.innerHTML = '';
        
        if (searchTerm === '') {
            searchResults.classList.remove('show');
            return;
        }
        
        // Filter apps based on search term
        const filteredApps = apps.filter(app => 
            app.name.toLowerCase().includes(searchTerm)
        );
        
        if (filteredApps.length > 0) {
            searchResults.classList.add('show');
            
            // Create result items
            filteredApps.forEach(app => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                
                if (app.isImage) {
                    if (app.name === 'Edge') {
                        resultItem.innerHTML = `
                            <img src="${app.imgSrc}" style="width: 16px; height: 16px;">
                            <span>${app.name}</span>
                        `;
                    } else if (app.name === 'Minecraft') {
                        resultItem.innerHTML = `
                            <img src="/minecraft-icon-13.png" style="width: 16px; height: 16px;">
                            <span>${app.name}</span>
                        `;
                    }
                } else {
                    resultItem.innerHTML = `
                        <svg viewBox="0 0 24 24">${app.icon}</svg>
                        <span>${app.name}</span>
                    `;
                }
                
                // Add click event to open the app
                resultItem.addEventListener('click', () => {
                    openApp(app.name);
                    searchInput.value = '';
                    searchResults.classList.remove('show');
                });
                
                searchResults.appendChild(resultItem);
            });
        } else {
            searchResults.classList.remove('show');
        }
    });
    
    // Hide search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('show');
        }
    });
    
    // Hide search results when pressing Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchResults.classList.remove('show');
        }
    });
}

function initDesktopSelection() {
    const desktop = document.querySelector('.desktop');
    let isSelecting = false;
    let startX, startY;
    let selectionBox;

    desktop.addEventListener('mousedown', (e) => {
        // Only start selection if not clicking on an icon or other interactive element
        if (e.target === desktop) {
            isSelecting = true;
            startX = e.clientX;
            startY = e.clientY;

            // Create selection box
            selectionBox = document.createElement('div');
            selectionBox.classList.add('desktop-selection-box');
            selectionBox.style.left = `${startX}px`;
            selectionBox.style.top = `${startY}px`;
            desktop.appendChild(selectionBox);
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (!isSelecting) return;

        const currentX = e.clientX;
        const currentY = e.clientY;

        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);
        const left = Math.min(startX, currentX);
        const top = Math.min(startY, currentY);

        selectionBox.style.width = `${width}px`;
        selectionBox.style.height = `${height}px`;
        selectionBox.style.left = `${left}px`;
        selectionBox.style.top = `${top}px`;

        // Select icons within the selection box
        const desktopIcons = document.querySelectorAll('.icon');
        desktopIcons.forEach(icon => {
            const iconRect = icon.getBoundingClientRect();
            const selectionRect = selectionBox.getBoundingClientRect();

            const isOverlapping = 
                iconRect.left < selectionRect.right &&
                iconRect.right > selectionRect.left &&
                iconRect.top < selectionRect.bottom &&
                iconRect.bottom > selectionRect.top;

            if (isOverlapping) {
                icon.classList.add('selected');
            } else {
                icon.classList.remove('selected');
            }
        });
    });

    document.addEventListener('mouseup', () => {
        if (!isSelecting) return;

        isSelecting = false;
        if (selectionBox) {
            selectionBox.remove();
        }
    });
}

function initContextMenu() {
    const desktop = document.querySelector('.desktop');
    let contextMenu = null;
    
    // Create context menu element
    function createContextMenu() {
        if (document.querySelector('.context-menu')) {
            document.querySelector('.context-menu').remove();
        }
        
        const menu = document.createElement('div');
        menu.className = 'context-menu';
        
        menu.innerHTML = `
            <div class="context-menu-item" id="sortByMenuItem">
                <svg viewBox="0 0 24 24">
                    <path d="M3,13H15V11H3M3,6V8H21V6M3,18H9V16H3V18Z" fill="currentColor"/>
                </svg>
                <span>Sort by</span>
            </div>
            <div class="context-menu-item" id="refreshMenuItem">
                <svg viewBox="0 0 24 24">
                    <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" fill="currentColor"/>
                </svg>
                <span>Refresh</span>
            </div>
            <div class="context-menu-separator"></div>
            <div class="context-menu-item" id="newMenuItem">
                <svg viewBox="0 0 24 24">
                    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
                </svg>
                <span>New</span>
            </div>
            <div class="context-menu-separator"></div>
            <div class="context-menu-item" id="displaySettingsMenuItem">
                <svg viewBox="0 0 24 24">
                    <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" fill="currentColor"/>
                </svg>
                <span>Display settings</span>
            </div>
            <div class="context-menu-item" id="personalizeMenuItem">
                <svg viewBox="0 0 24 24">
                    <path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" fill="currentColor"/>
                </svg>
                <span>Personalize</span>
            </div>
        `;
        
        document.body.appendChild(menu);
        contextMenu = menu;
        
        // Add event listeners to menu items
        document.getElementById('sortByMenuItem').addEventListener('click', () => {
            showSystemNotification('Sort options');
            hideContextMenu();
        });
        
        document.getElementById('refreshMenuItem').addEventListener('click', () => {
            showSystemNotification('Refreshing desktop...');
            hideContextMenu();
            
            // Show loading animation
            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'loading-overlay';
            loadingOverlay.innerHTML = `
                <div class="loading-spinner"></div>
            `;
            document.body.appendChild(loadingOverlay);
            
            // Simulate refresh action
            setTimeout(() => {
                loadingOverlay.remove();
                showSystemNotification('Desktop refreshed');
            }, 1500);
        });
        
        document.getElementById('newMenuItem').addEventListener('click', () => {
            showSystemNotification('New item options');
            hideContextMenu();
        });
        
        document.getElementById('displaySettingsMenuItem').addEventListener('click', () => {
            openApp('Settings');
            hideContextMenu();
        });
        
        document.getElementById('personalizeMenuItem').addEventListener('click', () => {
            openPersonalizationPanel();
            hideContextMenu();
        });
    }
    
    function showContextMenu(x, y) {
        if (!contextMenu) {
            createContextMenu();
        }
        
        // Position the menu
        contextMenu.style.left = `${x}px`;
        contextMenu.style.top = `${y}px`;
        
        // Make sure the menu doesn't go off-screen
        const menuRect = contextMenu.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        if (menuRect.right > windowWidth) {
            contextMenu.style.left = `${windowWidth - menuRect.width}px`;
        }
        
        if (menuRect.bottom > windowHeight) {
            contextMenu.style.top = `${windowHeight - menuRect.height}px`;
        }
        
        // Show the menu
        contextMenu.classList.add('active');
    }
    
    function hideContextMenu() {
        if (contextMenu) {
            contextMenu.classList.remove('active');
        }
    }
    
    // Show context menu on right-click
    desktop.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showContextMenu(e.clientX, e.clientY);
    });
    
    // Also add context menu for desktop icons
    const desktopIcons = document.querySelector('.desktop-icons');
    desktopIcons.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showContextMenu(e.clientX, e.clientY);
    });
    
    // Hide context menu when clicking elsewhere
    document.addEventListener('click', () => {
        hideContextMenu();
    });
    
    // Hide context menu when pressing Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideContextMenu();
        }
    });
}

// Add personalization panel
function openPersonalizationPanel() {
    // Remove existing panel if it exists
    if (document.querySelector('.personalize-panel')) {
        document.querySelector('.personalize-panel').remove();
    }
    
    const panel = document.createElement('div');
    panel.className = 'personalize-panel';
    
    panel.innerHTML = `
        <div class="personalize-header">
            <h2>Personalize</h2>
            <button class="close-button">×</button>
        </div>
        <div class="personalize-content">
            <div class="personalize-section">
                <h3>Background</h3>
                <div class="background-options">
                    <div class="background-option" data-bg="https://images.unsplash.com/photo-1546587348-d12660c30c50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2luZG93cyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1920&q=80">
                        <img src="https://images.unsplash.com/photo-1546587348-d12660c30c50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2luZG93cyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=120&q=80" alt="Default">
                    </div>
                    <div class="background-option" data-bg="https://images.unsplash.com/photo-1506744038136-46dc5dd0d370?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80">
                        <img src="https://images.unsplash.com/photo-1506744038136-46dc5dc5d370?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80" alt="Mountains">
                    </div>
                    <div class="background-option" data-bg="https://images.unsplash.com/photo-1554147090-e1221a04a025?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80">
                        <img src="https://images.unsplash.com/photo-1554147090-e1221a04a025?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80" alt="Ocean">
                    </div>
                    <div class="background-option" data-bg="https://images.unsplash.com/photo-1497796742626-fe30f204ec54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80">
                        <img src="https://images.unsplash.com/photo-1497796742626-fe30f204ec54?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80" alt="Forest">
                    </div>
                </div>
            </div>
            <div class="personalize-section">
                <h3>Mouse Cursor</h3>
                <div class="cursor-options">
                    <div class="cursor-option" data-cursor="default">
                        <div class="cursor-preview default-cursor"></div>
                        <span>Default</span>
                    </div>
                    <div class="cursor-option" data-cursor="pointer">
                        <div class="cursor-preview pointer-cursor"></div>
                        <span>Pointer</span>
                    </div>
                    <div class="cursor-option" data-cursor="crosshair">
                        <div class="cursor-preview crosshair-cursor"></div>
                        <span>Crosshair</span>
                    </div>
                    <div class="cursor-option" data-cursor="text">
                        <div class="cursor-preview text-cursor"></div>
                        <span>Text</span>
                    </div>
                </div>
            </div>
            <div class="personalize-section">
                <h3>UI Theme</h3>
                <div class="theme-options">
                    <div class="theme-option" data-theme="light">
                        <div class="theme-preview light-theme"></div>
                        <span>Light</span>
                    </div>
                    <div class="theme-option" data-theme="dark">
                        <div class="theme-preview dark-theme"></div>
                        <span>Dark</span>
                    </div>
                    <div class="theme-option" data-theme="blue">
                        <div class="theme-preview blue-theme"></div>
                        <span>Blue</span>
                    </div>
                    <div class="theme-option" data-theme="green">
                        <div class="theme-preview green-theme"></div>
                        <span>Green</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(panel);
    
    // Close button event
    panel.querySelector('.close-button').addEventListener('click', () => {
        panel.remove();
    });
    
    // Background selection
    panel.querySelectorAll('.background-option').forEach(option => {
        option.addEventListener('click', () => {
            const bgUrl = option.getAttribute('data-bg');
            document.querySelector('.desktop').style.backgroundImage = `url('${bgUrl}')`;
            document.querySelector('.login-background').style.backgroundImage = `url('${bgUrl}')`;
            localStorage.setItem('desktop-background', bgUrl);
            
            // Highlight selected option
            panel.querySelectorAll('.background-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            
            showSystemNotification('Background changed');
        });
    });
    
    // Cursor selection
    panel.querySelectorAll('.cursor-option').forEach(option => {
        option.addEventListener('click', () => {
            const cursorType = option.getAttribute('data-cursor');
            document.body.style.cursor = cursorType;
            localStorage.setItem('cursor-style', cursorType);
            
            // Highlight selected option
            panel.querySelectorAll('.cursor-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            
            showSystemNotification('Mouse cursor changed');
        });
    });
    
    // UI Theme selection
    panel.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            applyTheme(theme);
            localStorage.setItem('ui-theme', theme);
            
            // Highlight selected option
            panel.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            
            showSystemNotification('UI Theme changed');
        });
    });
    
    // Set current selections as active
    const currentBg = localStorage.getItem('desktop-background');
    if (currentBg) {
        const bgOption = panel.querySelector(`.background-option[data-bg="${currentBg}"]`);
        if (bgOption) bgOption.classList.add('selected');
    }
    
    const currentCursor = localStorage.getItem('cursor-style');
    if (currentCursor) {
        const cursorOption = panel.querySelector(`.cursor-option[data-cursor="${currentCursor}"]`);
        if (cursorOption) cursorOption.classList.add('selected');
    }
    
    const currentTheme = localStorage.getItem('ui-theme');
    if (currentTheme) {
        const themeOption = panel.querySelector(`.theme-option[data-theme="${currentTheme}"]`);
        if (themeOption) themeOption.classList.add('selected');
    }
}

function applyTheme(theme) {
    const root = document.documentElement;
    
    switch(theme) {
        case 'dark':
            root.style.setProperty('--taskbar-bg', 'rgba(30, 30, 30, 0.85)');
            root.style.setProperty('--panel-bg', 'rgba(30, 30, 30, 0.95)');
            root.style.setProperty('--window-bg', '#2d2d2d');
            root.style.setProperty('--bg-color', '#1e1e1e');
            root.style.setProperty('--text-color', '#ffffff');
            root.style.setProperty('--hover-bg', 'rgba(255, 255, 255, 0.1)');
            root.style.setProperty('--active-bg', 'rgba(255, 255, 255, 0.15)');
            root.style.setProperty('--accent-color', '#0078d7');
            document.body.classList.add('dark-mode');
            break;
        case 'blue':
            root.style.setProperty('--taskbar-bg', 'rgba(0, 120, 215, 0.85)');
            root.style.setProperty('--panel-bg', 'rgba(0, 120, 215, 0.95)');
            root.style.setProperty('--window-bg', '#ffffff');
            root.style.setProperty('--bg-color', '#e6f2ff');
            root.style.setProperty('--text-color', '#333333');
            root.style.setProperty('--hover-bg', 'rgba(0, 0, 0, 0.05)');
            root.style.setProperty('--active-bg', 'rgba(0, 0, 0, 0.1)');
            root.style.setProperty('--accent-color', '#0057a8');
            document.body.classList.remove('dark-mode');
            break;
        case 'green':
            root.style.setProperty('--taskbar-bg', 'rgba(0, 120, 50, 0.85)');
            root.style.setProperty('--panel-bg', 'rgba(0, 120, 50, 0.95)');
            root.style.setProperty('--window-bg', '#ffffff');
            root.style.setProperty('--bg-color', '#e6fff2');
            root.style.setProperty('--text-color', '#333333');
            root.style.setProperty('--hover-bg', 'rgba(0, 0, 0, 0.05)');
            root.style.setProperty('--active-bg', 'rgba(0, 0, 0, 0.1)');
            root.style.setProperty('--accent-color', '#00784c');
            document.body.classList.remove('dark-mode');
            break;
        default: // light
            root.style.setProperty('--taskbar-bg', 'rgba(243, 243, 243, 0.85)');
            root.style.setProperty('--panel-bg', 'rgba(243, 243, 243, 0.95)');
            root.style.setProperty('--window-bg', '#ffffff');
            root.style.setProperty('--bg-color', '#f9f9f9');
            root.style.setProperty('--text-color', '#333333');
            root.style.setProperty('--hover-bg', 'rgba(0, 0, 0, 0.05)');
            root.style.setProperty('--active-bg', 'rgba(0, 0, 0, 0.1)');
            root.style.setProperty('--accent-color', '#0078d7');
            document.body.classList.remove('dark-mode');
    }
}

// Apply saved preferences on page load
function loadUserPreferences() {
    // Load background
    const savedBg = localStorage.getItem('desktop-background');
    if (savedBg) {
        document.querySelector('.desktop').style.backgroundImage = `url('${savedBg}')`;
        document.querySelector('.login-background').style.backgroundImage = `url('${savedBg}')`;
    }
    
    // Load cursor
    const savedCursor = localStorage.getItem('cursor-style');
    if (savedCursor) {
        document.body.style.cursor = savedCursor;
    }
    
    // Load theme
    const savedTheme = localStorage.getItem('ui-theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }
}

// Add a global error handler
window.addEventListener('error', (event) => {
    console.error('Uncaught error:', event.error);
    showSystemNotification('An unexpected error occurred');
});

function showSetupWizard() {
    const setupWizard = document.getElementById('setupWizard');
    setupWizard.classList.add('active');
    
    // Initialize setup event listeners
    initializeSetup();
}

function initializeSetup() {
    const startSetup = document.getElementById('startSetup');
    const nextLanguage = document.getElementById('nextLanguage');
    const nextSecurity = document.getElementById('nextSecurity');
    const nextGames = document.getElementById('nextGames');
    const finishSetup = document.getElementById('finishSetup');
    
    startSetup.addEventListener('click', () => {
        goToStep('welcomeStep', 'languageStep');
    });
    
    nextLanguage.addEventListener('click', () => {
        const selectedLanguage = document.querySelector('input[name="language"]:checked').value;
        localStorage.setItem('selectedLanguage', selectedLanguage);
        goToStep('languageStep', 'securityStep');
    });
    
    nextSecurity.addEventListener('click', () => {
        const pin = document.getElementById('pinInput').value;
        const pinConfirm = document.getElementById('pinConfirm').value;
        const pinHint = document.getElementById('pinHint').value;
        const pinError = document.getElementById('pinError');
        
        if (pin.length !== 4 || !/^\d+$/.test(pin)) {
            pinError.textContent = 'PIN must be 4 digits';
            return;
        }
        
        if (pin !== pinConfirm) {
            pinError.textContent = 'PINs do not match';
            return;
        }
        
        localStorage.setItem('userPin', pin);
        if (pinHint) {
            localStorage.setItem('pinHint', pinHint);
        }
        
        goToStep('securityStep', 'gamesStep');
    });
    
    nextGames.addEventListener('click', () => {
        const selectedGames = [];
        document.querySelectorAll('.game-option input[type="checkbox"]:checked').forEach(checkbox => {
            selectedGames.push(checkbox.value);
        });
        
        localStorage.setItem('selectedGames', JSON.stringify(selectedGames));
        
        // Update summary
        document.getElementById('summaryLanguage').textContent = 
            document.querySelector('input[name="language"]:checked').parentElement.querySelector('label').textContent;
        
        const gamesList = selectedGames.map(game => {
            switch(game) {
                case 'minecraft': return 'Minecraft';
                case 'codZombies': return 'COD Zombies: Portable';
                case 'fnaf': return 'Five Nights at Freddy\'s';
                default: return '';
            }
        }).join(', ') || 'None selected';
        
        document.getElementById('summaryGames').textContent = gamesList;
        
        goToStep('gamesStep', 'finishStep');
    });
    
    finishSetup.addEventListener('click', () => {
        // Install selected games
        const selectedGames = JSON.parse(localStorage.getItem('selectedGames') || '[]');
        selectedGames.forEach(game => {
            switch(game) {
                case 'minecraft':
                    addAppToDesktop("Minecraft", "");
                    break;
                case 'codZombies':
                    addAppToDesktop("COD Zombies: Portable", "");
                    break;
                case 'fnaf':
                    addAppToDesktop("Five Nights at Freddy's", "");
                    break;
            }
        });
        
        // Mark setup as complete
        localStorage.setItem('setupComplete', 'true');
        
        // Hide setup wizard and show login screen
        document.getElementById('setupWizard').classList.remove('active');
        document.getElementById('loginScreen').classList.add('active');
        
        // Show welcome notification
        showSystemNotification('Welcome to Flux OS!');
    });
}

function goToStep(currentStepId, nextStepId) {
    document.getElementById(currentStepId).classList.remove('active');
    document.getElementById(nextStepId).classList.add('active');
}
'use client';

import { useEffect, useState, useCallback } from 'react';

interface EasterEgg {
  id: string;
  name: string;
  description: string;
  trigger: 'konami' | 'click' | 'scroll' | 'hover' | 'custom';
  condition: () => boolean;
  action: () => void;
  isUnlocked: boolean;
}

interface EasterEggState {
  unlocked: string[];
  active: string[];
  konamiSequence: string[];
  isKonamiActive: boolean;
}

export function useEasterEggs() {
  const [state, setState] = useState<EasterEggState>({
    unlocked: [],
    active: [],
    konamiSequence: [],
    isKonamiActive: false
  });

  const [easterEggs] = useState<EasterEgg[]>([
    {
      id: 'konami-code',
      name: 'Konami Code',
      description: 'Unlocks secret developer mode',
      trigger: 'konami',
      condition: () => state.konamiSequence.length === 10,
      action: () => {
        console.log('🎮 Konami Code Activated! Developer Mode Unlocked!');
        setState(prev => ({
          ...prev,
          unlocked: [...prev.unlocked, 'konami-code'],
          active: [...prev.active, 'konami-code'],
          isKonamiActive: true
        }));
        
        // Add special visual effects
        document.body.classList.add('developer-mode');
        
        // Show secret message
        showSecretMessage('🎮 Developer Mode Activated! You found the secret!');
      },
      isUnlocked: false
    },
    {
      id: 'luxury-mode',
      name: 'Luxury Mode',
      description: 'Enhances all visual effects',
      trigger: 'custom',
      condition: () => state.isKonamiActive,
      action: () => {
        console.log('💎 Luxury Mode Activated!');
        setState(prev => ({
          ...prev,
          unlocked: [...prev.unlocked, 'luxury-mode'],
          active: [...prev.active, 'luxury-mode']
        }));
        
        // Enhance visual effects
        document.body.classList.add('luxury-mode');
        showSecretMessage('💎 Luxury Mode: Enhanced visual effects activated!');
      },
      isUnlocked: false
    },
    {
      id: 'secret-menu',
      name: 'Secret Menu',
      description: 'Access to hidden features',
      trigger: 'click',
      condition: () => state.isKonamiActive,
      action: () => {
        console.log('🔐 Secret Menu Accessed!');
        setState(prev => ({
          ...prev,
          unlocked: [...prev.unlocked, 'secret-menu'],
          active: [...prev.active, 'secret-menu']
        }));
        
        showSecretMenu();
      },
      isUnlocked: false
    },
    {
      id: 'particle-storm',
      name: 'Particle Storm',
      description: 'Creates an epic particle effect',
      trigger: 'scroll',
      condition: () => state.isKonamiActive && window.scrollY > 5000,
      action: () => {
        console.log('⚡ Particle Storm Activated!');
        setState(prev => ({
          ...prev,
          unlocked: [...prev.unlocked, 'particle-storm'],
          active: [...prev.active, 'particle-storm']
        }));
        
        createParticleStorm();
      },
      isUnlocked: false
    },
    {
      id: 'sound-theme',
      name: 'Premium Sound',
      description: 'Adds luxury sound effects',
      trigger: 'custom',
      condition: () => state.isKonamiActive,
      action: () => {
        console.log('🎵 Premium Sound Effects Activated!');
        setState(prev => ({
          ...prev,
          unlocked: [...prev.unlocked, 'sound-theme'],
          active: [...prev.active, 'sound-theme']
        }));
        
        initializePremiumSounds();
      },
      isUnlocked: false
    }
  ]);

  // Konami Code: ↑↑↓↓←→←→BA
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];

  // Handle keyboard input for Konami code
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.code;
    
    setState(prev => {
      const newSequence = [...prev.konamiSequence];
      
      // Check if this key matches the expected sequence
      const expectedKey = konamiCode[newSequence.length];
      if (key === expectedKey) {
        newSequence.push(key);
        
        // Check if sequence is complete
        if (newSequence.length === konamiCode.length) {
          // Trigger Konami code easter egg
          setTimeout(() => {
            const konamiEgg = easterEggs.find(egg => egg.id === 'konami-code');
            if (konamiEgg && konamiEgg.condition()) {
              konamiEgg.action();
            }
          }, 100);
          
          return {
            ...prev,
            konamiSequence: [],
            isKonamiActive: true
          };
        }
        
        return {
          ...prev,
          konamiSequence: newSequence
        };
      } else {
        // Reset sequence if wrong key
        return {
          ...prev,
          konamiSequence: []
        };
      }
    });
  }, [easterEggs]);

  // Handle special click sequences
  const handleSpecialClick = useCallback((e: MouseEvent) => {
    if (!state.isKonamiActive) return;
    
    const target = e.target as HTMLElement;
    
    // Secret menu trigger: Click on logo 5 times
    if (target.closest('.logo')) {
      const clickCount = parseInt(target.dataset.clickCount || '0') + 1;
      target.dataset.clickCount = clickCount.toString();
      
      if (clickCount >= 5) {
        const secretMenuEgg = easterEggs.find(egg => egg.id === 'secret-menu');
        if (secretMenuEgg && secretMenuEgg.condition()) {
          secretMenuEgg.action();
        }
        target.dataset.clickCount = '0';
      }
    }
  }, [state.isKonamiActive, easterEggs]);

  // Check for scroll-based easter eggs
  const handleScroll = useCallback(() => {
    if (!state.isKonamiActive) return;
    
    const particleStormEgg = easterEggs.find(egg => egg.id === 'particle-storm');
    if (particleStormEgg && particleStormEgg.condition() && !state.unlocked.includes('particle-storm')) {
      particleStormEgg.action();
    }
  }, [state.isKonamiActive, state.unlocked, easterEggs]);

  // Event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleSpecialClick);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleSpecialClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleKeyDown, handleSpecialClick, handleScroll]);

  // Show secret message
  const showSecretMessage = useCallback((message: string) => {
    const messageEl = document.createElement('div');
    messageEl.className = 'secret-message';
    messageEl.textContent = message;
    messageEl.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #d4af37, #ffd700);
      color: #000;
      padding: 20px 40px;
      border-radius: 10px;
      font-weight: bold;
      font-size: 18px;
      z-index: 10000;
      animation: secretMessageShow 0.5s ease-out;
      box-shadow: 0 10px 30px rgba(212, 175, 55, 0.5);
    `;
    
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
      messageEl.style.animation = 'secretMessageHide 0.5s ease-in forwards';
      setTimeout(() => {
        document.body.removeChild(messageEl);
      }, 500);
    }, 3000);
  }, []);

  // Show secret menu
  const showSecretMenu = useCallback(() => {
    const menuEl = document.createElement('div');
    menuEl.className = 'secret-menu';
    menuEl.innerHTML = `
      <div class="secret-menu-content">
        <h3>🔐 Secret Developer Menu</h3>
        <div class="secret-options">
          <button onclick="toggleLuxuryMode()">💎 Toggle Luxury Mode</button>
          <button onclick="toggleSoundEffects()">🎵 Toggle Sound Effects</button>
          <button onclick="toggleParticleStorm()">⚡ Toggle Particle Storm</button>
          <button onclick="showDebugInfo()">🐛 Show Debug Info</button>
          <button onclick="closeSecretMenu()">❌ Close</button>
        </div>
      </div>
    `;
    
    menuEl.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: secretMenuShow 0.3s ease-out;
    `;
    
    const content = menuEl.querySelector('.secret-menu-content') as HTMLElement;
    content.style.cssText = `
      background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
      padding: 30px;
      border-radius: 15px;
      border: 2px solid #d4af37;
      text-align: center;
      color: #d4af37;
    `;
    
    document.body.appendChild(menuEl);
    
    // Add global functions
    (window as unknown as { [key: string]: () => void }).toggleLuxuryMode = () => {
      document.body.classList.toggle('luxury-mode');
    };
    
    (window as unknown as { [key: string]: () => void }).toggleSoundEffects = () => {
      document.body.classList.toggle('premium-sound');
    };
    
    (window as unknown as { [key: string]: () => void }).toggleParticleStorm = () => {
      document.body.classList.toggle('particle-storm');
    };
    
    (window as unknown as { [key: string]: () => void }).showDebugInfo = () => {
      console.log('Debug Info:', {
        unlocked: state.unlocked,
        active: state.active,
        isKonamiActive: state.isKonamiActive
      });
    };
    
    (window as unknown as { [key: string]: () => void }).closeSecretMenu = () => {
      menuEl.style.animation = 'secretMenuHide 0.3s ease-in forwards';
      setTimeout(() => {
        document.body.removeChild(menuEl);
      }, 300);
    };
  }, [state]);

  // Create particle storm effect
  const createParticleStorm = useCallback(() => {
    const stormContainer = document.createElement('div');
    stormContainer.className = 'particle-storm';
    stormContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    `;
    
    document.body.appendChild(stormContainer);
    
    // Create particles
    for (let i = 0; i < 100; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: #d4af37;
        border-radius: 50%;
        animation: particleFloat ${2 + Math.random() * 3}s linear infinite;
        left: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 2}s;
      `;
      
      stormContainer.appendChild(particle);
    }
    
    // Remove after 10 seconds
    setTimeout(() => {
      if (document.body.contains(stormContainer)) {
        document.body.removeChild(stormContainer);
      }
    }, 10000);
  }, []);

  // Initialize premium sounds
  const initializePremiumSounds = useCallback(() => {
    // This would integrate with a sound library
    console.log('🎵 Premium sound effects initialized');
    document.body.classList.add('premium-sound');
  }, []);

  return {
    unlocked: state.unlocked,
    active: state.active,
    isKonamiActive: state.isKonamiActive,
    triggerEasterEgg: (id: string) => {
      const egg = easterEggs.find(e => e.id === id);
      if (egg && egg.condition()) {
        egg.action();
      }
    }
  };
}

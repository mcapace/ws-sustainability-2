'use client';

import { useRef, useEffect } from 'react';

interface SoundEffect {
  name: string;
  url: string;
  volume?: number;
  loop?: boolean;
}

export function useSoundEffects() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const soundsRef = useRef<Map<string, AudioBuffer>>(new Map());
  const playingSoundsRef = useRef<Set<string>>(new Set());

  // Initialize audio context
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
  }, []);

  // Load sound effect
  const loadSound = async (url: string): Promise<AudioBuffer | null> => {
    if (!audioContextRef.current) return null;

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      return audioBuffer;
    } catch (error) {
      console.warn('Failed to load sound:', url, error);
      return null;
    }
  };

  // Play sound effect
  const playSound = async (soundEffect: SoundEffect) => {
    if (!audioContextRef.current) return;

    // Resume audio context if suspended (required for user interaction)
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    try {
      let audioBuffer = soundsRef.current.get(soundEffect.url);
      
      if (!audioBuffer) {
        const loadedBuffer = await loadSound(soundEffect.url);
        if (loadedBuffer) {
          audioBuffer = loadedBuffer;
          soundsRef.current.set(soundEffect.url, loadedBuffer);
        } else {
          return;
        }
      }

      const source = audioContextRef.current.createBufferSource();
      const gainNode = audioContextRef.current.createGain();

      source.buffer = audioBuffer;
      source.loop = soundEffect.loop || false;
      gainNode.gain.value = soundEffect.volume || 0.3;

      source.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      source.start(0);

      // Track playing sounds
      if (!soundEffect.loop) {
        playingSoundsRef.current.add(soundEffect.name);
        source.onended = () => {
          playingSoundsRef.current.delete(soundEffect.name);
        };
      }

    } catch (error) {
      console.warn('Failed to play sound:', soundEffect.name, error);
    }
  };

  // Stop sound effect
  const stopSound = (name: string) => {
    // Note: This is a simplified implementation
    // In a more complex system, you'd track and stop specific sources
    playingSoundsRef.current.delete(name);
  };

  // Stop all sounds
  const stopAllSounds = () => {
    playingSoundsRef.current.clear();
  };

  // Predefined luxury sound effects
  const luxurySounds: Record<string, SoundEffect> = {
    cardHover: {
      name: 'cardHover',
      url: '/audio/sounds/card-hover.mp3',
      volume: 0.2
    },
    cardSelect: {
      name: 'cardSelect',
      url: '/audio/sounds/card-select.mp3',
      volume: 0.3
    },
    buttonClick: {
      name: 'buttonClick',
      url: '/audio/sounds/button-click.mp3',
      volume: 0.25
    },
    textScramble: {
      name: 'textScramble',
      url: '/audio/sounds/text-scramble.mp3',
      volume: 0.15
    },
    ambientJazz: {
      name: 'ambientJazz',
      url: '/audio/ambient/jazz-ambient.mp3',
      volume: 0.1,
      loop: true
    },
    ambientOcean: {
      name: 'ambientOcean',
      url: '/audio/ambient/ocean-ambient.mp3',
      volume: 0.1,
      loop: true
    }
  };

  return {
    playSound,
    stopSound,
    stopAllSounds,
    luxurySounds,
    isPlaying: (name: string) => playingSoundsRef.current.has(name)
  };
}

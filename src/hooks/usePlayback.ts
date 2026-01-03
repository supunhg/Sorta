import { useState, useEffect, useCallback } from 'react';
import type { Step, PlaybackState } from '../types/algorithm';

interface UsePlaybackProps {
  steps: Step[];
  speed: number; // Animation speed multiplier (0.25x to 4x)
}

interface UsePlaybackReturn {
  currentStepIndex: number;
  currentStep: Step | null;
  playbackState: PlaybackState;
  play: () => void;
  pause: () => void;
  reset: () => void;
  stepForward: () => void;
  stepBackward: () => void;
}

/**
 * Time & Playback Engine Hook
 * Manages deterministic step-by-step execution of algorithm visualization
 */
export function usePlayback({ steps, speed }: UsePlaybackProps): UsePlaybackReturn {
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle');

  const currentStep = currentStepIndex >= 0 && currentStepIndex < steps.length 
    ? steps[currentStepIndex] 
    : null;

  const play = useCallback(() => {
    if (currentStepIndex >= steps.length - 1) {
      // If at the end, reset and play from start
      setCurrentStepIndex(-1);
    }
    setPlaybackState('playing');
  }, [currentStepIndex, steps.length]);

  const pause = useCallback(() => {
    setPlaybackState('paused');
  }, []);

  const reset = useCallback(() => {
    setCurrentStepIndex(-1);
    setPlaybackState('idle');
  }, []);

  const stepForward = useCallback(() => {
    setCurrentStepIndex((prev) => {
      const next = Math.min(prev + 1, steps.length - 1);
      if (next === steps.length - 1) {
        setPlaybackState('finished');
      }
      return next;
    });
  }, [steps.length]);

  const stepBackward = useCallback(() => {
    setCurrentStepIndex((prev) => {
      const next = Math.max(prev - 1, -1);
      if (next === -1) {
        setPlaybackState('idle');
      } else {
        setPlaybackState('paused');
      }
      return next;
    });
  }, []);

  // Auto-advance when playing
  useEffect(() => {
    if (playbackState !== 'playing') return;

    // Base delay: 500ms, adjusted by speed multiplier
    const baseDelay = 500;
    const delay = baseDelay / speed;

    const timer = setTimeout(() => {
      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex((prev) => prev + 1);
      } else {
        setPlaybackState('finished');
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [playbackState, currentStepIndex, steps.length, speed]);

  return {
    currentStepIndex,
    currentStep,
    playbackState,
    play,
    pause,
    reset,
    stepForward,
    stepBackward,
  };
}

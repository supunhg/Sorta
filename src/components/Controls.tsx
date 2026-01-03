interface ControlsProps {
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onSpeedChange: (speed: number) => void;
  playbackState: string;
  speed: number;
}

/**
 * Playback control panel with play/pause/reset/step buttons and speed control
 */
export function Controls({
  onPlay,
  onPause,
  onReset,
  onStepForward,
  onStepBackward,
  onSpeedChange,
  playbackState,
  speed,
}: ControlsProps) {
  const isPlaying = playbackState === 'playing';

  return (
    <div className="controls glass-panel">
      <div className="controls-buttons">
        <button
          className="control-btn"
          onClick={onReset}
          title="Reset"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
          </svg>
        </button>

        <button
          className="control-btn"
          onClick={onStepBackward}
          title="Step Backward"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="11 19 2 12 11 5 11 19" />
            <polygon points="22 19 13 12 22 5 22 19" />
          </svg>
        </button>

        <button
          className="control-btn play-pause-btn"
          onClick={isPlaying ? onPause : onPlay}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>

        <button
          className="control-btn"
          onClick={onStepForward}
          title="Step Forward"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="13 19 22 12 13 5 13 19" />
            <polygon points="2 19 11 12 2 5 2 19" />
          </svg>
        </button>
      </div>

      <div className="speed-control">
        <label htmlFor="speed">Speed: {speed}x</label>
        <input
          id="speed"
          type="range"
          min="0.25"
          max="100"
          step="0.25"
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          className="speed-slider"
        />
      </div>
    </div>
  );
}

import { useRef, useEffect } from 'react';

interface TimelineProps {
  currentStep: number;
  totalSteps: number;
  bookmarks: number[];
  onSeek: (step: number) => void;
  onToggleBookmark: (step: number) => void;
}

export function Timeline({ 
  currentStep, 
  totalSteps, 
  bookmarks,
  onSeek,
  onToggleBookmark,
}: TimelineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Progress bar
    const progress = totalSteps > 0 ? currentStep / totalSteps : 0;
    const progressWidth = rect.width * progress;
    
    const gradient = ctx.createLinearGradient(0, 0, progressWidth, 0);
    gradient.addColorStop(0, '#60a5fa');
    gradient.addColorStop(1, '#a78bfa');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, progressWidth, rect.height);

    // Bookmarks
    bookmarks.forEach(bookmark => {
      const x = (bookmark / totalSteps) * rect.width;
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x - 4, 8);
      ctx.lineTo(x + 4, 8);
      ctx.closePath();
      ctx.fill();
    });

    // Current position indicator
    const currentX = (currentStep / totalSteps) * rect.width;
    ctx.fillStyle = '#fff';
    ctx.fillRect(currentX - 2, 0, 4, rect.height);
    ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
    ctx.shadowBlur = 8;
    ctx.fillRect(currentX - 2, 0, 4, rect.height);
    ctx.shadowBlur = 0;
  }, [currentStep, totalSteps, bookmarks]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const progress = x / rect.width;
    const targetStep = Math.floor(progress * totalSteps);
    
    if (e.shiftKey) {
      onToggleBookmark(targetStep);
    } else {
      onSeek(Math.max(0, Math.min(totalSteps - 1, targetStep)));
    }
  };

  return (
    <div className="timeline-container">
      <div className="timeline-label">
        <span>Timeline</span>
        <span className="timeline-hint">Click to seek • Shift+Click to bookmark</span>
      </div>
      <canvas
        ref={canvasRef}
        className="timeline-canvas"
        onClick={handleClick}
        style={{ width: '100%', height: '32px', cursor: 'pointer', borderRadius: '4px' }}
      />
    </div>
  );
}

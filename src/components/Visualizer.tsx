import { useEffect, useRef } from 'react';
import type { Step } from '../types/algorithm';

interface VisualizerProps {
  data: number[];
  currentStep: Step | null;
  highlightedIndices: number[];
  sortedIndices: number[];
  colorTheme?: string;
  barStyle?: string;
}

const colorThemes = {
  default: {
    default: '#60a5fa',
    sorted: '#22c55e',
    compare: '#fbbf24',
    swap: '#f87171',
    highlight: '#a78bfa',
  },
  sunset: {
    default: '#fb923c',
    sorted: '#34d399',
    compare: '#fbbf24',
    swap: '#f87171',
    highlight: '#fb7185',
  },
  forest: {
    default: '#4ade80',
    sorted: '#22c55e',
    compare: '#fbbf24',
    swap: '#fb923c',
    highlight: '#86efac',
  },
  ocean: {
    default: '#2dd4bf',
    sorted: '#10b981',
    compare: '#06b6d4',
    swap: '#f87171',
    highlight: '#5eead4',
  },
  purple: {
    default: '#a78bfa',
    sorted: '#c084fc',
    compare: '#e879f9',
    swap: '#f472b6',
    highlight: '#c4b5fd',
  },
};

/**
 * Canvas-based visualization engine for sorting algorithms
 * Renders vertical bars representing array elements
 */
export function Visualizer({ 
  data, 
  currentStep, 
  highlightedIndices, 
  sortedIndices, 
  colorTheme = 'default',
  barStyle = 'gradient'
}: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    if (data.length === 0) return;

    // Calculate dimensions
    const maxValue = Math.max(...data);
    const barWidth = rect.width / data.length;
    const heightScale = rect.height / maxValue;

    // Draw bars
    data.forEach((value, index) => {
      const x = index * barWidth;
      const barHeight = value * heightScale;
      const y = rect.height - barHeight;

      // Determine bar color based on state
      const theme = colorThemes[colorTheme as keyof typeof colorThemes] || colorThemes.default;
      let color = theme.default;

      if (sortedIndices.includes(index)) {
        color = theme.sorted;
      } else if (currentStep?.indices.includes(index)) {
        if (currentStep.type === 'compare') {
          color = theme.compare;
        } else if (currentStep.type === 'swap') {
          color = theme.swap;
        }
      } else if (highlightedIndices.includes(index)) {
        color = theme.highlight;
      }

      // Draw bar with different styles
      if (barStyle === 'solid') {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, barWidth - 2, barHeight);
      } else if (barStyle === 'outline') {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 1, y, barWidth - 4, barHeight);
      } else if (barStyle === '3d') {
        // Draw 3D-like bar with shading
        const gradient = ctx.createLinearGradient(x, y, x + barWidth, y);
        gradient.addColorStop(0, color + '40'); // lighter left
        gradient.addColorStop(0.5, color);
        gradient.addColorStop(1, color + '60'); // darker right
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth - 2, barHeight);
        
        // Add highlight on top
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(x, y, barWidth - 2, Math.max(3, barHeight * 0.1));
      } else {
        // Default gradient style
        const gradient = ctx.createLinearGradient(x, y, x, rect.height);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, color + '80'); // Add transparency
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth - 2, barHeight);
        
        // Add subtle border
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, barWidth - 2, barHeight);
      }
    });
  }, [data, currentStep, highlightedIndices, sortedIndices, colorTheme, barStyle]);

  return (
    <div className="visualizer-container">
      <canvas
        ref={canvasRef}
        className="visualizer-canvas"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

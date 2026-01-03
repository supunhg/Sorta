/**
 * Core type definitions for the Algorithm Runtime System
 * These types enforce the contract described in ARCHITECTURE.md
 */

/**
 * A single atomic step in a sorting algorithm
 * Steps are pure, serializable instructions with no rendering logic
 */
export interface Step {
  /** The type of operation being performed */
  type: 'compare' | 'swap' | 'overwrite' | 'mark';
  /** The indices being affected by this step */
  indices: number[];
  /** Optional values for overwrite operations */
  values?: number[];
}

/**
 * Performance metrics for algorithm execution
 */
export interface PerformanceMetrics {
  comparisons: number;
  swaps: number;
  arrayAccesses: number;
  overwrites: number;
}

/**
 * Complexity analysis for an algorithm
 */
export interface Complexity {
  /** Time complexity in Big O notation */
  time: string;
  /** Space complexity in Big O notation */
  space: string;
}

/**
 * The contract that all sorting algorithms must implement
 * Algorithms are pure functions that generate steps from data
 */
export interface Algorithm {
  /** Human-readable name of the algorithm */
  name: string;
  /** Complexity analysis */
  complexity: Complexity;
  /** Generate the complete sequence of steps for sorting the given data */
  generateSteps(data: number[]): Step[];
}

/**
 * Playback state for the visualization engine
 */
export type PlaybackState = 'idle' | 'playing' | 'paused' | 'finished';

/**
 * Configuration for the visualization
 */
export interface VisualizationConfig {
  /** Size of the dataset */
  datasetSize: number;
  /** Animation speed multiplier (0.25x to 4x) */
  speed: number;
  /** Visualization mode */
  mode: 'vertical-bars' | 'horizontal-bars' | 'dots' | 'circular';
}

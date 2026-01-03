import type { Algorithm, Step } from '../types/algorithm';

/**
 * Comb Sort Algorithm Implementation
 * 
 * Improvement over bubble sort using gap sequence.
 * Eliminates turtles (small values near end) efficiently.
 * 
 * Complexity: O(n²) worst case, O(n log n) average, O(1) space
 */
export const combSort: Algorithm = {
  name: 'Comb Sort',
  complexity: {
    time: 'O(n log n)',
    space: 'O(1)',
  },
  generateSteps(data: number[]): Step[] {
    const steps: Step[] = [];
    const arr = [...data];
    const n = arr.length;
    const shrink = 1.3;
    let gap = n;
    let sorted = false;

    while (!sorted) {
      gap = Math.floor(gap / shrink);
      if (gap <= 1) {
        gap = 1;
        sorted = true;
      }

      for (let i = 0; i + gap < n; i++) {
        steps.push({
          type: 'compare',
          indices: [i, i + gap],
        });

        if (arr[i] > arr[i + gap]) {
          steps.push({
            type: 'swap',
            indices: [i, i + gap],
          });
          [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
          sorted = false;
        }
      }
    }

    // Mark all as sorted
    for (let i = 0; i < n; i++) {
      steps.push({
        type: 'mark',
        indices: [i],
      });
    }

    return steps;
  },
};

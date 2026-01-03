import type { Algorithm, Step } from '../types/algorithm';

/**
 * Gnome Sort Algorithm Implementation
 * 
 * Simple sorting algorithm similar to insertion sort.
 * Works by moving elements to their proper place like a garden gnome sorting pots.
 * 
 * Complexity: O(n²) time, O(1) space
 */
export const gnomeSort: Algorithm = {
  name: 'Gnome Sort',
  complexity: {
    time: 'O(n²)',
    space: 'O(1)',
  },
  generateSteps(data: number[]): Step[] {
    const steps: Step[] = [];
    const arr = [...data];
    const n = arr.length;
    let pos = 0;

    while (pos < n) {
      if (pos === 0) {
        pos++;
      } else {
        steps.push({
          type: 'compare',
          indices: [pos, pos - 1],
        });

        if (arr[pos] >= arr[pos - 1]) {
          pos++;
        } else {
          steps.push({
            type: 'swap',
            indices: [pos, pos - 1],
          });
          [arr[pos], arr[pos - 1]] = [arr[pos - 1], arr[pos]];
          pos--;
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

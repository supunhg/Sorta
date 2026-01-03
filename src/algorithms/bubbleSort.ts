import type { Algorithm, Step } from '../types/algorithm';

/**
 * Bubble Sort Algorithm Implementation
 * 
 * Classic comparison-based sorting algorithm that repeatedly steps through
 * the list, compares adjacent elements, and swaps them if they're in the
 * wrong order.
 * 
 * Complexity: O(n²) time, O(1) space
 */
export const bubbleSort: Algorithm = {
  name: 'Bubble Sort',
  complexity: {
    time: 'O(n²)',
    space: 'O(1)',
  },
  generateSteps(data: number[]): Step[] {
    const steps: Step[] = [];
    const arr = [...data]; // Work with a copy
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Compare adjacent elements
        steps.push({
          type: 'compare',
          indices: [j, j + 1],
        });

        // Swap if they're in the wrong order
        if (arr[j] > arr[j + 1]) {
          steps.push({
            type: 'swap',
            indices: [j, j + 1],
          });

          // Perform the swap in our working array
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }

      // Mark the element as sorted (last i elements are in place)
      steps.push({
        type: 'mark',
        indices: [n - i - 1],
      });
    }

    // Mark the first element as sorted
    if (n > 0) {
      steps.push({
        type: 'mark',
        indices: [0],
      });
    }

    return steps;
  },
};

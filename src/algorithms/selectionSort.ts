import type { Algorithm, Step } from '../types/algorithm';

/**
 * Selection Sort Algorithm Implementation
 * 
 * Repeatedly finds the minimum element from the unsorted portion
 * and places it at the beginning.
 * 
 * Complexity: O(n²) time, O(1) space
 */
export const selectionSort: Algorithm = {
  name: 'Selection Sort',
  complexity: {
    time: 'O(n²)',
    space: 'O(1)',
  },
  generateSteps(data: number[]): Step[] {
    const steps: Step[] = [];
    const arr = [...data];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;

      // Find the minimum element in the unsorted portion
      for (let j = i + 1; j < n; j++) {
        steps.push({
          type: 'compare',
          indices: [minIdx, j],
        });

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }

      // Swap the minimum element with the first element of unsorted portion
      if (minIdx !== i) {
        steps.push({
          type: 'swap',
          indices: [i, minIdx],
        });
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      }

      // Mark this position as sorted
      steps.push({
        type: 'mark',
        indices: [i],
      });
    }

    // Mark the last element as sorted
    if (n > 0) {
      steps.push({
        type: 'mark',
        indices: [n - 1],
      });
    }

    return steps;
  },
};

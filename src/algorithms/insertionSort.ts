import type { Algorithm, Step } from '../types/algorithm';

/**
 * Insertion Sort Algorithm Implementation
 * 
 * Builds the sorted array one item at a time by inserting each element
 * into its proper position in the already-sorted portion.
 * 
 * Complexity: O(n²) time, O(1) space
 */
export const insertionSort: Algorithm = {
  name: 'Insertion Sort',
  complexity: {
    time: 'O(n²)',
    space: 'O(1)',
  },
  generateSteps(data: number[]): Step[] {
    const steps: Step[] = [];
    const arr = [...data];
    const n = arr.length;

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;

      // Mark the element being inserted
      steps.push({
        type: 'mark',
        indices: [i],
      });

      // Move elements greater than key one position ahead
      while (j >= 0) {
        steps.push({
          type: 'compare',
          indices: [j, i],
        });

        if (arr[j] > key) {
          steps.push({
            type: 'swap',
            indices: [j, j + 1],
          });
          arr[j + 1] = arr[j];
          j--;
        } else {
          break;
        }
      }

      // Place the key in its correct position
      arr[j + 1] = key;
      if (j + 1 !== i) {
        steps.push({
          type: 'overwrite',
          indices: [j + 1],
          values: [key],
        });
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

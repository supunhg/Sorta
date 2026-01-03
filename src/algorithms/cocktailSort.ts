import type { Algorithm, Step } from '../types/algorithm';

/**
 * Cocktail Shaker Sort Algorithm Implementation
 * 
 * A variation of bubble sort that sorts in both directions alternately,
 * reducing the number of passes needed.
 * 
 * Complexity: O(n²) time, O(1) space
 */
export const cocktailSort: Algorithm = {
  name: 'Cocktail Shaker Sort',
  complexity: {
    time: 'O(n²)',
    space: 'O(1)',
  },
  generateSteps(data: number[]): Step[] {
    const steps: Step[] = [];
    const arr = [...data];
    const n = arr.length;
    let swapped = true;
    let start = 0;
    let end = n - 1;

    while (swapped) {
      swapped = false;

      // Forward pass (left to right)
      for (let i = start; i < end; i++) {
        steps.push({
          type: 'compare',
          indices: [i, i + 1],
        });

        if (arr[i] > arr[i + 1]) {
          steps.push({
            type: 'swap',
            indices: [i, i + 1],
          });
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;
        }
      }

      if (!swapped) break;

      steps.push({
        type: 'mark',
        indices: [end],
      });
      end--;
      swapped = false;

      // Backward pass (right to left)
      for (let i = end; i > start; i--) {
        steps.push({
          type: 'compare',
          indices: [i - 1, i],
        });

        if (arr[i - 1] > arr[i]) {
          steps.push({
            type: 'swap',
            indices: [i - 1, i],
          });
          [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
          swapped = true;
        }
      }

      steps.push({
        type: 'mark',
        indices: [start],
      });
      start++;
    }

    // Mark remaining elements as sorted
    for (let i = start; i <= end; i++) {
      steps.push({
        type: 'mark',
        indices: [i],
      });
    }

    return steps;
  },
};

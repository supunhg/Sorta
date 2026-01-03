import type { Algorithm, Step } from '../types/algorithm';

/**
 * Shell Sort Algorithm Implementation
 * 
 * Generalization of insertion sort that allows exchange of items
 * that are far apart, using a diminishing gap sequence.
 * 
 * Complexity: O(n log²n) average, O(1) space
 */
export const shellSort: Algorithm = {
  name: 'Shell Sort',
  complexity: {
    time: 'O(n log²n)',
    space: 'O(1)',
  },
  generateSteps(data: number[]): Step[] {
    const steps: Step[] = [];
    const arr = [...data];
    const n = arr.length;

    // Start with a large gap, then reduce the gap
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      // Do a gapped insertion sort
      for (let i = gap; i < n; i++) {
        const temp = arr[i];
        let j = i;

        steps.push({
          type: 'mark',
          indices: [i],
        });

        while (j >= gap) {
          steps.push({
            type: 'compare',
            indices: [j - gap, j],
          });

          if (arr[j - gap] > temp) {
            steps.push({
              type: 'swap',
              indices: [j - gap, j],
            });
            arr[j] = arr[j - gap];
            j -= gap;
          } else {
            break;
          }
        }

        arr[j] = temp;
        if (j !== i) {
          steps.push({
            type: 'overwrite',
            indices: [j],
            values: [temp],
          });
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

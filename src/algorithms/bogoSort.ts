import type { Algorithm, Step } from '../types/algorithm';

/**
 * Bogo Sort Algorithm Implementation (for fun!)
 * 
 * Extremely inefficient sorting by randomly shuffling until sorted.
 * Also known as "stupid sort" or "permutation sort".
 * 
 * Complexity: O(n × n!) average time, O(1) space
 * WARNING: Only use with very small datasets!
 */
export const bogoSort: Algorithm = {
  name: 'Bogo Sort (Fun)',
  complexity: {
    time: 'O(n × n!)',
    space: 'O(1)',
  },
  generateSteps(data: number[]): Step[] {
    const steps: Step[] = [];
    const arr = [...data];
    const n = arr.length;

    // Safety limit to prevent infinite loops
    const MAX_ITERATIONS = 1000;
    let iterations = 0;

    function isSorted(): boolean {
      for (let i = 0; i < n - 1; i++) {
        steps.push({
          type: 'compare',
          indices: [i, i + 1],
        });
        if (arr[i] > arr[i + 1]) {
          return false;
        }
      }
      return true;
    }

    function shuffle(): void {
      for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        if (i !== j) {
          steps.push({
            type: 'swap',
            indices: [i, j],
          });
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
    }

    // Keep shuffling until sorted (with iteration limit)
    while (!isSorted() && iterations < MAX_ITERATIONS) {
      shuffle();
      iterations++;
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

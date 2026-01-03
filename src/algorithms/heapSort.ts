import type { Algorithm, Step } from '../types/algorithm';

/**
 * Heap Sort Algorithm Implementation
 * 
 * Efficient comparison-based sorting using a binary heap data structure.
 * First builds a max heap, then repeatedly extracts the maximum element.
 * 
 * Complexity: O(n log n) time, O(1) space
 */
export const heapSort: Algorithm = {
  name: 'Heap Sort',
  complexity: {
    time: 'O(n log n)',
    space: 'O(1)',
  },
  generateSteps(data: number[]): Step[] {
    const steps: Step[] = [];
    const arr = [...data];
    const n = arr.length;

    function heapify(size: number, root: number): void {
      let largest = root;
      const left = 2 * root + 1;
      const right = 2 * root + 2;

      if (left < size) {
        steps.push({
          type: 'compare',
          indices: [left, largest],
        });

        if (arr[left] > arr[largest]) {
          largest = left;
        }
      }

      if (right < size) {
        steps.push({
          type: 'compare',
          indices: [right, largest],
        });

        if (arr[right] > arr[largest]) {
          largest = right;
        }
      }

      if (largest !== root) {
        steps.push({
          type: 'swap',
          indices: [root, largest],
        });
        [arr[root], arr[largest]] = [arr[largest], arr[root]];
        heapify(size, largest);
      }
    }

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(n, i);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      steps.push({
        type: 'swap',
        indices: [0, i],
      });
      [arr[0], arr[i]] = [arr[i], arr[0]];

      steps.push({
        type: 'mark',
        indices: [i],
      });

      heapify(i, 0);
    }

    if (n > 0) {
      steps.push({
        type: 'mark',
        indices: [0],
      });
    }

    return steps;
  },
};

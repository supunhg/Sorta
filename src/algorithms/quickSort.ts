import type { Algorithm, Step } from '../types/algorithm';

/**
 * Quick Sort Algorithm Implementation
 * 
 * Efficient divide-and-conquer sorting algorithm that picks a pivot element
 * and partitions the array around it.
 * 
 * Complexity: O(n log n) average, O(n²) worst case time, O(log n) space
 */
export const quickSort: Algorithm = {
  name: 'Quick Sort',
  complexity: {
    time: 'O(n log n)',
    space: 'O(log n)',
  },
  generateSteps(data: number[]): Step[] {
    const steps: Step[] = [];
    const arr = [...data];

    function partition(low: number, high: number): number {
      const pivot = arr[high];
      
      // Mark the pivot
      steps.push({
        type: 'mark',
        indices: [high],
      });

      let i = low - 1;

      for (let j = low; j < high; j++) {
        // Compare with pivot
        steps.push({
          type: 'compare',
          indices: [j, high],
        });

        if (arr[j] < pivot) {
          i++;
          if (i !== j) {
            steps.push({
              type: 'swap',
              indices: [i, j],
            });
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }
        }
      }

      // Place pivot in correct position
      if (i + 1 !== high) {
        steps.push({
          type: 'swap',
          indices: [i + 1, high],
        });
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      }

      return i + 1;
    }

    function quickSortRecursive(low: number, high: number): void {
      if (low < high) {
        const pi = partition(low, high);
        quickSortRecursive(low, pi - 1);
        quickSortRecursive(pi + 1, high);
      }
    }

    if (arr.length > 0) {
      quickSortRecursive(0, arr.length - 1);
    }

    return steps;
  },
};

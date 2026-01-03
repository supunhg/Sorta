import type { Algorithm, Step } from '../types/algorithm';

/**
 * Merge Sort Algorithm Implementation
 * 
 * Efficient divide-and-conquer sorting algorithm that divides the array
 * into halves, sorts them recursively, and merges the sorted halves.
 * 
 * Complexity: O(n log n) time, O(n) space
 */
export const mergeSort: Algorithm = {
  name: 'Merge Sort',
  complexity: {
    time: 'O(n log n)',
    space: 'O(n)',
  },
  generateSteps(data: number[]): Step[] {
    const steps: Step[] = [];
    const arr = [...data];

    function merge(left: number, mid: number, right: number): void {
      const leftArr = arr.slice(left, mid + 1);
      const rightArr = arr.slice(mid + 1, right + 1);

      let i = 0;
      let j = 0;
      let k = left;

      while (i < leftArr.length && j < rightArr.length) {
        // Compare elements from left and right subarrays
        steps.push({
          type: 'compare',
          indices: [left + i, mid + 1 + j],
        });

        if (leftArr[i] <= rightArr[j]) {
          steps.push({
            type: 'overwrite',
            indices: [k],
            values: [leftArr[i]],
          });
          arr[k] = leftArr[i];
          i++;
        } else {
          steps.push({
            type: 'overwrite',
            indices: [k],
            values: [rightArr[j]],
          });
          arr[k] = rightArr[j];
          j++;
        }
        k++;
      }

      // Copy remaining elements from left subarray
      while (i < leftArr.length) {
        steps.push({
          type: 'overwrite',
          indices: [k],
          values: [leftArr[i]],
        });
        arr[k] = leftArr[i];
        i++;
        k++;
      }

      // Copy remaining elements from right subarray
      while (j < rightArr.length) {
        steps.push({
          type: 'overwrite',
          indices: [k],
          values: [rightArr[j]],
        });
        arr[k] = rightArr[j];
        j++;
        k++;
      }

      // Mark the merged portion
      for (let idx = left; idx <= right; idx++) {
        steps.push({
          type: 'mark',
          indices: [idx],
        });
      }
    }

    function mergeSortRecursive(left: number, right: number): void {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        mergeSortRecursive(left, mid);
        mergeSortRecursive(mid + 1, right);
        merge(left, mid, right);
      }
    }

    if (arr.length > 0) {
      mergeSortRecursive(0, arr.length - 1);
    }

    return steps;
  },
};

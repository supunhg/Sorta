import type { Algorithm, Step } from '../types/algorithm';

/**
 * Counting Sort Algorithm Implementation
 * 
 * Non-comparison based sorting using counting array.
 * Works best when range of input is known and small.
 * 
 * Complexity: O(n + k) time, O(k) space where k is range
 */
export const countingSort: Algorithm = {
  name: 'Counting Sort',
  complexity: {
    time: 'O(n + k)',
    space: 'O(k)',
  },
  generateSteps(data: number[]): Step[] {
    const steps: Step[] = [];
    const arr = [...data];
    const n = arr.length;
    
    if (n === 0) return steps;

    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    const output = new Array(n);

    // Count occurrences
    for (let i = 0; i < n; i++) {
      steps.push({
        type: 'compare',
        indices: [i],
      });
      count[arr[i] - min]++;
    }

    // Cumulative count
    for (let i = 1; i < range; i++) {
      count[i] += count[i - 1];
    }

    // Build output array
    for (let i = n - 1; i >= 0; i--) {
      const value = arr[i];
      const pos = count[value - min] - 1;
      output[pos] = value;
      count[value - min]--;

      steps.push({
        type: 'overwrite',
        indices: [pos],
        values: [value],
      });
    }

    // Copy back to original array
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
      steps.push({
        type: 'mark',
        indices: [i],
      });
    }

    return steps;
  },
};

import type { Algorithm } from '../types/algorithm';
import { bogoSort } from './bogoSort';
import { bubbleSort } from './bubbleSort';
import { cocktailSort } from './cocktailSort';
import { combSort } from './combSort';
import { countingSort } from './countingSort';
import { gnomeSort } from './gnomeSort';
import { heapSort } from './heapSort';
import { insertionSort } from './insertionSort';
import { mergeSort } from './mergeSort';
import { quickSort } from './quickSort';
import { selectionSort } from './selectionSort';
import { shellSort } from './shellSort';

/**
 * Registry of all available sorting algorithms
 * Add new algorithms here to make them available in the UI
 */
export const algorithms: Algorithm[] = [
  bubbleSort,
  cocktailSort,
  combSort,
  gnomeSort,
  insertionSort,
  selectionSort,
  shellSort,
  heapSort,
  mergeSort,
  quickSort,
  countingSort,
  bogoSort,
];

/**
 * Get an algorithm by name
 */
export function getAlgorithm(name: string): Algorithm | undefined {
  return algorithms.find((algo) => algo.name === name);
}

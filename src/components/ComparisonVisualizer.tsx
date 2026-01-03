import { useMemo } from 'react';
import type { Step } from '../types/algorithm';
import { Visualizer } from './Visualizer';

interface ComparisonVisualizerProps {
  algorithmName: string;
  complexity: string;
  data: number[];
  steps: Step[];
  currentStepIndex: number;
  colorTheme?: string;
  barStyle?: string;
}

/**
 * Single algorithm visualizer for comparison mode
 */
export function ComparisonVisualizer({
  algorithmName,
  complexity,
  data,
  steps,
  currentStepIndex,
  colorTheme = 'default',
  barStyle = 'gradient',
}: ComparisonVisualizerProps) {
  const displayData = useMemo(() => {
    const arr = [...data];
    for (let i = 0; i <= currentStepIndex && i < steps.length; i++) {
      const step = steps[i];
      if (step?.type === 'swap') {
        const [idx1, idx2] = step.indices;
        [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
      } else if (step?.type === 'overwrite' && step.values) {
        step.indices.forEach((idx, i) => {
          arr[idx] = step.values![i];
        });
      }
    }
    return arr;
  }, [data, steps, currentStepIndex]);

  const sortedIndices = useMemo(() => {
    const sorted: number[] = [];
    for (let i = 0; i <= currentStepIndex && i < steps.length; i++) {
      const step = steps[i];
      if (step?.type === 'mark') {
        sorted.push(...step.indices);
      }
    }
    return sorted;
  }, [steps, currentStepIndex]);

  const currentStep =
    currentStepIndex >= 0 && currentStepIndex < steps.length
      ? steps[currentStepIndex]
      : null;

  return (
    <div className="comparison-item">
      <h3>
        {algorithmName}{' '}
        <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>({complexity})</span>
      </h3>
      <Visualizer
        data={displayData}
        currentStep={currentStep}
        highlightedIndices={[]}
        sortedIndices={sortedIndices}
        colorTheme={colorTheme}
        barStyle={barStyle}
      />
    </div>
  );
}

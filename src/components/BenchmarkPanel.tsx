import { useMemo } from 'react';
import type { Algorithm } from '../types/algorithm';

interface BenchmarkResult {
  algorithm: string;
  steps: number;
  comparisons: number;
  swaps: number;
  accesses: number;
  complexity: string;
}

interface BenchmarkPanelProps {
  algorithms: Algorithm[];
  data: number[];
  onClose: () => void;
}

export function BenchmarkPanel({ algorithms, data, onClose }: BenchmarkPanelProps) {
  const results = useMemo<BenchmarkResult[]>(() => {
    return algorithms.map(algo => {
      const steps = algo.generateSteps(data);
      let comparisons = 0;
      let swaps = 0;
      let accesses = 0;

      steps.forEach(step => {
        if (step.type === 'compare') {
          comparisons++;
          accesses += step.indices.length;
        } else if (step.type === 'swap') {
          swaps++;
          accesses += step.indices.length * 2;
        } else if (step.type === 'overwrite') {
          accesses += step.indices.length;
        }
      });

      return {
        algorithm: algo.name,
        steps: steps.length,
        comparisons,
        swaps,
        accesses,
        complexity: algo.complexity.time,
      };
    }).sort((a, b) => a.steps - b.steps);
  }, [algorithms, data]);

  const handleExport = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      dataSize: data.length,
      results,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `benchmark-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="benchmark-overlay">
      <div className="benchmark-modal">
        <div className="benchmark-header">
          <h2>🏁 Algorithm Benchmark</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="benchmark-info">
          <span>Dataset Size: <strong>{data.length}</strong></span>
          <span>Algorithms Tested: <strong>{algorithms.length}</strong></span>
        </div>

        <div className="benchmark-table-wrapper">
          <table className="benchmark-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Algorithm</th>
                <th>Steps</th>
                <th>Comparisons</th>
                <th>Swaps</th>
                <th>Accesses</th>
                <th>Complexity</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={result.algorithm} className={index === 0 ? 'winner' : ''}>
                  <td>
                    {index === 0 && '🥇'}
                    {index === 1 && '🥈'}
                    {index === 2 && '🥉'}
                    {index > 2 && `#${index + 1}`}
                  </td>
                  <td className="algo-name">{result.algorithm}</td>
                  <td>{result.steps.toLocaleString()}</td>
                  <td>{result.comparisons.toLocaleString()}</td>
                  <td>{result.swaps.toLocaleString()}</td>
                  <td>{result.accesses.toLocaleString()}</td>
                  <td className="complexity-cell">{result.complexity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="benchmark-actions">
          <button onClick={handleExport} className="benchmark-btn export-btn">
            💾 Export Results
          </button>
          <button onClick={onClose} className="benchmark-btn close-action-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

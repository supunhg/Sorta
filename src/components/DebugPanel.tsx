import type { Step } from '../types/algorithm';

interface DebugPanelProps {
  currentStep: Step | null;
  currentStepIndex: number;
  totalSteps: number;
  data: number[];
  isLightMode: boolean;
}

export function DebugPanel({ 
  currentStep, 
  currentStepIndex, 
  totalSteps, 
  data,
}: DebugPanelProps) {
  return (
    <div className="debug-panel">
      <div className="debug-header">
        <h3>🔍 Debug Info</h3>
      </div>
      <div className="debug-content">
        <div className="debug-section">
          <span className="debug-label">Step Index:</span>
          <span className="debug-value">{currentStepIndex} / {totalSteps - 1}</span>
        </div>
        
        <div className="debug-section">
          <span className="debug-label">Progress:</span>
          <span className="debug-value">
            {totalSteps > 0 ? ((currentStepIndex / totalSteps) * 100).toFixed(1) : 0}%
          </span>
        </div>

        {currentStep && (
          <>
            <div className="debug-section">
              <span className="debug-label">Operation:</span>
              <span className="debug-value operation-badge">{currentStep.type}</span>
            </div>

            <div className="debug-section">
              <span className="debug-label">Indices:</span>
              <span className="debug-value">[{currentStep.indices.join(', ')}]</span>
            </div>

            {currentStep.values && currentStep.values.length > 0 && (
              <div className="debug-section">
                <span className="debug-label">Values:</span>
                <span className="debug-value">[{currentStep.values.join(', ')}]</span>
              </div>
            )}

            {currentStep.indices.length > 0 && (
              <div className="debug-section">
                <span className="debug-label">Array Values:</span>
                <span className="debug-value">
                  [{currentStep.indices.map(idx => data[idx] ?? 'N/A').join(', ')}]
                </span>
              </div>
            )}
          </>
        )}

        <div className="debug-section">
          <span className="debug-label">Array Size:</span>
          <span className="debug-value">{data.length}</span>
        </div>

        <div className="debug-section">
          <span className="debug-label">Min/Max:</span>
          <span className="debug-value">
            {Math.min(...data)} / {Math.max(...data)}
          </span>
        </div>
      </div>
    </div>
  );
}

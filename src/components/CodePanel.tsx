import { algorithmPseudocode } from '../data/algorithmCode';

interface CodePanelProps {
  algorithmName: string;
  currentLine?: number;
  isLightMode: boolean;
}

export function CodePanel({ algorithmName, currentLine = -1 }: CodePanelProps) {
  const code = algorithmPseudocode[algorithmName];

  if (!code) {
    return (
      <div className="code-panel">
        <div className="code-header">
          <h3>Pseudocode</h3>
        </div>
        <div className="code-content">
          <p style={{ opacity: 0.5, textAlign: 'center', padding: '20px' }}>
            No pseudocode available for {algorithmName}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="code-panel">
      <div className="code-header">
        <h3>Pseudocode</h3>
        <span className="code-algorithm-name">{algorithmName}</span>
      </div>
      <div className="code-content">
        {code.map((line, index) => (
          <div
            key={index}
            className={`code-line ${currentLine === index ? 'active' : ''}`}
            style={{
              paddingLeft: `${line.indent * 20 + 12}px`,
            }}
          >
            <span className="line-number">{index + 1}</span>
            <span className="line-code">{line.code || '\u00A0'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState, useMemo, useEffect } from 'react';
import { Visualizer } from './components/Visualizer';
import { ComparisonVisualizer } from './components/ComparisonVisualizer';
import { Controls } from './components/Controls';
import { CodePanel } from './components/CodePanel';
import { DebugPanel } from './components/DebugPanel';
import { Timeline } from './components/Timeline';
import { BenchmarkPanel } from './components/BenchmarkPanel';
import { algorithms } from './algorithms';
import { usePlayback } from './hooks/usePlayback';
import { algorithmInfo } from './data/algorithmInfo';
import './App.css';

function generateRandomData(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
}

function App() {
  const [datasetSize, setDatasetSize] = useState(30);
  const [speed, setSpeed] = useState(1);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithms[0]);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [compareAlgorithms, setCompareAlgorithms] = useState<typeof algorithms>([algorithms[0], algorithms[1]]);
  const [data, setData] = useState(() => generateRandomData(datasetSize));
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [colorTheme, setColorTheme] = useState('default');
  const [lightMode, setLightMode] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [barStyle, setBarStyle] = useState('gradient');
  const [showDebug, setShowDebug] = useState(false);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [showBenchmark, setShowBenchmark] = useState(false);

  // Generate steps - in comparison mode, use the longest step sequence
  const steps = useMemo(() => {
    if (!comparisonMode) {
      return selectedAlgorithm.generateSteps(data);
    } else {
      // In comparison mode, find the algorithm with the most steps
      const allSteps = compareAlgorithms.map(algo => algo.generateSteps(data));
      const longestSteps = allSteps.reduce((longest, current) => 
        current.length > longest.length ? current : longest
      , allSteps[0]);
      return longestSteps;
    }
  }, [selectedAlgorithm, data, comparisonMode, compareAlgorithms]);

  // Use the playback hook
  const {
    currentStepIndex,
    currentStep,
    playbackState,
    play,
    pause,
    reset,
    stepForward,
    stepBackward,
  } = usePlayback({ steps, speed });

  // Calculate performance metrics
  const metrics = useMemo(() => {
    const metrics = {
      comparisons: 0,
      swaps: 0,
      arrayAccesses: 0,
      overwrites: 0,
    };

    for (let i = 0; i <= currentStepIndex; i++) {
      const step = steps[i];
      if (!step) continue;

      if (step.type === 'compare') {
        metrics.comparisons++;
        metrics.arrayAccesses += step.indices.length;
      } else if (step.type === 'swap') {
        metrics.swaps++;
        metrics.arrayAccesses += step.indices.length * 2;
      } else if (step.type === 'overwrite') {
        metrics.overwrites++;
        metrics.arrayAccesses += step.indices.length;
      }
    }

    return metrics;
  }, [steps, currentStepIndex]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          if (playbackState === 'playing') {
            pause();
          } else {
            play();
          }
          break;
        case 'arrowright':
          e.preventDefault();
          if (e.shiftKey) {
            handleNextBookmark();
          } else {
            stepForward();
          }
          break;
        case 'arrowleft':
          e.preventDefault();
          if (e.shiftKey) {
            handlePrevBookmark();
          } else {
            stepBackward();
          }
          break;
        case 'r':
          e.preventDefault();
          reset();
          break;
        case 'n':
          e.preventDefault();
          handleGenerateNewData();
          break;
        case 'b':
          e.preventDefault();
          handleToggleBookmark(currentStepIndex);
          break;
        case 'd':
          e.preventDefault();
          setShowDebug(!showDebug);
          break;
        case 'c':
          e.preventDefault();
          setShowCode(!showCode);
          break;
        case 'i':
          e.preventDefault();
          setShowInfo(!showInfo);
          break;
        case 'm':
          e.preventDefault();
          setComparisonMode(!comparisonMode);
          break;
        case 't':
          e.preventDefault();
          setLightMode(!lightMode);
          break;
        default:
          if (e.key >= '1' && e.key <= '9') {
            e.preventDefault();
            const index = parseInt(e.key) - 1;
            if (index < algorithms.length && !comparisonMode) {
              setSelectedAlgorithm(algorithms[index]);
              reset();
            }
          }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playbackState, play, pause, stepForward, stepBackward, reset, currentStepIndex, bookmarks, showDebug, showCode, showInfo, comparisonMode, lightMode]);

  // Sound effect
  useEffect(() => {
    if (!soundEnabled || !currentStep) return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (currentStep.type === 'compare') {
      oscillator.frequency.value = 440; // A4
      gainNode.gain.value = 0.1;
    } else if (currentStep.type === 'swap') {
      oscillator.frequency.value = 554; // C#5
      gainNode.gain.value = 0.15;
    }

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.05);
  }, [currentStepIndex, soundEnabled, currentStep]);

  // Apply all steps up to current index to get the current state of the data
  const displayData = useMemo(() => {
    const arr = [...data];
    for (let i = 0; i <= currentStepIndex; i++) {
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

  // Track which indices are sorted
  const sortedIndices = useMemo(() => {
    const sorted: number[] = [];
    for (let i = 0; i <= currentStepIndex; i++) {
      const step = steps[i];
      if (step?.type === 'mark') {
        sorted.push(...step.indices);
      }
    }
    return sorted;
  }, [steps, currentStepIndex]);

  const handleGenerateNewData = () => {
    setData(generateRandomData(datasetSize));
    reset();
  };

  const handleDatasetSizeChange = (newSize: number) => {
    setDatasetSize(newSize);
    setData(generateRandomData(newSize));
    reset();
  };

  const handleToggleComparison = () => {
    setComparisonMode(!comparisonMode);
    reset();
  };

  const handleCompareAlgorithmChange = (index: number, algoName: string) => {
    const algo = algorithms.find((a) => a.name === algoName);
    if (algo) {
      const newCompare = [...compareAlgorithms];
      newCompare[index] = algo;
      setCompareAlgorithms(newCompare);
      reset();
    }
  };

  const handleAddComparison = () => {
    if (compareAlgorithms.length < 4) {
      setCompareAlgorithms([...compareAlgorithms, algorithms[0]]);
      reset();
    }
  };

  const handleRemoveComparison = (index: number) => {
    if (compareAlgorithms.length > 2) {
      setCompareAlgorithms(compareAlgorithms.filter((_, i) => i !== index));
      reset();
    }
  };

  const handlePresetPattern = (pattern: string) => {
    let newData: number[];
    switch (pattern) {
      case 'random':
        newData = generateRandomData(datasetSize);
        break;
      case 'sorted':
        newData = Array.from({ length: datasetSize }, (_, i) => i + 1);
        break;
      case 'reversed':
        newData = Array.from({ length: datasetSize }, (_, i) => datasetSize - i);
        break;
      case 'nearly-sorted':
        newData = Array.from({ length: datasetSize }, (_, i) => i + 1);
        // Swap a few random elements
        for (let i = 0; i < Math.floor(datasetSize / 10); i++) {
          const idx1 = Math.floor(Math.random() * datasetSize);
          const idx2 = Math.floor(Math.random() * datasetSize);
          [newData[idx1], newData[idx2]] = [newData[idx2], newData[idx1]];
        }
        break;
      case 'few-unique':
        newData = Array.from({ length: datasetSize }, () => 
          Math.floor(Math.random() * 5) + 1
        );
        break;
      case 'wave':
        newData = Array.from({ length: datasetSize }, (_, i) => 
          Math.floor(50 + 40 * Math.sin(i * Math.PI / 10))
        );
        break;
      case 'mountain':
        newData = Array.from({ length: datasetSize }, (_, i) => {
          const mid = datasetSize / 2;
          const dist = Math.abs(i - mid);
          return Math.floor(100 - (dist / mid) * 100);
        });
        break;
      case 'sawtooth':
        newData = Array.from({ length: datasetSize }, (_, i) => 
          ((i % 10) + 1) * 10
        );
        break;
      case 'zigzag':
        newData = Array.from({ length: datasetSize }, (_, i) => 
          i % 2 === 0 ? i + 1 : datasetSize - i
        );
        break;
      default:
        newData = generateRandomData(datasetSize);
    }
    setData(newData);
    reset();
  };

  const handleToggleBookmark = (step: number) => {
    if (bookmarks.includes(step)) {
      setBookmarks(bookmarks.filter(b => b !== step));
    } else {
      setBookmarks([...bookmarks, step].sort((a, b) => a - b));
    }
  };

  const handleSeek = (step: number) => {
    if (step >= 0 && step < steps.length) {
      pause();
      // Use the playback hook's internal state update
      // We'll need to call stepForward/stepBackward multiple times
      const diff = step - currentStepIndex;
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          stepForward();
        }
      } else if (diff < 0) {
        for (let i = 0; i < Math.abs(diff); i++) {
          stepBackward();
        }
      }
    }
  };

  const handleNextBookmark = () => {
    const next = bookmarks.find(b => b > currentStepIndex);
    if (next !== undefined) handleSeek(next);
  };

  const handlePrevBookmark = () => {
    const prev = [...bookmarks].reverse().find(b => b < currentStepIndex);
    if (prev !== undefined) handleSeek(prev);
  };

  const handleCustomDataInput = () => {
    try {
      const numbers = customInput
        .split(',')
        .map(s => parseInt(s.trim()))
        .filter(n => !isNaN(n) && n > 0);
      
      if (numbers.length > 0) {
        setData(numbers);
        setDatasetSize(numbers.length);
        setShowCustomInput(false);
        setCustomInput('');
        reset();
      }
    } catch (e) {
      alert('Invalid input. Please enter comma-separated numbers.');
    }
  };

  const handleShareConfig = () => {
    const config = {
      algorithm: selectedAlgorithm.name,
      data: data,
      speed: speed,
      theme: colorTheme,
      comparison: comparisonMode,
      algorithms: comparisonMode ? compareAlgorithms.map(a => a.name) : undefined,
    };
    const encoded = btoa(JSON.stringify(config));
    const url = `${window.location.origin}${window.location.pathname}?config=${encoded}`;
    navigator.clipboard.writeText(url);
    alert('Configuration URL copied to clipboard!');
  };

  const handleCopyMetrics = () => {
    const text = `Algorithm: ${selectedAlgorithm.name}
Dataset Size: ${data.length}
Comparisons: ${metrics.comparisons}
Swaps: ${metrics.swaps}
Array Accesses: ${metrics.arrayAccesses}
Overwrites: ${metrics.overwrites}
Total Steps: ${steps.length}`;
    navigator.clipboard.writeText(text);
    alert('Metrics copied to clipboard!');
  };

  return (
    <div className={`app ${lightMode ? 'light-mode' : ''}`} data-theme={colorTheme}>
      <div className="background-gradient"></div>
      
      <header className="header glass-panel">
        <h1 className="title">
          <span className="title-gradient">Sorta</span>
        </h1>
        <p className="subtitle">Algorithm Visualization Laboratory</p>
        <p className="author-credit">
          by <a href="https://github.com/supunhg" target="_blank" rel="noopener noreferrer">Supun Hewagamage</a>
        </p>
        <div className="header-shortcuts">
          <span title="Space: Play/Pause">⎵</span>
          <span title="Arrow Keys: Step | Shift+Arrows: Bookmarks">←→</span>
          <span title="R: Reset">R</span>
          <span title="N: New Data">N</span>
          <span title="B: Bookmark">B</span>
          <span title="D: Debug">D</span>
          <span title="C: Code">C</span>
          <span title="I: Info">I</span>
          <span title="M: Compare Mode">M</span>
          <span title="T: Theme">T</span>
          <span title="1-9: Select Algorithm">1-9</span>
        </div>
      </header>

      <main className={`main-content ${comparisonMode ? 'comparison-mode' : ''}`}>
        <div className="config-panel glass-panel">
          <div className="config-section">
            <label>
              <input
                type="checkbox"
                checked={comparisonMode}
                onChange={handleToggleComparison}
                style={{ marginRight: '0.5rem' }}
              />
              Comparison Mode
            </label>
          </div>

          <div className="config-section">
            <label>
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                style={{ marginRight: '0.5rem' }}
              />
              Sound Effects
            </label>
          </div>

          <div className="config-section">
            <label>
              <input
                type="checkbox"
                checked={lightMode}
                onChange={(e) => setLightMode(e.target.checked)}
                style={{ marginRight: '0.5rem' }}
              />
              Light Mode
            </label>
          </div>

          <div className="config-section">
            <label htmlFor="theme">Color Theme</label>
            <select
              id="theme"
              value={colorTheme}
              onChange={(e) => setColorTheme(e.target.value)}
              className="select-input"
            >
              <option value="default">Default (Blue)</option>
              <option value="sunset">Sunset (Orange)</option>
              <option value="forest">Forest (Green)</option>
              <option value="ocean">Ocean (Teal)</option>
              <option value="purple">Purple Dream</option>
            </select>
          </div>

          <div className="config-section">
            <label htmlFor="barStyle">Bar Style</label>
            <select
              id="barStyle"
              value={barStyle}
              onChange={(e) => setBarStyle(e.target.value)}
              className="select-input"
            >
              <option value="gradient">Gradient</option>
              <option value="solid">Solid</option>
              <option value="outline">Outline</option>
              <option value="3d">3D Effect</option>
            </select>
          </div>

          {!comparisonMode && (
            <div className="config-section">
              <label htmlFor="algorithm">Algorithm</label>
              <select
                id="algorithm"
                value={selectedAlgorithm.name}
                onChange={(e) => {
                  const algo = algorithms.find((a) => a.name === e.target.value);
                  if (algo) {
                    setSelectedAlgorithm(algo);
                    reset();
                  }
                }}
                className="select-input"
              >
                {algorithms.map((algo) => (
                  <option key={algo.name} value={algo.name}>
                    {algo.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {comparisonMode && (
            <div className="config-section">
              <label>Comparing Algorithms</label>
              {compareAlgorithms.map((algo, index) => (
                <div key={index} style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.25rem' }}>
                  <select
                    value={algo.name}
                    onChange={(e) => handleCompareAlgorithmChange(index, e.target.value)}
                    className="select-input"
                    style={{ flex: 1 }}
                  >
                    {algorithms.map((a) => (
                      <option key={a.name} value={a.name}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                  {compareAlgorithms.length > 2 && (
                    <button
                      onClick={() => handleRemoveComparison(index)}
                      className="control-btn"
                      style={{ padding: '0.4rem', fontSize: '0.7rem' }}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              {compareAlgorithms.length < 4 && (
                <button onClick={handleAddComparison} className="generate-btn" style={{ fontSize: '0.7rem', padding: '0.4rem' }}>
                  + Add Algorithm
                </button>
              )}
            </div>
          )}

          <div className="config-section">
            <label htmlFor="size">
              Dataset Size: {datasetSize}
            </label>
            <input
              id="size"
              type="range"
              min="5"
              max="100"
              value={datasetSize}
              onChange={(e) => handleDatasetSizeChange(parseInt(e.target.value))}
              className="range-input"
            />
          </div>

          <div className="config-section">
            <label>Data Patterns</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.25rem' }}>
              <button onClick={() => handlePresetPattern('random')} className="preset-btn">Random</button>
              <button onClick={() => handlePresetPattern('sorted')} className="preset-btn">Sorted</button>
              <button onClick={() => handlePresetPattern('reversed')} className="preset-btn">Reversed</button>
              <button onClick={() => handlePresetPattern('nearly-sorted')} className="preset-btn">Nearly</button>
              <button onClick={() => handlePresetPattern('few-unique')} className="preset-btn">Few Unique</button>
              <button onClick={() => handlePresetPattern('wave')} className="preset-btn">Wave</button>
              <button onClick={() => handlePresetPattern('mountain')} className="preset-btn">Mountain</button>
              <button onClick={() => handlePresetPattern('sawtooth')} className="preset-btn">Sawtooth</button>
              <button onClick={() => handlePresetPattern('zigzag')} className="preset-btn">Zigzag</button>
              <button onClick={() => setShowCustomInput(!showCustomInput)} className="preset-btn">Custom</button>
            </div>
            {showCustomInput && (
              <div style={{ marginTop: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="e.g., 5,2,8,1,9"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="select-input"
                  style={{ marginBottom: '0.25rem' }}
                />
                <button onClick={handleCustomDataInput} className="generate-btn" style={{ width: '100%', padding: '0.4rem' }}>
                  Apply
                </button>
              </div>
            )}
          </div>

          <button onClick={handleGenerateNewData} className="generate-btn">
            Generate New Data
          </button>

          <div className="config-section">
            <button onClick={handleShareConfig} className="share-btn">
              📋 Copy Config URL
            </button>
            <button onClick={handleCopyMetrics} className="share-btn">
              📊 Copy Metrics
            </button>
          </div>

          {!comparisonMode && (
            <>
              <div className="algorithm-info">
                <div className="complexity-badge">
                  <span className="label">Time:</span>
                  <span className="value">{selectedAlgorithm.complexity.time}</span>
                </div>
                <div className="complexity-badge">
                  <span className="label">Space:</span>
                  <span className="value">{selectedAlgorithm.complexity.space}</span>
                </div>
              </div>

              <button 
                onClick={() => setShowInfo(!showInfo)} 
                className="info-toggle-btn"
              >
                {showInfo ? '▼' : '▶'} Algorithm Info
              </button>

              <button 
                onClick={() => setShowCode(!showCode)} 
                className="code-toggle-btn"
              >
                {showCode ? '▼' : '▶'} View Pseudocode
              </button>

              <button 
                onClick={() => setShowDebug(!showDebug)} 
                className="code-toggle-btn"
              >
                {showDebug ? '▼' : '▶'} Debug Panel
              </button>

              {showInfo && algorithmInfo[selectedAlgorithm.name as keyof typeof algorithmInfo] && (
                <div className="algo-info-card">
                  <p className="info-section">
                    <strong>Description:</strong><br />
                    {algorithmInfo[selectedAlgorithm.name as keyof typeof algorithmInfo].description}
                  </p>
                  <p className="info-section">
                    <strong>When to Use:</strong><br />
                    {algorithmInfo[selectedAlgorithm.name as keyof typeof algorithmInfo].whenToUse}
                  </p>
                  <p className="info-section">
                    <strong>Pros:</strong> {algorithmInfo[selectedAlgorithm.name as keyof typeof algorithmInfo].pros}
                  </p>
                  <p className="info-section">
                    <strong>Cons:</strong> {algorithmInfo[selectedAlgorithm.name as keyof typeof algorithmInfo].cons}
                  </p>
                  <p className="info-section">
                    <strong>Real World:</strong><br />
                    {algorithmInfo[selectedAlgorithm.name as keyof typeof algorithmInfo].realWorld}
                  </p>
                </div>
              )}

              {showCode && (
                <CodePanel 
                  algorithmName={selectedAlgorithm.name}
                  isLightMode={lightMode}
                />
              )}

              {showDebug && (
                <DebugPanel
                  currentStep={currentStep}
                  currentStepIndex={currentStepIndex}
                  totalSteps={steps.length}
                  data={displayData}
                  isLightMode={lightMode}
                />
              )}

              {bookmarks.length > 0 && (
                <div className="bookmarks-panel">
                  <h4>📌 Bookmarks ({bookmarks.length})</h4>
                  <div className="bookmarks-list">
                    {bookmarks.map(bookmark => (
                      <button
                        key={bookmark}
                        onClick={() => handleSeek(bookmark)}
                        className={`bookmark-btn ${bookmark === currentStepIndex ? 'active' : ''}`}
                      >
                        Step {bookmark}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setBookmarks([])} 
                    className="clear-bookmarks-btn"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </>
          )}

          <div className="power-user-actions">
            <button 
              onClick={() => setShowBenchmark(true)} 
              className="power-btn"
              title="Benchmark all algorithms"
            >
              🏁 Benchmark All
            </button>
          </div>

          <div className="stats">
            <div className="stat">
              <span className="stat-label">Step:</span>
              <span className="stat-value">{currentStepIndex + 1} / {steps.length}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Status:</span>
              <span className="stat-value">{playbackState}</span>
            </div>
          </div>

          <div className="performance-metrics">
            <h4 className="metrics-title">📊 Performance Metrics</h4>
            <div className="metric-item">
              <span className="metric-label">Comparisons:</span>
              <span className="metric-value">{metrics.comparisons}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Swaps:</span>
              <span className="metric-value">{metrics.swaps}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Array Accesses:</span>
              <span className="metric-value">{metrics.arrayAccesses}</span>
            </div>
            {metrics.overwrites > 0 && (
              <div className="metric-item">
                <span className="metric-label">Overwrites:</span>
                <span className="metric-value">{metrics.overwrites}</span>
              </div>
            )}
          </div>
        </div>

        <div className="right-content">
          {!comparisonMode && (
            <div className="timeline-wrapper">
              <Timeline
                currentStep={currentStepIndex}
                totalSteps={steps.length}
                bookmarks={bookmarks}
                onSeek={handleSeek}
                onToggleBookmark={handleToggleBookmark}
              />
            </div>
          )}

          <div className="visualizer-wrapper glass-panel">
          {!comparisonMode ? (
            <Visualizer
              data={displayData}
              currentStep={currentStep}
              highlightedIndices={[]}
              sortedIndices={sortedIndices}
              colorTheme={colorTheme}
              barStyle={barStyle}
            />
          ) : (
            <div className="comparison-grid" data-count={compareAlgorithms.length}>
              {compareAlgorithms.map((algo, index) => (
                <ComparisonVisualizer
                  key={index}
                  algorithmName={algo.name}
                  complexity={algo.complexity.time}
                  data={data}
                  steps={algo.generateSteps(data)}
                  currentStepIndex={currentStepIndex}
                  colorTheme={colorTheme}
                  barStyle={barStyle}
                />
              ))}
            </div>
          )}
        </div>
        </div>
      </main>

      <Controls
        onPlay={play}
        onPause={pause}
        onReset={reset}
        onStepForward={stepForward}
        onStepBackward={stepBackward}
        onSpeedChange={setSpeed}
        playbackState={playbackState}
        speed={speed}
      />

      {showBenchmark && (
        <BenchmarkPanel
          algorithms={algorithms}
          data={data}
          onClose={() => setShowBenchmark(false)}
        />
      )}
    </div>
  );
}

export default App;

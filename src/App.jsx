import React, { useEffect } from 'react';
import './App.css';
import ArrayBars from './components/ArrayBars';
import PlaybackControls from './components/PlaybackControls';
import StatsPanel from './components/StatsPanel';
import { useSortStore } from './store/useSortStore';
import { bubbleSort } from './engines/sorting/bubbleSort';
import { insertionSort } from './engines/sorting/insertionSort';
import { mergeSort } from './engines/sorting/mergeSort';
import { quickSort } from './engines/sorting/quickSort';

function App() {
  const generateArray = useSortStore(state => state.generateArray);
  const setTrace = useSortStore(state => state.setTrace);
  const algorithm = useSortStore(state => state.algorithm);
  const setAlgorithm = useSortStore(state => state.setAlgorithm);
  const array = useSortStore(state => state.array);
  const setIsPlaying = useSortStore(state => state.setIsPlaying);

  useEffect(() => {
    generateArray();
  }, [generateArray]);

  const handleGenerate = () => {
    setIsPlaying(false);
    generateArray();
  };

  const handleSort = () => {
    setIsPlaying(false);
    // Use the initial array state to generate the trace
    const currentState = useSortStore.getState().array;
    let trace = [];
    
    switch (algorithm) {
      case 'bubble':
        trace = bubbleSort(currentState);
        break;
      case 'insertion':
        trace = insertionSort(currentState);
        break;
      case 'merge':
        trace = mergeSort(currentState);
        break;
      case 'quick':
        trace = quickSort(currentState);
        break;
      default:
        break;
    }
    
    setTrace(trace);
    setIsPlaying(true);
  };

  return (
    <div className="app-container">
      <header className="app-header glass-panel">
        <h1>Code Visualizer</h1>
        <p>Interactive Algorithm Exploration</p>
        
        <div className="controls-row">
          <button className="primary-btn" onClick={handleGenerate}>Randomize Array</button>
          
          <select 
            className="algorithm-select"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            <option value="bubble">Bubble Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="merge">Merge Sort</option>
            <option value="quick">Quick Sort</option>
          </select>
          
          <button className="primary-btn accent" onClick={handleSort}>Sort!</button>
        </div>
      </header>
      
      <main className="visualizer-main">
        <ArrayBars />
        <div className="dashboard">
          <PlaybackControls />
          <StatsPanel />
        </div>
      </main>
    </div>
  );
}

export default App;

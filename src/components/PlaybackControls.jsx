import React, { useEffect, useRef } from 'react';
import { useSortStore } from '../store/useSortStore';
import './PlaybackControls.css';

const PlaybackControls = () => {
  const isPlaying = useSortStore(state => state.isPlaying);
  const setIsPlaying = useSortStore(state => state.setIsPlaying);
  const stepForward = useSortStore(state => state.stepForward);
  const stepBackward = useSortStore(state => state.stepBackward);
  const playbackSpeed = useSortStore(state => state.playbackSpeed);
  const setPlaybackSpeed = useSortStore(state => state.setPlaybackSpeed);
  
  const timerRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        const { currentStepIndex, trace } = useSortStore.getState();
        if (currentStepIndex >= trace.length - 1) {
          setIsPlaying(false);
        } else {
          stepForward();
        }
      }, playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, stepForward, setIsPlaying]);

  return (
    <div className="playback-controls glass-panel">
      <button className="control-btn" onClick={stepBackward}>⏮️ Step Back</button>
      <button className="control-btn play-btn" onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? '⏸️ Pause' : '▶️ Play'}
      </button>
      <button className="control-btn" onClick={stepForward}>⏭️ Step Forward</button>
      
      <div className="speed-control">
        <label>Speed: {playbackSpeed}ms</label>
        <input 
          type="range" 
          min="10" 
          max="500" 
          step="10"
          value={510 - playbackSpeed} // Reverse so slider right is faster
          onChange={(e) => setPlaybackSpeed(510 - Number(e.target.value))} 
        />
      </div>
    </div>
  );
};

export default PlaybackControls;

import { create } from 'zustand';

export const useSortStore = create((set, get) => ({
  arraySize: 20,
  array: [],
  algorithm: 'bubble', // bubble, insertion, merge, quick
  trace: [],
  currentStepIndex: 0,
  isPlaying: false,
  playbackSpeed: 50, // ms
  
  // State from trace
  comparing: [],
  swapping: [],
  sorted: [],
  stats: { comparisons: 0, swaps: 0 },

  setArraySize: (size) => set({ arraySize: size }),
  setAlgorithm: (alg) => set({ algorithm: alg }),
  
  generateArray: () => {
    const size = get().arraySize;
    const newArr = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 10);
    set({ 
      array: newArr, 
      trace: [], 
      currentStepIndex: 0, 
      comparing: [], 
      swapping: [], 
      sorted: [],
      stats: { comparisons: 0, swaps: 0 },
      isPlaying: false
    });
  },

  setTrace: (trace) => {
    set({ trace, currentStepIndex: 0 });
    if(trace.length > 0) {
      get().applyStep(0);
    }
  },

  applyStep: (index) => {
    const trace = get().trace;
    if (index >= 0 && index < trace.length) {
      const step = trace[index];
      set({
        currentStepIndex: index,
        array: step.array,
        comparing: step.comparing,
        swapping: step.swapping,
        sorted: step.sorted,
        stats: step.stats
      });
    }
  },

  stepForward: () => {
    const { currentStepIndex, trace, applyStep } = get();
    if (currentStepIndex < trace.length - 1) applyStep(currentStepIndex + 1);
  },
  
  stepBackward: () => {
    const { currentStepIndex, applyStep } = get();
    if (currentStepIndex > 0) applyStep(currentStepIndex - 1);
  },

  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
}));

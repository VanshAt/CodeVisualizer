export class Tracer {
  constructor(initialArray) {
    this.trace = [];
    this.comparisons = 0;
    this.swaps = 0;
    
    // Add initial state
    this.recordState(initialArray, [], [], []);
  }

  recordState(array, comparing = [], swapping = [], sorted = []) {
    this.trace.push({
      array: [...array],
      comparing: [...comparing],
      swapping: [...swapping],
      sorted: [...sorted],
      stats: {
        comparisons: this.comparisons,
        swaps: this.swaps
      }
    });
  }

  addComparison() {
    this.comparisons++;
  }

  addSwap() {
    this.swaps++;
  }

  getTrace() {
    return this.trace;
  }
}

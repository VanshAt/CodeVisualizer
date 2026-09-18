import { Tracer } from '../../core/Tracer';

export const quickSort = (initialArray) => {
  const tracer = new Tracer(initialArray);
  let array = [...initialArray];
  let sorted = [];

  const swap = (i, j) => {
    tracer.addSwap();
    tracer.recordState(array, [], [i, j], sorted);
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    tracer.recordState(array, [], [i, j], sorted);
  };

  const partition = (low, high) => {
    let pivot = array[high];
    let i = (low - 1);

    for (let j = low; j <= high - 1; j++) {
      tracer.addComparison();
      tracer.recordState(array, [j, high], [], sorted);

      if (array[j] < pivot) {
        i++;
        swap(i, j);
      }
    }
    swap(i + 1, high);
    return (i + 1);
  };

  const quickSortRecursive = (low, high) => {
    if (low < high) {
      let pi = partition(low, high);
      
      sorted.push(pi);
      tracer.recordState(array, [], [], sorted);

      quickSortRecursive(low, pi - 1);
      quickSortRecursive(pi + 1, high);
    } else if (low === high) {
      sorted.push(low);
      tracer.recordState(array, [], [], sorted);
    }
  };

  quickSortRecursive(0, array.length - 1);
  
  // ensure all elements are marked sorted eventually
  sorted = array.map((_, i) => i);
  tracer.recordState(array, [], [], sorted);

  return tracer.getTrace();
};

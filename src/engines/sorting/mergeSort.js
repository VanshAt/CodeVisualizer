import { Tracer } from '../../core/Tracer';

export const mergeSort = (initialArray) => {
  const tracer = new Tracer(initialArray);
  let array = [...initialArray];
  let sorted = [];

  const merge = (left, mid, right) => {
    let n1 = mid - left + 1;
    let n2 = right - mid;

    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++) L[i] = array[left + i];
    for (let j = 0; j < n2; j++) R[j] = array[mid + 1 + j];

    let i = 0, j = 0;
    let k = left;

    while (i < n1 && j < n2) {
      tracer.addComparison();
      tracer.recordState(array, [left + i, mid + 1 + j], [], sorted);

      if (L[i] <= R[j]) {
        tracer.addSwap(); // conceptually an overwrite
        tracer.recordState(array, [], [k], sorted);
        array[k] = L[i];
        tracer.recordState(array, [], [k], sorted);
        i++;
      } else {
        tracer.addSwap();
        tracer.recordState(array, [], [k], sorted);
        array[k] = R[j];
        tracer.recordState(array, [], [k], sorted);
        j++;
      }
      k++;
    }

    while (i < n1) {
      tracer.addSwap();
      tracer.recordState(array, [], [k], sorted);
      array[k] = L[i];
      tracer.recordState(array, [], [k], sorted);
      i++;
      k++;
    }

    while (j < n2) {
      tracer.addSwap();
      tracer.recordState(array, [], [k], sorted);
      array[k] = R[j];
      tracer.recordState(array, [], [k], sorted);
      j++;
      k++;
    }
  };

  const mergeSortRecursive = (left, right) => {
    if (left >= right) return;
    
    let mid = Math.floor(left + (right - left) / 2);
    mergeSortRecursive(left, mid);
    mergeSortRecursive(mid + 1, right);
    merge(left, mid, right);
    
    if (left === 0 && right === array.length - 1) {
      for(let i = 0; i < array.length; i++) sorted.push(i);
      tracer.recordState(array, [], [], sorted);
    }
  };

  mergeSortRecursive(0, array.length - 1);
  return tracer.getTrace();
};

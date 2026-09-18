import { Tracer } from '../../core/Tracer';

export const insertionSort = (initialArray) => {
  const tracer = new Tracer(initialArray);
  let array = [...initialArray];
  let sorted = [0]; // First element is conceptually sorted initially

  tracer.recordState(array, [], [], sorted);

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    tracer.addComparison();
    tracer.recordState(array, [j, i], [], sorted);

    while (j >= 0 && array[j] > key) {
      tracer.addSwap();
      tracer.recordState(array, [], [j, j + 1], sorted);
      
      array[j + 1] = array[j];
      
      tracer.recordState(array, [], [j, j + 1], sorted);
      j = j - 1;
      
      if (j >= 0) {
        tracer.addComparison();
        tracer.recordState(array, [j, j + 1], [], sorted);
      }
    }
    array[j + 1] = key;
    
    // Everything up to i is now sorted
    sorted = [];
    for(let k=0; k<=i; k++) sorted.push(k);
    
    tracer.recordState(array, [], [], sorted);
  }
  
  return tracer.getTrace();
};

import { Tracer } from '../../core/Tracer';

export const bubbleSort = (initialArray) => {
  const tracer = new Tracer(initialArray);
  let array = [...initialArray];
  let sorted = [];

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      tracer.addComparison();
      tracer.recordState(array, [j, j + 1], [], sorted);

      if (array[j] > array[j + 1]) {
        tracer.addSwap();
        tracer.recordState(array, [], [j, j + 1], sorted);
        
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        
        tracer.recordState(array, [], [j, j + 1], sorted);
      }
    }
    sorted.push(array.length - i - 1);
    tracer.recordState(array, [], [], sorted);
  }
  
  sorted.push(0); // the first element is also sorted now
  tracer.recordState(array, [], [], sorted);
  
  return tracer.getTrace();
};

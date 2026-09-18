import React from 'react';
import { useSortStore } from '../store/useSortStore';
import './ArrayBars.css';

const ArrayBars = () => {
  const array = useSortStore((state) => state.array);
  const comparing = useSortStore((state) => state.comparing);
  const swapping = useSortStore((state) => state.swapping);
  const sorted = useSortStore((state) => state.sorted);

  const maxVal = Math.max(...array, 1);

  return (
    <div className="array-container">
      {array.map((val, idx) => {
        let stateClass = 'default';
        if (sorted.includes(idx)) stateClass = 'sorted';
        if (comparing.includes(idx)) stateClass = 'comparing';
        if (swapping.includes(idx)) stateClass = 'swapping';

        const heightPercentage = (val / maxVal) * 100;

        return (
          <div 
            key={idx} 
            className={`array-bar ${stateClass}`}
            style={{ height: `${heightPercentage}%` }}
          >
            <span className="array-bar-label">{val}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ArrayBars;

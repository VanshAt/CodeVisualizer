import React from 'react';
import { useSortStore } from '../store/useSortStore';
import './StatsPanel.css';

const StatsPanel = () => {
  const stats = useSortStore(state => state.stats);

  return (
    <div className="stats-panel glass-panel">
      <div className="stat-item">
        <span className="stat-label">Comparisons</span>
        <span className="stat-value">{stats.comparisons}</span>
      </div>
      <div className="stat-divider"></div>
      <div className="stat-item">
        <span className="stat-label">Swaps</span>
        <span className="stat-value">{stats.swaps}</span>
      </div>
    </div>
  );
};

export default StatsPanel;

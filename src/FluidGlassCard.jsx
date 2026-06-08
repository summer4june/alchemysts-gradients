import React from 'react';
import './FluidGlassCard.css';

export const FluidGlassCard = ({ children, className = '' }) => {
  return (
    <div className={`fluid-glass-card ${className}`}>
      <div className="fluid-glass-content">
        {children}
      </div>
    </div>
  );
};

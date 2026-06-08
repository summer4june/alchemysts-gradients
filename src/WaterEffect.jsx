import React from 'react';

export const WaterEffect = () => {
  return (
    <svg style={{ position: 'fixed', width: 0, height: 0, pointerEvents: 'none', zIndex: -10 }}>
      <filter id="water-distortion" x="-50%" y="-50%" width="200%" height="200%">
        <feTurbulence 
          type="fractalNoise" 
          baseFrequency="0.005 0.008" 
          numOctaves="3" 
          result="noise"
        >
          <animate 
            attributeName="baseFrequency" 
            values="0.005 0.008; 0.008 0.005; 0.005 0.008" 
            dur="15s" 
            repeatCount="indefinite" 
          />
        </feTurbulence>
        <feDisplacementMap 
          in="SourceGraphic" 
          in2="noise" 
          scale="50" 
          xChannelSelector="R" 
          yChannelSelector="G" 
        />
      </filter>
    </svg>
  );
};

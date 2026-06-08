import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import './SettingsPanel.css';

export const SettingsPanel = ({ 
  blurValue, setBlurValue, 
  refraction, setRefraction, 
  depth, setDepth, 
  onClose 
}) => {
  const [copied, setCopied] = useState(false);

  const generatedCSS = `.glass-card {
  background: rgba(5, 5, 10, ${refraction});
  backdrop-filter: blur(${blurValue}px);
  -webkit-backdrop-filter: blur(${blurValue}px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(255, 255, 255, 0.02),
    inset 0 0 ${depth * 2}px ${depth}px rgba(0, 0, 0, ${(depth / 100).toFixed(2)});
  position: relative;
  overflow: hidden;
}

/* Add liquid effect blobs here... */
.glass-card::before, .glass-card::after {
  content: '';
  position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
  pointer-events: none; z-index: 0; mix-blend-mode: screen; filter: blur(60px); opacity: 0.6;
}
.glass-card::before {
  background: radial-gradient(circle at 30% 30%, rgba(0, 245, 255, 0.4) 0%, transparent 40%),
              radial-gradient(circle at 70% 60%, rgba(255, 0, 168, 0.3) 0%, transparent 50%);
  animation: liquid-blob-1 12s infinite alternate ease-in-out;
}
.glass-card::after {
  background: radial-gradient(circle at 60% 20%, rgba(161, 0, 255, 0.35) 0%, transparent 45%),
              radial-gradient(circle at 20% 80%, rgba(255, 212, 0, 0.25) 0%, transparent 40%);
  animation: liquid-blob-2 15s infinite alternate-reverse ease-in-out;
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCSS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="settings-panel">
      <div className="settings-header">
        <h2>Settings</h2>
        <button className="close-btn" onClick={onClose} aria-label="Close Settings">
          <X size={20} />
        </button>
      </div>

      <div className="settings-content">
        <div className="slider-group">
          <div className="slider-label">
            <span>Blur value</span>
            <span className="slider-value">{blurValue}</span>
          </div>
          <input 
            type="range" 
            min="0" max="50" 
            value={blurValue} 
            onChange={(e) => setBlurValue(Number(e.target.value))} 
            className="custom-slider"
          />
        </div>

        <div className="slider-group">
          <div className="slider-label">
            <span>Refraction</span>
            <span className="slider-value">{refraction}</span>
          </div>
          <input 
            type="range" 
            min="0" max="1" step="0.01" 
            value={refraction} 
            onChange={(e) => setRefraction(Number(e.target.value))} 
            className="custom-slider"
          />
        </div>

        <div className="slider-group">
          <div className="slider-label">
            <span>Depth</span>
            <span className="slider-value">{depth}</span>
          </div>
          <input 
            type="range" 
            min="0" max="100" 
            value={depth} 
            onChange={(e) => setDepth(Number(e.target.value))} 
            className="custom-slider"
          />
        </div>

        <div className="code-block-wrapper">
          <pre className="code-block">
            <code>{generatedCSS}</code>
          </pre>
        </div>

        <button className={`btn-copy ${copied ? 'copied' : ''}`} onClick={handleCopy}>
          {copied ? <><Check size={16} /> Copied</> : 'Copy CSS'}
        </button>
      </div>
    </div>
  );
};

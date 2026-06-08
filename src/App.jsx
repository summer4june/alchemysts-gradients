import React, { useState, useEffect } from 'react';
import { ArrowRight, Palette, Type, Layers, Settings } from 'lucide-react';
import './index.css';
import { FluidGlassCard } from './FluidGlassCard';
import { SettingsPanel } from './SettingsPanel';
import { WaterEffect } from './WaterEffect';

const gradients = [
  { id: 'theme-neon-chrome', name: '1. Neon Chrome Rush' },
  { id: 'theme-liquid-titanium', name: '2. Liquid Titanium Synthwave' },
  { id: 'theme-cyber-alloy', name: '3. Cyber Alloy Horizon' },
  { id: 'theme-plasma-steel', name: '4. Plasma Steel Drive' },
  { id: 'theme-neon-abyss', name: '5. Neon Abyss' },
  { id: 'theme-chrome-eclipse', name: '6. Chrome Eclipse' },
  { id: 'theme-electric-midnight', name: '7. Electric Midnight' },
  { id: 'theme-magenta-overdrive', name: '8. Magenta Overdrive' },
  { id: 'theme-shimmer-void', name: '9. Shimmer Void' },
  { id: 'theme-cherry-steel', name: '10. Cherry Steel' }
];

const fontsList = [
  { id: 'font-outfit', name: 'Default (Outfit)', cssVar: "'Outfit', sans-serif" },
  { id: 'font-bulzing', name: 'Bulzing', cssVar: "'Bulzing', sans-serif" },
  { id: 'font-circuit', name: 'Circuit Forem', cssVar: "'Circuit Forem', sans-serif" },
  { id: 'font-glitch', name: 'Glitch Goblin', cssVar: "'Glitch Goblin', sans-serif" },
  { id: 'font-dystopian', name: 'SD Dystopian', cssVar: "'SD Dystopian', sans-serif" }
];

const Navbar = ({ currentTheme, onThemeSelect, currentFont, onFontSelect, onSettingsClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFontOpen, setIsFontOpen] = useState(false);

  return (
    <nav className="elegant-navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <img src="/oswqpvwrauZBOqpfMXR1yi5qvIw.avif" alt="Alchemysts Logo" className="logo-img" />
        </div>
        <div className="nav-links-right">
          <div className="theme-selector">
            <button className="theme-toggle-btn" onClick={onSettingsClick} aria-label="Open Settings">
              <Settings size={18} />
            </button>
          </div>

          <div className="theme-selector">
            <button className="theme-toggle-btn" onClick={() => { setIsFontOpen(!isFontOpen); setIsOpen(false); }} aria-label="Toggle Font Menu">
              <Type size={18} />
            </button>
            {isFontOpen && (
              <div className="theme-dropdown">
                {fontsList.map(f => (
                  <button
                    key={f.id}
                    className={`theme-option ${currentFont === f.cssVar ? 'active' : ''}`}
                    onClick={() => { onFontSelect(f.cssVar); setIsFontOpen(false); }}
                    style={{ fontFamily: f.cssVar }}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="theme-selector">
            <button className="theme-toggle-btn" onClick={() => { setIsOpen(!isOpen); setIsFontOpen(false); }} aria-label="Toggle Theme Menu">
              <Palette size={18} />
            </button>
            {isOpen && (
              <div className="theme-dropdown">
                {gradients.map(g => (
                  <button
                    key={g.id}
                    className={`theme-option ${currentTheme === g.id ? 'active' : ''}`}
                    onClick={() => { onThemeSelect(g.id); setIsOpen(false); }}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const GlassCard = ({ title, description, actionText }) => {
  return (
    <FluidGlassCard>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', justifyContent: 'center' }}>
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{description}</p>
        <button className="card-action">
          {actionText} <ArrowRight size={16} />
        </button>
      </div>
    </FluidGlassCard>
  );
};

function App() {
  const [theme, setTheme] = useState('theme-cherry-steel');
  const [currentFont, setCurrentFont] = useState("'SD Dystopian', sans-serif");

  // Settings State
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(true);
  const [blurValue, setBlurValue] = useState(43);
  const [refraction, setRefraction] = useState(0.88);
  const [depth, setDepth] = useState(19);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-family', currentFont);
  }, [currentFont]);

  useEffect(() => {
    document.documentElement.style.setProperty('--glass-blur', `${blurValue}px`);
    document.documentElement.style.setProperty('--glass-refraction', refraction);
    document.documentElement.style.setProperty('--glass-depth', `${depth}px`);
    document.documentElement.style.setProperty('--glass-depth-alpha', (depth / 100).toFixed(2));
  }, [blurValue, refraction, depth]);

  const cards = [
    {
      title: '3D Worlds',
      description: 'Cinematic 3D worlds that make your brand impossible to ignore.',
      actionText: 'Explore 3D work'
    },
    {
      title: 'Game Design',
      description: 'Game-style visuals that turn casual viewers into obsessed fans.',
      actionText: 'See brand case studies'
    },
    {
      title: 'Motion Graphics',
      description: 'High-impact motion graphics that add energy to every frame.',
      actionText: 'View motion projects'
    },
    {
      title: 'Web Experiences',
      description: 'Bold web experiences that fuse 3D, motion, and storytelling into one.',
      actionText: 'Explore web design'
    }
  ];

  return (
    <>
      <WaterEffect />
      <div className="ambient-background" style={{ filter: 'url(#water-distortion)' }}></div>

      <Navbar
        currentTheme={theme}
        onThemeSelect={setTheme}
        currentFont={currentFont}
        onFontSelect={setCurrentFont}
        onSettingsClick={() => setIsSettingsPanelOpen(true)}
      />

      <section className="main-section">
        <div className="content-container">
          <div className="section-header">
            <h1 className="section-title">Design That Feels Like Magic</h1>
          </div>

          <div className="cards-grid">
            {cards.map((card, index) => (
              <GlassCard
                key={index}
                title={card.title}
                description={card.description}
                actionText={card.actionText}
              />
            ))}
          </div>
        </div>
      </section>

      {isSettingsPanelOpen && (
        <SettingsPanel
          blurValue={blurValue}
          setBlurValue={setBlurValue}
          refraction={refraction}
          setRefraction={setRefraction}
          depth={depth}
          setDepth={setDepth}
          onClose={() => setIsSettingsPanelOpen(false)}
        />
      )}
    </>
  );
}

export default App;

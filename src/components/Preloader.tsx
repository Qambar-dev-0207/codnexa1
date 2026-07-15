'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [activeText, setActiveText] = useState('INITIALIZING SYSTEMS');
  const [complete, setComplete] = useState(false);
  const [visible, setVisible] = useState(true);

  const logs = [
    { target: 15, text: 'LOADING CORE MODULES...' },
    { target: 35, text: 'PARSING DESIGN TOKENS...' },
    { target: 55, text: 'COMPILING GLOW MESHES...' },
    { target: 75, text: 'ESTABLISHING HANDSHAKE...' },
    { target: 95, text: 'ALL SYSTEMS NOMINAL.' },
  ];

  useEffect(() => {
    // Disable scrolling during load
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    const duration = 1800; // 1.8 seconds loading

    const update = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(elapsed / duration, 1);
      const currentProgress = Math.round(pct * 100);
      
      setProgress(currentProgress);

      const match = logs.find(l => currentProgress <= l.target);
      if (match) {
        setActiveText(match.text);
      } else {
        setActiveText('BOOT COMPLETE.');
      }

      if (pct < 1) {
        requestAnimationFrame(update);
      } else {
        setComplete(true);
        setTimeout(() => {
          setVisible(false);
          document.body.style.overflow = '';
        }, 800); 
      }
    };

    requestAnimationFrame(update);

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#050505',
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingInline: 'var(--gutter)',
        fontFamily: "var(--font-sans), monospace",
        color: '#f0f0f0',
        transition: 'transform 0.85s cubic-bezier(0.85, 0, 0.15, 1)',
        transform: complete ? 'translateY(-100%)' : 'translateY(0)',
      }}
    >
      <div
        style={{
          maxWidth: '520px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* Brand System */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #1a1a1a', paddingBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
            <span style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em', fontWeight: 300 }}>Codnexa</span>
            <span style={{ color: 'var(--accent)', fontSize: '1.25rem', fontWeight: 700 }}>.</span>
          </div>
          <span style={{ fontSize: '0.68rem', letterSpacing: '0.06em', color: '#555' }}>SYSTEM BOOT V4.2</span>
        </div>

        {/* Loading details */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', minHeight: 48 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: '0.62rem', color: '#555', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Status</span>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.04em', fontFamily: 'monospace', color: 'var(--accent)' }}>{activeText}</span>
          </div>
          <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', fontWeight: 300, lineHeight: 1 }}>
            {progress}%
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ width: '100%', height: 1, background: '#181818', position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'var(--accent)',
              transition: 'width 0.05s linear',
            }}
          />
        </div>

        {/* Diagnostic logs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.62rem', color: '#444', letterSpacing: '0.05em' }}>
          <span>PORT: 3000 // LOC: localhost</span>
          <span>SYSTEM READY</span>
        </div>
      </div>
    </div>
  );
}
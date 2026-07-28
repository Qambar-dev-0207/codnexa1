'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const DATA = [
  { quote: "Codnexa completely rebuilt our cloud interface. The codebase is incredibly fast and our developer onboarding dropped from weeks to days. We saw a 40% efficiency boost post-launch.", author: "Sarah Jenkins",    role: "VP of Product",              co: "Aether Platform" },
  { quote: "Their direct developer loop eliminated the usual agency telephone game. We discussed scoping directly with the engineers, shipping our mobile app two months ahead of plan.",       author: "Marcus Sterling",   role: "Founder & CEO",              co: "Velo Mobility" },
  { quote: "Nucleus required complex WebGL renderings for deep learning matrices. Codnexa delivered an interactive, blazing fast dashboard that our research team uses daily.",                 author: "Dr. Elena Rostova", role: "Head of AI Diagnostics",     co: "Nucleus AI" },
  { quote: "Meticulous code quality and absolute transparency. They delivered on every sprint log, kept us integrated on Git, and hit 100/100 Lighthouse performance across the board.",       author: "David K.",          role: "Director of Systems Eng.",   co: "Slate Logistics" },
];

export default function TestimonialsSlider() {
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState(-1);
  const [dir, setDir] = useState<1 | -1>(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (next: number, d: 1 | -1 = 1) => {
    setPrev(idx);
    setDir(d);
    setIdx((next + DATA.length) % DATA.length);
  };

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => go(idx + 1, 1), 7000);
  };

  useEffect(() => {
    resetInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [idx]);

  const t = DATA[idx];

  return (
    <div>
      {/* Main quote */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 56, paddingBottom: 56, borderBottom: '1px solid var(--border)', minHeight: 280, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 1.45,
          color: 'var(--text)',
          letterSpacing: '-0.015em',
          maxWidth: 860,
          marginBottom: 40,
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}>
          &ldquo;{t.quote}&rdquo;
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.95rem', marginBottom: 4 }}>{t.author}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>
              {t.role} · <span style={{ color: 'var(--accent)' }}>{t.co}</span>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => { go(i, i > idx ? 1 : -1); resetInterval(); }}
                style={{
                  width: i === idx ? 28 : 6, height: 6, borderRadius: 3,
                  background: i === idx ? 'var(--accent)' : 'var(--border-mid)',
                  border: 'none', cursor: 'pointer',
                  transition: 'width 0.35s var(--ease), background 0.3s ease',
                  padding: 0,
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
            <div style={{ width: 1, height: 20, background: 'var(--border-mid)', marginInline: 4 }} />
            <button
              onClick={() => { go(idx - 1, -1); resetInterval(); }}
              style={{ background: 'transparent', border: '1px solid var(--border-mid)', borderRadius: 2, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-2)', transition: 'border-color 0.2s, color 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--text)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-mid)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-2)'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button
              onClick={() => { go(idx + 1, 1); resetInterval(); }}
              style={{ background: 'transparent', border: '1px solid var(--border-mid)', borderRadius: 2, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-2)', transition: 'border-color 0.2s, color 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--text)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-mid)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-2)'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mini cards below */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 1, background: 'var(--border)', marginTop: 1, border: '1px solid var(--border)' }}>
        {DATA.map((d, i) => (
          <button
            key={i}
            onClick={() => { go(i, i > idx ? 1 : -1); resetInterval(); }}
            style={{
              background: i === idx ? 'var(--surface)' : 'var(--bg-alt)',
              border: 'none', cursor: 'pointer',
              padding: '20px 24px', textAlign: 'left',
              borderBottom: i === idx ? `2px solid var(--accent)` : '2px solid transparent',
              transition: 'background 0.25s',
            }}
            onMouseEnter={e => { if (i !== idx) (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface)'; }}
            onMouseLeave={e => { if (i !== idx) (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-alt)'; }}
          >
            <div style={{ fontWeight: 600, fontSize: '0.82rem', color: i === idx ? 'var(--text)' : 'var(--text-3)', marginBottom: 2, transition: 'color 0.2s' }}>{d.author}</div>
            <div style={{ fontSize: '0.72rem', color: i === idx ? 'var(--accent)' : 'var(--text-3)', letterSpacing: '0.04em' }}>{d.co}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PortfolioGrid from '@/components/PortfolioGrid';
import TestimonialsSlider from '@/components/TestimonialsSlider';

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const STATS = [
  { n: '50+',  l: 'Projects shipped' },
  { n: '98%',  l: 'Client retention' },
  { n: '100',  l: 'Lighthouse scores' },
  { n: '8+',   l: 'Years experience'  },
];

export default function Portfolio() {
  useReveal();

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ paddingTop: 'clamp(120px, 18vw, 200px)', paddingBottom: 'clamp(60px, 8vw, 100px)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle accent glow top-right */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(230,58,15,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'end' }} className="hero-grid">
            <div>
              <p className="eyebrow reveal" style={{ marginBottom: 24 }}>Selected Work</p>
              <h1 className="reveal reveal-delay-1">
                Case studies &<br /><em>digital platforms.</em>
              </h1>
            </div>
            <p className="reveal reveal-delay-2" style={{ maxWidth: 360, alignSelf: 'end', paddingBottom: 8 }}>
              We collaborate with ambitious startups and world-leading brands to engineer clean, performant, and high-converting systems.
            </p>
          </div>

          {/* Stats row */}
          <div className="reveal reveal-delay-3" style={{ display: 'flex', gap: 0, marginTop: 64, borderTop: '1px solid var(--border)' }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ flex: 1, paddingBlock: 28, paddingInline: 24, borderRight: i < STATS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--text)', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', marginTop: 8 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTERABLE GRID ──────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <PortfolioGrid />
        </div>
      </section>

      {/* ── PROCESS STRIP ────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-alt)', borderBottom: '1px solid var(--border)', paddingBlock: 'clamp(48px, 6vw, 80px)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {['Discovery & Strategy', 'UI / UX Design', 'Engineering', 'Quality Assurance', 'Launch & Handoff'].map((s, i) => (
              <div key={i} className="reveal" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12, transitionDelay: `${i * 0.07}s` }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.1em' }}>0{i + 1}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-2)', whiteSpace: 'nowrap' }}>{s}</span>
                {i < 4 && <div style={{ width: 40, height: 1, background: 'var(--border-mid)', flexShrink: 0 }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 64, alignItems: 'start' }} className="testi-grid">
            <div style={{ position: 'sticky', top: 120 }}>
              <p className="eyebrow reveal" style={{ marginBottom: 20 }}>Endorsements</p>
              <h2 className="reveal reveal-delay-1" style={{ fontSize: 'clamp(3.2rem, 7vw, 6rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                What clients<br />say about us
              </h2>
              <p className="reveal reveal-delay-2" style={{ marginTop: 20, fontSize: '0.88rem' }}>
                We measure success by the outcomes we drive for our clients, not just by shipping code.
              </p>
            </div>
            <div className="reveal reveal-delay-1">
              <TestimonialsSlider />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED CLIENTS LOGOS (placeholder) ─────────────── */}
      <section style={{ borderBottom: '1px solid var(--border)', paddingBlock: 'clamp(40px, 6vw, 72px)', background: 'var(--bg-alt)' }}>
        <div className="container">
          <p className="reveal" style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 600, marginBottom: 32, textAlign: 'center' }}>
            Trusted by innovative teams worldwide
          </p>
          <div className="reveal" style={{ display: 'flex', gap: 0, justifyContent: 'center', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            {['Aether', 'Velo', 'Nucleus', 'Slate', 'Apex', 'Synthetix'].map((name, i) => (
              <div key={name} style={{
                flex: 1, padding: '28px 20px', textAlign: 'center',
                borderRight: i < 5 ? '1px solid var(--border)' : 'none',
                fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 400,
                color: 'var(--text-3)', letterSpacing: '-0.01em',
                transition: 'color 0.25s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.color = 'var(--text)')}
              onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.color = 'var(--text-3)')}
              >{name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section style={{ paddingBlock: 'clamp(80px, 12vw, 140px)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, rgba(230,58,15,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className="eyebrow reveal" style={{ marginBottom: 20 }}>Next Project</p>
          <h2 className="reveal reveal-delay-1" style={{ marginBottom: 12, fontSize: 'clamp(3.2rem, 7vw, 6rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Ready to deploy your
          </h2>
          <h2 className="reveal reveal-delay-2" style={{ color: 'var(--accent)', marginBottom: 48, fontSize: 'clamp(3.2rem, 7vw, 6rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, fontStyle: 'italic', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            <em>next platform?</em>
          </h2>
          <div className="reveal reveal-delay-3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary">
              Book a Discovery Call <ArrowUpRight size={15} />
            </Link>
            <Link href="/services" className="btn btn-outline">
              Explore services
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid   { grid-template-columns: 1fr !important; }
          .testi-grid  { grid-template-columns: 1fr !important; }
          [style*="flex: 1"][style*="borderRight"] { display: none; }
        }
        @media (max-width: 640px) {
          [style*="grid-template-columns: repeat(auto-fit, minmax(180px"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
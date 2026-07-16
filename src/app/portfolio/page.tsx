'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PortfolioGrid from '@/components/PortfolioGrid';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import { useLanguage } from '@/components/LanguageProvider';

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

export default function Portfolio() {
  useReveal();
  const { t } = useLanguage();

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ paddingTop: 'clamp(120px, 18vw, 200px)', paddingBottom: 'clamp(60px, 8vw, 100px)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(230,58,15,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'end' }} className="hero-grid">
            <div>
              <p className="eyebrow reveal" style={{ marginBottom: 24 }}>{t('portfolio.hero.eyebrow')}</p>
              <h1 className="reveal reveal-delay-1">
                {t('portfolio.hero.title').split('\n').map((line, i) => (
                  <span key={i}>{i === 0 ? line : <><br /><em>{line}</em></>}</span>
                ))}
              </h1>
            </div>
            <p className="reveal reveal-delay-2" style={{ maxWidth: 360, alignSelf: 'end', paddingBottom: 8 }}>
              {t('portfolio.hero.desc')}
            </p>
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
            <div className="sticky-column">
              <p className="eyebrow reveal" style={{ marginBottom: 20 }}>{t('portfolio.testimonials.eyebrow')}</p>
              <h2 className="reveal reveal-delay-1" style={{ fontSize: 'clamp(3.2rem, 7vw, 6rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                {t('portfolio.testimonials.title').split('\n').map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </h2>
              <p className="reveal reveal-delay-2" style={{ marginTop: 20, fontSize: '0.88rem' }}>
                {t('portfolio.testimonials.desc')}
              </p>
            </div>
            <div className="reveal reveal-delay-1">
              <TestimonialsSlider />
            </div>
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
              {t('home.cta.btn')} <ArrowUpRight size={15} />
            </Link>
            <Link href="/services" className="btn btn-outline">
              {t('nav.services')}
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid   { grid-template-columns: 1fr !important; }
          .testi-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
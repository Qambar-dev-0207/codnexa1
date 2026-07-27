'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function About() {
  useReveal();
  const { t } = useLanguage();

  const pillars = [
    { n: '01', title: t('about.principles.1.title'), desc: t('about.principles.1.desc') },
    { n: '02', title: t('about.principles.2.title'), desc: t('about.principles.2.desc') },
    { n: '03', title: t('about.principles.3.title'), desc: t('about.principles.3.desc') },
    { n: '04', title: t('about.principles.4.title'), desc: t('about.principles.4.desc') },
  ];

  return (
    <div>
      {/* -- HEADER ------------------------------------------- */}
      <section style={{ paddingTop: 'clamp(120px, 18vw, 200px)', paddingBottom: 'clamp(60px, 8vw, 100px)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <p className="eyebrow reveal" style={{ marginBottom: 24 }}>{t('about.hero.eyebrow')}</p>
          <h1 className="reveal reveal-delay-1" style={{ maxWidth: 680 }}>
            {t('about.hero.title').split('\n').map((line, i) => (
              <span key={i}>{i === 0 ? line : <><br /><em>{line}</em></>}</span>
            ))}
          </h1>
        </div>
      </section>

      {/* -- INTRO SPLIT -------------------------------------- */}
      <section className="section">
        <div className="container">
          <div className="intro-grid">
            <div>
              <p style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)', lineHeight: 1.7, color: 'var(--text)', fontWeight: 300, marginBottom: 24 }} className="reveal">
                {t('about.intro.p1')}
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-2)', marginBottom: 24 }} className="reveal reveal-delay-1">
                {t('about.intro.p2')}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <p className="reveal reveal-delay-1">{t('about.intro.p3')}</p>
              <p className="reveal reveal-delay-2">{t('about.intro.p4')}</p>
              <p className="reveal reveal-delay-3">{t('about.intro.p5')}</p>
              <div className="reveal reveal-delay-3" style={{ display: 'flex', gap: 40, marginTop: 20 }}>
                {[
                  ['50+', t('about.stats.projects')],
                  ['8+',  t('about.stats.years')],
                  ['3',   t('about.stats.continents')],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 300, lineHeight: 1, color: 'var(--text)' }}>{n}</div>
                    <div style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', marginTop: 6 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- PILLARS ------------------------------------------ */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <p className="eyebrow reveal" style={{ marginBottom: 20 }}>{t('about.principles.eyebrow')}</p>
          <h2 className="reveal reveal-delay-1" style={{ marginBottom: 64, maxWidth: 700, fontSize: 'clamp(3.2rem, 7vw, 6rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--text)' }}>
            {t('about.principles.title')}
          </h2>
          <div className="grid-dna" style={{ background: 'var(--border)', border: '1px solid var(--border)' }}>
            {pillars.map((p, i) => (
              <div key={p.n} className="reveal" style={{ background: 'var(--bg-alt)', padding: '40px 36px', transitionDelay: `${i * 0.08}s` }}>
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--text-3)', fontWeight: 600 }}>{p.n}</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 300, marginTop: 20, marginBottom: 14, color: 'var(--text)', lineHeight: 1.25 }}>{p.title}</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* -- CTA ---------------------------------------------- */}
      <section style={{ paddingBlock: 'clamp(80px, 12vw, 140px)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 40 }}>
          <div style={{ maxWidth: 540 }}>
            <h2 className="reveal" style={{ marginBottom: 16, fontSize: 'clamp(3rem, 6vw, 5rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.05 }}>
              {t('about.cta.title')}
            </h2>
            <p className="reveal reveal-delay-1" style={{ fontSize: '1rem', color: 'var(--text-2)' }}>{t('about.cta.desc')}</p>
          </div>
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link href="/contact" className="btn btn-primary">
              {t('about.cta.btn1')} <ArrowUpRight size={15} />
            </Link>
            <Link href="/portfolio" className="btn btn-outline">
              {t('about.cta.btn2')}
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .intro-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import HeroCanvas from '@/components/HeroCanvas';
import DecryptedText from '@/components/DecryptedText';
import TypewriterWord from '@/components/TypewriterWord';
import SplitText from '@/components/SplitText';
import { useLanguage } from '@/components/LanguageProvider';

/* ---------- Scroll Reveal Hook ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- Animated Counter ---------- */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1600;
      const step = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        setVal(Math.round(p * to));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ---------- Spotlight Card (Our DNA) ---------- */
function SpotlightCard({ num, title, desc, delay }: { num: string; title: string; desc: string; delay: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className="reveal"
      style={{ transitionDelay: `${delay}s`, position: 'relative' }}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, rgba(230, 58, 15, 0.08), transparent 80%)`,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div style={{
        background: 'var(--bg-alt)',
        border: '1px solid var(--border)',
        padding: '36px 32px',
        height: '100%',
        position: 'relative',
        zIndex: 1,
      }}>
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--text-3)', fontWeight: 600 }}>{num}</span>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 400, color: 'var(--text)', marginTop: 16, marginBottom: 12, lineHeight: 1.3 }}>{title}</h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-2)', lineHeight: 1.65 }}>{desc}</p>
      </div>
    </motion.div>
  );
}

/* ---------- 3D Parallax Teaser Card (Selected Work) ---------- */
function TeaserCard({ tag, title, year, bg, img, delay }: { tag: string; title: string; year: string; bg: string; img: string; delay: number }) {
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const springConfig = { damping: 22, stiffness: 200 };
  const tiltX = useSpring(cardY, springConfig);
  const tiltY = useSpring(cardX, springConfig);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    cardX.set(x * 12);
    cardY.set(-y * 12);
  };

  const handleMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };

  return (
    <motion.div
      className="reveal custom-cursor-none"
      style={{
        transformStyle: 'preserve-3d',
        rotateX: tiltX,
        rotateY: tiltY,
        transitionDelay: `${delay}s`,
        perspective: 1000,
        background: bg,
        padding: '32px 32px 28px',
        minHeight: 320,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        borderRight: '1px solid var(--border)',
      }}
      data-cursor="view"
      data-cursor-label="VIEW"
      data-cursor-img={img}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image Preview: High Visibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          opacity: 0.85,
          filter: 'brightness(0.92) contrast(1.05)',
          transition: 'opacity 0.4s ease, transform 0.5s ease, filter 0.4s ease',
          zIndex: 0,
        }}
        className="teaser-bg-img"
      />
      {/* Subtle bottom gradient vignette for text legibility */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(5,12,18,0.88) 0%, rgba(5,12,18,0.3) 50%, rgba(5,12,18,0.2) 100%)',
        zIndex: 1,
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
        <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1b929a', fontWeight: 700, background: 'rgba(5,15,22,0.75)', backdropFilter: 'blur(6px)', padding: '4px 10px', borderRadius: 2, border: '1px solid rgba(255,255,255,0.1)' }}>{tag}</span>
        <span style={{ fontSize: '0.7rem', color: '#ffffff', background: 'rgba(5,15,22,0.75)', backdropFilter: 'blur(6px)', padding: '4px 10px', borderRadius: 2, border: '1px solid rgba(255,255,255,0.1)', fontWeight: 600 }}>{year}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 2 }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 500, color: '#ffffff', letterSpacing: '-0.02em', margin: 0, textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>{title}</h3>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)', flexShrink: 0 }}>
          <ArrowUpRight size={18} style={{ color: '#ffffff' }} />
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Marquee ---------- */
const MARQUEE_ITEMS = [
  'Strategy', '·', 'Brand Identity', '·', 'UI / UX Design', '·',
  'Full-Stack Dev', '·', 'Cloud Architecture', '·', 'Mobile Apps', '·',
  'AI Integration', '·', 'SaaS Products', '·',
];

export default function Home() {
  useReveal();
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    const heroEl = heroRef.current;
    if (heroEl) heroEl.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => { if (heroEl) heroEl.removeEventListener('mousemove', handleMouseMove); };
  }, []);

  const services = [
    { num: '01', label: t('nav.services'), title: t('about.principles.3.title'), desc: t('about.principles.3.desc') },
    { num: '02', label: t('nav.work'), title: t('about.principles.2.title'), desc: t('about.principles.2.desc') },
    { num: '03', label: t('nav.about'), title: t('about.principles.4.title'), desc: t('about.principles.4.desc') },
    { num: '04', label: t('nav.contact'), title: t('about.principles.1.title'), desc: t('about.principles.1.desc') },
  ];

  const faqs = [
    { q: 'What is your standard design and development process?', a: 'We operate in collaborative weekly sprint cycles: first discovering system boundaries, next outlining styling guides, followed by rapid iterative programming, and ending in strict performance optimisations.' },
    { q: 'Do we own the source code after launch?',               a: 'Yes, absolutely. Once final accounts are settled, full ownership rights of all assets, designs, codebases, and deployment configurations are transferred to your team.' },
    { q: 'How do you handle project scoping and budget agreements?', a: 'We offer fixed scoping diagnostics for projects with clear specifications, and flexible time-and-materials arrangements for fast-moving products requiring agile adjustments.' },
    { q: 'Do you support direct Slack or Teams communication?',   a: 'Yes, we create shared Slack channels with your engineering team, facilitating direct communications, daily async progress logs, and swift QA cycles.' },
  ];

  const dnaItems = [
    { n: '01', t: t('home.why.dna1.title'), d: t('home.why.dna1.desc') },
    { n: '02', t: t('home.why.dna2.title'), d: t('home.why.dna2.desc') },
    { n: '03', t: t('home.why.dna3.title'), d: t('home.why.dna3.desc') },
    { n: '04', t: t('home.why.dna4.title'), d: t('home.why.dna4.desc') },
  ];

  return (
    <div>
      {/* -- HERO ----------------------------------------------- */}
      <section
        ref={heroRef}
        style={{
          minHeight: '100svh',
          display: 'grid',
          gridTemplateRows: '1fr auto',
          borderBottom: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <HeroCanvas />

        <div
          style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(230, 58, 15, 0.075), transparent 80%)`,
            pointerEvents: 'none', zIndex: 0, transition: 'background 0.15s ease',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '80px 80px', opacity: 0.4, pointerEvents: 'none' }} />

        <div className="container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 'clamp(100px, 18vh, 160px)', paddingBottom: 'clamp(60px, 10vh, 100px)', position: 'relative', zIndex: 1 }}>
          <p className="eyebrow reveal" style={{ marginBottom: 28 }}>{t('home.hero.eyebrow')}</p>

          <h1 className="reveal reveal-delay-1" style={{ fontSize: 'clamp(4.5rem, 10vw, 9rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.035em', lineHeight: 1.0, color: 'var(--text)', marginBottom: 32, maxWidth: 900 }}>
            {t('home.hero.title')}{' '}
            <TypewriterWord words={t('home.hero.typewriter').split(',')} />
          </h1>

          <p className="reveal reveal-delay-2" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: 520, marginBottom: 48 }}>
            {t('home.hero.desc')}
          </p>

          <div className="reveal reveal-delay-3" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/portfolio" className="btn btn-primary" data-cursor="hover" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {t('home.hero.cta.work')} <ArrowUpRight size={15} />
            </Link>
            <Link href="/contact" className="btn btn-outline" data-cursor="hover">
              {t('home.hero.cta.project')}
            </Link>
          </div>
        </div>

        {/* Bottom meta row */}
        <div className="container" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', paddingBottom: 32, position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-3)', fontSize: '0.8rem' }}>
            <ChevronDown size={14} />
            <span>{t('home.meta.scroll')}</span>
          </div>
        </div>
      </section>

      {/* -- MARQUEE -------------------------------------------- */}
      <div className="marquee-track" style={{ borderBottom: '1px solid var(--border)', paddingBlock: 20, background: '#ffffff' }}>
        <div className="marquee-inner">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} style={{ fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000000', paddingInline: 24, whiteSpace: 'nowrap' }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* -- WHAT WE DO ----------------------------------------- */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 80, alignItems: 'end' }} className="what-we-do-header">
            <div>
              <p className="eyebrow reveal" style={{ marginBottom: 20 }}>{t('home.services.eyebrow')}</p>
              <h2 className="reveal reveal-delay-1" style={{ maxWidth: 560, fontSize: 'clamp(3.2rem, 7vw, 6rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--text)' }}>
                <SplitText text={t('home.services.title')} />
              </h2>
            </div>
            <p className="reveal reveal-delay-2" style={{ alignSelf: 'end', maxWidth: 440 }}>
              {t('home.hero.desc')}
            </p>
          </div>

          <div style={{ borderTop: '1px solid var(--border)' }}>
            {services.map((s, i) => (
              <div
                key={s.num}
                className="reveal services-row"
                style={{ paddingBlock: 28, borderBottom: '1px solid var(--border)', transition: 'background 0.25s', cursor: 'default' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.1em', color: 'var(--text-3)', fontWeight: 600 }}>{s.num}</span>
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600 }}>{s.label}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 400, color: 'var(--text)', marginBottom: 4 }}>{s.title}</div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-2)' }}>{s.desc}</div>
                </div>
                <ArrowUpRight size={16} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40 }}>
            <Link href="/services" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600 }}>
              {t('home.services.cta')} <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* -- WHY CODNEXA ---------------------------------------- */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64 }} className="why-grid">
            <div>
              <p className="eyebrow reveal" style={{ marginBottom: 20 }}>{t('home.why.eyebrow')}</p>
              <h2 className="reveal reveal-delay-1" style={{ fontSize: 'clamp(3.2rem, 7vw, 6rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--text)' }}>
                <SplitText text={t('home.why.title')} />
              </h2>
            </div>
            <div className="grid-dna" style={{ background: 'var(--border)', border: '1px solid var(--border)' }}>
              {dnaItems.map((v, i) => (
                <SpotlightCard key={v.n} num={v.n} title={v.t} desc={v.d} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -- SELECTED WORK TEASER ------------------------------- */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <p className="eyebrow reveal" style={{ marginBottom: 16 }}>{t('home.work.eyebrow')}</p>
              <h2 className="reveal reveal-delay-1" style={{ fontSize: 'clamp(3.2rem, 7vw, 6rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--text)' }}>
                <SplitText text={t('home.work.title')} />
              </h2>
            </div>
            <Link href="/portfolio" className="reveal btn btn-outline">
              {t('home.work.cta')} <ArrowUpRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
            {[
              { tag: 'Web / Manufacturing', title: 'LGI Irrigation', year: '2024', bg: '#0f0f12', img: '/projects/lgi-irrigation.jpg' },
              { tag: 'E-Commerce / Furniture', title: 'Skema International', year: '2024', bg: '#0c120f', img: '/projects/skema-furniture.jpg' },
              { tag: 'Marketing & SEO', title: 'Search Growth Analytics', year: '2024', bg: '#12100c', img: '/projects/seo-analytics.jpg' },
              { tag: 'E-Commerce / Fashion', title: 'Toki Kids Fashion', year: '2024', bg: '#0e1014', img: '/projects/toki-fashion.jpg' },
            ].map((w, i) => (
              <TeaserCard key={w.title} tag={w.tag} title={w.title} year={w.year} bg={w.bg} img={w.img} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* -- FAQ ------------------------------------------------ */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64, alignItems: 'start' }} className="faq-grid">
            <div className="sticky-column">
              <p className="eyebrow reveal" style={{ marginBottom: 20 }}>{t('home.faq.eyebrow')}</p>
              <h2 className="reveal reveal-delay-1" style={{ fontSize: 'clamp(3.2rem, 7vw, 6rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                {t('home.faq.title').split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
              </h2>
            </div>

            <div className="reveal" style={{ borderTop: '1px solid var(--border)' }}>
              {faqs.map((faq, idx) => {
                const open = openFaq === idx;
                return (
                  <div key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                    <button
                      onClick={() => setOpenFaq(open ? null : idx)}
                      style={{
                        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        paddingBlock: 24, background: 'transparent', border: 'none', cursor: 'pointer',
                        textAlign: 'left', color: 'var(--text)', fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 500,
                        gap: 16,
                      }}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown size={16} style={{ color: 'var(--text-3)', flexShrink: 0, transition: 'transform 0.3s', transform: open ? 'rotate(180deg)' : 'none' }} />
                    </button>
                    <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows 0.35s var(--ease)', overflow: 'hidden' }}>
                      <div style={{ minHeight: 0 }}>
                        <p style={{ paddingBottom: 24, fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--text-2)' }}>{faq.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* -- CTA BANNER ----------------------------------------- */}
      <section style={{ paddingBlock: 'clamp(80px, 14vw, 160px)', textAlign: 'center', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(27,146,154,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className="eyebrow reveal" style={{ marginBottom: 24 }}>{t('nav.contact')}</p>
          <h2 className="reveal reveal-delay-1" style={{ marginBottom: 16, fontSize: 'clamp(3.2rem, 7vw, 6rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            {t('home.cta.title')}
          </h2>
          <h2 className="reveal reveal-delay-2" style={{ color: 'var(--accent)', marginBottom: 48, fontSize: 'clamp(3.2rem, 7vw, 6rem)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            <em>{t('home.hero.cta.project')}</em>
          </h2>
          <div className="reveal reveal-delay-3" style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/contact" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {t('home.cta.btn')} <ArrowUpRight size={15} />
            </Link>
            <Link href="/portfolio" className="btn btn-outline">
              {t('home.work.cta')}
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .what-we-do-header { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: 1fr !important; }
          .faq-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
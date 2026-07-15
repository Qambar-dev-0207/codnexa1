'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import HeroCanvas from '@/components/HeroCanvas';
import DecryptedText from '@/components/DecryptedText';

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

/* ---------- Marquee ---------- */
const MARQUEE_ITEMS = [
  'Strategy', '·', 'Brand Identity', '·', 'UI / UX Design', '·',
  'Full-Stack Dev', '·', 'Cloud Architecture', '·', 'Mobile Apps', '·',
  'AI Integration', '·', 'SaaS Products', '·',
];

export default function Home() {
  useReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    const heroEl = heroRef.current;
    if (heroEl) {
      heroEl.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    return () => {
      if (heroEl) {
        heroEl.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const services = [
    { num: '01', label: 'Brand & Graphics',   title: 'Creative & UI Design',  desc: 'Interfaces that capture identity and establish functional patterns.' },
    { num: '02', label: 'Interfaces',         title: 'Front-End Systems',     desc: 'Pixel-perfect React and Next.js platforms optimised for speed.' },
    { num: '03', label: 'Code Stacks',        title: 'Full-Stack Scale',      desc: 'Secure backend databases, third-party integrations, and robust APIs.' },
    { num: '04', label: 'Architecture',       title: 'Cloud Planning',        desc: 'Deploying secure and elastic AWS / Vercel pipelines for uptime.' },
  ];

  const faqs = [
    { q: 'What is your standard design and development process?', a: 'We operate in collaborative weekly sprint cycles: first discovering system boundaries, next outlining styling guides, followed by rapid iterative programming, and ending in strict performance optimisations.' },
    { q: 'Do we own the source code after launch?',               a: 'Yes, absolutely. Once final accounts are settled, full ownership rights of all assets, designs, codebases, and deployment configurations are transferred to your team.' },
    { q: 'How do you handle project scoping and budget agreements?', a: 'We offer fixed scoping diagnostics for projects with clear specifications, and flexible time-and-materials arrangements for fast-moving products requiring agile adjustments.' },
    { q: 'Do you support direct Slack or Teams communication?',   a: 'Yes, we create shared Slack channels with your engineering team, facilitating direct communications, daily async progress logs, and swift QA cycles.' },
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
        {/* Particle Canvas Animation */}
        <HeroCanvas />

        {/* Dynamic Interactive Spotlight Glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(230, 58, 15, 0.075), transparent 80%)`,
            pointerEvents: 'none',
            zIndex: 0,
            transition: 'background 0.15s ease',
          }}
        />

        {/* Subtle grid background */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '80px 80px', opacity: 0.4, pointerEvents: 'none' }} />

        <div className="container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 'clamp(100px, 18vh, 160px)', paddingBottom: 'clamp(60px, 10vh, 100px)', position: 'relative', zIndex: 1 }}>
          <p className="eyebrow reveal" style={{ marginBottom: 28 }}>Strategy, Design & Development Studio</p>

          <h1 className="reveal reveal-delay-1" style={{ fontSize: 'clamp(4.5rem, 10vw, 9rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.035em', lineHeight: 1.0, color: 'var(--text)', marginBottom: 32, maxWidth: 900 }}>
            <DecryptedText text="Creative studio" />
            <br />
            built for <em style={{ color: 'var(--text)' }}><DecryptedText text="growth." delay={300} /></em>
          </h1>

          <p className="reveal reveal-delay-2" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: 520, marginBottom: 48 }}>
            Strategy, design and development. From brand identities to full-scale platforms — we build what companies need to lead.
          </p>

          <div className="reveal reveal-delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/portfolio" className="btn btn-primary" data-cursor="hover">
              See our work <ArrowUpRight size={15} />
            </Link>
            <Link href="/contact" className="btn btn-outline" data-cursor="hover">
              Start a project
            </Link>
          </div>
        </div>

        {/* Bottom meta row */}
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: 32, position: 'relative', zIndex: 1, flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', gap: 48 }}>
            {[['50+', 'Projects Delivered'], ['8+', 'Years Experience'], ['98%', 'Client Retention']].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 300, lineHeight: 1, color: 'var(--text)' }}>
                  <Counter to={parseInt(n)} suffix={n.includes('+') ? '+' : n.includes('%') ? '%' : ''} />
                </div>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-3)', fontSize: '0.8rem' }}>
            <ChevronDown size={14} />
            <span>Scroll to explore</span>
          </div>
        </div>
      </section>


      {/* -- MARQUEE -------------------------------------------- */}
      <div className="marquee-track" style={{ borderBottom: '1px solid var(--border)', paddingBlock: 18, background: 'var(--bg-alt)' }}>
        <div className="marquee-inner">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)', paddingInline: 24, whiteSpace: 'nowrap' }}>
              {item}
            </span>
          ))}
        </div>
      </div>


      {/* -- WHAT WE DO ----------------------------------------- */}
      <section className="section">

        <div className="container">
          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 80, alignItems: 'end' }} className="what-we-do-header">
            <div>
              <p className="eyebrow reveal" style={{ marginBottom: 20 }}>What we do</p>
              <h2 className="reveal reveal-delay-1" style={{ maxWidth: 560, fontSize: 'clamp(3.2rem, 7vw, 6rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--text)' }}>
                <DecryptedText text="Aligning product aesthetics with robust code." />
              </h2>
            </div>
            <p className="reveal reveal-delay-2" style={{ alignSelf: 'end', maxWidth: 440 }}>
              We believe software development shouldn&apos;t be separated from visual craft. We combine digital strategy, UX design, and full-stack development into one continuous flow.
            </p>
          </div>

          {/* Services List — vividmotion numbered rows */}
          <div style={{ borderTop: '1px solid var(--border)' }}>
            {services.map((s, i) => (
              <div
                key={s.num}
                className="reveal"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr 1fr auto',
                  gap: 24,
                  alignItems: 'center',
                  paddingBlock: 28,
                  borderBottom: '1px solid var(--border)',
                  transition: 'background 0.25s',
                  cursor: 'default',
                }}
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
              Explore all services <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* -- WHY CODNEXA ---------------------------------------- */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64 }} className="why-grid">
            <div>
              <p className="eyebrow reveal" style={{ marginBottom: 20 }}>Our DNA</p>
              <h2 className="reveal reveal-delay-1" style={{ fontSize: 'clamp(3.2rem, 7vw, 6rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--text)' }}>
                <DecryptedText text="Why leading brands choose Codnexa" />
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
              {[
                { n: '01', t: 'Direct Developer Loop', d: 'No account managers. You speak directly with the engineers building your product.' },
                { n: '02', t: 'Business-Oriented Engineering', d: 'Code is a mechanism to drive metrics and revenue. We architect to scale alongside growth.' },
                { n: '03', t: 'Meticulous Transparency', d: 'Full visibility over repos, staging pipelines, and sprints. Day by day accountability.' },
                { n: '04', t: 'Rapid Iteration', d: 'Weekly sprint cycles with clear deliverables, feedback loops, and production deploys.' },
              ].map((v, i) => (
                <div key={v.n} className="reveal" style={{ background: 'var(--bg-alt)', padding: '36px 32px', position: 'relative', transitionDelay: `${i * 0.08}s` }}>
                  <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--text-3)', fontWeight: 600 }}>{v.n}</span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 400, color: 'var(--text)', marginTop: 16, marginBottom: 12, lineHeight: 1.3 }}>{v.t}</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-2)', lineHeight: 1.65 }}>{v.d}</p>
                </div>
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
              <p className="eyebrow reveal" style={{ marginBottom: 16 }}>Selected Work</p>
              <h2 className="reveal reveal-delay-1" style={{ fontSize: 'clamp(3.2rem, 7vw, 6rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--text)' }}>
                <DecryptedText text="Work we're proud of" />
              </h2>
            </div>
            <Link href="/portfolio" className="reveal btn btn-outline">
              View all <ArrowUpRight size={14} />
            </Link>
          </div>


          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
            {[
              { tag: 'SaaS Platform', title: 'Fintech Dashboard', year: '2024', bg: '#0f0f12' },
              { tag: 'E-commerce',    title: 'Luxury Brand Store', year: '2024', bg: '#0c120f' },
              { tag: 'Mobile App',   title: 'Health & Wellness App', year: '2023', bg: '#12100c' },
            ].map((w, i) => (
              <div
                key={w.title}
                className="reveal"
                style={{
                  background: w.bg,
                  padding: '56px 40px',
                  minHeight: 280,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transitionDelay: `${i * 0.08}s`,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.3s var(--ease)',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.01)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600 }}>{w.tag}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-3)' }}>{w.year}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 300, color: '#f0f0f0', letterSpacing: '-0.02em' }}>{w.title}</h3>
                  <ArrowUpRight size={20} style={{ color: 'rgba(240,240,240,0.3)', flexShrink: 0 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- FAQ ------------------------------------------------ */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64, alignItems: 'start' }} className="faq-grid">
            <div style={{ position: 'sticky', top: 120 }}>
              <p className="eyebrow reveal" style={{ marginBottom: 20 }}>FAQ</p>
              <h2 className="reveal reveal-delay-1" style={{ fontSize: 'clamp(3.2rem, 7vw, 6rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.05 }}>Common<br />Questions</h2>
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
        {/* Accent orb */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(230,58,15,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className="eyebrow reveal" style={{ marginBottom: 24 }}>Let&apos;s Collaborate</p>
          <h2 className="reveal reveal-delay-1" style={{ marginBottom: 16, fontSize: 'clamp(3.2rem, 7vw, 6rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Have a project in mind?
          </h2>
          <h2 className="reveal reveal-delay-2" style={{ color: 'var(--accent)', marginBottom: 48, fontSize: 'clamp(3.2rem, 7vw, 6rem)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            <em>Let&apos;s build it together.</em>
          </h2>
          <div className="reveal reveal-delay-3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary">
              Book a Discovery Call <ArrowUpRight size={15} />
            </Link>
            <Link href="/portfolio" className="btn btn-outline">
              See our work
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .what-we-do-header { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: 1fr !important; }
          .faq-grid { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: 80px 1fr 1fr auto"] {
            grid-template-columns: 40px 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

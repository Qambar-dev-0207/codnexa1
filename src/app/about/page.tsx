'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

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

const pillars = [
  { n: '01', title: 'Craft over speed', desc: 'We never ship work we are not proud of. Quality is non-negotiable at every layer of the stack.' },
  { n: '02', title: 'Radical transparency', desc: 'Every commit, every decision, every blocker — you see it all. We build trust through visibility.' },
  { n: '03', title: 'Business-first thinking', desc: 'Every design choice and technical decision is anchored in your business goals, not trends.' },
  { n: '04', title: 'Long-term partnership', desc: 'We measure success by your growth, not just by delivery. Most of our clients stay with us for years.' },
];

export default function About() {
  useReveal();
  return (
    <div>
      {/* -- HEADER ------------------------------------------- */}
      <section style={{ paddingTop: 'clamp(120px, 18vw, 200px)', paddingBottom: 'clamp(60px, 8vw, 100px)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <p className="eyebrow reveal" style={{ marginBottom: 24 }}>About Codnexa</p>
          <h1 className="reveal reveal-delay-1" style={{ maxWidth: 680 }}>
            A studio that ships<br /><em>exceptional work.</em>
          </h1>
        </div>
      </section>

      {/* -- INTRO SPLIT -------------------------------------- */}
      <section className="section">
        <div className="container">
          <div className="intro-grid">
            <div>
              <p style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)', lineHeight: 1.7, color: 'var(--text)', fontWeight: 300 }} className="reveal">
                Codnexa is a boutique digital studio founded on the belief that great software is the intersection of strategy, design, and engineering — not a trade-off between them.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <p className="reveal reveal-delay-1">
                We are a small, senior team. No junior developers learning on your project. No account managers as a buffer. Just experienced engineers and designers who care deeply about the products they build.
              </p>
              <p className="reveal reveal-delay-2">
                Founded in 2016, we have partnered with startups, scaleups, and established enterprises across fintech, healthtech, e-commerce, and SaaS — always with the same commitment to craft.
              </p>
              <div className="reveal reveal-delay-3" style={{ display: 'flex', gap: 40, marginTop: 20 }}>
                {[['50+', 'Projects'], ['8+', 'Years'], ['3', 'Continents']].map(([n, l]) => (
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
          <p className="eyebrow reveal" style={{ marginBottom: 20 }}>Our Principles</p>
          <h2 className="reveal reveal-delay-1" style={{ marginBottom: 64, maxWidth: 700, fontSize: 'clamp(3.2rem, 7vw, 6rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--text)' }}>
            The values that guide every decision
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

      {/* -- FOUNDERS ----------------------------------------- */}
      <section className="section">
        <div className="container">
          <p className="eyebrow reveal" style={{ marginBottom: 20 }}>The Team</p>
          <h2 className="reveal reveal-delay-1" style={{ marginBottom: 64, fontSize: 'clamp(3.2rem, 7vw, 6rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--text)' }}>Built by people<br />who care</h2>

          <div className="grid-dna" style={{ background: 'var(--border)', border: '1px solid var(--border)' }}>
            {[
              {
                name: 'Uzair Jamal',
                role: 'Co-Founder & Technical Lead',
                bio: 'Full-stack architect with 8+ years shipping production systems across fintech, SaaS, and enterprise. Previously at top-tier consultancies before founding Codnexa.',
                expertise: ['System Architecture', 'Node.js / Python', 'Cloud Infrastructure', 'Technical Leadership'],
              },
              {
                name: 'Munazza Batool',
                role: 'Co-Founder & Design Director',
                bio: 'Product designer specialising in complex information design and conversion-focused UI. Champion of accessibility and design systems.',
                expertise: ['Product Design', 'Design Systems', 'UX Research', 'Brand Identity'],
              },
            ].map((m, i) => (
              <div key={m.name} className="reveal" style={{ background: 'var(--surface)', padding: '48px 40px', transitionDelay: `${i * 0.1}s` }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28, fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 300, color: 'var(--text-3)' }}>
                  {m.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, display: 'block', marginBottom: 6 }}>{m.role}</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', fontWeight: 300, color: 'var(--text)', marginBottom: 20, letterSpacing: '-0.02em' }}>{m.name}</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-2)', marginBottom: 28 }}>{m.bio}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {m.expertise.map(e => (
                    <span key={e} style={{ fontSize: '0.68rem', letterSpacing: '0.04em', color: 'var(--text-3)', border: '1px solid var(--border)', padding: '4px 12px', borderRadius: 2 }}>{e}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- CTA ---------------------------------------------- */}
      <section style={{ paddingBlock: 'clamp(80px, 12vw, 140px)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 40 }}>
          <div style={{ maxWidth: 540 }}>
            <h2 className="reveal" style={{ marginBottom: 16, fontSize: 'clamp(3rem, 6vw, 5rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.05 }}>Let&apos;s build something exceptional.</h2>
            <p className="reveal reveal-delay-1" style={{ fontSize: '1rem', color: 'var(--text-2)' }}>Have a project or partnership in mind? We&apos;d love to hear from you.</p>
          </div>
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link href="/contact" className="btn btn-primary">
              Start a Project <ArrowUpRight size={15} />
            </Link>
            <Link href="/portfolio" className="btn btn-outline">
              View our work
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

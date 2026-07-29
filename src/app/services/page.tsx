'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
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

const services = [
  {
    num: '01',
    category: 'Development',
    title: 'Website Development',
    desc: 'High-performance, responsive, and SEO-optimized websites built with modern frameworks, custom designs, and robust architecture to drive engagement and conversion.',
    deliverables: ['Custom Web Applications', 'React / Next.js Development', 'Performance Optimisation', 'Responsive & Mobile-First Design', 'CMS Integration & Maintenance'],
  },
  {
    num: '02',
    category: 'Growth & Strategy',
    title: 'Digital Marketing Services',
    desc: 'Data-driven marketing campaigns, targeted advertisement, content strategy, and social media management designed to expand brand reach and generate high-intent leads.',
    deliverables: ['Social Media Marketing', 'Google & Meta Ads Campaigns', 'Content Marketing Strategy', 'Lead Generation & Sales Funnels', 'Brand Awareness & Positioning'],
  },
  {
    num: '03',
    category: 'Optimization',
    title: 'SEO (Search Engine Optimization)',
    desc: 'Comprehensive technical, on-page, and off-page SEO strategies to elevate organic search visibility, boost domain authority, and attract targeted organic traffic.',
    deliverables: ['Technical SEO Audits', 'On-Page & Off-Page SEO', 'Keyword Research & Competitor Analysis', 'Local SEO & Backlink Acquisition', 'Page Speed & Core Web Vitals Optimization'],
  },
  {
    num: '04',
    category: 'Mobile',
    title: 'Mobile App Development',
    desc: 'Native and cross-platform mobile applications for iOS and Android delivering intuitive interfaces, fast performance, and offline-first capabilities.',
    deliverables: ['iOS & Android Apps', 'React Native & Flutter Development', 'App Store & Play Store Publishing', 'Push Notifications & REST APIs', 'Mobile UI/UX Design'],
  },
  {
    num: '05',
    category: 'Enterprise',
    title: 'ERP & CRM Systems',
    desc: 'Custom enterprise resource planning and customer relationship management systems built to automate operational workflows and centralize business data.',
    deliverables: ['Custom ERP Software', 'Tailored CRM Solutions', 'Workflow Automation & Integration', 'Database & API Architecture', 'Role-Based Security & Permissions'],
  },
  {
    num: '06',
    category: 'Intelligence',
    title: 'Data Analytics',
    desc: 'Turn complex data into strategic business insights through custom analytics dashboards, predictive data models, and real-time visualization pipelines.',
    deliverables: ['Business Intelligence Dashboards', 'Data Warehousing & Pipeline ETL', 'Predictive Analytics Models', 'User Behavior & Conversion Funnels', 'Custom Automated Reporting'],
  },
];

const process = [
  { n: '01', title: 'Discovery', desc: 'Understanding your goals, users, constraints, and competitive landscape through deep-dive workshops.' },
  { n: '02', title: 'Strategy',  desc: 'Defining the product architecture, tech stack, and design direction before a single line of code is written.' },
  { n: '03', title: 'Design',    desc: 'High-fidelity UI/UX design with interactive prototypes, design systems, and stakeholder review cycles.' },
  { n: '04', title: 'Build',     desc: 'Weekly sprint-based development with continuous deployment, daily updates, and real-time collaboration.' },
  { n: '05', title: 'Launch',    desc: 'Production-ready deployment, performance audits, documentation, and team handoff or ongoing retainer.' },
];

export default function Services() {
  useReveal();
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      {/* -- HEADER ------------------------------------------- */}
      <section style={{ paddingTop: 'clamp(120px, 18vw, 200px)', paddingBottom: 'clamp(60px, 8vw, 100px)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <p className="eyebrow reveal" style={{ marginBottom: 24 }}>{t('services.hero.eyebrow')}</p>
          <h1 className="reveal reveal-delay-1" style={{ maxWidth: 700, fontSize: 'clamp(4rem, 9vw, 8rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.0, color: 'var(--text)' }}>
            {t('services.hero.title').split('\n').map((line, i) => (
              <span key={i}>{i === 0 ? line : <><br /><em>{line}</em></>}</span>
            ))}
          </h1>
          <p className="reveal reveal-delay-2" style={{ marginTop: 32, maxWidth: 480, fontSize: '1.05rem' }}>
            {t('services.hero.desc')}
          </p>
        </div>
      </section>

      {/* -- SERVICE ACCORDION -------------------------------- */}
      <section className="section">
        <div className="container">
          <div style={{ borderTop: '1px solid var(--border)' }}>
            {services.map((s, i) => {
              const isOpen = open === i;
              return (
                <div key={s.num} style={{ borderBottom: '1px solid var(--border)' }}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="accordion-btn"
                    style={{ width: '100%', paddingBlock: 32, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--text-3)', fontWeight: 600 }}>{s.num}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.3rem, 3vw, 2rem)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em' }}>{s.title}</span>
                      <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600 }}>{s.category}</span>
                    </div>
                    <div style={{ color: 'var(--text-3)', transition: 'transform 0.3s', flexShrink: 0 }}>
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>

                  <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s var(--ease)', overflow: 'hidden' }}>
                    <div style={{ minHeight: 0 }}>
                      <div className="accordion-body-grid" style={{ gap: 24, paddingBottom: 40, paddingTop: 4 }}>
                        <div className="accordion-spacer" style={{ display: 'block' }} />
                        <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--text-2)' }}>{s.desc}</p>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {s.deliverables.map(d => (
                            <li key={d} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem', color: 'var(--text-2)' }}>
                              <span style={{ width: 16, height: 1, background: 'var(--accent)', flexShrink: 0 }} />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -- PROCESS ------------------------------------------ */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64, alignItems: 'start' }} className="process-grid">
            <div className="sticky-column">
              <p className="eyebrow reveal" style={{ marginBottom: 20 }}>{t('services.process.eyebrow')}</p>
              <h2 className="reveal reveal-delay-1" style={{ fontSize: 'clamp(3.2rem, 7vw, 6rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.05 }}>
                {t('services.process.title').split('\n').map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </h2>
              <p className="reveal reveal-delay-2" style={{ marginTop: 20, fontSize: '0.9rem' }}>
                {t('services.process.desc')}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid var(--border)' }}>
              {process.map((p, i) => (
                <div key={p.n} className="reveal" style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 24, paddingBlock: 32, borderBottom: '1px solid var(--border)', transitionDelay: `${i * 0.07}s` }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 300, color: 'var(--border-mid)', lineHeight: 1 }}>{p.n}</span>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 300, marginBottom: 12, color: 'var(--text)' }}>{p.title}</h3>
                    <p style={{ fontSize: '0.9rem' }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -- CTA ---------------------------------------------- */}
      <section style={{ paddingBlock: 'clamp(80px, 12vw, 140px)', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <h2 className="reveal font-heading" style={{ marginBottom: 16, maxWidth: 700, marginInline: 'auto', fontSize: 'clamp(3rem, 6vw, 5rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.05 }}>
            {t('services.cta.title')}
          </h2>
          <p className="reveal reveal-delay-1" style={{ marginBottom: 40 }}>{t('services.cta.desc')}</p>
          <Link href="/contact" className="btn btn-primary reveal reveal-delay-2">
            {t('services.cta.btn')} <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .process-grid { grid-template-columns: 1fr !important; }
          .accordion-spacer { display: none !important; }
        }
      `}</style>
    </div>
  );
}

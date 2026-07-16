'use client';

import { useState, useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';

/* ── Scroll reveal ── */
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

interface Project {
  id: number;
  num: string;
  title: string;
  category: 'web' | 'mobile' | 'ai' | 'enterprise';
  categoryLabel: string;
  desc: string;
  tags: string[];
  url: string;
}

/* ── Parallax image on hover ── */
function ParallaxCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLDivElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError]   = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !imgRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 18;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 12;
    imgRef.current.style.transform = `scale(1.06) translate(${x * 0.5}px, ${y * 0.5}px)`;
    cardRef.current.style.transform = `perspective(900px) rotateX(${-y * 0.4}deg) rotateY(${x * 0.4}deg)`;
  };

  const onMouseLeave = () => {
    if (!cardRef.current || !imgRef.current) return;
    imgRef.current.style.transform = 'scale(1) translate(0,0)';
    cardRef.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  };

  const bgColors = ['#0d0e14', '#0e130e', '#130e0e', '#0e0e16', '#131108', '#0e1313'];
  const bg = bgColors[index % bgColors.length];
  const thumbUrl = `https://image.thum.io/get/width/640/crop/360/noanimate/${project.url}`;

  return (
    <div
      ref={cardRef}
      className="reveal custom-cursor-none"
      style={{
        willChange: 'transform',
        transitionProperty: 'transform, opacity',
        transitionDuration: '0.5s, 0.9s',
        transitionTimingFunction: 'cubic-bezier(0.25,1,0.5,1), ease',
        transitionDelay: `${(index % 3) * 0.08}s`,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
      >
        <div style={{ background: bg, border: '1px solid var(--border)', overflow: 'hidden', position: 'relative' }}>
          {/* Image area */}
          <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
            <div
              ref={imgRef}
              style={{
                width: '100%', height: '100%',
                transition: 'transform 0.5s cubic-bezier(0.25,1,0.5,1)',
              }}
            >
              {/* Fallback placeholder */}
              {(!imgLoaded || imgError) && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(135deg, ${bg}, var(--surface))`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0, opacity: 0.12,
                    backgroundImage: 'linear-gradient(var(--border-mid) 1px, transparent 1px), linear-gradient(90deg, var(--border-mid) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }} />
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 300, color: 'rgba(240,240,240,0.1)', letterSpacing: '-0.03em' }}>
                    {project.num}
                  </span>
                </div>
              )}
              {!imgError && (
                <img
                  src={thumbUrl}
                  alt={project.title}
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgError(true)}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    opacity: imgLoaded ? 1 : 0,
                    transition: 'opacity 0.6s ease',
                    display: 'block',
                    position: 'relative',
                    zIndex: 1,
                  }}
                />
              )}
            </div>
            {/* Bottom gradient */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)', zIndex: 2 }} />
            {/* Live badge */}
            <div style={{
              position: 'absolute', top: 14, right: 14, zIndex: 3,
              background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 2, padding: '4px 10px',
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 6px #4ade80' }} />
              <span style={{ fontSize: '0.6rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Live</span>
            </div>
          </div>

          {/* Card footer */}
          <div style={{ padding: '20px 24px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <span style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, display: 'block', marginBottom: 8 }}>
                {project.categoryLabel}
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 300, color: '#f0f0f0', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                {project.title}
              </h3>
            </div>
            <ExternalLink size={18} style={{ color: 'rgba(240,240,240,0.4)', flexShrink: 0, marginLeft: 12 }} />
          </div>
        </div>
      </a>

      {/* Description below card */}
      <div style={{ paddingBlock: 16, borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-2)', lineHeight: 1.65 }}>{project.desc}</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
          {project.tags.map(t => (
            <span key={t} style={{
              fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'var(--text-3)', border: '1px solid var(--border)', padding: '3px 10px', borderRadius: 1,
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

const PROJECTS: Project[] = [
  {
    id: 1, num: '01', title: 'LGI Irrigation',
    category: 'web', categoryLabel: 'Web / Agriculture',
    desc: 'A modern irrigation solutions website with a clean product showcase, detailed service pages, and lead generation flows built for a growing agri-tech business.',
    tags: ['Web Design', 'HTML/CSS', 'Netlify'],
    url: 'https://lgirrigation.netlify.app',
  },
  {
    id: 2, num: '02', title: 'Byteonik AI Platform',
    category: 'ai', categoryLabel: 'AI / SaaS',
    desc: 'A full-stack AI-powered platform by Byteonik Labs offering intelligent automation and data-driven insights for modern enterprises. Rich tooling, clean UX.',
    tags: ['AI/ML', 'SaaS', 'React', 'APIs'],
    url: 'https://ai.byteoniclabs.com/',
  },
  {
    id: 3, num: '03', title: 'Skema Furniture',
    category: 'web', categoryLabel: 'E-commerce / Furniture',
    desc: 'Luxury furniture e-commerce storefront with immersive product photography, curated collections, and a seamless checkout experience for premium home décor.',
    tags: ['E-commerce', 'UI/UX', 'Next.js', 'Shopify'],
    url: 'https://skemafurniture.in/',
  },
  {
    id: 4, num: '04', title: 'SpotDraft',
    category: 'enterprise', categoryLabel: 'Enterprise / LegalTech',
    desc: 'AI-powered contract lifecycle management platform trusted by global enterprises. Streamlines drafting, negotiation, and e-signature workflows at scale.',
    tags: ['LegalTech', 'AI', 'Contract Management', 'SaaS'],
    url: 'https://www.spotdraft.com/',
  },
  {
    id: 5, num: '05', title: 'PlanMyVisas',
    category: 'web', categoryLabel: 'Travel / VisaTech',
    desc: 'An end-to-end visa planning and application platform that simplifies the complex world of international travel documentation for individuals and businesses.',
    tags: ['Travel Tech', 'Web App', 'Automation', 'React'],
    url: 'https://planmyvisas.com/',
  },
  {
    id: 6, num: '06', title: 'EES My Travel Holidays',
    category: 'web', categoryLabel: 'Travel / Tourism',
    desc: 'A premium holiday booking and travel experience platform offering curated packages, destination guides, and seamless itinerary planning for global travellers.',
    tags: ['Travel', 'Booking Platform', 'CMS', 'UI/UX'],
    url: 'https://holidays.eesmytravel.com/',
  },
];

const CATS = [
  { label: 'All',        value: 'all' },
  { label: 'Web',        value: 'web' },
  { label: 'AI',         value: 'ai' },
  { label: 'Enterprise', value: 'enterprise' },
] as const;

import { motion } from 'framer-motion';

export default function PortfolioGrid() {
  useReveal();
  const [active, setActive] = useState<'all' | 'web' | 'ai' | 'enterprise'>('all');
  const filtered = active === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <div>
      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border)', marginBottom: 48, overflowX: 'auto' }}>
        {CATS.map(c => (
          <button
            key={c.value}
            onClick={() => setActive(c.value)}
            style={{
              padding: '10px 20px', background: 'transparent', border: 'none',
              color: active === c.value ? 'var(--text)' : 'var(--text-3)',
              fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'color 0.2s', whiteSpace: 'nowrap',
              position: 'relative',
            }}
            onMouseEnter={e => { if (active !== c.value) (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-2)'; }}
            onMouseLeave={e => { if (active !== c.value) (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-3)'; }}
          >
            {c.label}
            {active === c.value && (
              <motion.span
                layoutId="portfolio-active-underline"
                style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '2px', background: 'var(--accent)' }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
        gap: 24,
      }}>
        {filtered.map((p, i) => <ParallaxCard key={p.id} project={p} index={i} />)}
      </div>
    </div>
  );
}
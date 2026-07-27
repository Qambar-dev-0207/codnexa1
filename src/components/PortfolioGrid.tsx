'use client';

import { useState, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: number;
  num: string;
  title: string;
  category: 'web' | 'ecommerce' | 'marketing' | 'ai';
  categoryLabel: string;
  desc: string;
  tags: string[];
  url: string;
  img?: string;
}

/* ── Parallax card with crystal-clear theme contrast ── */
function ParallaxCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLDivElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError]   = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !imgRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 16;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 10;
    imgRef.current.style.transform = `scale(1.06) translate(${x * 0.5}px, ${y * 0.5}px)`;
    cardRef.current.style.transform = `perspective(900px) rotateX(${-y * 0.35}deg) rotateY(${x * 0.35}deg)`;
  };

  const onMouseLeave = () => {
    if (!cardRef.current || !imgRef.current) return;
    imgRef.current.style.transform = 'scale(1) translate(0,0)';
    cardRef.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  };

  const thumbUrl = project.img || `https://image.thum.io/get/width/640/crop/360/noanimate/${project.url}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1], delay: index * 0.05 }}
      ref={cardRef}
      className="custom-cursor-none"
      style={{ willChange: 'transform' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <a
        href={project.url !== '#' ? project.url : undefined}
        target={project.url !== '#' ? "_blank" : undefined}
        rel="noopener noreferrer"
        style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
      >
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}>
          {/* Image area */}
          <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative', background: 'var(--bg-alt)' }}>
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
                  background: 'linear-gradient(135deg, var(--bg-alt), var(--surface))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 300, color: 'var(--text-3)', opacity: 0.3 }}>
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
                    transition: 'opacity 0.5s ease',
                    display: 'block',
                    position: 'relative',
                    zIndex: 1,
                  }}
                />
              )}
            </div>
            {/* Overlay gradient */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)', zIndex: 2 }} />
            {/* Live badge */}
            <div style={{
              position: 'absolute', top: 14, right: 14, zIndex: 3,
              background: 'rgba(10, 20, 28, 0.75)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 2, padding: '4px 10px',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1b929a', display: 'inline-block', boxShadow: '0 0 6px #1b929a' }} />
              <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Live</span>
            </div>
          </div>

          {/* Card footer with 100% crisp theme text contrast */}
          <div style={{ padding: '20px 24px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
            <div>
              <span style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700, display: 'block', marginBottom: 6 }}>
                {project.categoryLabel}
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 500, color: 'var(--text)', letterSpacing: '-0.015em', lineHeight: 1.2, margin: 0 }}>
                {project.title}
              </h3>
            </div>
            <ExternalLink size={18} style={{ color: 'var(--text-2)', flexShrink: 0, marginLeft: 12, opacity: 0.7 }} />
          </div>
        </div>
      </a>

      {/* Description & tags below card */}
      <div style={{ paddingBlock: 16, borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-2)', lineHeight: 1.65, margin: 0 }}>{project.desc}</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
          {project.tags.map(t => (
            <span key={t} style={{
              fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'var(--text-3)', border: '1px solid var(--border)', padding: '3px 10px', borderRadius: 2,
              background: 'var(--bg-alt)',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const PROJECTS: Project[] = [
  {
    id: 1, num: '01', title: 'LGI Irrigation',
    category: 'web', categoryLabel: 'Web / Manufacturing',
    desc: 'High-density polyethylene pipeline manufacturing, sewerage systems, and precision sprinkler network digital platform.',
    tags: ['Web Design', 'Manufacturing', 'UI/UX'],
    url: 'https://lgirrigation.netlify.app',
    img: '/projects/lgi-irrigation.jpg',
  },
  {
    id: 2, num: '02', title: 'Skema International',
    category: 'ecommerce', categoryLabel: 'E-commerce / Furniture',
    desc: 'Exquisite wooden furniture manufacturer storefront and global export digital showcase for luxury living spaces.',
    tags: ['E-Commerce', 'Branding', 'UI/UX'],
    url: 'https://skemafurniture.in/',
    img: '/projects/skema-furniture.jpg',
  },
  {
    id: 3, num: '03', title: 'SEO & Growth Analytics',
    category: 'marketing', categoryLabel: 'Marketing / Analytics',
    desc: 'Data-driven Search Engine Optimization, Google Ads, and performance marketing driving exponential organic traffic & conversion growth.',
    tags: ['SEO', 'Google Ads', 'Meta Ads', 'Analytics'],
    url: '#',
    img: '/projects/seo-analytics.jpg',
  },
  {
    id: 4, num: '04', title: 'Qari Khajoor Centre',
    category: 'ecommerce', categoryLabel: 'Branding & E-commerce',
    desc: 'Organic dates, gourmet dry fruits brand identity, premium product packaging design, and modern web presence.',
    tags: ['Branding', 'E-Commerce', 'Packaging'],
    url: '#',
    img: '/projects/qari-khajoor.jpg',
  },
  {
    id: 5, num: '05', title: 'Toki Kids Fashion',
    category: 'ecommerce', categoryLabel: 'E-commerce / Fashion',
    desc: "Vibrant children's fashion e-commerce experience featuring interactive collection displays and streamlined online shopping.",
    tags: ['E-Commerce', 'Web App', 'Fashion'],
    url: '#',
    img: '/projects/toki-fashion.jpg',
  },
  {
    id: 6, num: '06', title: 'Byteonik AI Platform',
    category: 'ai', categoryLabel: 'AI / SaaS',
    desc: 'A full-stack AI-powered platform offering intelligent automation and data-driven insights for modern enterprises.',
    tags: ['AI/ML', 'SaaS', 'React', 'APIs'],
    url: 'https://ai.byteoniclabs.com/',
  },
  {
    id: 7, num: '07', title: 'PlanMyVisas',
    category: 'web', categoryLabel: 'Web App / VisaTech',
    desc: 'End-to-end visa planning and travel documentation platform simplifying global mobility.',
    tags: ['Travel Tech', 'Web App', 'Automation'],
    url: 'https://planmyvisas.com/',
  },
  {
    id: 8, num: '08', title: 'SpotDraft Contract AI',
    category: 'ai', categoryLabel: 'AI / Enterprise',
    desc: 'AI-powered contract lifecycle management platform trusted by global enterprise teams.',
    tags: ['AI', 'LegalTech', 'SaaS'],
    url: 'https://www.spotdraft.com/',
  },
];

const CATS = [
  { label: 'All',        value: 'all' },
  { label: 'Web',        value: 'web' },
  { label: 'E-Commerce', value: 'ecommerce' },
  { label: 'Marketing',  value: 'marketing' },
  { label: 'AI & SaaS',  value: 'ai' },
] as const;

export default function PortfolioGrid() {
  const [active, setActive] = useState<'all' | 'web' | 'ecommerce' | 'marketing' | 'ai'>('all');
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
              padding: '12px 24px', background: 'transparent', border: 'none',
              color: active === c.value ? 'var(--text)' : 'var(--text-3)',
              fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
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

      {/* Animated Grid */}
      <motion.div
        layout
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
          gap: 32,
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <ParallaxCard key={p.id} project={p} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

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

/* ── Parallax image on hover ── */
function ParallaxCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !imgRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 18;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 12;
    imgRef.current.style.transform = `scale(1.08) translate(${x * 0.5}px, ${y * 0.5}px)`;
    cardRef.current.style.transform = `perspective(900px) rotateX(${-y * 0.4}deg) rotateY(${x * 0.4}deg)`;
  };

  const onMouseLeave = () => {
    if (!cardRef.current || !imgRef.current) return;
    imgRef.current.style.transform = 'scale(1) translate(0,0)';
    cardRef.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  };

  const colors = ['#0d0e14', '#0e130e', '#130e0e', '#0e0e16', '#131108', '#0e1313'];

  return (
    <div
      ref={cardRef}
      className="reveal"
      style={{
        transitionDelay: `${(index % 3) * 0.08}s`,
        willChange: 'transform',
        transition: 'transform 0.5s cubic-bezier(0.25,1,0.5,1), opacity 0.9s ease',
        cursor: 'none',
      }}
      data-cursor="view"
      data-cursor-label="VIEW"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div style={{
        background: colors[index % colors.length],
        border: '1px solid var(--border)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Image area */}
        <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
          <div
            ref={imgRef}
            style={{
              width: '100%', height: '100%',
              transition: 'transform 0.5s cubic-bezier(0.25,1,0.5,1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {/* Placeholder visual */}
            <div style={{
              width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `linear-gradient(135deg, ${colors[index % colors.length]}, var(--surface))`,
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', inset: 0, opacity: 0.12,
                backgroundImage: 'linear-gradient(var(--border-mid) 1px, transparent 1px), linear-gradient(90deg, var(--border-mid) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }} />
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 300, color: 'rgba(240,240,240,0.12)', letterSpacing: '-0.03em' }}>
                {project.num}
              </span>
            </div>
          </div>
          {/* Gradient overlay at bottom */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
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
          <ArrowUpRight size={18} style={{ color: 'rgba(240,240,240,0.3)', flexShrink: 0, marginLeft: 12 }} />
        </div>
      </div>

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

interface Project {
  id: number; num: string; title: string;
  category: 'web' | 'mobile' | 'ai' | 'enterprise';
  categoryLabel: string; desc: string; tags: string[];
}

const PROJECTS: Project[] = [
  { id: 1, num: '01', title: 'Aether Platform',        category: 'web',        categoryLabel: 'SaaS / Web App',     desc: 'An ultra-minimalist dark mode SaaS dashboard visualising cloud resource allocations in real-time across multi-region clusters.',   tags: ['Next.js', 'PostgreSQL', 'Charts.js'] },
  { id: 2, num: '02', title: 'Velo Mobility',          category: 'mobile',     categoryLabel: 'Mobile / Brand',     desc: 'Premium brand redesign and cross-platform mobile client for a next-generation scooter sharing platform operating in 12 cities.', tags: ['React Native', 'Node.js', 'Mapbox'] },
  { id: 3, num: '03', title: 'Nucleus AI Visualiser',  category: 'ai',         categoryLabel: 'AI / Data',          desc: 'Interactive node-graph rendering deep-learning model token streams, attention matrices and parameter weights in the browser.',    tags: ['Three.js', 'FastAPI', 'PyTorch'] },
  { id: 4, num: '04', title: 'Slate Logistical Core',  category: 'enterprise', categoryLabel: 'Enterprise / Cloud', desc: 'High-availability routing and dispatch software connecting 400+ logistics drivers across regional hubs with sub-100ms latency.',    tags: ['Go', 'Docker', 'AWS ECS'] },
  { id: 5, num: '05', title: 'Apex Commerce API',      category: 'web',        categoryLabel: 'E-commerce / API',   desc: 'Headless commerce backend powering high-volume transactions for a luxury fashion retailer with under 80ms server response times.',  tags: ['GraphQL', 'Redis', 'Next.js'] },
  { id: 6, num: '06', title: 'Synthetix Agent Builder', category: 'ai',        categoryLabel: 'AI / No-Code',       desc: 'No-code console for constructing LLM agent logic loops, vector databases, retrieval pipelines and structured action triggers.',   tags: ['Python', 'OpenAI API', 'Pinecone'] },
];

const CATS = [
  { label: 'All',        value: 'all' },
  { label: 'Web',        value: 'web' },
  { label: 'Mobile',     value: 'mobile' },
  { label: 'AI',         value: 'ai' },
  { label: 'Enterprise', value: 'enterprise' },
] as const;

export default function PortfolioGrid() {
  useReveal();
  const [active, setActive] = useState<'all' | 'web' | 'mobile' | 'ai' | 'enterprise'>('all');
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
              borderBottom: active === c.value ? '2px solid var(--accent)' : '2px solid transparent',
              color: active === c.value ? 'var(--text)' : 'var(--text-3)',
              fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'color 0.2s, border-color 0.2s', whiteSpace: 'nowrap',
              marginBottom: -1,
            }}
            onMouseEnter={e => { if (active !== c.value) (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-2)'; }}
            onMouseLeave={e => { if (active !== c.value) (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-3)'; }}
          >
            {c.label}
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
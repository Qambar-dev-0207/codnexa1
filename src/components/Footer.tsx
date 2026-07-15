'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';


export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      {/* Big CTA row */}
      <div className="container" style={{ paddingBlock: 'clamp(64px, 8vw, 100px)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 32 }}>
          <div>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, marginBottom: 20 }}>
              Start a Project
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 6vw, 5rem)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.05, color: 'var(--text)' }}>
              Ready to build<br />something great?
            </h2>
          </div>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 500,
              letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text)',
              border: '1px solid var(--border-mid)', borderRadius: 2, padding: '14px 24px',
              transition: 'background 0.25s, color 0.25s',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--text)'; (e.currentTarget as HTMLElement).style.color = 'var(--bg)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
          >
            Get in touch <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      {/* Links grid */}
      <div className="container" style={{ paddingBlock: 64, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 40 }}>
        {/* Brand column */}
        <div style={{ gridColumn: 'span 2' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'baseline', marginBottom: 16 }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 500, color: 'var(--text)', letterSpacing: '-0.02em' }}>Codnexa</span>
            <span style={{ color: 'var(--accent)', fontSize: '1.4rem', fontWeight: 700, lineHeight: 1 }}>.</span>
          </Link>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 260 }}>
            Strategy, design, and development studio. We build what ambitious companies need to lead.
          </p>
          <div style={{ marginTop: 24, display: 'flex', gap: 16 }}>
            {['LinkedIn', 'X', 'Instagram', 'Dribbble'].map(s => (
              <a key={s} href="#" style={{ fontSize: '0.78rem', color: 'var(--text-3)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--text)')}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text-3)')}
              >{s}</a>
            ))}
          </div>
        </div>

        {/* Studio */}
        <div>
          <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 600, marginBottom: 20 }}>Studio</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[['Services', '/services'], ['Work', '/portfolio'], ['About', '/about'], ['Contact', '/contact']].map(([n, h]) => (
              <li key={n}>
                <Link href={h} style={{ fontSize: '0.9rem', color: 'var(--text-2)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--text)')}
                  onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text-2)')}
                >{n}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 600, marginBottom: 20 }}>Legal</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['Privacy Policy', 'Terms of Use', 'Cookies'].map(n => (
              <li key={n}>
                <a href="#" style={{ fontSize: '0.9rem', color: 'var(--text-2)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--text)')}
                  onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text-2)')}
                >{n}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 600, marginBottom: 20 }}>Contact</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="mailto:hello@codnexa.com" style={{ fontSize: '0.9rem', color: 'var(--text-2)', textDecoration: 'none' }}>hello@codnexa.com</a>
            <a href="tel:+1234567890" style={{ fontSize: '0.9rem', color: 'var(--text-2)', textDecoration: 'none' }}>+1 (234) 567-890</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container" style={{ borderTop: '1px solid var(--border)', paddingBlock: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>
          &copy; {new Date().getFullYear()} Codnexa Studio. All rights reserved.
        </span>
        <span style={{ fontSize: '0.72rem', letterSpacing: '0.06em', color: 'var(--text-3)', fontFamily: 'var(--font-sans)' }}>
          GMT+5:30
        </span>
      </div>
    </footer>
  );
}

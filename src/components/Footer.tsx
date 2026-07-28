'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { useTheme } from '@/components/ThemeProvider';

export default function Footer() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      {/* Big CTA row */}
      <div className="container" style={{ paddingBlock: 'clamp(64px, 8vw, 100px)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 32 }}>
          <div>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, marginBottom: 20 }}>
              {t('footer.cta.eyebrow')}
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 6vw, 5rem)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.05, color: 'var(--text)' }}>
              {t('footer.cta.title').split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
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
            {t('footer.cta.btn')} <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      {/* Links grid */}
      <div className="container" style={{ paddingBlock: 64, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 40 }}>
        {/* Brand column */}
        <div style={{ gridColumn: 'span 2' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <img
              src={theme === 'light' ? '/logo-icon.png' : '/logo-icon-dark.png'}
              alt="Codnexa Logo"
              style={{ height: 30, width: 'auto', display: 'block', objectFit: 'contain' }}
            />
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '1.3rem', letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1 }}>
              <span style={{ color: '#165a8b' }}>COD</span>
              <span style={{ color: '#1b929a' }}>NEXA</span>
            </span>
          </Link>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 260 }}>
            {t('footer.desc')}
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
          <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 600, marginBottom: 20 }}>{t('footer.studio')}</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              [t('nav.services'), '/services'],
              [t('nav.work'),     '/portfolio'],
              [t('nav.about'),    '/about'],
              [t('nav.contact'),  '/contact'],
            ].map(([n, h]) => (
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
          <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 600, marginBottom: 20 }}>{t('footer.legal')}</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[t('footer.privacy'), t('footer.terms'), t('footer.cookies')].map(n => (
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
          <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 600, marginBottom: 20 }}>{t('footer.contact')}</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="mailto:codnexa@gmail.com" style={{ fontSize: '0.9rem', color: 'var(--text-2)', textDecoration: 'none' }}>codnexa@gmail.com</a>
            <a href="tel:+916394623162" style={{ fontSize: '0.9rem', color: 'var(--text-2)', textDecoration: 'none' }}>+91 63946 23162</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container" style={{ borderTop: '1px solid var(--border)', paddingBlock: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>
          &copy; {new Date().getFullYear()} Codnexa Studio. {t('footer.rights')}
        </span>
        <span style={{ fontSize: '0.72rem', letterSpacing: '0.06em', color: 'var(--text-3)', fontFamily: 'var(--font-sans)' }}>
          GMT+5:30
        </span>
      </div>
    </footer>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, ArrowUpRight, Globe } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useLanguage, LANGUAGES } from './LanguageProvider';

import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const pathname                  = usePathname();
  const { theme, toggleTheme }    = useTheme();
  const [langOpen, setLangOpen]   = useState(false);
  const { language, setLanguage }  = useLanguage();
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(v => {
      document.body.classList.toggle('no-scroll', !v);
      return !v;
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove('no-scroll');
  };

  const links = [
    { name: t('nav.services'), href: '/services' },
    { name: t('nav.work'),     href: '/portfolio' },
    { name: t('nav.about'),    href: '/about' },
  ];

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          backgroundColor: scrolled ? 'var(--bg)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'background-color 0.4s ease, border-color 0.4s ease',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--container)',
            marginInline: 'auto',
            paddingInline: 'var(--gutter)',
            paddingBlock: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link href="/" onClick={closeMenu} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <img
              src={theme === 'light' ? '/logo-icon.png' : '/logo-icon-dark.png'}
              alt="Codnexa Logo"
              style={{ height: 28, width: 'auto', display: 'block', objectFit: 'contain' }}
            />
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1 }}>
              <span style={{ color: '#165a8b' }}>COD</span>
              <span style={{ color: '#1b929a' }}>NEXA</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: 'none', alignItems: 'center', gap: 16 }} className="desk-nav">
            {links.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  letterSpacing: '0.03em',
                  color: pathname === l.href ? 'var(--accent)' : 'var(--text-2)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  padding: '8px 16px',
                  position: 'relative',
                  zIndex: 1,
                }}
                className="nav-link"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = pathname === l.href ? 'var(--accent)' : 'var(--text-2)'; }}
              >
                {pathname === l.href && (
                  <motion.span
                    layoutId="nav-active-pill"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'var(--bg-alt)',
                      border: '1px solid var(--border)',
                      zIndex: -1,
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {l.name}
              </Link>
            ))}


            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: '1px solid var(--border-mid)',
                borderRadius: 2,
                width: 34,
                height: 34,
                color: 'var(--text-2)',
                cursor: 'pointer',
                transition: 'border-color 0.2s, color 0.2s',
              }}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Language Selector */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                aria-label="Select Language"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'transparent',
                  border: '1px solid var(--border-mid)',
                  borderRadius: 2,
                  paddingInline: 10,
                  height: 34,
                  color: 'var(--text-2)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
              >
                <Globe size={13} style={{ opacity: 0.7 }} />
                <span>{language}</span>
              </button>

              {langOpen && (
                <>
                  <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setLangOpen(false)} />
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: 8,
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 2,
                      padding: 6,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                      minWidth: 120,
                      zIndex: 100,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                    }}
                  >
                    {LANGUAGES.map(l => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLanguage(l.code as import('./LanguageProvider').LanguageCode);
                          setLangOpen(false);
                        }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          padding: '8px 12px',
                          textAlign: 'left',
                          fontSize: '0.78rem',
                          color: language === l.code ? 'var(--accent)' : 'var(--text-2)',
                          fontWeight: language === l.code ? 600 : 400,
                          cursor: 'pointer',
                          borderRadius: 2,
                          width: '100%',
                          transition: 'background 0.2s, color 0.2s',
                        }}
                      >
                        {l.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Link
              href="/contact"
              className="btn btn-primary"
              style={{ fontSize: '0.78rem', padding: '10px 20px' }}
            >
              Start a Project <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Mobile Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="mob-nav">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              style={{ background: 'transparent', border: '1px solid var(--border-mid)', borderRadius: 2, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)', cursor: 'pointer' }}
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Burger */}
            <button
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 5, padding: 4 }}
            >
              <span style={{ display: 'block', width: 22, height: 1.5, background: 'var(--text)', transition: 'transform 0.3s', transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
              <span style={{ display: 'block', width: 22, height: 1.5, background: 'var(--text)', transition: 'transform 0.3s, opacity 0.3s', opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: 22, height: 1.5, background: 'var(--text)', transition: 'transform 0.3s', transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--bg)',
          zIndex: 900,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingInline: 'var(--gutter)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.55s cubic-bezier(0.77,0,0.175,1)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {links.map((l, i) => (
            <Link
              key={l.name}
              href={l.href}
              onClick={closeMenu}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.8rem, 10vw, 5rem)',
                fontWeight: 300,
                color: pathname === l.href ? 'var(--accent)' : 'var(--text)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                paddingBlock: 8,
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(20px)',
                transition: `opacity 0.4s ease ${i * 0.07 + 0.2}s, transform 0.4s ease ${i * 0.07 + 0.2}s`,
              }}
            >
              <span>{l.name}</span>
              <ArrowUpRight size={24} style={{ color: 'var(--text-3)' }} />
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={closeMenu}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.8rem, 10vw, 5rem)',
              fontWeight: 300,
              color: pathname === '/contact' ? 'var(--accent)' : 'var(--text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              paddingBlock: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateX(0)' : 'translateX(20px)',
              transition: `opacity 0.4s ease 0.41s, transform 0.4s ease 0.41s`,
            }}
          >
            <span>Contact</span>
            <ArrowUpRight size={24} style={{ color: 'var(--text-3)' }} />
          </Link>
        </div>

        <div style={{ position: 'absolute', bottom: 40, left: 'var(--gutter)', right: 'var(--gutter)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a href="mailto:silverhanzala@gmail.com" style={{ fontSize: '0.85rem', color: 'var(--text-2)' }}>
              silverhanzala@gmail.com
            </a>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', maxWidth: 260 }}>
              {LANGUAGES.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code as import('./LanguageProvider').LanguageCode)}
                  style={{
                    background: 'transparent',
                    border: language === l.code ? '1px solid var(--accent)' : '1px solid transparent',
                    borderRadius: 2,
                    fontSize: '0.65rem',
                    fontWeight: language === l.code ? 700 : 400,
                    color: language === l.code ? 'var(--accent)' : 'var(--text-3)',
                    cursor: 'pointer',
                    padding: '3px 7px',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                >
                  {l.code}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 20, fontSize: '0.8rem', color: 'var(--text-3)' }}>
            <a href="#" style={{ color: 'var(--text-3)' }}>LinkedIn</a>
            <a href="#" style={{ color: 'var(--text-3)' }}>X</a>
            <a href="#" style={{ color: 'var(--text-3)' }}>Instagram</a>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desk-nav { display: flex !important; }
          .mob-nav  { display: none !important; }
        }
      `}</style>
    </>
  );
}

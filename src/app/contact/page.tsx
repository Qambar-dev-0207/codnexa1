'use client';

import { useEffect, useState } from 'react';
import { Mail, Calendar, Check, Send, Sparkles, ArrowUpRight, Phone } from 'lucide-react';
import DecryptedText from '@/components/DecryptedText';
import { useLanguage } from '@/components/LanguageProvider';

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

export default function Contact() {
  useReveal();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'form' | 'calendar'>('form');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [bookingDate, setBookingDate] = useState<string | null>(null);
  const [bookingTime, setBookingTime] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      type: 'brief',
      name: formData.get('name'),
      email: formData.get('email'),
      project_focus: formData.get('project_focus'),
      details: formData.get('details'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        setFormSubmitted(true);
      } else {
        setFormError(data.message || 'Failed to send brief. Please try again.');
      }
    } catch (err) {
      setFormError('Network error. Please check your connection and try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime) return;
    setBookingSubmitting(true);
    setBookingError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      type: 'booking',
      name: formData.get('name'),
      email: formData.get('email'),
      bookingDate,
      bookingTime,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        setBookingConfirmed(true);
      } else {
        setBookingError(data.message || 'Failed to book slot. Please try again.');
      }
    } catch (err) {
      setBookingError('Network error. Please check your connection and try again.');
    } finally {
      setBookingSubmitting(false);
    }
  };

  const availableDates = [
    { label: 'Mon, Jul 20', value: '2026-07-20' },
    { label: 'Tue, Jul 21', value: '2026-07-21' },
    { label: 'Wed, Jul 22', value: '2026-07-22' },
    { label: 'Thu, Jul 23', value: '2026-07-23' },
    { label: 'Fri, Jul 24', value: '2026-07-24' },
  ];

  const availableTimes = ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

  return (
    <div>
      {/* ── HEADER ─────────────────────────────────────────── */}
      <section style={{ paddingTop: 'clamp(120px, 18vw, 200px)', paddingBottom: 'clamp(60px, 8vw, 100px)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(27,146,154,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container">
          <p className="eyebrow reveal" style={{ marginBottom: 24 }}>{t('contact.hero.eyebrow')}</p>
          <h1 className="reveal reveal-delay-1" style={{ fontSize: 'clamp(4.5rem, 10vw, 9rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.0, color: 'var(--text)' }}>
            {t('contact.hero.title').split('\n').map((line, i) => (
              <span key={i}>{i === 0 ? line : <><br /><em>{line}</em></>}</span>
            ))}
          </h1>
          <p className="reveal reveal-delay-2" style={{ marginTop: 32, maxWidth: 520, fontSize: '1.05rem' }}>
            {t('contact.hero.desc')}
          </p>
        </div>
      </section>

      {/* ── CONTACT GRID ───────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="contact-grid">
            
            {/* Info Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }} className="reveal">
              <div>
                <p className="eyebrow" style={{ marginBottom: 16 }}>{t('contact.hero.eyebrow')}</p>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.05, color: 'var(--text)' }}>
                  {t('contact.hero.title').split('\n').map((line, i) => (
                    <span key={i}>{line}{i === 0 && <br />}</span>
                  ))}
                </h2>
                <p style={{ marginTop: 20, fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--text-2)' }}>
                  {t('contact.hero.desc')}
                </p>
              </div>

              {/* Email details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, border: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={16} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', display: 'block', marginBottom: 4 }}>{t('footer.contact')}</span>
                    <a href="mailto:codnexa@gmail.com" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text)', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
                    >codnexa@gmail.com</a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, border: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={16} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', display: 'block', marginBottom: 4 }}>{t('contact.info.hours')}</span>
                    <a href="tel:+916394623162" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text)', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
                    >+91 63946 23162</a>
                  </div>
                </div>

                {/* WhatsApp Button */}
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, border: '1px solid rgba(37, 211, 102, 0.4)', background: 'rgba(37, 211, 102, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: 2 }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                    </svg>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', display: 'block', marginBottom: 6 }}>WhatsApp</span>
                    <a
                      href="https://wa.me/916394623162"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 600,
                        letterSpacing: '0.04em', color: '#ffffff', background: '#25D366',
                        padding: '10px 20px', borderRadius: 4, textDecoration: 'none',
                        transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
                        boxShadow: '0 4px 14px rgba(37, 211, 102, 0.25)',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#20ba5a'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#25D366'; }}
                    >
                      WhatsApp (+91 63946 23162) <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Office coordinate */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 32 }}>
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', display: 'block', marginBottom: 12 }}>{t('contact.info.office')}</span>
                <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--text-2)' }}>
                  Codnexa Global Studio<br />
                  {t('contact.info.hours.val')}
                </p>
              </div>
            </div>

            {/* Form Column */}
            <div className="reveal reveal-delay-1" style={{ width: '100%' }}>
              
              {/* Tab Selector */}
              <div style={{ display: 'flex', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', marginBottom: 32, maxWidth: 440 }}>
                <button
                  onClick={() => setActiveTab('form')}
                  style={{
                    flex: 1, padding: '12px 16px', background: activeTab === 'form' ? 'var(--surface)' : 'var(--bg-alt)',
                    color: activeTab === 'form' ? 'var(--text)' : 'var(--text-3)', border: 'none',
                    fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'color 0.2s, background 0.2s',
                  }}
                >
                  1. {t('contact.tabs.brief')}
                </button>
                <button
                  onClick={() => setActiveTab('calendar')}
                  style={{
                    flex: 1, padding: '12px 16px', background: activeTab === 'calendar' ? 'var(--surface)' : 'var(--bg-alt)',
                    color: activeTab === 'calendar' ? 'var(--text)' : 'var(--text-3)', border: 'none',
                    fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'color 0.2s, background 0.2s',
                  }}
                >
                  2. {t('contact.tabs.call')}
                </button>
              </div>

              {/* Form Window */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '40px 36px', minHeight: 480, position: 'relative' }}>
                
                {/* TAB 1: FORM */}
                {activeTab === 'form' && (
                  <div>
                    {!formSubmitted ? (
                      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {formError && (
                          <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#ef4444', fontSize: '0.82rem', borderRadius: 2 }}>
                            {formError}
                          </div>
                        )}
                        <div className="form-row">
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <label htmlFor="name" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 600 }}>{t('contact.form.name')}</label>
                            <input type="text" id="name" name="name" required placeholder="Jane Doe" className="form-input" style={{ border: '1px solid var(--border)', borderRadius: 2 }} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <label htmlFor="email" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 600 }}>{t('contact.form.email')}</label>
                            <input type="email" id="email" name="email" required placeholder="jane@example.com" className="form-input" style={{ border: '1px solid var(--border)', borderRadius: 2 }} />
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <label htmlFor="scope" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 600 }}>{t('contact.form.focus')}</label>
                          <select id="scope" name="project_focus" className="form-input" style={{ border: '1px solid var(--border)', borderRadius: 2, background: 'var(--surface)', appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\x27http://www.w3.org/2000/svg\x27 viewBox=\x270 0 24 24\x27 fill=\x27none\x27 stroke=\x27%235a5a5a\x27 stroke-width=\x272\x27 stroke-linecap=\x27round\x27 stroke-linejoin=\x27round\x27%3E%3Cpath d=\x27m6 9 6 6 6-6\x27/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '16px' }}>
                            <option>Strategy & Scoping Diagnostics</option>
                            <option>Figma UI/UX & Identity Design</option>
                            <option>Next.js Full-Stack Web App</option>
                            <option>Mobile Client (iOS/Android)</option>
                            <option>Enterprise Cloud Systems</option>
                          </select>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <label htmlFor="details" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 600 }}>{t('contact.form.message')}</label>
                          <textarea id="details" name="details" rows={5} required placeholder={t('contact.form.message.placeholder')} className="form-input" style={{ border: '1px solid var(--border)', borderRadius: 2, resize: 'vertical', minHeight: 120 }} />
                        </div>

                        <button type="submit" disabled={formSubmitting} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, paddingBlock: 14, opacity: formSubmitting ? 0.7 : 1 }}>
                          {formSubmitting ? '...' : <>{t('contact.form.submit')} <Send size={14} /></>}
                        </button>
                      </form>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center', paddingBlock: 40 }} className="reveal">
                        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(16,185,129,0.06)', border: '1px solid rgb(16,185,129)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgb(16,185,129)' }}>
                          <Check size={20} />
                        </div>
                        <div>
                          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 300, marginBottom: 8, color: 'var(--text)' }}>{t('contact.form.success.title')}</h3>
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', maxWidth: 320, marginInline: 'auto' }}>
                            {t('contact.form.success.desc')}
                          </p>
                        </div>
                        <button onClick={() => setFormSubmitted(false)} className="btn btn-outline" style={{ marginTop: 12 }}>
                          {t('contact.form.success.btn')}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: CALENDAR SCHEDULER */}
                {activeTab === 'calendar' && (
                  <div>
                    {!bookingConfirmed ? (
                      <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {bookingError && (
                          <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#ef4444', fontSize: '0.82rem', borderRadius: 2 }}>
                            {bookingError}
                          </div>
                        )}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 400, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Sparkles size={15} style={{ color: 'var(--accent)' }} /> Custom Diagnostics
                          </h3>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>Select a date and time slot to book an interactive 30 minute system planning call.</p>
                        </div>

                        {/* Date Select */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <span style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 600 }}>Select Date</span>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 8 }}>
                            {availableDates.map(date => {
                              const isSelected = bookingDate === date.value;
                              return (
                                <button
                                  key={date.value}
                                  type="button"
                                  onClick={() => setBookingDate(date.value)}
                                  style={{
                                    paddingBlock: 12, border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border)',
                                    background: isSelected ? 'var(--accent)' : 'var(--bg-alt)',
                                    color: isSelected ? '#fff' : 'var(--text-2)',
                                    borderRadius: 2, fontSize: '0.75rem', cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s, color 0.2s',
                                  }}
                                >
                                  {date.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Time Select */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <span style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 600 }}>Select Time (EST)</span>
                          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {availableTimes.map(time => {
                              const isSelected = bookingTime === time;
                              return (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() => setBookingTime(time)}
                                  style={{
                                    padding: '8px 16px', border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border)',
                                    background: isSelected ? 'var(--accent)' : 'var(--bg-alt)',
                                    color: isSelected ? '#fff' : 'var(--text-2)',
                                    borderRadius: 2, fontSize: '0.75rem', cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s, color 0.2s',
                                  }}
                                >
                                  {time}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="form-row" style={{ gap: 16 }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <label htmlFor="book-name" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 600 }}>{t('contact.form.name')}</label>
                            <input type="text" id="book-name" name="name" required placeholder="Jane Doe" className="form-input" style={{ border: '1px solid var(--border)', borderRadius: 2 }} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <label htmlFor="book-email" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 600 }}>{t('contact.form.email')}</label>
                            <input type="email" id="book-email" name="email" required placeholder="jane@example.com" className="form-input" style={{ border: '1px solid var(--border)', borderRadius: 2 }} />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={!bookingDate || !bookingTime || bookingSubmitting}
                          className="btn btn-primary"
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, paddingBlock: 14,
                            opacity: (!bookingDate || !bookingTime || bookingSubmitting) ? 0.5 : 1,
                            pointerEvents: (!bookingDate || !bookingTime || bookingSubmitting) ? 'none' : 'auto',
                          }}
                        >
                          {bookingSubmitting ? '...' : <>{t('contact.book.submit')} <Check size={14} /></>}
                        </button>
                      </form>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center', paddingBlock: 24 }} className="reveal">
                        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(16,185,129,0.06)', border: '1px solid rgb(16,185,129)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgb(16,185,129)' }}>
                          <Check size={20} />
                        </div>
                        <div>
                          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 300, marginBottom: 8, color: 'var(--text)' }}>{t('contact.book.success.title')}</h3>
                          <div style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)', padding: 18, borderRadius: 2, textAlign: 'left', minWidth: 260, marginInline: 'auto', display: 'flex', flexDirection: 'column', gap: 10, marginBlock: 16 }}>
                            <div style={{ fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600 }}>System Diagnostics</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text)' }}>📅 {t('contact.book.success.desc')}: {availableDates.find(d => d.value === bookingDate)?.label || bookingDate}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text)' }}>⏰ Time: {bookingTime} (EST)</div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setBookingConfirmed(false);
                            setBookingDate(null);
                            setBookingTime(null);
                          }}
                          className="btn btn-outline"
                        >
                          Book another slot
                        </button>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .form-row { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </div>
  );
}
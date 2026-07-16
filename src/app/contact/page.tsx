'use client';

import { useEffect, useState } from 'react';
import { Mail, Calendar, Check, Send, Sparkles, ArrowUpRight, Phone } from 'lucide-react';
import DecryptedText from '@/components/DecryptedText';

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
  const [activeTab, setActiveTab] = useState<'form' | 'calendar'>('form');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [bookingDate, setBookingDate] = useState<string | null>(null);
  const [bookingTime, setBookingTime] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setFormSubmitted(true), 600);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime) return;
    setTimeout(() => setBookingConfirmed(true), 600);
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
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(230,58,15,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container">
          <p className="eyebrow reveal" style={{ marginBottom: 24 }}>Collaborate</p>
          <h1 className="reveal reveal-delay-1" style={{ fontSize: 'clamp(4.5rem, 10vw, 9rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.0, color: 'var(--text)' }}>
            Start a project &<br /><em>see it through.</em>
          </h1>
          <p className="reveal reveal-delay-2" style={{ marginTop: 32, maxWidth: 520, fontSize: '1.05rem' }}>
            Have a product idea or system that needs scaling? Choose your preferred contact method below: fill our brief or book an engineering diagnostic call instantly.
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
                <p className="eyebrow" style={{ marginBottom: 16 }}>Contact Us</p>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.05, color: 'var(--text)' }}>
                  Get in<br />touch
                </h2>
                <p style={{ marginTop: 20, fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--text-2)' }}>
                  Our team reviews project briefs daily. Expect a detailed response within 24 hours outlining our diagnostic approach and estimated sprint lines.
                </p>
              </div>

              {/* Email details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, border: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={16} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', display: 'block', marginBottom: 4 }}>General Inquiry</span>
                    <a href="mailto:silverhanzala@gmail.com" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text)', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
                    >silverhanzala@gmail.com</a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, border: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={16} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', display: 'block', marginBottom: 4 }}>Direct Contact</span>
                    <a href="tel:+916394623162" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text)', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
                    >+91 63946 23162</a>
                  </div>
                </div>
              </div>

              {/* Office coordinate */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 32 }}>
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', display: 'block', marginBottom: 12 }}>Studio Coordinates</span>
                <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--text-2)' }}>
                  Codnexa Global Studio<br />
                  Available worldwide via Slack/Teams.<br />
                  Node: GMT+5:30
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
                  1. Submit Brief
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
                  2. Book Diagnostic
                </button>
              </div>

              {/* Form Window */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '40px 36px', minHeight: 480, position: 'relative' }}>
                
                {/* TAB 1: FORM */}
                {activeTab === 'form' && (
                  <div>
                    {!formSubmitted ? (
                      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        <div className="form-row">
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <label htmlFor="name" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 600 }}>Your Name</label>
                            <input type="text" id="name" required placeholder="Jane Doe" className="form-input" style={{ border: '1px solid var(--border)', borderRadius: 2 }} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <label htmlFor="email" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 600 }}>Your Email</label>
                            <input type="email" id="email" required placeholder="jane@example.com" className="form-input" style={{ border: '1px solid var(--border)', borderRadius: 2 }} />
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <label htmlFor="scope" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 600 }}>Project Focus</label>
                          <select id="scope" className="form-input" style={{ border: '1px solid var(--border)', borderRadius: 2, background: 'var(--surface)', appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\x27http://www.w3.org/2000/svg\x27 viewBox=\x270 0 24 24\x27 fill=\x27none\x27 stroke=\x27%235a5a5a\x27 stroke-width=\x272\x27 stroke-linecap=\x27round\x27 stroke-linejoin=\x27round\x27%3E%3Cpath d=\x27m6 9 6 6 6-6\x27/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '16px' }}>
                            <option>Strategy & Scoping Diagnostics</option>
                            <option>Figma UI/UX & Identity Design</option>
                            <option>Next.js Full-Stack Web App</option>
                            <option>Mobile Client (iOS/Android)</option>
                            <option>Enterprise Cloud Systems</option>
                          </select>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <label htmlFor="details" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 600 }}>Brief Details</label>
                          <textarea id="details" rows={5} required placeholder="Describe your product goal, estimated timelines, and features needed..." className="form-input" style={{ border: '1px solid var(--border)', borderRadius: 2, resize: 'vertical', minHeight: 120 }} />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, paddingBlock: 14 }}>
                          Send Brief <Send size={14} />
                        </button>
                      </form>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center', paddingBlock: 40 }} className="reveal">
                        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(16,185,129,0.06)', border: '1px solid rgb(16,185,129)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgb(16,185,129)' }}>
                          <Check size={20} />
                        </div>
                        <div>
                          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 300, marginBottom: 8, color: 'var(--text)' }}>Inquiry Received</h3>
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', maxWidth: 320, marginInline: 'auto' }}>
                            Thank you for sharing your brief. We will review the details and get back to you within 24 hours.
                          </p>
                        </div>
                        <button onClick={() => setFormSubmitted(false)} className="btn btn-outline" style={{ marginTop: 12 }}>
                          Send another message
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
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 400, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Sparkles size={15} style={{ color: 'var(--accent)' }} /> Custom Diagnostics
                          </h3>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>Select a date and time slot to book an interactive 30-minute system planning call.</p>
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
                            <label htmlFor="book-name" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 600 }}>Your Name</label>
                            <input type="text" id="book-name" required placeholder="Jane Doe" className="form-input" style={{ border: '1px solid var(--border)', borderRadius: 2 }} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <label htmlFor="book-email" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 600 }}>Email Address</label>
                            <input type="email" id="book-email" required placeholder="jane@example.com" className="form-input" style={{ border: '1px solid var(--border)', borderRadius: 2 }} />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={!bookingDate || !bookingTime}
                          className="btn btn-primary"
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, paddingBlock: 14,
                            opacity: (!bookingDate || !bookingTime) ? 0.5 : 1,
                            pointerEvents: (!bookingDate || !bookingTime) ? 'none' : 'auto',
                          }}
                        >
                          Confirm Booking <Check size={14} />
                        </button>
                      </form>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center', paddingBlock: 24 }} className="reveal">
                        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(16,185,129,0.06)', border: '1px solid rgb(16,185,129)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgb(16,185,129)' }}>
                          <Check size={20} />
                        </div>
                        <div>
                          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 300, marginBottom: 8, color: 'var(--text)' }}>Call Confirmed</h3>
                          <div style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)', padding: 18, borderRadius: 2, textAlign: 'left', minWidth: 260, marginInline: 'auto', display: 'flex', flexDirection: 'column', gap: 10, marginBlock: 16 }}>
                            <div style={{ fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600 }}>System Diagnostics</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text)' }}>📅 Date: {availableDates.find(d => d.value === bookingDate)?.label || bookingDate}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text)' }}>⏰ Time: {bookingTime} (EST)</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', borderTop: '1px solid var(--border)', paddingTop: 10 }}>We sent calendar invite + Meet link to your email.</div>
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
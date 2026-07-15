'use client';

import { useEffect, useState } from 'react';
import { Mail, Calendar, Check, Send, Sparkles } from 'lucide-react';

export default function Contact() {
  const [activeTab, setActiveTab] = useState<'form' | 'calendar'>('form');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [bookingDate, setBookingDate] = useState<string | null>(null);
  const [bookingTime, setBookingTime] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    const handleScrollReveal = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elementVisible = 150;
        if (rect.top < window.innerHeight - elementVisible) {
          el.classList.add('is-visible');
        }
      });
    };

    window.addEventListener('scroll', handleScrollReveal);
    handleScrollReveal();
    return () => window.removeEventListener('scroll', handleScrollReveal);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate network delay
    setTimeout(() => {
      setFormSubmitted(true);
    }, 600);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime) return;
    // Simulate network delay
    setTimeout(() => {
      setBookingConfirmed(true);
    }, 600);
  };

  // Mock available dates for the scheduler
  const availableDates = [
    { label: 'Mon, Jul 20', value: '2026-07-20' },
    { label: 'Tue, Jul 21', value: '2026-07-21' },
    { label: 'Wed, Jul 22', value: '2026-07-22' },
    { label: 'Thu, Jul 23', value: '2026-07-23' },
    { label: 'Fri, Jul 24', value: '2026-07-24' },
  ];

  // Mock available times
  const availableTimes = ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

  return (
    <div className="py-12">
      {/* Page Header */}
      <section className="border-b border-[var(--color-border)] pb-20">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="max-w-3xl animate-on-scroll">
            <span className="text-xs uppercase tracking-widest text-[var(--color-accent)] font-semibold block mb-2">
              Collaborate
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-light leading-[1.1] mb-6">
              Start a project & <br />
              <em className="font-light italic text-[var(--color-accent)]">see it through.</em>
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-text-muted)] font-light leading-relaxed">
              Have a product idea or system that needs scaling? Choose your preferred contact method below: fill our brief or book an engineering diagnostic call instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Contact Container */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Info Side (Cols: 4) */}
          <div className="lg:col-span-4 flex flex-col gap-10 animate-on-scroll">
            <div className="flex flex-col gap-4">
              <h2 className="font-heading text-3xl font-light">Get in touch</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed font-light">
                Our team reviews project briefs daily. Expect a detailed response within 24 hours outlining our diagnostic approach and estimated sprint lines.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)]">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">General Inquiry</span>
                  <a href="mailto:hello@codnexa.com" className="text-lg font-heading text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors">
                    hello@codnexa.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)]">
                  <Calendar size={18} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Project Briefing</span>
                  <a href="mailto:build@codnexa.com" className="text-lg font-heading text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors">
                    build@codnexa.com
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--color-border)] pt-8 flex flex-col gap-3">
              <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Office Hub</span>
              <p className="text-sm text-[var(--color-text-primary)] font-light leading-relaxed">
                Codnexa Global Studio <br />
                Available worldwide via Slack/Teams. <br />
                Node coordinate: GMT+5:30
              </p>
            </div>
          </div>

          {/* Form / Calendar Panel Side (Cols: 8) */}
          <div className="lg:col-span-8 animate-on-scroll">
            {/* Tab Toggles */}
            <div className="flex border border-[var(--color-border)] bg-[var(--color-surface)]/50 rounded-xl p-1 mb-8 max-w-sm">
              <button
                onClick={() => setActiveTab('form')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                  activeTab === 'form'
                    ? 'bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-primary)] shadow-sm'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                1. Submit Brief
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                  activeTab === 'calendar'
                    ? 'bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-primary)] shadow-sm'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                2. Book Diagnostic Call
              </button>
            </div>

            {/* Content Container */}
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 relative overflow-hidden min-h-[500px]">
              
              {/* TAB 1: SUBMIT BRIEF */}
              {activeTab === 'form' && (
                <div className="h-full">
                  {!formSubmitted ? (
                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="name" className="text-xs font-semibold text-[var(--color-text-primary)]">Your Name</label>
                          <input type="text" id="name" required placeholder="Jane Doe" className="form-input" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="email" className="text-xs font-semibold text-[var(--color-text-primary)]">Your Email</label>
                          <input type="email" id="email" required placeholder="jane@example.com" className="form-input" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="scope" className="text-xs font-semibold text-[var(--color-text-primary)]">Project Focus</label>
                        <select id="scope" className="form-input form-select">
                          <option>Strategy & Scoping Diagnostics</option>
                          <option>Figma UI/UX & Identity Design</option>
                          <option>Next.js Full-Stack Web App</option>
                          <option>Mobile Client (iOS/Android)</option>
                          <option>Enterprise Architecture Integration</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="details" className="text-xs font-semibold text-[var(--color-text-primary)]">Brief Details</label>
                        <textarea id="details" rows={5} required placeholder="Describe your product goal, estimated timelines, and features needed..." className="form-input form-textarea"></textarea>
                      </div>

                      <button type="submit" className="btn btn-primary btn-submit flex items-center justify-center gap-2 cursor-pointer">
                        Send Brief <Send size={16} />
                      </button>
                    </form>
                  ) : (
                    <div className="absolute inset-0 bg-[var(--color-surface)] flex items-center justify-center p-8 text-center animate-fade-in">
                      <div className="flex flex-col items-center gap-4 max-w-sm">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500 text-emerald-500 flex items-center justify-center text-xl font-bold">
                          &check;
                        </div>
                        <h3 className="font-heading text-2xl font-light">Inquiry received</h3>
                        <p className="text-sm text-[var(--color-text-muted)] font-light leading-relaxed">
                          Thank you for sharing your brief. Uzair or Munazza will review the details and respond within 24 hours.
                        </p>
                        <button onClick={() => setFormSubmitted(false)} className="btn btn-secondary mt-4 cursor-pointer">
                          Send another message
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: SCHEDULER WIDGET */}
              {activeTab === 'calendar' && (
                <div className="h-full">
                  {!bookingConfirmed ? (
                    <form onSubmit={handleBookingSubmit} className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <h3 className="font-heading text-xl font-light text-[var(--color-text-primary)] flex items-center gap-2">
                          <Sparkles size={16} className="text-[var(--color-accent)]" />
                          Custom Diagnostic Scheduler
                        </h3>
                        <p className="text-xs text-[var(--color-text-muted)] font-light">
                          Select a date and time slot to book an interactive 30-minute system planning call.
                        </p>
                      </div>

                      {/* Date Select */}
                      <div className="flex flex-col gap-3">
                        <span className="text-xs font-semibold text-[var(--color-text-primary)]">Select Date</span>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                          {availableDates.map((date) => {
                            const isSelected = bookingDate === date.value;
                            return (
                              <button
                                key={date.value}
                                type="button"
                                onClick={() => setBookingDate(date.value)}
                                className={`py-3 text-xs rounded-lg border font-medium transition-all text-center cursor-pointer ${
                                  isSelected
                                    ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white shadow-sm'
                                    : 'bg-[var(--color-bg)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-hover)]'
                                }`}
                              >
                                {date.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time Select */}
                      <div className="flex flex-col gap-3">
                        <span className="text-xs font-semibold text-[var(--color-text-primary)]">Select Time (EST)</span>
                        <div className="flex flex-wrap gap-2">
                          {availableTimes.map((time) => {
                            const isSelected = bookingTime === time;
                            return (
                              <button
                                key={time}
                                type="button"
                                onClick={() => setBookingTime(time)}
                                className={`px-4 py-2.5 text-xs rounded-lg border font-medium transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white shadow-sm'
                                    : 'bg-[var(--color-bg)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-hover)]'
                                }`}
                              >
                                {time}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Attendee Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="book-name" className="text-xs font-semibold text-[var(--color-text-primary)]">Your Name</label>
                          <input type="text" id="book-name" required placeholder="Jane Doe" className="form-input text-sm py-2" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="book-email" className="text-xs font-semibold text-[var(--color-text-primary)]">Email Address</label>
                          <input type="email" id="book-email" required placeholder="jane@example.com" className="form-input text-sm py-2" />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={!bookingDate || !bookingTime}
                        className={`btn btn-primary btn-submit flex items-center justify-center gap-2 cursor-pointer ${
                          (!bookingDate || !bookingTime) ? 'opacity-50 pointer-events-none' : ''
                        }`}
                      >
                        Confirm Booking <Check size={16} />
                      </button>
                    </form>
                  ) : (
                    <div className="absolute inset-0 bg-[var(--color-surface)] flex items-center justify-center p-8 text-center animate-fade-in">
                      <div className="flex flex-col items-center gap-4 max-w-sm">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500 text-emerald-500 flex items-center justify-center text-xl font-bold">
                          &check;
                        </div>
                        <h3 className="font-heading text-2xl font-light">Call Confirmed</h3>
                        <div className="bg-[var(--color-bg)] border border-[var(--color-border)] p-4 rounded-xl w-full text-left flex flex-col gap-1.5 my-2">
                          <p className="text-xs text-[var(--color-text-muted)]">SYSTEM DIAGNOSTIC BRIDGING</p>
                          <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                            📅 Date: {availableDates.find(d => d.value === bookingDate)?.label || bookingDate}
                          </p>
                          <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                            ⏰ Time: {bookingTime} (EST)
                          </p>
                          <p className="text-xs text-[var(--color-text-muted)] mt-1">We sent an invitation and a Google Meet link to your email.</p>
                        </div>
                        <button
                          onClick={() => {
                            setBookingConfirmed(false);
                            setBookingDate(null);
                            setBookingTime(null);
                          }}
                          className="btn btn-secondary mt-2 cursor-pointer"
                        >
                          Book another slot
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

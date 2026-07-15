'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot   = dotRef.current;
    const ring  = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      dot.style.display  = 'none';
      ring.style.display = 'none';
      return;
    }

    // Hide native cursor globally
    document.documentElement.style.cursor = 'none';

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let dx = mx, dy = my;
    let rx = mx, ry = my;
    let hovered = false;
    let labelText = '';
    let raf: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      // Dot follows immediately with small lag
      dx = lerp(dx, mx, 0.55);
      dy = lerp(dy, my, 0.55);

      // Ring follows lazily
      rx = lerp(rx, mx, 0.1);
      ry = lerp(ry, my, 0.1);

      dot.style.transform  = `translate(${dx}px, ${dy}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;

      raf = requestAnimationFrame(tick);
    };
    tick();

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener('mousemove', onMove, { passive: true });

    // Cursor state: default | hover | view | drag
    const setState = (state: 'default' | 'hover' | 'view' | 'text') => {
      ring.dataset.state = state;
      label.dataset.state = state;
      switch (state) {
        case 'hover':
          ring.style.width  = '56px';
          ring.style.height = '56px';
          ring.style.borderColor = 'var(--accent)';
          ring.style.background  = 'rgba(230,58,15,0.04)';
          dot.style.background   = 'var(--accent)';
          dot.style.width = '6px'; dot.style.height = '6px';
          label.style.opacity = '0';
          break;
        case 'view':
          ring.style.width  = '90px';
          ring.style.height = '90px';
          ring.style.borderColor = 'rgba(240,240,240,0.6)';
          ring.style.background  = 'rgba(230,58,15,0.06)';
          dot.style.background   = 'transparent';
          dot.style.width = '0px'; dot.style.height = '0px';
          label.style.opacity = '1';
          label.textContent = labelText || 'VIEW';
          break;
        case 'text':
          ring.style.width  = '2px';
          ring.style.height = '24px';
          ring.style.borderRadius = '1px';
          ring.style.borderColor = 'var(--text)';
          ring.style.background  = 'var(--text)';
          dot.style.background   = 'transparent';
          dot.style.width = '0'; dot.style.height = '0';
          label.style.opacity = '0';
          break;
        default:
          ring.style.width  = '32px';
          ring.style.height = '32px';
          ring.style.borderRadius = '50%';
          ring.style.borderColor = 'rgba(240,240,240,0.4)';
          ring.style.background  = 'transparent';
          dot.style.background   = 'var(--accent)';
          dot.style.width = '5px'; dot.style.height = '5px';
          label.style.opacity = '0';
      }
    };

    setState('default');

    // Bind hover intents to DOM elements
    const bind = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        const e = el as HTMLElement;
        if (e.dataset.cursorBound) return;
        e.dataset.cursorBound = '1';

        const cursorType = e.dataset.cursor || 'hover';
        e.addEventListener('mouseenter', () => {
          hovered = true;
          labelText = e.dataset.cursorLabel || 'VIEW';
          setState(cursorType as 'hover' | 'view' | 'text');
        });
        e.addEventListener('mouseleave', () => {
          hovered = false;
          setState('default');
          ring.style.borderRadius = '50%';
        });
      });

      document.querySelectorAll('p, li, span').forEach(el => {
        const e = el as HTMLElement;
        if (e.dataset.cursorBound) return;
        e.dataset.cursorBound = '1';
        e.addEventListener('mouseenter', () => { if (!hovered) setState('default'); });
      });
    };

    bind();

    const observer = new MutationObserver(bind);
    observer.observe(document.body, { childList: true, subtree: true });

    const onLeave = () => { dot.style.opacity = '0'; ring.style.opacity = '0'; };
    const onEnter = () => { dot.style.opacity = '1'; ring.style.opacity = '1'; };
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      document.documentElement.style.cursor = '';
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99999,
          width: 5, height: 5, borderRadius: '50%',
          background: 'var(--accent)',
          pointerEvents: 'none',
          willChange: 'transform',
          transition: 'width 0.25s ease, height 0.25s ease, background 0.25s ease, opacity 0.3s ease',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99998,
          width: 32, height: 32, borderRadius: '50%',
          border: '1px solid rgba(240,240,240,0.4)',
          pointerEvents: 'none',
          willChange: 'transform',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'width 0.4s cubic-bezier(0.25,1,0.5,1), height 0.4s cubic-bezier(0.25,1,0.5,1), border-color 0.3s ease, background 0.3s ease, border-radius 0.3s ease, opacity 0.3s ease',
        }}
      >
        {/* Label inside ring */}
        <div
          ref={labelRef}
          style={{
            fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--text)',
            opacity: 0, transition: 'opacity 0.25s ease',
            pointerEvents: 'none', userSelect: 'none',
          }}
        />
      </div>
    </>
  );
}
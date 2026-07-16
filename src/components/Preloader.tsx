'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Disable scroll on boot
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    const duration = 1600; // 1.6s loading transition

    const update = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(elapsed / duration, 1);
      const currentProgress = Math.round(pct * 100);
      
      setProgress(currentProgress);

      if (pct < 1) {
        requestAnimationFrame(update);
      } else {
        setComplete(true);
        const timer = setTimeout(() => {
          setVisible(false);
          document.body.style.overflow = '';
        }, 900); // Allow exit curtain transition to finish
        return () => clearTimeout(timer);
      }
    };

    const rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.overflow = '';
    };
  }, []);

  if (!visible) return null;

  const characters = ['C', 'o', 'd', 'n', 'e', 'x', 'a'];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
    exit: {
      y: -60,
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  const charVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as const },
    },
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ translateY: 0 }}
          animate={{ translateY: complete ? '-100%' : '0%' }}
          transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#070707',
            zIndex: 9999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            pointerEvents: 'none',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            {/* Logo character animation */}
            <motion.h2
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 6vw, 3.8rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                margin: 0,
                display: 'flex',
                alignItems: 'baseline',
              }}
            >
              {characters.map((char, index) => (
                <motion.span key={index} variants={charVariants}>
                  {char}
                </motion.span>
              ))}
              <motion.span
                variants={charVariants}
                style={{ color: 'var(--accent)', fontWeight: 700 }}
              >
                .
              </motion.span>
            </motion.h2>

            {/* Elegant 1px progress track */}
            <div style={{ width: 80, height: 1, backgroundColor: 'rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
              <motion.div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  backgroundColor: 'var(--accent)',
                  transition: 'width 0.1s linear',
                }}
              />
            </div>

            {/* Tiny progress count */}
            <span style={{ fontSize: '0.68rem', fontFamily: 'monospace', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.25)', marginTop: -4 }}>
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface Props {
  text: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  mode?: 'words' | 'chars';
}

export default function SplitText({ text, delay = 0, className = '', style, mode = 'words' }: Props) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const items = mode === 'words' ? text.split(' ') : text.split('');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: mode === 'words' ? 0.05 : 0.02,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { y: '100%' },
    visible: {
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as const },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        lineHeight: '1.2',
        ...style,
      }}
      variants={containerVariants}
      initial="hidden"
      animate={isIntersecting ? 'visible' : 'hidden'}
    >
      {items.map((item, idx) => (
        <span
          key={idx}
          style={{
            overflow: 'hidden',
            display: 'inline-block',
            paddingRight: mode === 'words' ? '0.22em' : '0',
            verticalAlign: 'bottom',
          }}
        >
          <motion.span
            variants={itemVariants}
            style={{ display: 'inline-block' }}
          >
            {item === ' ' ? '\u00A0' : item}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
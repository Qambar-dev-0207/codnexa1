'use client';

import { useEffect, useState, useRef } from 'react';

interface Props {
  text: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function DecryptedText({ text, delay = 0, className = '', style }: Props) {
  const [displayText, setDisplayText] = useState('');
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:"<>?`-=[]\\;' + '·';

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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isIntersecting) return;

    let isCancelled = false;
    const duration = 1200; // Total animation length in ms
    const framesPerChar = 3; 
    let currentIteration = 0;
    const totalIterations = text.length * framesPerChar;

    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (isCancelled) {
          clearInterval(interval);
          return;
        }

        const nextText = text
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '\n' || char === '<' || char === '>') return char;

            // If the iteration has passed this character's block, lock it
            const charProgress = index * framesPerChar;
            if (currentIteration >= charProgress + framesPerChar) {
              return char;
            }

            // If it's currently scrambling this character, return random character
            if (currentIteration >= charProgress) {
              return chars[Math.floor(Math.random() * chars.length)];
            }

            // Otherwise, keep it empty or return original space/char
            return '';
          })
          .join('');

        setDisplayText(nextText);
        currentIteration++;

        if (currentIteration >= totalIterations) {
          setDisplayText(text);
          clearInterval(interval);
        }
      }, 30);

      return () => {
        clearInterval(interval);
      };
    }, delay);

    return () => {
      isCancelled = true;
      clearTimeout(startTimer);
    };
  }, [isIntersecting, text, delay]);

  return (
    <span ref={containerRef} className={className} style={style}>
      {displayText || text}
    </span>
  );
}
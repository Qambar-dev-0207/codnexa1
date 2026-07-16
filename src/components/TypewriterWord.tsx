'use client';

import { useEffect, useState } from 'react';

interface Props {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export default function TypewriterWord({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 1800,
}: Props) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      // Deleting state
      timer = setTimeout(() => {
        setCurrentText(prev => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      // Typing state
      timer = setTimeout(() => {
        setCurrentText(prev => word.slice(0, prev.length + 1));
      }, typingSpeed);
    }

    // Handlers for state changes
    if (!isDeleting && currentText === word) {
      // Finished typing, pause then delete
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && currentText === '') {
      // Finished deleting, move to next word
      setIsDeleting(false);
      setCurrentWordIndex(prev => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ color: 'var(--accent)' }}>{currentText}</span>
      <span
        style={{
          display: 'inline-block',
          width: '2px',
          height: '0.85em',
          backgroundColor: 'var(--accent)',
          marginLeft: '4px',
          verticalAlign: 'middle',
          animation: 'blink 0.8s infinite step-start',
        }}
      />
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
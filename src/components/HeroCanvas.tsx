'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from './ThemeProvider';

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const maxParticles = window.innerWidth < 768 ? 35 : 90;
    const maxDistance = 110;

    const handleResize = () => {
      width = (canvas.width = window.innerWidth);
      height = (canvas.height = window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      colorType: 'orange' | 'grey';

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.22;
        this.vy = (Math.random() - 0.5) * 0.22;
        this.radius = Math.random() * 2 + 1;
        this.colorType = Math.random() > 0.85 ? 'orange' : 'grey';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }

      draw(canvasTheme: string) {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        if (this.colorType === 'orange') {
          // Orange is brighter in dark theme, slightly deeper in light theme
          ctx!.fillStyle = canvasTheme === 'dark' ? 'rgba(230, 58, 15, 0.6)' : 'rgba(216, 43, 0, 0.55)';
        } else {
          // Grey particles
          ctx!.fillStyle = canvasTheme === 'dark' ? 'rgba(142, 142, 147, 0.18)' : 'rgba(100, 100, 110, 0.12)';
        }
        ctx!.fill();
      }
    }

    // Populate particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw(theme);
      });

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            const alpha = (1 - dist / maxDistance) * 0.15;
            
            if (p1.colorType === 'orange' || p2.colorType === 'orange') {
              ctx.strokeStyle = theme === 'dark' 
                ? `rgba(230, 58, 15, ${alpha})` 
                : `rgba(216, 43, 0, ${alpha})`;
            } else {
              ctx.strokeStyle = theme === 'dark' 
                ? `rgba(142, 142, 147, ${alpha})` 
                : `rgba(100, 100, 110, ${alpha * 0.8})`;
            }

            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-1 opacity-[0.35] transition-opacity duration-300"
    />
  );
}

import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  color: string;
}

const MouseTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Disable on mobile/touch devices
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768) {
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (x: number, y: number) => {
      const size = Math.random() * 2.5 + 1.5; // Slightly varied size
      const speedX = Math.random() * 0.5 - 0.25; // Slower drift
      const speedY = Math.random() * 0.5 - 0.25; 
      // Choose color based on theme
      const color = theme === 'dark' 
        ? `rgba(88, 166, 255, ${Math.random() * 0.5 + 0.5})` 
        : `rgba(9, 105, 218, ${Math.random() * 0.5 + 0.5})`;
      
      particles.current.push({
        x,
        y,
        size,
        speedX,
        speedY,
        life: 1.2, // Start with full life
        color
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Create more particles for a denser trail
      for (let i = 0; i < 2; i++) {
        createParticle(e.x, e.y);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= 0.008; // Much slower fade out (was 0.02)
        p.size -= 0.01; // Slowly shrink

        if (p.life <= 0 || p.size <= 0) {
          particles.current.splice(i, 1);
          i--;
          continue;
        }

        // Parse rgba to update alpha
        const colorBase = p.color.substring(0, p.color.lastIndexOf(','));
        const alpha = parseFloat(p.color.split(',')[3]) * p.life;
        
        ctx.fillStyle = `${colorBase}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 200000, // Ensure above Lightbox (99999)
      }}
    />
  );
};

export default MouseTrail;

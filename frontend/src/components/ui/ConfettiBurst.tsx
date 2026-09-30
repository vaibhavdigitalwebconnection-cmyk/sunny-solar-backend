import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  shape: 'circle' | 'square' | 'rect';
  delay: number;
  duration: number;
}

const COLORS = [
  '#2B3CB8', // Solar Blue
  '#6F8EE7', // Light Solar Blue
  '#F59E0B', // Sun Amber
  '#FBBF24', // Sun Gold
  '#10B981', // Clean Emerald
  '#34D399', // Mint Green
  '#0C123E', // Deep Slate
];

// Simple deterministic pseudo-random generator
function pseudoRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export const ConfettiBurst: React.FC<{ count?: number; className?: string }> = ({
  count = 45,
  className = '',
}) => {
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const r1 = pseudoRandom(i * 1.1);
      const r2 = pseudoRandom(i * 2.3);
      const r3 = pseudoRandom(i * 3.7);
      const r4 = pseudoRandom(i * 4.9);
      const r5 = pseudoRandom(i * 5.5);

      const angle = (Math.PI * 2 * i) / count + (r1 - 0.5) * 0.4;
      const distance = 80 + r2 * 220;
      const shapes: ('circle' | 'square' | 'rect')[] = ['circle', 'square', 'rect'];

      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 40,
        rotation: r3 * 720 - 360,
        scale: 0.5 + r4 * 0.9,
        color: COLORS[Math.floor(r5 * COLORS.length)],
        shape: shapes[Math.floor(r1 * shapes.length)],
        delay: r2 * 0.15,
        duration: 0.9 + r3 * 0.7,
      };
    });
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-hidden ${className}`}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
            scale: 0,
            rotate: 0,
          }}
          animate={{
            x: p.x,
            y: [0, p.y * 0.6, p.y + 60],
            opacity: [1, 1, 0],
            scale: [0, p.scale, p.scale * 0.7],
            rotate: p.rotation,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: 'absolute',
            backgroundColor: p.color,
            width: p.shape === 'rect' ? 12 : p.shape === 'square' ? 8 : 7,
            height: p.shape === 'rect' ? 6 : p.shape === 'square' ? 8 : 7,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiBurst;

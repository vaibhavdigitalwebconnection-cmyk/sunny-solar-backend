import React, { useId } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface SolarStageAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  activeCategoryIndex?: number;
  className?: string;
}

// Category-tuned color palettes for the live solar stage
const categoryThemes = [
  {
    // Solar Arrays (High-Efficiency Monocrystalline Silicon)
    corePrimary: '#2B3CB8',
    coreSecondary: '#6F8EE7',
    glowColor: 'rgba(43, 60, 184, 0.18)',
    accentColor: '#38BDF8',
    wave1: 'rgba(43, 60, 184, 0.22)',
    wave2: 'rgba(111, 142, 231, 0.28)',
  },
  {
    // Battery Storage (Lithium Clean Storage & Inverter Reserve)
    corePrimary: '#0284C7',
    coreSecondary: '#2B3CB8',
    glowColor: 'rgba(2, 132, 199, 0.2)',
    accentColor: '#38BDF8',
    wave1: 'rgba(2, 132, 199, 0.25)',
    wave2: 'rgba(43, 60, 184, 0.2)',
  },
  {
    // Master Electricians (Precision High-Voltage Engineering)
    corePrimary: '#EF680C',
    coreSecondary: '#F59E0B',
    glowColor: 'rgba(239, 104, 12, 0.18)',
    accentColor: '#FBBF24',
    wave1: 'rgba(239, 104, 12, 0.24)',
    wave2: 'rgba(245, 158, 11, 0.22)',
  },
  {
    // Smart Inverters (Solar-to-AC Telemetry & Dual-Flux Conversion)
    corePrimary: '#2B3CB8',
    coreSecondary: '#EF680C',
    glowColor: 'rgba(239, 104, 12, 0.16)',
    accentColor: '#FFA000',
    wave1: 'rgba(43, 60, 184, 0.2)',
    wave2: 'rgba(239, 104, 12, 0.22)',
  },
];

export const SolarStageAnimation: React.FC<SolarStageAnimationProps> = ({
  activeCategoryIndex = 0,
  className,
  ...props
}) => {
  const theme = categoryThemes[activeCategoryIndex % categoryThemes.length] || categoryThemes[0];
  const uniqueId = useId().replace(/:/g, '');

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 size-full overflow-hidden select-none z-0',
        className
      )}
      {...props}
    >
      {/* ── 1. Breathing Solar Core Energy Radiance (Centered behind headings) ── */}
      <AnimatePresence mode="wait">
        <m.div
          key={`core-${activeCategoryIndex}`}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{
            opacity: [0.5, 0.85, 0.5],
            scale: [0.95, 1.1, 0.95],
          }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{
            opacity: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-140 sm:w-180 md:w-210 h-75 sm:h-95 md:h-110 rounded-full blur-[90px] sm:blur-[115px]"
          style={{
            background: `radial-gradient(ellipse at center, ${theme.glowColor} 0%, rgba(239, 104, 12, 0.08) 45%, transparent 75%)`,
          }}
        />
      </AnimatePresence>

      {/* Auxiliary Floating Ambient Solar Flare Blooms */}
      {/* Left Bloom (Array Feed Flare) */}
      <m.div
        animate={{
          x: [-15, 15, -15],
          y: [-10, 10, -10],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-12 left-1/12 w-80 h-80 rounded-full bg-linear-to-br from-[#2B3CB8]/14 to-transparent blur-[85px]"
      />
      {/* Right Bloom (Inverter/Battery Amber Flare) */}
      <m.div
        animate={{
          x: [15, -15, 15],
          y: [10, -10, 10],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-16 right-1/12 w-85 h-85 rounded-full bg-linear-to-tl from-[#EF680C]/15 to-transparent blur-[90px]"
      />

      {/* ── 2. Rotating Celestial Solar Azimuth & Elevation Compass Geometry ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-130 sm:w-165 h-130 sm:h-165 opacity-40">
        {/* Outer Continuous Rotating Solar Compass Dial */}
        <m.svg
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          viewBox="0 0 400 400"
          className="size-full stroke-[#2B3CB8]/25"
          fill="none"
        >
          {/* Main Geodetic Celestial Solar Ring */}
          <circle cx="200" cy="200" r="185" strokeWidth="1" strokeDasharray="6 4" />
          <circle cx="200" cy="200" r="145" strokeWidth="0.8" stroke="rgba(43, 60, 184, 0.18)" />

          {/* 12 Solar Azimuth Hour Rays / Caliper Radials */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 200 + 175 * Math.cos(angle);
            const y1 = 200 + 175 * Math.sin(angle);
            const x2 = 200 + 185 * Math.cos(angle);
            const y2 = 200 + 185 * Math.sin(angle);
            return (
              <line
                key={`azimuth-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                strokeWidth={i % 3 === 0 ? '1.5' : '1'}
                stroke={i % 3 === 0 ? '#2B3CB8' : 'rgba(43, 60, 184, 0.35)'}
              />
            );
          })}

          {/* 4 Cardinal Crosshairs */}
          <line x1="200" y1="5" x2="200" y2="25" strokeWidth="1.6" stroke="#2B3CB8" />
          <line x1="200" y1="375" x2="200" y2="395" strokeWidth="1.6" stroke="#2B3CB8" />
          <line x1="5" y1="200" x2="25" y2="200" strokeWidth="1.6" stroke="#2B3CB8" />
          <line x1="375" y1="200" x2="395" y2="200" strokeWidth="1.6" stroke="#2B3CB8" />
        </m.svg>

        {/* Counter-rotating Inner Solar Angle Wafer Ring */}
        <m.svg
          animate={{ rotate: -360 }}
          transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
          viewBox="0 0 300 300"
          className="absolute inset-0 size-full stroke-[#EF680C]/20"
          fill="none"
        >
          {/* Inner 25° Tilt Vector Arc */}
          <path
            d="M 150 35 A 115 115 0 0 1 265 150"
            strokeWidth="1.2"
            stroke="#EF680C"
            strokeDasharray="4 3"
          />
          <path
            d="M 150 265 A 115 115 0 0 1 35 150"
            strokeWidth="1.2"
            stroke="#2B3CB8"
            strokeDasharray="4 3"
          />
        </m.svg>
      </div>

      {/* ── 3. Smooth Harmonic Photovoltaic Pure Sine Energy Waveforms ── */}
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id={`stageWaveGrad1-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2B3CB8" stopOpacity="0" />
            <stop offset="30%" stopColor="#2B3CB8" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#6F8EE7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2B3CB8" stopOpacity="0" />
          </linearGradient>

          <linearGradient id={`stageWaveGrad2-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF680C" stopOpacity="0" />
            <stop offset="40%" stopColor="#EF680C" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#FFA000" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#EF680C" stopOpacity="0" />
          </linearGradient>

          {/* Traveling Light Conduit Gradient */}
          <m.linearGradient
            id={`stageBeamGrad1-${uniqueId}`}
            gradientUnits="userSpaceOnUse"
            initial={{ x1: '-25%', x2: '0%', y1: '0%', y2: '0%' }}
            animate={{ x1: ['-25%', '125%'], x2: ['0%', '150%'] }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: [0.16, 1, 0.3, 1],
              repeatDelay: 0.6,
            }}
          >
            <stop offset="0%" stopColor="#2B3CB8" stopOpacity="0" />
            <stop offset="45%" stopColor="#2B3CB8" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#6F8EE7" stopOpacity="1" />
            <stop offset="100%" stopColor="#A4B9F1" stopOpacity="0" />
          </m.linearGradient>

          <m.linearGradient
            id={`stageBeamGrad2-${uniqueId}`}
            gradientUnits="userSpaceOnUse"
            initial={{ x1: '125%', x2: '150%', y1: '0%', y2: '0%' }}
            animate={{ x1: ['125%', '-25%'], x2: ['150%', '0%'] }}
            transition={{
              duration: 5.4,
              repeat: Infinity,
              ease: [0.16, 1, 0.3, 1],
              delay: 1.2,
              repeatDelay: 0.8,
            }}
          >
            <stop offset="0%" stopColor="#EF680C" stopOpacity="0" />
            <stop offset="45%" stopColor="#EF680C" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#FFA000" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFE082" stopOpacity="0" />
          </m.linearGradient>
        </defs>

        {/* Live Photovoltaic Sine Wave 1 (Upper Energy Stream) */}
        <m.path
          d="M -100 240 Q 200 170 500 240 T 1100 240 T 1500 240"
          stroke={`url(#stageWaveGrad1-${uniqueId})`}
          strokeWidth="2"
          fill="none"
          animate={{
            d: [
              'M -100 240 Q 200 170 500 240 T 1100 240 T 1500 240',
              'M -100 240 Q 200 310 500 240 T 1100 240 T 1500 240',
              'M -100 240 Q 200 170 500 240 T 1100 240 T 1500 240',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Live Photovoltaic Sine Wave 2 (Lower Solar Frequency Wave) */}
        <m.path
          d="M -100 360 Q 250 420 600 360 T 1200 360 T 1600 360"
          stroke={`url(#stageWaveGrad2-${uniqueId})`}
          strokeWidth="1.8"
          fill="none"
          animate={{
            d: [
              'M -100 360 Q 250 420 600 360 T 1200 360 T 1600 360',
              'M -100 360 Q 250 300 600 360 T 1200 360 T 1600 360',
              'M -100 360 Q 250 420 600 360 T 1200 360 T 1600 360',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />

        {/* ── 4. High-Speed Energy Pulse Lines (Connecting Left Panels to Right Stage) ── */}
        {/* Upper Circuit Path & Light Surge */}
        <path
          d="M 0 160 L 320 160 L 460 210 L 740 210 L 880 160 L 1200 160"
          stroke="rgba(43, 60, 184, 0.08)"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M 0 160 L 320 160 L 460 210 L 740 210 L 880 160 L 1200 160"
          stroke={`url(#stageBeamGrad1-${uniqueId})`}
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Lower Circuit Path & Light Surge */}
        <path
          d="M 1200 440 L 880 440 L 740 390 L 460 390 L 320 440 L 0 440"
          stroke="rgba(239, 104, 12, 0.08)"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M 1200 440 L 880 440 L 740 390 L 460 390 L 320 440 L 0 440"
          stroke={`url(#stageBeamGrad2-${uniqueId})`}
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* ── 5. Photovoltaic Anti-Reflective Optical Glass Light Shimmer ── */}
      <m.div
        animate={{
          x: ['-120%', '220%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: 'easeInOut',
          repeatDelay: 3.5,
        }}
        className="absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-white/40 to-transparent skew-x-15 pointer-events-none"
      />
    </div>
  );
};

export default SolarStageAnimation;

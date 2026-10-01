import React, { useId } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface SolarCircuitPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  activeCategoryIndex?: number;
}

/**
 * SolarCircuitPattern:
 * A bespoke, high-precision clean energy engineering background.
 * 
 * STRICT CONSTRAINTS:
 * - NO DOTS or dotted patterns whatsoever.
 * - Solid CAD vector lines, chamfered monocrystalline silicon wafers, and precision crosshairs.
 * - Magic UI-inspired traveling linear light beams along real-world solar electrical paths
 *   (DC string arrays, smart inverters, battery storage feeds, and electrician conduits).
 * - Reacts dynamically to the active category (Solar Arrays, Battery, Electricians, Inverters).
 */
export const SolarCircuitPattern: React.FC<SolarCircuitPatternProps> = ({
  className,
  activeCategoryIndex = 0,
  ...props
}) => {
  const patternId = useId();
  const beam1Id = useId();
  const beam2Id = useId();
  const beam3Id = useId();
  const beam4Id = useId();
  const rayGradientId = useId();

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 size-full overflow-hidden select-none',
        className
      )}
      {...props}
    >
      {/* â”€â”€ 1. Monocrystalline Silicon Wafer Array (Solid Chamfered Wafer Geometry - NO DOTS) â”€â”€ */}
      <svg
        className="absolute inset-0 size-full mask-[radial-gradient(ellipse_90%_80%_at_50%_50%,#000_35%,transparent_95%)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Authentic Monocrystalline PV Wafer Cell with Chamfered Corners and 4 Busbars */}
          <pattern
            id={patternId}
            width="96"
            height="96"
            patternUnits="userSpaceOnUse"
          >
            {/* Chamfered Octagonal Solar Wafer Cell Outline */}
            <path
              d="M 14 0 L 82 0 L 96 14 L 96 82 L 82 96 L 14 96 L 0 82 L 0 14 Z"
              fill="rgba(43, 60, 184, 0.015)"
              stroke="rgba(43, 60, 184, 0.11)"
              strokeWidth="1"
            />

            {/* 4 Conductive Silver Multi-Busbars (Solid continuous lines - NO dashes or dots) */}
            <line x1="24" y1="0" x2="24" y2="96" stroke="rgba(43, 60, 184, 0.08)" strokeWidth="0.8" />
            <line x1="42" y1="0" x2="42" y2="96" stroke="rgba(43, 60, 184, 0.12)" strokeWidth="1" />
            <line x1="54" y1="0" x2="54" y2="96" stroke="rgba(43, 60, 184, 0.12)" strokeWidth="1" />
            <line x1="72" y1="0" x2="72" y2="96" stroke="rgba(43, 60, 184, 0.08)" strokeWidth="0.8" />

            {/* Micro-conductive fingers spanning the cell */}
            <line x1="0" y1="32" x2="96" y2="32" stroke="rgba(15, 23, 42, 0.04)" strokeWidth="0.5" />
            <line x1="0" y1="64" x2="96" y2="64" stroke="rgba(15, 23, 42, 0.04)" strokeWidth="0.5" />

            {/* Inter-wafer alignment crosshair at cell intersection */}
            <line x1="93" y1="96" x2="99" y2="96" stroke="rgba(43, 60, 184, 0.2)" strokeWidth="0.75" />
            <line x1="96" y1="93" x2="96" y2="99" stroke="rgba(43, 60, 184, 0.2)" strokeWidth="0.75" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {/* â”€â”€ 2. Traveling Clean Energy Conduits (Magic UI Light Beams along Electrical Traces) â”€â”€ */}
      <svg
        className="absolute inset-0 size-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Beam 1: Solar Arrays DC String Feed (Cobalt Blue Surge) */}
          <motion.linearGradient
            id={beam1Id}
            gradientUnits="userSpaceOnUse"
            initial={{ x1: '-25%', x2: '0%', y1: '0%', y2: '0%' }}
            animate={{ x1: ['-25%', '125%'], x2: ['0%', '150%'] }}
            transition={{
              duration: 5.2,
              repeat: Infinity,
              ease: [0.16, 1, 0.3, 1],
              repeatDelay: 0.6,
            }}
          >
            <stop offset="0%" stopColor="#2B3CB8" stopOpacity="0" />
            <stop offset="35%" stopColor="#2B3CB8" stopOpacity="0.8" />
            <stop offset="65%" stopColor="#6F8EE7" stopOpacity="1" />
            <stop offset="100%" stopColor="#A4B9F1" stopOpacity="0" />
          </motion.linearGradient>

          {/* Beam 2: Smart Inverter DC/AC Telemetry (Solar Amber Pulse) */}
          <motion.linearGradient
            id={beam2Id}
            gradientUnits="userSpaceOnUse"
            initial={{ x1: '-30%', x2: '-10%', y1: '0%', y2: '0%' }}
            animate={{ x1: ['-30%', '130%'], x2: ['-10%', '150%'] }}
            transition={{
              duration: 5.8,
              repeat: Infinity,
              ease: [0.16, 1, 0.3, 1],
              delay: 1.4,
              repeatDelay: 0.9,
            }}
          >
            <stop offset="0%" stopColor="#EF680C" stopOpacity="0" />
            <stop offset="40%" stopColor="#EF680C" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#FFA000" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFD54F" stopOpacity="0" />
          </motion.linearGradient>

          {/* Beam 3: Battery Storage Reverse Charge Flow */}
          <motion.linearGradient
            id={beam3Id}
            gradientUnits="userSpaceOnUse"
            initial={{ x1: '125%', x2: '145%', y1: '0%', y2: '0%' }}
            animate={{ x1: ['125%', '-25%'], x2: ['145%', '0%'] }}
            transition={{
              duration: 6.6,
              repeat: Infinity,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.4,
              repeatDelay: 1.2,
            }}
          >
            <stop offset="0%" stopColor="#2B3CB8" stopOpacity="0" />
            <stop offset="50%" stopColor="#6F8EE7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2B3CB8" stopOpacity="0" />
          </motion.linearGradient>

          {/* Beam 4: Master Electrician Submain Conduit */}
          <motion.linearGradient
            id={beam4Id}
            gradientUnits="userSpaceOnUse"
            initial={{ x1: '-20%', x2: '0%', y1: '0%', y2: '0%' }}
            animate={{ x1: ['-20%', '120%'], x2: ['0%', '140%'] }}
            transition={{
              duration: 7.4,
              repeat: Infinity,
              ease: [0.16, 1, 0.3, 1],
              delay: 2.2,
              repeatDelay: 1,
            }}
          >
            <stop offset="0%" stopColor="#1E293B" stopOpacity="0" />
            <stop offset="45%" stopColor="#2B3CB8" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#EF680C" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2B3CB8" stopOpacity="0" />
          </motion.linearGradient>

          {/* Angled Sun Ray Sweep Gradient */}
          <linearGradient id={rayGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2B3CB8" stopOpacity="0.04" />
            <stop offset="50%" stopColor="#EF680C" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#2B3CB8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* â”€â”€ Solar Circuit Conduit 1: Upper DC String Feed â”€â”€ */}
        <path
          d="M -40 140 L 340 140 L 480 260 L 960 260 L 1100 400 L 1480 400"
          stroke={activeCategoryIndex === 0 ? 'rgba(43, 60, 184, 0.28)' : 'rgba(43, 60, 184, 0.12)'}
          strokeWidth={activeCategoryIndex === 0 ? '2' : '1.5'}
          fill="none"
          className="transition-colors duration-500"
        />
        <path
          d="M -40 140 L 340 140 L 480 260 L 960 260 L 1100 400 L 1480 400"
          stroke={`url(#${beam1Id})`}
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
        />

        {/* â”€â”€ Solar Circuit Conduit 2: Smart Inverter Telemetry Path â”€â”€ */}
        <path
          d="M 1480 190 L 1160 190 L 1030 320 L 490 320 L 370 460 L -40 460"
          stroke={activeCategoryIndex === 3 ? 'rgba(239, 104, 12, 0.35)' : 'rgba(239, 104, 12, 0.12)'}
          strokeWidth={activeCategoryIndex === 3 ? '2' : '1.5'}
          fill="none"
          className="transition-colors duration-500"
        />
        <path
          d="M 1480 190 L 1160 190 L 1030 320 L 490 320 L 370 460 L -40 460"
          stroke={`url(#${beam2Id})`}
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
        />

        {/* â”€â”€ Solar Circuit Conduit 3: Battery Storage Lower Backbone â”€â”€ */}
        <path
          d="M -40 690 L 410 690 L 550 570 L 930 570 L 1070 690 L 1480 690"
          stroke={activeCategoryIndex === 1 ? 'rgba(43, 60, 184, 0.3)' : 'rgba(43, 60, 184, 0.11)'}
          strokeWidth={activeCategoryIndex === 1 ? '2' : '1.5'}
          fill="none"
          className="transition-colors duration-500"
        />
        <path
          d="M -40 690 L 410 690 L 550 570 L 930 570 L 1070 690 L 1480 690"
          stroke={`url(#${beam3Id})`}
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
        />

        {/* â”€â”€ Solar Circuit Conduit 4: Master Electricians Vertical Backbone â”€â”€ */}
        <path
          d="M 210 -20 L 210 220 L 720 730 L 1220 730 L 1220 940"
          stroke={activeCategoryIndex === 2 ? 'rgba(43, 60, 184, 0.3)' : 'rgba(43, 60, 184, 0.09)'}
          strokeWidth={activeCategoryIndex === 2 ? '2' : '1.3'}
          fill="none"
          className="transition-colors duration-500"
        />
        <path
          d="M 210 -20 L 210 220 L 720 730 L 1220 730 L 1220 940"
          stroke={`url(#${beam4Id})`}
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />

        {/* â”€â”€ Precision Geometric Junction Terminals (Diamonds & Crosshairs - ZERO DOTS) â”€â”€ */}
        <g strokeWidth="1.2">
          {/* Node 1: Diamond Terminal */}
          <path
            d="M 475 260 L 480 255 L 485 260 L 480 265 Z"
            stroke="rgba(43, 60, 184, 0.5)"
            fill="rgba(43, 60, 184, 0.15)"
          />
          {/* Node 2: Diamond Terminal */}
          <path
            d="M 955 260 L 960 255 L 965 260 L 960 265 Z"
            stroke="rgba(43, 60, 184, 0.5)"
            fill="rgba(43, 60, 184, 0.15)"
          />
          {/* Node 3: Inverter Amber Crosshair */}
          <g stroke="rgba(239, 104, 12, 0.6)" strokeWidth="1.4">
            <line x1="1024" y1="320" x2="1036" y2="320" />
            <line x1="1030" y1="314" x2="1030" y2="326" />
          </g>
          {/* Node 4: Inverter Amber Crosshair */}
          <g stroke="rgba(239, 104, 12, 0.6)" strokeWidth="1.4">
            <line x1="484" y1="320" x2="496" y2="320" />
            <line x1="490" y1="314" x2="490" y2="326" />
          </g>
          {/* Node 5: Battery Storage Diamond */}
          <path
            d="M 545 570 L 550 565 L 555 570 L 550 575 Z"
            stroke="rgba(43, 60, 184, 0.5)"
            fill="rgba(43, 60, 184, 0.2)"
          />
          {/* Node 6: Battery Storage Diamond */}
          <path
            d="M 925 570 L 930 565 L 935 570 L 930 575 Z"
            stroke="rgba(43, 60, 184, 0.5)"
            fill="rgba(43, 60, 184, 0.2)"
          />
        </g>
      </svg>

     


      {/* â”€â”€ 4. Solar Glass Anti-Reflective Reflection Sweep â”€â”€ */}
      <motion.div
        animate={{
          x: ['-120%', '220%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: 'easeInOut',
          repeatDelay: 5,
        }}
        className="absolute inset-y-0 w-2/5 bg-linear-to-r from-transparent via-[#2B3CB8]/5 to-transparent skew-x-12 pointer-events-none"
      />
    </div>
  );
};

export default SolarCircuitPattern;

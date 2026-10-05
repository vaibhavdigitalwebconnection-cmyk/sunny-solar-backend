import React, { useState } from 'react';
import { m } from 'framer-motion';
import { Sun, BatteryCharging, Wrench, Zap, Sparkles, type LucideIcon } from 'lucide-react';
import { ImageScatter, ScatterSet } from '@/components/ui/ImageScatter';
import { SolarCircuitPattern } from '@/components/ui/SolarCircuitPattern';
import { BorderBeam } from '@/components/ui/BorderBeam';
import { SolarStageAnimation } from '@/components/ui/SolarStageAnimation';

interface SolarCategory {
  label: string;
  icon: LucideIcon;
  data: ScatterSet;
}

// Keeping each pill paired with its six-image set prevents the labels and galleries
// from drifting out of sync as this section evolves.
const solarCategories: SolarCategory[] = [
  {
    label: 'Solar Arrays',
    icon: Sun,
    data: {
      tag: 'TIER-1 MONOCRYSTALLINE ARRAYS',
      heading: 'Power Your Home With High-Efficiency Solar',
      subtitle:
        'Engineered with anti-reflective glass and multi-busbar silicon to harvest maximum clean energy even during overcast mornings.',
      images: [
        '/images/home/solar-scatter/solar-arrays-01.webp',
        '/images/home/solar-scatter/solar-arrays-02.webp',
        '/images/home/solar-scatter/solar-arrays-03.webp',
        '/images/home/solar-scatter/solar-arrays-04.webp',
        '/images/home/solar-scatter/solar-arrays-05.webp',
        '/images/home/solar-scatter/solar-arrays-06.webp',
      ],
    },
  },
  {
    label: 'Battery Storage',
    icon: BatteryCharging,
    data: {
      tag: '24/7 OFF-GRID & BLACKOUT READY',
      heading: 'Store Sunshine For Clean Evening Power',
      subtitle:
        'Power your home through the night and eliminate peak electricity rates with intelligent lithium home battery storage.',
      images: [
        '/images/home/solar-scatter/battery-storage-01.webp',
        '/images/home/solar-scatter/battery-storage-02.webp',
        '/images/home/solar-scatter/battery-storage-03.webp',
        '/images/home/solar-scatter/battery-storage-04.webp',
        '/images/home/solar-scatter/battery-storage-05.webp',
        '/images/home/solar-scatter/battery-storage-06.webp',
      ],
    },
  },
  {
    label: 'Master Electricians',
    icon: Wrench,
    data: {
      tag: 'ZERO SUBCONTRACTORS GUARANTEE',
      heading: 'Precision Craftsmanship By Master Electricians',
      subtitle:
        'Spotless concealed conduit runs, cyclone-rated mounting brackets, and strict adherence to Australian Clean Energy Council codes.',
      images: [
        '/images/home/solar-scatter/master-electricians-01.webp',
        '/images/home/solar-scatter/master-electricians-02.webp',
        '/images/home/solar-scatter/master-electricians-03.webp',
        '/images/home/solar-scatter/master-electricians-04.webp',
        '/images/home/solar-scatter/master-electricians-05.webp',
        '/images/home/solar-scatter/master-electricians-06.webp',
      ],
    },
  },
  {
    label: 'Smart Inverters',
    icon: Zap,
    data: {
      tag: 'INTELLIGENT ENERGY TELEMETRY',
      heading: 'Next-Gen Inverters & Live Smart Monitoring',
      subtitle:
        'Monitor household power generation, export tariffs, and self-consumption in real-time from your smartphone.',
      images: [
        '/images/home/solar-scatter/smart-inverters-01.webp',
        '/images/home/solar-scatter/smart-inverters-02.webp',
        '/images/home/solar-scatter/smart-inverters-03.webp',
        '/images/home/solar-scatter/smart-inverters-04.webp',
        '/images/home/solar-scatter/smart-inverters-05.webp',
        '/images/home/solar-scatter/smart-inverters-06.webp',
      ],
    },
  },

];

const categoryPills = solarCategories.map(({ label, icon }) => ({ label, icon }));
const solarScatterData = solarCategories.map(({ data }) => data);

export const SolarScatterSection: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-linear-to-b from-[#F6F9FD] via-[#ECF2FB] to-[#F6F9FD] border-y border-slate-200/85">
      {/* ── Bespoke Monocrystalline Solar Wafer Circuit & Traveling Energy Beams (Zero Dots) ── */}
      {/* <SolarCircuitPattern activeCategoryIndex={activeCategoryIndex} /> */}
          <SolarStageAnimation activeCategoryIndex={activeCategoryIndex} />

      {/* ── 4. Smooth Floating Solar Atmospheric Light Blooms ── */}
      {/* Top Left: Golden Amber Solar Flare */}
      <m.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -left-20 w-135 h-135 rounded-full bg-linear-to-br from-[#EF680C]/18 via-[#F59E0B]/12 to-transparent blur-[120px] pointer-events-none"
      />

      {/* Bottom Right: Clean Energy Cobalt Blue Bloom */}
      <m.div
        animate={{
          scale: [1, 1.18, 1],
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-28 -right-20 w-145 h-145 rounded-full bg-linear-to-tl from-[#2B3CB8]/18 via-[#6F8EE7]/12 to-transparent blur-[130px] pointer-events-none"
      />

      {/* Center Radiance Spotlight behind the Scatter Stage */}
      <m.div
        animate={{
          scale: [0.95, 1.08, 0.95],
          opacity: [0.4, 0.75, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-212.5 h-130 rounded-full bg-linear-to-r from-[#2B3CB8]/10 via-[#6F8EE7]/10 to-[#EF680C]/8 blur-[100px] pointer-events-none"
      />

      {/* ── 5. Edge Blend Gradient Transitions ── */}
      <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-white/90 via-white/40 to-transparent pointer-events-none z-1" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white/90 via-white/40 to-transparent pointer-events-none z-1" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-7xl mx-auto mb-8 sm:mb-5">
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#2B3CB8] bg-white/95 border border-[#2B3CB8]/30 shadow-xs mb-4 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#EF680C] animate-pulse" />
            <span>SOLAR ENGINEERING & HARDWARE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18181b] tracking-tight font-serif leading-[1.16]">
            Every Component Engineered for <br className="hidden sm:inline" />
            <span className="text-[#2B3CB8]">Maximum Lifetime Yield.</span>
          </h2>

          <p className="mt-3.5 text-sm sm:text-base lg:text-lg text-slate-600 font-medium max-w-5xl mx-auto leading-relaxed">
            From precision rooftop panel orientation to lithium backup integration, explore the engineering behind Australia's highest-rated solar installations.
          </p>

          {/* Interactive Feature Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {categoryPills.map((pill, idx) => {
              const Icon = pill.icon;
              const isActive = activeCategoryIndex === idx;
              return (
                <button
                  key={pill.label}
                  type="button"
                  onClick={() => setActiveCategoryIndex(idx)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-xs ${isActive
                    ? 'bg-[#2B3CB8] text-white shadow-md shadow-[#2B3CB8]/30 border border-[#2B3CB8]'
                    : 'bg-white/90 backdrop-blur-md text-slate-700 border border-slate-200/90 hover:border-[#2B3CB8] hover:text-[#2B3CB8]'
                    }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#2B3CB8]'}`} />
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Image Scatter Animation Canvas with Glassmorphic Stage Frame */}
        <div className="relative w-full  overflow-hidden ">
          {/* Bespoke Live Clean-Energy Solar Stage Animation (Core Aura, Photovoltaic Waves, Celestial Solar Compass, Light Surges) */}

          {/* Magic UI Dual Traveling Border Beams (Solar Cobalt + Solar Amber) */}
          <BorderBeam
            size={280}
            duration={12}
            borderWidth={1.5}
            borderRadius="1.5rem"
            colorFrom="#2B3CB8"
            colorTo="#6F8EE7"
          />
          <BorderBeam
            size={280}
            duration={12}
            delay={6}
            borderWidth={1.5}
            borderRadius="1.5rem"
            colorFrom="#EF680C"
            colorTo="#FFA000"
            reverse
          />

          <ImageScatter
            data={solarScatterData}
            activeSectionIndex={activeCategoryIndex}
            onSectionChange={setActiveCategoryIndex}
            animationDuration={0.8}
            animationOverlap={0.4}
            headingFadeDuration={0.4}
            intervalDuration={4000}
            className="h-140 sm:h-160 lg:h-180"
          />
        </div>
      </div>
    </section>
  );
};

export default SolarScatterSection;

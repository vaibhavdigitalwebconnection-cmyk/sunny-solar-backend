import React, { useState } from 'react';
import { Sun, BatteryCharging, Wrench, ShieldCheck, Zap } from 'lucide-react';
import { ImageScatter, ScatterSet } from '@/components/ui/ImageScatter';

// 5 Curated Solar Datasets showcasing all aspects of Sunny Solar systems
const solarScatterData: ScatterSet[] = [
  {
    tag: 'TIER-1 MONOCRYSTALLINE ARRAYS',
    heading: 'Power Your Home With High-Efficiency Solar',
    subtitle:
      'Engineered with anti-reflective glass and multi-busbar silicon to harvest maximum clean energy even during overcast mornings.',
    images: [
      '/images/projects/project-rooftop-array.webp',
      '/images/projects/solar-cell-detail.jpg',
      '/images/projects/aerial-view-solar.webp',
      '/images/projects/photovoltaik-nk.webp',
      '/images/blog/solar-panel-tech.webp',
      '/images/blog/solar-system-size.webp',
    ],
  },
  {
    tag: '24/7 OFF-GRID & BLACKOUT READY',
    heading: 'Store Sunshine For Clean Evening Power',
    subtitle:
      'Power your home through the night and eliminate peak electricity rates with intelligent lithium home battery storage.',
    images: [
      '/images/projects/project-battery-storage.jpg',
      '/images/solutions/battery-hero.webp',
      '/images/solutions/battery-bundle.webp',
      '/images/solutions/battery-storm.webp',
      '/images/blog/battery-comparison.webp',
      '/images/projects/3phase-gateway.webp',
    ],
  },
  {
    tag: 'ZERO SUBCONTRACTORS GUARANTEE',
    heading: 'Precision Craftsmanship By Master Electricians',
    subtitle:
      'Spotless concealed conduit runs, cyclone-rated mounting brackets, and strict adherence to Australian Clean Energy Council codes.',
    images: [
      '/images/about/gallery/electrician-wiring-switchboard.webp',
      '/images/about/gallery/electrician-carrying-panel.webp',
      '/images/about/gallery/electrician-testing-equipment.webp',
      '/images/about/gallery/rooftop-solar-drill.webp',
      '/images/about/gallery/smiling-solar-electrician.webp',
      '/images/projects/precision-torquing.jpg',
    ],
  },
  {
    tag: 'INTELLIGENT ENERGY TELEMETRY',
    heading: 'Next-Gen Inverters & Live Smart Monitoring',
    subtitle:
      'Monitor household power generation, export tariffs, and self-consumption in real-time from your smartphone.',
    images: [
      '/images/projects/smart-solar-app-telemetry.webp',
      '/images/projects/sunny-boy-inverter.webp',
      '/images/about/gallery/electrician-mounting-inverter.webp',
      '/images/solutions/net-metering.jpg',
      '/images/projects/project-switchboard.jpg',
      '/images/projects/dji-aerial-solar.webp',
    ],
  },
  {
    tag: 'ENGINEERED FOR QUEENSLAND',
    heading: 'Built For Coastal Heat & Severe Weather',
    subtitle:
      'Heavy-duty anodised aluminium framing and corrosion-resistant hardware engineered to endure 25+ years of Gold Coast sunshine.',
    images: [
      '/images/projects/queensland-coastal-solar-home.webp',
      '/images/projects/project-cyclone-clamping.jpg',
      '/images/projects/homestead-overview.jpg',
      '/images/home/parallax-solar-home.webp',
      '/images/projects/ground-framework.webp',
      '/images/about/solar-installation-aerial.webp',
    ],
  },
];

const categoryPills = [
  { label: 'Solar Arrays', icon: Sun },
  { label: 'Battery Storage', icon: BatteryCharging },
  { label: 'Master Electricians', icon: Wrench },
  { label: 'Smart Inverters', icon: Zap },
  { label: 'QLD Weather Rated', icon: ShieldCheck },
];

export const SolarScatterSection: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  return (
    <section className="relative py-8 sm:py-10 lg:py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-6xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight font-serif leading-[1.16]">
            Every Component Engineered for <br className="hidden sm:inline" />
            <span className="text-black">Maximum Lifetime Yield.</span>
          </h2>

          <p className="mt-3.5 text-sm sm:text-base lg:text-lg text-neutral-800 font-medium max-w-5xl mx-auto leading-relaxed">
            From precision rooftop panel orientation to lithium backup integration, explore the engineering behind Queensland’s highest-rated solar installations.
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
                  className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${isActive
                      ? 'bg-[#ED4F11] text-white shadow-sm'
                      : 'bg-white text-black border border-[#ED4F11] hover:border-black'
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Image Scatter Animation Canvas (No background / No border) */}
        <div className="relative w-full overflow-hidden">
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

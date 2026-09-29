import React, { useState } from 'react';
import { Sun, BatteryCharging, Wrench, ShieldCheck, Zap, type LucideIcon } from 'lucide-react';
import { ImageScatter, ScatterSet } from '@/components/ui/ImageScatter';

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
        '/images/home/solar-scatter/solar-arrays-01.png',
        '/images/home/solar-scatter/solar-arrays-02.png',
        '/images/home/solar-scatter/solar-arrays-03.png',
        '/images/home/solar-scatter/solar-arrays-04.png',
        '/images/home/solar-scatter/solar-arrays-05.png',
        '/images/home/solar-scatter/solar-arrays-06.png',
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
        '/images/home/solar-scatter/battery-storage-01.png',
        '/images/home/solar-scatter/battery-storage-02.png',
        '/images/home/solar-scatter/battery-storage-03.png',
        '/images/home/solar-scatter/battery-storage-04.png',
        '/images/home/solar-scatter/battery-storage-05.png',
        '/images/home/solar-scatter/battery-storage-06.png',
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
        '/images/home/solar-scatter/master-electricians-01.png',
        '/images/home/solar-scatter/master-electricians-02.png',
        '/images/home/solar-scatter/master-electricians-03.png',
        '/images/home/solar-scatter/master-electricians-04.png',
        '/images/home/solar-scatter/master-electricians-05.png',
        '/images/home/solar-scatter/master-electricians-06.png',
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
        '/images/home/solar-scatter/smart-inverters-01.png',
        '/images/home/solar-scatter/smart-inverters-02.png',
        '/images/home/solar-scatter/smart-inverters-03.png',
        '/images/home/solar-scatter/smart-inverters-04.png',
        '/images/home/solar-scatter/smart-inverters-05.png',
        '/images/home/solar-scatter/smart-inverters-06.png',
      ],
    },
  },
  {
    label: 'QLD Weather Rated',
    icon: ShieldCheck,
    data: {
      tag: 'ENGINEERED FOR QUEENSLAND',
      heading: 'Built For Coastal Heat & Severe Weather',
      subtitle:
        'Heavy-duty anodised aluminium framing and corrosion-resistant hardware engineered to endure 25+ years of Gold Coast sunshine.',
      images: [
        '/images/home/solar-scatter/qld-weather-rated-01.png',
        '/images/home/solar-scatter/qld-weather-rated-02.png',
        '/images/home/solar-scatter/qld-weather-rated-03.png',
        '/images/home/solar-scatter/qld-weather-rated-04.png',
        '/images/home/solar-scatter/qld-weather-rated-05.png',
        '/images/home/solar-scatter/qld-weather-rated-06.png',
      ],
    },
  },
];

const categoryPills = solarCategories.map(({ label, icon }) => ({ label, icon }));
const solarScatterData = solarCategories.map(({ data }) => data);

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

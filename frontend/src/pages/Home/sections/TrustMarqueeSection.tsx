import React from 'react';
import '../../../styles/running-belt.css';
import {
  Sun,
  BatteryCharging,
  Calculator,
  Scale,
  Home,
  HeartHandshake
} from 'lucide-react';

const trustBeltItems = [
  {
    icon: Sun,
    label: 'PRACTICAL SOLAR ADVICE',
  },
  {
    icon: BatteryCharging,
    label: 'SMART BATTERY GUIDANCE',
  },
  {
    icon: Calculator,
    label: 'UNDERSTAND YOUR ENERGY NUMBERS',
  },
  {
    icon: Scale,
    label: 'COMPARE BEFORE YOU BUY',
  },
  {
    icon: Home,
    label: 'SOLUTIONS BUILT AROUND YOUR HOME',
  },
  {
    icon: HeartHandshake,
    label: 'CLEAR. PRACTICAL. CUSTOMER-FOCUSED.',
  },
];

// Repeat items to ensure seamless loop
const trustBeltRepeated = [
  ...trustBeltItems,
  ...trustBeltItems,
  ...trustBeltItems,
  ...trustBeltItems,
];

export const TrustMarqueeSection: React.FC = () => {
  return (
    <section
      className="w-full bg-[#2B3CB8] py-3.5 sm:py-4 relative overflow-hidden z-20 shadow-lg   group border-t border-b border-[#1D2984]"
      aria-label="Sunny Solar Guarantees and Key Benefits"
    >
      {/* Edge gradient masks for seamless fade  */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 bg-linear-to-r from-[#2B3CB8] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 bg-linear-to-l from-[#2B3CB8] to-transparent z-10" />

      {/* Infinite Marquee Track (Smooth, Calmer Speed) */}
      <div className="flex w-max animate-marquee">
        {/* Track 1 */}
        <div className="flex items-center shrink-0">
          {trustBeltRepeated.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={`belt-track1-${idx}`} className="flex items-center">
                <div className="flex items-center gap-2.5 px-4 sm:px-5 py-1 text-white text-xs sm:text-2xl font-bold tracking-wide ">
                  <Icon className="w-10 h-10 text-white shrink-0" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 mx-2.5 sm:mx-3 shrink-0" />
              </div>
            );
          })}
        </div>

        {/* Track 2 (Clone for seamless infinite loop) */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {trustBeltRepeated.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={`belt-track2-${idx}`} className="flex items-center">
                <div className="flex items-center gap-2.5 px-4 sm:px-5 py-1 text-white text-xs sm:text-2xl font-bold tracking-wide ">
                  <Icon className="w-10 h-10 text-white shrink-0" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 mx-2.5 sm:mx-3 shrink-0" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustMarqueeSection;

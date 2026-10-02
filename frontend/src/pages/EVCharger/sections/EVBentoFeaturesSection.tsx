import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Sliders,
  Zap,
  Smartphone,
  CloudRain,
  ShieldCheck,
  Activity,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Power,
} from 'lucide-react';
import { OrbitingCircles } from '../../../components/ui/OrbitingCircles';
import { Ripple } from '../../../components/ui/Ripple';

interface FeatureItem {
  id: string;
  title: string;
  tag: string;
  icon: React.ElementType;
  color: string;
  bgLight: string;
  description: string;
  statValue: string;
  statLabel: string;
  highlights: string[];
}

const FEATURES: FeatureItem[] = [
  {
    id: 'solar-sync',
    title: 'Solar Surplus Auto-Throttling',
    tag: '100% Free Solar',
    icon: Sun,
    color: '#ED4F11',
    bgLight: 'bg-orange-50',
    description:
      'Rather than exporting daytime solar generation for negligible utility feed-in tariffs, intelligent sensors modulate charging current in real-time (6A to 32A) to match excess rooftop output.',
    statValue: '1-Amp Steps',
    statLabel: 'Real-time modulation',
    highlights: ['Zero grid power draw', 'Auto-pauses during heavy cloud cover', 'Maximizes self-consumption'],
  },
  {
    id: 'load-balance',
    title: 'Dynamic Main Fuse Balancing',
    tag: 'Overload Protection',
    icon: Sliders,
    color: '#2B3CB8',
    bgLight: 'bg-blue-50',
    description:
      'Hardware-grade current clamps continuously measure total home electrical draw. When your ducted air conditioning or induction oven switches on, the charger instantly dials down to prevent circuit trips.',
    statValue: '<40ms',
    statLabel: 'Response time',
    highlights: ['Main switchboard protection', 'Simultaneous appliance freedom', 'Zero blackout risk'],
  },
  {
    id: 'universal-type2',
    title: 'Universal Type 2 Standard',
    tag: 'All EV Models',
    icon: Zap,
    color: '#10B981',
    bgLight: 'bg-emerald-50',
    description:
      'Equipped with the Australian standard IEC 62196 Mennekes connector. Engineered for 100% plug-and-play compatibility across all electric sedans, SUVs, hatchbacks, and future commercial EV utes.',
    statValue: '100%',
    statLabel: 'AU EV compatibility',
    highlights: ['Universal Type 2 socket', 'Tethered or untethered options', 'Built-in DC leakage protection'],
  },
  {
    id: 'smart-app',
    title: 'Mobile Scheduling & Telemetry',
    tag: 'App Control',
    icon: Smartphone,
    color: '#6366F1',
    bgLight: 'bg-indigo-50',
    description:
      'Set automated charging schedules for cheapest midnight off-peak electricity rates, view live and historical kilowatt telemetry, and lock the unit remotely whenever you leave home.',
    statValue: 'Wi-Fi & 4G',
    statLabel: 'Always connected',
    highlights: ['Off-peak automated timers', 'Remote station security lock', 'Real-time charging analytics'],
  },
  {
    id: 'weatherproof',
    title: 'IP65 All-Weather Durability',
    tag: 'Australian Tested',
    icon: CloudRain,
    color: '#0284C7',
    bgLight: 'bg-sky-50',
    description:
      'Tested to endure scorching summer heatwaves, driving tropical storms, and coastal humidity with UV-stabilized impact-resistant casing. Suitable for both indoor garages and exposed driveways.',
    statValue: 'IP65 / IK10',
    statLabel: 'Extreme weather rating',
    highlights: ['-30°C to +55°C operating range', 'UV-stabilized polycarbonate', 'Water & dust sealed'],
  },
 
];

export const EVBentoFeaturesSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<FeatureItem>(FEATURES[0]);

  return (
    <section className="py-8 sm:py-14 bg-white relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-12 sm:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight">
            Intelligent Engineering.{' '}
            <span className="bg-linear-to-r from-[#2B3CB8] via-[#3E52E8] to-[#ED4F11] bg-clip-text text-transparent">
              Zero Headaches.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Explore how smart hardware seamlessly synchronizes rooftop solar, home appliances, and vehicle charging in real time.
          </p>
        </div>

        {/* Non-Box Interactive Ecosystem Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column: Interactive Feature Selector (No Box Cards) */}
          <div className="lg:col-span-6 space-y-2 order-2 lg:order-1">
            {FEATURES.map((item, index) => {
              const isSelected = activeFeature.id === item.id;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveFeature(item)}
                  onMouseEnter={() => setActiveFeature(item)}
                  className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'bg-slate-50/90 shadow-xs'
                      : 'hover:bg-slate-50/50'
                  }`}
                >
                  {/* Left Active Glow Indicator Line */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeFeatureBar"
                      className="absolute left-0 top-3 bottom-3 w-1 rounded-full"
                      style={{ backgroundColor: item.color }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  <div className="flex items-start gap-3.5 pl-2">
                    {/* Animated Icon Avatar */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isSelected ? 'scale-110 shadow-xs' : 'group-hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: isSelected ? `${item.color}15` : '#F1F5F9',
                        color: isSelected ? item.color : '#64748B',
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Feature Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3
                          className={`text-base sm:text-lg font-bold transition-colors ${
                            isSelected ? 'text-slate-950 font-serif' : 'text-slate-700'
                          }`}
                        >
                          {item.title}
                        </h3>
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full transition-colors ${
                            isSelected
                              ? 'bg-slate-900 text-white'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {item.tag}
                        </span>
                      </div>

                      {/* Smooth Expanding Description */}
                      <AnimatePresence initial={false}>
                        {isSelected && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1.5 mb-3">
                              {item.description}
                            </p>

                            {/* Micro Highlights */}
                            <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-200/60">
                              {item.highlights.map((highlight, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-white px-2 py-1 rounded-md border border-slate-200/80 shadow-2xs"
                                >
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Circular Ecosystem with Ripple & Orbiting Satellites */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[440px] order-1 lg:order-2">
            
            {/* Magic UI Ripple expanding wave circles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Ripple
                mainCircleSize={180}
                mainCircleOpacity={0.22}
                numCircles={5}
                circleColor={activeFeature.color}
              />
            </div>

            {/* Orbiting Feature Satellites */}
            <div className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">
              
              {/* Inner Orbit Circle (Radius 100) */}
              <OrbitingCircles radius={100} duration={26} iconSize={40}>
                <div
                  onClick={() => setActiveFeature(FEATURES[0])}
                  className="w-10 h-10 rounded-full bg-white border border-orange-200 shadow-md flex items-center justify-center text-[#ED4F11] cursor-pointer hover:scale-125 transition-transform pointer-events-auto"
                  title="Solar Surplus Sync"
                >
                  <Sun className="w-5 h-5" />
                </div>
                <div
                  onClick={() => setActiveFeature(FEATURES[1])}
                  className="w-10 h-10 rounded-full bg-white border border-blue-200 shadow-md flex items-center justify-center text-[#2B3CB8] cursor-pointer hover:scale-125 transition-transform pointer-events-auto"
                  title="Load Balancing"
                >
                  <Sliders className="w-5 h-5" />
                </div>
                <div
                  onClick={() => setActiveFeature(FEATURES[2])}
                  className="w-10 h-10 rounded-full bg-white border border-emerald-200 shadow-md flex items-center justify-center text-emerald-600 cursor-pointer hover:scale-125 transition-transform pointer-events-auto"
                  title="Universal Type 2"
                >
                  <Zap className="w-5 h-5" />
                </div>
              </OrbitingCircles>

              {/* Outer Orbit Circle (Radius 155, Reverse direction) */}
              <OrbitingCircles radius={155} duration={34} reverse iconSize={40}>
                <div
                  onClick={() => setActiveFeature(FEATURES[3])}
                  className="w-10 h-10 rounded-full bg-white border border-indigo-200 shadow-md flex items-center justify-center text-indigo-600 cursor-pointer hover:scale-125 transition-transform pointer-events-auto"
                  title="Smart App Control"
                >
                  <Smartphone className="w-5 h-5" />
                </div>
                <div
                  onClick={() => setActiveFeature(FEATURES[4])}
                  className="w-10 h-10 rounded-full bg-white border border-sky-200 shadow-md flex items-center justify-center text-sky-600 cursor-pointer hover:scale-125 transition-transform pointer-events-auto"
                  title="IP65 Weatherproof"
                >
                  <CloudRain className="w-5 h-5" />
                </div>
                <div
                  onClick={() => setActiveFeature(FEATURES[5])}
                  className="w-10 h-10 rounded-full bg-white border border-amber-200 shadow-md flex items-center justify-center text-amber-600 cursor-pointer hover:scale-125 transition-transform pointer-events-auto"
                  title="Certified Safety"
                >
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </OrbitingCircles>

              {/* Central Core: Active Focus Hub */}
              <motion.div
                key={activeFeature.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative z-20 w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white border-2 flex flex-col items-center justify-center text-center p-3 shadow-xl"
                style={{ borderColor: activeFeature.color }}
              >
                {/* Center Glowing Status Halo */}
                <motion.div
                  className="absolute -inset-2 rounded-full blur-md opacity-40 pointer-events-none"
                  style={{ backgroundColor: activeFeature.color }}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.5, 0.25] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Active Feature Icon */}
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-1 shadow-xs"
                  style={{ backgroundColor: `${activeFeature.color}15`, color: activeFeature.color }}
                >
                  <activeFeature.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                {/* Active Stat */}
                <div className="text-base sm:text-xl font-black text-slate-900 font-sans tracking-tight">
                  {activeFeature.statValue}
                </div>
                <div className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider line-clamp-1">
                  {activeFeature.statLabel}
                </div>
              </motion.div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default EVBentoFeaturesSection;

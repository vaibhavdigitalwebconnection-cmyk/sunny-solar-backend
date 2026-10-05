import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Sun,
  Cpu,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ShimmerButton } from '@/components/ui/ShimmerButton';
import { BlurFade } from '@/components/ui/BlurFade';
import { NumberTicker } from '@/components/ui/NumberTicker';
import { AnimatedGridPattern } from '@/components/ui/AnimatedGridPattern';
import { LightRays } from '@/components/ui/LightRays';
import { Floating3DParticles } from '@/components/ui/Floating3DParticles';

interface PackageItem {
  id: string;
  name: string;
  shortName: string;
  capacityNum: number;
  bestFor: string;
  dailyYield: string;
  dailyYieldPct: number;
  typicalSavings: string;
  stcDiscount: string;
  popular: boolean;
  panels: string;
  inverter: string;
}

export const SolarLandingPackagesSection: React.FC = () => {
  const navigate = useNavigate();

  const packages: PackageItem[] = [
    {
      id: 'essential-7kw',
      name: 'Essential Home',
      shortName: '7.1kW',
      capacityNum: 7.1,
      bestFor: '2-3 bedroom homes with moderate daytime energy use',
      dailyYield: '26 - 30 kWh/day',
      dailyYieldPct: 45,
      typicalSavings: '$1,900 - $2,550 / yr',
      stcDiscount: 'Up to $2,550 Rebate',
      popular: false,
      panels: '15x 475W Tier-1 Panels',
      inverter: '5.0kW European Inverter',
    },
    {
      id: 'family-11kw',
      name: 'Family High-Yield',
      shortName: '10.9kW',
      capacityNum: 10.9,
      bestFor: 'Ducted A/C, swimming pools & active households',
      dailyYield: '41 - 48 kWh/day',
      dailyYieldPct: 75,
      typicalSavings: '$3,000 - $3,900 / yr',
      stcDiscount: 'Up to $3,450 Rebate',
      popular: true,
      panels: '23x 475W All-Black Panels',
      inverter: '8.2kW Hybrid Smart Inverter',
    },
    {
      id: 'maximum-14kw',
      name: 'Maximum Power',
      shortName: '14.25kW',
      capacityNum: 14.25,
      bestFor: 'Large residences, home businesses & EV owners',
      dailyYield: '56 - 68 kWh/day',
      dailyYieldPct: 100,
      typicalSavings: '$4,100 - $5,600 / yr',
      stcDiscount: 'Max Federal Rebate',
      popular: false,
      panels: '30x 475W REC Pure Panels',
      inverter: '10kW Three-Phase Inverter',
    },
  ];

  const [activeId, setActiveId] = useState<string>('family-11kw');
  const activePkg = packages.find((p) => p.id === activeId) || packages[1];

  return (
    <section className="relative py-12 xs:py-16 sm:py-20 lg:py-14 bg-slate-50/50 overflow-hidden">
      {/* Background Animated Magic UI Pattern, Sunlight Beams & 3D Floating Photons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Magic UI Light Rays: Sunbeams Streaming Down */}
        <LightRays
          count={activePkg.popular ? 8 : 6}
          color={
            activePkg.popular
              ? 'rgba(245, 158, 11, 0.26)'
              : activePkg.id === 'maximum-14kw'
              ? 'rgba(234, 179, 8, 0.3)'
              : 'rgba(245, 158, 11, 0.18)'
          }
          blur={activePkg.popular ? 40 : 34}
          speed={activePkg.popular ? 11 : 14}
          length="80vh"
          className="opacity-75 transition-opacity duration-500"
        />

        {/* Magic UI 3D Perspective Floating Solar Photons */}
        <Floating3DParticles
          quantity={80}
          color={activePkg.popular ? '#F59E0B' : '#3B82F6'}
          size={4.2}
          opacity={0.32}
          drift={0.65}
          depth={0.65}
          className="absolute inset-0"
        />

        {/* Subtle SVG Grid Foundation */}
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.10}
          duration={3.5}
          repeatDelay={0.8}
          className="text-blue-600/20 mask-[radial-gradient(ellipse_at_center,white,transparent_80%)] inset-x-0 inset-y-[-20%] h-[160%] skew-y-3"
        />

        {/* Ambient Responsive Solar Halo */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
            activePkg.popular
              ? 'w-187.5 h-105 bg-radial from-amber-400/20 via-orange-400/10 to-transparent'
              : activePkg.id === 'maximum-14kw'
              ? 'w-205 h-115 bg-radial from-amber-300/22 via-blue-500/10 to-transparent'
              : 'w-170 h-90 bg-radial from-amber-400/14 via-blue-500/5 to-transparent'
          }`}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Minimal & Meaningful */}
        <BlurFade delay={0.08} direction="up" className="flex flex-col items-center mb-8 text-center">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight leading-[1.2] max-w-2xl">
            Choose Your Solar Package
          </h2>

          <p className="mt-2 text-slate-600 text-xs xs:text-sm sm:text-base leading-relaxed max-w-lg font-normal">
            Tier-1 hardware pre-configured with full federal STC rebates and 25-year warranty.
          </p>
        </BlurFade>

        {/* Dynamic Tier Switcher Bar with Fluid Spring Indicator */}
        <BlurFade delay={0.12} direction="up" className="mb-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-slate-200/60 rounded-xl relative backdrop-blur-xs">
            {packages.map((pkg) => {
              const isSelected = pkg.id === activeId;
              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setActiveId(pkg.id)}
                  className="relative py-2.5 px-3 rounded-lg text-center transition-colors duration-200 cursor-pointer select-none"
                >
                  {/* Fluid Spring Background Indicator */}
                  {isSelected && (
                    <m.div
                      layoutId="activeSystemTabPill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      className={`absolute inset-0 rounded-lg ${
                        pkg.popular
                          ? 'bg-slate-950 shadow-md'
                          : 'bg-white shadow-sm'
                      }`}
                    />
                  )}

                  <div className="relative z-10">
                    {pkg.popular && (
                      <span className="absolute -top-4.5 left-1/2 -translate-x-1/2 bg-linear-to-r from-amber-500 to-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.2 rounded-full uppercase tracking-wider shadow-xs whitespace-nowrap flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 fill-slate-950" /> Popular
                      </span>
                    )}
                    <div
                      className={`text-xs sm:text-sm font-mono font-bold transition-colors ${
                        isSelected
                          ? pkg.popular
                            ? 'text-amber-400'
                            : 'text-[#2B3CB8]'
                          : 'text-slate-700'
                      }`}
                    >
                      {pkg.shortName}
                    </div>
                    <div
                      className={`text-[11px] font-medium truncate transition-colors ${
                        isSelected
                          ? pkg.popular
                            ? 'text-slate-300'
                            : 'text-slate-600'
                          : 'text-slate-500'
                      }`}
                    >
                      {pkg.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </BlurFade>

        {/* Dynamic System Presentation (Open Canvas - NO Box, NO Border) */}
        <BlurFade delay={0.16} direction="up">
          <div className="relative overflow-hidden py-4 sm:py-6">
            <AnimatePresence mode="wait">
              <m.div
                key={activePkg.id}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="space-y-6"
              >
                {/* Top Metrics Row: Large Animated Capacity Number + Big Annual Savings */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <NumberTicker
                        key={activePkg.id}
                        value={activePkg.capacityNum}
                        decimalPlaces={1}
                        className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-slate-950 tracking-tight"
                      />
                      <span className="text-xl sm:text-2xl font-bold text-[#2B3CB8]">kW DC</span>
                      {activePkg.popular && (
                        <span className="ml-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300/80">
                          <Sparkles className="w-3 h-3 fill-amber-500 text-amber-500" />
                          #1 Best Seller
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                      {activePkg.bestFor}
                    </p>
                  </div>

                  {/* Savings & Rebate Readout */}
                  <div className="sm:text-right shrink-0">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                      Estimated Annual Savings
                    </span>
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-emerald-600 block">
                      {activePkg.typicalSavings}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {activePkg.stcDiscount} Included
                    </span>
                  </div>
                </div>

                {/* Energy Harvest Meter with Animated Gradient Fill & Pulse */}
                <div className="py-4 border-y border-slate-200/60">
                  <div className="flex items-center justify-between text-xs mb-2 font-medium">
                    <span className="text-slate-700 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
                      Daily Energy Harvest:
                    </span>
                    <span className="font-mono font-bold text-slate-900">
                      {activePkg.dailyYield}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-200/70 rounded-full overflow-hidden">
                    <m.div
                      className="h-full bg-linear-to-r from-amber-400 via-amber-500 to-[#2B3CB8] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${activePkg.dailyYieldPct}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Hardware Specs & Primary Action Strip */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
                  {/* Hardware & Guarantee Badges (No Heavy Borders) */}
                  <div className="flex flex-wrap items-center gap-2">
                    <m.div
                      whileHover={{ y: -1 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 shadow-2xs text-xs text-slate-700"
                    >
                      <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{activePkg.panels}</span>
                    </m.div>

                    <m.div
                      whileHover={{ y: -1 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 shadow-2xs text-xs text-slate-700"
                    >
                      <Cpu className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{activePkg.inverter}</span>
                    </m.div>

                    <m.div
                      whileHover={{ y: -1 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50/90 text-xs text-emerald-800"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-medium">25-Yr Triple Guarantee</span>
                    </m.div>
                  </div>

                  {/* Direct Action Button */}
                  <div className="flex items-center gap-3 shrink-0">
                    {activePkg.popular ? (
                      <ShimmerButton
                        onClick={() => navigate('/get-started/free-assessment')}
                        shimmerColor="#ffffff"
                        shimmerDuration="2.5s"
                        borderRadius="12px"
                        background="linear-gradient(135deg, #F59E0B 0%, #D97706 100%)"
                        className="w-full sm:w-auto text-slate-950 font-bold text-xs sm:text-sm px-5 py-2.5 shadow-md shadow-amber-500/20 hover:shadow-lg cursor-pointer"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <span>Get {activePkg.shortName} Quote</span>
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </ShimmerButton>
                    ) : (
                      <Button
                        to="/get-started/free-assessment"
                        variant="primary"
                        size="md"
                        className="w-full sm:w-auto text-xs sm:text-sm cursor-pointer shadow-sm"
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        Get {activePkg.shortName} Quote
                      </Button>
                    )}

                    <Button
                      to="/solar/systems"
                      variant="outline"
                      size="md"
                      className="hidden sm:inline-flex text-xs text-slate-600 hover:text-slate-950 border-slate-300/80 bg-white/60"
                    >
                      All Systems
                    </Button>
                  </div>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

export default SolarLandingPackagesSection;

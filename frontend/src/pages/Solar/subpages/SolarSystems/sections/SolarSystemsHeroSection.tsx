import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const SolarSystemsHeroSection: React.FC = () => {
  const [activeTab] = useState<'6.6' | '10' | '13.2' | '15+'>('10');

  const capacityDetails = {
    '6.6': {
      label: '7.1 kW Essential',
      output: '26–30 kWh / day',
      savings: '$1,900–$2,550 / yr',
      bestFor: '2-3 Bedroom Homes • Moderate Day Usage',
      panels: '15x 475W N-Type TOPCon Panels',
    },
    '10': {
      label: '10.9 kW Family Choice',
      output: '41–48 kWh / day',
      savings: '$3,000–$3,900 / yr',
      bestFor: 'Ducted Air Conditioning & Swimming Pools',
      panels: '23x 475W All-Black Modules',
      isPopular: true,
    },
    '13.2': {
      label: '14.25 kW Max Single-Phase',
      output: '56–68 kWh / day',
      savings: '$4,100–$5,600 / yr',
      bestFor: 'Large Households, Multi-Split AC & EV Charging',
      panels: '30x 475W REC Alpha Pure-R Panels',
    },
    '15+': {
      label: '16.0 kW+ Three-Phase / Acreage',
      output: '70–92 kWh / day',
      savings: '$5,800–$8,400 / yr',
      bestFor: 'Acreages, Workshops & Heated Pools',
      panels: '34-45x 475W Dual-Glass Bifacial Panels',
    },
  };

  return (
    <section className="relative pt-28 sm:pt-40 pb-16 sm:pb-20 bg-linear-to-b from-[#2B3CB8]/10 via-[#2B3CB8]/5 to-white overflow-hidden border-b border-slate-200/60">
      {/* Ambient background glow discs */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#2B3CB8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-36 left-10 w-80 h-80 bg-[#2B3CB8]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#2B3CB8] bg-[#F5F7FD] border border-[#D1DCF8] shadow-2xs mb-4">
          <span className="w-2 h-2 rounded-full bg-[#2B3CB8] animate-pulse" />
          <span>Tier-1 N-Type Photovoltaics &amp; Inverters</span>
        </div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight leading-[1.12] max-w-4xl mx-auto"
        >
          Engineered Solar Systems{' '} <br />
          <span className="bg-linear-to-r from-[#2B3CB8] via-[#4658D9] to-[#6F8EE7] bg-clip-text text-transparent">
            Built for Peak Yield.
          </span>
        </motion.h1>

        {/* Narrative Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-base sm:text-lg text-slate-900 max-w-6xl mx-auto leading-relaxed"
        >
          Every roof has unique pitch, orientation, and shading. Explore our signature residential kilowatt packages, head-to-head Tier-1 hardware comparisons, and live savings estimates.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            to="/calculators/system-size"
            variant="primary"
            size="lg"
            icon={<Calculator className="w-4 h-4" />}
          >
            Open System Size Calculator
          </Button>
          <Button
            to="/get-started/free-assessment"
            variant="outline"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Get Free 3D Roof Simulation
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default SolarSystemsHeroSection;

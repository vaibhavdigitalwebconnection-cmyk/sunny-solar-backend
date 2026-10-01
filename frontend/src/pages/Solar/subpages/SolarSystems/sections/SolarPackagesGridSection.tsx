import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const SolarPackagesGridSection: React.FC = () => {
  const [selectedPhase] = useState<'single' | 'three'>('single');

  const packages = [
    {
      name: 'Essential Home 6.6kW',
      tagline: 'Ideal for 2-3 bedroom homes with moderate daytime usage',
      capacity: '6.6 kW DC Array • 5.0kW Inverter',
      panels: '15x 440W N-Type TOPCon Dual-Glass Panels',
      inverter:
        selectedPhase === 'single'
          ? '5.0kW Single-Phase Fronius Primo or Sungrow'
          : '5.0kW Three-Phase Fronius Symo Inverter',
      dailyOutput: '24 - 28 kWh / day',
      typicalSavings: '$1,800 - $2,400 / yr',
      bestFor: 'Quarterly power bills of $450 - $700',
      popular: false,
      features: [
        'Tier-1 N-Type TOPCon 22.5%+ efficiency panels',
        '25-year panel product & performance guarantee',
        'Smart consumption monitoring meter included',
        'Eligible for up to $2,400 Federal STC discount',
        'Battery-ready hybrid or AC-coupled architecture',
        '10-year in-house Master Electrician roof warranty',
      ],
    },
    {
      name: 'Family High-Yield 10.0kW',
      tagline: 'Our #1 best-selling setup for ducted air conditioning & pools',
      capacity: '10.0 kW DC Array • 8.2kW Inverter',
      panels: '23x 440W All-Black AIKO Neostar or REC Alpha',
      inverter:
        selectedPhase === 'single'
          ? '8.2kW Fronius Primo with 5kW Export Limiter'
          : '8.2kW / 10kW Three-Phase Fronius Symo / Sungrow Hybrid',
      dailyOutput: '38 - 44 kWh / day',
      typicalSavings: '$2,800 - $3,600 / yr',
      bestFor: 'Quarterly power bills of $700 - $1,300',
      popular: true,
      features: [
        'AIKO Neostar or REC Alpha all-black high-aesthetic panels',
        'Generates huge daytime surplus to power future battery or EV',
        'Smart export management pre-approved with Energex',
        '10-year comprehensive workmanship & roof guarantee',
        'Up to $3,200 instant Federal STC rebate deducted',
        'Direct plug-in compatibility with Tesla Powerwall 3',
      ],
    },
    {
      name: selectedPhase === 'single' ? 'Maximum Single-Phase 13.2kW' : 'Commercial-Grade 15.0kW - 20kW',
      tagline:
        selectedPhase === 'single'
          ? 'Maximum allowable residential solar array on a single-phase supply'
          : 'Ultimate power output for large luxury homes, 3-phase workshops & acreages',
      capacity: selectedPhase === 'single' ? '13.2 kW DC Array • 10kW Dual Inverter' : '15.0 - 20.0 kW DC Array • 15kW 3-Phase',
      panels: selectedPhase === 'single' ? '30x 440W REC Alpha Pure-R Panels' : '34-45x 440W Dual-Glass Bifacial Panels',
      inverter:
        selectedPhase === 'single'
          ? '10kW Dual Single-Phase Inverters with Export Throttling'
          : '15kW / 20kW Fronius Symo Three-Phase Inverter',
      dailyOutput: selectedPhase === 'single' ? '52 - 62 kWh / day' : '65 - 85 kWh / day',
      typicalSavings: selectedPhase === 'single' ? '$3,800 - $5,200 / yr' : '$5,400 - $7,800 / yr',
      bestFor: 'Quarterly power bills of $1,300+, heated pools, EV charging',
      popular: false,
      features: [
        'Multi-string & micro-inverter architecture for multi-pitch roofs',
        'Full compliance with Energex 5kW per phase network limits',
        'Ready for dual Tesla Powerwalls or high-voltage commercial battery',
        'Priority installation scheduling with lead electrical engineer',
        'Commercial-grade Clenergy cyclone mounting hardware',
        'Comprehensive 10-year Master Electrician warranty',
      ],
    },
  ];

  return (
    <section id="packages" className="py-14 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        {/* Phase Toggle */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="text-center max-w-4xl mb-6">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-950">
              Select Your Electrical Supply Phase
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Most standard Nationwide homes have Single-Phase supply. Larger homes, acreages, and properties with heavy ducted air or workshops often have Three-Phase.
            </p>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${pkg.popular
                  ? 'bg-slate-950 text-white shadow-2xl border-2 border-amber-500 scale-100 lg:-translate-y-2'
                  : 'bg-white text-slate-900 border border-slate-200/90 shadow-sm hover:shadow-xl'
                }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-amber-500 w-60 text-slate-950 text-xs font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-md inline-flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    Top Customer Choice
                  </span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold uppercase tracking-wider ${pkg.popular ? 'text-amber-400' : 'text-amber-600'}`}>
                    {pkg.capacity}
                  </span>
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${pkg.popular ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-100 text-slate-600'}`}>
                    {pkg.bestFor}
                  </span>
                </div>

                <h3 className={`text-2xl font-serif font-bold mb-2 ${pkg.popular ? 'text-white' : 'text-slate-950'}`}>
                  {pkg.name}
                </h3>
                <p className={`text-xs leading-relaxed mb-6 ${pkg.popular ? 'text-slate-300' : 'text-slate-600'}`}>
                  {pkg.tagline}
                </p>

                {/* Metrics Box */}
                <div className={`p-4 rounded-2xl mb-6 grid grid-cols-2 gap-3 text-xs ${pkg.popular ? 'bg-slate-900 border border-slate-800' : 'bg-slate-50 border border-slate-200/60'}`}>
                  <div>
                    <div className={pkg.popular ? 'text-slate-400' : 'text-slate-500'}>Est. Annual Savings</div>
                    <div className="font-bold text-emerald-500 text-base mt-0.5">{pkg.typicalSavings}</div>
                  </div>
                  <div>
                    <div className={pkg.popular ? 'text-slate-400' : 'text-slate-500'}>Est. Daily Output</div>
                    <div className={`font-bold text-base mt-0.5 ${pkg.popular ? 'text-amber-400' : 'text-slate-900'}`}>{pkg.dailyOutput}</div>
                  </div>
                </div>

                {/* Hardware Highlights */}
                <div className={`p-3.5 rounded-xl mb-6 text-xs space-y-1.5 ${pkg.popular ? 'bg-slate-900/60 text-slate-300' : 'bg-amber-50/50 text-slate-700'}`}>
                  <div><strong className="text-amber-500">Panels:</strong> {pkg.panels}</div>
                  <div><strong className="text-amber-500">Inverter:</strong> {pkg.inverter}</div>
                </div>

                {/* Features List */}
                <div className="space-y-3 pt-4 border-t border-slate-100/10">
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className={pkg.popular ? 'text-slate-200' : 'text-slate-700'}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100/10">
                <Button
                  to="/get-started/free-assessment"
                  variant={pkg.popular ? 'primary' : 'outline'}
                  size="md"
                  fullWidth
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Request Package Proposal
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Check,
  Zap,
  Cpu,
  CircleDollarSign,
  Smartphone,
  ShieldCheck,
  TrendingUp,
  History,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export const ExistingSolarEvolutionSection: React.FC = () => {

  const comparisonRows = [
    {
      aspect: 'System Size & Capacity',
      icon: Zap,
      legacy: '1.5 kW – 3.0 kW (Small 6 to 12 panel setup)',
      modern: '6.6 kW – 13.2 kW (High-yield multi-facet array)',
      advantage: 'Up to 4x More Daily Energy Harvest',
    },
    {
      aspect: 'Panel Technology',
      icon: Cpu,
      legacy: '200W – 250W Polycrystalline (14%–16% efficiency)',
      modern: '440W+ N-Type TOPCon Dual-Glass (22.8% efficiency)',
      advantage: 'Double generation in the exact same roof footprint',
    },
    {
      aspect: 'Financial Economics',
      icon: CircleDollarSign,
      legacy: 'Relied on 44¢ FIT (now expired down to 3¢–5¢)',
      modern: 'Stores surplus in 10–13.5kWh battery to avoid 45¢ grid rates',
      advantage: 'Slashing quarterly electricity bills by up to 88%',
    },
    {
      aspect: 'App & Live Telemetry',
      icon: Smartphone,
      legacy: 'Obscure 2-line inverter LCD screen with error codes',
      modern: 'Real-time 24/7 smartphone app tracking power in real time',
      advantage: 'Instant alerts if any circuit or panel underperforms',
    },
    {
      aspect: 'Blackout & Storm Defense',
      icon: ShieldCheck,
      legacy: 'Shuts down completely during grid outages (0 power)',
      modern: 'Sub-100ms automatic transfer switch runs whole home',
      advantage: 'Lights, Wi-Fi, and refrigeration never lose power',
    },
    {
      aspect: 'Typical Annual Savings',
      icon: TrendingUp,
      legacy: '$600 – $1,100 / year (under current retail tariffs)',
      modern: '$2,800 – $4,600+ / year with matched battery storage',
      advantage: 'Save an additional $2,000+ every single year',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-10">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#2B3CB8] bg-[#2B3CB8]/10 px-3 py-1 rounded-full inline-block mb-2 sm:mb-3">
          10-Year Technology Leap
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-950 tracking-tight leading-tight">
          Legacy Solar (2012–2018) vs Modern Solar + Storage
        </h2>
        <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed px-1 sm:px-0">
          If your solar system was installed 5 to 12 years ago, see how modern high-efficiency panels and battery storage multiply your energy independence.
        </p>
      </div>

      {/* Comparison Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white">
        {/* Header Bar */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold">The 10-Year Solar Technology Leap</h3>
            <p className="text-xs text-slate-400 mt-0.5">Compare older rooftop systems with today's smart energy ecosystems</p>
          </div>
          <div className="flex items-center justify-between w-full sm:w-auto gap-2">
            <span className="text-[11px] sm:text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full shrink-0">
              Modernize & Double ROI
            </span>

          
          </div>
        </div>

        {/* 1. Mobile Cards View (Visible on mobile screens) */}
        <div className="block md:hidden p-3.5 space-y-3.5 bg-slate-50/50">
          {comparisonRows.map((row, idx) => {
            const Icon = row.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-xs transition-shadow"
              >
                {/* Metric Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#2B3CB8]/10 text-[#2B3CB8] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold font-serif text-slate-900 text-sm leading-tight">
                      {row.aspect}
                    </span>
                  </div>
                </div>

                {/* Legacy vs Modern Cards Stack */}
                <div className="space-y-2">
                  {/* Legacy Block */}
                  <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200/70">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      <History className="w-3 h-3 text-slate-400" />
                      Older Solar (2012–2018)
                    </div>
                    <p className="text-xs text-slate-600 leading-snug">
                      {row.legacy}
                    </p>
                  </div>

                  {/* Modern Block */}
                  <div className="bg-emerald-50/80 rounded-lg p-2.5 border border-emerald-200/90 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      Today's Solar + Battery
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                      <p className="text-xs font-semibold text-slate-900 leading-snug">
                        {row.modern}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Advantage Badge */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                  <span>Advantage: {row.advantage}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Responsive Table View (Desktop screens) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-155 text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
                <th className="p-3.5 sm:p-4 w-1/4">Key Metric</th>
                <th className="p-3.5 sm:p-4 w-[37.5%] text-slate-500">Older Solar (2012–2018)</th>
                <th className="p-3.5 sm:p-4 w-[37.5%] bg-emerald-50/70 text-emerald-950 border-x border-emerald-200">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    Today's Solar + Battery Systems
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {comparisonRows.map((row, idx) => {
                const Icon = row.icon;
                return (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-[#2B3CB8]/10 text-[#2B3CB8] flex items-center justify-center shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span>{row.aspect}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal block mt-1 ml-8">
                        {row.advantage}
                      </span>
                    </td>
                    <td className="p-3.5 sm:p-4 text-slate-600">
                      {row.legacy}
                    </td>
                    <td className="p-3.5 sm:p-4 bg-emerald-50/40 border-x border-emerald-100 font-medium text-slate-900">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{row.modern}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Bottom CTA bar inside table card */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-slate-600 text-center sm:text-left">
            Wondering what your existing roof could produce with modern high-efficiency panels?
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <Button
              to="/existing-solar/upgrade"
              variant="outline"
              size="sm"
              className="w-full sm:w-auto justify-center text-xs sm:text-sm"
            >
              Explore Upgrade Options
            </Button>
            <Button
              to="/get-started/free-assessment"
              variant="primary"
              size="sm"
              className="w-full sm:w-auto justify-center text-xs sm:text-sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Get Modernization Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExistingSolarEvolutionSection;


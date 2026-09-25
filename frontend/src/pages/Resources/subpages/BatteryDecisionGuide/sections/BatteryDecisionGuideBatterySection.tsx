import React from 'react';
import { BatteryCharging, Zap, Check, ArrowRight, ShieldCheck, SunDim } from 'lucide-react';
import { Button } from '../../../../../components/ui/Button';

export const BatteryDecisionGuideBatterySection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 sm:mt-6 mb-8 sm:mb-12">
      <div className="relative rounded-2xl sm:rounded-3xl bg-linear-to-tr from-slate-900 via-slate-800 to-slate-900 text-white p-4 sm:p-6 md:p-8 overflow-hidden shadow-xl border border-slate-700/80">
        
        {/* Ambient subtle glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
          
          {/* Left: Real Photography */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden shadow-2xl border border-slate-700 group rounded-xl">
              <img
                src="/images/solutions/battery-storm.jpg"
                alt="Home battery installation with solar array"
                className="w-full h-52 xs:h-60 sm:h-72 lg:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

              {/* Bottom Tag */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-300 mb-1">
                  <span>Capacity Matching</span>
                  <span>10–13.5 kWh Optimal Sweet Spot</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-linear-to-r from-amber-400 to-emerald-400 h-full w-[96%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Narrative Educational Content (Non-box design) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
              <SunDim className="w-3.5 h-3.5 text-amber-400" />
              <span>Solar + Battery Sizing Rule</span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white tracking-tight leading-snug">
              Add Battery with Solar: The Golden Ratio for Maximum ROI
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              A common trap is installing a 13.5 kWh battery on an undersized 5 kW solar array. During winter or cloudy stretches, the array lacks enough daytime surplus to recharge the battery fully. Here is the engineering ratio that guarantees full charge 340+ days a year:
            </p>

            {/* Organic Checklist Points */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>The 1:1.5 Solar-to-Storage Rule:</strong> Pair every 10 kWh of battery capacity with at least 6.6 kW to 8 kW of rooftop solar panels to guarantee surplus charging power.</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>Continuous vs Peak Inverter Output:</strong> Check continuous output kW (e.g. 5 kW vs 11.5 kW) so high-surge appliances like ducted AC don't trip to the grid.</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>Retrofit Compatibility:</strong> If you already have solar, AC-coupled battery technology lets you add storage without modifying your existing solar inverter or panel warranties.</span>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-700/80">
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>CEC Accredited Storage Designers</span>
              </div>
              <Button
                to="/resources/quote-review"
                variant="primary"
                size="sm"
                className="w-full sm:w-auto justify-center text-center"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Audit My Battery Quote
              </Button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default BatteryDecisionGuideBatterySection;

import React from 'react';
import { Sun, BatteryCharging, Zap, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { Button } from '../../../../../components/ui/Button';

export const BatterySavingsSolarSynergySection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 sm:mt-6 mb-8 sm:mb-12">
      <div className="relative rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-4 sm:p-6 md:p-8 overflow-hidden shadow-xs">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
          
          {/* Left: Image with Overlaid Zero-Fuel Solar Tag */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden shadow-md group">
              <img
                src="/images/solutions/battery-bundle.jpg"
                alt="Battery storage recharging from solar panels"
                className="w-full h-52 xs:h-60 sm:h-72 lg:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] sm:text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Standalone Battery vs Solar+Battery</span>
                <p className="text-[11px] sm:text-xs font-medium text-slate-100 mt-0.5">
                  Recharging from grid off-peak costs 22¢. Recharging from solar costs $0.00.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Content - Why Battery Needs Solar to Maximize Savings */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold">
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>The Synergy Equation</span>
            </div>

            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              Why a Battery Without Solar Only Delivers Half the Savings
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Some households ask about installing a battery alone. While a standalone battery can buy off-peak night grid power and discharge during the peak, the profit margin is only ~14¢/kWh. When you combine solar + battery, the battery fills with 100% free rooftop energy, earning the full 38¢–44¢ peak tariff spread!
            </p>

            {/* Non-box feature chips */}
            <div className="space-y-2 pt-1">
              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>No Grid Fuel Costs:</strong> 13.5 kWh Tesla or Sungrow battery recharges entirely from noon solar.</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>Storm Blackout Islanding:</strong> Even in a multi-day grid blackout, solar panels refill your battery every morning.</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>Single Smart App:</strong> Monitor rooftop solar generation, battery percentage, and home draw in real-time.</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>CEC Approved Battery Installers</span>
              </div>
              <Button
                to="/batteries/solar-plus-battery"
                variant="primary"
                size="sm"
                className="w-full sm:w-auto justify-center text-center"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                View Solar + Battery Packages
              </Button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default BatterySavingsSolarSynergySection;

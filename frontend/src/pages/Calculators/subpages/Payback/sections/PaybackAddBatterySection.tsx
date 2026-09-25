import React from 'react';
import { BatteryCharging, DollarSign, TrendingUp, ShieldCheck, ArrowRight, Sun } from 'lucide-react';
import { Button } from '../../../../../components/ui/Button';

export const PaybackAddBatterySection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 sm:mt-6 mb-8 sm:mb-12">
      <div className="relative rounded-2xl sm:rounded-3xl bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 sm:p-6 md:p-8 overflow-hidden shadow-xl border border-slate-700/80">
        {/* Glow dots */}
        <div className="absolute top-0 right-0 w-64 sm:w-72 h-64 sm:h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 sm:w-72 h-64 sm:h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
          
          {/* Left: Image with Overlaid Financial ROI Tag */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-700 group">
              <img
                src="/images/solutions/net-metering.jpg"
                alt="Solar plus battery financial net metering payback"
                className="w-full h-52 xs:h-60 sm:h-72 lg:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

              <div className="absolute top-3 left-3 bg-emerald-500/90 text-slate-950 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1.5 shadow-sm">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Arbitrage ROI Multiplier</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] sm:text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Energy Tariff Spread</span>
                <p className="text-[11px] sm:text-xs font-medium text-slate-100 mt-0.5">
                  Store 5¢ daytime export and consume it during 38¢ evening peak hours.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Content - Why Adding Battery Changes Payback Reality */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold">
              <DollarSign className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Solar + Battery Economics</span>
            </div>

            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight leading-snug">
              Add Battery with Solar: The 33¢ Spread That Accelerates Payback
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Feed-in tariffs in South East Queensland have fallen to ~5¢–7¢/kWh, while peak retail tariffs sit at 38¢–44¢/kWh. That means exporting 1 kWh of solar only earns you 5¢, but buying it back at 7 PM costs 38¢. Adding a battery captures that 33¢ spread every single day, keeping hundreds of dollars each quarter inside your family budget.
            </p>

            {/* Micro tariff metrics */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-1">
              <div className="p-2.5 sm:p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Grid Export Return</span>
                <span className="text-sm sm:text-base font-extrabold text-amber-400">Only 5¢ – 6¢ / kWh</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Low value without storage</p>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                <span className="text-[10px] font-bold text-emerald-400 uppercase block">Battery Self-Use Value</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-300">38¢ – 44¢ / kWh</span>
                <p className="text-[10px] text-slate-300 mt-0.5">Full retail offset value</p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-700/80">
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>10-Year Comprehensive Warranty</span>
              </div>
              <Button
                to="/calculators/battery-savings"
                variant="primary"
                size="sm"
                className="w-full sm:w-auto justify-center text-center"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Model Battery Cashflow
              </Button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default PaybackAddBatterySection;

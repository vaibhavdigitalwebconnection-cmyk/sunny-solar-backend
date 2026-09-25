import React from 'react';
import { BatteryCharging, Sun, Zap, ArrowRight, TrendingUp, Moon, ShieldCheck } from 'lucide-react';
import { Button } from '../../../../../components/ui/Button';

export const SolarSavingsAddBatterySection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 sm:mt-6 mb-8 sm:mb-12">
      <div className="relative rounded-2xl sm:rounded-3xl bg-linear-to-tr from-slate-900 via-slate-800 to-slate-900 text-white p-4 sm:p-6 md:p-8 overflow-hidden shadow-xl border border-slate-700/80">
        {/* Glow dots */}
        <div className="absolute top-0 right-0 w-64 sm:w-72 h-64 sm:h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 sm:w-72 h-64 sm:h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">

          {/* Left: Image with organic badge overlays */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-700 group">
              <img
                src="/images/solutions/battery-storm.jpg"
                alt="Adding a battery to solar system"
                className="w-full h-52 xs:h-60 sm:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              <div className="absolute top-3 left-3 bg-emerald-500/90 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full text-slate-950 text-[10px] sm:text-xs font-extrabold flex items-center gap-1.5">
                <BatteryCharging className="w-3.5 h-3.5" />
                <span>+Battery Storage Upgrade</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-slate-200">
                <div className="flex items-center justify-between text-[11px] sm:text-xs mb-1 font-bold text-amber-400">
                  <span>Daytime Solar Stored</span>
                  <span>100% Usable at Night</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-linear-to-r from-amber-400 to-emerald-400 h-full w-[92%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content - Why Add Battery with Solar */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4"> 

            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight">
              Pairing Solar with a Battery: Double Your Savings Potential
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              While solar panels drastically reduce your daytime bill, up to 60% of an average family's energy consumption happens after 5 PM when the sun has set. By adding a home battery, you bank that daytime surplus and eliminate expensive 38¢/kWh evening peak grid power completely.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <Sun className="w-4 h-4 shrink-0" />
                  <span>Solar Only</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Covers 40% - 60% of total bill. Nighttime grid consumption billed at full peak rates.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <BatteryCharging className="w-4 h-4 shrink-0" />
                  <span>Solar + Battery</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  Covers up to 94% of total bill. Zero evening peak dependency and automated blackout protection.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-700/80">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Eligible for $1,000+ Battery Rebates</span>
              </div>
              <Button
                to="/calculators/battery-savings"
                variant="primary"
                size="sm"
                className="w-full sm:w-auto justify-center text-center"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Simulate Battery ROI
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SolarSavingsAddBatterySection;

import React from 'react';
import { BatteryCharging, Sun, Zap, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Button } from '../../../../../components/ui/Button';

export const SystemSizeAddBatterySection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 sm:mt-6 mb-8 sm:mb-12">
      <div className="relative rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-4 sm:p-6 md:p-8 overflow-hidden shadow-xs">
        {/* Subtle ambient lighting */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
          
          {/* Left Visual: Image with Floating Solar-to-Battery Headroom Gauge */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden shadow-md group">
              <img
                src="/images/solutions/battery-hero.jpg"
                alt="Battery storage with solar system sizing"
                className="w-full h-52 xs:h-60 sm:h-72 lg:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] sm:text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">Recharge Rule of Thumb</span>
                <p className="text-[11px] sm:text-xs font-medium text-slate-100 mt-0.5">
                  1 kWh battery requires ~0.7 kW solar capacity to reliably refill in winter.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content: Add Battery with Solar sizing guidelines */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-amber-500/10 text-amber-800 border border-amber-500/20 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Future-Proof System Engineering</span>
            </div>

            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              Adding a Battery? Why You Need 8.8 kW to 10 kW+ on the Roof
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              If you install a basic 6.6 kW system and run air conditioning, your daytime solar will be consumed immediately. When you add a 10 kWh or 13.5 kWh battery, there won't be enough surplus sunlight left to fill the battery before sunset. Oversizing your solar array to 8.8 kW or 10 kW ensures full daily battery charging even on overcast days.
            </p>

            {/* Micro checklist chips */}
            <div className="space-y-2 pt-1">
              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>6.6 kW Solar:</strong> Perfect for daytime savings, but limits future battery capacity.</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>8.8 kW - 10 kW Solar:</strong> The golden sweet spot for pairing a 9.6 kWh to 13.5 kWh home battery.</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>13.2 kW+ Solar:</strong> Ideal for double-storey homes, pools, EV charging + dual batteries.</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
              <span className="text-xs text-slate-500 font-medium">Have an existing battery in mind?</span>
              <Button
                to="/calculators/battery-size"
                variant="primary"
                size="sm"
                className="w-full sm:w-auto justify-center text-center"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Match Battery to Your Roof
              </Button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default SystemSizeAddBatterySection;

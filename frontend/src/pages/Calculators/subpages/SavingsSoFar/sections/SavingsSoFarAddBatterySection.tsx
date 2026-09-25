import React from 'react';
import { BatteryCharging, Sun, Zap, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../../../../../components/ui/Button';

export const SavingsSoFarAddBatterySection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 sm:mt-6 mb-8 sm:mb-12">
      <div className="relative rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-4 sm:p-6 md:p-8 overflow-hidden shadow-xs">
        {/* Subtle glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
          
          {/* Left: Image with Overlaid Retrofit Tag */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden shadow-md group">
              <img
                src="/images/about/gallery/electrician-wiring-switchboard.jpg"
                alt="Electrician retrofitting battery storage onto existing solar system"
                className="w-full h-52 xs:h-60 sm:h-72 lg:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] sm:text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Stop Bleeding 5¢ Solar</span>
                <p className="text-[11px] sm:text-xs font-medium text-slate-100 mt-0.5">
                  Your solar system paid for itself. Now add storage to eliminate remaining peak bills.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Content - Adding Battery to Existing Solar System */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>The Next Evolution of Your Rooftop Asset</span>
            </div>

            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              Already Saved with Solar? Add a Battery to Triple Daily Value
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When you first installed solar, feed-in tariffs were 20¢–44¢/kWh. Today, power retailers only credit you 5¢ for export while charging 38¢+ at night. By adding an AC-coupled battery, you stop giving away your daytime generation and store it for your evening dinners, air-con, and TV.
            </p>

            {/* Upgrade points */}
            <div className="space-y-2 pt-1">
              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>Zero Inverter Replacement:</strong> AC-coupled batteries wire right into your switchboard beside your existing inverter.</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>Recharge from Legacy Panels:</strong> Whether panels are 3 or 10 years old, they will reliably charge a modern battery.</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>Instant Blackout Defense:</strong> Older solar systems shut down in blackouts. Adding a battery gateway keeps your lights on.</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Compatible with all existing systems</span>
              </div>
              <Button
                to="/existing-solar/add-battery"
                variant="primary"
                size="sm"
                className="w-full sm:w-auto justify-center text-center"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Explore Battery Retrofits
              </Button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default SavingsSoFarAddBatterySection;

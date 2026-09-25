import React from 'react';
import { BatteryCharging, Sun, Zap, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export const ResourcesAddBatterySection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 sm:mt-6 mb-8 sm:mb-12">
      <div className="relative rounded-2xl sm:rounded-3xl bg-linear-to-tr from-slate-900 via-slate-800 to-slate-900 text-white p-4 sm:p-6 md:p-8 overflow-hidden shadow-xl border border-slate-700/80">
        {/* Glow ambient dots */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
          
          {/* Left: Real Photography with Organic Overlays */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-700 group">
              <img
                src="/images/solutions/battery-bundle.jpg"
                alt="Adding a battery storage system to rooftop solar"
                className="w-full h-52 xs:h-60 sm:h-72 lg:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/25 to-transparent" />

          

              {/* Bottom Telemetry Bar */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                <div className="flex items-center justify-between text-xs font-semibold text-amber-300 mb-1">
                  <span>Daytime Solar Stored</span>
                  <span>100% Usable at Night</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-linear-to-r from-amber-400 to-emerald-400 h-full w-[94%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Narrative Educational Content (No Boxes) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>The Storage Synergy Equation</span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white tracking-tight leading-snug">
              Why Adding a Battery to Solar Changes Everything
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Standard rooftop solar only powers your daytime appliances. When the sun sets, most families are forced to buy expensive 38¢/kWh peak grid electricity. By pairing solar with a home battery, you bank that daytime surplus for free, eliminate nighttime grid bills, and protect your home through storm blackouts.
            </p>

            {/* Non-box organic checklist points */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>Capture the 33¢ Tariff Spread:</strong> Stop selling daytime solar for 5¢ export while buying nighttime power at 38¢.</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>Storm Blackout Islanding:</strong> Keep refrigeration, WiFi, lighting, and medical devices powered during severe weather outages.</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>Zero Roof Re-Work:</strong> AC-coupled batteries wire directly into your main switchboard alongside any existing or new solar system.</span>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-700/80">
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>CEC Approved Battery Installers</span>
              </div>
              <Button
                to="/resources/battery-decision-guide"
                variant="primary"
                size="sm"
                className="w-full sm:w-auto justify-center text-center"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Read Battery Decision Guide
              </Button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ResourcesAddBatterySection;

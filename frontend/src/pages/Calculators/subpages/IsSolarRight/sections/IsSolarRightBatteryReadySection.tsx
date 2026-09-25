import React from 'react';
import { BatteryCharging, Sun, Zap, Check, ArrowRight, ShieldCheck, Home } from 'lucide-react';
import { Button } from '../../../../../components/ui/Button';

export const IsSolarRightBatteryReadySection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 sm:mt-6 mb-8 sm:mb-12">
      <div className="relative rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-4 sm:p-6 md:p-8 overflow-hidden shadow-xs">
        {/* Subtle glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
          
          {/* Left: Image with Overlaid Feasibility Tag */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden shadow-md group">
              <img
                src="/images/about/solar-installation-aerial.jpg"
                alt="Rooftop solar and battery feasibility installation"
                className="w-full h-52 xs:h-60 sm:h-72 lg:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

              <div className="absolute top-3 left-3 bg-amber-500/90 text-slate-950 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold flex items-center gap-1.5 shadow-sm">
                <Home className="w-3.5 h-3.5" />
                <span>Property Readiness</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] sm:text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">Battery Readiness Check</span>
                <p className="text-[11px] sm:text-xs font-medium text-slate-100 mt-0.5">
                  Even roofs with minor shading make sense when paired with a home battery.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Content - Is Your Home Ready to Add Battery with Solar? */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold">
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Solar + Battery Readiness</span>
            </div>

            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              Add Battery with Solar: 3 Property Checks That Guarantee Success
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Wondering if your home can handle both solar and battery storage? Virtually all residential homes across Queensland are viable candidates. Here are the 3 technical aspects our team validates during your free site assessment:
            </p>

            {/* Non-box readiness pills */}
            <div className="space-y-2 pt-1">
              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>Switchboard Room & Safety Switches:</strong> We check if your main switchboard has room for an RCD circuit breaker and smart meter CT clamp.</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>Battery Wall Space:</strong> High-efficiency IP67 batteries (like Tesla Powerwall 3 or Sungrow) mount indoors in the garage or outside sheltered on brick/concrete.</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>Multi-Facet Roof Orientations:</strong> Facing panels West captures intense afternoon sun — right when your battery finishes topping off for the evening.</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Free On-Site or Aerial Inspection</span>
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

export default IsSolarRightBatteryReadySection;

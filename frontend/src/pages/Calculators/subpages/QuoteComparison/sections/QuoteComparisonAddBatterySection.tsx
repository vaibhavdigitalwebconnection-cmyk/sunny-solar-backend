import React from 'react';
import { Scale, BatteryCharging, ShieldAlert, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../../../../../components/ui/Button';

export const QuoteComparisonAddBatterySection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 sm:mt-6 mb-8 sm:mb-12">
      <div className="relative rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-4 sm:p-6 md:p-8 overflow-hidden shadow-xs">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
          
          {/* Left: Image with Overlaid Quote Audit Tag */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden shadow-md group">
              <img
                src="/images/solutions/engineers.jpg"
                alt="Solar and battery engineering quote review"
                className="w-full h-52 xs:h-60 sm:h-72 lg:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

              <div className="absolute top-3 left-3 bg-slate-900/90 text-white px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1.5 shadow-sm border border-white/20">
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>Battery Proposal Audit</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] sm:text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Watch Out for Hidden Line Items</span>
                <p className="text-[11px] sm:text-xs font-medium text-slate-100 mt-0.5">
                  Check whether backup switchboard wiring and gateway relays are actually included.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Content - What to Check in Solar + Battery Quotes */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-amber-500/10 text-amber-800 border border-amber-500/20 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold">
              <BatteryCharging className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Solar + Storage Proposal Checklist</span>
            </div>

            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              Comparing Battery Quotes? 3 Hidden Traps to Check First
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When adding a battery to an existing or new solar system, cheap quotes frequently omit crucial safety and blackout hardware to display an artificially low price tag. Before paying a deposit, make sure the proposal passes these tests:
            </p>

            {/* Checklist pills */}
            <div className="space-y-2 pt-1">
              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>Is Backup Power Included?</strong> Many quotes supply "grid-tied only" batteries that shut down during grid blackouts unless a backup gateway is installed.</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>AC-Coupled vs Hybrid Lock-In:</strong> An AC-coupled battery works with any inverter brand. A DC hybrid forces you to replace your solar inverter completely.</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>Master Electrician vs Subcontractors:</strong> Battery storage operates at high DC voltages and requires CEC battery-accredited full-time installers.</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Free & Confidential Review</span>
              </div>
              <Button
                to="/resources/quote-review"
                variant="primary"
                size="sm"
                className="w-full sm:w-auto justify-center text-center"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Upload Quote for Free Audit
              </Button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default QuoteComparisonAddBatterySection;

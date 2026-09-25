import React from 'react';
import { CheckCircle } from 'lucide-react';

export const UpgradeEligibilitySection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10 lg:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Is Your System <span className="text-amber-600">Eligible for an Upgrade?</span>
        </h2>
        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed px-1 sm:px-0">
          Four straightforward technical criteria determine your system’s expansion potential. Our licensed designers review your roof layout and historical generation data for free.
        </p>
      </div>

      {/* Split Assessment Container (Electrician Photo + 4 Modular Eligibility Containers in 2x2 Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-stretch mb-8 sm:mb-12">
        
        {/* Visual Showcase Left */}
        <div className="lg:col-span-5 relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-900 min-h-55 sm:min-h-85 flex flex-col justify-end">
          <img
            src="/images/about/gallery/smiling-solar-electrician.jpg"
            alt="Licensed Sunny Solar Master Electrician evaluating solar upgrade eligibility"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

          <div className="relative p-4 sm:p-6 text-white">
            <h3 className="text-base sm:text-lg font-bold text-white">
              Direct Advice from Real Electricians, Not Sales Reps
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              We inspect your physical roof condition, switchboard safety switches, and inverter error logs before recommending any changes.
            </p>
          </div>
        </div>

        {/* 4 Modular Eligibility Containers in 2x2 Grid */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-2.5 sm:gap-4">
          
          {/* Eligibility Card 1 */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-300/80 p-3 sm:p-5 shadow-sm hover:border-amber-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2 gap-1">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-50 text-amber-700 font-black text-[11px] sm:text-xs flex items-center justify-center border border-amber-200 shrink-0">
                  01
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded truncate">
                  8–18 m² Needed
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                Roof Surface Availability
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-600 mt-1 sm:mt-1.5 leading-relaxed">
                Requires space for 4 to 12 additional panels. East and West faces work excellently for daytime self-consumption.
              </p>
            </div>
            <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-slate-100 flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-medium text-slate-500">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="truncate">Tile, colorbond, kliplok</span>
            </div>
          </div>

          {/* Eligibility Card 2 */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-300/80 p-3 sm:p-5 shadow-sm hover:border-amber-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2 gap-1">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-50 text-amber-700 font-black text-[11px] sm:text-xs flex items-center justify-center border border-amber-200 shrink-0">
                  02
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 sm:px-2 py-0.5 rounded truncate">
                  Inverter Test
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                Inverter Capacity & Strings
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-600 mt-1 sm:mt-1.5 leading-relaxed">
                If your inverter has an unused MPPT input, new panels can wire immediately. 7+ yr units benefit from a hybrid swap.
              </p>
            </div>
            <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-slate-100 flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-medium text-slate-500">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="truncate">Free voltage curve check</span>
            </div>
          </div>

          {/* Eligibility Card 3 */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-300/80 p-3 sm:p-5 shadow-sm hover:border-amber-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2 gap-1">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-50 text-amber-700 font-black text-[11px] sm:text-xs flex items-center justify-center border border-amber-200 shrink-0">
                  03
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 sm:px-2 py-0.5 rounded truncate">
                  Network Pre-Check
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                Grid Pre-Approval
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-600 mt-1 sm:mt-1.5 leading-relaxed">
                1-phase exports up to 5kW; 3-phase up to 15kW. We manage all network pre-approvals directly with Energex & Ergon.
              </p>
            </div>
            <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-slate-100 flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-medium text-slate-500">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="truncate">100% Paperwork handled</span>
            </div>
          </div>

          {/* Eligibility Card 4 */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-300/80 p-3 sm:p-5 shadow-sm hover:border-amber-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2 gap-1">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-50 text-amber-700 font-black text-[11px] sm:text-xs flex items-center justify-center border border-amber-200 shrink-0">
                  04
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded truncate">
                  Point-of-Sale
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                Government STC Rebate
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-600 mt-1 sm:mt-1.5 leading-relaxed">
                Added panels qualify for STC certificates, deducting up to $2,400 off your final installation invoice automatically.
              </p>
            </div>
            <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-slate-100 flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-medium text-slate-500">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="truncate">Instant invoice discount</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default UpgradeEligibilitySection;

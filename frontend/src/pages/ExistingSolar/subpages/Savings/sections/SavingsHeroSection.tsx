import React from 'react';
import { Sparkles } from 'lucide-react';

export const SavingsHeroSection: React.FC = () => {
  return (
    <section className="relative">
      <div className="pt-24 sm:pt-28 lg:pt-29">
        {/* ========================================================= */}
        {/* 1. Mobile View (< lg): Full-Width Image Background with Only Title & Short Description */}
        {/* ========================================================= */}
        <div className="block lg:hidden w-full relative overflow-hidden bg-slate-950 py-30 sm:py-14 px-4 sm:px-6">
          {/* Full-Width Background Image */}
          <img
            src="/images/about/solar-installation-aerial.jpg"
            alt="Residential rooftop solar installation savings overview"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
          />
          {/* Gradient Overlay for high-contrast text and crisp legibility */}
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-950/50 to-slate-400/10" />

          {/* Overlaid Content Layer: Only Title and Small Line of Description */}
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-white tracking-tight leading-snug">
              Why Solar Outperforms Traditional Home Investments
            </h2>

            <p className="mt-2.5 text-xs sm:text-sm text-white leading-relaxed">
              Unlike static investments, solar produces immediate cost offsets every daylight hour at $0 variable cost.
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. Desktop Split View (>= lg) - Exactly 100% Unchanged */}
        {/* ========================================================= */}
        <div className="hidden lg:grid lg:grid-cols-12 items-stretch">
          {/* Normal Container Left: Image Showcase with Overlaid Small Badges */}
          <div className="lg:col-span-7 relative group overflow-hidden shadow-md border border-slate-200/80 bg-slate-900 min-h-90 sm:min-h-112.5 flex flex-col justify-end">
            <img
              src="/images/about/solar-installation-aerial.jpg"
              alt="Residential rooftop solar installation savings overview"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out opacity-95"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-950/30 to-transparent" />

            {/* Overlaid Floating Small Container 2 (Top Right) */}
            <div className="hidden sm:flex absolute top-6 right-6 backdrop-blur-md bg-slate-900/85 p-3 rounded-xl border border-white/20 shadow-lg items-center gap-2.5 text-white">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold">100% Daytime Grid Hedge</span>
            </div>
          </div>

          {/* Normal Container Right: Financial Mechanics Breakdown */}
          <div className="lg:col-span-5 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-serif font-extrabold text-slate-900 tracking-tight leading-snug">
                Why Solar Outperforms Traditional Home Investments
              </h2>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Unlike static investments, solar produces immediate cost offsets every daylight hour. While electricity retailers increase daytime and peak grid charges by an average of 9.2% annually, your rooftop generates energy at $0 variable cost.
              </p>

              {/* Pair of Small Metric Containers */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="bg-red-50/70 border border-red-200/60 rounded-xl p-3.5">
                  <p className="text-[11px] font-bold text-red-600 uppercase tracking-wider">Grid Retail Price Trend</p>
                  <p className="text-base font-extrabold text-red-900 mt-1">+9.2% / yr</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Average retail hike</p>
                </div>

                <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-xl p-3.5">
                  <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Your Sun Energy Cost</p>
                  <p className="text-base font-extrabold text-emerald-900 mt-1">$0.00 / kWh</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Clean daylight power</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsHeroSection;


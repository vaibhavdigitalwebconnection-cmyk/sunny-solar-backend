import React from 'react';
import { ArrowRight, Stethoscope } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/Button';

export const SolarUpgradesHeroSection: React.FC = () => {
  return (
    <section className="relative bg-white text-slate-900 pt-14 pb-16 lg:pb-24 border-b border-slate-200/80 overflow-hidden">
      {/* Subtle atmospheric solar radiance */}
      <div className="absolute -top-32 right-1/4 w-150 h-87.5 bg-[#2B3CB8]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-28 w-112.5 h-75 bg-[#2B3CB8]/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Subtle engineering blueprint dot grid backdrop */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #2B3CB8 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 z-10">
        <Breadcrumbs />

        <div className="mt-0 sm:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Content Column (Bottom on mobile, Left on desktop) */}
          <div className="order-2 px-4 sm:px-0 lg:order-1 lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#2B3CB8] bg-[#F5F7FD] border border-[#D1DCF8] shadow-2xs max-w-full">
              <span className="w-2 h-2 rounded-full bg-[#2B3CB8] animate-pulse shrink-0" />
              <span className="truncate xs:whitespace-normal">Modernize Aging Solar Systems</span>
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight leading-[1.18] sm:leading-[1.12]">
              Upgrade & Re-Power Your{' '}
              <br className="hidden sm:inline" />
              <span className="bg-linear-to-r from-[#2B3CB8] via-[#4658D9] to-[#6F8EE7] bg-clip-text text-transparent">
                Existing Solar Setup
              </span>
            </h1>

            <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Has your household outgrown your original solar system? We replace failing inverters, expand capacity for electric vehicles and ducted air conditioning, and replace aging 1.5kW–3kW arrays with modern high-density technology—generating up to 400% more clean energy from your roof.
            </p>

            <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full xs:w-auto pt-1 sm:pt-2">
              <Button
                to="/existing-solar/health-check"
                variant="primary"
                size="md"
                className="w-full xs:w-auto justify-center text-center font-bold sm:text-base sm:py-3.5 sm:px-6 shadow-md"
                icon={<Stethoscope className="w-4 h-4 sm:w-5 sm:h-5" />}
              >
                Book Solar Health Check ($189)
              </Button>
              <Button
                to="/get-started/free-assessment"
                variant="outline"
                size="md"
                className="w-full xs:w-auto justify-center text-center font-semibold sm:text-base sm:py-3.5 sm:px-6"
                icon={<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
              >
                Request Upgrade Assessment
              </Button>
            </div>
          </div>

          {/* Image Column (Top on mobile, Right on desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-5 relative w-full">
            <div className="relative  sm:rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl sm:shadow-2xl bg-slate-100 aspect-16/10 xs:aspect-4/3 max-w-lg mx-auto lg:max-w-none group">
              <img
                src="/images/about/gallery/electrician-mounting-inverter.webp"
                alt="Sunny Solar Master Electrician upgrading a solar inverter"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 text-white">
                <span className="font-mono text-[10px] sm:text-xs font-bold text-[#D1DCF8] uppercase tracking-wider block">
                  Precision Upgrade
                </span>
                <div className="text-xs sm:text-sm font-semibold mt-0.5 leading-snug">
                  Fronius & Sungrow Active-Cooled Hybrid Replacements
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarUpgradesHeroSection;

import React from 'react';
import { ArrowRight, Users, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/Button';

export const SolarInstallationHeroSection: React.FC = () => {
  return (
    <section className="relative bg-linear-to-b from-[#2B3CB8]/10 via-[#2B3CB8]/5 to-white pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-14 lg:pb-16 border-b border-slate-200/60 overflow-hidden">
      {/* Subtle ambient solar blue glow */}
      <div className="absolute top-12 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#2B3CB8]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto  relative z-10">
        {/* <Breadcrumbs className="mb-4 sm:mb-6 px-0" /> */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Content Column (Bottom on mobile, Left on desktop) */}
          <div className="order-2 px-4 sm:px-0 lg:order-1 lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#2B3CB8] bg-[#F5F7FD] border border-[#D1DCF8] shadow-2xs max-w-full">
              <span className="w-2 h-2 rounded-full bg-[#2B3CB8] animate-pulse shrink-0" />
              <span className="truncate xs:whitespace-normal">SAA Master Electrician Standards</span>
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight leading-[1.18] sm:leading-tight">
              Flawless Residential{' '}
              <br className="hidden sm:inline" />
              <span className="bg-linear-to-r from-[#2B3CB8] to-[#4658D9] bg-clip-text text-transparent">
                Solar Installation
              </span>
            </h1>

            <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              A solar system is only as reliable as the hands that install it. Our certified Master Electricians follow uncompromising safety protocols to guarantee zero water ingress, laser-straight panel alignment, and superior electrical protection.
            </p>

            <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full xs:w-auto pt-1 sm:pt-2">
              <Button
                to="/get-started/free-assessment"
                variant="primary"
                size="md"
                className="w-full xs:w-auto justify-center text-center font-bold sm:text-base sm:py-3.5 sm:px-6 shadow-md"
                icon={<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
              >
                Book In-Home Assessment
              </Button>
              <Button
                to="/about"
                variant="outline"
                size="md"
                className="w-full xs:w-auto justify-center text-center font-semibold sm:text-base sm:py-3.5 sm:px-6"
                icon={<Users className="w-4 h-4 sm:w-5 sm:h-5" />}
              >
                Meet Our Installers
              </Button>
            </div>

            {/* Trust Proof Points */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 sm:gap-x-5 gap-y-2 text-[11px] sm:text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2B3CB8] shrink-0" />
                <span>AS/NZS 5033 Compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2B3CB8] shrink-0" />
                <span>Zero Subcontractors</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2B3CB8] shrink-0" />
                <span>10-Yr Workmanship Guarantee</span>
              </div>
            </div>
          </div>

          {/* Image Column (Top on mobile, Right on desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-5 w-full">
            <div className="relative  sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl border-2 sm:border-4 border-white bg-slate-900 aspect-16/10 xs:aspect-4/3 max-w-lg mx-auto lg:max-w-none group">
              <img
                src="/images/solar/solar-installation-trade.webp"
                alt="Electrician installing solar panels"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                <div className="text-[10px] sm:text-xs font-bold text-[#D1DCF8] uppercase tracking-wider">Uncompromising Trade Standards</div>
                <div className="text-xs sm:text-sm font-bold mt-0.5 leading-snug">Torque-Tested Clamping &amp; Concealed Conduit Routing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarInstallationHeroSection;

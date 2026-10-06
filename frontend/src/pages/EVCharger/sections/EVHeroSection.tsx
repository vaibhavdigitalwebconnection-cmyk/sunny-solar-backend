import React from 'react';
import { m } from 'framer-motion';
import {
  ArrowRight,
  Zap,
  Sun,
  ShieldCheck,
  Gauge,
  Sparkles,
  TrendingDown,
  Cpu,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { BorderBeam } from '../../../components/ui/BorderBeam';
import { Particles } from '../../../components/ui/Particles';

export const EVHeroSection: React.FC = () => {
  return (
    <section className="relative pt-17 sm:pt-36 pb-16 sm:pb-24 bg-linear-to-b from-[#2B3CB8]/10 via-[#2B3CB8]/5 to-white border-b border-slate-200/60 overflow-hidden">
      {/* Magic UI Ambient Background Particles */}
      <Particles
        className="absolute inset-0 z-0 opacity-60"
        quantity={45}
        color="#2B3CB8"
        size={0.7}
      />

      {/* Ambient background glows */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#2B3CB8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-1/3 w-80 h-80 bg-[#ED4F11]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Left Column: Headlines & Actions */}
          <div className="order-2 lg:order-1 lg:col-span-6 space-y-5 sm:space-y-6 px-4 md:px-0 text-center lg:text-left flex flex-col items-center lg:items-start">
            
          

            {/* Main Headline */}
            <m.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl xs:text-4xl sm:text-5xl lg:text-[3.25rem] font-serif font-bold text-slate-950 tracking-tight leading-[1.12]"
            >
              Power Your Electric Car with{' '}
              <span className="bg-linear-to-r from-[#2B3CB8] via-[#3E52E8] to-[#ED4F11] bg-clip-text text-transparent">
                100% Free Rooftop Sunshine
              </span>
            </m.h1>

            {/* Subtitle */}
            <m.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl"
            >
              Stop paying surging petrol prices and peak-hour utility tariffs. Sunny Solar installs premium, unbranded Level 2 smart home EV chargers with intelligent solar tracking—giving you up to <strong className="text-slate-900 font-semibold">75 km of range per hour</strong> straight from your panels.
            </m.p>

           

            {/* CTAs */}
            <m.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-2"
            >
              <Button
                to="/get-started/free-assessment"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto font-bold shadow-lg shadow-[#ED4F11]/20 justify-center"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Claim Free EV Charger Quote
              </Button>
              <a
                href="#solar-flow"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-sm font-bold text-[#0C123E] bg-white border border-slate-200 hover:border-[#2B3CB8] hover:bg-slate-50 transition-all shadow-xs cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#2B3CB8]" />
                <span>Live Solar Flow Simulator</span>
              </a>
            </m.div>

           
          </div>

          {/* Right Column: Hero Visual with Real Unbranded Image + Live Telemetry HUD */}
          <div className="order-1 lg:order-2 lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer Decorative Glow */}
              <div className="absolute -inset-1.5 bg-linear-to-r from-[#2B3CB8]/30 via-[#ED4F11]/20 to-[#2B3CB8]/30 rounded-3xl blur-xl opacity-70" />

              {/* Main Image Container with BorderBeam */}
              <div className="relative  overflow-hidden border border-slate-200/90 bg-slate-900 shadow-2xl">
                <BorderBeam size={180} duration={8} colorFrom="#ED4F11" colorTo="#2B3CB8" borderWidth={2} />
                
                {/* Clean unbranded image */}
                <img
                  src="/images/ev-charger/ev-hero-garage.webp"
                  alt="Modern unbranded residential electric vehicle charger and solar integration showroom"
                  className="w-full h-80 sm:h-96 lg:h-107.5 object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient Overlays for High-Contrast Overlays */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

             
              </div>


            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EVHeroSection;

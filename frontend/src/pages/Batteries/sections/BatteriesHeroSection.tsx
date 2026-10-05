import React from 'react';
import { m } from 'framer-motion';
import {
  ArrowRight,
  BatteryCharging,
  ShieldCheck,
  Zap,
  Award,
  Calculator,
  Sun,
  CheckCircle2,
  Activity,
  CloudRain
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Breadcrumbs } from '../../../components/layout/Breadcrumbs';
import { BorderBeam } from '../../../components/ui/BorderBeam';
import { Particles } from '../../../components/ui/Particles';

export const BatteriesHeroSection: React.FC = () => {
  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 bg-linear-to-b from-[#2B3CB8]/10 via-[#2B3CB8]/5 to-white border-b border-slate-200/60 overflow-hidden">
      {/* Magic UI Ambient Background Particles */}
      <Particles
        className="absolute inset-0 z-0 opacity-55"
        quantity={35}
        color="#2B3CB8"
        size={0.6}
      />
      {/* Ambient solar and brand blue glows */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#2B3CB8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-1/3 w-80 h-80 bg-[#2B3CB8]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 left-10 w-80 h-80 bg-[#2B3CB8]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mt-6">

          {/* Content Column (Bottom on mobile, Left on desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">

            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#2B3CB8] bg-[#F5F7FD] border border-[#D1DCF8] shadow-2xs max-w-full">
              <span className="w-2 h-2 rounded-full bg-[#2B3CB8] animate-pulse shrink-0" />
              <span className="truncate xs:whitespace-normal animate-shiny-text font-bold">Smart Storage • Blackout Protection</span>
            </div>

            {/* Headline */}
            <m.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight leading-[1.18] sm:leading-[1.14]"
            >
              Store Daytime Sunshine.{' '}
              <br className="hidden sm:inline" />
              <span className="bg-linear-to-r from-[#2B3CB8] via-[#4658D9] to-[#6F8EE7] bg-clip-text text-transparent">
                Power Your Nights & Outages.
              </span>
            </m.h1>

            {/* Narrative Subtitle */}
            <m.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-xs xs:text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Retailers pay just 3¢ to 5¢ for daytime solar export, but charge up to 45¢/kWh the moment the sun sets. A home battery stores your solar surplus to eliminate peak evening power bills and protect your household when Nationwide storms knock out the grid.
            </m.p>

            {/* Primary Action Buttons */}
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col xs:flex-row items-stretch xs:items-center justify-center lg:justify-start gap-3 w-full xs:w-auto pt-1"
            >
              <Button
                to="/get-started/free-assessment"
                variant="primary"
                size="md"
                className="w-full xs:w-auto font-bold shadow-md justify-center text-center"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Claim Battery Assessment
              </Button>
              <Button
                to="/calculators/battery-savings"
                variant="outline"
                size="md"
                className="w-full xs:w-auto justify-center text-center font-semibold"
                icon={<Calculator className="w-4 h-4" />}
              >
                Calculate Battery Savings
              </Button>
            </m.div>


          </div>

          {/* Image Column (Top on mobile, Right on desktop) */}
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 lg:order-2 lg:col-span-5 relative w-full"
          >
            {/* Main Visual Image Card */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border-2 sm:border-4 border-white aspect-16/10 xs:aspect-4/3 max-w-lg mx-auto lg:max-w-none bg-slate-950 group">
              <BorderBeam size={160} duration={8} colorFrom="#2B3CB8" colorTo="#6F8EE7" borderWidth={2.5} />
              <img
                src="/images/solutions/battery-hero.webp"
                alt="Tesla Powerwall & Premium Home Battery Storage System"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-xs font-semibold z-20">
                <span className="w-2 h-2 rounded-full bg-[#2B3CB8] animate-ping" />
                <span>Storm Watch Enabled</span>
              </div>

              {/* Bottom Telemetry HUD */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BatteryCharging className="w-4 h-4 text-[#D1DCF8]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-white">Live Battery Telemetry</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-white bg-[#2B3CB8]/40 px-2 py-0.5 rounded">98% Charged</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1 border-t border-white/10">
                    <div className="bg-white/5 rounded-lg p-1.5">
                      <div className="text-[10px] text-slate-400">Usable Store</div>
                      <div className="font-bold text-white">13.5 kWh</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-1.5">
                      <div className="text-[10px] text-slate-400">Grid Draw</div>
                      <div className="font-bold text-[#D1DCF8]">0.0 kW (Off)</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-1.5">
                      <div className="text-[10px] text-slate-400">Home Load</div>
                      <div className="font-bold text-[#D1DCF8]">2.4 kW</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Glass Pill */}
            <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-200/80 flex items-center gap-3 z-20">
              <div className="w-10 h-10 rounded-xl bg-[#E8EDFB] text-[#2B3CB8] flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">92%+ Self-Consumption</div>
                <div className="text-[11px] text-slate-500">Average household grid independence</div>
              </div>
            </div>
          </m.div>

        </div>
      </div>
    </section>
  );
};

export default BatteriesHeroSection;

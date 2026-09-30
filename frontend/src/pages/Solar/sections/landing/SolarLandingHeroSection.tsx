import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Sun, 
  CheckCircle2, 
  Star, 
  Calculator, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { Badge } from '../../../../components/ui/Badge';
import { Breadcrumbs } from '../../../../components/layout/Breadcrumbs';
import { BorderBeam } from '../../../../components/ui/BorderBeam';
import { Particles } from '../../../../components/ui/Particles';

export const SolarLandingHeroSection: React.FC = () => {
  return (
    <section className="relative pt-24 sm:pt-32 lg:pt-36 pb-10 sm:pb-14 lg:pb-16 bg-linear-to-b from-amber-500/10 via-amber-500/5 to-white border-b border-slate-200/60 overflow-hidden">
      {/* Magic UI Ambient Background Particles */}
      <Particles
        className="absolute inset-0 z-0 opacity-60"
        quantity={35}
        color="#2B3CB8"
        size={0.6}
      />
      {/* Subtle ambient solar glow */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-36 left-10 w-80 h-80 bg-orange-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Content Column (Bottom on mobile, Left on desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-4 xs:space-y-5 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* Top Micro Badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center lg:justify-start gap-2 sm:gap-2.5 flex-wrap"
            >
              <Badge variant="blue" icon={<Sun className="w-3.5 h-3.5 text-[#2B3CB8]" />}>
                Master Electrician Engineered
              </Badge>

              <Link
                to="/reviews"
                className="inline-flex items-center gap-1 text-[11px] xs:text-xs font-semibold text-slate-700 bg-white/95 hover:bg-white px-2.5 xs:px-3 py-1 xs:py-0.5 rounded-full border border-slate-200 hover:border-[#2B3CB8] shadow-2xs transition-all duration-200 hover:scale-105 group/rev"
                title="Read 420+ Verified Customer Reviews"
              >
                <div className="flex text-[#2B3CB8]">
                  <Star className="w-3 h-3 fill-[#2B3CB8]" />
                  <Star className="w-3 h-3 fill-[#2B3CB8]" />
                  <Star className="w-3 h-3 fill-[#2B3CB8]" />
                  <Star className="w-3 h-3 fill-[#2B3CB8]" />
                  <Star className="w-3 h-3 fill-[#2B3CB8]" />
                </div>
                <span className="font-bold text-slate-900 ml-1">4.98</span>
                <span className="text-slate-500 group-hover/rev:text-[#2B3CB8] transition-colors">(420+ Reviews)</span>
              </Link>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight leading-[1.18] sm:leading-[1.12]"
            >
              High-Yield Solar{' '}
              <span className="bg-linear-to-r from-[#2B3CB8] via-[#4658D9] to-[#6F8EE7] bg-clip-text text-transparent">
                Engineered for Peak Sun.
              </span>
            </motion.h1>

            {/* Concise Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-xs xs:text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Slash your electricity bills by up to 85% with Tier-1 N-Type solar panels and smart European hybrid inverters. Installed strictly by in-house Master Electricians with zero subcontractors.
            </motion.p>

            {/* Compact CTA Row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col xs:flex-row items-stretch xs:items-center justify-center lg:justify-start gap-3 w-full xs:w-auto pt-1 sm:pt-2"
            >
              <Button
                to="/get-started/free-assessment"
                variant="primary"
                size="md"
                className="w-full xs:w-auto font-bold shadow-md justify-center text-center"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Get Free 3D Roof Proposal
              </Button>
              <Button
                to="/calculators/solar-savings"
                variant="outline"
                size="md"
                className="w-full xs:w-auto justify-center text-center"
                icon={<Calculator className="w-4 h-4" />}
              >
                Calculate Savings
              </Button>
            </motion.div>

            {/* Trust Proof Points */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-[11px] xs:text-xs text-slate-600"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2B3CB8] shrink-0" />
                <span>Tier-1 N-Type Silicon</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2B3CB8] shrink-0" />
                <span>Zero Subcontractors</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2B3CB8] shrink-0" />
                <span>25-Yr Performance Guarantee</span>
              </div>
            </motion.div>

          </div>

          {/* Image Column (Top on mobile, Right on desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="order-1 lg:order-2 lg:col-span-5 w-full"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-950 group aspect-16/10 xs:aspect-4/3 max-w-lg mx-auto w-full">
              <BorderBeam size={160} duration={8} colorFrom="#2B3CB8" colorTo="#6F8EE7" borderWidth={2} />
              <img
                src="/images/about/solar-installation-aerial.webp"
                alt="Solar Installation on Queensland Home"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Clean Status Strip */}
              <div className="absolute bottom-2.5 xs:bottom-3 left-2.5 xs:left-3 right-2.5 xs:right-3 flex items-center justify-between text-white text-[11px] xs:text-xs bg-slate-950/80 backdrop-blur-md px-3 xs:px-3.5 py-1.5 xs:py-2 rounded-xl border border-white/10 z-20">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2B3CB8] animate-pulse" />
                  <span className="font-serif font-bold text-white">8.6 kW Peak Generation</span>
                </div>
                <span className="text-[10px] xs:text-[11px] font-mono text-[#D1DCF8] font-semibold">Palm Beach, QLD</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SolarLandingHeroSection;

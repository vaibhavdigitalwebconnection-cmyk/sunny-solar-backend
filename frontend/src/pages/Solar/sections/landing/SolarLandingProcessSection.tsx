import React from 'react';
import { Search, Compass, Wrench, Smartphone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '../../../../components/ui/Badge';
import { Button } from '../../../../components/ui/Button';

export const SolarLandingProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: Search,
      tag: '24-Hour Turnaround',
      title: '3D Roof & Shading Simulation',
      desc: 'We analyze your satellite roof layout, pitch, and nearby tree foliage to calculate month-by-month solar harvest accuracy within 3%.',
    },
    {
      num: '02',
      icon: Compass,
      tag: 'Energex Network Approved',
      title: 'Master Electrician Design',
      desc: 'No generic formulas. Our licensed electrical contractor customizes your string inverter, DC isolators, and Energex network pre-approvals.',
    },
    {
      num: '03',
      icon: Wrench,
      tag: '100% In-House Tradesmen',
      title: '1-Day Zero-Damage Install',
      desc: 'Installed strictly by full-time in-house tradesmen. Marine-grade racking, concealed conduits, and absolute zero broken tile guarantee.',
    },
    {
      num: '04',
      icon: Smartphone,
      tag: 'Lifetime Monitoring',
      title: 'Testing, App Setup & Support',
      desc: 'We commission the system, test output voltages, pair your smartphone telemetry app, and provide ongoing local Nationwide support.',
    },
  ];

  return (
    <section className="py-10 xs:py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-8 xs:mb-10 sm:mb-14 flex flex-col items-center"
        >
          <Badge variant="amber" className="mb-2.5 sm:mb-3">
            Frictionless Experience
          </Badge>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-bold text-slate-950 tracking-tight leading-[1.2] sm:leading-[1.12]">
            How We Deliver Your Solar System
          </h2>
          <p className="mt-2.5 sm:mt-4 text-slate-600 text-xs xs:text-sm sm:text-base lg:text-lg leading-relaxed font-normal">
            From your initial satellite roof consultation to your first zero-dollar power bill, our in-house team handles every engineering approval, grid connection, and rebate document.
          </p>
        </motion.div>

        {/* ======================================================== */}
        {/* MOBILE VIEW (< md): Connected Vertical Step Timeline    */}
        {/* ======================================================== */}
        <div className="md:hidden relative space-y-4">
          {/* Vertical connecting line */}
          <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-gradient-to-b from-amber-500 via-amber-400 to-slate-200 -z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="relative flex items-start gap-3.5 xs:gap-4 z-10"
              >
                {/* Step Node Marker */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-sm ring-4 ring-white">
                  {step.num}
                </div>

                {/* Step Content Card */}
                <div className="flex-1 bg-slate-50/90 border border-slate-200/90 rounded-2xl p-4 xs:p-5 shadow-xs">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 text-[10px] xs:text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-md">
                      {step.tag}
                    </span>
                    <Icon className="w-4 h-4 text-amber-600 shrink-0" />
                  </div>

                  <h3 className="font-serif font-bold text-base text-slate-950 mb-1.5 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* DESKTOP & TABLET VIEW (>= md): Horizontal Step Grid      */}
        {/* ======================================================== */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative bg-slate-50 rounded-2xl p-5 lg:p-6 border border-slate-200/80 hover:border-amber-400/80 hover:bg-white hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-2xl font-bold text-slate-300 group-hover:text-amber-500/60 transition-colors">
                      {step.num}
                    </span>
                  </div>

                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-1 font-mono">
                    {step.tag}
                  </div>

                  <h3 className="font-serif font-bold text-lg text-slate-950 mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Process CTAs */}
        <div className="mt-8 xs:mt-10 sm:mt-12 flex flex-col xs:flex-row items-center justify-center gap-3 sm:gap-4 text-center max-w-md xs:max-w-none mx-auto">
          <Button
            to="/get-started/free-assessment"
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            className="w-full xs:w-auto shadow-md"
          >
            Request Free Roof Assessment
          </Button>
          <Button
            to="/solar/installation"
            variant="outline"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            className="w-full xs:w-auto"
          >
            View Full 1-Day Installation Standards
          </Button>
        </div>
      </div>
    </section>
  );
};


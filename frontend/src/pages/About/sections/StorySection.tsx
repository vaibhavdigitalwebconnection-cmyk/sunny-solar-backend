import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Zap, Sun, ShieldCheck, Trophy, BatteryCharging, Award } from 'lucide-react';
import { DotPattern } from '../../../components/ui/DotPattern';
import { AnimatedShinyText } from '../../../components/ui/AnimatedShinyText';
import { AnimatedGradientText } from '../../../components/ui/AnimatedGradientText';
import { SparklesText } from '../../../components/ui/SparklesText';
import { BorderBeam } from '../../../components/ui/BorderBeam';

interface MilestoneData {
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const StorySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Progressive scroll-driven line fill effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 70%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  const milestones: MilestoneData[] = [
    {
      year: '2019',
      title: 'The Spark Begins',
      description:
        'Trent Palmer starts his electrical apprenticeship on the Gold Coast, developing expertise in residential and commercial electrical systems.',
      icon: Zap,
    },
    {
      year: '2022',
      title: 'Early Solar Adoption',
      description:
        'Trent becomes an early adopter of photovoltaic solar technology in Australia, seeing the massive potential for homeowners to slash energy costs.',
      icon: Sun,
    },
    {
      year: '2023',
      title: 'Sunny Solar Founded',
      description:
        'Frustrated by dodgy telemarketers and cheap "orphaned" solar systems, Trent founds Sunny Solar with one rule: treat every home like your own family\'s.',
      icon: ShieldCheck,
    },
    {
      year: '2024',
      title: '1,000 Installs Milestone',
      description:
        'Sunny Solar hits its first thousand installations while maintaining a perfect 5-star customer rating — all done by in-house Master Electricians.',
      icon: Trophy,
    },
    {
      year: '2025',
      title: 'Battery Storage Pioneer',
      description:
        'Certified as Tesla Powerwall Master Technicians, expanding into home battery storage and hybrid solar-battery system design.',
      icon: BatteryCharging,
    },
    {
      year: '2026',
      title: '4,200+ Homes & Counting',
      description:
        'Over 14 years later, Sunny Solar remains 100% privately owned, debt-free, and proud to maintain an unblemished 4.98-star rating across Queensland.',
      icon: Award,
    },
  ];

  return (
    <section className="bg-slate-50 py-14 xs:py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Magic UI DotPattern Animated Background with Soft Radial Vignette */}
      <DotPattern
        width={24}
        height={24}
        cx={1}
        cy={1}
        cr={1.2}
        glow={true}
        className="text-amber-500/10 mask-[radial-gradient(ellipse_75%_65%_at_50%_45%,#000_25%,transparent_100%)]"
      />

      {/* Top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

      {/* Subtle ambient light glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-orange-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          {/* Eyebrow Badge with Magic UI AnimatedShinyText */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] xs:text-xs font-bold uppercase tracking-[0.2em] text-amber-700 bg-linear-to-r from-amber-50 via-white to-orange-50 border border-amber-200/80 shadow-2xs mb-4 backdrop-blur-xs hover:border-amber-300 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <AnimatedShinyText shimmerWidth={120} className="font-bold text-amber-700">
              Our Journey
            </AnimatedShinyText>
          </div>

          {/* Heading with Magic UI SparklesText & AnimatedGradientText */}
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight leading-[1.2] sm:leading-tight">
            14 Years of Doing Things{' '}
            <br className="hidden xs:inline" />
            <SparklesText
              sparklesCount={6}
              colors={{ first: '#F59E0B', second: '#EA580C' }}
              className="inline text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold"
            >
              <AnimatedGradientText
                speed={1}
                colorFrom="#D97706"
                colorTo="#EA580C"
                className="font-serif font-bold"
              >
                The Right Way
              </AnimatedGradientText>
            </SparklesText>
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          {/* Base track line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-8 w-0.5 -translate-x-1/2 bg-slate-200/90" />

          {/* Active progressive line (Desktop) */}
          <motion.div
            className="hidden md:block absolute left-1/2 top-4 bottom-8 w-1 -translate-x-1/2 bg-linear-to-b from-amber-400 via-orange-400 to-amber-500 rounded-full shadow-sm shadow-amber-400/50 origin-top"
            style={{ scaleY }}
          />

          {/* Base track line (Mobile - centered precisely on node at left: 26px) */}
          <div className="md:hidden absolute left-6.5 -translate-x-1/2 top-4 bottom-8 w-0.5 bg-slate-200/90" />

          {/* Active progressive line (Mobile) */}
          <motion.div
            className="md:hidden absolute left-6.5 -translate-x-1/2 top-4 bottom-8 w-1 bg-linear-to-b from-amber-400 via-orange-400 to-amber-500 rounded-full shadow-sm shadow-amber-400/50 origin-top"
            style={{ scaleY }}
          />

          {/* Milestones List */}
          <div className="space-y-7 sm:space-y-9 md:space-y-8">
            {milestones.map((m, idx) => {
              const isLeft = idx % 2 === 0;
              const Icon = m.icon;

              return (
                <div key={idx} className="relative">
                  {/* Desktop Layout (md+) */}
                  <div className="hidden md:grid md:grid-cols-2 md:gap-18 items-center">
                    {/* Left side */}
                    <div className="flex justify-end">
                      {isLeft && (
                        <motion.div
                          className="w-full max-w-xl group relative"
                          initial={{ opacity: 0, x: -60, scale: 0.97 }}
                          whileInView={{ opacity: 1, x: 0, scale: 1 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{
                            duration: 0.65,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          whileHover={{ y: -4, transition: { duration: 0.25 } }}
                        >
                          {/* Sliding connector line to center node */}
                          <motion.div
                            className="hidden md:block absolute -right-14 top-1/2 -translate-y-1/2 w-14 h-0.5 bg-linear-to-r from-slate-200 via-amber-300 to-amber-500 origin-left"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          />

                          <div className="group/card relative bg-white/95 rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-amber-300/80 transition-all duration-400 overflow-hidden text-right">
                            {/* Magic UI BorderBeam Animated Orbiting Light */}
                            <BorderBeam
                              size={140}
                              duration={idx % 2 === 0 ? 8 : 10}
                              reverse={idx % 2 !== 0}
                              colorFrom="#F59E0B"
                              colorTo="#F97316"
                              borderWidth={1.5}
                            />

                            {/* Radial Spotlight on Hover */}
                            <div className="pointer-events-none absolute inset-0 bg-radial from-amber-400/8 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                            <span className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-[0.2em] bg-linear-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200/80 mb-3 shadow-2xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                              {m.year}
                            </span>
                            <h4 className="relative z-10 text-lg sm:text-xl font-extrabold text-slate-900 group-hover/card:text-amber-600 transition-colors duration-300">
                              {m.title}
                            </h4>
                            <p className="relative z-10 mt-2 text-sm text-slate-600 leading-relaxed font-normal">
                              {m.description}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Central Icon Node on the spine */}
                    <motion.div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                      initial={{ scale: 0, opacity: 0, rotate: -15 }}
                      whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        type: 'spring',
                        stiffness: 320,
                        damping: 22,
                        delay: 0.1,
                      }}
                    >
                      <div className="relative group/node cursor-pointer">
                        {/* Glowing backdrop pulse */}
                        <div className="absolute inset-0 rounded-2xl bg-amber-400/25 blur-md group-hover/node:scale-130 transition-transform duration-300" />
                        <span className="animate-ping absolute -inset-1 rounded-2xl bg-amber-400/20 opacity-75 pointer-events-none" />

                        {/* Node box */}
                        <div className="relative w-12 h-12 rounded-2xl bg-white border-2 border-amber-400 text-amber-600 flex items-center justify-center shadow-md group-hover/node:scale-110 group-hover/node:border-amber-500 group-hover/node:bg-amber-50 transition-all duration-300">
                          <Icon className="w-5 h-5 stroke-[2.2] group-hover/node:rotate-6 transition-transform duration-300" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Right side */}
                    <div className="flex justify-start">
                      {!isLeft && (
                        <motion.div
                          className="w-full max-w-xl group relative"
                          initial={{ opacity: 0, x: 60, scale: 0.97 }}
                          whileInView={{ opacity: 1, x: 0, scale: 1 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{
                            duration: 0.65,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          whileHover={{ y: -4, transition: { duration: 0.25 } }}
                        >
                          {/* Sliding connector line to center node */}
                          <motion.div
                            className="hidden md:block absolute -left-14 top-1/2 -translate-y-1/2 w-14 h-0.5 bg-linear-to-l from-slate-200 via-amber-300 to-amber-500 origin-right"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          />

                          <div className="group/card relative bg-white/95 rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-amber-300/80 transition-all duration-400 overflow-hidden text-left">
                            {/* Magic UI BorderBeam Animated Orbiting Light */}
                            <BorderBeam
                              size={140}
                              duration={idx % 2 === 0 ? 8 : 10}
                              reverse={idx % 2 !== 0}
                              colorFrom="#F59E0B"
                              colorTo="#F97316"
                              borderWidth={1.5}
                            />

                            {/* Radial Spotlight on Hover */}
                            <div className="pointer-events-none absolute inset-0 bg-radial from-amber-400/8 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                            <span className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-[0.2em] bg-linear-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200/80 mb-3 shadow-2xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                              {m.year}
                            </span>
                            <h4 className="relative z-10 text-lg sm:text-xl font-extrabold text-slate-900 group-hover/card:text-amber-600 transition-colors duration-300">
                              {m.title}
                            </h4>
                            <p className="relative z-10 mt-2 text-sm text-slate-600 leading-relaxed font-normal">
                              {m.description}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Mobile Layout (< md) */}
                  <div className="md:hidden flex items-start gap-3.5 xs:gap-4.5 pl-2">
                    {/* Node on mobile spine */}
                    <motion.div
                      className="relative z-10 shrink-0 mt-3"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 22,
                        delay: 0.08,
                      }}
                    >
                      <div className="w-9 h-9 rounded-xl bg-white border-2 border-amber-400 text-amber-600 flex items-center justify-center shadow-xs">
                        <Icon className="w-4 h-4 stroke-[2.2]" />
                      </div>
                    </motion.div>

                    {/* Mobile Content Card */}
                    <motion.div
                      className="flex-1 min-w-0"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <div className="group relative bg-white/95 rounded-2xl border border-slate-200/90 p-4 xs:p-5 shadow-xs hover:shadow-md transition-all overflow-hidden">
                        {/* Mobile BorderBeam */}
                        <BorderBeam
                          size={100}
                          duration={8}
                          colorFrom="#F59E0B"
                          colorTo="#F97316"
                          borderWidth={1.5}
                        />

                        <span className="relative z-10 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] xs:text-xs font-bold uppercase tracking-[0.16em] bg-linear-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200/80 mb-2">
                          <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
                          {m.year}
                        </span>
                        <h4 className="relative z-10 text-base xs:text-lg font-bold text-slate-900 leading-snug">
                          {m.title}
                        </h4>
                        <p className="relative z-10 mt-1.5 text-xs xs:text-sm text-slate-600 leading-relaxed font-normal">
                          {m.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;

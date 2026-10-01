import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { TestimonialsCard } from '@/components/ui/testimonials-card';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AnimatedGridPattern } from '@/components/ui/AnimatedGridPattern';
import { Ripple } from '@/components/ui/Ripple';
import { Reveal } from '../components/Reveal';
import { AnimatedCard } from '../components/AnimatedCard';

interface ClaritySlide {
  id: string;
  badge: string;
  subtitle: string;
  progressionStep: string;
  title: string;
  description: string;
  highlight: string;
  image: string;
}

const claritySlides: ClaritySlide[] = [
  {
    id: '01',
    badge: ' The Right System',
    subtitle: ' What do I need?',
    progressionStep: '01 — What do I need?',
    title: 'Start With What Your Home Actually Needs.',
    description:
      'Your energy use, roof, lifestyle and future plans all matter. Sunny Solar helps you find a solar setup that makes sense for the way you use energy.',
    highlight: 'Solar • Battery • Energy Use',
    image: '/images/projects/clarity-the-right-system.jpg',
  },
  {
    id: '02',
    badge: ' Clear Choices',
    subtitle: ' What am I paying for?',
    progressionStep: '02 — What am I paying for?',
    title: 'Know What You’re Paying For.',
    description:
      'Panels, inverters, batteries, warranties and system size all affect the value of a solar quote. Know what’s included before you compare the price.',
    highlight: 'Compare • Understand • Decide',
    image: '/images/projects/clarity-clear-choices.jpg',
  },
  {
    id: '03',
    badge: ' Existing Solar',
    subtitle: ' What can I do with my existing solar?',
    progressionStep: '03 — Existing solar?',
    title: 'Already Have Solar? There’s More to Explore.',
    description:
      'Your current system may still have plenty of potential. Explore performance checks, battery options, system upgrades and ways to get more from the solar you already have.',
    highlight: 'Check • Improve • Upgrade',
    image: '/images/projects/clarity-existing-solar-battery.jpg',
  },
  {
    id: '04',
    badge: ' Real Solar Expertise',
    subtitle: ' What questions should I ask?',
    progressionStep: '04 — What questions to ask?',
    title: 'Ask the Questions That Actually Matter.',
    description:
      'How much solar do you need? Is a battery worth it? Why is your bill still high? Sunny Solar tackles the questions homeowners ask before and after installation.',
    highlight: 'Real Questions • Practical Answers',
    image: '/images/projects/clarity-real-solar-expertise-consultation.jpg',
  },
  {
    id: '05',
    badge: 'Beyond Installation',
    subtitle: ' What happens as my needs change?',
    progressionStep: '05 — Changing needs?',
    title: 'Your Energy Needs Won’t Stay the Same.',
    description:
      'A new EV, higher electricity use or changing household needs can change what your system should do. Sunny Solar can help you explore what comes next.',
    highlight: 'Battery • Upgrade • Optimise',
    image: '/images/projects/clarity-beyond-installation-ev.jpg',
  },
];

export const FeaturedProjectsSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const items = claritySlides.map(slide => ({
    id: slide.id,
    badge: slide.badge,
    subtitle: slide.subtitle,
    title: slide.title,
    description: slide.description,
    highlight: slide.highlight,
    image: slide.image,
  }));

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-linear-to-b from-[#F8FAFC] via-[#EEF4FD] to-[#F8FAFC] border-y border-slate-200/80"
    >
      {/* ── 1. Clean Architectural Photovoltaic Grid (Smooth Solar Cell Reflections) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,#000_25%,transparent_90%)]">
        <AnimatedGridPattern
          width={48}
          height={48}
          numSquares={28}
          maxOpacity={0.14}
          duration={4}
          repeatDelay={1}
          className="stroke-slate-300/70 fill-[#2B3CB8]/5 text-[#2B3CB8]/20"
        />
      </div>

      {/* ── 2. Subtle Volumetric Sunbeams / Solar Rays ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden [mask-image:radial-gradient(ellipse_75%_65%_at_65%_35%,#000_20%,transparent_85%)]">
        <motion.div
          animate={{ opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 right-1/10 w-[750px] h-[650px] -rotate-35 origin-top-right flex justify-around opacity-30"
        >
          <div className="w-16 h-full bg-linear-to-b from-amber-400/20 via-orange-300/5 to-transparent blur-xl" />
          <div className="w-28 h-full bg-linear-to-b from-blue-400/20 via-sky-300/5 to-transparent blur-2xl" />
          <div className="w-12 h-full bg-linear-to-b from-amber-300/20 via-yellow-200/5 to-transparent blur-lg" />
          <div className="w-20 h-full bg-linear-to-b from-blue-500/15 via-indigo-300/5 to-transparent blur-xl" />
        </motion.div>
      </div>

      {/* ── 3. Smooth Breathing Solar Atmospheric Blooms ── */}
      {/* Top right solar amber/orange sun bloom */}
      <motion.div
        animate={{
          scale: [1, 1.14, 1],
          x: [0, 18, 0],
          y: [0, -12, 0],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-20 right-1/12 w-[540px] h-[540px] bg-linear-to-bl from-[#EF680C]/18 via-[#FFA000]/12 to-transparent rounded-full blur-[110px] pointer-events-none"
      />

      {/* Bottom left deep clean-energy blue bloom */}
      <motion.div
        animate={{
          scale: [1, 1.16, 1],
          x: [0, -20, 0],
          y: [0, 16, 0],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-24 left-1/12 w-[560px] h-[560px] bg-linear-to-tr from-[#2B3CB8]/16 via-[#6F8EE7]/12 to-transparent rounded-full blur-[120px] pointer-events-none"
      />

      {/* Central Radiance Glow spotlighting the Interactive Carousel Stage */}
      <motion.div
        animate={{
          scale: [0.96, 1.06, 0.96],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[520px] bg-linear-to-r from-[#2B3CB8]/10 via-[#6F8EE7]/10 to-[#EF680C]/8 rounded-full blur-[90px] pointer-events-none"
      />

      {/* ── 4. Concentric Solar Energy Wave Rings ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full max-h-[600px] pointer-events-none z-0 opacity-45">
        <Ripple
          mainCircleSize={300}
          mainCircleOpacity={0.16}
          numCircles={5}
          circleColor="#2B3CB8"
        />
      </div>

      {/* ── 5. Interactive Cursor Spotlight (Illuminates grid on mouse hover) ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 hidden md:block"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(43, 60, 184, 0.08), rgba(239, 104, 12, 0.04) 45%, transparent 75%)`,
        }}
      />

      {/* ── 6. Edge blend gradient transitions to adjacent sections ── */}
      <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-white/90 via-white/40 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white/90 via-white/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header with mixed Scroll Reveal directions */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          {/* Eyebrow Pill Badge (from TOP) */}
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#ED4F11] bg-white/95 border border-orange-500/30 shadow-xs mb-4 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#ED4F11] animate-pulse" />
              <span>WHY SUNNY SOLAR</span>
            </div>
          </Reveal>

          {/* Heading (from LEFT) */}
          <Reveal direction="left" delay={0.1}>
            <h2 className="text-2xl sm:text-5xl lg:text-5xl font-extrabold text-[#18181b] tracking-tight font-serif leading-[1.15]">
              More Clarity. Better Solar Decisions. <br className="hidden sm:block" />
            </h2>
          </Reveal>

          {/* Paragraph (from RIGHT) */}
          <Reveal direction="right" delay={0.2}>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto">
              Solar can be complicated. We make the important parts easier to understand — from your system and battery to performance, savings and what comes next.
            </p>
          </Reveal>
        </div>

        {/* Progression Stepper Buttons (from BOTTOM) */}
        <Reveal direction="up" delay={0.25} className="mb-8 sm:mb-12 hidden md:flex items-center justify-center overflow-x-auto pb-2 scrollbar-none relative z-10">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 bg-white/90 backdrop-blur-md rounded-full border border-slate-200/90 shadow-sm max-w-full overflow-x-auto">
            {claritySlides.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#2B3CB8] text-white shadow-md shadow-[#2B3CB8]/30'
                      : 'text-slate-600 hover:text-[#2B3CB8] hover:bg-slate-100/80'
                  }`}
                >
                  {slide.progressionStep}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Stacked Animation Carousel with AnimatedCard */}
        <AnimatedCard direction="up" delay={0.3} className="flex justify-center w-full px-1 sm:px-0">
          <TestimonialsCard
            items={items}
            width={400}
            autoPlay={true}
            autoPlayInterval={5000}
            showNavigation={true}
            showCounter={true}
            activeIndex={currentSlide}
            onIndexChange={setCurrentSlide}
            className="w-full max-w-6xl"
          />
        </AnimatedCard>

        {/* Fixed Buttons Under Carousel */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-center">
          <Button
            to="/projects"
            variant="outline"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto bg-white/95 border-[#2B3CB8] hover:border-[#2B3CB8] hover:text-[#2B3CB8] text-[#2B3CB8] shadow-xs font-semibold"
          >
            Explore Our Projects
          </Button>
          <Button
            to="/get-started/free-assessment"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto shadow-md bg-[#2B3CB8] hover:bg-[#2433A1] text-white font-semibold border border-[#2B3CB8]"
          >
            Get Your Solar Options
          </Button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProjectsSection;

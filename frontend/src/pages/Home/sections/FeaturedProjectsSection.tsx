import React, { useState } from 'react';
import { TestimonialsCard } from '@/components/ui/testimonials-card';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FlickeringGrid } from '@/components/ui/FlickeringGrid';
import { Ripple } from '@/components/ui/Ripple';
import { Particles } from '@/components/ui/Particles';
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
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-linear-to-b from-[#F5F8FE] via-[#EDF3FC] to-[#F5F8FE] border-y border-slate-200/90">
      
      {/* ── 1. Magic UI Flickering Silicon Matrix (Solar Photovoltaic Grid) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50 [mask-image:radial-gradient(ellipse_85%_75%_at_50%_50%,#000_25%,transparent_95%)]">
        <FlickeringGrid
          className="w-full h-full"
          squareSize={4}
          gridGap={8}
          color="rgb(43, 60, 184)"
          maxOpacity={0.35}
          flickerChance={0.3}
        />
      </div>

     

      {/* ── 3. Magic UI Interactive Ambient Energy Particles ── */}
      <Particles
        className="absolute inset-0 z-0 opacity-45 pointer-events-none"
        quantity={25}
        color="#2B3CB8"
        size={0.7}
      />

      {/* ── 4. Vivid Atmospheric Solar Radiance Glows ── */}
      {/* Top right solar amber/orange sun bloom */}
      <div className="absolute -top-12 right-1/10 w-[500px] h-[500px] bg-linear-to-bl from-[#EF680C]/20 via-[#FFA000]/12 to-transparent rounded-full blur-[110px] pointer-events-none" />

      {/* Bottom left deep clean-energy blue bloom */}
      <div className="absolute -bottom-20 left-1/12 w-[520px] h-[520px] bg-linear-to-tr from-[#2B3CB8]/18 via-[#6F8EE7]/12 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* Central Radiance Glow spotlighting the Interactive Carousel Stage */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-linear-to-r from-[#2B3CB8]/10 via-[#6F8EE7]/8 to-[#EF680C]/8 rounded-full blur-[90px] pointer-events-none" />

      {/* ── 5. Edge blend gradient transitions to adjacent sections ── */}
      <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-white/80 via-white/40 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white/80 via-white/40 to-transparent pointer-events-none" />

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

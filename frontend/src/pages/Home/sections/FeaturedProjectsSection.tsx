import React, { useState } from 'react';
import { TestimonialsCard } from '@/components/ui/testimonials-card';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

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
    <section className="py-12 lg:py-16 bg-slate-50 relative overflow-hidden border-t border-slate-200/70">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-0 w-125 h-125 bg-[#2B3CB8]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-125 h-125 bg-[#2B3CB8]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-125 h-125 bg-[#2B3CB8]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10">
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#ED4F11] bg-[#F5F7FD] border border-[#D1DCF8] shadow-2xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#ED4F11] animate-pulse" />
            <span>WHY SUNNY SOLAR</span>
          </div>

          <h2 className="text-2xl sm:text-5xl lg:text-5xl font-extrabold text-[#18181b] tracking-tight font-serif leading-[1.15]">
            More Clarity. Better Solar Decisions. <br className="hidden sm:block" />
         
          </h2>

          <p className="mt-4 text-base sm:text-lg  text-slate-600 leading-relaxed max-w-6xl mx-auto">
            Solar can be complicated. We make the important parts easier to understand — from your system and battery to performance, savings and what comes next.
          </p>
        </div>

        {/* Progression Stepper Buttons */}
        <div className="mb-8 sm:mb-10 hidden md:flex items-center justify-center overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 bg-slate-200/60 backdrop-blur-xs rounded-full border border-slate-200/80 max-w-full overflow-x-auto">
            {claritySlides.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${isActive
                      ? 'bg-[#ED4F11] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                    }`}
                >
                  {slide.progressionStep}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stacked Animation Carousel with Navigation: ← 01 / 05 → */}
        <div className="flex justify-center w-full px-1 sm:px-0">
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
        </div>

        {/* Fixed Buttons Under Carousel */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-center">
          <Button
            to="/projects"
            variant="outline"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto bg-white border-[#ED4F11] hover:border-[#2B3CB8] hover:text-[#2B3CB8] text-[#ED4F11] shadow-xs font-semibold"
          >
            Explore Our Projects
          </Button>
          <Button
            to="/get-started/free-assessment"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto shadow-md bg-[#ED4F11] hover:bg-[#ED4F11] text-white font-semibold border border-[#ED4F11]"
          >
            Get Your Solar Options
          </Button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProjectsSection;

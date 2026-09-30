import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  ArrowRight,
  Phone,
  Sun,
  Sparkles,

} from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface SlideItem {
  id: number;
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  metric: {
    label: string;
    value: string;
  };
}

const SLIDES: SlideItem[] = [
  {
    id: 1,
    badge: 'Clean Energy Vision',
    title: 'The vision behind the flow',
    description:
      'We believe clean energy should empower every home without compromise. From custom rooftop arrays to smart battery storage, Sunny Solar bridges performance and savings to power your future.',
    buttonText: 'About Sunny Solar',
    buttonLink: '/about',
    image: '/images/about/sunny-solar-director-consultation.png',
    metric: {
      label: 'Leadership & Vision',
      value: '100% QLD Owned',
    },
  },

  {
    id: 3,
    badge: 'Master Electrician Quality',
    title: 'Built to outperform Queensland heat',
    description:
      'Tier-1 bifacial panels, high-efficiency hybrid inverters, and cyclone-rated mounting hardware installed by licensed SAA master electricians with zero roof-leak guarantee.',
    buttonText: 'View Our Systems',
    buttonLink: '/solar/systems',
    image: '/images/projects/sunny-solar-residential-dusk.png',
    metric: {
      label: 'Performance Guarantee',
      value: '25-Year Warranty',
    },
  },
  {
    id: 4,
    badge: 'Proven Track Record',
    title: 'Real energy savings for 4,200+ homes',
    description:
      'Serving Brisbane, Gold Coast, and the Sunshine Coast with transparent advice, zero pressure, and customized 3D solar designs that maximize annual household return.',
    buttonText: 'Calculate Your Savings',
    buttonLink: '/calculators/solar-savings',
    image: '/images/projects/dji-aerial-solar.webp',
    metric: {
      label: 'Estimated Annual Return',
      value: '$2,840 / year',
    },
  },
];

const SLATS_COUNT = 7; // Number of horizontal shutter slats for the WaveRun blind effect
const SLIDE_DURATION = 5000; // 5 seconds per slide

export const ServicesOverviewSection: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [transitionKey, setTransitionKey] = useState(0);

  const activeSlide = SLIDES[currentSlideIndex];

  // Auto-slide rotation timer
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
      setTransitionKey((k) => k + 1);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, currentSlideIndex]);

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
    setTransitionKey((k) => k + 1);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setTransitionKey((k) => k + 1);
  };

  const handleGoTo = (idx: number) => {
    if (idx === currentSlideIndex) return;
    setCurrentSlideIndex(idx);
    setTransitionKey((k) => k + 1);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
      {/* Subtle Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#2B3CB8]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-120 h-120 bg-[#2B3CB8]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Left Column: Story & Information */}
          <div className="order-2 lg:order-1 lg:col-span-6 space-y-3">
            {/* Eyebrow Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#2B3CB8] bg-[#F5F7FD] border border-[#ED4F11] shadow-2xs">

              <Sun className="w-3.5 h-3.5 text-[#ED4F11]" />
              <span>About Sunny Solar • Est. 2011</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-2xl sm:text-4xl lg:text-4xl text-center md:text-left font-serif font-bold text-[#18181b] tracking-tight leading-[1.15]">
              Solar Is More Than Panels. <br />
              <span className="text-[#2B3CB8]">
                It’s About Making the Right Energy Decision.
              </span>
            </h2>

            {/* Narrative Story */}
            <div className="space-y-2 text-slate-600 text-justify text-base leading-relaxed">
              <p>
                Solar is a major investment. Sunny Solar believes you should understand your options before you commit.
              </p>
              <p className="text-justify">
                From choosing the right solar system and battery to understanding your savings and existing system performance, we give you practical advice built around your energy needs.
              </p>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-[#EF680C] flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#2B3CB8]/10 text-[#ED4F11] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">25-Year Warranty</h4>
                  <p className="text-[11px] text-slate-500">Tier-1 certified panels & SAA master installers</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F5F7FD] border border-[#EF680C] flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#2B3CB8] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0C123E]">Tailored Solar Engineering</h4>
                  <p className="text-[11px] text-slate-600">3D roof modeling for peak Queensland generation</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <Button
                to="/about"
                variant="primary"
                size="md"
                className="w-full sm:w-auto rounded-lg shadow-lg shadow-[#2B3CB8]/20 bg-[#d35b0c] hover:bg-[#1D2984] text-white border-0 font-bold px-6 py-3 transition-all duration-300 hover:shadow-[#2B3CB8]/35 hover:-translate-y-0.5"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Your Solar Options
              </Button>

              <a
                href="tel:1300030479"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-sm shadow-lg shadow-[#16a34a]/30 hover:shadow-xl hover:shadow-[#16a34a]/40 border border-[#22c55e]/40 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center text-white">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>Call Us: <span className="font-extrabold text-white">1300 030 479</span></span>
              </a>
            </div>


          </div>

          {/* Right Column: WaveRun Media Style Horizontal Shutter / Blind Animated Card */}
          <div className="order-1 lg:order-2 lg:col-span-6 relative flex items-center justify-center py-4 sm:py-6">

            {/* Luminous Ambient Halo */}
            <div className="absolute w-72 sm:w-96 h-72 sm:h-96  -z-10 pointer-events-none" />

            {/* Main WaveRun Style Showcase Card Container */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-full h-125 xs:h-[540px] sm:h-125 lg:h-130  overflow-hidden relative shadow-[0_25px_70px_-15px_rgba(12,18,62,1.45),0_0_0_1px_rgba(255,255,255,0.15)] bg-slate-950 flex flex-col justify-between group  "
            >
              {/* ──────────────────────────────────────────────────────── */}
              {/* 1. BACKGROUND IMAGE WITH KEN BURNS SMOOTH SCALING        */}
              {/* ──────────────────────────────────────────────────────── */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-white">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`slide-img-${activeSlide.id}`}
                    src={activeSlide.image}
                    alt={activeSlide.title}
                    initial={{ scale: 1.08, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0.6 }}
                    transition={{
                      scale: { duration: 6, ease: 'easeOut' },
                      opacity: { duration: 0.5 },
                    }}
                    className="w-full h-full object-cover object-center"
                  />
                </AnimatePresence>


              </div>

              {/* ──────────────────────────────────────────────────────── */}
              {/* 2. THE SIGNATURE WAVERUN HORIZONTAL SHUTTER / BLIND SLATS */}
              {/* ──────────────────────────────────────────────────────── */}
              <div className="absolute inset-0 z-20 pointer-events-none flex flex-col overflow-hidden">
                {Array.from({ length: SLATS_COUNT }).map((_, i) => (
                  <motion.div
                    key={`slat-${transitionKey}-${i}`}
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.065, // Staggered blind opening effect
                      ease: [0.65, 0, 0.35, 1],
                    }}
                    style={{ originY: 0.5 }}
                    className="flex-1 w-full bg-white border-b border-black/10"
                  />
                ))}
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesOverviewSection;

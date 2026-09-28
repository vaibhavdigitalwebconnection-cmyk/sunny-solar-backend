import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface TestimonialSlide {
  id: string;
  author: string;
  location: string;
  timeAgo: string;
  rating: number;
  title: string;
  comment: string;
  systemSummary: string;
  keyMetric: string;
  avatar: string;
}

const testimonials: TestimonialSlide[] = [
  {
    id: 't-1',
    author: 'Brett Thomson',
    location: 'Broadbeach Waters, Gold Coast',
    timeAgo: '2 days ago',
    rating: 5,
    title: 'Zero sales pressure & spotless installation',
    comment:
      'Trent personally inspected our roof cavity and designed the perfect system. Power bill dropped from $940 to $22 last month! Cleanest tradesmen we have ever had on site, and their post-install handover was second to none.',
    systemSummary: '10.5kW REC Solar + Tesla Powerwall 3',
    keyMetric: '$940 → $22/mo',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 't-2',
    author: 'Claire & Patrick Wilson',
    location: 'Camp Hill, Brisbane',
    timeAgo: '4 days ago',
    rating: 5,
    title: 'Cut our power bill by 82% immediately',
    comment:
      'With 3 teenagers and ducted A/C in summer heatwaves, our solar system slashed our electricity bills by 82% from day one. Communication with the team was exceptional from quote through to Energex grid approval.',
    systemSummary: '13.2kW AIKO All-Black + Fronius',
    keyMetric: '82% Bill Cut',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 't-3',
    author: 'Mark Henderson',
    location: 'Currumbin Valley, QLD',
    timeAgo: '1 week ago',
    rating: 5,
    title: 'Flawless battery retrofit to existing solar',
    comment:
      'Added a Sungrow battery to our 6-year-old system. Entire rebate paperwork was handled seamlessly by their office team. Now completely blackout-proof when severe storms pass through our hinterland property.',
    systemSummary: '9.6kWh Sungrow SBR Battery',
    keyMetric: '0% Evening Grid Draw',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 't-4',
    author: 'Sophie Martin',
    location: 'North Lakes, Brisbane',
    timeAgo: '1 week ago',
    rating: 5,
    title: 'Found a burnt isolator missed by others',
    comment:
      'Their technician found a hazardous degraded DC isolator with thermal imaging that two previous electricians overlooked. Safely replaced and restored to 100% capacity! Truly honest, master-level tradesmen.',
    systemSummary: '24-Point Health Check & Repair',
    keyMetric: '100% Restored',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 't-5',
    author: 'Graham Ross',
    location: 'Helensvale, Gold Coast',
    timeAgo: '2 weeks ago',
    rating: 5,
    title: 'Doubled our output with modern panels',
    comment:
      'Replaced an old 2013 inverter with modern high-efficiency equipment. Double the power output for a fraction of the roof space. Highly recommend Sunny Solar for anyone looking for honest advice.',
    systemSummary: '8.8kW Trina Vertex + Sungrow Hybrid',
    keyMetric: '2x Daily Output',
    avatar:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 't-6',
    author: 'Nadia El-Sayed',
    location: 'New Farm, Brisbane',
    timeAgo: '3 weeks ago',
    rating: 5,
    title: 'True whole-home blackout backup',
    comment:
      'During recent storm blackouts while our whole street was pitch black, our lights, refrigeration and Wi-Fi stayed on seamlessly without a flicker. Best investment we have made for our Queensland home.',
    systemSummary: '11.4kW Solar + Tesla Powerwall 3',
    keyMetric: 'Zero Blackout Downtime',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 't-7',
    author: 'Darren S.',
    location: 'Coomera Commercial District',
    timeAgo: '1 month ago',
    rating: 5,
    title: 'Commercial connection with zero downtime',
    comment:
      'Warehouse installation executed over a planned weekend. Immediate demand charge reduction and effortless Energex approval. Prompt, professional, and zero disruption to our daily logistics operations.',
    systemSummary: '66kW Commercial Warehouse Solar',
    keyMetric: '$1,500+ Saved Monthly',
    avatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 't-8',
    author: 'David & Gillian M.',
    location: 'Tamborine Mountain Acreage',
    timeAgo: '1 month ago',
    rating: 5,
    title: '100% self-sufficient mountain acreage',
    comment:
      'Our neighbors lose power for days during mountain storms. We do not even notice the lights flicker. Outstanding craftsmanship, genuine long-term aftercare, and our bills are practically zero.',
    systemSummary: '19.8kW Ground Array + BYD Battery',
    keyMetric: '96% Self-Sufficiency',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
  },
];

export const TestimonialsSliderSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Next Slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= testimonials.length - 1 ? 0 : prev + 1));
  }, []);

  // Previous Slide
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? testimonials.length - 1 : prev - 1));
  }, []);

  // Auto sliding every 6 seconds with hover pause
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) {
      nextSlide();
    } else if (diff < -40) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setTimeout(() => setIsPaused(false), 4000);
  };

  const activeTestimonial = testimonials[currentIndex];

  return (
    <section
      className="py-14 sm:py-10 lg:py-14 bg-white relative overflow-hidden text-slate-900 border-t border-slate-200/80"
      aria-label="Customer Testimonials"
    >
      {/* Scoped CSS keyframe for running animated border and wireframe rotation */}
      <style>{`
        @keyframes borderBeamSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-border-beam {
          animation: borderBeamSpin 6s linear infinite;
        }
        @keyframes wireframeSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-wireframe-spin {
          animation: wireframeSpin 80s linear infinite;
        }
      `}</style>

      {/* Dynamic Ambient Background Glows tailored for crisp white background */}
      <div className="absolute top-1/4 left-10 w-125 h-125 bg-[#EF680C]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-125 h-125 bg-[#2B3CB8]/6 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-87.5 bg-[#FFA000]/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ══════════════════════════════════════════════════════════════
            TOP HEADER ROW (Eyebrow + Title)
           ══════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-center text-center gap-6 sm:gap-8 mb-10 sm:mb-14">
          <div className="max-w-3xl">
            {/* Eyebrow badge with sparkle */}
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#EF680C] mb-3">
              <span className="text-[#FFA000]">✦</span> OUR TESTIMONIALS
            </div>

            {/* Headline with Brand Gradient Highlight */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Hear what others say <br className="hidden sm:inline" />
              about{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#EF680C] via-[#FF7700] to-[#2B3CB8]">
                partnering with us
              </span>
            </h2>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            MAIN CONTENT GRID (4.8 Rating on left, Hero Card on right)
           ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* LEFT COLUMN: 3D Wireframe Orb + Doodle Arrow + Big 4.8 Rating */}
          <div className="lg:col-span-4 relative flex flex-col items-center lg:items-start text-center lg:text-left py-4 sm:py-6">

            {/* 3D Geometric Wireframe Mesh in Background */}
            <div className="absolute top-1/2 left-1/2 lg:left-1/3 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-88 sm:h-88 pointer-events-none opacity-35">
              <svg viewBox="0 0 300 300" className="w-full h-full animate-wireframe-spin">
                <g stroke="#EF680C" strokeWidth="0.8" fill="none">
                  {/* Latitude ellipses */}
                  <ellipse cx="150" cy="150" rx="130" ry="130" />
                  <ellipse cx="150" cy="150" rx="130" ry="85" />
                  <ellipse cx="150" cy="150" rx="130" ry="45" />
                  <ellipse cx="150" cy="150" rx="130" ry="18" />
                  {/* Longitude ellipses */}
                  <ellipse cx="150" cy="150" rx="85" ry="130" />
                  <ellipse cx="150" cy="150" rx="45" ry="130" />
                  <ellipse cx="150" cy="150" rx="18" ry="130" />
                  {/* Dynamic diagonal orbits */}
                  <ellipse cx="150" cy="150" rx="125" ry="65" transform="rotate(45 150 150)" stroke="#FFA000" />
                  <ellipse cx="150" cy="150" rx="125" ry="65" transform="rotate(-45 150 150)" stroke="#2B3CB8" />
                </g>
              </svg>
            </div>


            {/* Huge Monumental 4.8 Rating */}
            <div className="relative z-10 text-6xl sm:text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-none  ">
              4.8
            </div>

            {/* 5 Stars directly under rating */}
            <div className="relative z-10 flex items-center gap-1.5 mt-3.5 text-[#EF680C]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-[#EF680C] drop-shadow-xs"
                />
              ))}
            </div>

            {/* Subtitle description below 4.8 */}
            <p className="relative z-10 text-xs sm:text-sm text-slate-600 font-medium mt-3.5 max-w-60 leading-relaxed">
              Verified customer satisfaction across 72,000+ Queensland installations.
            </p>
          </div>

          {/* RIGHT COLUMN: Big Featured Card with RUNNING ANIMATED BORDER */}
          <div className="lg:col-span-8">
            <div
              className="relative p-[2.5px] rounded-xl overflow-hidden group shadow-[0_12px_45px_rgba(43,60,184,0.08),0_4px_20px_rgba(239,104,12,0.08)]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* ══════════════════════════════════════════════════════════════
                  RUNNING ANIMATED BORDER BEAM (From Image 2 reference)
                  Uses Sunny Solar Logo Colors: #EF680C, #FFA000, #2B3CB8
                 ══════════════════════════════════════════════════════════════ */}
              {/* Outer diffused glowing halo */}
              <div
                className="absolute inset-[-150%] animate-border-beam blur-lg opacity-40 pointer-events-none"
                style={{
                  background:
                    'conic-gradient(from 0deg, transparent 0deg, transparent 180deg, #2B3CB8 240deg, #FFA000 300deg, #EF680C 360deg)',
                }}
              />

              {/* Crisp perimeter beam running around the rounded border */}
              <div
                className="absolute inset-[-150%] animate-border-beam pointer-events-none"
                style={{
                  background:
                    'conic-gradient(from 0deg, transparent 0deg, transparent 180deg, #2B3CB8 240deg, #FFA000 300deg, #EF680C 360deg)',
                }}
              />

              {/* Card Interior Surface - Clean White Glassmorphism */}
              <div className="relative z-10 bg-white/95 backdrop-blur-2xl rounded-xl p-6 sm:p-6 lg:p-8 flex flex-col justify-between min-h-90 sm:min-h-97.5 border border-slate-400/90 shadow-xs">

                {/* Large Background Decorative Quotation Mark Watermark */}
                <div className="absolute top-4 left-6 text-7xl sm:text-8xl lg:text-9xl font-serif text-slate-200/60   pointer-events-none leading-none">
                  “
                </div>

                {/* Top Section of Card: 5 Stars */}
                <div className="relative z-10 flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-1.5 text-[#EF680C]">
                    {[...Array(activeTestimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-[#EF680C] drop-shadow-xs"
                      />
                    ))}
                  </div>

                  {/* System Key Metric Pill */}
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#EF680C]/10 text-[#EF680C] border border-[#EF680C]/20 shadow-xs">
                    {activeTestimonial.keyMetric}
                  </span>
                </div>

                {/* Middle: Testimonial Quote Body with Smooth Motion Transition */}
                <div className="relative z-10 my-auto py-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    >
                      <p className="text-base sm:text-lg lg:text-xl text-slate-800 font-normal italic leading-relaxed sm:leading-loose">
                        &ldquo;{activeTestimonial.comment}&rdquo;
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom Row: Author Avatar + Name on left, Arrow Controls on right */}
                <div className="relative z-10 mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-4">

                  {/* Author Information */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Customer Photo Avatar with Glowing Ring */}
                    <div className="relative shrink-0">
                      <img
                        src={activeTestimonial.avatar}
                        alt={activeTestimonial.author}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-[#EF680C] ring-offset-2 ring-offset-white shadow-xs"
                        loading="lazy"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#EF680C] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                        ✓
                      </div>
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-slate-900 font-bold text-sm sm:text-base lg:text-lg tracking-tight truncate">
                        {activeTestimonial.author}
                      </h4>
                      <p className="text-slate-500 text-xs sm:text-sm font-medium truncate">
                        {activeTestimonial.location}
                      </p>
                    </div>
                  </div>

                  {/* Circular Navigation Arrow Buttons (adapted for light theme) */}
                  <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                    <button
                      type="button"
                      onClick={prevSlide}
                      aria-label="Previous testimonial"
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-100 hover:bg-[#EF680C] text-slate-700 hover:text-white border border-slate-200 hover:border-[#EF680C] flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={nextSlide}
                      aria-label="Next testimonial"
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-100 hover:bg-[#EF680C] text-slate-700 hover:text-white border border-slate-200 hover:border-[#EF680C] flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TestimonialsSliderSection;

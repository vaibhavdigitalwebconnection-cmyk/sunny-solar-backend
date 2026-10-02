import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface ProjectSlide {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  systemSize: string;
  panels: string;
  inverter: string;
  annualSavings: string;
  paybackPeriod: string;
  selfConsumption: string;
  image: string;
  quote: string;
  clientName: string;
  clientSuburb: string;
  rating: number;
  highlightTag: string;
}

const projects: ProjectSlide[] = [
  {
    id: 'proj-1',
    slug: 'coastal-contemporary-mermaid-beach',
    title: 'Coastal High-Yield 14.25kW Rooftop Solar',
    category: 'Residential Solar',
    location: 'Mermaid Beach, Gold Coast',
    systemSize: '14.25 kW',
    panels: '30x REC Alpha Pure-R 475W All-Black Panels',
    inverter: 'High-Efficiency Smart Solar Inverter',
    annualSavings: '$3,850 / yr',
    paybackPeriod: '3.6 Years',
    selfConsumption: '94%',
    image: '/images/projects/project-rooftop-array.webp',
    quote:
      'Trent and the Sunny Solar crew were exceptional. We cut our quarterly power bill from $1,280 down to an $85 credit in summer. The all-black panels look incredible on our roofline.',
    clientName: 'Marcus & Elena V.',
    clientSuburb: 'Mermaid Beach',
    rating: 5,
    highlightTag: '$1,280 → $85 Credit',
  },
  {
    id: 'proj-2',
    slug: 'broadbeach-waters-luxury-solar-battery',
    title: 'Waterfront Villa 16.63kW Architectural Solar',
    category: 'Residential Solar',
    location: 'Broadbeach Waters, QLD',
    systemSize: '16.63 kW',
    panels: '35x REC Alpha Pure-RX 475W All-Black',
    inverter: 'Decoupled Microinverter Architecture',
    annualSavings: '$4,650 / yr',
    paybackPeriod: '4.1 Years',
    selfConsumption: '98%',
    image: '/images/projects/home-solar-brisbane.webp',
    quote:
      'Zero electricity bills even with the air conditioning running non-stop in January. The black-on-black panel finish looks like an architectural feature on our slate roof.',
    clientName: 'Greg & Fiona B.',
    clientSuburb: 'Broadbeach Waters',
    rating: 5,
    highlightTag: '98% Self-Sufficient',
  },
  {
    id: 'proj-3',
    slug: 'brisbane-family-home-paddington',
    title: 'Heritage Cottage 9.5kW Precision Solar Array',
    category: 'Residential Solar',
    location: 'Paddington, Brisbane',
    systemSize: '9.5 kW',
    panels: '20x AIKO Neostar 2S+ 475W N-Type ABC',
    inverter: 'Smart Hybrid Solar Inverter',
    annualSavings: '$2,640 / yr',
    paybackPeriod: '3.8 Years',
    selfConsumption: '89%',
    image: '/images/projects/pv-solar-thermal.webp',
    quote:
      'Other companies told us our heritage roof was too steep or split. Sunny Solar took the time to 3D model our roofline and found the perfect panel arrangement. Outstanding tradesmanship!',
    clientName: 'Sarah K.',
    clientSuburb: 'Paddington, Brisbane',
    rating: 5,
    highlightTag: 'Heritage Approved',
  },
  {
    id: 'proj-4',
    slug: 'currumbin-valley-residential-solar',
    title: 'Nationwide Suburban 10.4kW Rooftop Solar',
    category: 'Residential Solar',
    location: 'Currumbin Valley, QLD',
    systemSize: '10.4 kW',
    panels: 'Tier-1 Monocrystalline High-Yield Panels',
    inverter: 'High-Efficiency Clean Energy Inverter',
    annualSavings: '$3,150 / yr',
    paybackPeriod: '3.2 Years',
    selfConsumption: '95%',
    image: '/images/projects/sunny-solar-residential-dusk.webp',
    quote:
      'The solar panels look magnificent on our roofline and generate amazing power right through dusk. Entire rebate paperwork was handled seamlessly by their office team.',
    clientName: 'Mark Henderson',
    clientSuburb: 'Currumbin Valley',
    rating: 5,
    highlightTag: '$3,150 / yr Saved',
  },
  {
    id: 'proj-5',
    slug: 'tamborine-mountain-acreage-solar',
    title: 'Mountain Homestead 21.38kW High-Yield Solar',
    category: 'Acreage Solar',
    location: 'Tamborine Mountain, QLD',
    systemSize: '21.38 kW',
    panels: '45x Jinko Tiger Neo 475W Dual-Glass Bifacial',
    inverter: 'Dual European 3-Phase Inverters',
    annualSavings: '$5,900 / yr',
    paybackPeriod: '3.4 Years',
    selfConsumption: '96%',
    image: '/images/projects/homestead-overview.webp',
    quote:
      'When storms knock out mountain power lines, our neighbors lose power for days. We do not even notice the lights flicker. Outstanding craftsmanship and genuine long-term aftercare.',
    clientName: 'David & Gillian M.',
    clientSuburb: 'Tamborine Mountain',
    rating: 5,
    highlightTag: '100% Storm Resilient',
  },
  {
    id: 'proj-6',
    slug: 'brisbane-colorbond-solar',
    title: 'Modern Colorbond Roof 10.8kW Solar Array',
    category: 'Residential Solar',
    location: 'Camp Hill, Brisbane',
    systemSize: '10.8 kW',
    panels: '25x High-Efficiency Monocrystalline Panels',
    inverter: 'European Premium String Inverter',
    annualSavings: '$2,950 / yr',
    paybackPeriod: '3.5 Years',
    selfConsumption: '92%',
    image: '/images/projects/home-solar-brisbane.webp',
    quote:
      'Installed on our dark Colorbond corrugated roof with clean flush clamps. Generates massive power all day long even during partly cloudy Nationwide days. Zero issues.',
    clientName: 'Lachlan McKay',
    clientSuburb: 'Camp Hill, Brisbane',
    rating: 5,
    highlightTag: '82% Power Bill Cut',
  },
];

export const TestimonialsSliderSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Next Slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= projects.length - 1 ? 0 : prev + 1));
  }, []);

  // Previous Slide
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? projects.length - 1 : prev - 1));
  }, []);

  // Auto sliding every 6.5 seconds with hover pause
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6500);
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

  const activeProject = projects[currentIndex];

  return (
    <section
      className="py-14 sm:py-16 lg:py-14 bg-white relative overflow-hidden text-slate-900 border-t border-slate-200/80"
      aria-label="Featured Solar Projects"
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
        <div className="flex flex-col lg:flex-row lg:items-end justify-center text-center gap-4 sm:gap-6 mb-10 sm:mb-12">
          <div className="max-w-4xl">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#EF680C] mb-3">
              <span className="text-[#FFA000]">✦</span> FEATURED REAL-WORLD PROJECTS
            </div>

            {/* Headline with Brand Gradient Highlight */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Proven Performance on{' '} <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#EF680C] via-[#FF7700] to-[#2B3CB8]">
                Australia Homes.
              </span>
            </h2>

            <p className="mt-3 text-xs sm:text-base text-slate-600 max-w-4xl mx-auto">
              Explore genuine rooftop solar panel installations completed by accredited Master Electricians across Nationwide , Gold Coast, and the Sunshine Coast.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            MAIN CONTENT GRID (Quick Selector on left, Hero Project Card on right)
           ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

          {/* LEFT COLUMN: 3D Wireframe Orb + Key Stats + Interactive Project Selector */}
          <div className="lg:col-span-4 relative flex flex-col justify-between items-center lg:items-start text-center lg:text-left py-4 sm:py-6 bg-slate-50/70 rounded-2xl p-5 sm:p-6 border border-slate-200/70">

            {/* 3D Geometric Wireframe Mesh in Background */}
            <div className="absolute top-1/2 left-1/2 lg:left-1/3 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-88 sm:h-88 pointer-events-none opacity-25">
              <svg viewBox="0 0 300 300" className="w-full h-full animate-wireframe-spin">
                <g stroke="#EF680C" strokeWidth="0.8" fill="none">
                  <ellipse cx="150" cy="150" rx="130" ry="130" />
                  <ellipse cx="150" cy="150" rx="130" ry="85" />
                  <ellipse cx="150" cy="150" rx="130" ry="45" />
                  <ellipse cx="150" cy="150" rx="130" ry="18" />
                  <ellipse cx="150" cy="150" rx="85" ry="130" />
                  <ellipse cx="150" cy="150" rx="45" ry="130" />
                  <ellipse cx="150" cy="150" rx="18" ry="130" />
                  <ellipse cx="150" cy="150" rx="125" ry="65" transform="rotate(45 150 150)" stroke="#FFA000" />
                  <ellipse cx="150" cy="150" rx="125" ry="65" transform="rotate(-45 150 150)" stroke="#2B3CB8" />
                </g>
              </svg>
            </div>

            {/* Interactive Project Quick Switcher */}
            <div className="relative z-10 w-full space-y-2 text-left">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 px-1">
                Select project
              </div>
              {projects.map((proj, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left text-xs ${isActive
                      ? 'bg-slate-900 text-white font-bold shadow-md shadow-slate-900/15 ring-1 ring-white/10'
                      : 'bg-white hover:bg-slate-100 text-slate-700 font-medium border border-slate-200/80 shadow-2xs'
                      }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${isActive ? 'bg-[#EF680C]' : 'bg-slate-300'
                          }`}
                      />
                      <span className="truncate">{proj.location.split(',')[0]}</span>
                    </div>
                    <span
                      className={`text-[11px] font-bold shrink-0 ml-2 ${isActive ? 'text-[#FFA000]' : 'text-slate-500'
                        }`}
                    >
                      {proj.systemSize}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Left Column Bottom Assurance */}
            <div className="relative z-10 w-full pt-3 mt-3 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2B3CB8]" />
                SAA Approved
              </span>
              <span className="font-bold text-[#EF680C]">Master Electricians</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Big Featured Card with RUNNING ANIMATED BORDER */}
          <div className="lg:col-span-8 flex flex-col">
            <div
              className="relative p-[2.5px] rounded-xl overflow-hidden group shadow-[0_12px_45px_rgba(43,60,184,0.08),0_4px_20px_rgba(239,104,12,0.08)] h-full flex flex-col"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* ══════════════════════════════════════════════════════════════
                  RUNNING ANIMATED BORDER BEAM
                  Uses Sunny Solar Logo Colors: #EF680C, #FFA000, #2B3CB8
                 ══════════════════════════════════════════════════════════════ */}
              <div
                className="absolute inset-[-150%] animate-border-beam blur-lg opacity-40 pointer-events-none"
                style={{
                  background:
                    'conic-gradient(from 0deg, transparent 0deg, transparent 180deg, #2B3CB8 240deg, #FFA000 300deg, #EF680C 360deg)',
                }}
              />

              <div
                className="absolute inset-[-150%] animate-border-beam pointer-events-none"
                style={{
                  background:
                    'conic-gradient(from 0deg, transparent 0deg, transparent 180deg, #2B3CB8 240deg, #FFA000 300deg, #EF680C 360deg)',
                }}
              />

              {/* Card Interior Surface */}
              <div className="relative z-10 bg-white/98 backdrop-blur-2xl rounded-xl p-5 sm:p-6 flex flex-col justify-between border border-slate-300/80 shadow-xs h-full">

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 items-stretch flex-1 w-full h-full"
                  >
                    {/* Visual Showcase (5 cols on md/lg) */}
                    <div className="md:col-span-5 relative rounded-xl overflow-hidden aspect-4/3 md:aspect-auto md:h-90 min-h-50 shadow-sm border border-slate-200/80 group/img bg-slate-900">
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-2 pointer-events-none">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20">
                          {activeProject.category}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#EF680C] text-white shadow-xs">
                          {activeProject.highlightTag}
                        </span>
                      </div>

                      {/* Bottom Location */}
                      <div className="absolute bottom-2.5 inset-x-2.5 flex items-center gap-1.5 text-white text-xs font-semibold drop-shadow-md pointer-events-none">
                        <MapPin className="w-3.5 h-3.5 text-[#FFA000] shrink-0" />
                        <span className="truncate">{activeProject.location}</span>
                      </div>
                    </div>

                    {/* Project Details & Performance (7 cols on md/lg) */}
                    <div className="md:col-span-7 flex flex-col min-h-100 md:h-85 justify-between space-y-3">
                      <div>
                        {/* Project Title with fixed 2-line height */}
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 tracking-tight leading-snug min-h-11 sm:min-h-13 flex items-center">
                          {activeProject.title}
                        </h3>

                        {/* Key Metrics Row */}
                        <div className="grid grid-cols-3 gap-2 mt-2.5 pt-2.5 border-t border-slate-100">
                          <div className="bg-slate-50/80 rounded-lg p-2 text-center border border-slate-100">
                            <div className="text-[10px] uppercase font-bold text-slate-400">Annual Saved</div>
                            <div className="text-xs sm:text-sm font-black text-[#EF680C] mt-0.5">
                              {activeProject.annualSavings}
                            </div>
                          </div>
                          <div className="bg-slate-50/80 rounded-lg p-2 text-center border border-slate-100">
                            <div className="text-[10px] uppercase font-bold text-slate-400">Payback</div>
                            <div className="text-xs sm:text-sm font-black text-slate-800 mt-0.5">
                              {activeProject.paybackPeriod}
                            </div>
                          </div>
                          <div className="bg-slate-50/80 rounded-lg p-2 text-center border border-slate-100">
                            <div className="text-[10px] uppercase font-bold text-slate-400">Self-Use</div>
                            <div className="text-xs sm:text-sm font-black text-emerald-600 mt-0.5">
                              {activeProject.selfConsumption}
                            </div>
                          </div>
                        </div>

                        {/* Hardware Specs line */}
                        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50/60 px-3 py-1.5 rounded-lg border border-slate-100">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="font-semibold text-slate-800">Panels:</span>
                          <span className="truncate">{activeProject.panels}</span>
                        </div>

                        {/* Homeowner Review Quote with fixed height */}
                        <div className="mt-2.5 bg-amber-50/50 rounded-xl p-3 border border-amber-200/40 min-h-22 flex flex-col justify-between">
                          <p className="text-xs sm:text-[13px] text-slate-700 italic leading-relaxed line-clamp-3 min-h-11">
                            &ldquo;{activeProject.quote}&rdquo;
                          </p>
                          <div className="mt-2 flex items-center justify-between text-[11px] pt-1">
                            <span className="font-bold text-slate-900">{activeProject.clientName}</span>
                            <span className="text-emerald-700 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Verified Customer
                            </span>
                          </div>
                        </div>
                      </div>


                    </div>
                  </motion.div>
                </AnimatePresence>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TestimonialsSliderSection;

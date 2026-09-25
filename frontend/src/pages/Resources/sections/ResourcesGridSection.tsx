import React, { useState, useRef, useCallback, useEffect } from 'react';
import { resourcesData } from '../../../data/resourcesData';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { 
  Download, 
  CheckSquare, 
  FileSpreadsheet, 
  FileCheck, 
  FileSearch, 
  ArrowRight, 
  Check, 
  Sparkles,
  BookOpen,
  Clock,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const iconMap: Record<string, any> = {
  'buying-checklist': CheckSquare,
  'buyer-guide': Download,
  'battery-decision-guide': FileSpreadsheet,
  'quote-review': FileCheck,
  'electricity-bill-review': FileSearch,
  'free-assessment': ShieldCheck,
};

const companionAssessment = {
  slug: 'free-assessment',
  title: 'Free On-Site or Aerial Roof Assessment',
  subtitle: 'Have a Senior Master Electrician Audit Your Roof and Switchboard',
  format: 'Free Audit' as const,
  pagesCount: '30-Min Consultation',
  badge: 'Recommended',
  description: 'Unsure which guide fits your home? Let our Clean Energy Council accredited engineers inspect your switchboard, roof pitch, and electrical meters for free.',
  whatInside: [
    'Complete switchboard & RCD safety check',
    '3D aerial sun and shading satellite model',
    'Custom solar + battery feasibility report',
    '100% vendor-neutral, zero sales pressure'
  ],
  ctaText: 'Book Free Assessment',
  customLink: '/get-started'
};

export const ResourcesGridSection: React.FC = () => {
  const fullList = [...Object.values(resourcesData), companionAssessment];
  const gridPages = [fullList.slice(0, 2), fullList.slice(2, 4), fullList.slice(4, 6)];

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pauseTemporarily = () => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 6000);
  };

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % gridPages.length);
  }, [gridPages.length]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? gridPages.length - 1 : prev - 1));
  }, [gridPages.length]);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
    pauseTemporarily();
  };

  // Auto-slide every 5 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    pauseTemporarily();
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) {
      nextSlide();
    } else if (diff < -40) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const renderCompactCard = (item: any) => {
    const Icon = iconMap[item.slug] || Download;
    const isAudit = item.format === 'Free Audit' || item.format === 'Interactive Review';
    const targetLink = item.customLink || `/resources/${item.slug}`;

    return (
      <div
        key={item.slug}
        className="bg-white rounded-xl border border-slate-200/90 p-2.5 xs:p-3 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden"
      >
        {/* Top Accent Gradient Bar on Hover */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-amber-400 via-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div>
          {/* Top Badge & Icon */}
          <div className="flex items-center justify-between mb-1.5 xs:mb-2 gap-1">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold shrink-0">
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded truncate max-w-21.25">
              {item.format}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xs xs:text-sm font-serif font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug line-clamp-2">
            {item.title}
          </h3>

          {/* Subtitle / Description */}
          <p className="text-[10px] xs:text-[11px] text-slate-600 leading-tight mt-1 line-clamp-2">
            {item.description}
          </p>

          {/* Quick Highlights */}
          <div className="mt-2 pt-1.5 border-t border-slate-100 space-y-1">
            {item.whatInside.slice(0, 2).map((point: string, pIdx: number) => (
              <div key={pIdx} className="flex items-start gap-1 text-[10px] text-slate-600 leading-tight">
                <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Action Footer */}
        <div className="mt-2 pt-1.5 border-t border-slate-100 flex flex-col gap-1.5">
          {item.pagesCount && (
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium truncate">
              <Clock className="w-3 h-3 shrink-0" />
              <span className="truncate">{item.pagesCount}</span>
            </div>
          )}
          <Button
            to={targetLink}
            variant={isAudit ? 'primary' : 'outline'}
            size="sm"
            fullWidth
            className="text-xs py-1.5 px-2 justify-center text-center font-bold truncate"
          >
            {item.ctaText.replace('Download ', '').replace('Request ', '').replace('Submit ', '').replace('Book ', '')}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 mb-12 sm:mb-16">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Independent Consumer Library</span>
          </div>
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-serif font-bold text-slate-950 tracking-tight leading-tight">
            Available Homeowner Guides & Tools
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
            Select a resource below to download free PDFs, vetted checklists, or claim an independent engineering audit.
          </p>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-slate-600 bg-white px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border border-slate-200 shadow-2xs self-start sm:self-auto shrink-0">
          <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
          <span>6 Verified Resources (2025 Edition)</span>
        </div>
      </div>

      {/* 1. Mobile Experience (< md): 2-Column Card Grid with Auto-Sliding & Touch Swipe */}
      <div className="block md:hidden">
        {/* Mobile Grid Category Switcher Tabs */}
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          <button
            type="button"
            onClick={() => goToSlide(0)}
            className={`py-1.5 px-1.5 rounded-xl text-[10px] xs:text-[11px] font-bold transition-all border cursor-pointer text-center truncate ${
              activeSlide === 0
                ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            ☀️ Guides (1–2)
          </button>
          <button
            type="button"
            onClick={() => goToSlide(1)}
            className={`py-1.5 px-1.5 rounded-xl text-[10px] xs:text-[11px] font-bold transition-all border cursor-pointer text-center truncate ${
              activeSlide === 1
                ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            🔋 Battery (3–4)
          </button>
          <button
            type="button"
            onClick={() => goToSlide(2)}
            className={`py-1.5 px-1.5 rounded-xl text-[10px] xs:text-[11px] font-bold transition-all border cursor-pointer text-center truncate ${
              activeSlide === 2
                ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            ⚡ Audits (5–6)
          </button>
        </div>

        {/* Sliding 2-Column Grid Window */}
        <div
          className="relative overflow-hidden rounded-2xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${activeSlide * 100}%)`,
            }}
          >
            {gridPages.map((page, pageIdx) => (
              <div key={pageIdx} className="w-full shrink-0 px-0.5">
                <div className="grid grid-cols-2 gap-2 xs:gap-2.5 sm:gap-3.5">
                  {page.map((item) => renderCompactCard(item))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Carousel Controls (Dots + Counter + Prev/Next Buttons) */}
        <div className="flex items-center justify-between mt-3 px-1">
          {/* Active indicator dots */}
          <div className="flex items-center gap-1.5">
            {gridPages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`View grid page ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeSlide === idx ? 'w-6 bg-amber-500' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          {/* Swipe indicator & arrow buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-mono font-medium text-slate-500">
              Grid {activeSlide + 1} of {gridPages.length} {activeSlide === 0 ? '(Swipe →)' : activeSlide === 2 ? '(← Swipe)' : ''}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  prevSlide();
                  pauseTemporarily();
                }}
                aria-label="Previous grid page"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-600 hover:text-slate-900 active:scale-95 transition-all cursor-pointer hover:bg-slate-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  nextSlide();
                  pauseTemporarily();
                }}
                aria-label="Next grid page"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-600 hover:text-slate-900 active:scale-95 transition-all cursor-pointer hover:bg-slate-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Running Indicator / Swipe Hint */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1 font-medium">
          <span>← Swipe left or right</span>
          <span className="flex items-center gap-1 text-emerald-600 font-mono text-[10px]">
            <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-500 animate-pulse'}`} />
            {isPaused ? 'Paused' : 'Auto-sliding'}
          </span>
          <span className="text-slate-600 font-semibold text-xs">
            {activeSlide === 0 ? 'Buyer Guides' : activeSlide === 1 ? 'Battery & Quote' : 'Bill & Site Audit'}
          </span>
        </div>
      </div>

      {/* 2. Desktop & Tablet Grid (>= md): Full 3-Column Card Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {fullList.map((item) => {
          const Icon = iconMap[item.slug] || Download;
          const isAudit = item.format === 'Free Audit' || item.format === 'Interactive Review';
          const targetLink = item.customLink || `/resources/${item.slug}`;

          return (
            <div
              key={item.slug}
              className="bg-white rounded-xl border border-slate-300 p-6 sm:p-7 shadow-sm hover:shadow-lg hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent Gradient Bar on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-amber-400 via-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <Badge variant={isAudit ? 'emerald' : 'amber'} size="sm">
                        {item.badge}
                      </Badge>
                    )}
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {item.format}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2 leading-snug">
                  {item.title}
                </h3>

                {/* Subtitle / Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* What's Inside Checklist */}
                <div className="space-y-2 pb-5 border-b border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Inside this Resource:
                  </span>
                  {item.whatInside.slice(0, 3).map((point: string, pIdx: number) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="mt-5 pt-1 flex flex-col gap-3">
                {item.pagesCount && (
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.pagesCount}</span>
                  </div>
                )}
                <Button
                  to={targetLink}
                  variant={isAudit ? 'primary' : 'outline'}
                  size="md"
                  fullWidth
                  icon={<ArrowRight className="w-4 h-4" />}
                  className={!isAudit ? 'group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 transition-all' : ''}
                >
                  {item.ctaText}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};

export default ResourcesGridSection;

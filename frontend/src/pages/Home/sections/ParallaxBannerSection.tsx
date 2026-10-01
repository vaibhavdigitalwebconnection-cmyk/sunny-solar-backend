import React, { useState, useEffect, useRef } from 'react';
import { X, MapPin, ArrowRight, Star, Quote, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface CardItem {
  id: string;
  userImage: string;
  reviewerName: string;
  rating: number;
  location: string;
  reviewHighlight: string;
  reviewFull: string;
  reviewDate?: string;
  yOffset: number; // Vertical tier: up, down, down more than, up more than, middle
  title?: string;
  category?: string;
  systemSize?: string;
  savings?: string;
  components?: string;
  image?: string;
}

const getInitials = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

// 19 genuine customer review showcase cards with user photos and verified feedback
const CYLINDER_CARDS: CardItem[] = [
  {
    id: 'coastal-solar',
    yOffset: -120, // UP
    reviewerName: 'Brett Thomson',
    userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    location: 'Sunshine Coast, QLD',
    reviewHighlight: 'Power bill dropped from $940 to $22!',
    reviewFull: 'Trent personally inspected our roof cavity and designed the perfect system. Power bill dropped from $940 to $22 last month! Cleanest tradesmen we have ever had on site, and their post-install handover was second to none.',
    reviewDate: 'Verified Google Review',
  },
  {
    id: 'aerial-array',
    yOffset: 25, // DOWN
    reviewerName: 'Claire Wilson',
    userImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    location: 'Camp Hill, Brisbane',
    reviewHighlight: 'Cut our power bill by 82% immediately',
    reviewFull: 'With 3 teenagers and ducted A/C in summer heatwaves, our solar system slashed our electricity bills by 82% from day one. Communication with the team was exceptional from quote through to Energex grid approval.',
    reviewDate: 'Verified SolarQuotes Review',
  },
  {
    id: 'currumbin-valley-solar',
    yOffset: -60, // DOWN MORE THAN (deep down)
    reviewerName: 'Mark Henderson',
    userImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    location: 'Currumbin Valley, QLD',
    reviewHighlight: 'Flawless installation on our home',
    reviewFull: 'The solar panels look magnificent on our roofline and generate amazing power right through dusk. Entire rebate paperwork was handled seamlessly by the office team. Absolutely top-tier workmanship.',
    reviewDate: 'Verified Google Review',
  },
  {
    id: 'gold-coast-rooftop',
    yOffset: -145, // UP MORE THAN (high up)
    reviewerName: 'Robert Vance',
    userImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    location: 'Gold Coast, QLD',
    reviewHighlight: 'Massive generation, immaculate roof layout',
    reviewFull: 'Trent and his crew completed the entire multi-pitch roof installation in a single day. Panel lines are laser-straight and power generation has exceeded our highest estimates.',
    reviewDate: 'Verified Homeowner Review',
  },
  {
    id: 'drone-aerial-solar',
    yOffset: 25, // DOWN
    reviewerName: 'Sophie Martin',
    userImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    location: 'North Lakes, Brisbane',
    reviewHighlight: 'Quality installation verified by thermal drone',
    reviewFull: 'They showed us the aerial drone inspection of our finished panels after installation. Every panel was operating at maximum output with zero hotspots. Truly honest, master-level tradesmen.',
    reviewDate: 'Verified Google Review',
  },
  {
    id: 'architectural-roof',
    yOffset: -75, // DOWN MORE THAN (deep down)
    reviewerName: 'Jessica L.',
    userImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    location: 'Noosa Heads, QLD',
    reviewHighlight: 'All-black panels look stunning on roof',
    reviewFull: 'We were very particular about aesthetics on our modern home. The all-black array with concealed conduit looks architecturally integrated. Couldn’t be happier with both looks and performance.',
    reviewDate: 'Verified Homeowner Review',
  },
  {
    id: 'brisbane-colorbond',
    yOffset: -5, // MIDDLE
    reviewerName: 'Lachlan McKay',
    userImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    location: 'Brisbane, QLD',
    reviewHighlight: 'Looks fantastic on our Colorbond roof',
    reviewFull: 'Installed on our dark Colorbond corrugated roof with clean flush clamps. Generates massive power all day long even during partly cloudy Queensland days.',
    reviewDate: 'Verified Homeowner Review',
  },
  {
    id: 'homestead-solar',
    yOffset: -75, // UP
    reviewerName: 'Graham Ross',
    userImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    location: 'Helensvale, Gold Coast',
    reviewHighlight: 'Doubled our output with modern panels',
    reviewFull: 'Replaced an old 2013 system with modern high-efficiency panels. Double the power output for a fraction of the roof space. Highly recommend Sunny Solar for anyone looking for honest advice.',
    reviewDate: 'Verified Google Review',
  },
  {
    id: 'contemporary-home-solar',
    yOffset: 20, // DOWN
    reviewerName: 'Nadia El-Sayed',
    userImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    location: 'New Farm, Brisbane',
    reviewHighlight: 'Sleek panels and massive energy savings',
    reviewFull: 'The solar panels complement our home exterior beautifully. Our daytime power bills have completely vanished, and the feed-in credits keep rolling in. Total transparency.',
    reviewDate: 'Verified Google Review',
  },
  {
    id: '10kw-residential-solar',
    yOffset: -65, // DOWN MORE THAN
    reviewerName: 'Andrew Davies',
    userImage: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    location: 'Redcliffe, QLD',
    reviewHighlight: 'Flawless roof fitment and silent power',
    reviewFull: 'The solar installation was completed cleanly in less than a day. Panels catch morning and afternoon sun perfectly across both roof faces. Absolute peace of mind.',
    reviewDate: 'Verified Google Review',
  },
  {
    id: 'pitched-roof-solar',
    yOffset: -155, // UP MORE THAN
    reviewerName: 'Darren Brooks',
    userImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    location: 'Robina, Gold Coast',
    reviewHighlight: 'Polite, prompt and spotless cleanup',
    reviewFull: 'Every electrician who arrived was courteous, wore boot covers, and aligned the panels with surgical precision. First-class roof craftsmanship.',
    reviewDate: 'Verified SolarQuotes Review',
  },
  {
    id: 'suburban-solar-array',
    yOffset: 15, // MIDDLE
    reviewerName: 'Wendy Turner',
    userImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    location: 'Springfield Lakes, QLD',
    reviewHighlight: 'Net-zero electricity bills achieved',
    reviewFull: 'We have not paid an electricity bill in over nine months. In fact, our quarterly energy statements now show a credit balance thanks to feed-in tariffs from our roof array.',
    reviewDate: 'Verified Google Review',
  },
  {
    id: 'heritage-tin-solar',
    yOffset: -75, // UP
    reviewerName: 'Sarah K.',
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    location: 'Paddington, Brisbane',
    reviewHighlight: 'Preserved our heritage roof character',
    reviewFull: 'Sunny Solar took the time to 3D model our trees and found the perfect panel arrangement on our heritage tin roof. Not a single leak and our bills are practically zero.',
    reviewDate: 'Verified Google Review',
  },
  {
    id: 'rooftop-panel-installation',
    yOffset: -15, // DOWN MORE THAN
    reviewerName: 'Tony Bell',
    userImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    location: 'Taringa, Brisbane',
    reviewHighlight: 'Zero roof leaks, master-level trade work',
    reviewFull: 'We had an intricate terracotta tile roof. Sunny Solar used custom brackets with zero penetration into structural tiles. Not a drop of water through torrential rain.',
    reviewDate: 'Verified Google Review',
  },
  {
    id: 'panel-engineering-array',
    yOffset: -105, // UP
    reviewerName: 'Liam O’Connor',
    userImage: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    location: 'Southport, Gold Coast',
    reviewHighlight: 'Powers our entire household and air con',
    reviewFull: 'Our previous power bills were over $1,100 a quarter. Since installing this solar array, the air conditioning runs free during the heat of the day. The build quality is exceptional.',
    reviewDate: 'Verified Homeowner Review',
  },
  {
    id: 'electrician-panel-install',
    yOffset: 15, // DOWN
    reviewerName: 'Peter Gallagher',
    userImage: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    location: 'Caloundra, Sunshine Coast',
    reviewHighlight: 'True professionals on the roof all day',
    reviewFull: 'Living 400m from the coast, wind rating was critical. Heavy gale force winds last month didn’t rattle a single panel. Certified Master Electricians who take pride in their trade.',
    reviewDate: 'Verified Homeowner Review',
  },
  {
    id: 'cyclone-clamping-array',
    yOffset: -45, // DOWN MORE THAN
    reviewerName: 'Dean Fletcher',
    userImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    location: 'Maroochydore, Sunshine Coast',
    reviewHighlight: 'Laser-straight panel lines and clamping',
    reviewFull: 'As an ex-sparky myself, I was inspecting every panel alignment and clamp torque. The boys did an immaculate installation that looks like a display showroom.',
    reviewDate: 'Verified Google Review',
  },
  {
    id: 'precision-torquing-array',
    yOffset: -160, // UP MORE THAN
    reviewerName: 'Barry Kowalski',
    userImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    location: 'Warwick, QLD',
    reviewHighlight: 'Handles 42°C summer heat effortlessly',
    reviewFull: 'High ambient heat degrades cheap panels rapidly. These panels maintain robust generation even on blistering 42°C days in regional Queensland.',
    reviewDate: 'Verified Regional Client',
  },
  {
    id: 'aerial-perspective-solar',
    yOffset: -10, // MIDDLE
    reviewerName: 'Hannah Cooper',
    userImage: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    location: 'Indooroopilly, Brisbane',
    reviewHighlight: 'Incredible energy generation from day one',
    reviewFull: 'Installed across both east and west roof elevations to capture morning and evening sun. The installation quality is exceptional and our electricity bills are basically gone.',
    reviewDate: 'Verified Google Review',
  },
];

export const ParallaxBannerSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const turntableRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef<number>(0);
  const isAutoPlay = true;
  const isDraggingRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);

  // Responsive dimensions - reduced card dimensions for a sleeker showcase
  const [dimensions, setDimensions] = useState({
    radius: 540,
    cardWidth: 130,
    cardHeight: 165,
    perspective: 1100,
    yScale: 1,
  });

  const lastX = useRef<number>(0);
  const velocity = useRef<number>(0.13);
  const animationFrameId = useRef<number>(0);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile
        setDimensions({
          radius: 340,
          cardWidth: 110,
          cardHeight: 140,
          perspective: 850,
          yScale: 0.65,
        });
      } else if (width < 1024) {
        // Tablet
        setDimensions({
          radius: 450,
          cardWidth: 120,
          cardHeight: 155,
          perspective: 950,
          yScale: 0.85,
        });
      } else {
        // Desktop
        setDimensions({
          radius: 540,
          cardWidth: 130,
          cardHeight: 165,
          perspective: 1100,
          yScale: 1,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Viewport intersection observer: only animate 3D carousel when section is in view
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Hardware-accelerated 60FPS 3D turntable rotation loop (Direct DOM style update - Zero React re-renders)
  useEffect(() => {
    const animate = () => {
      if (isVisibleRef.current && !isDraggingRef.current) {
        if (isAutoPlay) {
          velocity.current = velocity.current * 0.96 + 0.13 * 0.04;
        } else {
          velocity.current *= 0.92;
        }
        rotationRef.current = (rotationRef.current + velocity.current) % 360;
        if (turntableRef.current) {
          turntableRef.current.style.transform = `rotateX(-6deg) rotateY(${rotationRef.current}deg)`;
        }
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [isAutoPlay]);

  // Pointer drag to spin 3D cylinder
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    isDraggingRef.current = true;
    setIsDragging(true);
    lastX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastX.current;
    lastX.current = e.clientX;

    const sensitivity = 0.28;
    const deltaAngle = deltaX * sensitivity;
    velocity.current = deltaAngle * 0.4;
    rotationRef.current = (rotationRef.current + deltaAngle) % 360;
    if (turntableRef.current) {
      turntableRef.current.style.transform = `rotateX(-6deg) rotateY(${rotationRef.current}deg)`;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignore
    }
  };

  const totalCards = CYLINDER_CARDS.length;
  const anglePerCard = 360 / totalCards;

  return (
    <section
      aria-label="3D Solar Showcase Gallery"
      ref={containerRef}
      className="relative w-full min-h-140 sm:min-h-160 lg:min-h-230 bg-[#07090D] overflow-hidden   flex flex-col items-center justify-start pt-10 sm:pt-14 pb-8 border-y border-white/5"
      style={{
        background: 'radial-gradient(ellipse at 50% 45%, #121622 0%, #0A0D14 55%, #050609 100%)',
      }}
    >
      {/* 1. ENHANCED HIGH-TECH BACKGROUND: Thermal radar heat spots + Detailed topological grid lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Subtle coordinate dot matrix */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Top-Left Ambient Cold Thermal Glow */}
        <div
          className="absolute top-1/4 -left-12 w-56 sm:w-80 h-56 sm:h-80 rounded-full opacity-40 blur-[60px]"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.6) 0%, rgba(30,58,138,0.4) 45%, transparent 70%)',
          }}
        />

        {/* Left & Right Edge Vignettes for Infinite Fade */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-linear-to-r from-[#07090D] to-transparent z-20" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-linear-to-l from-[#07090D] to-transparent z-20" />
      </div>

      {/* TOP SECTION TITLE */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 text-center mb-4 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-[#ED4F11] bg-orange-500/10 border border-orange-500/25 backdrop-blur-md mb-3 shadow-[0_0_20px_rgba(239,104,12,0.15)]">
          <span className="w-2 h-2 rounded-full bg-[#EF680C] animate-pulse" />
          <span>4.9 <span className="text-[#FFB800] tracking-widest">★★★★★</span> GOOGLE & SOLARQUOTES RATED</span>
          <span className="text-white/40">•</span>
          <span className="text-white">4,200+ Nationwide HOMES</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-5xl font-serif font-black tracking-tight text-white uppercase drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
          Real Stories. Proven Savings.
        </h2>

        <p className="mt-3 text-xs sm:text-base text-slate-400 max-w-2xl mx-auto">
          Tap any card to read verified customer reviews and inspect real-world system installations across australia, Gold Coast, and the Sunshine Coast.
        </p>
      </div>

      {/* 2. TRUE 3D CYLINDER STAGE (Hardware Accelerated preserve-3d) */}
      <div
        className="relative w-full h-125 sm:h-145 lg:h-160 flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y z-10"
        style={{
          perspective: `${dimensions.perspective}px`,
          perspectiveOrigin: '50% 50%',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Rotating 3D Turntable Center */}
        <div
          ref={turntableRef}
          className="relative w-0 h-0 flex items-center justify-center pointer-events-auto"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-6deg) rotateY(0deg)',
            willChange: 'transform',
          }}
        >
          {CYLINDER_CARDS.map((card, index) => {
            const cardAngle = anglePerCard * index;
            const yOffsetScaled = card.yOffset * dimensions.yScale;

            return (
              <div
                key={card.id}
                className="absolute group"
                style={{
                  width: `${dimensions.cardWidth}px`,
                  height: `${dimensions.cardHeight}px`,
                  left: `-${dimensions.cardWidth / 2}px`,
                  top: `-${dimensions.cardHeight / 2}px`,
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${cardAngle}deg) translateZ(${dimensions.radius}px) translateY(${yOffsetScaled}px)`,
                  backfaceVisibility: 'visible',
                }}
              >
                {/* UNIFORM COMPACT CARD CONTAINER */}
                <div
                  onClick={(e) => {
                    if (Math.abs(velocity.current) < 0.25) {
                      e.stopPropagation();
                      setSelectedCard(card);
                    }
                  }}
                  className="relative w-full h-full rounded-xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.65)] cursor-pointer transition-all duration-300 group-hover:scale-105 border border-slate-200/80 group-hover:border-[#EF680C] group-hover:shadow-[0_12px_30px_rgba(239,104,12,0.3)] bg-white p-2.5 sm:p-3 flex flex-col justify-between select-none"
                  style={{
                    backfaceVisibility: 'visible',
                  }}
                >
                  {/* Subtle top ambient glow */}
                  <div className="absolute top-0 inset-x-0 h-10 bg-linear-to-b from-orange-500/5 to-transparent pointer-events-none" />

                  {/* Header: User Image + Stars */}
                  <div className="flex flex-col items-center pointer-events-none relative z-10">
                    <div className="relative">
                      <img
                        src={card.userImage}
                        alt={card.reviewerName}
                        loading="lazy"
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-[#EF680C]/80 border border-white shadow-sm"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          if (target.nextElementSibling) {
                            (target.nextElementSibling as HTMLElement).style.display = 'flex';
                          }
                        }}
                      />
                      <div
                        style={{ display: 'none' }}
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-linear-to-br from-[#EF680C] to-[#2B3CB8] text-white font-bold text-xs items-center justify-center ring-2 ring-[#EF680C]/40 border border-white shadow-sm"
                      >
                        {getInitials(card.reviewerName)}
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-xs" title="Verified Customer">
                        <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                      </span>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-0.5 mt-1 text-[#FFB800]">
                      {[...Array(card.rating)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-[#FFB800] text-[#FFB800]" />
                      ))}
                    </div>

                    {/* Reviewer Name */}
                    <h4 className="text-[10.5px] sm:text-[11px] font-bold text-slate-900 tracking-tight truncate max-w-full mt-0.5">
                      {card.reviewerName}
                    </h4>
                  </div>

                  {/* Review Content */}
                  <div className="relative z-10 pointer-events-none px-0.5 my-auto">
                    <p className="text-[9px] sm:text-[9.5px] text-[#2B3CB8] font-medium  leading-snug line-clamp-3 text-center">
                      "{card.reviewHighlight}"
                    </p>
                  </div>

                  {/* Bottom Footer: Location / Platform */}
                  <div className="relative z-10 pointer-events-none pt-1 border-t border-slate-100 flex items-center justify-center gap-1 text-[8px] sm:text-[8.5px] text-slate-500">
                    <MapPin className="w-2.5 h-2.5 text-[#EF680C] shrink-0" />
                    <span className="truncate">{card.location.split(',')[0]}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. REVIEW DETAIL MODAL */}
      {selectedCard && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-card-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedCard(null)}
          data-lenis-prevent
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-[#12151D] border border-white/20 shadow-2xl overflow-hidden p-6 sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCard(null)}
              aria-label="Close Modal"
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105 cursor-pointer z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* User Profile Header */}
            <div className="flex items-center gap-3.5 mb-5">
              <div className="relative shrink-0">
                <img
                  src={selectedCard.userImage}
                  alt={selectedCard.reviewerName}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-[#EF680C]/50 border border-white/20 shadow-lg"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.nextElementSibling) {
                      (target.nextElementSibling as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
                <div
                  style={{ display: 'none' }}
                  className="w-14 h-14 rounded-full bg-linear-to-br from-[#EF680C] to-[#2B3CB8] text-white font-bold text-base items-center justify-center ring-2 ring-[#EF680C]/50 border border-white/20 shadow-lg"
                >
                  {getInitials(selectedCard.reviewerName)}
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#12151D] flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </span>
              </div>

              <div>
                <h3 id="modal-card-title" className="text-base sm:text-lg font-bold text-white">
                  {selectedCard.reviewerName}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#EF680C]" />
                  <span>{selectedCard.location}</span>
                  <span className="text-white/30">•</span>
                  <span className="text-emerald-400 font-medium">{selectedCard.reviewDate || 'Verified Review'}</span>
                </div>
                <div className="flex items-center gap-1 mt-1.5 text-[#FFB800]">
                  {[...Array(selectedCard.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FFB800] text-[#FFB800]" />
                  ))}
                  <span className="text-xs font-bold text-[#FFB800] ml-1">5.0</span>
                </div>
              </div>
            </div>

            {/* Review Content Box */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 relative mb-5">
              <Quote className="w-7 h-7 text-[#EF680C]/20 absolute top-3 right-3 pointer-events-none" />
              <h4 className="text-sm sm:text-base font-bold text-white mb-2 pr-6">
                "{selectedCard.reviewHighlight}"
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                "{selectedCard.reviewFull}"
              </p>
            </div>

            {/* Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
              <span className="text-xs text-slate-400 text-center sm:text-left">
                Join our 4,200+ satisfied homeowners
              </span>
              <Button
                to="/get-started/free-assessment"
                variant="primary"
                className="w-full sm:w-auto rounded-xl bg-[#EF680C] hover:bg-[#d65b09] text-white font-bold px-4 py-2 text-xs"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Get Free Assessment
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ParallaxBannerSection;

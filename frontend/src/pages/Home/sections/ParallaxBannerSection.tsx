import React, { useState, useEffect, useRef } from 'react';
import { X, MapPin, Zap, ArrowRight, ShieldCheck, Star, Quote, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface CardItem {
  id: string;
  title: string;
  category: string;
  location: string;
  systemSize: string;
  savings: string;
  components: string;
  image: string;
  yOffset: number; // Vertical tier: up, down, down more than, up more than, middle
  reviewerName: string;
  rating: number;
  reviewHighlight: string;
  reviewFull: string;
  reviewDate?: string;
}

// 19 genuine residential solar showcase cards enriched with verified customer reviews
const CYLINDER_CARDS: CardItem[] = [
  {
    id: 'coastal-solar',
    title: 'Coastal Residence',
    category: 'Residential Solar',
    location: 'Sunshine Coast, QLD',
    systemSize: '13.2kW Rooftop Solar',
    savings: '$2,850 / yr saved',
    components: 'Tier-1 N-Type TOPCon Panels',
    image: '/images/projects/queensland-coastal-solar-home.webp',
    yOffset: -120, // UP
    reviewerName: 'Brett Thomson',
    rating: 5,
    reviewHighlight: 'Power bill dropped from $940 to $22!',
    reviewFull: 'Trent personally inspected our roof cavity and designed the perfect system. Power bill dropped from $940 to $22 last month! Cleanest tradesmen we have ever had on site, and their post-install handover was second to none.',
    reviewDate: 'Verified Google Review',
  },
  {
    id: 'aerial-array',
    title: 'Family Residence',
    category: 'Residential Solar',
    location: 'Camp Hill, Brisbane',
    systemSize: '13.2kW High-Efficiency Array',
    savings: '82% Bill Cut',
    components: 'Tier-1 High-Efficiency Monocrystalline Panels',
    image: '/images/about/solar-installation-aerial.webp',
    yOffset: 25, // DOWN
    reviewerName: 'Claire & Patrick Wilson',
    rating: 5,
    reviewHighlight: 'Cut our power bill by 82% immediately',
    reviewFull: 'With 3 teenagers and ducted A/C in summer heatwaves, our solar system slashed our electricity bills by 82% from day one. Communication with the team was exceptional from quote through to Energex grid approval.',
    reviewDate: 'Verified SolarQuotes Review',
  },
  {
    id: 'currumbin-valley-solar',
    title: 'Queensland Suburban Solar',
    category: 'Residential Solar',
    location: 'Currumbin Valley, QLD',
    systemSize: '10.4kW Premium Rooftop Array',
    savings: '100% Bill Reduction',
    components: 'Tier-1 Monocrystalline Solar Array',
    image: '/images/projects/sunny-solar-residential-dusk.png',
    yOffset: -60, // DOWN MORE THAN (deep down)
    reviewerName: 'Mark Henderson',
    rating: 5,
    reviewHighlight: 'Flawless installation on our Queensland home',
    reviewFull: 'The solar panels look magnificent on our roofline and generate amazing power right through dusk. Entire rebate paperwork was handled seamlessly by the office team. Absolutely top-tier workmanship.',
    reviewDate: 'Verified Google Review',
  },
  {
    id: 'gold-coast-rooftop',
    title: 'High-Capacity Rooftop Array',
    category: 'Residential Solar',
    location: 'Gold Coast, QLD',
    systemSize: '14.8kW High-Yield Rooftop',
    savings: '$3,400 / yr saved',
    components: 'Tier-1 N-Type All-Black Panels',
    image: '/images/projects/project-rooftop-array.webp',
    yOffset: -145, // UP MORE THAN (high up)
    reviewerName: 'Robert Vance',
    rating: 5,
    reviewHighlight: 'Massive generation, immaculate roof layout',
    reviewFull: 'Trent and his crew completed the entire multi-pitch roof installation in a single day. Panel lines are laser-straight and power generation has exceeded our highest estimates.',
    reviewDate: 'Verified Homeowner Review',
  },
  {
    id: 'drone-aerial-solar',
    title: 'Aerial Rooftop Solar',
    category: 'Residential Solar',
    location: 'North Lakes, Brisbane',
    systemSize: '11.2kW Residential Solar Array',
    savings: 'Zero Hotspots',
    components: 'Tier-1 Monocrystalline Solar Panels',
    image: '/images/projects/dji-aerial-solar.webp',
    yOffset: 25, // DOWN
    reviewerName: 'Sophie Martin',
    rating: 5,
    reviewHighlight: 'Quality roof installation verified by thermal drone',
    reviewFull: 'They showed us the aerial drone inspection of our finished panels after installation. Every panel was operating at maximum output with zero hotspots. Truly honest, master-level tradesmen.',
    reviewDate: 'Verified Google Review',
  },
  {
    id: 'architectural-roof',
    title: 'Modern Architecture Solar',
    category: 'Residential Solar',
    location: 'Noosa Heads, QLD',
    systemSize: '15.4kW Full-Black Array',
    savings: '$3,120 / yr saved',
    components: 'Concealed Conduit + All-Black Solar Panels',
    image: '/images/projects/clarity-the-right-system.jpg',
    yOffset: -75, // DOWN MORE THAN (deep down)
    reviewerName: 'Marcus & Jessica L.',
    rating: 5,
    reviewHighlight: 'All-black panels look stunning on roof',
    reviewFull: 'We were very particular about aesthetics on our modern home. The all-black array with concealed conduit looks architecturally integrated. Couldn’t be happier with both looks and performance.',
    reviewDate: 'Verified Homeowner Review',
  },
  {
    id: 'brisbane-colorbond',
    title: 'Brisbane Colorbond Solar',
    category: 'Residential Solar',
    location: 'Brisbane, QLD',
    systemSize: '10.8kW Metal Roof Array',
    savings: '$2,650 / yr saved',
    components: 'Cyclone Clamped Tier-1 Solar Panels',
    image: '/images/projects/home-solar-brisbane.jpg',
    yOffset: -5, // MIDDLE
    reviewerName: 'Lachlan McKay',
    rating: 5,
    reviewHighlight: 'Looks fantastic on our Colorbond roof',
    reviewFull: 'Installed on our dark Colorbond corrugated roof with clean flush clamps. Generates massive power all day long even during partly cloudy Queensland days.',
    reviewDate: 'Verified Homeowner Review',
  },
  {
    id: 'homestead-solar',
    title: 'Rural Homestead Solar',
    category: 'Residential Solar',
    location: 'Helensvale, Gold Coast',
    systemSize: '19.8kW Solar Installation',
    savings: '$4,200 / yr saved',
    components: 'High-Efficiency Monocrystalline Panels',
    image: '/images/projects/homestead-overview.jpg',
    yOffset: -75, // UP
    reviewerName: 'Graham & Helen Ross',
    rating: 5,
    reviewHighlight: 'Doubled our output with modern panels',
    reviewFull: 'Replaced an old 2013 system with modern high-efficiency panels. Double the power output for a fraction of the roof space. Highly recommend Sunny Solar for anyone looking for honest advice.',
    reviewDate: 'Verified Google Review',
  },
  {
    id: 'contemporary-home-solar',
    title: 'Contemporary Home Solar',
    category: 'Residential Solar',
    location: 'New Farm, Brisbane',
    systemSize: '12.4kW Custom Rooftop Array',
    savings: '$2,900 / yr saved',
    components: 'Tier-1 Bifacial Roof Panels',
    image: '/images/home/parallax-solar-home.webp',
    yOffset: 20, // DOWN
    reviewerName: 'Nadia El-Sayed',
    rating: 5,
    reviewHighlight: 'Sleek solar panels and massive energy savings',
    reviewFull: 'The solar panels complement our home exterior beautifully. Our daytime power bills have completely vanished, and the feed-in credits keep rolling in. Total transparency.',
    reviewDate: 'Verified Google Review',
  },
  {
    id: '10kw-residential-solar',
    title: '10kW Residential Solar',
    category: 'Residential Solar',
    location: 'Redcliffe, QLD',
    systemSize: '10kW High-Yield Solar System',
    savings: '$2,480 / yr saved',
    components: 'High-Efficiency Silicon Cells',
    image: '/images/savings/10kw-solar-panel-system.webp',
    yOffset: -65, // DOWN MORE THAN
    reviewerName: 'Andrew Davies',
    rating: 5,
    reviewHighlight: 'Flawless roof fitment and silent power',
    reviewFull: 'The solar installation was completed cleanly in less than a day. Panels catch morning and afternoon sun perfectly across both roof faces. Absolute peace of mind.',
    reviewDate: 'Verified Google Review',
  },
  {
    id: 'pitched-roof-solar',
    title: 'Pitched Tile Roof Solar',
    category: 'Residential Solar',
    location: 'Robina, Gold Coast',
    systemSize: '13.2kW Multi-Array System',
    savings: 'Clean Roof Install',
    components: 'Precision Rooftop Solar Panels',
    image: '/images/projects/photovoltaik-nk.webp',
    yOffset: -155, // UP MORE THAN
    reviewerName: 'Darren & Kelly Brooks',
    rating: 5,
    reviewHighlight: 'Polite, prompt and spotless cleanup',
    reviewFull: 'Every electrician who arrived was courteous, wore boot covers, and aligned the panels with surgical precision. First-class roof craftsmanship.',
    reviewDate: 'Verified SolarQuotes Review',
  },
  {
    id: 'suburban-solar-array',
    title: 'Suburban Solar Array',
    category: 'Residential Solar',
    location: 'Springfield Lakes, QLD',
    systemSize: '12.6kW Grid-Connected Solar',
    savings: 'Net-Zero Power Bill',
    components: 'High-Density Residential Solar Array',
    image: '/images/projects/aerial-view-solar.webp',
    yOffset: 15, // MIDDLE
    reviewerName: 'Craig & Wendy Turner',
    rating: 5,
    reviewHighlight: 'Net-zero electricity bills achieved',
    reviewFull: 'We have not paid an electricity bill in over nine months. In fact, our quarterly energy statements now show a credit balance thanks to feed-in tariffs from our roof array.',
    reviewDate: 'Verified Google Review',
  },
  {
    id: 'heritage-tin-solar',
    title: 'Heritage Tin Roof Solar',
    category: 'Residential Solar',
    location: 'Paddington, Brisbane',
    systemSize: '8.8kW Precision Array',
    savings: '$2,640 / yr saved',
    components: 'High-Efficiency N-Type Roof Panels',
    image: '/images/projects/pv-solar-thermal.webp',
    yOffset: -75, // UP
    reviewerName: 'Sarah K.',
    rating: 5,
    reviewHighlight: 'Preserved our heritage roof character perfectly',
    reviewFull: 'Sunny Solar took the time to 3D model our trees and found the perfect panel arrangement on our heritage tin roof. Not a single leak and our bills are practically zero.',
    reviewDate: 'Verified Google Review',
  },
  {
    id: 'rooftop-panel-installation',
    title: 'Rooftop Panel Installation',
    category: 'Residential Solar',
    location: 'Taringa, Brisbane',
    systemSize: '10.5kW Tile Roof System',
    savings: '100% Leak-Free',
    components: 'Zero-Penetration Roof Rail System',
    image: '/images/about/gallery/rooftop-solar-drill.webp',
    yOffset: -15, // DOWN MORE THAN
    reviewerName: 'Tony & Megan Bell',
    rating: 5,
    reviewHighlight: 'Zero roof leaks, master-level tradesmanship',
    reviewFull: 'We had an intricate terracotta tile roof. Sunny Solar used custom brackets with zero penetration into structural tiles. Not a drop of water through torrential rain.',
    reviewDate: 'Verified Google Review',
  },
  {
    id: 'panel-engineering-array',
    title: 'Precision Panel Engineering',
    category: 'Residential Solar',
    location: 'Southport, Gold Coast',
    systemSize: '13.2kW Solar Array',
    savings: '$3,100 / yr saved',
    components: 'Anti-Reflective Tier-1 Silicon Cells',
    image: '/images/projects/panel-engineering.webp',
    yOffset: -105, // UP
    reviewerName: 'Liam O’Connor',
    rating: 5,
    reviewHighlight: 'Powers our entire household and air con',
    reviewFull: 'Our previous power bills were over $1,100 a quarter. Since installing this solar array, the air conditioning runs free during the heat of the day. The build quality is exceptional.',
    reviewDate: 'Verified Homeowner Review',
  },
  {
    id: 'electrician-panel-install',
    title: 'Master Rooftop Installation',
    category: 'Residential Solar',
    location: 'Caloundra, Sunshine Coast',
    systemSize: '11.8kW Region C Cyclone Rated',
    savings: 'Master Electrician Installed',
    components: 'Certified Clean Energy Council Install',
    image: '/images/about/gallery/electrician-carrying-panel.webp',
    yOffset: 15, // DOWN
    reviewerName: 'Peter Gallagher',
    rating: 5,
    reviewHighlight: 'True professionals on the roof all day',
    reviewFull: 'Living 400m from the coast, wind rating was critical. Heavy gale force winds last month didn’t rattle a single panel. Certified Master Electricians who take pride in their trade.',
    reviewDate: 'Verified Homeowner Review',
  },
  {
    id: 'cyclone-clamping-array',
    title: 'Cyclone-Rated Roof Solar',
    category: 'Residential Solar',
    location: 'Maroochydore, Sunshine Coast',
    systemSize: '12.2kW Marine Clamped Array',
    savings: '10-Yr Guarantee',
    components: 'Marine-Grade Anodized Roof Clamps',
    image: '/images/projects/project-cyclone-clamping.jpg',
    yOffset: -45, // DOWN MORE THAN
    reviewerName: 'Dean Fletcher',
    rating: 5,
    reviewHighlight: 'Laser-straight panel lines and perfect clamping',
    reviewFull: 'As an ex-sparky myself, I was inspecting every panel alignment and clamp torque. The boys did an immaculate installation that looks like a display showroom.',
    reviewDate: 'Verified Google Review',
  },
  {
    id: 'precision-torquing-array',
    title: 'Engineered Rooftop Mount',
    category: 'Residential Solar',
    location: 'Warwick, QLD',
    systemSize: '13.2kW High-Heat Solar Array',
    savings: '$3,250 / yr saved',
    components: 'Torque-Calibrated Roof Clamps',
    image: '/images/projects/precision-torquing.jpg',
    yOffset: -160, // UP MORE THAN
    reviewerName: 'Barry Kowalski',
    rating: 5,
    reviewHighlight: 'Handles 42°C summer heat effortlessly',
    reviewFull: 'High ambient heat degrades cheap panels rapidly. These panels maintain robust generation even on blistering 42°C days in regional Queensland.',
    reviewDate: 'Verified Regional Client',
  },
  {
    id: 'aerial-perspective-solar',
    title: 'Executive Home Solar',
    category: 'Residential Solar',
    location: 'Indooroopilly, Brisbane',
    systemSize: '14kW High-Efficiency Roof Array',
    savings: '95% Bill Reduction',
    components: 'Architectural Monocrystalline Solar Array',
    image: '/images/projects/project-aerial-perspective.jpg',
    yOffset: -10, // MIDDLE
    reviewerName: 'Hannah & Sam Cooper',
    rating: 5,
    reviewHighlight: 'Incredible energy generation from day one',
    reviewFull: 'Installed across both east and west roof elevations to capture morning and evening sun. The installation quality is exceptional and our electricity bills are basically gone.',
    reviewDate: 'Verified Google Review',
  },
];

export const ParallaxBannerSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState<number>(0);
  const isAutoPlay = true;
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);

  // Responsive dimensions - all cards have exact height h-50 (200px)
  const [dimensions, setDimensions] = useState({
    radius: 560,
    cardWidth: 160,
    cardHeight: 200, // h-50 = 200px
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
          radius: 350,
          cardWidth: 140,
          cardHeight: 200, // h-50 = 200px
          perspective: 850,
          yScale: 0.65,
        });
      } else if (width < 1024) {
        // Tablet
        setDimensions({
          radius: 460,
          cardWidth: 155,
          cardHeight: 200, // h-50 = 200px
          perspective: 950,
          yScale: 0.85,
        });
      } else {
        // Desktop
        setDimensions({
          radius: 560,
          cardWidth: 160,
          cardHeight: 200, // h-50 = 200px
          perspective: 1100,
          yScale: 1,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 60FPS continuous 3D rotation loop - non-stop moving
  useEffect(() => {
    const animate = () => {
      if (!isDragging) {
        if (isAutoPlay) {
          velocity.current = velocity.current * 0.96 + 0.13 * 0.04;
        } else {
          velocity.current *= 0.92;
        }
        setRotation((prev) => (prev + velocity.current) % 360);
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [isAutoPlay, isDragging]);

  // Pointer drag to spin 3D cylinder
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    setIsDragging(true);
    lastX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastX.current;
    lastX.current = e.clientX;

    const sensitivity = 0.28;
    const deltaAngle = deltaX * sensitivity;
    velocity.current = deltaAngle * 0.4;
    setRotation((prev) => (prev + deltaAngle) % 360);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
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
          <span>4.9 ★★★★★ GOOGLE & SOLARQUOTES RATED</span>
          <span className="text-white/40">•</span>
          <span className="text-white">4,200+ QUEENSLAND HOMES</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-5xl font-serif font-black tracking-tight text-white uppercase drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
          Real Stories. Proven Savings.
        </h2>

        <p className="mt-3 text-xs sm:text-base text-slate-400 max-w-2xl mx-auto">
          Tap any card to read verified customer reviews and inspect real-world system installations across Brisbane, Gold Coast, and the Sunshine Coast.
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
          className="relative w-0 h-0 flex items-center justify-center pointer-events-auto"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(-6deg) rotateY(${rotation}deg)`,
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
                {/* UNIFORM COMPACT CARD CONTAINER (Height: h-50 = 200px) */}
                <div
                  onClick={(e) => {
                    if (Math.abs(velocity.current) < 0.25) {
                      e.stopPropagation();
                      setSelectedCard(card);
                    }
                  }}
                  className="relative w-full h-50 rounded-xl overflow-hidden shadow-[0_10px_28px_rgba(0,0,0,0.9)] cursor-pointer transition-transform duration-300 group-hover:scale-105 border border-white/10 group-hover:border-[#EF680C]/60"
                  style={{
                    backfaceVisibility: 'visible',
                  }}
                >
                  {/* High-Resolution Project Image */}
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center filter group-hover:brightness-110 transition-all duration-300"
                  />

                  {/* Gradient Overlay for Crisp Caption Readability */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/45 to-black/25 pointer-events-none" />

                  {/* Top Badge: 5 Stars + Verified Tag */}
                  <div className="absolute top-2 inset-x-2 z-10 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] text-amber-400 font-bold">
                      <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      <span>5.0</span>
                    </div>
                    <span className="text-[9px] font-semibold text-emerald-400 px-1.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 backdrop-blur-xs">
                      Verified
                    </span>
                  </div>

                  {/* Bottom Review Snippet & Reviewer Info */}
                  <div className="absolute bottom-2 inset-x-2 z-10 text-left pointer-events-none space-y-1">
                    <p className="text-[11px] font-bold text-white leading-tight line-clamp-2 drop-shadow-md">
                      "{card.reviewHighlight}"
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-white/70 font-medium pt-1 border-t border-white/15">
                      <span className="truncate max-w-21.25 text-white/90">
                        {card.reviewerName.split(' ')[0]} {card.reviewerName.split(' ')[1]?.[0] ? card.reviewerName.split(' ')[1][0] + '.' : ''}
                      </span>
                      <span className="text-[#EF680C] text-[9px] font-bold shrink-0">{card.savings.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* Subtle Border Sheen */}
                  <div className="absolute inset-0 rounded-xl pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. REVIEW & PROJECT DETAIL MODAL */}
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
            className="relative w-full max-w-lg rounded-2xl bg-[#12151D] border border-white/20 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative h-48 sm:h-52 w-full overflow-hidden">
              <img
                src={selectedCard.image}
                alt={selectedCard.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#12151D] via-[#12151D]/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedCard(null)}
                aria-label="Close Modal"
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 transition-all hover:scale-105 cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Verified pill */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Homeowner Review</span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 text-left">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(selectedCard.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-amber-400 ml-1">5.0 / 5.0</span>
                </div>
                <h3 id="modal-card-title" className="text-lg sm:text-xl font-bold text-white font-serif">
                  "{selectedCard.reviewHighlight}"
                </h3>
              </div>
            </div>

            {/* Modal Specs & Review Body */}
            <div className="p-5 sm:p-6 space-y-4 text-left">
              {/* Full Review Quote Box */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 relative">
                <Quote className="w-6 h-6 text-orange-400/20 absolute top-2 right-2 pointer-events-none" />
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  "{selectedCard.reviewFull}"
                </p>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{selectedCard.reviewerName}</span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-orange-400" />
                      {selectedCard.location}
                    </span>
                  </div>
                  <span className="text-[10px] text-white/60 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                    {selectedCard.reviewDate || 'Verified Google Review'}
                  </span>
                </div>
              </div>

              {/* System Specs Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-white/50 uppercase font-medium">Installed System</span>
                  <p className="text-xs font-semibold text-white flex items-center gap-1 mt-0.5">
                    <Zap className="w-3.5 h-3.5 text-[#EF680C]" />
                    {selectedCard.systemSize}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-white/50 uppercase font-medium">Reported Benefit</span>
                  <p className="text-xs font-bold text-emerald-400 mt-0.5">
                    {selectedCard.savings}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 col-span-2">
                  <span className="text-[10px] text-white/50 uppercase font-medium">System Hardware</span>
                  <p className="text-xs font-medium text-white/90 mt-0.5">
                    {selectedCard.components}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
                <span className="text-[11px] text-slate-400 text-center sm:text-left">
                  Ready to see what solar can save your home?
                </span>
                <Button
                  to="/get-started/free-assessment"
                  variant="primary"
                  className="w-full sm:w-auto rounded-xl bg-[#EF680C] hover:bg-[#d65b09] text-white font-bold px-5 py-2 text-xs"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Get Your Free Solar Options
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ParallaxBannerSection;

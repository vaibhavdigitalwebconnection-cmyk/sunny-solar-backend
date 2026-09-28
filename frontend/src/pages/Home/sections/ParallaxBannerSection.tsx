import React, { useState, useEffect, useRef } from 'react';
import { X, MapPin, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
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
}

// 14 solar showcase cards with exact height h-50 (200px)
// Staggered sequence: Up -> Down -> Down more than -> Up more than -> Down -> Down more than -> Middle...
const CYLINDER_CARDS: CardItem[] = [
  {
    id: 'coastal-solar',
    title: 'Coastal Residence',
    category: 'Residential Solar',
    location: 'Sunshine Coast, QLD',
    systemSize: '13.2kW Solar + 13.5kWh Battery',
    savings: '$2,850 / year saved',
    components: 'Tier-1 N-Type TOPCon Panels + Tesla Powerwall 3',
    image: '/images/projects/queensland-coastal-solar-home.webp',
    yOffset: -120, // UP
  },
  {
    id: 'aerial-array',
    title: 'Aerial Solar Field',
    category: 'Solar Generation',
    location: 'Moreton Bay, QLD',
    systemSize: '40kW Commercial Array',
    savings: '$7,900 / year saved',
    components: 'Tier-1 High-Efficiency Monocrystalline',
    image: '/images/about/solar-installation-aerial.webp',
    yOffset: 25, // DOWN
  },
  {
    id: 'battery-storage',
    title: 'Tesla Powerwall 3',
    category: 'Energy Storage',
    location: 'Brisbane, QLD',
    systemSize: '27kWh Dual Storage Stack',
    savings: '100% Blackout Immunity',
    components: 'Dual Gateway + Smart Home Backup',
    image: '/images/projects/project-battery-storage.jpg',
    yOffset: -60, // DOWN MORE THAN (deep down)
  },
  {
    id: 'commercial-hub',
    title: 'Commercial Array',
    category: 'Commercial Solar',
    location: 'Gold Coast, QLD',
    systemSize: '99.8kW High-Yield Rooftop',
    savings: '$18,400 / year saved',
    components: 'Commercial Inverters + Cyclone Clamping',
    image: '/images/projects/project-rooftop-array.webp',
    yOffset: -145, // UP MORE THAN (high up)
  },
  {
    id: 'drone-flir',
    title: 'Drone Thermal FLIR',
    category: 'Quality Assurance',
    location: 'South East QLD',
    systemSize: '4K Aerial Thermal Inspection',
    savings: 'Zero Hotspot Guarantee',
    components: 'FLIR Diagnostic Verification',
    image: '/images/projects/dji-aerial-solar.webp',
    yOffset: 25, // DOWN
  },
  {
    id: 'architectural-roof',
    title: 'Architectural Black Silicon',
    category: 'Premium Residential',
    location: 'Noosa Heads, QLD',
    systemSize: '15.4kW Full-Black Array',
    savings: '$3,120 / year saved',
    components: 'Concealed Conduit + Microinverters',
    image: '/images/projects/tesla-solar-roof.webp',
    yOffset: -75, // DOWN MORE THAN (deep down)
  },
  {
    id: 'bifacial-farm',
    title: 'Bifacial Ground-Mount',
    category: 'High Efficiency',
    location: 'Toowoomba, QLD',
    systemSize: '24.6kW Dual-Sided Generation',
    savings: '+24% Albedo Solar Gain',
    components: 'Galvanized Steel Ground Framework',
    image: '/images/projects/bifacial-rows.webp',
    yOffset: -5, // MIDDLE
  },
  {
    id: 'homestead-hybrid',
    title: 'Rural Homestead Hybrid',
    category: 'Off-Grid Ready',
    location: 'Ipswich, QLD',
    systemSize: '19.8kW Solar + 20kWh Battery',
    savings: '$4,200 / year saved',
    components: 'SMA Tripower Inverter + Generator Auto-Start',
    image: '/images/projects/homestead-overview.jpg',
    yOffset: -75, // UP
  },
  {
    id: 'smart-telemetry',
    title: 'Smart Cloud Telemetry',
    category: 'Telemetry',
    location: 'Live App Sync',
    systemSize: 'Real-Time App Monitoring',
    savings: 'Continuous Yield Optimization',
    components: 'Sunny Portal + 4G Fallback Connectivity',
    image: '/images/projects/smart-solar-app-telemetry.webp',
    yOffset: 20, // DOWN
  },
  {
    id: 'german-inverter',
    title: 'SMA Inverter Engineering',
    category: 'Inverter Technology',
    location: 'South East QLD',
    systemSize: 'German Engineered Core',
    savings: '98.4% Euro Efficiency',
    components: 'CEC Certified Active Cooling Architecture',
    image: '/images/projects/sunny-boy-inverter.webp',
    yOffset: -65, // DOWN MORE THAN
  },
  {
    id: 'master-trades',
    title: 'Master Electrician Trades',
    category: 'Accredited Team',
    location: 'Queensland Wide',
    systemSize: '10-Year Workmanship Warranty',
    savings: '100% In-House Clean Installs',
    components: 'CEC Certified Master Electricians',
    image: '/images/about/gallery/smiling-solar-electrician.webp',
    yOffset: -155, // UP MORE THAN
  },
  {
    id: 'clean-grid',
    title: 'Clean Energy Grid',
    category: 'Infrastructure',
    location: 'Queensland',
    systemSize: 'Grid-Connected Smart Array',
    savings: 'Net-Zero Carbon Offset',
    components: 'Intelligent Bi-Directional Export',
    image: '/images/projects/aerial-view-solar.webp',
    yOffset: 15, // MIDDLE
  },
  {
    id: 'cyclone-clamping',
    title: 'Cyclone Wind Clamping',
    category: 'Engineering',
    location: 'Coastal QLD',
    systemSize: 'Region C / D Cyclone Rated',
    savings: 'Engineered for Extreme Weather',
    components: 'Marine-Grade 316 Stainless Steel Fixtures',
    image: '/images/projects/project-cyclone-clamping.jpg',
    yOffset: -75, // UP
  },
  {
    id: 'precision-mount',
    title: 'Precision Mounting Array',
    category: 'Rooftop Craft',
    location: 'Brisbane, QLD',
    systemSize: 'Zero-Penetration Tile Brackets',
    savings: 'Lifetime Roof Integrity',
    components: 'Architectural Flashing Systems',
    image: '/images/about/gallery/rooftop-solar-drill.webp',
    yOffset: -15, // DOWN MORE THAN
  },
  {
    id: 'smart-switchboard',
    title: 'Smart Energy Switchboard',
    category: 'Switchboard Upgrade',
    location: 'Gold Coast, QLD',
    systemSize: 'AS/NZS 3000 Compliant Board',
    savings: 'Zero Fault Tolerance',
    components: 'Type 2 Surge Arrestors + Smart Circuit Meter',
    image: '/images/projects/project-switchboard.jpg',
    yOffset: -105, // UP
  },
  {
    id: 'ground-park',
    title: 'Ground-Mount Solar Park',
    category: 'Rural & Acreage',
    location: 'Lockyer Valley, QLD',
    systemSize: '30kW Ground Solar Station',
    savings: '$6,400 / year saved',
    components: 'Hot-Dip Galvanized Sub-Structure',
    image: '/images/projects/ground-mount-array.webp',
    yOffset: 15, // DOWN
  },
  {
    id: 'inverter-mounting',
    title: 'Precision Inverter Mount',
    category: 'Certified Install',
    location: 'Sunshine Coast, QLD',
    systemSize: 'Clean Wall-Mounting Craft',
    savings: '10-Year Craftsmanship Guarantee',
    components: 'Fronius SnapINverter Integration',
    image: '/images/about/gallery/electrician-mounting-inverter.webp',
    yOffset: -45, // DOWN MORE THAN
  },
  {
    id: 'outback-station',
    title: 'Outback Solar Station',
    category: 'High Irradiation',
    location: 'Regional QLD',
    systemSize: '50kW Utility Array',
    savings: '100% Daylight Energy Autonomy',
    components: 'High-Temperature Tolerant Silicon',
    image: '/images/projects/broken-hill-solar.webp',
    yOffset: -160, // UP MORE THAN
  },
  {
    id: 'battery-resilience-hero',
    title: 'Next-Gen Storage Hub',
    category: 'Storage Resilience',
    location: 'Brisbane, QLD',
    systemSize: '15kWh Lithium Storage Stack',
    savings: '95% Peak Power Avoidance',
    components: 'Integrated DC-Coupled Battery Storage',
    image: '/images/solutions/battery-hero.webp',
    yOffset: -10, // MIDDLE
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
      <div className="relative z-20 max-w-4xl mx-auto px-4 text-center mb-4 sm:mb-16 ">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-[#ED4F11] bg-orange-500/10 border border-orange-500/25 backdrop-blur-md mb-3 shadow-[0_0_20px_rgba(239,104,12,0.15)]">
          <span className="w-2 h-2 rounded-full bg-[#EF680C] animate-pulse" />
          <span>PROVEN SOLAR PERFORMANCE</span>
          <span className="text-white/40">•</span>
          <span className="text-white">QUEENSLAND WIDE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-5xl font-serif font-black tracking-tight text-white uppercase drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
          Delivering Real Results.
        </h2>


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
                className="absolute   group"
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
                  className="relative w-full h-50 rounded-xl overflow-hidden shadow-[0_10px_28px_rgba(0,0,0,0.9)] cursor-pointer transition-transform duration-300 group-hover:scale-105"
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
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Minimal Editorial Title at Bottom-Left */}
                  <div className="absolute bottom-2.5 left-2.5 z-10 text-left pointer-events-none pr-2">
                    <span className="text-xs font-medium text-white/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] line-clamp-1">
                      {card.title}
                    </span>
                  </div>

                  {/* Subtle Border Sheen */}
                  <div className="absolute inset-0 rounded-xl border border-white/10 group-hover:border-white/40 transition-colors pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. PROJECT DETAIL MODAL */}
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
            className="relative w-full max-w-md rounded-xl bg-[#12151D] border border-white/20 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative h-52 sm:h-55 w-full overflow-hidden">
              <img
                src={selectedCard.image}
                alt={selectedCard.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#12151D] via-transparent to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedCard(null)}
                aria-label="Close Modal"
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 transition-all hover:scale-105"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3 left-4 right-4 text-left">

                <h3 id="modal-card-title" className="text-xl sm:text-2xl font-bold text-white">
                  {selectedCard.title}
                </h3>
              </div>
            </div>

            {/* Modal Specs */}
            <div className="p-5 space-y-3 text-left">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-white/50 uppercase font-medium">Location</span>
                  <p className="text-xs font-semibold text-white flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-400" />
                    {selectedCard.location}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-white/50 uppercase font-medium">System Sizing</span>
                  <p className="text-xs font-semibold text-white flex items-center gap-1 mt-0.5">
                    <Zap className="w-3.5 h-3.5 text-[#EF680C]" />
                    {selectedCard.systemSize}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-white/50 uppercase font-medium">Financial Return</span>
                  <p className="text-xs font-bold text-emerald-400 mt-0.5">
                    {selectedCard.savings}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-white/50 uppercase font-medium">Hardware</span>
                  <p className="text-xs font-medium text-white/90 mt-0.5 truncate">
                    {selectedCard.components}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 flex justify-end border-t border-white/10">
                <Button
                  to="/get-started/free-assessment"
                  variant="primary"
                  className="w-full sm:w-auto rounded-xl bg-[#EF680C] hover:bg-[#d65b09] text-white font-bold px-5 py-2 text-xs"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Request Similar System
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

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Custom hook for smooth count-up number animation
 */
function useCountUp(target: number, duration: number = 1800, isStarted: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isStarted) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic for silky smooth deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(easeProgress * target);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration, isStarted]);

  return count;
}

/**
 * PreferSunnySolarSection
 * Clean Energy Authority Suite showcasing 4 flagship milestones.
 * Features 4 distinct bespoke color palettes:
 * - Icon 1: Imperial Gold & Obsidian
 * - Icon 2: Solar Flame (#ED4F11)
 * - Icon 3: Royal Midnight Navy (#0E1648)
 * - Icon 4: Clean Forest Green (#346820)
 *
 * Enhanced with GSAP animations & React Bits 3D magnetic interactive physics:
 * - GSAP entrance stagger & continuous vector micro-animations
 * - React Bits 3D magnetic tilt on mouse hover with elastic spring return
 * - Dynamic 0-to-target count-up number animations
 */
export const PreferSunnySolarSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // References for React Bits 3D magnetic physics & GSAP animations
  const emblemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sunRingRef = useRef<SVGCircleElement | null>(null);
  const sunAuraRef = useRef<SVGCircleElement | null>(null);
  const shieldRaysRef = useRef<SVGGElement | null>(null);
  const shieldStarsRef = useRef<SVGGElement | null>(null);
  const sparkRef = useRef<SVGGElement | null>(null);
  const panelGlintRef = useRef<SVGPolygonElement | null>(null);
  const orbitRing1Ref = useRef<SVGEllipseElement | null>(null);
  const orbitRing2Ref = useRef<SVGEllipseElement | null>(null);
  const surgeBoltRef = useRef<SVGPolygonElement | null>(null);

  // React Bits style 3D magnetic tilt on cursor hover
  const handleMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const emblem = emblemRefs.current[index];
    if (!emblem) return;
    const rect = emblem.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(emblem, {
      rotateY: x * 0.14,
      rotateX: -y * 0.14,
      scale: 1.07,
      duration: 0.35,
      ease: 'power2.out',
      transformPerspective: 600,
    });
  };

  const handleMouseLeave = (index: number) => {
    const emblem = emblemRefs.current[index];
    if (!emblem) return;
    gsap.to(emblem, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.75,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // GSAP Entrance & Continuous Ambient Icon Micro-Animations
  useEffect(() => {
    if (!isIntersecting) return;

    const ctx = gsap.context(() => {
      // 1. GSAP Staggered Entrance Reveal for all 4 emblems
      gsap.fromTo(
        emblemRefs.current.filter(Boolean),
        { scale: 0.75, opacity: 0, y: 26 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.13,
          ease: 'back.out(1.7)',
        }
      );

      // 2. Icon 1: Gold Shield breathing sun rays & star sparkle
      if (shieldRaysRef.current) {
        gsap.to(shieldRaysRef.current, {
          opacity: 0.65,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
      if (shieldStarsRef.current) {
        gsap.to(shieldStarsRef.current, {
          scale: 1.06,
          transformOrigin: '80px 35px',
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }

      // 3. Icon 2: Solar Flame #ED4F11 rotating sun halo & breathing corona
      if (sunRingRef.current) {
        gsap.to(sunRingRef.current, {
          rotation: 360,
          transformOrigin: '80px 54px',
          duration: 18,
          repeat: -1,
          ease: 'none',
        });
      }
      if (sunAuraRef.current) {
        gsap.to(sunAuraRef.current, {
          scale: 1.12,
          transformOrigin: '80px 54px',
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // 4. Icon 3: Royal Midnight Navy #0E1648 PV glint sweep & energy spark
      if (panelGlintRef.current) {
        gsap.to(panelGlintRef.current, {
          opacity: 0.95,
          duration: 1.6,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          repeatDelay: 1.4,
        });
      }
      if (sparkRef.current) {
        gsap.to(sparkRef.current, {
          scale: 1.3,
          transformOrigin: '24px -24px',
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // 5. Icon 4: Forest Green #346820 counter-rotating orbital rings & surge bolt
      if (orbitRing1Ref.current) {
        gsap.to(orbitRing1Ref.current, {
          rotation: 360,
          transformOrigin: '80px 72px',
          duration: 14,
          repeat: -1,
          ease: 'none',
        });
      }
      if (orbitRing2Ref.current) {
        gsap.to(orbitRing2Ref.current, {
          rotation: -360,
          transformOrigin: '80px 72px',
          duration: 18,
          repeat: -1,
          ease: 'none',
        });
      }
      if (surgeBoltRef.current) {
        gsap.to(surgeBoltRef.current, {
          scale: 1.08,
          transformOrigin: '80px 72px',
          duration: 0.7,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isIntersecting]);

  // Moving count-up numbers triggered upon viewport intersection
  const count1 = useCountUp(1, 1000, isIntersecting);
  const count2 = useCountUp(72000, 1800, isIntersecting);
  const count3 = useCountUp(1.3, 1600, isIntersecting);
  const count4 = useCountUp(800, 1700, isIntersecting);

  return (
    <section
      ref={sectionRef}
      className="relative py-8 sm:py-10 lg:py-14 bg-linear-to-b from-white via-[#F8FAFC] to-white border-y border-slate-200/80 overflow-hidden"
      aria-label="Why Most Australians Prefer Sunny Solar"
    >
      {/* Dynamic ambient backlight glows tailored to each milestone card */}
      <div className="absolute top-1/3 left-[12%] -translate-x-1/2 w-64 h-64 bg-amber-500/8 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-[37%] -translate-x-1/2 w-64 h-64 bg-[#ED4F11]/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-[62%] -translate-x-1/2 w-64 h-64 bg-[#0E1648]/12 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-[87%] -translate-x-1/2 w-64 h-64 bg-[#346820]/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-6xl mx-auto mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-tight">
            Why Most Australians Prefer{' '} <br className="hidden sm:inline" />
            <span className="text-[#2B3CB8] inline-block">
              Sunny Solar
            </span>
            ?
          </h2>

          <p className="mt-2 sm:mt-3.5 text-xs sm:text-base lg:text-lg text-slate-600 font-medium max-w-4xl mx-auto leading-relaxed">
            Delivering engineering excellence across Queensland — backed by Master Electricians, Tier-1 hardware, and thousands of verified five-star homeowners.
          </p>
        </div>

        {/* 4 Authority Cards: 4 in one row responsive grid */}
        <div className="grid grid-cols-4 gap-1.5 xs:gap-2.5 sm:gap-6 lg:gap-7">

          {/* ══════════════════════════════════════════════════════════════
              CARD 1: #1 RATED SOLAR RETAILER (IMPERIAL GOLD & ROYAL CREST)
             ══════════════════════════════════════════════════════════════ */}
          <div
            className="group relative transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center cursor-pointer"
            onMouseMove={(e) => handleMouseMove(0, e)}
            onMouseLeave={() => handleMouseLeave(0)}
          >
            {/* Top glowing accent border */}
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />

            {/* Emblem Container with React Bits 3D Magnetic Physics & Gold Glow */}
            <div
              ref={(el) => { emblemRefs.current[0] = el; }}
              className="w-18 h-22 xs:w-22 xs:h-26 sm:w-36 sm:h-40 lg:w-40 lg:h-44 relative flex items-center justify-center filter drop-shadow-[0_4px_10px_rgba(217,119,6,0.22)] sm:drop-shadow-[0_8px_18px_rgba(217,119,6,0.28)] group-hover:drop-shadow-[0_14px_28px_rgba(217,119,6,0.42)] transition-shadow duration-300 will-change-transform"
            >
              {/* React Bits Ambient Spotlight Glow */}
              <div className="absolute inset-0 rounded-full bg-amber-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none" />

              <svg viewBox="0 0 160 170" className="w-full h-full overflow-visible" aria-label="Australia's #1 Solar Retailer">
                <defs>
                  {/* Shield Outer Radiant Gold Gradient */}
                  <linearGradient id="crestGoldOuter" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFBEB" />
                    <stop offset="25%" stopColor="#FDE68A" />
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="75%" stopColor="#D97706" />
                    <stop offset="100%" stopColor="#78350F" />
                  </linearGradient>

                  {/* Shield Inner Deep Obsidian Field */}
                  <radialGradient id="crestDarkEnamel" cx="50%" cy="40%" r="65%">
                    <stop offset="0%" stopColor="#1E293B" />
                    <stop offset="60%" stopColor="#0F172A" />
                    <stop offset="100%" stopColor="#020617" />
                  </radialGradient>

                  {/* Ribbon Lustrous Amber/Gold Gradient */}
                  <linearGradient id="crestRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#78350F" />
                    <stop offset="20%" stopColor="#B45309" />
                    <stop offset="50%" stopColor="#D97706" />
                    <stop offset="80%" stopColor="#B45309" />
                    <stop offset="100%" stopColor="#78350F" />
                  </linearGradient>

                  {/* 3D Drop Shadow */}
                  <filter id="crestShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.35" floodColor="#78350F" />
                  </filter>
                </defs>

                {/* Outer Heraldic Shield */}
                <path
                  d="M 80,10 C 118,10 144,22 144,56 C 144,106 108,136 80,152 C 52,136 16,106 16,56 C 16,22 42,10 80,10 Z"
                  fill="url(#crestGoldOuter)"
                  filter="url(#crestShadow)"
                />

                {/* Shield Bevel Inset */}
                <path
                  d="M 80,15 C 114,15 138,26 138,57 C 138,102 104,130 80,145 C 56,130 22,102 22,57 C 22,26 46,15 80,15 Z"
                  fill="#92400E"
                />

                {/* Inner Obsidian Field */}
                <path
                  d="M 80,19 C 110,19 133,29 133,58 C 133,98 101,125 80,139 C 59,125 27,98 27,58 C 27,29 50,19 80,19 Z"
                  fill="url(#crestDarkEnamel)"
                />

                {/* Guilloché / Radial Golden Sun Rays inside Shield (GSAP Breathing) */}
                <g ref={shieldRaysRef} opacity="0.4" stroke="#FDE68A" strokeWidth="0.8">
                  {Array.from({ length: 18 }).map((_, i) => {
                    const angle = (i * 10 - 85) * (Math.PI / 180);
                    const x2 = 80 + 52 * Math.cos(angle);
                    const y2 = 72 + 52 * Math.sin(angle);
                    return <line key={i} x1="80" y1="72" x2={x2} y2={y2} />;
                  })}
                </g>

                {/* 5-Star Arc at Top (GSAP Shimmer) */}
                <g ref={shieldStarsRef} fill="#FDE68A">
                  <path d="M 54,36 L 56,40 L 61,40 L 57,43 L 58,47 L 54,44 L 50,47 L 51,43 L 47,40 L 52,40 Z" />
                  <path d="M 67,31 L 69,35 L 74,35 L 70,38 L 71,42 L 67,39 L 63,42 L 64,38 L 60,35 L 65,35 Z" />
                  <path d="M 80,28 L 82.5,33 L 88,33 L 83.5,36.5 L 85,41.5 L 80,38 L 75,41.5 L 76.5,36.5 L 72,33 L 77.5,33 Z" />
                  <path d="M 93,31 L 95,35 L 100,35 L 96,38 L 97,42 L 93,39 L 89,42 L 90,38 L 86,35 L 91,35 Z" />
                  <path d="M 106,36 L 108,40 L 113,40 L 109,43 L 110,47 L 106,44 L 102,47 L 103,43 L 99,40 L 104,40 Z" />
                </g>

                {/* Monumental Sculpted #1 (Animated Count) */}
                <text
                  x="80"
                  y="86"
                  textAnchor="middle"
                  fill="url(#crestGoldOuter)"
                  fontSize="44"
                  fontWeight="900"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.6))"
                  letterSpacing="-1.5"
                >
                  {Math.round(count1)}
                </text>

                {/* "OF AUSTRALIA" Small Header above ribbon */}
                <text
                  x="80"
                  y="98"
                  textAnchor="middle"
                  fill="#FDE68A"
                  fontSize="8"
                  fontWeight="800"
                  fontFamily="system-ui, sans-serif"
                  letterSpacing="1.8"
                >
                  AUSTRALIA&apos;S
                </text>

                {/* 3D Folded Gold Ribbon */}
                <g>
                  {/* Ribbon Left Fold */}
                  <path d="M 12 115 L 26 104 L 26 126 L 12 122 Z" fill="#78350F" />
                  {/* Ribbon Right Fold */}
                  <path d="M 148 115 L 134 104 L 134 126 L 148 122 Z" fill="#78350F" />

                  {/* Main Ribbon Plaque */}
                  <path
                    d="M 22 107 Q 80 114 138 107 L 134 128 Q 80 135 26 128 Z"
                    fill="url(#crestRibbonGrad)"
                    stroke="#FDE68A"
                    strokeWidth="1.2"
                  />

                  <text
                    x="80"
                    y="122"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="9.5"
                    fontWeight="900"
                    fontFamily="system-ui, sans-serif"
                    letterSpacing="1.2"
                  >
                    TOP RETAILER
                  </text>
                </g>
              </svg>
            </div>

            {/* Stat Callout with Live Moving Number Animation */}
            <div className="mt-1">
              <span className="text-sm xs:text-base sm:text-2xl lg:text-3xl font-serif font-black text-amber-600 tracking-tight leading-tight">
                #{Math.round(count1)} Rated
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-0.5 sm:mt-1 text-[10px] xs:text-xs sm:text-base font-bold text-slate-800 leading-tight">
              Leading Solar Retailer
            </h3>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              CARD 2: 72,000+ HOMES POWERED (#ED4F11 SOLAR FLAME)
             ══════════════════════════════════════════════════════════════ */}
          <div
            className="group relative transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center cursor-pointer"
            onMouseMove={(e) => handleMouseMove(1, e)}
            onMouseLeave={() => handleMouseLeave(1)}
          >
            {/* Top glowing accent border */}
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-[#ED4F11] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />

            {/* Emblem Container with React Bits 3D Magnetic Physics & #ED4F11 Glow */}
            <div
              ref={(el) => { emblemRefs.current[1] = el; }}
              className="w-18 h-22 xs:w-22 xs:h-26 sm:w-36 sm:h-40 lg:w-40 lg:h-44 relative flex items-center justify-center filter drop-shadow-[0_4px_10px_rgba(237,79,17,0.25)] sm:drop-shadow-[0_8px_18px_rgba(237,79,17,0.32)] group-hover:drop-shadow-[0_14px_28px_rgba(237,79,17,0.48)] transition-shadow duration-300 will-change-transform"
            >
              {/* React Bits Ambient Spotlight Glow */}
              <div className="absolute inset-0 rounded-full bg-[#ED4F11]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none" />

              <svg viewBox="0 0 160 170" className="w-full h-full overflow-visible" aria-label="72,000+ Families Powered">
                <defs>
                  {/* Outer Dial #ED4F11 Radiant Gradient */}
                  <linearGradient id="homeOrangeOuter" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="30%" stopColor="#FEE6DC" />
                    <stop offset="60%" stopColor="#F57C48" />
                    <stop offset="85%" stopColor="#ED4F11" />
                    <stop offset="100%" stopColor="#8A2703" />
                  </linearGradient>

                  {/* Dark Night Sky Dial with Warm Twilight Undertone */}
                  <radialGradient id="homeSkyDark" cx="50%" cy="45%" r="65%">
                    <stop offset="0%" stopColor="#3B1002" />
                    <stop offset="65%" stopColor="#1C0601" />
                    <stop offset="100%" stopColor="#0A0201" />
                  </radialGradient>

                  {/* Solar Sun Burst Glow */}
                  <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="30%" stopColor="#FFE0D3" />
                    <stop offset="70%" stopColor="#ED4F11" />
                    <stop offset="100%" stopColor="#B33405" />
                  </radialGradient>

                  {/* Ribbon #ED4F11 Gradient */}
                  <linearGradient id="homeRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5A1A02" />
                    <stop offset="20%" stopColor="#A32E05" />
                    <stop offset="50%" stopColor="#ED4F11" />
                    <stop offset="80%" stopColor="#A32E05" />
                    <stop offset="100%" stopColor="#5A1A02" />
                  </linearGradient>
                </defs>

                {/* Outer Precision Ring */}
                <circle cx="80" cy="76" r="68" fill="url(#homeOrangeOuter)" filter="url(#crestShadow)" />
                <circle cx="80" cy="76" r="63" fill="#8A2703" />
                <circle cx="80" cy="76" r="61" fill="url(#homeSkyDark)" />

                {/* Perimeter Calibrated Dial Notches (36 marks) */}
                <g stroke="#FEE6DC" strokeWidth="1" opacity="0.65">
                  {Array.from({ length: 36 }).map((_, i) => {
                    const angle = (i * 10) * (Math.PI / 180);
                    const r1 = i % 3 === 0 ? 54 : 57;
                    const r2 = 60;
                    return (
                      <line
                        key={i}
                        x1={80 + r1 * Math.cos(angle)}
                        y1={76 + r1 * Math.sin(angle)}
                        x2={80 + r2 * Math.cos(angle)}
                        y2={76 + r2 * Math.sin(angle)}
                        strokeWidth={i % 3 === 0 ? 1.5 : 0.8}
                      />
                    );
                  })}
                </g>

                {/* Glowing Sunrise Aura behind Roof (GSAP Breathing) */}
                <circle ref={sunAuraRef} cx="80" cy="54" r="28" fill="url(#sunGlow)" opacity="0.95" />
                {/* Sun Glow Outer Haze (GSAP Smooth Rotating Ring) */}
                <circle ref={sunRingRef} cx="80" cy="54" r="38" fill="none" stroke="#FEE6DC" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />

                {/* Radiant Solar Arcs above house */}
                <path d="M 64 36 C 74 30 86 30 96 36" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
                <path d="M 58 30 C 72 22 88 22 102 30" fill="none" stroke="#FEE6DC" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />

                {/* Architectural Modern Home Silhouette */}
                {/* House Base Walls */}
                <rect x="52" y="70" width="56" height="32" rx="2" fill="#2B0C02" stroke="#FEE6DC" strokeWidth="1.2" />

                {/* Gable Roofline (#ED4F11 Vivid Solar) */}
                <path
                  d="M 44 72 L 80 44 L 116 72 Z"
                  fill="#ED4F11"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />

                {/* Solar Panel Array on Roof (Photovoltaic Grid Facet) */}
                <polygon points="56,68 80,48 94,60 70,68" fill="#B33405" stroke="#FEE6DC" strokeWidth="0.8" />
                <line x1="68" y1="58" x2="82" y2="64" stroke="#FEE6DC" strokeWidth="0.8" />
                <line x1="63" y1="63" x2="77" y2="66" stroke="#FEE6DC" strokeWidth="0.8" />

                {/* Modern Window with Warm Glow */}
                <rect x="60" y="78" width="12" height="12" rx="1" fill="#FFE0D3" />
                <line x1="66" y1="78" x2="66" y2="90" stroke="#8A2703" strokeWidth="0.8" />
                <line x1="60" y1="84" x2="72" y2="84" stroke="#8A2703" strokeWidth="0.8" />

                {/* Modern Front Door */}
                <rect x="84" y="79" width="14" height="23" rx="1" fill="#3B1002" stroke="#ED4F11" strokeWidth="0.8" />
                <circle cx="94" cy="90" r="1.2" fill="#FFFFFF" />

                {/* 3D Milestone Banner Plaque */}
                <g>
                  {/* Left ribbon tail */}
                  <path d="M 16 118 L 28 108 L 28 130 L 16 126 Z" fill="#5A1A02" />
                  {/* Right ribbon tail */}
                  <path d="M 144 118 L 132 108 L 132 130 L 144 126 Z" fill="#5A1A02" />

                  {/* Banner body */}
                  <path
                    d="M 24 111 Q 80 118 136 111 L 132 133 Q 80 140 28 133 Z"
                    fill="url(#homeRibbonGrad)"
                    stroke="#FEE6DC"
                    strokeWidth="1.2"
                  />
                  <text
                    x="80"
                    y="126"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="9.5"
                    fontWeight="900"
                    fontFamily="system-ui, sans-serif"
                    letterSpacing="0.8"
                  >
                    {Math.round(count2).toLocaleString()}+ FAMILIES
                  </text>
                </g>
              </svg>
            </div>

            {/* Stat Callout with Live Moving Number Animation */}
            <div className="mt-1">
              <span className="text-sm xs:text-base sm:text-2xl lg:text-3xl font-serif font-black text-[#ED4F11] tracking-tight leading-tight">
                {Math.round(count2).toLocaleString()}+
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-0.5 sm:mt-1 text-[10px] xs:text-xs sm:text-base font-bold text-slate-800 leading-tight">
              Happy Australian Families
            </h3>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              CARD 3: 1.3M+ PANELS INSTALLED (#0E1648 ROYAL MIDNIGHT NAVY)
             ══════════════════════════════════════════════════════════════ */}
          <div
            className="group relative transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center cursor-pointer"
            onMouseMove={(e) => handleMouseMove(2, e)}
            onMouseLeave={() => handleMouseLeave(2)}
          >
            {/* Top glowing accent border */}
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-[#0E1648] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />

            {/* Emblem Container with React Bits 3D Magnetic Physics & #0E1648 Glow */}
            <div
              ref={(el) => { emblemRefs.current[2] = el; }}
              className="w-18 h-22 xs:w-22 xs:h-26 sm:w-36 sm:h-40 lg:w-40 lg:h-44 relative flex items-center justify-center filter drop-shadow-[0_4px_10px_rgba(14,22,72,0.25)] sm:drop-shadow-[0_8px_18px_rgba(14,22,72,0.32)] group-hover:drop-shadow-[0_14px_28px_rgba(14,22,72,0.48)] transition-shadow duration-300 will-change-transform"
            >
              {/* React Bits Ambient Spotlight Glow */}
              <div className="absolute inset-0 rounded-full bg-[#0E1648]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none" />

              <svg viewBox="0 0 160 170" className="w-full h-full overflow-visible" aria-label="1.3M+ Solar Panels Installed">
                <defs>
                  {/* Laurel Branch #0E1648 Midnight Navy Gradient */}
                  <linearGradient id="laurelNavyBranch" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="30%" stopColor="#D2D6EE" />
                    <stop offset="70%" stopColor="#3A4BB5" />
                    <stop offset="100%" stopColor="#0E1648" />
                  </linearGradient>

                  {/* Outer Medallion #0E1648 Gradient */}
                  <linearGradient id="navyMedallionOuter" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="25%" stopColor="#D2D6EE" />
                    <stop offset="55%" stopColor="#3A4BB5" />
                    <stop offset="80%" stopColor="#0E1648" />
                    <stop offset="100%" stopColor="#050920" />
                  </linearGradient>

                  {/* PV Silicon #0E1648 Deep Midnight Gradient */}
                  <linearGradient id="pvNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3A4BB5" />
                    <stop offset="50%" stopColor="#0E1648" />
                    <stop offset="100%" stopColor="#050920" />
                  </linearGradient>

                  {/* Specular Glint Reflection */}
                  <linearGradient id="pvGlint" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
                    <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>

                  {/* Ribbon Deep #0E1648 Navy Gradient */}
                  <linearGradient id="navyRibbonGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#050920" />
                    <stop offset="20%" stopColor="#0E1648" />
                    <stop offset="50%" stopColor="#1E2B7A" />
                    <stop offset="80%" stopColor="#0E1648" />
                    <stop offset="100%" stopColor="#050920" />
                  </linearGradient>
                </defs>

                {/* Twin Laurel Wreath Framing (Branches in #0E1648 Navy) */}
                <g fill="url(#laurelNavyBranch)" stroke="#0E1648" strokeWidth="0.4">
                  {/* Left Wreath Leaves */}
                  <path d="M 28 66 C 18 60 14 48 24 44 C 30 50 34 58 28 66 Z" />
                  <path d="M 22 84 C 10 80 8 68 18 62 C 24 68 28 76 22 84 Z" />
                  <path d="M 24 102 C 14 102 10 90 20 84 C 26 90 28 98 24 102 Z" />
                  <path d="M 34 118 C 24 120 20 110 28 104 C 34 108 36 114 34 118 Z" />

                  {/* Right Wreath Leaves */}
                  <path d="M 132 66 C 142 60 146 48 136 44 C 130 50 126 58 132 66 Z" />
                  <path d="M 138 84 C 150 80 152 68 142 62 C 136 68 132 76 138 84 Z" />
                  <path d="M 136 102 C 146 102 150 90 140 84 C 134 90 132 98 136 102 Z" />
                  <path d="M 126 118 C 136 120 140 110 132 104 C 126 108 124 114 126 118 Z" />
                </g>

                {/* Central Medallion Frame */}
                <circle cx="80" cy="74" r="54" fill="url(#navyMedallionOuter)" filter="url(#crestShadow)" />
                <circle cx="80" cy="74" r="50" fill="#0E1648" />
                <circle cx="80" cy="74" r="48" fill="#060A24" />

                {/* 3D Isometric High-Efficiency PV Solar Module */}
                <g transform="translate(80, 68)">
                  {/* Module Aluminum Outer Frame */}
                  <polygon
                    points="-34,-16 0,-34 34,-16 0,2"
                    fill="#0E1648"
                    stroke="#D2D6EE"
                    strokeWidth="1.2"
                  />
                  {/* Silicon Solar Cells (6-cell monocrystalline grid) */}
                  <polygon
                    points="-32,-15 0,-31 32,-15 0,1"
                    fill="url(#pvNavyGrad)"
                  />
                  {/* Grid Lines / Busbars */}
                  <line x1="-16" y1="-23" x2="16" y2="-7" stroke="#D2D6EE" strokeWidth="0.7" opacity="0.9" />
                  <line x1="0" y1="-31" x2="0" y2="1" stroke="#D2D6EE" strokeWidth="0.7" opacity="0.9" />
                  <line x1="-16" y1="-7" x2="16" y2="-23" stroke="#D2D6EE" strokeWidth="0.5" opacity="0.7" />

                  {/* Light Reflection Glint (GSAP Shimmer) */}
                  <polygon
                    ref={panelGlintRef}
                    points="-28,-14 -10,-23 4,-16 -14,-7"
                    fill="url(#pvGlint)"
                  />

                  {/* Second lower panel in cascade */}
                  <polygon
                    points="-34,0 0,-18 34,0 0,18"
                    fill="#0E1648"
                    stroke="#D2D6EE"
                    strokeWidth="1.2"
                  />
                  <polygon
                    points="-32,1 0,-15 32,1 0,17"
                    fill="url(#pvNavyGrad)"
                  />
                  <line x1="-16" y1="-7" x2="16" y2="9" stroke="#D2D6EE" strokeWidth="0.7" opacity="0.9" />
                  <line x1="0" y1="-15" x2="0" y2="17" stroke="#D2D6EE" strokeWidth="0.7" opacity="0.9" />

                  {/* Floating Energy Spark (GSAP Twinkle) */}
                  <g ref={sparkRef}>
                    <circle cx="24" cy="-24" r="2" fill="#38BDF8" />
                    <line x1="24" y1="-28" x2="24" y2="-20" stroke="#38BDF8" strokeWidth="1" />
                    <line x1="20" y1="-24" x2="28" y2="-24" stroke="#38BDF8" strokeWidth="1" />
                  </g>
                </g>

                {/* 3D Milestone Banner Plaque */}
                <g>
                  <path d="M 18 116 L 30 106 L 30 128 L 18 124 Z" fill="#050920" />
                  <path d="M 142 116 L 130 106 L 130 128 L 142 124 Z" fill="#050920" />

                  <path
                    d="M 26 109 Q 80 116 134 109 L 130 131 Q 80 138 30 131 Z"
                    fill="url(#navyRibbonGrad3)"
                    stroke="#D2D6EE"
                    strokeWidth="1.2"
                  />
                  <text
                    x="80"
                    y="124"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="9.5"
                    fontWeight="900"
                    fontFamily="system-ui, sans-serif"
                    letterSpacing="0.8"
                  >
                    {count3.toFixed(1)}M+ PANELS
                  </text>
                </g>
              </svg>
            </div>

            {/* Stat Callout with Live Moving Number Animation */}
            <div className="mt-1">
              <span className="text-sm xs:text-base sm:text-2xl lg:text-3xl font-serif font-black text-[#0E1648] tracking-tight leading-tight">
                {count3.toFixed(1)}M+
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-0.5 sm:mt-1 text-[10px] xs:text-xs sm:text-base font-bold text-slate-800 leading-tight">
              Solar Panels Installed
            </h3>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              CARD 4: 800MW+ CLEAN ENERGY (#346820 CLEAN FOREST GREEN)
             ══════════════════════════════════════════════════════════════ */}
          <div
            className="group relative transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center cursor-pointer"
            onMouseMove={(e) => handleMouseMove(3, e)}
            onMouseLeave={() => handleMouseLeave(3)}
          >
            {/* Top glowing accent border */}
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-[#346820] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />

            {/* Emblem Container with React Bits 3D Magnetic Physics & #346820 Glow */}
            <div
              ref={(el) => { emblemRefs.current[3] = el; }}
              className="w-18 h-22 xs:w-22 xs:h-26 sm:w-36 sm:h-40 lg:w-40 lg:h-44 relative flex items-center justify-center filter drop-shadow-[0_4px_10px_rgba(52,104,32,0.22)] sm:drop-shadow-[0_8px_18px_rgba(52,104,32,0.3)] group-hover:drop-shadow-[0_14px_28px_rgba(52,104,32,0.45)] transition-shadow duration-300 will-change-transform"
            >
              {/* React Bits Ambient Spotlight Glow */}
              <div className="absolute inset-0 rounded-full bg-[#346820]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none" />

              <svg viewBox="0 0 160 170" className="w-full h-full overflow-visible" aria-label="800MW+ Clean Energy Generated">
                <defs>
                  {/* Clean Energy #346820 Forest Green Gradient */}
                  <linearGradient id="powerGreenOuter" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="30%" stopColor="#D5E8CB" />
                    <stop offset="60%" stopColor="#5E9946" />
                    <stop offset="85%" stopColor="#346820" />
                    <stop offset="100%" stopColor="#13270B" />
                  </linearGradient>

                  {/* Dynamic Power Core Radial in #346820 */}
                  <radialGradient id="powerSurgeCoreGreen" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="35%" stopColor="#D5E8CB" />
                    <stop offset="70%" stopColor="#5E9946" />
                    <stop offset="100%" stopColor="#346820" />
                  </radialGradient>

                  {/* Surge Bolt Electric Glow in Lime / Clean Green */}
                  <linearGradient id="surgeBoltGradGreen" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FEF08A" />
                    <stop offset="50%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#A8D494" />
                  </linearGradient>

                  {/* Ribbon Deep #346820 Green Gradient */}
                  <linearGradient id="greenRibbonGrad4" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#13270B" />
                    <stop offset="20%" stopColor="#224514" />
                    <stop offset="50%" stopColor="#346820" />
                    <stop offset="80%" stopColor="#224514" />
                    <stop offset="100%" stopColor="#13270B" />
                  </linearGradient>
                </defs>

                {/* Outer Calibrated Dial with Megawatt Tachymeter */}
                <circle cx="80" cy="74" r="66" fill="url(#powerGreenOuter)" filter="url(#crestShadow)" />
                <circle cx="80" cy="74" r="61" fill="#346820" />
                <circle cx="80" cy="74" r="59" fill="#13270B" />

                {/* Megawatt Instrument Markings (Circular Dial) */}
                <g stroke="#D5E8CB" strokeWidth="1" opacity="0.7">
                  {Array.from({ length: 32 }).map((_, i) => {
                    const angle = (i * 11.25) * (Math.PI / 180);
                    const r1 = i % 4 === 0 ? 51 : 55;
                    const r2 = 58;
                    return (
                      <line
                        key={i}
                        x1={80 + r1 * Math.cos(angle)}
                        y1={74 + r1 * Math.sin(angle)}
                        x2={80 + r2 * Math.cos(angle)}
                        y2={74 + r2 * Math.sin(angle)}
                        strokeWidth={i % 4 === 0 ? 1.6 : 0.8}
                      />
                    );
                  })}
                </g>

                {/* Dual Interlocking Energy Orbital Rings (#346820 Clean Energy & Teal - GSAP Counter-Rotation) */}
                <ellipse
                  ref={orbitRing1Ref}
                  cx="80"
                  cy="72"
                  rx="42"
                  ry="20"
                  fill="none"
                  stroke="#5E9946"
                  strokeWidth="2.2"
                  transform="rotate(-28 80 72)"
                  strokeDasharray="18 4"
                />
                <ellipse
                  ref={orbitRing2Ref}
                  cx="80"
                  cy="72"
                  rx="42"
                  ry="20"
                  fill="none"
                  stroke="#34D399"
                  strokeWidth="2.2"
                  transform="rotate(28 80 72)"
                  strokeDasharray="18 4"
                />

                {/* Central High-Output Battery & Power Surge Core */}
                <circle cx="80" cy="72" r="23" fill="url(#powerSurgeCoreGreen)" stroke="#D5E8CB" strokeWidth="1.2" />
                <circle cx="80" cy="72" r="18" fill="#13270B" opacity="0.4" />

                {/* Dynamic Lightning Surge Bolt (GSAP Electric Surge Pulse) */}
                <polygon
                  ref={surgeBoltRef}
                  points="83,54 71,72 79,72 77,90 89,70 81,70"
                  fill="url(#surgeBoltGradGreen)"
                  stroke="#FFFFFF"
                  strokeWidth="0.8"
                  filter="drop-shadow(0 2px 3px rgba(0,0,0,0.5))"
                />

                {/* Ambient Power Flux Dots */}
                <circle cx="62" cy="62" r="2" fill="#D5E8CB" />
                <circle cx="98" cy="62" r="2" fill="#5E9946" />
                <circle cx="80" cy="42" r="2.5" fill="#A8D494" />

                {/* 3D Milestone Banner Plaque */}
                <g>
                  <path d="M 18 116 L 30 106 L 30 128 L 18 124 Z" fill="#13270B" />
                  <path d="M 142 116 L 130 106 L 130 128 L 142 124 Z" fill="#13270B" />

                  <path
                    d="M 26 109 Q 80 116 134 109 L 130 131 Q 80 138 30 131 Z"
                    fill="url(#greenRibbonGrad4)"
                    stroke="#D5E8CB"
                    strokeWidth="1.2"
                  />
                  <text
                    x="80"
                    y="124"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="9.5"
                    fontWeight="900"
                    fontFamily="system-ui, sans-serif"
                    letterSpacing="0.8"
                  >
                    {Math.round(count4)}MW+ GENERATED
                  </text>
                </g>
              </svg>
            </div>

            {/* Stat Callout with Live Moving Number Animation */}
            <div className="mt-1">
              <span className="text-sm xs:text-base sm:text-2xl lg:text-3xl font-serif font-black text-[#346820] tracking-tight leading-tight">
                {Math.round(count4)}MW+
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-0.5 sm:mt-1 text-[10px] xs:text-xs sm:text-base font-bold text-slate-800 leading-tight">
              Clean Energy &amp; Battery
            </h3>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PreferSunnySolarSection;

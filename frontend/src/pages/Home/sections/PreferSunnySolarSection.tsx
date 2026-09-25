import React from 'react';


/**
 * PreferSunnySolarSection
 * Ultra-modern Clean Energy Authority Suite showcasing 4 flagship milestones.
 * Replaces dated clip-art medallions with bespoke, high-precision vector emblems,
 * luminous metallic gold & amber gradients, and interactive frosted-glass cards.
 */
export const PreferSunnySolarSection: React.FC = () => {
  return (
    <section
      className="relative py-8 sm:py-10 lg:py-14 bg-linear-to-b from-white via-[#F5F7FD] to-white border-y border-[#D1DCF8] overflow-hidden"
      aria-label="Why Most Australians Prefer Sunny Solar"
    >
      {/* Dynamic ambient backlight glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-212.5 h-100 bg-[#2B3CB8]/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#2B3CB8]/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#2B3CB8]/5 blur-3xl rounded-full pointer-events-none" />

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

        {/* 4 Authority Cards: 4 in one line on mobile */}
        <div className="grid grid-cols-4 gap-1.5 xs:gap-2.5 sm:gap-6 lg:gap-7">

          {/* ══════════════════════════════════════════════════════════════
              CARD 1: #1 RATED SOLAR RETAILER (SOVEREIGN CREST)
             ══════════════════════════════════════════════════════════════ */}
          <div className="group relative transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center">
            {/* Top glowing accent border */}
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-[#2B3CB8] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />

            {/* Emblem Container */}
            <div className="w-18 h-22 xs:w-22 xs:h-26 sm:w-36 sm:h-40 lg:w-40 lg:h-44 relative flex items-center justify-center filter drop-shadow-[0_4px_10px_rgba(43,60,184,0.18)] sm:drop-shadow-[0_8px_18px_rgba(43,60,184,0.22)] group-hover:drop-shadow-[0_14px_28px_rgba(43,60,184,0.32)] transition-all transform group-hover:scale-105 duration-300">
              <svg viewBox="0 0 160 170" className="w-full h-full overflow-visible" aria-label="Australia's #1 Solar Retailer">
                <defs>
                  {/* Shield Outer Blue/White Chrome Gradient */}
                  <linearGradient id="crestGoldOuter" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="25%" stopColor="#D1DCF8" />
                    <stop offset="50%" stopColor="#6F8EE7" />
                    <stop offset="75%" stopColor="#2B3CB8" />
                    <stop offset="100%" stopColor="#151E64" />
                  </linearGradient>

                  {/* Shield Inner Dark Enamel */}
                  <radialGradient id="crestDarkEnamel" cx="50%" cy="40%" r="65%">
                    <stop offset="0%" stopColor="#151E64" />
                    <stop offset="60%" stopColor="#0C123E" />
                    <stop offset="100%" stopColor="#070A24" />
                  </radialGradient>

                  {/* Ribbon Blue Gradient */}
                  <linearGradient id="crestRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0C123E" />
                    <stop offset="20%" stopColor="#1D2984" />
                    <stop offset="50%" stopColor="#2B3CB8" />
                    <stop offset="80%" stopColor="#1D2984" />
                    <stop offset="100%" stopColor="#0C123E" />
                  </linearGradient>

                  {/* 3D Drop Shadow */}
                  <filter id="crestShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3" floodColor="#0C123E" />
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
                  fill="#151E64"
                />

                {/* Inner Obsidian Field */}
                <path
                  d="M 80,19 C 110,19 133,29 133,58 C 133,98 101,125 80,139 C 59,125 27,98 27,58 C 27,29 50,19 80,19 Z"
                  fill="url(#crestDarkEnamel)"
                />

                {/* Guilloché / Radial Sun Rays inside Shield */}
                <g opacity="0.35" stroke="#D1DCF8" strokeWidth="0.8">
                  {Array.from({ length: 18 }).map((_, i) => {
                    const angle = (i * 10 - 85) * (Math.PI / 180);
                    const x2 = 80 + 52 * Math.cos(angle);
                    const y2 = 72 + 52 * Math.sin(angle);
                    return <line key={i} x1="80" y1="72" x2={x2} y2={y2} />;
                  })}
                </g>

                {/* 5-Star Arc at Top */}
                <g fill="#D1DCF8">
                  <path d="M 54,36 L 56,40 L 61,40 L 57,43 L 58,47 L 54,44 L 50,47 L 51,43 L 47,40 L 52,40 Z" />
                  <path d="M 67,31 L 69,35 L 74,35 L 70,38 L 71,42 L 67,39 L 63,42 L 64,38 L 60,35 L 65,35 Z" />
                  <path d="M 80,28 L 82.5,33 L 88,33 L 83.5,36.5 L 85,41.5 L 80,38 L 75,41.5 L 76.5,36.5 L 72,33 L 77.5,33 Z" />
                  <path d="M 93,31 L 95,35 L 100,35 L 96,38 L 97,42 L 93,39 L 89,42 L 90,38 L 86,35 L 91,35 Z" />
                  <path d="M 106,36 L 108,40 L 113,40 L 109,43 L 110,47 L 106,44 L 102,47 L 103,43 L 99,40 L 104,40 Z" />
                </g>

                {/* Monumental Sculpted #1 */}
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
                  1
                </text>

                {/* "OF AUSTRALIA" Small Header above ribbon */}
                <text
                  x="80"
                  y="98"
                  textAnchor="middle"
                  fill="#D1DCF8"
                  fontSize="8"
                  fontWeight="800"
                  fontFamily="system-ui, sans-serif"
                  letterSpacing="1.8"
                >
                  AUSTRALIA&apos;S
                </text>

                {/* 3D Folded Ribbon */}
                <g>
                  {/* Ribbon Left Fold */}
                  <path d="M 12 115 L 26 104 L 26 126 L 12 122 Z" fill="#0C123E" />
                  {/* Ribbon Right Fold */}
                  <path d="M 148 115 L 134 104 L 134 126 L 148 122 Z" fill="#0C123E" />

                  {/* Main Ribbon Plaque */}
                  <path
                    d="M 22 107 Q 80 114 138 107 L 134 128 Q 80 135 26 128 Z"
                    fill="url(#crestRibbonGrad)"
                    stroke="#D1DCF8"
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

            {/* Stat Callout */}
            <div className="mt-1">
              <span className="text-sm xs:text-base sm:text-2xl lg:text-3xl font-serif font-black text-slate-900 tracking-tight leading-tight">
                #1 Rated
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-0.5 sm:mt-1 text-[10px] xs:text-xs sm:text-base font-bold text-slate-800 leading-tight">
              Leading Solar Retailer
            </h3>

          </div>

          {/* ══════════════════════════════════════════════════════════════
              CARD 2: 72,000+ HOMES POWERED (SOLAR RESIDENCE & NEXUS)
             ══════════════════════════════════════════════════════════════ */}
          <div className="group relative transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center">
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-[#2B3CB8] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />

            {/* Emblem Container */}
            <div className="w-18 h-22 xs:w-22 xs:h-26 sm:w-36 sm:h-40 lg:w-40 lg:h-44 relative flex items-center justify-center filter drop-shadow-[0_4px_10px_rgba(43,60,184,0.2)] sm:drop-shadow-[0_8px_18px_rgba(43,60,184,0.25)] group-hover:drop-shadow-[0_14px_28px_rgba(43,60,184,0.38)] transition-all transform group-hover:scale-105 duration-300">
              <svg viewBox="0 0 160 170" className="w-full h-full overflow-visible" aria-label="72,000+ Families Powered">
                <defs>
                  {/* Outer Dial Blue/White Gradient */}
                  <linearGradient id="homeGoldOuter" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="30%" stopColor="#D1DCF8" />
                    <stop offset="60%" stopColor="#6F8EE7" />
                    <stop offset="85%" stopColor="#2B3CB8" />
                    <stop offset="100%" stopColor="#151E64" />
                  </linearGradient>

                  {/* Dark Night Sky Dial */}
                  <radialGradient id="homeSkyDark" cx="50%" cy="45%" r="65%">
                    <stop offset="0%" stopColor="#151E64" />
                    <stop offset="65%" stopColor="#0C123E" />
                    <stop offset="100%" stopColor="#070A24" />
                  </radialGradient>

                  {/* Solar Sun Burst */}
                  <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="45%" stopColor="#D1DCF8" />
                    <stop offset="80%" stopColor="#6F8EE7" />
                    <stop offset="100%" stopColor="#2B3CB8" />
                  </radialGradient>
                </defs>

                {/* Outer Precision Ring */}
                <circle cx="80" cy="76" r="68" fill="url(#homeGoldOuter)" filter="url(#crestShadow)" />
                <circle cx="80" cy="76" r="63" fill="#151E64" />
                <circle cx="80" cy="76" r="61" fill="url(#homeSkyDark)" />

                {/* Perimeter Calibrated Dial Notches (36 marks) */}
                <g stroke="#D1DCF8" strokeWidth="1" opacity="0.6">
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

                {/* Glowing Sunrise Aura behind Roof */}
                <circle cx="80" cy="54" r="28" fill="url(#sunGlow)" opacity="0.9" />
                {/* Sun Glow Outer Haze */}
                <circle cx="80" cy="54" r="38" fill="none" stroke="#D1DCF8" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.5" />

                {/* Radiant Solar Arcs above house */}
                <path d="M 64 36 C 74 30 86 30 96 36" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
                <path d="M 58 30 C 72 22 88 22 102 30" fill="none" stroke="#D1DCF8" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />

                {/* Architectural Modern Home Silhouette */}
                {/* House Base Walls */}
                <rect x="52" y="70" width="56" height="32" rx="2" fill="#0C123E" stroke="#D1DCF8" strokeWidth="1.2" />

                {/* Gable Roofline (Left & Right Pitch) */}
                <path
                  d="M 44 72 L 80 44 L 116 72 Z"
                  fill="#2B3CB8"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />

                {/* Solar Panel Array on Roof (Photovoltaic Grid Facet) */}
                <polygon points="56,68 80,48 94,60 70,68" fill="#1D2984" stroke="#D1DCF8" strokeWidth="0.8" />
                <line x1="68" y1="58" x2="82" y2="64" stroke="#D1DCF8" strokeWidth="0.8" />
                <line x1="63" y1="63" x2="77" y2="66" stroke="#D1DCF8" strokeWidth="0.8" />

                {/* Modern Window with Warm Glow */}
                <rect x="60" y="78" width="12" height="12" rx="1" fill="#D1DCF8" />
                <line x1="66" y1="78" x2="66" y2="90" stroke="#0C123E" strokeWidth="0.8" />
                <line x1="60" y1="84" x2="72" y2="84" stroke="#0C123E" strokeWidth="0.8" />

                {/* Modern Front Door */}
                <rect x="84" y="79" width="14" height="23" rx="1" fill="#151E64" stroke="#6F8EE7" strokeWidth="0.8" />
                <circle cx="94" cy="90" r="1.2" fill="#FFFFFF" />

                {/* 3D Milestone Banner Plaque */}
                <g>
                  {/* Left ribbon tail */}
                  <path d="M 16 118 L 28 108 L 28 130 L 16 126 Z" fill="#0C123E" />
                  {/* Right ribbon tail */}
                  <path d="M 144 118 L 132 108 L 132 130 L 144 126 Z" fill="#0C123E" />

                  {/* Banner body */}
                  <path
                    d="M 24 111 Q 80 118 136 111 L 132 133 Q 80 140 28 133 Z"
                    fill="url(#crestRibbonGrad)"
                    stroke="#D1DCF8"
                    strokeWidth="1.2"
                  />
                  <text
                    x="80"
                    y="126"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="10"
                    fontWeight="900"
                    fontFamily="system-ui, sans-serif"
                    letterSpacing="0.8"
                  >
                    72,000+ FAMILIES
                  </text>
                </g>
              </svg>
            </div>

            {/* Stat Callout */}
            <div className="mt-1">
              <span className="text-sm xs:text-base sm:text-2xl lg:text-3xl font-serif font-black text-slate-900 tracking-tight leading-tight">
                72,000+
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-0.5 sm:mt-1 text-[10px] xs:text-xs sm:text-base font-bold text-slate-800 leading-tight">
              Happy Australian Families
            </h3>

          </div>

          {/* ══════════════════════════════════════════════════════════════
              CARD 3: 1.3M+ PANELS INSTALLED (TIER-1 PV ARRAY MEDALLION)
             ══════════════════════════════════════════════════════════════ */}
          <div className="group relative transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center">
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-[#2B3CB8] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />

            {/* Emblem Container */}
            <div className="w-18 h-22 xs:w-22 xs:h-26 sm:w-36 sm:h-40 lg:w-40 lg:h-44 relative flex items-center justify-center filter drop-shadow-[0_4px_10px_rgba(43,60,184,0.18)] sm:drop-shadow-[0_8px_18px_rgba(43,60,184,0.22)] group-hover:drop-shadow-[0_14px_28px_rgba(43,60,184,0.36)] transition-all transform group-hover:scale-105 duration-300">
              <svg viewBox="0 0 160 170" className="w-full h-full overflow-visible" aria-label="1.3M+ Solar Panels Installed">
                <defs>
                  {/* Laurel Blue Gradient */}
                  <linearGradient id="laurelGoldBranch" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="35%" stopColor="#D1DCF8" />
                    <stop offset="75%" stopColor="#6F8EE7" />
                    <stop offset="100%" stopColor="#2B3CB8" />
                  </linearGradient>

                  {/* PV Deep Solar Blue */}
                  <linearGradient id="pvSiliconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6F8EE7" />
                    <stop offset="50%" stopColor="#2B3CB8" />
                    <stop offset="100%" stopColor="#0C123E" />
                  </linearGradient>

                  {/* Specular Glint Reflection */}
                  <linearGradient id="pvGlint" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                    <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Twin Laurel Wreath Framing (Left & Right Branches) */}
                <g fill="url(#laurelGoldBranch)" stroke="#151E64" strokeWidth="0.4">
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
                <circle cx="80" cy="74" r="54" fill="url(#crestGoldOuter)" filter="url(#crestShadow)" />
                <circle cx="80" cy="74" r="50" fill="#151E64" />
                <circle cx="80" cy="74" r="48" fill="#0C123E" />

                {/* 3D Isometric High-Efficiency PV Solar Module */}
                <g transform="translate(80, 68)">
                  {/* Module Aluminum Outer Frame */}
                  <polygon
                    points="-34,-16 0,-34 34,-16 0,2"
                    fill="#151E64"
                    stroke="#D1DCF8"
                    strokeWidth="1.2"
                  />
                  {/* Silicon Solar Cells (6-cell monocrystalline grid) */}
                  <polygon
                    points="-32,-15 0,-31 32,-15 0,1"
                    fill="url(#pvSiliconGrad)"
                  />
                  {/* Grid Lines / Busbars */}
                  <line x1="-16" y1="-23" x2="16" y2="-7" stroke="#D1DCF8" strokeWidth="0.7" opacity="0.9" />
                  <line x1="0" y1="-31" x2="0" y2="1" stroke="#D1DCF8" strokeWidth="0.7" opacity="0.9" />
                  <line x1="-16" y1="-7" x2="16" y2="-23" stroke="#D1DCF8" strokeWidth="0.5" opacity="0.7" />

                  {/* Light Reflection Glint */}
                  <polygon
                    points="-28,-14 -10,-23 4,-16 -14,-7"
                    fill="url(#pvGlint)"
                  />

                  {/* Second lower panel in cascade */}
                  <polygon
                    points="-34,0 0,-18 34,0 0,18"
                    fill="#151E64"
                    stroke="#D1DCF8"
                    strokeWidth="1.2"
                  />
                  <polygon
                    points="-32,1 0,-15 32,1 0,17"
                    fill="url(#pvSiliconGrad)"
                  />
                  <line x1="-16" y1="-7" x2="16" y2="9" stroke="#D1DCF8" strokeWidth="0.7" opacity="0.9" />
                  <line x1="0" y1="-15" x2="0" y2="17" stroke="#D1DCF8" strokeWidth="0.7" opacity="0.9" />

                  {/* Floating Energy Spark */}
                  <circle cx="24" cy="-24" r="2" fill="#FFFFFF" />
                  <line x1="24" y1="-28" x2="24" y2="-20" stroke="#FFFFFF" strokeWidth="1" />
                  <line x1="20" y1="-24" x2="28" y2="-24" stroke="#FFFFFF" strokeWidth="1" />
                </g>

                {/* 3D Milestone Banner Plaque */}
                <g>
                  <path d="M 18 116 L 30 106 L 30 128 L 18 124 Z" fill="#0C123E" />
                  <path d="M 142 116 L 130 106 L 130 128 L 142 124 Z" fill="#0C123E" />

                  <path
                    d="M 26 109 Q 80 116 134 109 L 130 131 Q 80 138 30 131 Z"
                    fill="url(#crestRibbonGrad)"
                    stroke="#D1DCF8"
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
                    letterSpacing="1"
                  >
                    1.3M+ PANELS
                  </text>
                </g>
              </svg>
            </div>

            {/* Stat Callout */}
            <div className="mt-1">
              <span className="text-sm xs:text-base sm:text-2xl lg:text-3xl font-serif font-black text-slate-900 tracking-tight leading-tight">
                1.3M+
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-0.5 sm:mt-1 text-[10px] xs:text-xs sm:text-base font-bold text-slate-800 leading-tight">
              Solar Panels Installed
            </h3>

          </div>

          {/* ══════════════════════════════════════════════════════════════
              CARD 4: 800MW+ CLEAN ENERGY (DYNAMIC POWER CORE & BATTERY)
             ══════════════════════════════════════════════════════════════ */}
          <div className="group relative transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center">
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-[#2B3CB8] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />

            {/* Emblem Container */}
            <div className="w-18 h-22 xs:w-22 xs:h-26 sm:w-36 sm:h-40 lg:w-40 lg:h-44 relative flex items-center justify-center filter drop-shadow-[0_4px_10px_rgba(43,60,184,0.18)] sm:drop-shadow-[0_8px_18px_rgba(43,60,184,0.22)] group-hover:drop-shadow-[0_14px_28px_rgba(43,60,184,0.36)] transition-all transform group-hover:scale-105 duration-300">
              <svg viewBox="0 0 160 170" className="w-full h-full overflow-visible" aria-label="800MW+ Clean Energy Generated">
                <defs>
                  {/* Clean Energy Blue/White Gradient */}
                  <linearGradient id="emeraldCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="40%" stopColor="#D1DCF8" />
                    <stop offset="80%" stopColor="#6F8EE7" />
                    <stop offset="100%" stopColor="#2B3CB8" />
                  </linearGradient>

                  {/* Surge Bolt Gradient */}
                  <linearGradient id="surgeBoltGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="50%" stopColor="#D1DCF8" />
                    <stop offset="100%" stopColor="#6F8EE7" />
                  </linearGradient>
                </defs>

                {/* Outer Calibrated Dial with Megawatt Tachymeter */}
                <circle cx="80" cy="74" r="66" fill="url(#crestGoldOuter)" filter="url(#crestShadow)" />
                <circle cx="80" cy="74" r="61" fill="#151E64" />
                <circle cx="80" cy="74" r="59" fill="#0C123E" />

                {/* Megawatt Instrument Markings (Circular Dial) */}
                <g stroke="#D1DCF8" strokeWidth="1" opacity="0.65">
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

                {/* Dual Interlocking Energy Orbital Rings */}
                {/* Solar Blue Orbital Ring */}
                <ellipse
                  cx="80"
                  cy="72"
                  rx="42"
                  ry="20"
                  fill="none"
                  stroke="#6F8EE7"
                  strokeWidth="2.2"
                  transform="rotate(-28 80 72)"
                  strokeDasharray="18 4"
                />
                {/* Clean-Energy Orbital Ring */}
                <ellipse
                  cx="80"
                  cy="72"
                  rx="42"
                  ry="20"
                  fill="none"
                  stroke="#D1DCF8"
                  strokeWidth="2.2"
                  transform="rotate(28 80 72)"
                  strokeDasharray="18 4"
                />

                {/* Central High-Output Battery & Power Surge Core */}
                {/* Clean Energy Core Circle */}
                <circle cx="80" cy="72" r="23" fill="url(#emeraldCoreGrad)" stroke="#D1DCF8" strokeWidth="1.2" />
                <circle cx="80" cy="72" r="18" fill="#0C123E" opacity="0.4" />

                {/* Dynamic Lightning Surge Bolt */}
                <polygon
                  points="83,54 71,72 79,72 77,90 89,70 81,70"
                  fill="url(#surgeBoltGrad)"
                  stroke="#FFFFFF"
                  strokeWidth="0.8"
                  filter="drop-shadow(0 2px 3px rgba(0,0,0,0.5))"
                />

                {/* Ambient Power Flux Dots */}
                <circle cx="62" cy="62" r="2" fill="#D1DCF8" />
                <circle cx="98" cy="62" r="2" fill="#6F8EE7" />
                <circle cx="80" cy="42" r="2.5" fill="#FFFFFF" />

                {/* 3D Milestone Banner Plaque */}
                <g>
                  <path d="M 18 116 L 30 106 L 30 128 L 18 124 Z" fill="#0C123E" />
                  <path d="M 142 116 L 130 106 L 130 128 L 142 124 Z" fill="#0C123E" />

                  <path
                    d="M 26 109 Q 80 116 134 109 L 130 131 Q 80 138 30 131 Z"
                    fill="url(#crestRibbonGrad)"
                    stroke="#D1DCF8"
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
                    letterSpacing="1"
                  >
                    800MW+ GENERATED
                  </text>
                </g>
              </svg>
            </div>

            {/* Stat Callout */}
            <div className="mt-1">
              <span className="text-sm xs:text-base sm:text-2xl lg:text-3xl font-serif font-black text-slate-900 tracking-tight leading-tight">
                800MW+
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

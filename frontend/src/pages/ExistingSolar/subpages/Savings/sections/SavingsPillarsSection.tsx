import React, { useState, useRef } from 'react';
import {
  SunMedium,
  ArrowLeftRight,
  ShieldAlert,
  Check,
  PieChart,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const SavingsPillarsSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const pillars = [
    {
      id: 1,
      badge: 'Pillar 01 • 70% Value',
      tabLabel: '01. Self-Use (70%)',
      title: 'Daytime Self-Consumption',
      desc: 'Every kilowatt-hour consumed immediately by high-draw appliances (air-conditioning, pool filtration, heat pumps, EV charging) completely eliminates an expensive retail purchase.',
      icon: SunMedium,
      iconBg: 'bg-amber-50',
      iconBorder: 'border-amber-200',
      iconColor: 'text-amber-600',
      badgeTheme: 'text-amber-700 bg-amber-50 border-amber-200',
      bullets: [
        'Zero variable kWh cost during sunshine hours',
        'Runs heavy loads completely free off the roof',
      ],
      footerLabel: 'Direct Value Per kWh',
      footerValue: '32¢ – 38¢ Saved',
      footerTag: 'Highest ROI',
      footerBg: 'bg-amber-50/60',
      footerBorder: 'border-t-amber-100/60',
      footerText: 'text-amber-800',
      tagColor: 'text-amber-700 border-amber-200',
      activeColor: 'bg-amber-500 text-white',
      dotColor: 'bg-amber-500',
    },
    {
      id: 2,
      badge: 'Pillar 02 • 20% Value',
      tabLabel: '02. Feed-In (20%)',
      title: 'Grid Export Credits (FIT)',
      desc: 'Surplus daytime generation spills safely back into the Queensland grid. These credits directly chip away at mandatory daily service charges (typically $1.30/day).',
      icon: ArrowLeftRight,
      iconBg: 'bg-emerald-50',
      iconBorder: 'border-emerald-200',
      iconColor: 'text-emerald-600',
      badgeTheme: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      bullets: [
        'Offsets unavoidable daily connection fees',
        'Automatic quarterly credit deduction on bills',
      ],
      footerLabel: 'Export Credit Rate',
      footerValue: '6.0¢ – 11.5¢ / kWh',
      footerTag: 'Bill Credit',
      footerBg: 'bg-emerald-50/60',
      footerBorder: 'border-t-emerald-100/60',
      footerText: 'text-emerald-800',
      tagColor: 'text-emerald-700 border-emerald-200',
      activeColor: 'bg-emerald-600 text-white',
      dotColor: 'bg-emerald-600',
    },
    {
      id: 3,
      badge: 'Pillar 03 • 10% Value',
      tabLabel: '03. Shield (10%)',
      title: 'Inflation & Tariff Shield',
      desc: 'When energy retailers hike quarterly electricity rates, unsolarized neighbors pay more. For you, higher grid tariffs increase the exact financial value of every solar kWh produced.',
      icon: ShieldAlert,
      iconBg: 'bg-blue-50',
      iconBorder: 'border-blue-200',
      iconColor: 'text-blue-600',
      badgeTheme: 'text-blue-700 bg-blue-50 border-blue-200',
      bullets: [
        'Locks in zero-cost daytime power for 25+ years',
        'Higher utility prices amplify your net ROI',
      ],
      footerLabel: 'Compounding Protection',
      footerValue: '+8.5% YoY Hedge',
      footerTag: 'Guaranteed',
      footerBg: 'bg-blue-50/60',
      footerBorder: 'border-t-blue-100/60',
      footerText: 'text-blue-800',
      tagColor: 'text-blue-700 border-blue-200',
      activeColor: 'bg-blue-600 text-white',
      dotColor: 'bg-blue-600',
    },
  ];

  const nextPillar = () => {
    setActivePillar((prev) => (prev === pillars.length - 1 ? 0 : prev + 1));
  };

  const prevPillar = () => {
    setActivePillar((prev) => (prev === 0 ? pillars.length - 1 : prev - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
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
      nextPillar();
    } else if (diff < -40) {
      prevPillar();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const renderPillarCard = (pillar: (typeof pillars)[0]) => {
    const Icon = pillar.icon;
    return (
      <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between h-full">
        <div>
          <div
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${pillar.iconBg} border ${pillar.iconBorder} flex items-center justify-center ${pillar.iconColor} mb-4 sm:mb-5 shadow-inner`}
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider ${pillar.badgeTheme} px-2.5 py-0.5 rounded-md border`}
            >
              {pillar.badge}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {pillar.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 sm:mt-2.5 leading-relaxed">
            {pillar.desc}
          </p>

          <ul className="mt-3.5 sm:mt-4 space-y-2 text-xs text-slate-600">
            {pillar.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Small Container Nested Inside Bottom */}
        <div
          className={`mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-slate-100 ${pillar.footerBg} -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-4 rounded-b-xl sm:rounded-b-2xl ${pillar.footerBorder}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-[10px] font-bold ${pillar.footerText} uppercase tracking-wide`}>
                {pillar.footerLabel}
              </p>
              <p className="text-sm sm:text-base font-extrabold text-slate-900">
                {pillar.footerValue}
              </p>
            </div>
            <span
              className={`text-[10px] sm:text-[11px] font-semibold ${pillar.tagColor} bg-white px-2.5 py-1 rounded-lg border shadow-2xs`}
            >
              {pillar.footerTag}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-10">
        <h2 className="text-2xl sm:text-3xl max-w-3xl mx-auto lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Where Do Your Solar Savings <br /> <span className="text-amber-600">Actually Come From?</span>
        </h2>
        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed px-1 sm:px-0">
          Many homeowners mistakenly evaluate solar solely on feed-in tariffs. In reality, the true financial powerhouse is avoided peak grid consumption and fixed supply cost neutralization.
        </p>
      </div>

      {/* 1. Mobile Sliding Carousel (< md) */}
      <div className="block md:hidden mb-8">
        {/* Mobile Switcher Tabs */}
        <div className="flex p-1 bg-slate-100/90 rounded-xl mb-3.5 border border-slate-200/80 gap-1">
          {pillars.map((pillar, idx) => (
            <button
              key={pillar.id}
              type="button"
              onClick={() => setActivePillar(idx)}
              className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all text-center cursor-pointer ${
                activePillar === idx
                  ? `${pillar.activeColor} shadow-xs`
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {pillar.tabLabel}
            </button>
          ))}
        </div>

        {/* Sliding Window */}
        <div
          className="relative overflow-hidden rounded-xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${activePillar * 100}%)`,
            }}
          >
            {pillars.map((pillar) => (
              <div key={pillar.id} className="w-full shrink-0 px-0.5">
                {renderPillarCard(pillar)}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Carousel Controls (Dots + Counter + Prev/Next Buttons) */}
        <div className="flex items-center justify-between mt-3 px-1">
          {/* Active indicator dots */}
          <div className="flex items-center gap-1.5">
            {pillars.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePillar(idx)}
                aria-label={`View pillar ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activePillar === idx ? `w-6 ${p.dotColor}` : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>

          {/* Swipe indicator & arrow buttons */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-medium text-slate-500">
              {activePillar + 1} / 3 {activePillar === 0 ? '(Swipe →)' : activePillar === 2 ? '(← Swipe)' : ''}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevPillar}
                aria-label="Previous pillar"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-600 hover:text-slate-900 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextPillar}
                aria-label="Next pillar"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-600 hover:text-slate-900 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Desktop 3-Pillar Grid (>= md) */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 mb-10">
        {pillars.map((pillar) => (
          <div key={pillar.id} className="h-full">
            {renderPillarCard(pillar)}
          </div>
        ))}
      </div>

      {/* 2. Visual Net-Metering Container Paired with Small Proportion Badges */}
      <div className="bg-slate-900 rounded-xl sm:rounded-2xl overflow-hidden text-white shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Visual Image Container Left */}
          <div className="lg:col-span-6 relative h-52 sm:h-64 lg:h-full lg:min-h-90">
            <img
              src="/images/savings/10kw-solar-panel-system.png"
              alt="Solar net metering and bi-directional energy flow"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent lg:bg-linear-to-r lg:from-transparent lg:to-slate-900" />
            
            <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 backdrop-blur-md bg-slate-950/80 p-2.5 sm:p-3 rounded-lg border border-white/20">
              <span className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-wider block">Real Flow Topology</span>
              <span className="text-xs sm:text-sm font-extrabold text-white">Bi-Directional Smart Metering</span>
            </div>
          </div>

          {/* Normal Content Container Right with Embedded Small Badges */}
          <div className="lg:col-span-6 p-4 sm:p-6 lg:p-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4">
              <PieChart className="w-3.5 h-3.5" />
              Annual Bill Breakdown Composition
            </div>

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              Maximizing Your Net Solar Harvest
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Your bi-directional smart meter tracks daytime solar usage in real-time. Shifting just two major appliances to daylight hours typically boosts total annual bill savings by an extra $450 to $700.
            </p>

            {/* Grid of 4 Small Containers */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 mt-5 sm:mt-6">
              
              {/* Small Container 1 */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-2.5 sm:p-3.5">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] sm:text-xs font-medium text-slate-400 truncate">Direct Rooftop Use</span>
                  <span className="text-[10px] sm:text-xs font-black text-emerald-400 bg-emerald-950/60 px-1.5 sm:px-2 py-0.5 rounded shrink-0">68%</span>
                </div>
                <p className="text-sm sm:text-base font-extrabold text-white mt-1">High-Impact</p>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 truncate">AC, hot water, EV</p>
              </div>

              {/* Small Container 2 */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-2.5 sm:p-3.5">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] sm:text-xs font-medium text-slate-400 truncate">Grid Export Credits</span>
                  <span className="text-[10px] sm:text-xs font-black text-amber-400 bg-amber-950/60 px-1.5 sm:px-2 py-0.5 rounded shrink-0">22%</span>
                </div>
                <p className="text-sm sm:text-base font-extrabold text-white mt-1">Daily Offsets</p>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 truncate">Surplus sent to grid</p>
              </div>

              {/* Small Container 3 */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-2.5 sm:p-3.5">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] sm:text-xs font-medium text-slate-400 truncate">Residual Grid Draw</span>
                  <span className="text-[10px] sm:text-xs font-black text-blue-400 bg-blue-950/60 px-1.5 sm:px-2 py-0.5 rounded shrink-0">10%</span>
                </div>
                <p className="text-sm sm:text-base font-extrabold text-white mt-1">Night Baseline</p>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 truncate">$0 in daytime hours</p>
              </div>

              {/* Small Container 4 */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-2.5 sm:p-3.5">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] sm:text-xs font-medium text-slate-400 truncate">Net Annual Offset</span>
                  <span className="text-[10px] sm:text-xs font-black text-purple-400 bg-purple-950/60 px-1.5 sm:px-2 py-0.5 rounded shrink-0">4,900 kWh</span>
                </div>
                <p className="text-sm sm:text-base font-extrabold text-white mt-1">Clean Yield</p>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 truncate">6.6 kW system output</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SavingsPillarsSection;

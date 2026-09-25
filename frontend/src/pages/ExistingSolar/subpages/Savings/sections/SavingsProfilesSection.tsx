import React, { useState, useRef } from 'react';
import {
  Home,
  Zap,
  BatteryCharging,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const SavingsProfilesSection: React.FC = () => {
  const [activeProfile, setActiveProfile] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const profiles = [
    {
      id: 1,
      tabLabel: '01. Family (6.6kW)',
      image: '/images/about/happy-family-solar.jpg',
      imageAlt: 'Brisbane suburban family enjoying solar savings',
      locationBadge: 'Brisbane • 4-Bed Home',
      badgeTheme: 'bg-amber-500/90 text-slate-950',
      systemSize: '6.6 kW System',
      icon: Home,
      iconColor: 'text-amber-500',
      title: 'The Everyday Suburban Home',
      desc: 'Family of four with daytime air-conditioning in summer and scheduled dishwasher and washing machine runs during peak sun hours.',
      hoverBorder: 'hover:border-amber-300',
      activeColor: 'bg-amber-500 text-white',
      dotColor: 'bg-amber-500',
      stats: [
        { label: 'Annual Cut', value: '$2,180', color: 'text-emerald-600' },
        { label: '5-Yr Total', value: '$10,900', color: 'text-slate-900' },
        { label: 'Grid Drop', value: '-68%', color: 'text-amber-600' },
      ],
      footerBg: 'bg-emerald-50 border-emerald-100',
      footerLabel: 'Break-Even Status',
      footerValue: 'Fully Paid in 3.4 Yrs',
      footerValueColor: 'text-emerald-700',
    },
    {
      id: 2,
      tabLabel: '02. Pool & EV (10kW)',
      image: '/images/solutions/solar-kit.jpg',
      imageAlt: 'Gold Coast high consumption solar setup',
      locationBadge: 'Gold Coast • Pool & EV',
      badgeTheme: 'bg-emerald-500/90 text-slate-950',
      systemSize: '10 kW High Yield',
      icon: Zap,
      iconColor: 'text-emerald-500',
      title: 'High Daytime Energy Consumer',
      desc: 'Dual-inverter system powering high-draw pool pump filtration and regular electric vehicle charging during the 11am to 2pm solar peak.',
      hoverBorder: 'hover:border-emerald-300',
      activeColor: 'bg-emerald-600 text-white',
      dotColor: 'bg-emerald-600',
      stats: [
        { label: 'Annual Cut', value: '$3,450', color: 'text-emerald-600' },
        { label: '5-Yr Total', value: '$17,250', color: 'text-slate-900' },
        { label: 'Grid Drop', value: '-81%', color: 'text-emerald-600' },
      ],
      footerBg: 'bg-emerald-50 border-emerald-100',
      footerLabel: 'Break-Even Status',
      footerValue: 'Fully Paid in 3.1 Yrs',
      footerValueColor: 'text-emerald-700',
    },
    {
      id: 3,
      tabLabel: '03. Hybrid (8.8kW+)',
      image: '/images/solutions/battery-bundle.jpg',
      imageAlt: 'Sunshine coast solar and battery retrofit savings',
      locationBadge: 'Sunshine Coast • Retrofit',
      badgeTheme: 'bg-blue-500/90 text-slate-950',
      systemSize: '8.8 kW + 10 kWh',
      icon: BatteryCharging,
      iconColor: 'text-blue-500',
      title: 'Solar + Battery Storage Hybrid',
      desc: 'Added a 10 kWh battery retrofit to an existing 5-year-old array. Captures 100% of daytime excess to eliminate expensive evening grid rates.',
      hoverBorder: 'hover:border-blue-300',
      activeColor: 'bg-blue-600 text-white',
      dotColor: 'bg-blue-600',
      stats: [
        { label: 'Annual Cut', value: '$4,120', color: 'text-emerald-600' },
        { label: '5-Yr Total', value: '$20,600', color: 'text-slate-900' },
        { label: 'Grid Drop', value: '-94%', color: 'text-blue-600' },
      ],
      footerBg: 'bg-blue-50 border-blue-100',
      footerLabel: 'Night Grid Independence',
      footerValue: 'Zero Peak Inflow',
      footerValueColor: 'text-blue-700',
    },
  ];

  const nextProfile = () => {
    setActiveProfile((prev) => (prev === profiles.length - 1 ? 0 : prev + 1));
  };

  const prevProfile = () => {
    setActiveProfile((prev) => (prev === 0 ? profiles.length - 1 : prev - 1));
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
      nextProfile();
    } else if (diff < -40) {
      prevProfile();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const renderProfileCard = (profile: (typeof profiles)[0]) => {
    const Icon = profile.icon;
    return (
      <div
        className={`bg-white rounded-2xl border border-slate-300/80 overflow-hidden shadow-lg ${profile.hoverBorder} shadow-black/10 hover:shadow-md transition-all flex flex-col justify-between h-full`}
      >
        <div>
          {/* Image Header */}
          <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100 group">
            <img
              src={profile.image}
              alt={profile.imageAlt}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-white">
              <span
                className={`text-[11px] sm:text-xs font-bold ${profile.badgeTheme} px-2.5 py-0.5 rounded-md text-white uppercase tracking-wider`}
              >
                {profile.locationBadge}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-200">
                {profile.systemSize}
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-2">
              <Icon className={`w-4 h-4 ${profile.iconColor}`} />
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {profile.title}
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {profile.desc}
            </p>

            {/* 3 Small Stat Containers Inside */}
            <div className="grid grid-cols-3 gap-2 mt-4 sm:mt-5">
              {profile.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200/70 rounded-xl p-1.5 sm:p-2.5 text-center"
                >
                  <p className="text-[10px] font-bold text-slate-500 uppercase">
                    {stat.label}
                  </p>
                  <p className={`text-xs sm:text-sm font-extrabold ${stat.color} mt-0.5`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0">
          <div
            className={`${profile.footerBg} rounded-xl p-2.5 sm:p-3 border flex items-center justify-between text-xs`}
          >
            <span className="text-slate-600 font-medium">
              {profile.footerLabel}
            </span>
            <span className={`font-bold ${profile.footerValueColor}`}>
              {profile.footerValue}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8 lg:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Real Queensland <span className="text-emerald-600">Household Savings</span>
        </h2>
        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed px-1 sm:px-0">
          See verified annual savings profiles across different property types and rooftop capacities in South East Queensland.
        </p>
      </div>

      {/* 1. Mobile Sliding Carousel (< lg) */}
      <div className="block lg:hidden mb-10 sm:mb-12">
        {/* Mobile Switcher Tabs */}
        <div className="flex p-1 bg-slate-100/90 rounded-xl mb-3.5 border border-slate-200/80 gap-1">
          {profiles.map((profile, idx) => (
            <button
              key={profile.id}
              type="button"
              onClick={() => setActiveProfile(idx)}
              className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all text-center cursor-pointer ${
                activeProfile === idx
                  ? `${profile.activeColor} shadow-xs`
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {profile.tabLabel}
            </button>
          ))}
        </div>

        {/* Sliding Window */}
        <div
          className="relative overflow-hidden rounded-2xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${activeProfile * 100}%)`,
            }}
          >
            {profiles.map((profile) => (
              <div key={profile.id} className="w-full shrink-0 px-0.5">
                {renderProfileCard(profile)}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Carousel Controls (Dots + Counter + Prev/Next Buttons) */}
        <div className="flex items-center justify-between mt-3 px-1">
          {/* Active indicator dots */}
          <div className="flex items-center gap-1.5">
            {profiles.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveProfile(idx)}
                aria-label={`View profile ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeProfile === idx ? `w-6 ${p.dotColor}` : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>

          {/* Swipe indicator & arrow buttons */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-medium text-slate-500">
              {activeProfile + 1} / 3 {activeProfile === 0 ? '(Swipe →)' : activeProfile === 2 ? '(← Swipe)' : ''}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevProfile}
                aria-label="Previous household profile"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-600 hover:text-slate-900 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextProfile}
                aria-label="Next household profile"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-600 hover:text-slate-900 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Desktop 3-Card Grid (>= lg) */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-12">
        {profiles.map((profile) => (
          <div key={profile.id} className="h-full">
            {renderProfileCard(profile)}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SavingsProfilesSection;

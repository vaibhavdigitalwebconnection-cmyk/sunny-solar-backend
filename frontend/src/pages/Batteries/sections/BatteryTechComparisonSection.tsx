import React, { useState, useRef } from 'react';
import {
  Check,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  BatteryCharging,
  Clock,
  CloudRain,
  Award
} from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';

export const BatteryTechComparisonSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const batteryKeys: Array<'tesla' | 'sungrow' | 'enphase' | 'alpha'> = ['tesla', 'sungrow', 'enphase', 'alpha'];

  const specs = [
    {
      feature: 'Usable Energy Capacity',
      icon: BatteryCharging,
      tesla: '13.5 kWh',
      sungrow: '9.6 to 25.6 kWh (Modular)',
      enphase: '5.0 to 20.0 kWh (Modular)',
      alpha: '10.1 to 20.2 kWh',
    },
    {
      feature: 'Continuous Backup Output',
      icon: Zap,
      tesla: '11.5 kW (Starts heavy A/C)',
      sungrow: '6.0 kW to 10.0 kW',
      enphase: '3.84 kW per 5P unit',
      alpha: '5.0 kW to 10.0 kW',
    },
    {
      feature: 'Peak Surge Capacity (10s)',
      icon: Sparkles,
      tesla: '18.5 kW (Extreme Surge)',
      sungrow: '12.0 kW',
      enphase: '7.68 kW (per 2 units)',
      alpha: '10.0 kW',
    },
    {
      feature: 'Built-in Solar Inverter',
      icon: Award,
      tesla: 'Yes (11.5 kW 6x MPPT Built-In)',
      sungrow: 'Requires Sungrow Hybrid',
      enphase: 'Integrated 6x Microinverters',
      alpha: 'Integrated Hybrid Inverter',
    },
    {
      feature: 'Battery Chemistry',
      icon: ShieldCheck,
      tesla: 'LiFePO4 (LFP Cobalt-Free)',
      sungrow: 'LiFePO4 (LFP Cobalt-Free)',
      enphase: 'LiFePO4 (LFP Cobalt-Free)',
      alpha: 'LiFePO4 (LFP Cobalt-Free)',
    },
    {
      feature: 'Warranty Coverage',
      icon: Award,
      tesla: '10 Years (Unlimited Cycles)',
      sungrow: '10 Years (6,000 Cycles / 70%)',
      enphase: '15 Years (Industry Longest)',
      alpha: '10 Years / 6,000 Cycles',
    },
    {
      feature: 'Blackout Transfer Time',
      icon: Clock,
      tesla: '<100ms (Automated Gateway)',
      sungrow: '<20ms (with EPS Switch)',
      enphase: '<100ms (System Controller)',
      alpha: '<100ms (Internal EPS)',
    },
    {
      feature: 'Storm Watch Integration',
      icon: CloudRain,
      tesla: 'Yes (Automated BOM feed)',
      sungrow: 'Yes (iSolarCloud app mode)',
      enphase: 'Yes (Storm Guard app)',
      alpha: 'Manual toggle in app',
    },
  ];

  const batteryProfiles = {
    tesla: {
      name: 'Tesla Powerwall 3',
      shortTitle: 'Tesla PW3',
      badge: 'Best Whole-Home',
      badgeVariant: 'amber' as const,
      isFeatured: true,
      tag: 'Best for Whole-Home Backup & Heavy Ducted Air-Con',
      desc: 'The benchmark of residential storage. Features a massive 11.5kW built-in solar inverter with 6 MPPT inputs, allowing you to connect up to 20kW of solar panels directly into the battery without extra inverters on your wall.',
      pros: ['Starts any residential central ducted A/C unit', 'Unlimited cycle 10-year warranty', 'Sleekest industrial design & app UX'],
      verdict: 'Our #1 recommendation for families wanting seamless whole-home blackout resilience and maximum solar expansion.',
    },
    sungrow: {
      name: 'Sungrow SBR High-Voltage Modular',
      shortTitle: 'Sungrow SBR',
      badge: 'Best Modular',
      badgeVariant: 'slate' as const,
      isFeatured: false,
      tag: 'Best Modular Value & 3-Phase Commercial Balance',
      desc: 'Stackable 3.2kWh blocks allow you to start with 9.6kWh and expand up to 25.6kWh as your energy needs or EV charging demands grow. Outstanding cost-per-kilowatt-hour value.',
      pros: ['Expandable modular architecture anytime', 'Seamless 3-phase switchboard symmetry', 'Proven reliability in Queensland heat'],
      verdict: 'The smart choice for budget-conscious homeowners wanting high capacity and clean stackable aesthetics.',
    },
    enphase: {
      name: 'Enphase IQ Battery 5P',
      shortTitle: 'Enphase 5P',
      badge: '15-Yr Warranty',
      badgeVariant: 'emerald' as const,
      isFeatured: false,
      tag: 'Longest Warranty & Safest Low-Voltage AC Design',
      desc: 'Built with 6 embedded IQ8 microinverters per unit, meaning there is zero high-voltage DC on your wall and zero single point of failure. Backed by an industry-leading 15-year standard warranty.',
      pros: ['15-year warranty (5 years longer than competitors)', 'Modular 5kWh building blocks', 'Safe low-voltage AC coupling'],
      verdict: 'Ideal for tech-savvy homeowners and existing Enphase microinverter rooftop solar owners wanting maximum lifespan.',
    },
    alpha: {
      name: 'AlphaESS SMILE-G3',
      shortTitle: 'AlphaESS',
      badge: 'Value Workhorse',
      badgeVariant: 'slate' as const,
      isFeatured: false,
      tag: 'All-in-One Value Workhorse',
      desc: 'Combines an integrated hybrid inverter, energy management controller, and modular LFP batteries into a compact single-column enclosure.',
      pros: ['Extremely competitive pricing point', 'Compact vertical footprint', 'High continuous discharge rate'],
      verdict: 'Excellent entry point for households seeking reliable blackout protection on a sensible upfront budget.',
    },
  };

  const handleTouchStart = (e: React.TouchEvent) => {
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
  };

  const prevSlide = () => {
    setActiveSlide((prev) => Math.max(0, prev - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => Math.min(batteryKeys.length - 1, prev + 1));
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <Badge variant="amber" className="mb-2.5 sm:mb-3">
            Hardware Shootout
          </Badge>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 mt-1.5 sm:mt-2 tracking-tight leading-[1.18] sm:leading-[1.15]">
            Compare Top Battery Technologies Side-by-Side
          </h2>
          <p className="mt-2.5 sm:mt-4 text-slate-600 text-xs xs:text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto px-1 sm:px-0">
            We are 100% brand agnostic. Our Master Electricians recommend the hardware that best matches your switchboard capacity, roof orientation, and family energy profile.
          </p>
        </div>

        {/* Mobile View (< lg): 4-Tab Switcher + Touch-Swipeable Sliding Specs Cards */}
        <div className="block lg:hidden mb-8">
          {/* 2x2 Segmented Battery Selector */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl mb-4">
            {batteryKeys.map((key, idx) => {
              const item = batteryProfiles[key];
              const isSelected = activeSlide === idx;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`py-2 px-2 text-center text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${isSelected
                      ? 'bg-white text-slate-950 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  {item.isFeatured && (
                    <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                  )}
                  <span className="truncate">{item.shortTitle}</span>
                </button>
              );
            })}
          </div>

          {/* Swipeable Slide Window */}
          <div
            className="overflow-hidden   cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {batteryKeys.map((key, idx) => {
                const profile = batteryProfiles[key];
                return (
                  <div key={idx} className="w-full shrink-0 px-0.5">
                    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 xs:p-6 shadow-sm space-y-4">
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3.5">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 font-bold block mb-0.5">
                            Hardware Profile
                          </span>
                          <h3 className="text-xl xs:text-2xl font-serif font-bold text-slate-950">
                            {profile.name}
                          </h3>
                          <p className="text-xs font-semibold text-slate-500 mt-0.5">
                            {profile.tag}
                          </p>
                        </div>
                        <Badge variant={profile.badgeVariant} size="sm">
                          {profile.badge}
                        </Badge>
                      </div>

                      {/* Narrative & Master Electrician Verdict */}
                      <div className="space-y-2.5">
                        <p className="text-xs xs:text-sm text-slate-600 leading-relaxed">
                          {profile.desc}
                        </p>
                        <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-950">
                          <span className="font-bold text-amber-900 block mb-0.5">Master Electrician Verdict:</span>
                          <span className="leading-snug">{profile.verdict}</span>
                        </div>
                      </div>

                      {/* Top Highlights */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">
                          Key Strengths:
                        </span>
                        {profile.pros.map((pro, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{pro}</span>
                          </div>
                        ))}
                      </div>

                      {/* Full Specifications Breakdown */}
                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block mb-2">
                          Technical Specifications:
                        </span>
                        <div className="divide-y divide-slate-100 text-xs">
                          {specs.map((spec, sIdx) => {
                            const val = spec[key];
                            return (
                              <div key={sIdx} className="py-2 flex items-start justify-between gap-3">
                                <span className="text-slate-500 font-medium shrink-0">
                                  {spec.feature}
                                </span>
                                <span className="text-slate-950 font-bold text-right">
                                  {val}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Slider Controls (Dots + Prev/Next Buttons) */}
          <div className="flex items-center justify-between mt-4 px-1">
            <div className="flex items-center gap-1.5">
              {batteryKeys.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setActiveSlide(dotIdx)}
                  aria-label={`Go to battery ${dotIdx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeSlide === dotIdx
                      ? 'w-6 bg-[#2B3CB8]'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-500 mr-1">
                0{activeSlide + 1} / 0{batteryKeys.length}
              </span>
              <button
                type="button"
                onClick={prevSlide}
                disabled={activeSlide === 0}
                aria-label="Previous battery"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-2xs active:scale-95 transition-all cursor-pointer hover:bg-slate-50 disabled:opacity-35 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                disabled={activeSlide === batteryKeys.length - 1}
                aria-label="Next battery"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-2xs active:scale-95 transition-all cursor-pointer hover:bg-slate-50 disabled:opacity-35 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Swipe Hint */}
          <p className="text-center text-[11px] text-slate-400 mt-2.5 font-medium">
            ← Swipe to compare all 4 battery systems →
          </p>
        </div>

        {/* Desktop View (>= lg): Detailed Side-by-Side Comparison Table */}
        <div className="hidden lg:block overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-slate-900 text-white text-xs sm:text-sm">
                <th className="p-4 sm:p-5 font-bold">Key Specification</th>
                <th className="p-4 sm:p-5 font-bold text-amber-400 bg-slate-800">
                  Tesla Powerwall 3
                </th>
                <th className="p-4 sm:p-5 font-bold">Sungrow SBR Series</th>
                <th className="p-4 sm:p-5 font-bold">Enphase IQ 5P</th>
                <th className="p-4 sm:p-5 font-bold">AlphaESS SMILE-G3</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
              {specs.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-slate-900 bg-slate-50/70">{row.feature}</td>
                  <td className="p-4 sm:p-5 font-semibold text-amber-950 bg-amber-50/40">
                    {row.tesla}
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700">{row.sungrow}</td>
                  <td className="p-4 sm:p-5 text-slate-700">{row.enphase}</td>
                  <td className="p-4 sm:p-5 text-slate-700">{row.alpha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Calculator & Assessment CTAs */}
        <div className="mt-8 sm:mt-12 text-center flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto w-full">
          <Button
            to="/calculators/battery-size"
            variant="outline"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto font-semibold justify-center text-center py-3"
          >
            Calculate Battery Capacity Needed
          </Button>
          <Button
            to="/get-started/free-assessment"
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto font-bold shadow-md justify-center text-center py-3"
          >
            Request Tailored Battery Proposal
          </Button>
        </div>

      </div>
    </section>
  );
};

export default BatteryTechComparisonSection;


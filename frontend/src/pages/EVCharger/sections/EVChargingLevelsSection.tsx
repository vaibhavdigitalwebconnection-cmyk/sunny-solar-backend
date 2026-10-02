import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Gauge,
  Clock,
  Zap,
  Check,
  X,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Sun,
  Flame,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface LevelData {
  id: string;
  name: string;
  badge?: string;
  power: string;
  amperage: string;
  voltage: string;
  kmPerHour: string;
  fullChargeTime: string;
  idealFor: string;
  solarSurplusSync: boolean;
  dedicatedCircuit: boolean;
  smartAppControl: boolean;
  switchboardSafe: boolean;
  highlight?: boolean;
}

const CHARGING_LEVELS: LevelData[] = [
  {
    id: 'level-1',
    name: 'Level 1: 10A Standard Plug',
    badge: 'Emergency Trickle',
    power: '2.4 kW',
    amperage: '10 Amps',
    voltage: '240V Single Phase',
    kmPerHour: '10 – 14 km/hr',
    fullChargeTime: '26 – 32 Hours',
    idealFor: 'Occasional top-ups and emergency roadside use',
    solarSurplusSync: false,
    dedicatedCircuit: false,
    smartAppControl: false,
    switchboardSafe: false,
  },
  {
    id: 'level-2-single',
    name: 'Level 2: 32A Single-Phase Wallbox',
    badge: 'Most Popular (90% of Homes)',
    power: '7.4 kW',
    amperage: '32 Amps',
    voltage: '240V Single Phase',
    kmPerHour: '45 – 55 km/hr',
    fullChargeTime: '6 – 8 Hours (Overnight)',
    idealFor: 'Daily commuters, typical Australian homes, zero grid bills',
    solarSurplusSync: true,
    dedicatedCircuit: true,
    smartAppControl: true,
    switchboardSafe: true,
    highlight: true,
  },
  {
    id: 'level-2-three',
    name: 'Level 2: 32A Three-Phase Wallbox',
    badge: 'Superfast 3-Phase',
    power: '22 kW',
    amperage: '32 Amps x 3',
    voltage: '415V Three Phase',
    kmPerHour: '100 – 130 km/hr',
    fullChargeTime: '2.5 – 3.5 Hours',
    idealFor: 'Homes with 3-phase power, multi-EV households, commercial utes',
    solarSurplusSync: true,
    dedicatedCircuit: true,
    smartAppControl: true,
    switchboardSafe: true,
  },
];

export const EVChargingLevelsSection: React.FC = () => {
  return (
    <section id="charging-levels" className="py-20 sm:py-28 bg-white relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#ED4F11] bg-orange-50 border border-orange-200">
            <Gauge className="w-3.5 h-3.5 text-[#ED4F11]" />
            <span>Speed &amp; Capacity Matrix</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight">
            Compare EV Charging Speeds:{' '}
            <span className="bg-linear-to-r from-[#2B3CB8] via-[#3E52E8] to-[#ED4F11] bg-clip-text text-transparent">
              Trickle vs Fast Wallbox
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Plugging into a regular 10A wall powerpoint takes over a day to charge and stresses household sockets. A dedicated Level 2 smart wallbox charges your EV while you sleep using safe, certified high-amperage lines.
          </p>
        </div>

        {/* 3-Column Level Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {CHARGING_LEVELS.map((level) => {
            const isHighlight = level.highlight;
            return (
              <div
                key={level.id}
                className={`relative rounded-3xl flex flex-col justify-between transition-all duration-300 ${
                  isHighlight
                    ? 'bg-linear-to-b from-blue-50/50 via-white to-white border-2 border-[#2B3CB8] shadow-xl shadow-[#2B3CB8]/10 p-7 sm:p-8 lg:-translate-y-2'
                    : 'bg-white border border-slate-200/90 shadow-sm p-7 sm:p-8 hover:shadow-md'
                }`}
              >
                {/* Popular Pill */}
                {isHighlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-linear-to-r from-[#2B3CB8] to-[#ED4F11] text-white text-xs font-black uppercase tracking-wider shadow-md">
                    Recommended for Most Homes
                  </div>
                )}

                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-xs font-extrabold uppercase px-2.5 py-1 rounded-lg ${
                        isHighlight
                          ? 'bg-[#2B3CB8]/10 text-[#2B3CB8]'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {level.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{level.voltage}</span>
                  </div>

                  {/* Level Name */}
                  <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">
                    {level.name}
                  </h3>

                  {/* Power Rating Hero */}
                  <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl font-black text-slate-950 font-sans tracking-tight">
                        {level.power}
                      </span>
                      <span className="text-xs font-bold text-slate-500 uppercase">{level.amperage}</span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-200/60 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-500 block">Speed Added:</span>
                        <span className="font-bold text-slate-900">{level.kmPerHour}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">60kWh Battery:</span>
                        <span className="font-bold text-[#ED4F11]">{level.fullChargeTime}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mb-6 italic">{level.idealFor}</p>

                  {/* Feature Checklist */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-700 flex items-center gap-2">
                        <Sun className="w-4 h-4 text-[#ED4F11]" />
                        Solar Surplus Modulation
                      </span>
                      {level.solarSurplusSync ? (
                        <Check className="w-4 h-4 text-emerald-600 font-bold" />
                      ) : (
                        <X className="w-4 h-4 text-slate-400" />
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-700 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#2B3CB8]" />
                        Dedicated Isolated Circuit
                      </span>
                      {level.dedicatedCircuit ? (
                        <Check className="w-4 h-4 text-emerald-600 font-bold" />
                      ) : (
                        <X className="w-4 h-4 text-slate-400" />
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-700 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-indigo-600" />
                        Smart Off-Peak App Timer
                      </span>
                      {level.smartAppControl ? (
                        <Check className="w-4 h-4 text-emerald-600 font-bold" />
                      ) : (
                        <X className="w-4 h-4 text-slate-400" />
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-700 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        Prevents Switchboard Tripping
                      </span>
                      {level.switchboardSafe ? (
                        <Check className="w-4 h-4 text-emerald-600 font-bold" />
                      ) : (
                        <span className="text-[11px] font-bold text-amber-600 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Socket Overheat Risk
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-8 pt-4">
                  {isHighlight ? (
                    <Button
                      to="/get-started/free-assessment"
                      variant="primary"
                      className="w-full justify-center font-bold shadow-md shadow-[#2B3CB8]/20"
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Quote 7.4 kW Single-Phase
                    </Button>
                  ) : level.id === 'level-2-three' ? (
                    <Button
                      to="/get-started/free-assessment"
                      variant="outline"
                      className="w-full justify-center font-bold text-[#0C123E] border-slate-300 hover:border-[#2B3CB8]"
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Quote 22 kW Three-Phase
                    </Button>
                  ) : (
                    <div className="p-3 text-center text-xs text-amber-800 bg-amber-50 rounded-xl border border-amber-200">
                      Standard cords not recommended for daily primary EV charging.
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default EVChargingLevelsSection;

import React, { useRef, useState } from 'react';
import { m } from 'framer-motion';
import {
  Sun,
  BatteryCharging,
  Cpu,
  Car,
  Power,
} from 'lucide-react';
import { AnimatedBeam } from '../../../components/ui/AnimatedBeam';

type FlowMode = 'solar' | 'hybrid' | 'offpeak';

interface ModeConfig {
  id: FlowMode;
  title: string;
  badge: string;
  solarKw: number;
  batteryKw: number;
  gridKw: number;
  evRateKw: number;
  costPer100km: string;
  speedKmH: number;
  sourceText: string;
}

const MODES: Record<FlowMode, ModeConfig> = {
  solar: {
    id: 'solar',
    title: '100% Free Solar',
    badge: '$0.00 Grid Draw',
    solarKw: 8.4,
    batteryKw: 0.0,
    gridKw: 0.0,
    evRateKw: 7.4,
    costPer100km: '$0.00',
    speedKmH: 48,
    sourceText: 'Pure Daytime Sunshine',
  },
  hybrid: {
    id: 'hybrid',
    title: 'Solar + Battery',
    badge: 'Zero Grid Draw',
    solarKw: 4.2,
    batteryKw: 3.2,
    gridKw: 0.0,
    evRateKw: 7.4,
    costPer100km: '$0.00',
    speedKmH: 48,
    sourceText: 'Rooftop Solar + Home Battery',
  },
  offpeak: {
    id: 'offpeak',
    title: 'Off-Peak Night',
    badge: 'Cheapest Tariff',
    solarKw: 0.0,
    batteryKw: 0.0,
    gridKw: 7.4,
    evRateKw: 7.4,
    costPer100km: '$1.85',
    speedKmH: 48,
    sourceText: 'Scheduled Midnight Off-Peak',
  },
};

export const EVSolarFlowSimulatorSection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<FlowMode>('solar');
  const current = MODES[activeMode];

  // Element Refs for Magic UI AnimatedBeam
  const containerRef = useRef<HTMLDivElement>(null);
  const solarRef = useRef<HTMLDivElement>(null);
  const inverterRef = useRef<HTMLDivElement>(null);
  const batteryRef = useRef<HTMLDivElement>(null);
  const chargerRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);

  return (
    <section id="solar-flow" className="py-16 sm:py-14 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Clean Header */}
        <div className="text-center max-w-6xl mx-auto space-y-2.5 mb-8 sm:mb-10">
        

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-950 tracking-tight">
            How Solar EV Charging Works{' '}
            <span className="text-[#2B3CB8]">In Real Time</span>
          </h2>

          <p className="text-sm text-slate-600">
            Select a mode to see how smart CT sensors route power between your panels, home, and vehicle.
          </p>
        </div>

        {/* Minimal Mode Toggles */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {(Object.keys(MODES) as FlowMode[]).map((modeKey) => {
            const m = MODES[modeKey];
            const isSelected = activeMode === modeKey;
            return (
              <button
                key={modeKey}
                type="button"
                onClick={() => setActiveMode(modeKey)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#2B3CB8] text-white shadow-md shadow-[#2B3CB8]/20 scale-102'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                <span>{m.title}</span>
                <span
                  className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {m.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Diagram Canvas (White / Light Mode) */}
        <div
          ref={containerRef}
          className="relative overflow-hidden"
        >
          {/* Node Architecture Grid with Micro-Animations (Mobile: 3 top, 2 bottom / Desktop: 5 in a row) */}
          <div className="grid grid-cols-6 md:grid-cols-5 gap-2 sm:gap-6 items-stretch relative z-20">

            {/* Node 1: Rooftop Solar */}
            <m.div
              ref={solarRef}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className={`col-span-2 md:col-span-1 relative p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-center overflow-hidden ${
                current.solarKw > 0
                  ? 'bg-linear-to-b from-amber-50/90 via-white to-amber-50/40 border-amber-300 shadow-sm shadow-amber-500/10'
                  : 'bg-white border-slate-200 opacity-60'
              }`}
            >
              {/* Shimmer sweep animation across panel */}
              {current.solarKw > 0 && (
                <m.div
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-amber-200/30 to-transparent pointer-events-none"
                  animate={{ translateX: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}

              {/* Animated Rotating Sun with Aura */}
              <div className="relative mb-1.5 sm:mb-2">
                {current.solarKw > 0 && (
                  <m.div
                    className="absolute -inset-1 sm:-inset-1.5 rounded-full bg-amber-400/30 blur-xs"
                    animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                <div className="relative w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-xs">
                  <m.div
                    animate={current.solarKw > 0 ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                  </m.div>
                </div>
              </div>

              <div className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 leading-tight">Rooftop Solar</div>
              
              <div className="text-xs sm:text-xl font-black text-slate-900 mt-0.5 whitespace-nowrap">
                {current.solarKw.toFixed(1)} kW
              </div>

              {/* Animated Solar Wave Bar */}
              <div className="flex items-center gap-0.5 sm:gap-1 mt-1.5 sm:mt-2">
                {[0.4, 0.8, 0.5, 0.9].map((h, i) => (
                  <m.span
                    key={i}
                    className="w-1 rounded-full bg-amber-400 inline-block"
                    animate={
                      current.solarKw > 0
                        ? { height: ['4px', '14px', '6px'], opacity: [0.5, 1, 0.5] }
                        : { height: '3px', opacity: 0.3 }
                    }
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.18,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            </m.div>

            {/* Node 2: Central Smart Inverter Hub */}
            <m.div
              ref={inverterRef}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="col-span-2 md:col-span-1 relative p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-linear-to-b from-blue-50/70 via-white to-white border border-[#2B3CB8]/30 text-center shadow-sm flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Animated Radar Pulse */}
              <div className="relative mb-1.5 sm:mb-2">
                <m.div
                  className="absolute -inset-1 rounded-lg sm:rounded-xl bg-[#2B3CB8]/20"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="relative w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-blue-100 text-[#2B3CB8] flex items-center justify-center shadow-xs">
                  <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>

              <div className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 leading-tight">Hybrid Inverter</div>
              <div className="text-[10px] sm:text-sm font-bold text-[#2B3CB8] mt-0.5 whitespace-nowrap">Smart CT Hub</div>

              {/* 3 Active Blinking Sensor LEDs */}
              <div className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-0.5 sm:gap-1.5 mt-1.5 sm:mt-2.5">
                {['CT1', 'CT2', 'CT3'].map((label, idx) => (
                  <span
                    key={label}
                    className="flex items-center gap-0.5 text-[7px] sm:text-[9px] font-bold text-slate-500 bg-slate-100 px-1 sm:px-1.5 py-0.5 rounded"
                  >
                    <m.span
                      className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-500 inline-block"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: idx * 0.3 }}
                    />
                    {label}
                  </span>
                ))}
              </div>
            </m.div>

            {/* Node 3: Home Battery */}
            <m.div
              ref={batteryRef}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className={`col-span-2 md:col-span-1 relative p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-center overflow-hidden ${
                current.batteryKw > 0
                  ? 'bg-linear-to-b from-blue-50/90 via-white to-blue-50/40 border-blue-400 shadow-sm shadow-blue-500/10'
                  : 'bg-white border-slate-200 opacity-60'
              }`}
            >
              {/* Battery Icon with Energy Pulse */}
              <div className="relative mb-1.5 sm:mb-2">
                {current.batteryKw > 0 && (
                  <m.div
                    className="absolute -inset-1 sm:-inset-1.5 rounded-full bg-blue-400/30 blur-xs"
                    animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                <div className="relative w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-blue-100 text-[#2B3CB8] flex items-center justify-center shadow-xs">
                  <m.div
                    animate={current.batteryKw > 0 ? { y: [-1, 1, -1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <BatteryCharging className="w-4 h-4 sm:w-5 sm:h-5" />
                  </m.div>
                </div>
              </div>

              <div className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 leading-tight">Home Battery</div>
              
              <div className="text-xs sm:text-xl font-black text-slate-900 mt-0.5 whitespace-nowrap">
                {current.batteryKw > 0 ? `${current.batteryKw.toFixed(1)} kW` : 'Standby'}
              </div>

              {/* Animated Multi-Segment Battery Level Indicator */}
              <div className="flex items-center gap-0.5 sm:gap-1 mt-1.5 sm:mt-2.5">
                {[0, 1, 2, 3].map((seg) => (
                  <m.span
                    key={seg}
                    className={`w-2 sm:w-3.5 h-1 sm:h-1.5 rounded-xs inline-block transition-colors ${
                      current.batteryKw > 0 ? 'bg-blue-500' : 'bg-slate-300'
                    }`}
                    animate={
                      current.batteryKw > 0
                        ? { opacity: [0.4, 1, 0.4] }
                        : { opacity: 0.5 }
                    }
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      delay: seg * 0.25,
                    }}
                  />
                ))}
              </div>
            </m.div>

            {/* Node 4: Smart EV Wallbox */}
            <m.div
              ref={chargerRef}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="col-span-3 md:col-span-1 relative p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-linear-to-b from-emerald-50/80 via-white to-white border border-emerald-400 text-center shadow-sm flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Circular Glowing Charging Status Halo */}
              <div className="relative mb-1.5 sm:mb-2">
                <m.div
                  className="absolute -inset-1 sm:-inset-1.5 rounded-full bg-emerald-400/40 blur-xs"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="relative w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
                  <Power className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>

              <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 leading-tight">EV Wallbox</div>
              <div className="text-sm sm:text-xl font-black text-emerald-600 mt-0.5 whitespace-nowrap">
                {current.evRateKw.toFixed(1)} kW
              </div>

              {/* Live AC Flow Pulse Indicator */}
              <div className="flex items-center gap-1 mt-1.5 sm:mt-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[9px] sm:text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider">
                  32A AC Active
                </span>
              </div>
            </m.div>

            {/* Node 5: Electric Car */}
            <m.div
              ref={carRef}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="col-span-3 md:col-span-1 relative p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-linear-to-b from-slate-50 via-white to-slate-50 border border-slate-200 text-center flex flex-col items-center justify-center shadow-xs overflow-hidden"
            >
              {/* Car Icon with Charging Vibration */}
              <div className="relative mb-1.5 sm:mb-2">
                <m.div
                  className="absolute -inset-1 rounded-lg sm:rounded-xl bg-slate-300/40 blur-xs"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shadow-xs">
                  <m.div
                    animate={{ x: [-0.5, 0.5, -0.5] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Car className="w-4 h-4 sm:w-5 sm:h-5" />
                  </m.div>
                </div>
              </div>

              <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 leading-tight">Electric Vehicle</div>
              <div className="text-sm sm:text-xl font-black text-slate-900 mt-0.5 whitespace-nowrap">
                +{current.speedKmH} km/h
              </div>

              {/* Animated Progress Charge Bar */}
              <div className="w-full max-w-20 h-1 sm:h-1.5 bg-slate-200 rounded-full mt-2 sm:mt-2.5 overflow-hidden">
                <m.div
                  className="h-full bg-linear-to-r from-emerald-400 to-[#2B3CB8] rounded-full"
                  animate={{ width: ['20%', '85%', '20%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </m.div>

          </div>

          {/* Animated Beams connecting nodes in container */}
          {containerRef.current && (
            <>
              {current.solarKw > 0 && (
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={solarRef}
                  toRef={inverterRef}
                  duration={3}
                  gradientStartColor="#ED4F11"
                  gradientStopColor="#2B3CB8"
                  pathColor="rgba(43, 60, 184, 0.12)"
                  pathWidth={2.5}
                />
              )}

              {current.batteryKw > 0 && (
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={batteryRef}
                  toRef={inverterRef}
                  duration={3}
                  gradientStartColor="#2B3CB8"
                  gradientStopColor="#10B981"
                  pathColor="rgba(43, 60, 184, 0.12)"
                  pathWidth={2.5}
                />
              )}

              <AnimatedBeam
                containerRef={containerRef}
                fromRef={inverterRef}
                toRef={chargerRef}
                duration={3}
                gradientStartColor="#2B3CB8"
                gradientStopColor="#10B981"
                pathColor="rgba(16, 185, 129, 0.15)"
                pathWidth={2.5}
              />

              <AnimatedBeam
                containerRef={containerRef}
                fromRef={chargerRef}
                toRef={carRef}
                duration={2.5}
                gradientStartColor="#10B981"
                gradientStopColor="#059669"
                pathColor="rgba(16, 185, 129, 0.2)"
                pathWidth={2.5}
              />
            </>
          )}

    

        </div>

      </div>
    </section>
  );
};

export default EVSolarFlowSimulatorSection;

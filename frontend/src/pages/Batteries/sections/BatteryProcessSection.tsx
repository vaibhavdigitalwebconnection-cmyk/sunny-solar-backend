import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClipboardCheck,
  Thermometer,
  Wrench,
  Smartphone,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowRight,
  ArrowLeft,
  Clock,
  Sparkles,
  ShieldAlert,
  Flame,
  Radio,
  Cpu,
  FileCheck,
  Check,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';

interface ProcessStep {
  id: number;
  num: string;
  stageBadge: string;
  title: string;
  shortTitle: string;
  category: string;
  tagline: string;
  desc: string;
  icon: React.ElementType;
  complianceStandard: string;
  turnaroundTime: string;
  keyDeliverables: {
    label: string;
    detail: string;
  }[];
  hudTelemetry: {
    statusTitle: string;
    statusBadge: string;
    metrics: {
      label: string;
      value: string;
      status: 'pass' | 'optimal' | 'verified';
    }[];
    electricianNote: string;
    certificationTag: string;
  };
}

export const BatteryProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const touchStartX = React.useRef<number | null>(null);
  const touchEndX = React.useRef<number | null>(null);

  const steps: ProcessStep[] = [
    {
      id: 0,
      num: '01',
      stageBadge: 'Phase 01 • Pre-Installation Audit',
      shortTitle: 'Switchboard Audit',
      title: 'Switchboard & Load Capacity Engineering Audit',
      category: 'Electrical Safety & Compliance',
      tagline: 'Zero installation surprises. Grid pre-approval secured before day one.',
      desc: 'Before ordering hardware, our lead Master Electrician personally audits your main switchboard, neutral-earth bonding (MEN), and circuit sub-allocation. We verify solar inverter compatibility, calculate peak continuous draw, and secure immediate Energex / Ergon network connection approvals.',
      icon: ClipboardCheck,
      complianceStandard: 'AS/NZS 3000:2018 Wiring Rules & Energex Form 16',
      turnaroundTime: 'Pre-Install (Completed within 24–48 Hours)',
      keyDeliverables: [
        {
          label: 'Mains & Neutral-Earth (MEN) Resistance Testing',
          detail: 'Validating safety grounding loops to prevent dangerous potential faults during high-current battery charge/discharge.',
        },
        {
          label: 'Backup Isolation Circuit Segregation',
          detail: 'Selecting and rewiring essential load breakers (refrigeration, lighting, Wi-Fi, medical pumps) for seamless blackout resilience.',
        },
        {
          label: 'Energex & Ergon Network Pre-Approval',
          detail: 'We submit and manage all official DNSP grid export agreements so your battery commissioning suffers zero red tape delays.',
        },
      ],
      hudTelemetry: {
        statusTitle: 'ELECTRICAL PRE-AUDIT DIAGNOSTICS',
        statusBadge: 'GRID APPROVED',
        metrics: [
          { label: 'Earth Resistance Loop', value: '0.12 Ω (Pass < 0.50 Ω)', status: 'pass' },
          { label: 'Main Switch Rating', value: '100A / 230V Single-Phase', status: 'optimal' },
          { label: 'Energex Network Form 16', value: 'Auto-Approved / Cleared', status: 'verified' },
          { label: 'Dedicated DIN Enclosure', value: '6-Pole Isolated Sub-board', status: 'verified' },
        ],
        electricianNote: 'Master Electrician Note: We confirm physical switchboard busbar capacity before you pay a deposit.',
        certificationTag: 'Energex Accredited Tier-1 Contractor',
      },
    },
    {
      id: 1,
      num: '02',
      stageBadge: 'Phase 02 • Spatial & Fire Safety',
      shortTitle: 'Thermal & AS/NZS 5139',
      title: 'Thermal Management & AS/NZS 5139 Spatial Engineering',
      category: 'Fire Safety & Longevity Protection',
      tagline: 'Batteries hate direct sun. We engineer optimal cool airflow for 15+ year cell lifespan.',
      desc: 'Queensland summer afternoon heat can degrade lithium battery cells prematurely. We engineer mounting locations in your garage, carport, or shaded breeze-path with mandatory fire-resistant non-combustible backing sheets and exact clearance distances from windows, doors, and ground level.',
      icon: Thermometer,
      complianceStandard: 'Strict AS/NZS 5139:2019 Residential Battery Fire Code',
      turnaroundTime: 'Engineered During Pre-Install Design Stage',
      keyDeliverables: [
        {
          label: 'AS/NZS 5139 Non-Combustible Fire Barrier',
          detail: 'Installed behind battery on timber-frame or cavity brick walls using certified 9mm compressed fibre-cement fire sheeting.',
        },
        {
          label: 'Thermal Shading & Airflow Optimization',
          detail: 'Strict orientation away from harsh Western afternoon solar irradiation, keeping ambient operating temperatures below 35°C.',
        },
        {
          label: 'Clearance & Mechanical Impact Protection',
          detail: 'Maintaining minimum 600mm/900mm clearances from operable doors/windows, with heavy-duty vehicle impact bollards in garages.',
        },
      ],
      hudTelemetry: {
        statusTitle: 'SPATIAL & THERMAL SAFETY AUDIT',
        statusBadge: 'FIRE CODE VERIFIED',
        metrics: [
          { label: 'Thermal Shading Index', value: '100% Shaded Breezeway', status: 'optimal' },
          { label: 'Wall Fire Backing', value: 'AS/NZS 5139 9mm Compressed Sheet', status: 'pass' },
          { label: 'Window / Egress Clearance', value: '> 1,200mm (Code requires > 900mm)', status: 'pass' },
          { label: 'Garage Impact Barrier', value: 'Steel Bollard Verified', status: 'verified' },
        ],
        electricianNote: 'Technician Note: Correct thermal positioning adds 3 to 5 years to your battery’s operational lifespan.',
        certificationTag: 'AS/NZS 5139:2019 Fire Safety Certified',
      },
    },
    {
      id: 2,
      num: '03',
      stageBadge: 'Phase 03 • In-House Installation',
      shortTitle: 'In-House Build',
      title: 'Precision Master Electrician Physical Installation',
      category: 'Tradesman Craftsmanship',
      tagline: '100% full-time employed tradesmen. Zero rushed subcontractors.',
      desc: 'Mounted strictly by our salaried Master Electricians using heavy-gauge concealed metallic conduit, independent lockable rotary DC/AC isolators, and sub-100ms automated grid transfer gateways. We treat your home with surgical care—zero dangling flex cables, no broken plaster, and immaculate switchboard labeling.',
      icon: Wrench,
      complianceStandard: 'Clean Energy Council (CEC) & Master Electricians Australia',
      turnaroundTime: 'Same-Day Install (6 to 8 Hours On-Site)',
      keyDeliverables: [
        {
          label: 'Industrial Concealed Metal Conduits',
          detail: 'High-spec UV-stabilised metal tubing concealed behind walls or cleanly aligned with building architecture for an immaculate look.',
        },
        {
          label: 'Sub-100ms Microgrid Isolation Gateway',
          detail: 'Installing Tesla Gateway 2, Sungrow EPS, or Enphase System Controller for instantaneous outage detection and neutral switching.',
        },
        {
          label: 'Independent Lockable Safety Isolators',
          detail: 'Providing emergency responders and homeowners with accessible, clearly laser-engraved emergency disconnection switches.',
        },
      ],
      hudTelemetry: {
        statusTitle: 'PHYSICAL BUILD & WIRING TELEMETRY',
        statusBadge: 'ZERO SUBCONTRACTORS',
        metrics: [
          { label: 'Installation Crew', value: '2x Full-Time Master Electricians', status: 'verified' },
          { label: 'Conduit Grade', value: 'Rigid Metallic Class 4 UV Protected', status: 'optimal' },
          { label: 'Isolator Mechanism', value: 'Heavy-Duty Lockable IP66 Rotary', status: 'pass' },
          { label: 'Workmanship Warranty', value: '10-Year Sunny Solar Direct Guarantee', status: 'verified' },
        ],
        electricianNote: 'Guarantee: Your installation team are permanent Sunny Solar employees invested in long-term perfection.',
        certificationTag: 'Clean Energy Council Accredited Installer',
      },
    },
    {
      id: 3,
      num: '04',
      stageBadge: 'Phase 04 • Outage Simulation & Handover',
      shortTitle: 'Live Blackout Test',
      title: 'Live Blackout Simulation, App Pairing & Handover',
      category: 'Commissioning & Peace of Mind',
      tagline: 'We cut the main council power grid right in front of you to prove it works.',
      desc: 'We don’t pack up our tools until you see your home maintain uninterrupted power with your own eyes. We physically flip the main Energex street breaker to simulate a Queensland storm blackout, verify instantaneous sub-second cutover, configure your smartphone app, and activate automated BOM Severe Weather Storm Watch.',
      icon: Smartphone,
      complianceStandard: 'Full Commissioning Handover Certificate & Energex Sign-off',
      turnaroundTime: 'Handover Session (45–60 Minutes)',
      keyDeliverables: [
        {
          label: 'Live Main Grid Disconnect Cutover Test',
          detail: 'We cut council power while you watch: lights stay on, Wi-Fi stays connected, and air-conditioning runs uninterrupted.',
        },
        {
          label: 'Smartphone Telemetry & Solar Self-Consumption App',
          detail: 'Complete pairing with Tesla, Sungrow, or Enphase mobile app—monitor solar generation, battery percentage, and grid import in real time.',
        },
        {
          label: 'Automated BOM Storm Watch Activation',
          detail: 'Configuring automatic cloud-based weather tracking so your battery tops itself up to 100% before severe weather hits Queensland.',
        },
      ],
      hudTelemetry: {
        statusTitle: 'COMMISSIONING & CUTOVER VERIFICATION',
        statusBadge: 'BLACKOUT RESILIENT',
        metrics: [
          { label: 'Grid Disconnect Latency', value: '< 42ms (Zero light flicker)', status: 'pass' },
          { label: 'Solar Black-Start Sync', value: 'Synchronized & Operational', status: 'optimal' },
          { label: 'BOM Storm Watch Feed', value: 'Active / Auto-Charge Enabled', status: 'verified' },
          { label: 'App Sync Status', value: 'Homeowner Paired & Verified', status: 'verified' },
        ],
        electricianNote: 'Handover Promise: You will experience a simulated blackout before we leave your driveway.',
        certificationTag: 'Electrical Safety Certificate of Compliance Issued',
      },
    },
  ];

  const current = steps[activeStep];
  const StepIcon = current.icon;

  // Auto-advance to next step every 8 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isPaused, activeStep, steps.length]);

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
      // Swiped left -> next step
      setActiveStep((prev) => (prev + 1) % steps.length);
    } else if (diff < -40) {
      // Swiped right -> prev step
      setActiveStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-linear-to-b from-slate-50 via-white to-slate-50/70 border-t border-slate-200/80 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <Badge variant="emerald" className="mb-2.5 sm:mb-3">
            Installation Protocol
          </Badge>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight leading-[1.18] sm:leading-[1.15]">
            How We Install Your <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-amber-600 bg-clip-text text-transparent">
              Home Battery System
            </span>
          </h2>
          
          <p className="mt-2.5 sm:mt-4 text-slate-600 text-xs xs:text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto px-1 sm:px-0">
            From pre-install switchboard safety audits to a live blackout simulation in front of your eyes, our in-house licensed tradesmen handle every step without third-party contractors.
          </p>
        </div>

        {/* Interactive Conduit Pipeline Track (Desktop & Tablet Stepper) */}
        <div className="mb-10">
          <div className="relative hidden md:block">
            {/* Connecting conduit line */}
            <div className="absolute top-7 left-12 right-12 h-1 bg-slate-200 rounded-full z-0">
              <motion.div
                className="h-full bg-linear-to-r from-emerald-500 to-teal-500 rounded-full"
                initial={false}
                animate={{
                  width: `${(activeStep / (steps.length - 1)) * 100}%`,
                }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              />
            </div>

            {/* Stepper Node Buttons */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 relative z-10">
              {steps.map((step, idx) => {
                const IconComp = step.icon;
                const isActive = activeStep === idx;
                const isPassed = activeStep > idx;

                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(idx)}
                    className="flex flex-col items-center text-center group cursor-pointer focus:outline-none transition-all"
                  >
                    {/* Node circle */}
                    <div
                      className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all duration-300 font-mono font-bold text-xs sm:text-base shadow-sm ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-emerald-500/30 shadow-lg scale-105 sm:scale-110 ring-2 sm:ring-4 ring-emerald-500/20'
                          : isPassed
                          ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-500/40'
                          : 'bg-white text-slate-500 border-2 border-slate-300 group-hover:border-slate-400 group-hover:text-slate-800'
                      }`}
                    >
                      {isPassed ? (
                        <Check className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2.5]" />
                      ) : (
                        <span>{step.num}</span>
                      )}
                    </div>

                    {/* Step Title & Subtitle */}
                    <div className="mt-2 sm:mt-3.5 space-y-0.5 sm:space-y-1">
                      <div className="flex items-center justify-center gap-1">
                        <span
                          className={`text-[10px] sm:text-xs font-mono uppercase tracking-wider font-semibold ${
                            isActive ? 'text-emerald-700' : 'text-slate-500'
                          }`}
                        >
                          Stage {step.num}
                        </span>
                      </div>
                      <p
                        className={`text-xs sm:text-sm font-bold transition-colors ${
                          isActive
                            ? 'text-slate-950 font-extrabold'
                            : 'text-slate-700 group-hover:text-slate-950'
                        }`}
                      >
                        {step.shortTitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Step Pills Carousel / Scroller */}
          <div className="md:hidden flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 ring-2 ring-emerald-600/30'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`font-mono text-xs px-1.5 py-0.5 rounded-md ${
                      isActive ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {step.num}
                  </span>
                  <span>{step.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Stage Interactive Deep-Dive (Split Layout) */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="bg-white rounded-xl border border-slate-200/90 shadow-xl shadow-slate-900/5 overflow-hidden mb-8 sm:mb-12 relative group/card select-none"
        >
          {/* 8-Second Auto-Rotation Progress Bar */}
          <div className="w-full bg-slate-100 h-1.5 relative overflow-hidden">
            {!isPaused ? (
              <motion.div
                key={activeStep}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 8, ease: 'linear' }}
                className="h-full bg-linear-to-r from-emerald-500 via-teal-500 to-amber-500"
              />
            ) : (
              <div className="h-full bg-amber-400 w-full opacity-80" />
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/80"
            >
              {/* Left Column: Detailed Engineering Narrative */}
              <div className="lg:col-span-7 p-5 xs:p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  {/* Title & Tagline */}
                  <h3 className="text-xl xs:text-2xl sm:text-3xl font-serif font-bold text-slate-950 tracking-tight leading-snug">
                    {current.title}
                  </h3>
                  
                  <p className="mt-2 text-xs xs:text-sm font-medium text-emerald-700 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{current.tagline}</span>
                  </p>

                  <p className="mt-3 sm:mt-4 text-slate-600 text-xs xs:text-sm sm:text-base leading-relaxed">
                    {current.desc}
                  </p>
                </div>

                {/* Bottom Standard & Stage Pagination */}
                <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-200">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate max-w-50 xs:max-w-none">{current.complianceStandard}</span>
                  </div>

                  {/* Stage Stepper Controls */}
                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      onClick={() => setIsPaused((prev) => !prev)}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                      title={isPaused ? "Resume auto-rotation (8s)" : "Pause auto-rotation"}
                    >
                      {isPaused ? (
                        <>
                          <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                          <span className="text-emerald-700">Play</span>
                        </>
                      ) : (
                        <>
                          <Pause className="w-3.5 h-3.5 text-slate-500" />
                          <span className="text-slate-500">Auto 8s</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setActiveStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1))}
                      className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Previous Stage"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono font-bold text-slate-400 px-1">
                      {activeStep + 1} / {steps.length}
                    </span>
                    <button
                      onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                      className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Next Stage"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Master Electrician Live Commissioning HUD */}
              <div className="lg:col-span-5 bg-slate-950 p-5 xs:p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
                {/* Background Tech Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-4 sm:space-y-6">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3 sm:pb-4">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                      <span className="font-mono text-[11px] sm:text-xs font-bold tracking-wider text-slate-300 uppercase truncate">
                        {current.hudTelemetry.statusTitle}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold tracking-wide shrink-0">
                      {current.hudTelemetry.statusBadge}
                    </span>
                  </div>

                  {/* Telemetry Metrics Grid */}
                  <div className="space-y-2 sm:space-y-2.5">
                    {current.hudTelemetry.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-2 hover:border-slate-700 transition-colors"
                      >
                        <span className="text-xs text-slate-400 font-medium truncate">{m.label}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono text-xs sm:text-sm font-bold text-white">
                            {m.value}
                          </span>
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Technician Sign-Off Note */}
                  <div className="bg-slate-900/60 border border-emerald-500/20 rounded-xl p-3.5 sm:p-4">
                    <div className="flex items-start gap-2.5">
                      <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-300 italic leading-relaxed">
                        "{current.hudTelemetry.electricianNote}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Verification Seal */}
                <div className="relative z-10 mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-slate-800/80 flex items-center justify-between text-xs gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-300 font-medium text-xs truncate">
                      {current.hudTelemetry.certificationTag}
                    </span>
                  </div>

                  <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider shrink-0">
                    100% Passed
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Swipe Hint */}
        <p className="block md:hidden text-center text-[11px] text-slate-400 -mt-4 mb-8 font-medium">
          ← Swipe or tap stages above to explore all 4 phases →
        </p>



      </div>
    </section>
  );
};

export default BatteryProcessSection;

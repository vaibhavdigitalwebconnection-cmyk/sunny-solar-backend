import React from 'react';
import { m } from 'framer-motion';
import {
  ClipboardCheck,
  Wrench,
  Cpu,
  Smartphone,
  CheckCircle2,
} from 'lucide-react';
import { BorderBeam } from '../../../components/ui/BorderBeam';

interface Step {
  stepNumber: string;
  title: string;
  badge: string;
  description: string;
  icon: React.ElementType;
  color: string;
  colorTo: string;
  deliverables: string[];
}

const STEPS: Step[] = [
  {
    stepNumber: '01',
    title: 'Switchboard & Load Audit',
    badge: 'Safety Pre-Check',
    icon: ClipboardCheck,
    color: '#2B3CB8',
    colorTo: '#4658D9',
    description:
      'Our SAA-accredited master electrician inspects your main electrical switchboard, checks existing service fuse amperage, verifies supply phases, and tests earth loop impedance.',
    deliverables: [
      'Single vs 3-phase verification',
      'Spare breaker slot assessment',
      'Max demand safety calculation',
    ],
  },
  {
    stepNumber: '02',
    title: 'Dedicated Sub-Circuit Run',
    badge: 'AS/NZS 3000 Standard',
    icon: Wrench,
    color: '#ED4F11',
    colorTo: '#FF7A45',
    description:
      'We run dedicated 6mm² or 10mm² low-loss copper cable directly from your switchboard to the charger location, protected by a dedicated Type A/B RCD breaker and lockable rotary isolator.',
    deliverables: [
      'Isolated high-current protection',
      'Heavy-duty UV resistant conduit',
      'Zero voltage drop over run',
    ],
  },
  {
    stepNumber: '03',
    title: 'Mounting & Solar CT Setup',
    badge: 'Precision Fitment',
    icon: Cpu,
    color: '#0284C7',
    colorTo: '#38BDF8',
    description:
      'The wall unit is securely anchored at an ergonomic height. We attach a high-accuracy CT current sensor at your main supply and hybrid inverter to unlock automatic solar tracking.',
    deliverables: [
      'Ergonomic 1.2m mounting height',
      'Smart CT sensor clamp calibration',
      'Concealed clean electrical routing',
    ],
  },
  {
    stepNumber: '04',
    title: 'Testing, Certificate & App',
    badge: 'Turnkey Handover',
    icon: Smartphone,
    color: '#10B981',
    colorTo: '#34D399',
    description:
      'We simulate charging cycles, test RCD trip response times under 40ms, issue your official State Electrical Safety Compliance Certificate, and configure your mobile monitoring app.',
    deliverables: [
      'Official Electrical Compliance Cert',
      'Mobile Wi-Fi app configured',
      '5-Year equipment & labor warranty',
    ],
  },
];

export const EVInstallationProcessSection: React.FC = () => {
  return (
    <section id="installation-process" className="py-8 sm:py-14 bg-slate-50/60 relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-6xl mx-auto space-y-3 sm:space-y-4 mb-14 sm:mb-18">
        

          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight">
            Seamless 4-Step Installation.{' '} <br />
            <span className="bg-linear-to-r from-[#2B3CB8] via-[#3E52E8] to-[#ED4F11] bg-clip-text text-transparent">
              Zero Guesswork.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            High-voltage EV charging demands professional engineering. We handle everything from switchboard safety checks to official compliance sign-off in a single morning.
          </p>
        </div>

        {/* Process Steps Grid with BorderBeam & Interactive Animation */}
        <div className="relative">

          {/* Desktop Connecting Energy Flow Line */}
          <div className="hidden lg:block absolute top-16 left-12 right-12 h-0.5 bg-slate-200 z-0">
            <m.div
              className="h-full bg-linear-to-r from-[#2B3CB8] via-[#ED4F11] to-[#10B981]"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <m.div
                  key={step.stepNumber}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: index * 0.12 }}
                  whileHover={{ y: -6 }}
                  className="relative rounded-xl bg-white border border-slate-300/90 p-6 flex flex-col justify-between shadow-lg shadow-black hover:shadow-xl transition-all duration-300 group overflow-hidden"
                >
                  {/* Magic UI BorderBeam Animated Border Laser */}
                  <BorderBeam
                    size={130}
                    duration={8}
                    delay={index * 2}
                    colorFrom={step.color}
                    colorTo={step.colorTo}
                    borderWidth={1.5}
                  />

                  {/* Corner Accent Glow on Hover */}
                  <div
                    className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: step.color }}
                  />

                  <div>
                    {/* Step Number & Animated Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-3xl font-black text-slate-200 group-hover:text-slate-900/80 font-sans transition-colors">
                        {step.stepNumber}
                      </span>
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-xs"
                        style={{
                          backgroundColor: `${step.color}15`,
                          color: step.color,
                        }}
                      >
                        <m.div
                          whileHover={{ rotate: 12, scale: 1.1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                          <Icon className="w-5 h-5" />
                        </m.div>
                      </div>
                    </div>

                    <span
                      className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full mb-2 inline-block transition-colors"
                      style={{
                        backgroundColor: `${step.color}15`,
                        color: step.color,
                      }}
                    >
                      {step.badge}
                    </span>

                    <h3 className="text-lg font-bold font-serif text-slate-900 mb-2 group-hover:text-[#2B3CB8] transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    {step.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] font-medium text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                </m.div>
              );
            })}
          </div>

        </div>



      </div>
    </section>
  );
};

export default EVInstallationProcessSection;

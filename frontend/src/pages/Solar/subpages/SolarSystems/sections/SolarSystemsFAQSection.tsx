import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const SolarSystemsFAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How many kilowatts (kW) of solar does an average home actually need?',
      a: 'For a typical 3-4 bedroom Queensland home with ducted air conditioning or a pool, a 10.0kW to 13.2kW panel array paired with an 8kW or 10kW inverter delivers the strongest ROI. Even on overcast days or during winter, a larger array ensures your home stays powered without drawing expensive grid electricity.',
    },
    {
      q: 'What is the difference between single-phase and three-phase solar?',
      a: 'Single-phase homes have one 230V active wire, usually limiting inverter capacity to 5.0kW of continuous export into the grid. However, we can install up to a 10kW or 13.2kW panel array with a smart export limiter. Three-phase homes have three active wires, allowing up to 15kW–30kW of export capacity without restriction.',
    },
    {
      q: 'Why can I install a 6.6kW or 10kW panel array on a smaller inverter?',
      a: 'This is known as the "oversizing ratio". In Australia, Clean Energy Council rules allow installing up to 133% of the inverter’s rated capacity in solar panels while remaining eligible for Federal STC rebates. Oversizing allows the inverter to reach peak generation earlier in the morning and sustain it later into the evening.',
    },
    {
      q: 'Will my solar system still work during a neighborhood blackout?',
      a: 'Standard grid-connected solar without a battery shuts down immediately during a blackout for lineman safety (anti-islanding). However, if you choose a hybrid inverter like the Fronius GEN24 with PV Point or add a battery like the Tesla Powerwall 3, your system automatically islands to provide whole-home blackout backup.',
    },
    {
      q: 'How much will I receive for feeding excess electricity back into the grid?',
      a: 'Feed-in tariffs in South East Queensland typically range from 5c to 10c per kWh depending on your electricity retailer. Because buying grid power costs 32c+ per kWh, the highest return on investment comes from consuming your own power (self-consumption) or storing it in a battery rather than exporting it.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <Badge variant="amber">Common Questions</Badge>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-bold text-slate-950 mt-3 tracking-tight leading-tight">
            Frequently Asked Questions About Solar Sizing
          </h2>
          <p className="mt-2.5 sm:mt-3 text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto px-1 sm:px-0">
            Everything you need to know about Queensland connection limits, sizing, and warranties.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200/90 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-200 bg-white shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 md:p-6 flex items-center justify-between gap-3 sm:gap-4 font-serif font-bold text-sm sm:text-base md:text-lg text-slate-900 hover:text-[#2B3CB8] transition-colors cursor-pointer   active:bg-slate-50/50"
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug pr-1">{faq.q}</span>
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-[#2B3CB8]/10 text-[#2B3CB8]' : 'bg-slate-100 text-slate-400'
                      }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#2B3CB8]' : ''
                        }`}
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1 sm:mt-2 pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SolarSystemsFAQSection;

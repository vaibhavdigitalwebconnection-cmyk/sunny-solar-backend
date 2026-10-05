import React, { useState, useMemo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  Phone,
  ArrowRight,
  Search,
  Sun,
  Zap,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { BorderBeam } from '../../../components/ui/BorderBeam';

interface FAQItem {
  id: string;
  category: 'solar' | 'hardware' | 'safety';
  question: string;
  answer: string;
  badge: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'solar-only-charging',
    category: 'solar',
    question: 'Can I charge my EV using only solar power without drawing from the grid?',
    answer:
      'Yes, absolutely. In "Pure Solar" mode, our smart charger uses a high-precision CT clamp on your electrical switchboard to detect when rooftop solar generation exceeds household usage. It only turns on and ramps up charging amperage (from 6A to 32A) to match that exact solar surplus. If clouds pass or household appliances turn on, the charger automatically throttles down to prevent drawing costly grid power.',
    badge: 'Solar Matching',
  },
  {
    id: 'single-vs-three-phase',
    category: 'hardware',
    question: 'What is the difference between Single-Phase (7.4kW) and Three-Phase (22kW)?',
    answer:
      'Single-phase power (240V, 32A) provides up to 7.4 kW, adding roughly 45–55 km of driving range per hour. It is standard for around 90% of Australian homes and easily recharges an electric car from 10% to 100% overnight (in 6–8 hours). Three-phase power (415V, 32A) provides up to 22 kW, adding 100–130 km per hour. If your home already has three-phase power, a 22 kW unit can fully recharge an EV in just 2.5 to 3.5 hours.',
    badge: 'Hardware Specs',
  },
  {
    id: 'switchboard-overload',
    category: 'safety',
    question: 'Will charging my EV overload my main electrical switchboard or trip the breaker?',
    answer:
      'No. Every Sunny Solar installation includes hardware Dynamic Load Balancing (DLB). A current sensor continuously monitors total household electricity demand. If high-draw appliances like ducted air conditioning, electric ovens, or pool pumps switch on, the EV charger automatically dials down its draw in real-time so your main supply fuse never trips.',
    badge: 'Safety Guard',
  },
  {
    id: 'battery-required',
    category: 'solar',
    question: 'Do I need a home battery system to install an EV charger?',
    answer:
      'No, a home battery is not required. You can charge directly from your rooftop solar panels during daytime sunshine hours, or set an automated timer via the mobile app to charge during super off-peak nighttime grid hours (e.g. 12 AM to 6 AM) when tariffs are lowest. If you do have a home battery, you can also store excess daytime energy to charge your car after sunset.',
    badge: 'Battery & Solar',
  },
  {
    id: 'compatibility',
    category: 'hardware',
    question: 'Is the charger compatible with all electric car makes and models?',
    answer:
      'Yes. Our Level 2 wallbox chargers feature the standard Australian IEC 62196 Type 2 (Mennekes) connector, which is universally compatible with 100% of modern electric vehicles sold in Australia—including all sedans, SUVs, hatchbacks, and upcoming commercial electric utes.',
    badge: 'Compatibility',
  },
  {
    id: 'weatherproof',
    category: 'hardware',
    question: 'Can the charger be installed outdoors exposed to rain and sun?',
    answer:
      'Yes. The charging stations are certified IP65 weatherproof and IK10 impact-rated with UV-stabilized casing, engineered specifically to endure harsh Australian UV radiation, dust storms, and torrential tropical rain.',
    badge: 'Durability',
  },
  {
    id: 'install-time',
    category: 'safety',
    question: 'How long does the installation take and do I get a safety certificate?',
    answer:
      'A standard residential EV charger installation takes between 3 to 4 hours. Our accredited master electricians run the dedicated circuit, mount the wallbox, calibrate the solar CT sensors, perform RCD safety testing, and provide your official State Electrical Compliance Certificate on the spot.',
    badge: 'Installation',
  },
];

type CategoryFilter = 'all' | 'solar' | 'hardware' | 'safety';

export const EVFAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>('solar-only-charging');

  // Filtered FAQs based on category and search query
  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.badge.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-8 sm:py-14 bg-white relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#2B3CB8] bg-[#F5F7FD] border border-[#D1DCF8]">
            <HelpCircle className="w-3.5 h-3.5 text-[#2B3CB8]" />
            <span>Got Questions? We Have Answers</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            Everything you need to know about solar-matched charging, switchboard upgrades, and equipment compatibility.
          </p>
        </div>

       

        {/* Dynamic Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-500 text-sm">
              No matching questions found for "{searchQuery}". Try searching for "solar", "22kW", or "switchboard".
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-linear-to-b from-[#F5F7FD]/70 to-white border-[#2B3CB8]/40 shadow-md ring-1 ring-[#2B3CB8]/20'
                      : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  {/* Accordion Trigger Button */}
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left px-5 sm:px-6 py-4 flex items-center justify-between gap-4 font-semibold text-slate-900 focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 shrink-0">
                        {faq.badge}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-slate-900 font-serif">
                        {faq.question}
                      </span>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-[#2B3CB8] text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Smooth Collapsible Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="overflow-hidden px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100"
                      >
                        {faq.answer}
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* High-Tech Reassurance Card with BorderBeam */}
        <div className="mt-12 relative rounded-2xl bg-linear-to-r from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-7 text-white shadow-xl overflow-hidden border border-slate-800">
          <BorderBeam size={180} duration={8} colorFrom="#00FFF1" colorTo="#ED4F11" borderWidth={2} />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Have a unique switchboard question?</h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Speak directly to our licensed solar &amp; EV electrical engineers.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="tel:1300030479"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-slate-950" />
                <span>1300 030 479</span>
              </a>
              <Button
                to="/contact"
                variant="outline"
                size="sm"
                className="text-xs font-bold text-white border-white/30 hover:border-white hover:bg-white/10"
              >
                Book Inspection
              </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EVFAQSection;

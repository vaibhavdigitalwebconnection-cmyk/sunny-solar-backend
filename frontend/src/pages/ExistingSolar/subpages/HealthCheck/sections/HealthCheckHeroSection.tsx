import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const HealthCheckHeroSection: React.FC = () => {
  return (
    <section className="relative pt-28 sm:pt-25 pb-14 sm:pb-14 bg-linear-to-b from-[#2B3CB8]/5 via-white to-slate-50 overflow-hidden">
    


      <div className=" relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          {/* Left Column: Rooftop Hero Image with Magic UI BorderBeam & Floating Badges */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative"
          >
            <div className="relative h-110 overflow-hidden">
              {/* Main Solar Rooftop Photography */}
              <img
                src="/images/solar-health-check-hero.webp"
                alt="Luxury Australian home with modern rooftop solar array and pool"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />

              {/* Full Blue Overlay Tint */}
              <div className="pointer-events-none absolute inset-0 bg-[#2B3CB8]/30 z-10" />

              {/* Bottom blue gradient overlay */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-blue-950 to-transparent z-20" />
            </div>
          </motion.div>

          {/* Right Column: Content with Magic UI animated text & dual statistic cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col justify-center pr-6"
          >
           
            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-serif font-bold text-slate-950 tracking-tight leading-[1.12]">
              Why Solar Outperforms{' '}
              <span className="bg-linear-to-r from-[#2B3CB8] via-[#4658D9] to-[#6F8EE7] bg-clip-text text-transparent">
                Traditional Home Investments
              </span>
            </h1>

            {/* Explanatory Paragraph */}
            <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal">
              Unlike static investments, solar produces immediate cost offsets every daylight hour.
              While electricity retailers increase daytime and peak grid charges by an average of
              9.2% annually, your rooftop generates energy at $0 variable cost.
            </p>

         

            {/* Action Buttons Row */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Button
                to="/get-started/free-assessment"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-md"
              >
                Book Health Check ($189 Special)
              </Button>
              <Button
                href="tel:1300030479"
                variant="outline"
                size="md"
                icon={<Phone className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Call 1300 030 479
              </Button>
            </div>
          </motion.div>
        </div>

        
      </div>
    </section>
  );
};

export default HealthCheckHeroSection;

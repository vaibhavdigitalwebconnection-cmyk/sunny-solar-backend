import React from 'react';
import { motion } from 'framer-motion';
import { 
  BatteryCharging, 
  Sun, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  TrendingDown, 
  Moon
} from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';

export const CalculatorsAddBatterySolarSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16 mb-4 sm:mb-6">
      {/* Outer ambient glow wrapper */}
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.55 }}
        className="relative rounded-2xl sm:rounded-3xl bg-linear-to-br from-amber-500/10 via-emerald-500/5 to-slate-900/5 p-px shadow-lg shadow-slate-200/50"
      >
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 overflow-hidden">
          
          {/* Core Content: Asymmetric Organic Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Left Column: Fluid Visual Showcase with Overlaid Telemetry */}
            <div className="lg:col-span-5 relative">
              {/* Image Frame with curved corners & subtle tilt */}
              <div className="relative rounded-xl overflow-hidden shadow-md group">
                <img 
                  src="/images/solutions/battery-bundle.jpg" 
                  alt="Modern home battery storage paired with rooftop solar system" 
                  className="w-full h-56 xs:h-64 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Overlaid Top Tag */}
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full border border-white/20 text-white text-[10px] sm:text-[11px] font-bold flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>AC-Coupled Retrofit</span>
                </div>

                {/* Overlaid Bottom Stat Pill with Animated Progress */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center justify-between text-xs font-medium text-amber-300 mb-1">
                    <span className="text-[11px] sm:text-xs">Self-Consumption Rate</span>
                    <span className="font-extrabold text-white text-xs sm:text-sm">94% Max</span>
                  </div>
                  <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '94%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: 'easeOut', delay: 0.3 }}
                      className="bg-linear-to-r from-amber-400 to-emerald-400 h-full" 
                    />
                  </div>
                </div>
              </div>

              {/* Floating Glassmorphic Pill Tag */}
              <motion.div 
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                className="mt-3 sm:mt-0 sm:absolute sm:-bottom-4 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl border border-emerald-200/80 p-2.5 sm:p-3 shadow-lg shadow-emerald-500/10 flex items-center gap-2.5 sm:gap-3"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                  <TrendingDown className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Evening Peak Rate</span>
                  <span className="text-xs font-extrabold text-slate-900">Reduced from 38¢ to $0</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Dynamic Non-Boxy Synergy Insights */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  Why Adding a Battery to Solar Changes Your Bill Forever
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Solar alone only offsets electricity during daylight. When your family cooks, runs air conditioning, and watches TV between 5 PM and 10 PM, traditional solar homes pay full retail peak rates (up to 38¢–44¢/kWh). Adding a home battery captures your surplus daytime generation instead of exporting it for a meager 5¢ feed-in credit.
                </p>
              </div>

              {/* Connected Flow Pills */}
              <div className="space-y-2">
                <motion.div 
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start sm:items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-amber-50/50 hover:border-amber-200/60 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900">Stop Selling Cheap Solar: </span>
                    <span className="text-slate-600">Avoid exporting peak kilowatt hours for 5¢ while buying nighttime power at 38¢.</span>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start sm:items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-emerald-50/50 hover:border-emerald-200/60 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                    <Moon className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900">Nighttime Blackout Immunity: </span>
                    <span className="text-slate-600">Keep refrigerators, lights, and WiFi running when storms knock out the local grid.</span>
                  </div>
                </motion.div>
              </div>

              {/* Callout action */}
              <div className="pt-2 flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-3 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>Compatible with 100% of existing solar setups</span>
                </div>
                <Button
                  to="/calculators/battery-savings"
                  variant="primary"
                  size="sm"
                  className="w-full xs:w-auto justify-center text-center"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Model Battery Savings
                </Button>
              </div>

            </div>

          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default CalculatorsAddBatterySolarSection;


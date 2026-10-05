import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Moon, 
  Zap, 
  DollarSign, 
  TrendingDown, 
  Home, 
  Sun, 
  Clock, 
  ArrowRight,
  BatteryCharging,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';

export const BatteryBenefitsSection: React.FC = () => {
  const [activeCycle, setActiveCycle] = useState<'morning' | 'midday' | 'evening' | 'night'>('evening');

  const cycleData = {
    morning: {
      time: '07:00 AM – 11:00 AM',
      phase: 'Morning Solar Ramp',
      title: 'Solar Wakes Up & Powers The Breakfast Rush',
      description: 'Your rooftop panels begin generating clean energy as the sun rises. They directly run kettle, coffee machine, and kitchen appliances. Extra power begins gently trickling into the battery.',
      solarGen: '3.8 kW',
      batteryAction: 'Charging (+1.6 kW)',
      gridImport: '0.0 kW',
      statColor: 'text-amber-500',
      badgeColor: 'amber' as const,
    },
    midday: {
      time: '11:00 AM – 03:30 PM',
      phase: 'Peak Sunshine & Full Storage Top-Up',
      title: 'Air Conditioning Runs Free While Storage Reaches 100%',
      description: 'During maximum midday irradiance, your solar array produces abundant energy. It powers central ducted cooling, charges your EV, and rapidly charges your battery to 100% capacity for the evening.',
      solarGen: '8.4 kW',
      batteryAction: 'Fast Charging (+5.0 kW)',
      gridImport: '0.0 kW (Exporting excess)',
      statColor: 'text-emerald-500',
      badgeColor: 'emerald' as const,
    },
    evening: {
      time: '04:00 PM – 09:30 PM',
      phase: 'Peak Tariff Elimination (Critical Savings)',
      title: 'Energy Retailers Charge 45¢. You Pay $0.00.',
      description: 'As the sun sets, energy retailers dramatically increase electricity prices to peak evening rates. Instead of drawing from the expensive grid, your battery seamlessly takes over 100% of your household load.',
      solarGen: '0.0 kW',
      batteryAction: 'Discharging (-3.2 kW to Home)',
      gridImport: '0.0 kW (Grid Isolated)',
      statColor: 'text-orange-500',
      badgeColor: 'amber' as const,
    },
    night: {
      time: '10:00 PM – 06:00 AM',
      phase: 'Overnight Quiet Autonomy & Storm Standby',
      title: 'Silent Clean Power Running All Night Long',
      description: 'Your battery quietly powers ceiling fans, refrigerators, Wi-Fi routers, and security systems through the night while keeping a 20% reserve buffer for emergency blackout resilience.',
      solarGen: '0.0 kW',
      batteryAction: 'Sustaining Baseline (-0.6 kW)',
      gridImport: '0.0 kW (Zero grid bills)',
      statColor: 'text-blue-500',
      badgeColor: 'navy' as const,
    },
  };

 

  const current = cycleData[activeCycle];

  return (
    <section className="py-14 bg-white">
      <div className="">
        
        {/* Section Header */}
        <div className="text-center max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl max-w-3xl mx-auto font-serif font-bold text-slate-950 mt-3 tracking-tight">
            Why Australian Families Are Adding Storage in 2025
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            Feed-in tariffs have plummeted to 3–5 cents. Storing your valuable solar energy on-site rather than giving it away to power companies is the most profitable decision for your home.
          </p>
        </div>

        {/* Interactive 24-Hour Cycle Visualizer */}
        <div className="bg-slate-950  p-6 sm:p-10 text-white mb-16 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Interactive Simulation</span>
                <h3 className="text-2xl font-bold mt-1">A Day in the Life with Battery Storage</h3>
                <p className="text-sm text-slate-400 mt-1">Select a time of day to inspect how solar, battery, and home power interact:</p>
              </div>

              {/* Time of Day Tabs */}
              <div className="flex flex-wrap gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
                {(['morning', 'midday', 'evening', 'night'] as const).map((cycle) => (
                  <button
                    key={cycle}
                    onClick={() => setActiveCycle(cycle)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all capitalize cursor-pointer ${
                      activeCycle === cycle
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {cycle}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content Display */}
            <AnimatePresence mode="wait">
              <m.div
                key={activeCycle}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8"
              >
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant={current.badgeColor} size="sm">
                      {current.time}
                    </Badge>
                    <span className="text-xs font-semibold text-slate-400">{current.phase}</span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                    {current.title}
                  </h4>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {current.description}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Calculated based on standard 10kW Solar + 13.5kWh Battery System in Brisbane & Gold Coast</span>
                  </div>
                </div>

                {/* Status Dashboard Panel */}
                <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Solar Output</span>
                    <span className="text-base font-extrabold text-amber-400 font-mono">{current.solarGen}</span>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Battery Status</span>
                    <span className={`text-base font-extrabold font-mono ${current.statColor}`}>{current.batteryAction}</span>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Grid Import</span>
                    <span className="text-base font-extrabold text-emerald-400 font-mono">{current.gridImport}</span>
                  </div>

                  <div className="pt-2">
                    <Button
                      to="/calculators/battery-savings"
                      variant="accent-green"
                      size="sm"
                      fullWidth
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Simulate Your Family's Usage
                    </Button>
                  </div>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>

       

      </div>
    </section>
  );
};

export default BatteryBenefitsSection;

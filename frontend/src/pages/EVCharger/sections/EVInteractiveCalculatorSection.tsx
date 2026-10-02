import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  DollarSign,
  TrendingDown,
  Sun,
  Zap,
  Gauge,
  Leaf,
  Clock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { NumberTicker } from '../../../components/ui/NumberTicker';
import { BorderBeam } from '../../../components/ui/BorderBeam';

type PowerSource = 'solar' | 'offpeak' | 'standard';

export const EVInteractiveCalculatorSection: React.FC = () => {
  const [dailyKm, setDailyKm] = useState<number>(45);
  const [petrolPrice, setPetrolPrice] = useState<number>(2.15);
  const [powerSource, setPowerSource] = useState<PowerSource>('solar');

  // Constants
  const petrolEconomyLPer100 = 9.2; // 9.2 L/100km average ICE car
  const evEconomyKwhPer100 = 16.5; // 16.5 kWh/100km average EV

  // Tariff by power source
  const tariffMap: Record<PowerSource, number> = {
    solar: 0.0, // 100% free sunshine
    offpeak: 0.12, // 12c/kWh offpeak tariff
    standard: 0.38, // 38c/kWh peak tariff
  };

  const annualKm = dailyKm * 365;
  const annualPetrolCost = Math.round((annualKm / 100) * petrolEconomyLPer100 * petrolPrice);
  const annualEvCost = Math.round((annualKm / 100) * evEconomyKwhPer100 * tariffMap[powerSource]);
  const annualSavings = Math.max(0, annualPetrolCost - annualEvCost);
  const fiveYearSavings = annualSavings * 5;
  const co2AvoidedKg = Math.round((annualKm / 100) * 21.8); // ~21.8kg CO2 saved per 100km

  return (
    <section id="ev-calculator" className="py-20 sm:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-[#2B3CB8]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-[#ED4F11]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/60">
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Financial Modeler</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            How Much Will You Save{' '}
            <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-[#ED4F11] bg-clip-text text-transparent">
              Switching from Petrol?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Move the sliders to match your daily driving habits and current local fuel prices. Watch the estimated savings calculate instantly.
          </p>
        </div>

        {/* 2-Column Calculator Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">

          {/* Left Column: Sliders & Controls */}
          <div className="lg:col-span-6 bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-7 shadow-xl flex flex-col justify-between">
            
            <div className="space-y-6">
              {/* Slider 1: Daily Distance */}
              <div>
                <div className="flex items-center justify-between text-sm font-semibold mb-2">
                  <span className="text-slate-300">Daily Commute Distance:</span>
                  <span className="text-cyan-400 font-bold text-base">{dailyKm} km / day</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={150}
                  step={5}
                  value={dailyKm}
                  onChange={(e) => setDailyKm(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>15 km (Local errands)</span>
                  <span>75 km</span>
                  <span>150 km (Long commute)</span>
                </div>
              </div>

              {/* Slider 2: Current Petrol Price */}
              <div>
                <div className="flex items-center justify-between text-sm font-semibold mb-2">
                  <span className="text-slate-300">Current Petrol Price (Per Litre):</span>
                  <span className="text-amber-400 font-bold text-base">${petrolPrice.toFixed(2)} / L</span>
                </div>
                <input
                  type="range"
                  min={1.6}
                  max={2.8}
                  step={0.05}
                  value={petrolPrice}
                  onChange={(e) => setPetrolPrice(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>$1.60/L</span>
                  <span>$2.20/L (Typical)</span>
                  <span>$2.80/L</span>
                </div>
              </div>

              {/* Selector 3: Primary Charging Power Source */}
              <div>
                <label className="text-sm font-semibold text-slate-300 block mb-2.5">
                  Primary Charging Energy Source:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPowerSource('solar')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      powerSource === 'solar'
                        ? 'bg-amber-950/40 border-amber-500/80 text-amber-300 shadow-md shadow-amber-500/20'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs mb-1">
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span>100% Solar</span>
                    </div>
                    <div className="text-[11px] text-slate-400">$0.00 / kWh</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPowerSource('offpeak')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      powerSource === 'offpeak'
                        ? 'bg-blue-950/40 border-blue-500/80 text-blue-300 shadow-md shadow-blue-500/20'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs mb-1">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>Off-Peak Grid</span>
                    </div>
                    <div className="text-[11px] text-slate-400">12¢ / kWh</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPowerSource('standard')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      powerSource === 'standard'
                        ? 'bg-purple-950/40 border-purple-500/80 text-purple-300 shadow-md shadow-purple-500/20'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs mb-1">
                      <Zap className="w-3.5 h-3.5 text-purple-400" />
                      <span>Standard Grid</span>
                    </div>
                    <div className="text-[11px] text-slate-400">38¢ / kWh</div>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400">
              *Calculation based on {annualKm.toLocaleString()} annual km, 9.2L/100km fuel consumption, and 16.5kWh/100km average Australian EV consumption profile.
            </div>

          </div>

          {/* Right Column: Dynamic Savings Results Dashboard */}
          <div className="lg:col-span-6 relative rounded-3xl bg-slate-950 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-hidden">
            <BorderBeam size={200} duration={8} colorFrom="#10B981" colorTo="#2B3CB8" borderWidth={2} />

            <div className="space-y-6 relative z-10">

              {/* Big Savings Hero Box */}
              <div className="p-6 rounded-2xl bg-linear-to-b from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/40 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  Estimated Net Annual Fuel Savings
                </span>
                <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-sans tracking-tight">
                  $<NumberTicker value={annualSavings} />
                  <span className="text-xl font-normal text-slate-400"> / year</span>
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  5-Year Cumulative Savings:{' '}
                  <strong className="text-white font-bold">${fiveYearSavings.toLocaleString()}</strong> in unspent petrol!
                </p>
              </div>

              {/* Comparison Breakdown Bar */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                    Annual Petrol Expense:
                  </span>
                  <span className="font-bold text-red-400">${annualPetrolCost.toLocaleString()} / yr</span>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                    Annual Solar EV Power:
                  </span>
                  <span className="font-bold text-emerald-400">
                    {annualEvCost === 0 ? '$0.00 (100% Free Solar)' : `$${annualEvCost.toLocaleString()} / yr`}
                  </span>
                </div>

                <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-500"
                    style={{
                      width: `${Math.max(5, (annualEvCost / (annualPetrolCost || 1)) * 100)}%`,
                    }}
                  />
                  <div className="bg-red-500/40 h-full flex-1" />
                </div>
              </div>

              {/* Environmental Offset */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <Leaf className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">
                    <NumberTicker value={co2AvoidedKg} /> kg
                  </div>
                  <div className="text-[11px] text-slate-400">CO2 Emissions Avoided / Yr</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <Gauge className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">
                    $<NumberTicker value={Number(((annualSavings / 52)).toFixed(0))} /> / wk
                  </div>
                  <div className="text-[11px] text-slate-400">Kept in Your Pocket Weekly</div>
                </div>
              </div>

            </div>

            {/* CTA in Calculator */}
            <div className="mt-6 pt-4 border-t border-slate-800 relative z-10">
              <Button
                to="/get-started/free-assessment"
                variant="primary"
                size="md"
                className="w-full justify-center font-bold shadow-lg shadow-[#ED4F11]/25"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Lock In Your Solar EV Savings
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default EVInteractiveCalculatorSection;

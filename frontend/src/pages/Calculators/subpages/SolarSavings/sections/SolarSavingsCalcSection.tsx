import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, RotateCcw, Sun, ArrowRight } from 'lucide-react';
import { Button } from '../../../../../components/ui/Button';

export const SolarSavingsCalcSection: React.FC = () => {
  const [quarterlyBill, setQuarterlyBill] = useState<number>(750);
  const [daytimeHabit, setDaytimeHabit] = useState<'high' | 'medium' | 'low'>('medium');
  const [hasPool, setHasPool] = useState<boolean>(true);
  const [hasEv, setHasEv] = useState<boolean>(false);

  /* Calculation formulas */
  const annualBill = quarterlyBill * 4;

  let savingsMultiplier = 0.70;
  if (daytimeHabit === 'high') savingsMultiplier = 0.82;
  if (daytimeHabit === 'low') savingsMultiplier = 0.58;
  if (hasPool) savingsMultiplier += 0.04;
  if (hasEv) savingsMultiplier += 0.03;
  savingsMultiplier = Math.min(savingsMultiplier, 0.88);

  const annualSavings = Math.round(annualBill * savingsMultiplier);
  const quarterlySavings = Math.round(annualSavings / 4);
  const newQuarterlyBill = Math.max(quarterlyBill - quarterlySavings, 45); // supply charge baseline
  const tenYearSavings = Math.round(annualSavings * 10 * 1.03); // factoring 3% annual power inflation

  // Recommended system size
  let recSize = '6.6 kW';
  if (quarterlyBill > 600) recSize = '8.8 kW';
  if (quarterlyBill > 900 || hasPool || hasEv) recSize = '10.0 kW';
  if (quarterlyBill > 1300) recSize = '13.2 kW';

  const resetDefaults = () => {
    setQuarterlyBill(750);
    setDaytimeHabit('medium');
    setHasPool(true);
    setHasEv(false);
  };

  const billPresets = [400, 750, 1200, 1800];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="p-4 sm:p-6 lg:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 sm:pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-950 tracking-tight">
              Calculate Your Solar Savings
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Adjust the values below to see your estimated quarterly and long-term bill reductions.
            </p>
          </div>
          <button
            type="button"
            onClick={resetDefaults}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-amber-600 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-lg transition-colors self-start sm:self-auto cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        {/* 2-Column Normal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pt-6 items-start">
          
          {/* Left: Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            
            {/* 1. Quarterly Bill Input & Slider */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <label className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Quarterly Electricity Bill</span>
                </label>
                <div className="relative flex items-center shrink-0">
                  <span className="absolute left-2.5 sm:left-3 text-amber-700 font-bold text-xs sm:text-sm pointer-events-none">$</span>
                  <input
                    type="number"
                    min="50"
                    max="5000"
                    step="25"
                    value={quarterlyBill === 0 ? '' : quarterlyBill}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : Number(e.target.value);
                      setQuarterlyBill(val);
                    }}
                    placeholder="750"
                    className="w-24 sm:w-32 pl-6 sm:pl-7 pr-2.5 sm:pr-3 py-1 text-sm sm:text-base font-bold text-amber-700 bg-amber-50 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-right shadow-2xs"
                  />
                </div>
              </div>
              
              <input
                type="range"
                min="300"
                max="2500"
                step="50"
                value={Math.min(Math.max(quarterlyBill || 300, 300), 2500)}
                onChange={(e) => setQuarterlyBill(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2.5">
                <span className="text-[11px] text-slate-400 font-medium mr-1">Quick select:</span>
                {billPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setQuarterlyBill(preset)}
                    className={`text-xs px-2 sm:px-2.5 py-1 rounded-md border font-medium transition-colors cursor-pointer ${
                      quarterlyBill === preset
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    ${preset}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Daytime Occupancy */}
            <div>
              <label className="text-xs sm:text-sm font-semibold text-slate-900 block mb-2">
                Daytime Home Occupancy (9am – 4pm)
              </label>
              <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 sm:gap-2.5">
                {[
                  { id: 'high', label: 'All Day', sub: 'WFH / Retired' },
                  { id: 'medium', label: 'Part of Day', sub: 'Flexible hours' },
                  { id: 'low', label: 'Evenings Only', sub: 'Rarely home' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDaytimeHabit(item.id as any)}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      daytimeHabit === item.id
                        ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xs font-bold block">{item.label}</span>
                    <span className={`text-[10px] block mt-0.5 ${
                      daytimeHabit === item.id ? 'text-amber-100' : 'text-slate-400'
                    }`}>
                      {item.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Extra Appliances Checkboxes */}
            <div>
              <label className="text-xs sm:text-sm font-semibold text-slate-900 block mb-2">
                Additional Power Loads
              </label>
              <div className="space-y-2 sm:space-y-2.5">
                <label className="flex items-start sm:items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={hasPool}
                    onChange={(e) => setHasPool(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer mt-0.5 sm:mt-0 shrink-0"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-slate-900 block">Swimming Pool / Filtration Pump</span>
                    <span className="text-slate-500 text-[11px] sm:text-xs">Timer scheduled to run during solar peak hours</span>
                  </div>
                </label>

                <label className="flex items-start sm:items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={hasEv}
                    onChange={(e) => setHasEv(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer mt-0.5 sm:mt-0 shrink-0"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-slate-900 block">Electric Vehicle (or planning one)</span>
                    <span className="text-slate-500 text-[11px] sm:text-xs">Charge during the day with free generated solar</span>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right: Results (5 cols) */}
          <div className="lg:col-span-5 bg-slate-50 rounded-xl border border-slate-200/80 p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Estimated Savings
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                ~{(savingsMultiplier * 100).toFixed(0)}% Off Bill
              </span>
            </div>

            {/* Primary Hero Stat Card */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
              <span className="text-[11px] sm:text-xs font-medium text-amber-800 uppercase tracking-wider block">
                Estimated Annual Savings
              </span>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-700 mt-1">
                ${annualSavings.toLocaleString()}
                <span className="text-sm sm:text-base font-semibold text-amber-600"> / yr</span>
              </div>
              <p className="text-[11px] sm:text-xs text-amber-700/80 mt-1">
                Save approximately ${quarterlySavings.toLocaleString()} on each quarterly bill
              </p>
            </div>

            {/* Secondary Stat Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              
              <div className="p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 block">New Quarterly Bill</span>
                <span className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 block">
                  ${newQuarterlyBill.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400">Down from ${quarterlyBill}</span>
              </div>

              <div className="p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 block">10-Year Savings</span>
                <span className="text-base sm:text-lg font-bold text-emerald-600 mt-0.5 block">
                  ${tenYearSavings.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400">Inc. 3% inflation</span>
              </div>

              <div className="col-span-full p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 block">Recommended System Size</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900">{recSize} Solar Array</span>
                </div>
                <Sun className="w-5 h-5 text-amber-500 shrink-0" />
              </div>

            </div>

            {/* Action Buttons & Next Step */}
            <div className="pt-2 space-y-2">
              <Button
                to="/get-started/free-assessment"
                variant="primary"
                size="md"
                fullWidth
                icon={<ArrowRight className="w-4 h-4" />}
                className="shadow-md justify-center text-center text-xs sm:text-sm"
              >
                Claim This System Quote
              </Button>
              <div className="flex flex-col xs:flex-row items-center justify-between text-[11px] text-slate-500 px-1 pt-1 gap-1">
                <span>Want to see battery impact?</span>
                <Link
                  to="/calculators/battery-savings"
                  className="text-[#2B3CB8] font-semibold hover:underline"
                >
                  Model battery ROI →
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default SolarSavingsCalcSection;

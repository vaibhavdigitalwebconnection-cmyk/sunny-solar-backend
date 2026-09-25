import React, { useState } from 'react';
import { Calendar, Zap, TrendingUp, RotateCcw, ArrowRight, Sun } from 'lucide-react';
import { Button } from '../../../../../components/ui/Button';

export const SavingsSoFarCalcSection: React.FC = () => {
  const [yearsInstalled, setYearsInstalled] = useState<number>(5);
  const [systemSize, setSystemSize] = useState<number>(5.0);
  const [selfConsumption, setSelfConsumption] = useState<number>(60); // %

  /* Calculation logic */
  const dailyGenPerKw = 4.2; // average daily kWh output per kW in QLD
  const size = Math.max(systemSize || 1, 0.5);
  const years = Math.max(yearsInstalled || 1, 0.5);
  const selfConsRate = Math.min(Math.max(selfConsumption || 10, 10), 100);

  const annualGen = size * dailyGenPerKw * 365;
  const lifetimeKwh = Math.round(annualGen * years);

  // Self consumed kWh at average 32c retail
  const selfConsumedKwh = lifetimeKwh * (selfConsRate / 100);
  const exportedKwh = lifetimeKwh * (1 - selfConsRate / 100);

  const avoidedBillCosts = Math.round(selfConsumedKwh * 0.32);
  const feedInEarnings = Math.round(exportedKwh * 0.08); // average historical FIT
  const totalLifetimeBenefit = avoidedBillCosts + feedInEarnings;

  // Rough estimate of system purchase cost back then: ~$950/kW
  const estimatedInitialCost = Math.round(size * 950);
  const netProfit = Math.max(0, totalLifetimeBenefit - estimatedInitialCost);

  const resetDefaults = () => {
    setYearsInstalled(5);
    setSystemSize(5.0);
    setSelfConsumption(60);
  };

  const yearPresets = [2, 5, 8, 12];
  const sizePresets = [3.0, 5.0, 6.6, 10.0];
  const consumptionPresets = [
    { label: '30% (Mostly away)', value: 30 },
    { label: '60% (Moderate use)', value: 60 },
    { label: '85% (WFH / Pool / EV)', value: 85 },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="p-4 sm:p-6 lg:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
        
        {/* Simple & Premium Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 sm:pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-950 tracking-tight">
              Calculate Your Historical Solar Savings
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Audit the lifetime generation, avoided grid power costs, and cumulative return on investment from your rooftop solar.
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

        {/* 2-Column Normal & Premium Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pt-6 items-start">
          
          {/* Left: Interactive Simple Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            
            {/* 1. Years Installed */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <label className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>How Long Has System Been Installed?</span>
                </label>
                <div className="relative flex items-center shrink-0">
                  <input
                    type="number"
                    min="1"
                    max="18"
                    step="1"
                    value={yearsInstalled === 0 ? '' : yearsInstalled}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : Number(e.target.value);
                      setYearsInstalled(val);
                    }}
                    placeholder="5"
                    className="w-20 sm:w-24 px-2 sm:px-3 py-1 text-sm sm:text-base font-bold text-amber-700 bg-amber-50 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-center shadow-2xs"
                  />
                  <span className="ml-1.5 sm:ml-2 text-xs font-semibold text-slate-500">Years</span>
                </div>
              </div>
              
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={Math.min(Math.max(yearsInstalled || 1, 1), 15)}
                onChange={(e) => setYearsInstalled(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2.5">
                <span className="text-[11px] text-slate-400 font-medium mr-1">Quick select:</span>
                {yearPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setYearsInstalled(preset)}
                    className={`text-xs px-2 sm:px-2.5 py-1 rounded-md border font-medium transition-colors cursor-pointer ${
                      yearsInstalled === preset
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {preset} {preset === 1 ? 'Year' : 'Years'}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. System Size (kW) */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <label className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Solar System Capacity</span>
                </label>
                <div className="relative flex items-center shrink-0">
                  <input
                    type="number"
                    min="1.0"
                    max="20.0"
                    step="0.5"
                    value={systemSize === 0 ? '' : systemSize}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : Number(e.target.value);
                      setSystemSize(val);
                    }}
                    placeholder="5.0"
                    className="w-20 sm:w-24 px-2 sm:px-3 py-1 text-sm sm:text-base font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-center shadow-2xs"
                  />
                  <span className="ml-1.5 sm:ml-2 text-xs font-semibold text-slate-500">kW</span>
                </div>
              </div>
              
              <input
                type="range"
                min="1.5"
                max="15.0"
                step="0.5"
                value={Math.min(Math.max(systemSize || 1.5, 1.5), 15.0)}
                onChange={(e) => setSystemSize(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2.5">
                <span className="text-[11px] text-slate-400 font-medium mr-1">Quick select:</span>
                {sizePresets.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSystemSize(size)}
                    className={`text-xs px-2 sm:px-2.5 py-1 rounded-md border font-medium transition-colors cursor-pointer ${
                      systemSize === size
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {size.toFixed(1)} kW
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Daytime Self-Consumption */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <label className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Daytime Self-Consumption Rate</span>
                </label>
                <div className="relative flex items-center shrink-0">
                  <input
                    type="number"
                    min="10"
                    max="100"
                    step="5"
                    value={selfConsumption === 0 ? '' : selfConsumption}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : Number(e.target.value);
                      setSelfConsumption(val);
                    }}
                    placeholder="60"
                    className="w-20 sm:w-24 px-2 sm:px-3 py-1 text-sm sm:text-base font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center shadow-2xs"
                  />
                  <span className="ml-1.5 sm:ml-2 text-xs font-semibold text-slate-500">%</span>
                </div>
              </div>
              
              <input
                type="range"
                min="20"
                max="90"
                step="5"
                value={Math.min(Math.max(selfConsumption || 20, 20), 90)}
                onChange={(e) => setSelfConsumption(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2.5">
                <span className="text-[11px] text-slate-400 font-medium mr-1">Quick select:</span>
                {consumptionPresets.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setSelfConsumption(preset.value)}
                    className={`text-xs px-2 sm:px-2.5 py-1 rounded-md border font-medium transition-colors cursor-pointer ${
                      selfConsumption === preset.value
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Clean, Premium Results Panel (5 cols) */}
          <div className="lg:col-span-5 bg-slate-50 rounded-xl border border-slate-200/80 p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Historical Audit
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                ~{lifetimeKwh.toLocaleString()} kWh Produced
              </span>
            </div>

            {/* Primary Highlight Card */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
              <span className="text-[11px] sm:text-xs font-medium text-amber-800 uppercase tracking-wider block">
                Total Solar Financial Benefit
              </span>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-amber-700 mt-1">
                ${totalLifetimeBenefit.toLocaleString()}
              </div>
              <p className="text-[11px] sm:text-xs text-amber-800/80 font-medium mt-1">
                Avoided power bills + ${feedInEarnings.toLocaleString()} feed-in credits
              </p>
            </div>

            {/* Secondary Metric Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              
              <div className="p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 block">Avoided Peak Bills</span>
                <span className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 block">
                  ${avoidedBillCosts.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400">Daytime self-use</span>
              </div>

              <div className="p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 block">Net Lifetime Return</span>
                <span className="text-base sm:text-lg font-bold text-emerald-600 mt-0.5 block">
                  +${netProfit.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400">After amortisation</span>
              </div>

              <div className="col-span-full p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 block">Annual Clean Generation</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    ~{Math.round(annualGen).toLocaleString()} kWh / Year Clean Output
                  </span>
                </div>
                <Sun className="w-5 h-5 text-amber-500 shrink-0" />
              </div>

            </div>

            {/* CTA Action */}
            <div className="pt-2">
              <Button
                to="/get-started/free-assessment"
                variant="primary"
                size="md"
                fullWidth
                icon={<ArrowRight className="w-4 h-4" />}
                className="justify-center text-center text-xs sm:text-sm"
              >
                Book an Existing System Health Check
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default SavingsSoFarCalcSection;

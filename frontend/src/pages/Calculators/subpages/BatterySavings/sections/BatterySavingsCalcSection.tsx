import React, { useState } from 'react';
import { Moon, DollarSign, RotateCcw, ArrowRight, BatteryCharging, Zap } from 'lucide-react';
import { Button } from '../../../../../components/ui/Button';

export const BatterySavingsCalcSection: React.FC = () => {
  const [eveningKwh, setEveningKwh] = useState<number>(14);
  const [peakTariff, setPeakTariff] = useState<number>(38); // cents per kWh
  const [batterySize, setBatterySize] = useState<number>(13.5); // kWh

  /* Calculation logic */
  const dailyOffsetKwh = Math.min(eveningKwh || 1, batterySize * 0.92); // 92% usable round-trip efficiency
  const dailySavings = (dailyOffsetKwh * ((peakTariff || 30) / 100)) - (dailyOffsetKwh * 0.06); // minus lost 6c feed-in
  const annualSavings = Math.max(1, Math.round(dailySavings * 365));
  const quarterlySavings = Math.round(annualSavings / 4);
  const tenYearSavings = Math.round(annualSavings * 10 * 1.03); // factoring 3% annual power inflation

  const resetDefaults = () => {
    setEveningKwh(14);
    setPeakTariff(38);
    setBatterySize(13.5);
  };

  const eveningPresets = [
    { label: '6 kWh (Low)', value: 6 },
    { label: '14 kWh (Average)', value: 14 },
    { label: '22 kWh (High + A/C)', value: 22 },
  ];

  const tariffPresets = [
    { label: '30¢ (Flat/Off-Peak)', value: 30 },
    { label: '38¢ (Standard Peak)', value: 38 },
    { label: '48¢ (Summer Peak)', value: 48 },
  ];

  const batteryModels = [
    { size: 9.6, name: '9.6 kWh', model: 'Sungrow SBR', sub: 'Modular & Efficient' },
    { size: 13.5, name: '13.5 kWh', model: 'Tesla Powerwall 3', sub: 'Whole Home Backup' },
    { size: 20.0, name: '20.0 kWh', model: 'Dual Stack Modular', sub: 'High Capacity Draw' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="p-4 sm:p-6 lg:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
        
        {/* Simple & Premium Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 sm:pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-950 tracking-tight">
              Calculate Your Home Battery Savings
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Model how storing excess daytime solar generation eliminates expensive peak evening grid electricity.
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
            
            {/* 1. Evening Power Usage */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <label className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                  <Moon className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Evening Power Usage (5 PM – 10 PM)</span>
                </label>
                <div className="relative flex items-center shrink-0">
                  <input
                    type="number"
                    min="4"
                    max="40"
                    step="1"
                    value={eveningKwh === 0 ? '' : eveningKwh}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : Number(e.target.value);
                      setEveningKwh(val);
                    }}
                    placeholder="14"
                    className="w-20 sm:w-24 px-2 sm:px-3 py-1 text-sm sm:text-base font-bold text-amber-700 bg-amber-50 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-center shadow-2xs"
                  />
                  <span className="ml-1.5 sm:ml-2 text-xs font-semibold text-slate-500">kWh</span>
                </div>
              </div>
              
              <input
                type="range"
                min="4"
                max="30"
                step="1"
                value={Math.min(Math.max(eveningKwh || 4, 4), 30)}
                onChange={(e) => setEveningKwh(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2.5">
                <span className="text-[11px] text-slate-400 font-medium mr-1">Quick select:</span>
                {eveningPresets.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setEveningKwh(preset.value)}
                    className={`text-xs px-2 sm:px-2.5 py-1 rounded-md border font-medium transition-colors cursor-pointer ${
                      eveningKwh === preset.value
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Retail Peak Tariff */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <label className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Retailer's Peak Tariff</span>
                </label>
                <div className="relative flex items-center shrink-0">
                  <input
                    type="number"
                    min="20"
                    max="65"
                    step="1"
                    value={peakTariff === 0 ? '' : peakTariff}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : Number(e.target.value);
                      setPeakTariff(val);
                    }}
                    placeholder="38"
                    className="w-20 sm:w-24 px-2 sm:px-3 py-1 text-sm sm:text-base font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center shadow-2xs"
                  />
                  <span className="ml-1.5 sm:ml-2 text-xs font-semibold text-slate-500">¢/kWh</span>
                </div>
              </div>
              
              <input
                type="range"
                min="25"
                max="55"
                step="1"
                value={Math.min(Math.max(peakTariff || 25, 25), 55)}
                onChange={(e) => setPeakTariff(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2.5">
                <span className="text-[11px] text-slate-400 font-medium mr-1">Quick select:</span>
                {tariffPresets.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setPeakTariff(preset.value)}
                    className={`text-xs px-2 sm:px-2.5 py-1 rounded-md border font-medium transition-colors cursor-pointer ${
                      peakTariff === preset.value
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Battery Storage Capacity Model */}
            <div>
              <label className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-1.5 mb-2">
                <BatteryCharging className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Select Battery Capacity Model</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {batteryModels.map((item) => (
                  <button
                    key={item.size}
                    type="button"
                    onClick={() => setBatterySize(item.size)}
                    className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      batterySize === item.size
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-extrabold block">{item.name}</span>
                    <span className={`text-[11px] sm:text-xs font-semibold block mt-0.5 ${
                      batterySize === item.size ? 'text-emerald-100' : 'text-slate-900'
                    }`}>
                      {item.model}
                    </span>
                    <span className={`text-[10px] block mt-1 ${
                      batterySize === item.size ? 'text-emerald-200' : 'text-slate-400'
                    }`}>
                      {item.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Clean, Premium Results Panel (5 cols) */}
          <div className="lg:col-span-5 bg-slate-50 rounded-xl border border-slate-200/80 p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Financial Offset
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                ~94% Peak Self-Powered
              </span>
            </div>

            {/* Primary Highlight Card */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
              <span className="text-[11px] sm:text-xs font-medium text-amber-800 uppercase tracking-wider block">
                Estimated Annual Battery Savings
              </span>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-amber-700 mt-1">
                ${annualSavings.toLocaleString()}
                <span className="text-sm sm:text-base font-sans font-semibold text-amber-600"> / yr</span>
              </div>
              <p className="text-[11px] sm:text-xs text-amber-700/80 mt-1">
                Avoids approximately ${quarterlySavings.toLocaleString()} on each quarterly power bill
              </p>
            </div>

            {/* Secondary Metric Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              
              <div className="p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 block">Daily Peak Avoided</span>
                <span className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 block">
                  {dailyOffsetKwh.toFixed(1)} kWh
                </span>
                <span className="text-[10px] text-slate-400">Daytime stored</span>
              </div>

              <div className="p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 block">10-Year Cumulative</span>
                <span className="text-base sm:text-lg font-bold text-emerald-600 mt-0.5 block">
                  ${tenYearSavings.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400">10-yr lifespan</span>
              </div>

              <div className="col-span-full p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 block">Self-Consumption Rate</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900">Near-Total Evening Peak Offset</span>
                </div>
                <Zap className="w-5 h-5 text-amber-500 shrink-0" />
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
                Get Battery Proposal & Claim Rebate
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default BatterySavingsCalcSection;

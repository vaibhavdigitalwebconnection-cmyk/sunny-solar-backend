import React, { useState } from 'react';
import { Clock, Wind, Zap, ShieldCheck, ArrowRight, RotateCcw, BatteryCharging } from 'lucide-react';
import { Button } from '../../../../../components/ui/Button';

export const BatterySizeCalcSection: React.FC = () => {
  const [nightHours, setNightHours] = useState<number>(6);
  const [eveningAc, setEveningAc] = useState<boolean>(true);
  const [cookingType, setCookingType] = useState<'electric' | 'gas'>('electric');
  const [backupGoal, setBackupGoal] = useState<'whole' | 'essential'>('whole');

  /* Calculation logic */
  let nighttimeDrawKwh = (nightHours || 4) * 1.2; // base background draw (fridge, TV, lights, wifi)
  if (eveningAc) nighttimeDrawKwh += 7.0; // running ducted/split A/C
  if (cookingType === 'electric') nighttimeDrawKwh += 2.5;
  if (backupGoal === 'whole') nighttimeDrawKwh *= 1.15; // safety buffer

  let recommendedKwh = '9.6 kWh – 10 kWh';
  let recommendedModel = 'Sungrow SBR096 Modular';
  if (nighttimeDrawKwh > 11.5 && nighttimeDrawKwh <= 16.0) {
    recommendedKwh = '13.5 kWh';
    recommendedModel = 'Tesla Powerwall 3';
  } else if (nighttimeDrawKwh > 16.0) {
    recommendedKwh = '19.2 kWh – 25.6 kWh';
    recommendedModel = 'Dual Tesla Powerwall 3 or Sungrow Modular';
  }

  const resetDefaults = () => {
    setNightHours(6);
    setEveningAc(true);
    setCookingType('electric');
    setBackupGoal('whole');
  };

  const hourPresets = [
    { label: '4 Hours', value: 4 },
    { label: '6 Hours (Standard)', value: 6 },
    { label: '8 Hours (Extended)', value: 8 },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="p-4 sm:p-6 lg:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 sm:pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-950 tracking-tight">
              Calculate Your Ideal Battery Size
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Specify your household evening appliances and blackout backup needs to find the perfect battery capacity.
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
            
            {/* 1. Active Evening Hours */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <label className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Active Evening Hours (5 PM – Bedtime)</span>
                </label>
                <div className="relative flex items-center shrink-0">
                  <input
                    type="number"
                    min="2"
                    max="10"
                    step="1"
                    value={nightHours === 0 ? '' : nightHours}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : Number(e.target.value);
                      setNightHours(val);
                    }}
                    placeholder="6"
                    className="w-20 sm:w-24 px-2 sm:px-3 py-1 text-sm sm:text-base font-bold text-amber-700 bg-amber-50 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-center shadow-2xs"
                  />
                  <span className="ml-1.5 sm:ml-2 text-xs font-semibold text-slate-500">Hours</span>
                </div>
              </div>
              
              <input
                type="range"
                min="3"
                max="10"
                step="1"
                value={Math.min(Math.max(nightHours || 3, 3), 10)}
                onChange={(e) => setNightHours(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2.5">
                <span className="text-[11px] text-slate-400 font-medium mr-1">Quick select:</span>
                {hourPresets.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setNightHours(preset.value)}
                    className={`text-xs px-2 sm:px-2.5 py-1 rounded-md border font-medium transition-colors cursor-pointer ${
                      nightHours === preset.value
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Evening Air Conditioning */}
            <div>
              <label className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-1.5 mb-2">
                <Wind className="w-4 h-4 text-sky-500 shrink-0" />
                <span>Do you run A/C in the evening (5 PM – 11 PM)?</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setEveningAc(true)}
                  className={`p-3 sm:p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    eveningAc
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs font-bold block">Yes, Run A/C</span>
                  <span className={`text-[10px] block mt-0.5 ${eveningAc ? 'text-amber-100' : 'text-slate-400'}`}>
                    Ducted or Split systems (+7 kWh)
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setEveningAc(false)}
                  className={`p-3 sm:p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    !eveningAc
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs font-bold block">No A/C</span>
                  <span className={`text-[10px] block mt-0.5 ${!eveningAc ? 'text-amber-100' : 'text-slate-400'}`}>
                    Ceiling fans only
                  </span>
                </button>
              </div>
            </div>

            {/* 3. Kitchen Cooking Type */}
            <div>
              <label className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-1.5 mb-2">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Kitchen Cooktop & Oven Type</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setCookingType('electric')}
                  className={`p-3 sm:p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    cookingType === 'electric'
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs font-bold block">Electric / Induction</span>
                  <span className={`text-[10px] block mt-0.5 ${cookingType === 'electric' ? 'text-amber-100' : 'text-slate-400'}`}>
                    Cooktop & electric oven (+2.5 kWh)
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setCookingType('gas')}
                  className={`p-3 sm:p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    cookingType === 'gas'
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs font-bold block">Gas Cooking</span>
                  <span className={`text-[10px] block mt-0.5 ${cookingType === 'gas' ? 'text-amber-100' : 'text-slate-400'}`}>
                    Gas stove / minimal draw
                  </span>
                </button>
              </div>
            </div>

            {/* 4. Blackout Backup Preference */}
            <div>
              <label className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-1.5 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Blackout Backup Preference</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setBackupGoal('whole')}
                  className={`p-3 sm:p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    backupGoal === 'whole'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs font-bold block">Whole-Home Backup</span>
                  <span className={`text-[10px] block mt-0.5 ${backupGoal === 'whole' ? 'text-emerald-100' : 'text-slate-400'}`}>
                    Automatic switchover for entire home
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setBackupGoal('essential')}
                  className={`p-3 sm:p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    backupGoal === 'essential'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs font-bold block">Essential Circuits</span>
                  <span className={`text-[10px] block mt-0.5 ${backupGoal === 'essential' ? 'text-emerald-100' : 'text-slate-400'}`}>
                    Fridge, lights, WiFi, select sockets
                  </span>
                </button>
              </div>
            </div>

          </div>

          {/* Right: Clean, Premium Results Panel (5 cols) */}
          <div className="lg:col-span-5 bg-slate-50 rounded-xl border border-slate-200/80 p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Capacity Recommendation
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                ~{nighttimeDrawKwh.toFixed(1)} kWh Evening Draw
              </span>
            </div>

            {/* Primary Highlight Card */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
              <span className="text-[11px] sm:text-xs font-medium text-amber-800 uppercase tracking-wider block">
                Recommended Battery Capacity
              </span>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-amber-700 mt-1">
                {recommendedKwh}
              </div>
              <p className="text-[11px] sm:text-xs text-amber-800/80 font-medium mt-1">
                {recommendedModel}
              </p>
            </div>

            {/* Secondary Metric Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              
              <div className="p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 block">Outage Runtime</span>
                <span className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 block">
                  {backupGoal === 'whole' ? '18 – 24 Hrs' : '36 – 48 Hrs'}
                </span>
                <span className="text-[10px] text-slate-400">Refills via solar</span>
              </div>

              <div className="p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 block">Min. Solar Array</span>
                <span className="text-base sm:text-lg font-bold text-emerald-600 mt-0.5 block">
                  8.8 – 10.0 kW
                </span>
                <span className="text-[10px] text-slate-400">For winter refill</span>
              </div>

              <div className="col-span-full p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 block">Battery Chemistry</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">Cobalt-Free LFP Lithium (10-Yr Warranty)</span>
                </div>
                <BatteryCharging className="w-5 h-5 text-emerald-600 shrink-0" />
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
                Get Custom Battery Sizing & Quote
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default BatterySizeCalcSection;

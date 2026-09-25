import React, { useState } from 'react';
import { DollarSign, Zap, RotateCcw, ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '../../../../../components/ui/Button';

export const PaybackCalcSection: React.FC = () => {
  const [systemCost, setSystemCost] = useState<number>(6800);
  const [currentQuarterlyBill, setCurrentQuarterlyBill] = useState<number>(850);
  const [stcRebateDeducted, setStcRebateDeducted] = useState<boolean>(true);

  /* Calculation logic */
  const effectiveCost = stcRebateDeducted ? systemCost : systemCost + 2800;
  const annualSavings = Math.max(1, Math.round((currentQuarterlyBill || 0) * 4 * 0.72));
  const paybackYears = (effectiveCost / annualSavings).toFixed(1);
  const paybackMonths = Math.round(Number(paybackYears) * 12);
  const tenYearProfit = Math.round(annualSavings * 10 - effectiveCost);
  const tenYearROI = Math.round((tenYearProfit / (effectiveCost || 1)) * 100);

  const resetDefaults = () => {
    setSystemCost(6800);
    setCurrentQuarterlyBill(850);
    setStcRebateDeducted(true);
  };

  const costPresets = [
    { label: '$4,500 (6.6kW)', value: 4500 },
    { label: '$6,800 (10kW)', value: 6800 },
    { label: '$11,500 (Solar+Battery)', value: 11500 },
  ];

  const billPresets = [500, 850, 1200, 1800];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="p-4 sm:p-6 lg:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 sm:pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-950 tracking-tight">
              Calculate Your Solar Payback & ROI
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Compare your upfront net system investment against your ongoing power bill savings to forecast your break-even timeline.
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
          
          {/* Left: Simple Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            
            {/* 1. System Cost Input & Slider */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <label className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Estimated Net System Price</span>
                </label>
                <div className="relative flex items-center shrink-0">
                  <span className="absolute left-2.5 sm:left-3 text-amber-700 font-bold text-xs sm:text-sm pointer-events-none">$</span>
                  <input
                    type="number"
                    min="2000"
                    max="30000"
                    step="100"
                    value={systemCost === 0 ? '' : systemCost}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : Number(e.target.value);
                      setSystemCost(val);
                    }}
                    placeholder="6800"
                    className="w-24 sm:w-36 pl-6 sm:pl-7 pr-2.5 sm:pr-3 py-1 text-sm sm:text-base font-bold text-amber-700 bg-amber-50 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-right shadow-2xs"
                  />
                </div>
              </div>
              
              <input
                type="range"
                min="3500"
                max="18000"
                step="100"
                value={Math.min(Math.max(systemCost || 3500, 3500), 18000)}
                onChange={(e) => setSystemCost(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2.5">
                <span className="text-[11px] text-slate-400 font-medium mr-1">Quick select:</span>
                {costPresets.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setSystemCost(preset.value)}
                    className={`text-xs px-2 sm:px-2.5 py-1 rounded-md border font-medium transition-colors cursor-pointer ${
                      systemCost === preset.value
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Quarterly Bill Input & Slider */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <label className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Current Quarterly Bill</span>
                </label>
                <div className="relative flex items-center shrink-0">
                  <span className="absolute left-2.5 sm:left-3 text-slate-700 font-bold text-xs sm:text-sm pointer-events-none">$</span>
                  <input
                    type="number"
                    min="100"
                    max="5000"
                    step="25"
                    value={currentQuarterlyBill === 0 ? '' : currentQuarterlyBill}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : Number(e.target.value);
                      setCurrentQuarterlyBill(val);
                    }}
                    placeholder="850"
                    className="w-24 sm:w-32 pl-6 sm:pl-7 pr-2.5 sm:pr-3 py-1 text-sm sm:text-base font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-right shadow-2xs"
                  />
                </div>
              </div>
              
              <input
                type="range"
                min="300"
                max="2500"
                step="50"
                value={Math.min(Math.max(currentQuarterlyBill || 300, 300), 2500)}
                onChange={(e) => setCurrentQuarterlyBill(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2.5">
                <span className="text-[11px] text-slate-400 font-medium mr-1">Quick select:</span>
                {billPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setCurrentQuarterlyBill(preset)}
                    className={`text-xs px-2 sm:px-2.5 py-1 rounded-md border font-medium transition-colors cursor-pointer ${
                      currentQuarterlyBill === preset
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    ${preset}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. STC Rebate Subsidy Checkbox */}
            <div>
              <label className="flex items-start sm:items-center gap-2.5 sm:gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={stcRebateDeducted}
                  onChange={(e) => setStcRebateDeducted(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer mt-0.5 sm:mt-0 shrink-0"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-900 block">
                    Federal STC Point-of-Sale Subsidy Applied (~$2,800)
                  </span>
                  <span className="text-slate-500 text-[11px] sm:text-xs">
                    Sunny Solar deducts this federal solar incentive directly from your initial invoice
                  </span>
                </div>
              </label>
            </div>

          </div>

          {/* Right: Results (5 cols) */}
          <div className="lg:col-span-5 bg-slate-50 rounded-xl border border-slate-200/80 p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Financial Summary
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                ~{paybackMonths} Months Payback
              </span>
            </div>

            {/* Primary Hero Stat Card */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
              <span className="text-[11px] sm:text-xs font-medium text-amber-800 uppercase tracking-wider block">
                Estimated Payback Period
              </span>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-amber-700 mt-1">
                {paybackYears} Years
              </div>
              <p className="text-[11px] sm:text-xs text-amber-700/80 mt-1">
                Full return on net outlay in approximately {paybackMonths} months
              </p>
            </div>

            {/* Secondary Stat Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              
              <div className="p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 block">Annual Bill Savings</span>
                <span className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 block">
                  ${annualSavings.toLocaleString()} / yr
                </span>
                <span className="text-[10px] text-slate-400">Avoided power</span>
              </div>

              <div className="p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 block">10-Year ROI</span>
                <span className="text-base sm:text-lg font-bold text-emerald-600 mt-0.5 block">
                  +{tenYearROI}% ROI
                </span>
                <span className="text-[10px] text-slate-400">Tax-free return</span>
              </div>

              <div className="col-span-full p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 block">Estimated 10-Year Net Profit</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    ${tenYearProfit > 0 ? tenYearProfit.toLocaleString() : 0} in Savings
                  </span>
                </div>
                <TrendingUp className="w-5 h-5 text-emerald-600 shrink-0" />
              </div>

            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Button
                to="/get-started/free-assessment"
                variant="primary"
                size="md"
                fullWidth
                icon={<ArrowRight className="w-4 h-4" />}
                className="justify-center text-center text-xs sm:text-sm"
              >
                Get a Detailed ROI & Payback Audit
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default PaybackCalcSection;

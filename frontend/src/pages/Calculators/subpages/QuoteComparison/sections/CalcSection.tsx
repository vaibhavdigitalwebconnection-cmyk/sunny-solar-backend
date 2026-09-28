import React, { useState } from 'react';
import { DollarSign, Layers, RotateCcw, ArrowRight, Award } from 'lucide-react';
import { Button } from '../../../../../components/ui/Button';

export const QuoteComparisonCalcSection: React.FC = () => {
  const [quotePrice, setQuotePrice] = useState<number>(5500);
  const [systemKw, setSystemKw] = useState<number>(6.6);
  const [hasEuropeanInverter, setHasEuropeanInverter] = useState<boolean>(true);
  const [hasInHouseInstallers, setHasInHouseInstallers] = useState<boolean>(true);
  const [hasLongWarranty, setHasLongWarranty] = useState<boolean>(true);

  /* Calculation */
  const kw = Math.max(systemKw || 1, 0.5);
  const price = Math.max(quotePrice || 0, 0);
  const pricePerWattNum = price / (kw * 1000);
  const pricePerWatt = pricePerWattNum.toFixed(2);
  
  let score = 85;
  let verdict = 'Fair & Competitive Market Value';

  if (pricePerWattNum < 0.70) {
    verdict = 'Warning: Abnormally Low (Risk of Cheap Hardware / Subbies)';
    score = 58;
  } else if (pricePerWattNum > 1.35) {
    verdict = 'Caution: Significantly Overpriced (High Sales Margin)';
    score = 68;
  } else {
    let bonus = 0;
    if (hasEuropeanInverter) bonus += 5;
    if (hasInHouseInstallers) bonus += 5;
    if (hasLongWarranty) bonus += 4;
    score = Math.min(98, 84 + bonus);
    verdict = score >= 90 ? 'Outstanding Tier-1 Quality & Value Proposal' : 'Competitive & Balanced Quotation';
  }

  const resetDefaults = () => {
    setQuotePrice(5500);
    setSystemKw(6.6);
    setHasEuropeanInverter(true);
    setHasInHouseInstallers(true);
    setHasLongWarranty(true);
  };

  const pricePresets = [
    { label: '$4,500 (Budget)', value: 4500 },
    { label: '$5,500 (Typical 6.6kW)', value: 5500 },
    { label: '$8,500 (10kW Premium)', value: 8500 },
    { label: '$12,500 (Solar+Battery)', value: 12500 },
  ];

  const sizePresets = [5.0, 6.6, 8.8, 10.0, 13.2];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="p-4 sm:p-6 lg:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
        
        {/* Simple & Premium Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 sm:pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-950 tracking-tight">
              Benchmark & Compare Your Solar Quote
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Input the line-item specs from any competitor quote to evaluate price-per-watt value, equipment tier, and contractor risk.
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
            
            {/* 1. Total Quoted Price */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <label className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Total Quoted Price (After STC)</span>
                </label>
                <div className="relative flex items-center shrink-0">
                  <span className="absolute left-2.5 sm:left-3 text-amber-700 font-bold text-xs sm:text-sm pointer-events-none">$</span>
                  <input
                    type="number"
                    min="2500"
                    max="25000"
                    step="100"
                    value={quotePrice === 0 ? '' : quotePrice}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : Number(e.target.value);
                      setQuotePrice(val);
                    }}
                    placeholder="5500"
                    className="w-24 sm:w-32 pl-6 sm:pl-7 pr-2.5 sm:pr-3 py-1 text-sm sm:text-base font-bold text-amber-700 bg-amber-50 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-right shadow-2xs"
                  />
                </div>
              </div>
              
              <input
                type="range"
                min="3000"
                max="18000"
                step="100"
                value={Math.min(Math.max(quotePrice || 3000, 3000), 18000)}
                onChange={(e) => setQuotePrice(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2.5">
                <span className="text-[11px] text-slate-400 font-medium mr-1">Quick select:</span>
                {pricePresets.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setQuotePrice(preset.value)}
                    className={`text-xs px-2 sm:px-2.5 py-1 rounded-md border font-medium transition-colors cursor-pointer ${
                      quotePrice === preset.value
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. System Size (kW) */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <label className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Total System Size</span>
                </label>
                <div className="relative flex items-center shrink-0">
                  <input
                    type="number"
                    min="3.0"
                    max="20.0"
                    step="0.1"
                    value={systemKw === 0 ? '' : systemKw}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : Number(e.target.value);
                      setSystemKw(val);
                    }}
                    placeholder="6.6"
                    className="w-20 sm:w-24 px-2 sm:px-3 py-1 text-sm sm:text-base font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-center shadow-2xs"
                  />
                  <span className="ml-1.5 sm:ml-2 text-xs font-semibold text-slate-500">kW</span>
                </div>
              </div>
              
              <input
                type="range"
                min="3.0"
                max="16.0"
                step="0.2"
                value={Math.min(Math.max(systemKw || 3.0, 3.0), 16.0)}
                onChange={(e) => setSystemKw(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2.5">
                <span className="text-[11px] text-slate-400 font-medium mr-1">Quick select:</span>
                {sizePresets.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSystemKw(size)}
                    className={`text-xs px-2 sm:px-2.5 py-1 rounded-md border font-medium transition-colors cursor-pointer ${
                      systemKw === size
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {size} kW
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Hardware & Labor Checklist */}
            <div className="space-y-2 sm:space-y-2.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-900 block mb-1">
                Hardware Quality & Contractor Standards
              </label>

              <label className="flex items-start sm:items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={hasEuropeanInverter}
                  onChange={(e) => setHasEuropeanInverter(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer mt-0.5 sm:mt-0 shrink-0"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-900 block">
                    Tier-1 Inverter Brand (Fronius, Sungrow, Enphase, SolarEdge)
                  </span>
                  <span className="text-slate-500 text-[11px] sm:text-xs">
                    High reliability, excellent MPPT efficiency, and local Australian warranty backing
                  </span>
                </div>
              </label>

              <label className="flex items-start sm:items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={hasInHouseInstallers}
                  onChange={(e) => setHasInHouseInstallers(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer mt-0.5 sm:mt-0 shrink-0"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-900 block">
                    Company's Own Full-Time Employed Installers
                  </span>
                  <span className="text-slate-500 text-[11px] sm:text-xs">
                    Installed by direct staff with full craftsmanship guarantee, never brokered subcontractors
                  </span>
                </div>
              </label>

              <label className="flex items-start sm:items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={hasLongWarranty}
                  onChange={(e) => setHasLongWarranty(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer mt-0.5 sm:mt-0 shrink-0"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-900 block">
                    25-Year Comprehensive Product & Performance Warranty
                  </span>
                  <span className="text-slate-500 text-[11px] sm:text-xs">
                    Full product replacement coverage from an established manufacturer with Australian office
                  </span>
                </div>
              </label>
            </div>

          </div>

          {/* Right: Clean, Premium Results Panel (5 cols) */}
          <div className="lg:col-span-5 bg-slate-50 rounded-xl border border-slate-200/80 p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Quote Benchmark
              </span>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                score >= 80 
                  ? 'text-emerald-700 bg-emerald-50 border-emerald-200' 
                  : 'text-amber-700 bg-amber-50 border-amber-200'
              }`}>
                Score: {score} / 100
              </span>
            </div>

            {/* Primary Highlight Card */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
              <span className="text-[11px] sm:text-xs font-medium text-amber-800 uppercase tracking-wider block">
                Price Per Watt Benchmark
              </span>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-amber-700 mt-1">
                ${pricePerWatt}
                <span className="text-sm sm:text-base font-sans font-semibold text-amber-600"> / Watt</span>
              </div>
              <p className="text-[11px] sm:text-xs font-medium text-amber-900 mt-1">
                {verdict}
              </p>
            </div>

            {/* Secondary Metric Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              
              <div className="p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 block">Labor & Install Risk</span>
                <span className={`text-sm sm:text-base font-bold mt-0.5 block ${
                  hasInHouseInstallers ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {hasInHouseInstallers ? 'In-House Staff' : 'Subcontracted'}
                </span>
                <span className="text-[10px] text-slate-400">Direct craftsmanship</span>
              </div>

              <div className="p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 block">Hardware Tier</span>
                <span className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 block">
                  {hasEuropeanInverter ? 'Tier-1 Premium' : 'Budget Standard'}
                </span>
                <span className="text-[10px] text-slate-400">Inverter rating</span>
              </div>

              <div className="col-span-full p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 block">Market Benchmark Standard</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    Quality Tier-1 Range: $0.85 – $1.15 / Watt
                  </span>
                </div>
                <Award className="w-5 h-5 text-amber-500 shrink-0" />
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
                Request Free Engineer Quote Audit
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default QuoteComparisonCalcSection;

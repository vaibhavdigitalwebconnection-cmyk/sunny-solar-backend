import React, { useState } from 'react';
import { Home, Layers, Sun, DollarSign, RotateCcw, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../../../../../components/ui/Button';

export const IsSolarRightQuizSection: React.FC = () => {
  const [ownsHome, setOwnsHome] = useState<boolean>(true);
  const [roofType, setRoofType] = useState<string>('tin'); // tin, tile, flat
  const [shading, setShading] = useState<string>('none'); // none, morning, heavy
  const [quarterlySpend, setQuarterlySpend] = useState<number>(650);

  const isEligible = ownsHome === true && shading !== 'heavy' && (quarterlySpend || 0) >= 300;

  const resetDefaults = () => {
    setOwnsHome(true);
    setRoofType('tin');
    setShading('none');
    setQuarterlySpend(650);
  };

  const spendPresets = [350, 650, 1000, 1500];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="p-4 sm:p-6 lg:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
        
        {/* Simple & Premium Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 sm:pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-950 tracking-tight">
              Is Solar Right for Your Home?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Answer a few quick questions about your property ownership, roof condition, and power usage to check your feasibility score.
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
            
            {/* 1. Home Ownership */}
            <div>
              <label className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-1.5 mb-2">
                <Home className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Property Ownership Status</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setOwnsHome(true)}
                  className={`p-3 sm:p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    ownsHome === true
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs font-bold block">Homeowner</span>
                  <span className={`text-[10px] block mt-0.5 ${ownsHome === true ? 'text-amber-100' : 'text-slate-400'}`}>
                    Mortgage or owned outright
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setOwnsHome(false)}
                  className={`p-3 sm:p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    ownsHome === false
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs font-bold block">Renting / Tenant</span>
                  <span className={`text-[10px] block mt-0.5 ${ownsHome === false ? 'text-amber-100' : 'text-slate-400'}`}>
                    Requires landlord approval
                  </span>
                </button>
              </div>
            </div>

            {/* 2. Roof Material */}
            <div>
              <label className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-1.5 mb-2">
                <Layers className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Roof Type & Material</span>
              </label>
              <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 sm:gap-2.5">
                {[
                  { id: 'tin', label: 'Colorbond / Tin', sub: 'Standard metal' },
                  { id: 'tile', label: 'Tile / Slate', sub: 'Concrete / ceramic' },
                  { id: 'flat', label: 'Flat / Klip-Lok', sub: 'Membrane or tilt' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRoofType(item.id)}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      roofType === item.id
                        ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xs font-bold block">{item.label}</span>
                    <span className={`text-[10px] block mt-0.5 ${roofType === item.id ? 'text-amber-100' : 'text-slate-400'}`}>
                      {item.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Tree Shading */}
            <div>
              <label className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-1.5 mb-2">
                <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Sunlight & Shading Conditions</span>
              </label>
              <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 sm:gap-2.5">
                {[
                  { id: 'none', label: 'Full Sun', sub: 'Zero tree shade' },
                  { id: 'morning', label: 'Minor Shade', sub: 'Early / late sun' },
                  { id: 'heavy', label: 'Heavy Canopy', sub: 'Tall nearby trees' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setShading(item.id)}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      shading === item.id
                        ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xs font-bold block">{item.label}</span>
                    <span className={`text-[10px] block mt-0.5 ${shading === item.id ? 'text-amber-100' : 'text-slate-400'}`}>
                      {item.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Quarterly Electricity Spend */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <label className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Average Quarterly Electricity Bill</span>
                </label>
                <div className="relative flex items-center shrink-0">
                  <span className="absolute left-2.5 sm:left-3 text-amber-700 font-bold text-xs sm:text-sm pointer-events-none">$</span>
                  <input
                    type="number"
                    min="150"
                    max="3000"
                    step="25"
                    value={quarterlySpend === 0 ? '' : quarterlySpend}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : Number(e.target.value);
                      setQuarterlySpend(val);
                    }}
                    placeholder="650"
                    className="w-24 sm:w-32 pl-6 sm:pl-7 pr-2.5 sm:pr-3 py-1 text-sm sm:text-base font-bold text-amber-700 bg-amber-50 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-right shadow-2xs"
                  />
                </div>
              </div>
              
              <input
                type="range"
                min="200"
                max="2500"
                step="50"
                value={Math.min(Math.max(quarterlySpend || 200, 200), 2500)}
                onChange={(e) => setQuarterlySpend(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2.5">
                <span className="text-[11px] text-slate-400 font-medium mr-1">Quick select:</span>
                {spendPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setQuarterlySpend(preset)}
                    className={`text-xs px-2 sm:px-2.5 py-1 rounded-md border font-medium transition-colors cursor-pointer ${
                      quarterlySpend === preset
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    ${preset}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Clean, Premium Results Panel (5 cols) */}
          <div className="lg:col-span-5 bg-slate-50 rounded-xl border border-slate-200/80 p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Feasibility Status
              </span>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                isEligible 
                  ? 'text-emerald-700 bg-emerald-50 border-emerald-200' 
                  : 'text-amber-700 bg-amber-50 border-amber-200'
              }`}>
                {isEligible ? 'High Suitability' : 'Special Assessment'}
              </span>
            </div>

            {/* Primary Highlight Card */}
            <div className={`p-3.5 sm:p-4 rounded-xl border text-center ${
              isEligible ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
            }`}>
              <span className={`text-[11px] sm:text-xs font-medium uppercase tracking-wider block ${
                isEligible ? 'text-emerald-800' : 'text-amber-800'
              }`}>
                Property Solar Feasibility
              </span>
              <div className={`text-xl sm:text-2xl md:text-3xl font-serif font-bold mt-1 ${
                isEligible ? 'text-emerald-700' : 'text-amber-700'
              }`}>
                {isEligible ? 'Ideal Solar Candidate' : 'Custom Review Needed'}
              </div>
              <p className={`text-[11px] sm:text-xs mt-1 ${
                isEligible ? 'text-emerald-800/80' : 'text-amber-800/80'
              }`}>
                {isEligible
                  ? 'Your property meets all key benchmarks for high solar returns and Federal STC subsidies.'
                  : ownsHome === false
                  ? 'Tenant status requires landlord agreement before installation.'
                  : 'Heavy tree shade requires Enphase micro-inverters or DC optimizers.'}
              </p>
            </div>

            {/* Secondary Metric Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              
              <div className="p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 block">Federal STC Rebates</span>
                <span className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 block">
                  {isEligible ? 'Eligible (~$2.8k)' : 'Subject to Review'}
                </span>
                <span className="text-[10px] text-slate-400">Point-of-sale deduction</span>
              </div>

              <div className="p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 block">Bill Reduction</span>
                <span className="text-sm sm:text-base font-bold text-emerald-600 mt-0.5 block">
                  {isEligible ? '70% – 85% Cut' : 'Custom Estimate'}
                </span>
                <span className="text-[10px] text-slate-400">Quarterly offset</span>
              </div>

              <div className="col-span-full p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 block">Recommended Architecture</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {shading === 'heavy' ? 'Enphase Micro-Inverters (Optimised)' : 'Tier-1 String Inverter + N-Type Panels'}
                  </span>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
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
                Book Free Satellite Roof Assessment
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default IsSolarRightQuizSection;

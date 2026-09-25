import React from 'react';
import { BatteryCharging, Sun, Zap, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../../../../../components/ui/Button';

export const BatterySizeSolarPairingSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 sm:mt-6 mb-8 sm:mb-12">
      <div className="relative rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-4 sm:p-6 md:p-8 overflow-hidden shadow-xs">
        {/* Ambient lighting */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
          
          {/* Left: Image with Overlaid Sizing Balance Badge */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden shadow-md group">
              <img
                src="/images/solutions/solar-kit.jpg"
                alt="Solar and battery matched sizing hardware"
                className="w-full h-52 xs:h-60 sm:h-72 lg:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

              <div className="absolute top-3 left-3 bg-amber-500/90 text-slate-950 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1.5 shadow-sm">
                <Sun className="w-3.5 h-3.5" />
                <span>Rooftop Solar & Storage Balance</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] sm:text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">Golden Sizing Ratio</span>
                <p className="text-[11px] sm:text-xs font-medium text-slate-100 mt-0.5">
                  Never buy more battery capacity than your solar panels can recharge in winter.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Content - Adding Battery with Solar Sizing Matrix */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-amber-500/10 text-amber-800 border border-amber-500/20 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold">
              <BatteryCharging className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Solar & Battery Capacity Co-Optimization</span>
            </div>

            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              Add Battery with Solar: Why Panel Output Limits Battery Capacity
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              A 13.5 kWh Tesla Powerwall 3 or 9.6 kWh Sungrow battery needs surplus generation after your home's daytime appliances are fed. If you only have 5 kW of solar, your home will consume the power during the day and your battery will remain half empty every afternoon. Our engineers match the kilowatt generation to the kilowatt-hour storage.
            </p>

            {/* Micro pairing guide */}
            <div className="space-y-2 pt-1">
              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>5 kW – 6.6 kW Solar:</strong> Pair with 5 kWh – 9.6 kWh battery (ideal for low-to-medium evening draw).</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>8.8 kW – 10.0 kW Solar:</strong> Perfect pairing for 13.5 kWh Tesla Powerwall 3 (powers full evening A/C).</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>13.2 kW+ Solar:</strong> Sized for modular 19.2 kWh+ arrays or dual Tesla units with whole-home backup.</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Right-sized without overpaying</span>
              </div>
              <Button
                to="/calculators/system-size"
                variant="primary"
                size="sm"
                className="w-full sm:w-auto justify-center text-center"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Check Your Roof Size
              </Button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default BatterySizeSolarPairingSection;

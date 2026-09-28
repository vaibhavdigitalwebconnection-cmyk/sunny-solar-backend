import React from 'react';
import { CloudRain, ArrowRight, Radio, Sun, ShieldCheck } from 'lucide-react';
import { Button } from '../../../../../components/ui/Button';

export const BatteryBackupStormWatchSection: React.FC = () => {
  return (
    <div className="">
      <div className="relative overflow-hidden shadow-2xl bg-slate-950 border border-slate-800 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Mobile Image (< lg: Shown first with live radar pulse badge) */}
          <div className="block lg:hidden relative h-56 xs:h-64 sm:h-72 overflow-hidden">
            <img
              src="/images/solutions/battery-storm.webp"
              alt="Home illuminated during severe thunderstorm blackout"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/30 to-transparent" />
            
            {/* Live Radar Pill on Mobile Image */}
            <div className="absolute top-3 left-3">
              <span className="bg-slate-950/85 backdrop-blur-md text-amber-400 border border-amber-500/30 text-[10px] xs:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                </span>
                BOM Weather Watch Active
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 text-[11px] text-slate-300 bg-slate-950/80 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">Auto-precharges to 100% capacity prior to grid failure</span>
            </div>
          </div>

          {/* Narrative Content Column */}
          <div className="lg:col-span-7 p-5 xs:p-6 sm:p-10 lg:p-12 space-y-4 sm:space-y-5 flex flex-col justify-center">
            <div className="hidden lg:inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider self-start">
              <CloudRain className="w-4 h-4" />
              <span>BOM Radar Weather Watch Integration</span>
            </div>

            <h3 className="text-2xl xs:text-3xl lg:text-4xl font-serif font-bold leading-tight tracking-tight text-white">
              Automated Severe Weather Pre-Charging Mode
            </h3>

            <p className="text-xs xs:text-sm sm:text-base text-slate-300 leading-relaxed">
              When a cyclone, hail squall, or severe thunderstorm warning is issued by the Bureau of Meteorology, our smart battery systems automatically enter emergency standby. The battery halts power export and immediately tops up to 100% capacity from available solar or off-peak grid power before the storm strikes.
            </p>

            {/* 2-Column Responsive Telemetry Tiles */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 pt-1">
              <div className="bg-white/5 p-3 sm:p-3.5 rounded-xl border border-white/10">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white mb-0.5">
                  <Radio className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Live BOM Feed</span>
                </div>
                <div className="text-[10px] xs:text-[11px] text-slate-400">Syncs every 15 minutes</div>
              </div>
              <div className="bg-white/5 p-3 sm:p-3.5 rounded-xl border border-white/10">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white mb-0.5">
                  <Sun className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Black Start Microgrid</span>
                </div>
                <div className="text-[10px] xs:text-[11px] text-slate-400">Daytime solar recharge</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Button
                to="/get-started/free-assessment"
                variant="accent-green"
                size="md"
                fullWidth
                className="font-bold py-3 justify-center sm:w-auto"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Get Storm Resilience Proposal
              </Button>
            </div>
          </div>

          {/* Desktop Image Column (>= lg) */}
          <div className="hidden lg:block lg:col-span-5 relative min-h-85 h-full">
            <img
              src="/images/solutions/battery-storm.webp"
              alt="Home illuminated during severe thunderstorm blackout"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-transparent to-transparent" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default BatteryBackupStormWatchSection;

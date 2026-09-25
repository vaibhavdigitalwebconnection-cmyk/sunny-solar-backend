import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  ArrowRight,
  Phone,
  Sun,
  Zap,
  BatteryCharging,
  Wifi,
  Signal,
  Lock,
  RotateCw,
  Star,
  CheckCircle2,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export const ServicesOverviewSection: React.FC = () => {
  // Live fluctuating solar output simulation to make the mobile display feel alive
  const [solarOutput, setSolarOutput] = useState(8.4);
  const [gridExport, setGridExport] = useState(5.2);

  useEffect(() => {
    const interval = setInterval(() => {
      // Gentle realistic fluctuations between 8.2kW and 8.7kW
      const newOutput = +(8.2 + Math.random() * 0.5).toFixed(1);
      const newExport = +(newOutput - 3.2).toFixed(1);
      setSolarOutput(newOutput);
      setGridExport(newExport);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
      {/* Subtle Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#2B3CB8]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-120 h-120 bg-[#2B3CB8]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Story & Information (order-2 on mobile, order-1 on lg) */}
          <div className="order-2 lg:order-1 lg:col-span-6 space-y-6">
            {/* Eyebrow Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#2B3CB8] bg-[#F5F7FD] border border-[#D1DCF8] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#2B3CB8] animate-pulse" />
              <Sun className="w-3.5 h-3.5 text-[#2B3CB8]" />
              <span>About Sunny Solar • Est. 2011</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl text-center md:text-left font-serif font-bold text-[#18181b] tracking-tight leading-[1.15]">
              Solar Is More Than Panels. <br />
              <span className="text-[#2B3CB8]">
                It’s About Making the Right Energy Decision.
              </span>
            </h2>

            {/* Narrative Story */}
            <div className="space-y-4 text-slate-600 text-justify text-base leading-relaxed">
              <p>
                Solar is a major investment. Sunny Solar believes you should understand your options before you commit.
              </p>
              <p className="text-justify">
                From choosing the right solar system and battery to understanding your savings and existing system performance, we give you practical advice built around your energy needs.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <Button
                to="/about"
                variant="primary"
                size="md"
                className="w-full sm:w-auto rounded-lg shadow-lg shadow-[#2B3CB8]/20 bg-[#d35b0c] hover:bg-[#1D2984] text-white border-0 font-bold px-6 py-3 transition-all duration-300 hover:shadow-[#2B3CB8]/35 hover:-translate-y-0.5"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Your Solar Options
              </Button>

              <a
                href="tel:1300030479"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-sm shadow-lg shadow-[#16a34a]/30 hover:shadow-xl hover:shadow-[#16a34a]/40 border border-[#22c55e]/40 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center text-white">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>Call Us: <span className="font-extrabold text-white">1300 030 479</span></span>
              </a>
            </div>

          </div>

          {/* Right Column: Animated Smartphone Website Mockup (order-1 on mobile, order-2 on lg) */}
          <div className="order-1 lg:order-2 lg:col-span-6 relative flex items-center justify-center py-4 sm:py-6">
            
            {/* Luminous Backdrop Halo Behind Phone */}
            <div className="absolute w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-tr from-[#2B3CB8]/25 via-blue-400/15 to-amber-300/20 rounded-full blur-3xl -z-10 pointer-events-none" />

            {/* Floating Smartphone Container with gentle levitation animation */}
            <motion.div
              animate={{
                y: [-8, 8, -8],
                rotate: [-0.5, 0.5, -0.5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative z-20"
            >
              {/* iPhone 17 Pro Hardware Chassis (Grade 5 Brushed Titanium) */}
              <div className="w-[290px] xs:w-[315px] sm:w-[340px] h-[590px] xs:h-[635px] sm:h-[650px] bg-gradient-to-b from-[#383b42] via-[#202227] to-[#141518] rounded-[54px] p-[8px] sm:p-[9px] shadow-[0_35px_80px_-15px_rgba(0,0,0,0.65),0_15px_35px_-10px_rgba(43,60,184,0.3)] ring-1 ring-white/20 border border-slate-700/60 relative">
                
                {/* Titanium Rim Metallic Sheen */}
                <div className="absolute inset-0 rounded-[53px] bg-gradient-to-tr from-white/10 via-transparent to-white/10 pointer-events-none" />

                {/* Antenna Breaks (Signature iPhone Pro Design) */}
                <div className="absolute -left-[1px] top-20 w-[2px] h-[4px] bg-slate-500/60" />
                <div className="absolute -left-[1px] bottom-20 w-[2px] h-[4px] bg-slate-500/60" />
                <div className="absolute -right-[1px] top-20 w-[2px] h-[4px] bg-slate-500/60" />
                <div className="absolute -right-[1px] bottom-20 w-[2px] h-[4px] bg-slate-500/60" />

                {/* ─── Hardware Physical Buttons (iPhone Pro Specification) ─── */}
                {/* 1. Action Button (Left - Anodized Titanium Pill) */}
                <div className="absolute -left-[4.5px] top-[92px] w-[4.5px] h-[22px] bg-gradient-to-r from-slate-400 to-slate-700 rounded-l-[3px] shadow-sm border-r border-slate-900" title="Action Button" />
                
                {/* 2. Volume Up (Left) */}
                <div className="absolute -left-[4.5px] top-[128px] w-[4.5px] h-[42px] bg-gradient-to-r from-slate-400 to-slate-700 rounded-l-[3px] shadow-sm border-r border-slate-900" />
                
                {/* 3. Volume Down (Left) */}
                <div className="absolute -left-[4.5px] top-[182px] w-[4.5px] h-[42px] bg-gradient-to-r from-slate-400 to-slate-700 rounded-l-[3px] shadow-sm border-r border-slate-900" />

                {/* 4. Side / Siri Power Button (Right) */}
                <div className="absolute -right-[4.5px] top-[124px] w-[4.5px] h-[58px] bg-gradient-to-l from-slate-400 to-slate-700 rounded-r-[3px] shadow-sm border-l border-slate-900" />

                {/* 5. Camera Control Button (iPhone 16/17 Pro Capacitive Sapphire Touch) */}
                <div className="absolute -right-[3.5px] top-[375px] w-[3.5px] h-[46px] bg-gradient-to-l from-slate-500 to-slate-800 rounded-r-[2px] shadow-inner opacity-90" title="Camera Control Button" />

                {/* Inner Screen Display (Super Retina XDR OLED with ultra-thin 1.2mm Pro bezel) */}
                <div className="w-full h-full bg-black rounded-[46px] overflow-hidden flex flex-col relative select-none ring-1 ring-black">
                  
                  {/* Subtle Diagonal Glass Sheen Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent pointer-events-none z-30" />

                  {/* Top Micro Ear-Speaker Slit */}
                  <div className="w-12 h-1 bg-[#121316] rounded-full mx-auto mt-1 z-40" />

                  {/* 1. iOS 18/19 Pro Status Bar with Dynamic Island */}
                  <div className="pt-1.5 px-6 pb-1.5 flex items-center justify-between text-[11px] text-white font-medium z-40 shrink-0">
                    <span className="font-semibold tracking-tight">9:41</span>
                    
                    {/* Authentic iPhone Pro Dynamic Island */}
                    <div className="w-28 sm:w-30 h-6 bg-black rounded-full flex items-center justify-between px-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.9)] border border-white/5 mx-auto relative group">
                      {/* Face ID / TrueDepth Sensor */}
                      <div className="w-2.5 h-2.5 rounded-full bg-[#080914] border border-indigo-950/60 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-indigo-500/30" />
                      </div>
                      
                      {/* Live Privacy Green LED */}
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]" />

                      {/* Front Camera Lens with Sapphire Coating */}
                      <div className="w-2.5 h-2.5 rounded-full bg-[#070b18] border border-blue-950/80 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-blue-400/40" />
                      </div>
                    </div>

                    {/* Cellular, Wi-Fi & Battery Status */}
                    <div className="flex items-center gap-1.5">
                      <Signal className="w-3 h-3 text-white" />
                      <Wifi className="w-3 h-3 text-white" />
                      
                      {/* Pro Battery Capsule */}
                      <div className="flex items-center gap-0.5">
                        <div className="w-5 h-2.5 border border-white/80 rounded-xs p-[1px] flex items-center bg-black/40">
                          <div className="w-full h-full bg-emerald-400 rounded-2xs" />
                        </div>
                        <div className="w-[1px] h-1 bg-white/70 rounded-r-xs" />
                      </div>
                    </div>
                  </div>

                  {/* 2. Mobile Browser Navigation Address Bar (Safari iOS Style) */}
                  <div className="px-3.5 py-1.5 bg-[#1c1c1e] border-b border-[#2c2c2e] flex items-center gap-2 z-20 shrink-0">
                    <div className="flex-1 bg-[#2c2c2e] rounded-xl px-3 py-1 flex items-center justify-between text-[11px] text-slate-300">
                      <span className="text-[10px] text-slate-400 font-serif">aA</span>
                      <div className="flex items-center gap-1.5 truncate">
                        <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                        <span className="font-semibold text-white tracking-tight">sunnysolar.com.au</span>
                      </div>
                      <RotateCw className="w-2.5 h-2.5 text-slate-400 hover:text-white cursor-pointer" />
                    </div>
                  </div>

                  {/* 3. Mobile Website Scrollable Content */}
                  <div className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50 text-slate-900 scrollbar-none flex flex-col">
                    
                    {/* Website Header with Original Sunny Solar Logo */}
                    <div className="px-3.5 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between shrink-0 shadow-2xs">
                      <div className="flex items-center gap-1.5">
                        <img
                          src="/logo.png"
                          alt="Sunny Solar"
                          className="h-6 sm:h-6.5 w-auto object-contain"
                        />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          ● Online
                        </span>
                      </div>
                    </div>

                    {/* Mini Hero Banner */}
                    <div className="relative p-3.5 bg-gradient-to-br from-[#121B59] via-[#2B3CB8] to-[#1E2B8F] text-white overflow-hidden shrink-0">
                      {/* Background Glow */}
                      <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

                      <div className="relative z-10 space-y-1.5">
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/15 border border-white/20 text-[9px] font-semibold text-amber-300">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>Solar & Battery QLD</span>
                        </div>

                        <h3 className="text-sm sm:text-base font-extrabold leading-tight font-serif">
                          Power Your Home With Real Clean Energy.
                        </h3>

                        <p className="text-[10px] text-blue-100/90 leading-tight">
                          Master Electrician designed systems across Gold Coast & Brisbane.
                        </p>
                      </div>
                    </div>

                    {/* Live System Energy Telemetry Card */}
                    <div className="p-3 space-y-2.5 flex-1">
                      
                      {/* Live Production Meter */}
                      <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                              Live Production
                            </span>
                          </div>
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                            100% Self-Powered
                          </span>
                        </div>

                        {/* Digital Kilowatt Readout */}
                        <div className="flex items-baseline justify-between pt-1">
                          <div>
                            <span className="text-2xl font-extrabold text-slate-900 tracking-tight font-mono">
                              {solarOutput}
                            </span>
                            <span className="text-xs font-bold text-[#2B3CB8] ml-1">kW</span>
                          </div>
                          <span className="text-[10px] font-semibold text-slate-500">
                            Peak Sunshine
                          </span>
                        </div>

                        {/* Live Energy Flow Grid */}
                        <div className="grid grid-cols-3 gap-1.5 pt-1 text-center">
                          <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                            <Sun className="w-3.5 h-3.5 mx-auto text-amber-500 mb-0.5" />
                            <div className="text-[9px] font-bold text-slate-800">{solarOutput}kW</div>
                            <div className="text-[8px] text-slate-400">Rooftop</div>
                          </div>

                          <div className="p-1.5 rounded-lg bg-emerald-50/70 border border-emerald-100">
                            <BatteryCharging className="w-3.5 h-3.5 mx-auto text-emerald-600 mb-0.5" />
                            <div className="text-[9px] font-bold text-emerald-700">98%</div>
                            <div className="text-[8px] text-slate-400">Battery</div>
                          </div>

                          <div className="p-1.5 rounded-lg bg-blue-50/70 border border-blue-100">
                            <TrendingUp className="w-3.5 h-3.5 mx-auto text-[#2B3CB8] mb-0.5" />
                            <div className="text-[9px] font-bold text-[#2B3CB8]">+{gridExport}kW</div>
                            <div className="text-[8px] text-slate-400">Export</div>
                          </div>
                        </div>
                      </div>

                      {/* Estimated Savings Badge */}
                      <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-between shadow-xs">
                        <div>
                          <div className="text-[9px] font-semibold text-emerald-100 uppercase">
                            Estimated Annual Savings
                          </div>
                          <div className="text-base font-black tracking-tight">
                            $2,840 / year
                          </div>
                        </div>
                        <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                          <Zap className="w-4 h-4 text-amber-300" />
                        </div>
                      </div>

                      {/* Verified Review Pill */}
                      <div className="p-2 rounded-xl bg-white border border-slate-200/70 shadow-2xs flex items-center gap-2">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-[9px] font-bold text-slate-700">
                          4.98 Rating • 380+ Verified Homes
                        </span>
                      </div>

                      {/* Mini Call-To-Action Button inside phone */}
                      <div className="pt-1">
                        <div className="w-full py-2 rounded-xl bg-[#2B3CB8] text-white text-[11px] font-bold text-center shadow-sm flex items-center justify-center gap-1.5">
                          <span>Get Free Solar Assessment</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>

                    </div>

                    {/* Bottom Home Indicator Bar on screen */}
                    <div className="py-1.5 flex justify-center shrink-0">
                      <div className="w-28 h-1 bg-slate-300 rounded-full" />
                    </div>

                  </div>
                </div>

                {/* Bottom Hardware Bezel Home Bar */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full" />
              </div>
            </motion.div>

            {/* ─── Floating Decorative Glass Badges Orbiting the Phone ─── */}
            
            {/* Top Right Floating Badge: Live Solar Output */}
            <motion.div
              animate={{
                y: [6, -8, 6],
              }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-3 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-xl z-30 hidden xs:flex items-center gap-3 max-w-[210px]"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shrink-0">
                <Sun className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Live Generation
                </div>
                <div className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span>{solarOutput} kW Peak</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
              </div>
            </motion.div>

            {/* Bottom Left Floating Badge: Battery Storage */}
            <motion.div
              animate={{
                y: [-6, 8, -6],
              }}
              transition={{
                duration: 5.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -bottom-4 -left-2 sm:-left-6 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-xl z-30 hidden xs:flex items-center gap-3 max-w-[210px]"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shrink-0">
                <BatteryCharging className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Storage Status
                </div>
                <div className="text-sm font-extrabold text-slate-900">
                  98% Charged
                </div>
              </div>
            </motion.div>

            

          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesOverviewSection;

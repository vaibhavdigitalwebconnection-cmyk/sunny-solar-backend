import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, Phone, Mail, Clock, ArrowRight, ShieldCheck, Sparkles, Home } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Particles } from '../../components/ui/Particles';
import { BlurFade } from '../../components/ui/BlurFade';
import { BorderBeam } from '../../components/ui/BorderBeam';

export const ThankYouPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 overflow-hidden relative">
      <Particles
        className="absolute inset-0 z-0 opacity-60"
        quantity={45}
        color="#2B3CB8"
        size={0.6}
      />
      <Helmet>
        <title>Thank You - Request Received | Sunny Solar</title>
        <meta
          name="description"
          content="Your solar assessment request has been received. Our engineering team is reviewing your roof specs and will be in touch shortly."
        />
      </Helmet>
      {/* Background ambient solar glow */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#2B3CB8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#2B3CB8]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Animated Checkmark Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#E8EDFB] text-[#2B3CB8] shadow-xl shadow-[#2B3CB8]/15 mb-6 border-2 border-[#D1DCF8]">
          <CheckCircle2 className="w-10 h-10 animate-bounce" />
        </div>

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#1D2984] bg-[#F5F7FD] border border-[#D1DCF8] shadow-2xs mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2B3CB8]" />
          <span>Inquiry Successfully Received</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight leading-tight">
          Thank You! We’ve Received Your{' '}
          <span className="bg-linear-to-r from-[#2B3CB8] via-[#4658D9] to-[#6F8EE7] bg-clip-text text-transparent">
            Solar & Battery Request
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Master Electrician Trent Palmer and our engineering team are already reviewing your details. Here is exactly what will happen next:
        </p>

        {/* 3-Step Next Steps Timeline */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          {/* Step 1 */}
          <BlurFade delay={0.1} duration={0.4} className="h-full">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden h-full flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#F5F7FD] border border-[#D1DCF8] text-[#2B3CB8] flex items-center justify-center font-bold text-sm mb-4">
                  01
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1.5 flex items-center gap-2">
                  <span>3D Satellite Roof Audit</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We analyze your roof pitch, orientation, sun hours, and any nearby shading using high-resolution aerial mapping.
                </p>
              </div>
              <span className="inline-block mt-3 text-[11px] font-semibold text-[#1D2984] bg-[#F5F7FD] px-2 py-0.5 rounded-md w-fit">
                Within 2–4 Hours
              </span>
            </div>
          </BlurFade>

          {/* Step 2 */}
          <BlurFade delay={0.2} duration={0.4} className="h-full">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden h-full flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#F5F7FD] border border-[#D1DCF8] text-[#2B3CB8] flex items-center justify-center font-bold text-sm mb-4">
                  02
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1.5 flex items-center gap-2">
                  <span>Fixed-Price Proposal</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You receive an itemized proposal with tier-1 equipment options, expected bill reductions, and verified government rebates.
                </p>
              </div>
              <span className="inline-block mt-3 text-[11px] font-semibold text-[#1D2984] bg-[#F5F7FD] px-2 py-0.5 rounded-md w-fit">
                Same-Day Delivery
              </span>
            </div>
          </BlurFade>

          {/* Step 3 */}
          <BlurFade delay={0.3} duration={0.4} className="h-full">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden h-full flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#F5F7FD] border border-[#D1DCF8] text-[#2B3CB8] flex items-center justify-center font-bold text-sm mb-4">
                  03
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1.5 flex items-center gap-2">
                  <span>Zero-Pressure Advice</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  No high-pressure sales reps. Speak directly with licensed electrical installers to ask any technical or financial questions.
                </p>
              </div>
              <span className="inline-block mt-3 text-[11px] font-semibold text-[#1D2984] bg-[#F5F7FD] px-2 py-0.5 rounded-md w-fit">
                Master Electrician direct
              </span>
            </div>
          </BlurFade>
        </div>

        {/* Immediate Contact Box */}
        <div className="mt-10 bg-linear-to-r from-[#0C123E] via-[#070A24] to-[#0C123E] rounded-2xl p-6 sm:p-8 text-white border border-[#151E64] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-left relative overflow-hidden">
          <BorderBeam size={180} duration={8} colorFrom="#2B3CB8" colorTo="#6F8EE7" borderWidth={1.5} />
          <div>
            <span className="text-xs font-mono font-bold text-[#D1DCF8] uppercase tracking-wider block mb-1">
              Need Immediate Assistance?
            </span>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Speak Directly with Trent Palmer, Lead Electrician
            </h4>
            <p className="text-xs text-slate-400 mt-1 max-w-lg">
              Gold Coast, Brisbane, and Sunshine Coast customer support lines are open Monday–Saturday, 7:00 AM – 5:30 PM.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="tel:1300030479"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-linear-to-r from-[#2B3CB8] to-[#1D2984] hover:from-[#1D2984] hover:to-[#151E64] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#2B3CB8]/25 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>1300 030 479</span>
            </a>
            <a
              href="mailto:info@sunnysolar.com.au"
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs flex items-center justify-center gap-2 border border-white/10 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Email Support</span>
            </a>
          </div>
        </div>

        {/* Return / Explore Links */}
        <div className="mt-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4 text-xs font-semibold">
          <Button
            to="/"
            variant="outline"
            size="md"
            className="w-full sm:w-auto justify-center"
            icon={<Home className="w-4 h-4" />}
          >
            Return to Homepage
          </Button>
          <Button
            to="/projects"
            variant="ghost"
            size="md"
            className="w-full sm:w-auto justify-center"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Completed Case Studies
          </Button>
          <Button
            to="/reviews"
            variant="ghost"
            size="md"
            className="w-full sm:w-auto justify-center"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Read Customer Reviews (4.98★)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;

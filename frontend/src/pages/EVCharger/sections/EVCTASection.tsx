import React from 'react';
import { ArrowRight, Phone, ShieldCheck, Sun, CheckCircle2 } from 'lucide-react';
import { BorderBeam } from '../../../components/ui/BorderBeam';
import { ShimmerButton } from '../../../components/ui/ShimmerButton';
import { Link } from 'react-router-dom';

export const EVCTASection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative rounded-3xl bg-linear-to-br from-[#0C123E] via-[#1D2984] to-[#0C123E] p-8 sm:p-12 lg:p-16 text-white shadow-2xl overflow-hidden border border-blue-900/60">
          <BorderBeam size={250} duration={9} colorFrom="#00FFF1" colorTo="#ED4F11" borderWidth={2} />

          {/* Ambient lighting inside card */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ED4F11]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2B3CB8]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">

            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-cyan-300 bg-white/10 border border-white/20 backdrop-blur-xs">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Drive On Sunshine • Zero Emissions</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl xs:text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15]">
              Ready to Turn Your Rooftop Solar Into Your{' '}
              <span className="bg-linear-to-r from-amber-300 via-cyan-300 to-[#ED4F11] bg-clip-text text-transparent">
                Private Fuel Station?
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto">
              Get an upfront, transparent quote on a smart Level 2 home EV charger. Certified switchboard assessment, zero hidden fees, and full Clean Energy Council accreditation.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
              <Link to="/get-started/free-assessment" className="w-full sm:w-auto">
                <ShimmerButton
                  background="linear-gradient(135deg, #ED4F11 0%, #D84107 100%)"
                  shimmerColor="#ffffff"
                  shimmerDuration="2s"
                  className="w-full sm:w-auto px-8 py-4 text-base font-bold shadow-xl shadow-[#ED4F11]/30 cursor-pointer"
                >
                  <span>Request Free EV Charger Quote</span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </ShimmerButton>
              </Link>

              <a
                href="tel:1300030479"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xs transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#ED4F11]" />
                <span>Call 1300 030 479</span>
              </a>
            </div>

            {/* Trust points */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                No Deposit Required for Quote
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-300" />
                5-Year Hardware Warranty
              </span>
              <span className="flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-400" />
                Solar-Surplus Guaranteed
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default EVCTASection;

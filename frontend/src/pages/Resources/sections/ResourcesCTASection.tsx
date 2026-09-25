import React from 'react';
import { ShieldCheck, Clock, FileCheck, FileSearch, ArrowRight, Lock, CheckCircle } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export const ResourcesCTASection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 my-6">
      <div className="relative rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 md:p-10 overflow-hidden shadow-xs">
        
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-linear-to-bl from-amber-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-linear-to-tr from-emerald-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-6xl mx-auto space-y-4">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-800">
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            <span>100% Free & Vendor-Neutral Audits</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-950 tracking-tight">
            Already Have a Quote or Power Bill?
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Don't sign high-pressure contracts blindly. Upload your installer quote or recent power bill for a rigorous, independent engineering analysis from CEC-accredited specialists.
          </p>

         

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button
              to="/resources/quote-review"
              variant="primary"
              size="lg"
              icon={<FileCheck className="w-4 h-4" />}
              className="w-full sm:w-auto shadow-md hover:shadow-lg transition-all"
            >
              Request Free Quote Audit
            </Button>
            <Button
              to="/resources/electricity-bill-review"
              variant="outline"
              size="lg"
              icon={<FileSearch className="w-4 h-4" />}
              className="w-full sm:w-auto hover:bg-slate-50 transition-all"
            >
              Analyze My Power Bill
            </Button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ResourcesCTASection;

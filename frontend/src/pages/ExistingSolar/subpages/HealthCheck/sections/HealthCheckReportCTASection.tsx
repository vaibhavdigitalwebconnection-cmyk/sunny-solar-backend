import React from 'react';
import { FileText, Camera, ShieldCheck, TrendingUp, CheckCircle2 } from 'lucide-react';

export const HealthCheckReportCTASection: React.FC = () => {
  const deliverables = [
    {
      icon: <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />,
      iconBg: 'bg-amber-500/10',
      title: 'Infrared Thermal Photography',
      desc: 'High-resolution thermal imaging captures diode hotspots, defective cells, and loose high-resistance DC connections before they cause fire hazards.',
    },
    {
      icon: <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />,
      iconBg: 'bg-emerald-500/10',
      title: 'Form 16 Safety Certificate',
      desc: 'Official Certificate of Electrical Safety proving AS/NZS 5033 compliance — essential for building insurance claims, storm audits, and property sales.',
    },
    {
      icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />,
      iconBg: 'bg-blue-500/10',
      title: 'Actual vs Rated Yield Audit',
      desc: 'Precise DC string power measurements benchmarked against original factory nameplate wattage to verify your true degradation and daily yield.',
    },
    {
      icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />,
      iconBg: 'bg-purple-500/10',
      title: 'Fixed-Price Rectification Quote',
      desc: 'If any recalled isolators, cabling faults, or inverter issues are found, receive a clear itemized quote with zero pressure or sales obligations.',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-950 tracking-tight leading-tight">
          What You Receive With Your Health Check
        </h2>
        <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed px-1 sm:px-0">
          Within 24 hours of completion, our Master Electrician delivers a comprehensive digital diagnostic pack documenting the physical condition, electrical safety, and output health of your solar setup.
        </p>
      </div>

      {/* 4 Deliverables 2x2 Grid on Mobile, 4 Columns on Desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10">
        {deliverables.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-3 sm:p-5 lg:p-6 shadow-xs sm:shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${item.iconBg} flex items-center justify-center mb-2.5 sm:mb-4`}>
                {item.icon}
              </div>
              <h3 className="text-xs sm:text-base font-serif font-bold text-slate-950 mb-1.5 sm:mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
            <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-emerald-700">
              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span>Included in $189 audit</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HealthCheckReportCTASection;

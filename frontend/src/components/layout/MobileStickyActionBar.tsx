import React from 'react';
import { Phone } from 'lucide-react';

export const MobileStickyActionBar: React.FC = () => {
  return (
    <aside
      aria-label="Quick mobile contact actions"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] px-4 py-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] transition-transform duration-300"
    >
      <div className="max-w-md mx-auto w-full">
        {/* Full-width Direct Call Button */}
        <a
          href="tel:1300030479"
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-[#0C123E] hover:bg-[#151C57] active:bg-[#070A24] text-white font-bold shadow-md transition-all active:scale-[0.99]"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 text-[#D1DCF8] flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-left leading-tight">
            <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">
              Call Electrician
            </span>
            <span className="text-sm font-extrabold text-white tracking-wide">
              1300 030 479
            </span>
          </div>
        </a>
      </div>
    </aside>
  );
};

export default MobileStickyActionBar;

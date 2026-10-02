import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MegaMenu.css';
import {
  Sun,
  Wrench,
  ArrowUpCircle,
  BatteryCharging,
  Zap,
  ShieldCheck,
  Activity,
  TrendingUp,
  PlusCircle,
  Battery,
  DollarSign,
  Layers,
  Clock,
  Sliders,
  Scale,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  FileText,
  CheckSquare,
  Download,
  FileSpreadsheet,
  FileCheck,
  FileSearch,
  ArrowRight,
  Phone,
  LucideIcon,
} from 'lucide-react';
import { NavSection } from '../../../data/navigationData';
import { preloadRoute } from '../../../routes/AppRoutes';

const iconMap: Record<string, LucideIcon> = {
  Sun,
  Wrench,
  ArrowUpCircle,
  BatteryCharging,
  Zap,
  ShieldCheck,
  Activity,
  TrendingUp,
  PlusCircle,
  Battery,
  DollarSign,
  Layers,
  Clock,
  Sliders,
  Scale,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  FileText,
  CheckSquare,
  Download,
  FileSpreadsheet,
  FileCheck,
  FileSearch,
};

const getFeaturedImage = (sectionTitle: string): string => {
  switch (sectionTitle.toLowerCase()) {
    case 'solar':
      return '/images/navbar/navbar-feature.webp';
    case 'batteries':
      return '/images/navbar/navbar-battery.webp';
    case 'ev charger':
      return '/images/ev-charger/ev-smart-charger-wall.webp';
    case 'existing solar':
      return '/images/navbar/navbar-tech.webp';
    case 'calculators':
      return '/images/navbar/navbar-calculators.webp';
    case 'resources':
      return '/images/navbar/navbar-resources.webp';
    case 'learn':
      return '/images/navbar/navbar-tech.webp';
    default:
      return '/images/navbar/navbar-feature.webp';
  }
};

export interface MegaMenuProps {
  section: NavSection;
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ section, isOpen, onClose }) => {
  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !section.children) return null;

  const { items, featured } = section.children;
  const isLargeSet = items.length > 4;

  return (
    <div
      className="absolute top-full left-0 right-0 w-full pt-2 z-50 animate-megamenu"
      onMouseLeave={onClose}
    >
      {/* Centered Floating Modern Card Container */}
      <div className={`mx-auto px-4 sm:px-6 transition-all duration-200 ${isLargeSet ? 'max-w-5xl' : 'max-w-4xl'}`}>
        <div className="bg-white rounded-lg shadow-[0_20px_50px_-12px_rgba(0,0,0,0.22),0_0_0_1px_rgba(0,0,0,0.06)] border border-[#ED4F11]/30 overflow-hidden">

          {/* Top subtle highlight rim with Brand color */}
          <div className="h-1 w-full bg-[#ED4F11]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Zone: Nav Items */}
            <div className={`${featured ? 'lg:col-span-8' : 'lg:col-span-12'} p-5 sm:p-6 flex flex-col justify-between`}>
              <div>
                {/* Section Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#ED4F11] bg-[#ED4F11]/10 border border-[#ED4F11]/25 px-2 py-0.5 rounded">
                      {section.title}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Select an option to get started
                    </span>
                  </div>
                  <Link
                    to={section.href}
                    onClick={onClose}
                    onMouseEnter={() => preloadRoute(section.href)}
                    className="text-xs font-bold text-slate-600 hover:text-[#ED4F11] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>View all</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {items.map((item, idx) => {
                    const IconComp = item.icon ? iconMap[item.icon] : Sun;

                    return (
                      <Link
                        key={idx}
                        to={item.href}
                        onClick={onClose}
                        onMouseEnter={() => preloadRoute(item.href)}
                        className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-orange-50/50 transition-all duration-150 border border-transparent hover:border-[#ED4F11]/30"
                      >
                        {/* Icon */}
                        <div className="w-9 h-9 rounded-lg bg-[#F5F7FD] text-[#2B3CB8] flex items-center justify-center shrink-0 group-hover:bg-[#ED4F11] group-hover:text-white transition-all duration-200 shadow-xs">
                          {IconComp && <IconComp className="w-4 h-4" />}
                        </div>

                        {/* Title */}
                        <div className="flex-1 min-w-0 pr-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-sm text-slate-900 group-hover:text-[#ED4F11] transition-colors truncate">
                              {item.title}
                            </span>
                          </div>
                        </div>

                        {/* Hover Arrow */}
                        <div className="self-center shrink-0 text-[#ED4F11] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Micro Trust Line */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5 text-[#2B3CB8] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2B3CB8]" />
                  <span>SAA Accredited • 25-Yr Performance Guarantee</span>
                </div>
                <Link
                  to="/service-areas"
                  onClick={onClose}
                  className="text-slate-400 hover:text-[#2B3CB8] transition-colors text-[11px]"
                >
                  Servicing QLD
                </Link>
              </div>
            </div>

            {/* Right Zone: Integrated Featured Panel with Full-Bleed Image (No Logo) */}
            {featured && (
              <div className="lg:col-span-4 relative overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-200/80 bg-slate-950 flex flex-col justify-end min-h-55 lg:min-h-full">
                {/* Full-bleed Feature Image */}
                <Link
                  to={featured.href}
                  onClick={onClose}
                  onMouseEnter={() => preloadRoute(featured.href)}
                  className="absolute inset-0 w-full h-full block overflow-hidden group/img"
                >
                  <img
                    src={getFeaturedImage(section.title)}
                    alt={featured.title || section.title}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Bottom gradient vignette for high legibility */}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
                </Link>

                {/* Bottom Line Bar Overlaying Bottom of the Image */}
                <div className="relative z-10 px-4 py-3 bg-slate-950/75 backdrop-blur-md border-t border-white/15 flex items-center justify-between">
                  <Link
                    to={featured.href}
                    onClick={onClose}
                    onMouseEnter={() => preloadRoute(featured.href)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#ED4F11] transition-colors group/cta"
                  >
                    <span>{featured.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover/cta:translate-x-1 text-[#ED4F11]" />
                  </Link>

                  <a
                    href="tel:1300030479"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ED4F11] hover:text-white transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-white" />
                    <span>1300 030 479</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Layers,
  Clock,
  BatteryCharging,
  Sliders,
  Scale,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  LucideIcon
} from 'lucide-react';
import { CalculatorMeta } from '../../data/calculatorsData';
import { Badge } from '../ui/Badge';

const iconMap: Record<string, LucideIcon> = {
  DollarSign,
  Layers,
  Clock,
  BatteryCharging,
  Sliders,
  Scale,
  CheckCircle2,
  HelpCircle,
};

export interface CalculatorCardProps {
  calculator: CalculatorMeta;
  index?: number;
  compact?: boolean;
}

const MotionLink = motion.create(Link);

export const CalculatorCard: React.FC<CalculatorCardProps> = ({ calculator, compact }) => {
  const IconComponent = iconMap[calculator.iconName] || DollarSign;

  return (
    <MotionLink
      to={`/calculators/${calculator.slug}`}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`group bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#2B3CB8]/60 active:border-[#2B3CB8] flex flex-col justify-between relative overflow-hidden h-full cursor-pointer transition-all duration-300 ${compact ? 'p-2.5 xs:p-3 sm:p-4' : 'p-4 sm:p-5 lg:p-6'
        }`}
    >
      {/* Top Accent Gradient Bar on Hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#2B3CB8] via-[#6F8EE7] to-[#2B3CB8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Active Tap Solar Flare */}
      <div className="absolute inset-0 bg-radial from-[#2B3CB8]/10 via-transparent to-transparent opacity-0 group-active:opacity-100 transition-opacity duration-150 pointer-events-none" />

      <div>
        <div className={`flex items-center justify-between gap-1.5 ${compact ? 'mb-1.5 xs:mb-2' : 'mb-2.5 sm:mb-4'}`}>
          <div className={`${compact ? 'w-8 h-8 rounded-lg' : 'w-10 h-10 sm:w-12 sm:h-12 rounded-xl'
            } bg-[#2B3CB8]/10 border border-[#2B3CB8]/25 flex items-center justify-center text-[#2B3CB8] group-hover:bg-[#2B3CB8] group-hover:text-white group-hover:scale-105 transition-all duration-300 shrink-0`}>
            <IconComponent className={compact ? 'w-4 h-4' : 'w-5 h-5 sm:w-6 sm:h-6'} />
          </div>
          {calculator.badge && (
            <Badge variant="amber" size="sm" className={compact ? 'text-[9px] px-1.5 py-0.5 truncate max-w-21.25' : 'text-[10px] sm:text-xs'}>
              {calculator.badge}
            </Badge>
          )}
        </div>

        <h3 className={`${compact ? 'text-xs xs:text-sm leading-snug line-clamp-2' : 'text-base sm:text-lg leading-snug'
          } font-bold text-slate-900 group-hover:text-[#2B3CB8] transition-colors`}>
          {calculator.title}
        </h3>

        <p className={`${compact ? 'mt-0.5 xs:mt-1 text-[10px] xs:text-[11px] leading-snug line-clamp-2' : 'mt-1 sm:mt-2 text-xs sm:text-sm leading-relaxed'
          } text-slate-600`}>
          {calculator.description}
        </p>
      </div>

      <div className={`${compact ? 'mt-2 pt-1.5' : 'mt-3.5 sm:mt-6 pt-3 sm:pt-4'
        } border-t border-slate-100 flex items-center justify-between text-xs text-slate-400`}>
        <span className="font-medium text-slate-500 text-[10px] sm:text-xs truncate">
          ⏱️ {compact ? calculator.estimatedTime.replace(' seconds', 's').replace(' minutes', 'm') : calculator.estimatedTime}
        </span>
        <span className="inline-flex items-center gap-1 font-bold text-[#2B3CB8] group-hover:text-[#1D2984] text-[10px] sm:text-xs shrink-0 ml-1">
          <span>{compact ? 'Launch' : 'Launch Tool'}</span>
          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
        </span>
      </div>
    </MotionLink>
  );
};

export default CalculatorCard;


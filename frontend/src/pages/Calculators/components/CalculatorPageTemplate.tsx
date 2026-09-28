import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  BatteryCharging,
  Sun,
  Zap,
  Check,
  ArrowRight,
  ShieldCheck,
  Home,
  TrendingUp,
  DollarSign,
  Sparkles
} from 'lucide-react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { Button } from '../../../components/ui/Button';
import { CalculatorPageData } from '../data/calculatorsData';

export interface CalculatorPageTemplateProps {
  data: CalculatorPageData;
  calcComponent: React.ReactNode;
}

export const CalculatorPageTemplate: React.FC<CalculatorPageTemplateProps> = ({
  data,
  calcComponent
}) => {
  const { seo, hero, addBattery } = data;

  const renderTopBadgeIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-3.5 h-3.5" />;
      case 'Home':
        return <Home className="w-3.5 h-3.5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  const renderBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'DollarSign':
        return <DollarSign className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
      case 'Zap':
        return <Zap className="w-3.5 h-3.5 text-emerald-600 shrink-0" />;
      case 'Sparkles':
        return <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
      case 'BatteryCharging':
      default:
        return <BatteryCharging className={`w-3.5 h-3.5 shrink-0 ${addBattery.theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Helmet>

      {/* Section 1: Page Header & Hero */}
      <PageHeader
        badge={hero.badge}
        title={hero.title}
        highlightText={hero.highlightText}
        description={hero.description}
      />

      {/* Section 2: Unique Interactive Calculator */}
      {calcComponent}

      {/* Section 3: Add Battery with Solar Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 sm:mt-6 mb-8 sm:mb-12">
        <div
          className={`relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 overflow-hidden ${
            addBattery.theme === 'dark'
              ? 'bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl border border-slate-700/80'
              : 'bg-white border border-slate-200/80 shadow-xs'
          }`}
        >
          {/* Ambient lighting glows */}
          {addBattery.glows && (
            <>
              <div
                className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none ${addBattery.glows.topRight}`}
              />
              <div
                className={`absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none ${addBattery.glows.bottomLeft}`}
              />
            </>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
            {/* Left: Image with Overlaid Tags */}
            <div className="lg:col-span-5">
              <div
                className={`relative rounded-xl overflow-hidden shadow-md group ${
                  addBattery.theme === 'dark' ? 'border border-slate-700 shadow-2xl' : ''
                }`}
              >
                <img
                  src={addBattery.image.src}
                  alt={addBattery.image.alt}
                  className="w-full h-52 xs:h-60 sm:h-72 lg:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  className={`absolute inset-0 bg-linear-to-t ${
                    addBattery.theme === 'dark'
                      ? 'from-slate-950/85 via-slate-950/25 to-transparent'
                      : 'from-slate-950/85 via-slate-950/25 to-transparent'
                  }`}
                />

                {addBattery.image.topBadge && (
                  <div
                    className={`absolute top-3 left-3 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1.5 shadow-sm ${
                      addBattery.image.topBadge.icon === 'TrendingUp'
                        ? 'bg-emerald-500/90 text-slate-950'
                        : 'bg-amber-500/90 text-slate-950'
                    }`}
                  >
                    {renderTopBadgeIcon(addBattery.image.topBadge.icon)}
                    <span>{addBattery.image.topBadge.text}</span>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span
                    className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider block ${
                      addBattery.theme === 'dark' ? 'text-amber-400' : 'text-emerald-400'
                    }`}
                  >
                    {addBattery.image.bottomTag.headline}
                  </span>
                  <p className="text-[11px] sm:text-xs font-medium text-slate-100 mt-0.5">
                    {addBattery.image.bottomTag.subline}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
              <div
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                  addBattery.theme === 'dark'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : addBattery.badge.icon === 'Sparkles'
                    ? 'bg-amber-500/10 text-amber-800 border border-amber-500/20'
                    : 'bg-emerald-500/10 text-emerald-800 border border-emerald-500/20'
                }`}
              >
                {renderBadgeIcon(addBattery.badge.icon)}
                <span>{addBattery.badge.text}</span>
              </div>

              <h3
                className={`text-lg sm:text-xl md:text-2xl font-black tracking-tight leading-snug ${
                  addBattery.theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}
              >
                {addBattery.title}
              </h3>

              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  addBattery.theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {addBattery.description}
              </p>

              {/* Render Features list if provided */}
              {addBattery.features && addBattery.features.length > 0 && (
                <div className="space-y-2 pt-1">
                  {addBattery.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-2.5 text-xs ${
                        addBattery.theme === 'dark' ? 'text-slate-200' : 'text-slate-700'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>
                        <strong>{feature.bold}</strong> {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Render Metrics grid if provided */}
              {addBattery.metrics && addBattery.metrics.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                  {addBattery.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 sm:p-3 rounded-xl ${
                        metric.variant === 'emerald'
                          ? 'bg-emerald-950/40 border border-emerald-500/30'
                          : 'bg-slate-800/80 border border-slate-700'
                      }`}
                    >
                      <span
                        className={`text-[10px] font-bold uppercase block ${
                          metric.variant === 'emerald' ? 'text-emerald-400' : 'text-slate-400'
                        }`}
                      >
                        {metric.label}
                      </span>
                      <span
                        className={`text-sm sm:text-base font-extrabold ${
                          metric.variant === 'emerald' ? 'text-emerald-300' : 'text-amber-400'
                        }`}
                      >
                        {metric.value}
                      </span>
                      <p
                        className={`text-[10px] sm:text-[11px] mt-0.5 ${
                          metric.variant === 'emerald' ? 'text-slate-300' : 'text-slate-400'
                        }`}
                      >
                        {metric.subtext}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer CTA & Trust */}
              <div
                className={`pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t ${
                  addBattery.theme === 'dark' ? 'border-slate-700/80' : 'border-slate-100'
                }`}
              >
                <div
                  className={`flex items-center gap-1.5 text-xs ${
                    addBattery.theme === 'dark' ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {addBattery.footer.trustIcon === 'ShieldCheck' && (
                    <ShieldCheck
                      className={`w-4 h-4 shrink-0 ${
                        addBattery.theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                      }`}
                    />
                  )}
                  <span>{addBattery.footer.trustText}</span>
                </div>
                <Button
                  to={addBattery.footer.buttonTo}
                  variant="primary"
                  size="sm"
                  className="w-full sm:w-auto justify-center text-center"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  {addBattery.footer.buttonText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CalculatorPageTemplate;

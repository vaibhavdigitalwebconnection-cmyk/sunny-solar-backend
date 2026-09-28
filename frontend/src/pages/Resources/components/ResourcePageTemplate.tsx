import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  BatteryCharging,
  Zap,
  Check,
  ArrowRight,
  ShieldCheck,
  SunDim,
  AlertTriangle,
  ShieldAlert,
  FileCheck,
  FileSearch,
  CheckSquare
} from 'lucide-react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { Button } from '../../../components/ui/Button';
import { ResourcePageData } from '../data/resourcesData';

export interface ResourcePageTemplateProps {
  data: ResourcePageData;
  mainComponent: React.ReactNode;
}

export const ResourcePageTemplate: React.FC<ResourcePageTemplateProps> = ({
  data,
  mainComponent
}) => {
  const { seo, hero, battery, cta } = data;

  const renderBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'SunDim':
        return <SunDim className="w-3.5 h-3.5 text-amber-400" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />;
      case 'BatteryCharging':
      default:
        return <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  const renderCTAIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileCheck':
        return <FileCheck className="w-4 h-4" />;
      case 'FileSearch':
        return <FileSearch className="w-4 h-4" />;
      case 'CheckSquare':
        return <CheckSquare className="w-4 h-4" />;
      case 'ArrowRight':
      default:
        return <ArrowRight className="w-4 h-4" />;
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

      {/* Section 2: Main Content Area */}
      {mainComponent}

      {/* Section 3: Add Battery with Solar Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 sm:mt-6 mb-8 sm:mb-12">
        <div className="relative rounded-2xl sm:rounded-3xl bg-linear-to-tr from-slate-900 via-slate-800 to-slate-900 text-white p-4 sm:p-6 md:p-8 overflow-hidden shadow-xl border border-slate-700/80">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
            {/* Left: Real Photography with Tag */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden shadow-2xl border border-slate-700 group rounded-xl">
                <img
                  src={battery.image.src}
                  alt={battery.image.alt}
                  className="w-full h-52 xs:h-60 sm:h-72 lg:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                  <div className="flex items-center justify-between text-xs font-semibold text-amber-300 mb-1">
                    <span>{battery.image.bottomTag.headline}</span>
                    <span>{battery.image.bottomTag.subline}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`bg-linear-to-r from-amber-400 to-emerald-400 h-full ${battery.image.bottomTag.progressPercent}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Narrative Educational Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                {renderBadgeIcon(battery.badge.icon)}
                <span>{battery.badge.text}</span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white tracking-tight leading-snug">
                {battery.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {battery.description}
              </p>

              {/* Checklist Points */}
              <div className="space-y-2.5 pt-1">
                {battery.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>
                      <strong>{feature.bold}</strong> {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Action */}
              <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-700/80">
                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{battery.footer.trustText}</span>
                </div>
                <Button
                  to={battery.footer.buttonTo}
                  variant="primary"
                  size="sm"
                  className="w-full sm:w-auto justify-center text-center"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  {battery.footer.buttonText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Tailored CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 my-10">
        <div className="relative rounded-lg bg-white border border-slate-300 p-8 sm:p-10 shadow-lg overflow-hidden text-center">
          {/* Decorative ambient background */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-800">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>{cta.badgeText}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950 tracking-tight">
              {cta.title}
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {cta.description}
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button
                to={cta.primaryButton.to}
                variant="primary"
                size="md"
                icon={renderCTAIcon(cta.primaryButton.icon)}
              >
                {cta.primaryButton.text}
              </Button>
              <Button
                to={cta.secondaryButton.to}
                variant="outline"
                size="md"
                icon={renderCTAIcon(cta.secondaryButton.icon)}
              >
                {cta.secondaryButton.text}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourcePageTemplate;

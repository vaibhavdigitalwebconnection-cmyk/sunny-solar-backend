import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PageHeader } from '../../components/layout/PageHeader';
import { serviceAreasData } from '../../data/serviceAreasData';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { PostcodeEligibilityChecker } from '../../components/common/PostcodeEligibilityChecker';
import { ScrollProgress } from '../../components/ui/ScrollProgress';
import { BlurFade } from '../../components/ui/BlurFade';
import { MapPin, Sun, Zap, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ServiceAreasPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <ScrollProgress />
      <Helmet>
        <title>Service Areas Across South East Queensland & Northern NSW | Sunny Solar</title>
        <meta
          name="description"
          content="Check solar and battery installation service coverage across Gold Coast, Brisbane, Sunshine Coast, Ipswich, and Northern NSW."
        />
      </Helmet>
      <PageHeader
        badge="Coverage Map"
        title="Solar & Battery"
        highlightText="Service Areas"
        description="We service South East Queensland and Northern Rivers NSW with local warehouse facilities and dedicated master electrician installation fleets."
        actions={
          <Button
            to="/get-started/free-assessment"
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Check Suburb Availability
          </Button>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* Interactive Postcode Lookup */}
        <PostcodeEligibilityChecker />

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceAreasData.map((area, idx) => (
            <BlurFade key={area.slug} delay={0.06 * (idx % 6)} duration={0.35} className="h-full flex flex-col">
              <div
                className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <Badge variant="amber" size="sm">
                      {area.solarHoursPerDay} hrs sun/day
                    </Badge>
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {area.name}
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mt-0.5 mb-3">
                    {area.region}
                  </span>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
                    {area.description}
                  </p>

                  {/* Suburbs tag pills */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Suburbs Served Include:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {area.suburbsServed.slice(0, 6).map((suburb, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                        >
                          {suburb}
                        </span>
                      ))}
                      {area.suburbsServed.length > 6 && (
                        <span className="text-[11px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md font-bold">
                          +{area.suburbsServed.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-xs text-emerald-900 mb-6 font-semibold flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Est. Savings: {area.averageAnnualSolarSavings}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Button
                    to={`/service-areas/${area.slug}`}
                    variant="outline"
                    size="md"
                    fullWidth
                    icon={<ArrowRight className="w-4 h-4" />}
                    className="group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500"
                  >
                    View Local {area.name} Pricing
                  </Button>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceAreasPage;

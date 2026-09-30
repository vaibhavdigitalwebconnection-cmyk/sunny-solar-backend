import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ShieldCheck, Award, Zap, Phone, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export const TrentBioPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Helmet>
        <title>Meet Trent Palmer - Founder & Master Electrician | Sunny Solar</title>
        <meta
          name="description"
          content="Learn about Trent Palmer, Founder and Master Electrician at Sunny Solar, with over 20 years in electrical design and renewable installations."
        />
      </Helmet>
      <PageHeader
        badge="Founder Spotlight"
        title="Meet Trent Palmer"
        highlightText="Master Electrician & Founder"
        description="With over 20 years in the electrical and renewable industry, Trent still personally oversees system design and ensures strict engineering rigor on every Sunny Solar project."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-12 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Photo */}
          <div className="md:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-3/4 bg-slate-900 relative">
              <img
                src="/images/about/trent-portrait.jpg"
                alt="Trent Palmer, Founder of Sunny Solar"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                <span className="font-extrabold text-lg block">Trent Palmer</span>
                <span className="text-xs text-amber-400">Founder & Managing Director</span>
              </div>
            </div>
          </div>

          {/* Bio text */}
          <div className="md:col-span-7 space-y-4">
            <Badge variant="amber">20+ Years Renewable Experience</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              "I wanted to build a solar company that I would gladly recommend to my own mother."
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Trent began his apprenticeship on the Gold Coast in 2004, qualifying as a licensed electrical contractor before becoming an early adopter of photovoltaic solar in 2008.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              Frustrated by high-pressure sales outfits that promised impossible savings and cut corners on rooftop safety, Trent founded Sunny Solar with a strict code of engineering transparency.
            </p>

            <div className="pt-3 space-y-2 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>SAA Design & Grid-Connect Accreditation #A4892</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Tesla Powerwall Certified Master Technician</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>QLD Electrical Contractor License #83912</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row flex-wrap gap-3">
              <Button
                to="/get-started/free-assessment"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto justify-center shadow-md"
              >
                Request a Design Consultation
              </Button>
              <Button
                to="/projects"
                variant="outline"
                size="md"
                className="w-full sm:w-auto justify-center"
              >
                View Completed Projects
              </Button>
              <Button
                to="/reviews"
                variant="outline"
                size="md"
                className="w-full sm:w-auto justify-center"
              >
                Read Homeowner Reviews
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrentBioPage;

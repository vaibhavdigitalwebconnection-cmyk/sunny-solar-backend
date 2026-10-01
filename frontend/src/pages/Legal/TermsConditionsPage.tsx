import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageHeader } from '../../components/layout/PageHeader';

export const TermsConditionsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Helmet>
        <title>Terms & Conditions | Sunny Solar</title>
        <meta
          name="description"
          content="Terms and conditions governing the use of the Sunny Solar website, digital estimators, and inquiry services."
        />
      </Helmet>
      <PageHeader
        badge="Terms of Service"
        title="Sunny Solar"
        highlightText="Terms & Conditions"
        description="Review the terms governing the use of the Sunny Solar website, online estimation tools, and quote generation requests."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-12 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Online Estimates & Calculators Disclaimer</h2>
            <p>
              Calculators and estimations provided on this website are designed for educational and preliminary budgeting purposes. Actual electricity bill savings and solar system kilowatt production depend on physical site inspection factors including precise roof azimuth, pitch angle, ambient temperature, localized shading, and individual retail tariffs. Formal binding figures are provided in our official engineering quotes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Clean Energy Council (SAA) Code of Conduct</h2>
            <p>
              Sunny Solar operates as an Approved Solar Retailer and adheres strictly to the Clean Energy Council's Solar Retailer Code of Conduct. We guarantee a 10-day cooling-off period on all signed residential solar installation contracts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. Workmanship & Product Warranties</h2>
            <p>
              All systems installed by Sunny Solar carry our signature 10-year comprehensive installation and roof penetration guarantee, in addition to manufacturer product warranties (25 years on Tier-1 panels, 10-15 years on inverters, 10 years on batteries).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of Nationwide, Australia.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">5. Contact Information</h2>
            <p className="text-slate-700">
              For any notices or queries, please contact Sunny Solar at{' '}
              <a
                href="https://maps.google.com/?q=10A+Burralong+Dr,+Wondunna+QLD+4655,+Australia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 hover:underline inline-flex items-center gap-1 font-medium"
              >
                10A Burralong Dr, Wondunna QLD 4655, Australia ↗
              </a>{' '}
              | Phone: <a href="tel:1300030479" className="text-amber-600 hover:underline">1300 030 479</a> | Email: <a href="mailto:info@sunnysolar.com.au" className="text-amber-600 hover:underline">info@sunnysolar.com.au</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;

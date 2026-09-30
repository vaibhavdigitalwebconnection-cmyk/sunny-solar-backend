import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageHeader } from '../../components/layout/PageHeader';
import { ScrollProgress } from '../../components/ui/ScrollProgress';

export const TermsOfTradePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <ScrollProgress className="top-0 z-50 h-[3px]" />
      <Helmet>
        <title>Terms of Trade & Commercial Agreements | Sunny Solar</title>
        <meta
          name="description"
          content="Standard terms of trade, payment terms, installation guarantees, and NETCC Approved Seller cooling-off policies."
        />
      </Helmet>
      <PageHeader
        badge="Legal & Commercial"
        title="Sunny Solar"
        highlightText="Terms of Trade"
        description="Standard trade terms, commercial agreements, installation payment schedules, and warranty conditions for Sunny Solar customers."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-12 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Quotations and Contract Acceptance</h2>
            <p>
              All formal quotations provided by Sunny Solar are valid for 30 calendar days from issuance, subject to roof structural adequacy, electrical switchboard compliance, and relevant Distributed Network Service Provider (DNSP) grid connection pre-approval (e.g., Energex, Ergon Energy, Essential Energy).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Payment Milestones &amp; Deposit</h2>
            <p>
              Under Queensland legislation and Clean Energy Council guidelines:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>A refundable preliminary deposit of 10% is required upon contract signing.</li>
              <li>The balance of the contract amount is payable upon completion of physical rooftop and electrical installation on the day of commissioning.</li>
              <li>Government Small-scale Technology Certificates (STCs) are deducted upfront from your invoice price as an agreed point-of-sale discount upon valid assignment.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. Cooling-Off Period</h2>
            <p>
              As a NETCC APPROVED SELLER, Sunny Solar provides all residential customers with an unconditional 10-business-day cooling-off period during which contracts can be cancelled with a full refund of any deposit paid.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. Warranties &amp; Workmanship Guarantees</h2>
            <p>
              All installations carry our 10-year comprehensive retailer workmanship and roof penetration warranty. Manufacturer warranties apply separately to hardware components:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Tier-1 Solar Panels: 25-Year Product &amp; 25-to-30-Year Performance Warranties</li>
              <li>Inverters: 10-to-15-Year Manufacturer Warranty</li>
              <li>Home Battery Storage: 10-Year Manufacturer Warranty</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">5. Grid Connection and Meter Reconfiguration</h2>
            <p>
              Sunny Solar handles all DNSP grid applications on your behalf. Bi-directional smart meter installation or reconfiguration is carried out by your electricity retailer and their metering coordinator in accordance with National Electricity Market rules.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">6. Governing Law</h2>
            <p>
              These Terms of Trade are governed by the laws of the State of Queensland and the Commonwealth of Australia.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">7. Registered Office & Inquiries</h2>
            <p className="text-slate-700">
              Sunny Solar —{' '}
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

export default TermsOfTradePage;

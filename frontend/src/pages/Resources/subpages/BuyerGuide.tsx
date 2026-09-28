import React, { useState } from 'react';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { BookOpen, CheckCircle2, ShieldCheck, Mail, User, Phone, Download, FileText, Sparkles } from 'lucide-react';
import { submitToWeb3Forms } from '../../../utils/web3forms';
import { ResourcePageTemplate } from '../components/ResourcePageTemplate';
import { resourcesPageData } from '../data/resourcesData';

export const BuyerGuidePage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const res = await submitToWeb3Forms({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      postcode: formData.postcode,
      page: 'Solar & Battery Buyer Guide E-Book',
    }, {
      subject: `New Buyer Guide Download Request - ${formData.name} (${formData.postcode})`,
      from_name: 'Sunny Solar Buyer Guide',
    });

    setIsSubmitting(false);
    if (res.success) {
      setSubmitted(true);
    } else {
      setErrorMessage(res.message || 'Error submitting request. Please try again.');
    }
  };

  const mainComponent = (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Recreated Guide E-Book Preview */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-lg border border-slate-300 p-6 sm:p-8 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="amber" size="sm">Most Popular Resource</Badge>
              <span className="text-xs font-semibold text-slate-500">• 38 Pages E-Book • 2025 Edition</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950 tracking-tight mb-3">
              Your Complete Roadmap to Solar & Battery Freedom
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Written by senior Australian renewable energy engineers, this 38-page guide demystifies the technical jargon behind N-Type TOPCon panels, microinverters vs string systems, export curtailment, and feed-in tariffs.
            </p>

            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-500" />
              What You'll Learn Inside this Free Edition:
            </h3>

            <div className="space-y-3 pb-6 border-b border-slate-200">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Top 10 Manufacturer Benchmark:</strong> Independent efficiency, degradation rate, and temperature coefficient comparisons for Tier-1 panels and smart inverters.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>STC Federal Rebate Breakdown:</strong> Exact mathematical calculation of how the Small-scale Renewable Energy Scheme knocks up to $3,200 off your upfront invoice.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Roof Orientation & Pitch Optimization:</strong> Why splitting your array East/West often beats pure North-facing arrays when self-consuming solar power.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Real Household Case Studies:</strong> 4 audited homes across Brisbane and the Gold Coast with itemized before-and-after electricity bills.</span>
              </div>
            </div>

            {/* Insight Callout */}
            <div className="mt-6 flex items-start gap-3 bg-amber-50/80 border border-amber-200 rounded-lg p-4 text-xs text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">Updated for 2025 Tariff Changes:</span>
                Includes strategic guidance on navigating declining retailer feed-in tariffs (down to 3–5¢) by shifting midday loads and pairing smart storage.
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>100% Free & Vendor-Neutral:</strong> Download instantly to any device. No marketing spam or high-pressure callbacks.
            </span>
          </div>
        </div>

        {/* Right Column: Download Lead Form */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-300 p-6 sm:p-8 shadow-lg sticky top-24">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900">E-Book Dispatched!</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                We've sent your copy of <strong>"The Complete Solar & Battery Guide"</strong> to <span className="font-semibold text-slate-800">{formData.email}</span>.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-amber-600 font-bold hover:underline cursor-pointer"
                >
                  Send to another email address
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Badge variant="amber" size="sm">Instant Digital Delivery</Badge>
                <h3 className="text-xl font-serif font-bold text-slate-950 mt-2">
                  Download the Complete 38-Page E-Book
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your email address below to receive the free PDF e-book immediately.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="sarah@example.com.au"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Phone Number (Optional)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    placeholder="0400 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Suburb / Postcode</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Robina 4226"
                  value={formData.postcode}
                  onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>

              {errorMessage && (
                <div className="p-2 rounded bg-red-50 border border-red-200 text-red-600 text-xs text-center">
                  {errorMessage}
                </div>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  disabled={isSubmitting}
                  icon={<Download className="w-4 h-4" />}
                >
                  {isSubmitting ? 'Submitting to Web3Forms...' : 'Download Complete Guide (PDF)'}
                </Button>
              </div>

              <p className="text-[11px] text-slate-400 text-center pt-1">
                Zero spam • Instant high-resolution PDF
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );

  return (
    <ResourcePageTemplate
      data={resourcesPageData.buyerGuide}
      mainComponent={mainComponent}
    />
  );
};

export default BuyerGuidePage;

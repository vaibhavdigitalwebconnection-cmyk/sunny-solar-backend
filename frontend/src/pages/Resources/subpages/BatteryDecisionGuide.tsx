import React, { useState } from 'react';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Battery, CheckCircle2, ShieldCheck, Mail, User, Phone, Download, FileSpreadsheet, Cpu } from 'lucide-react';
import { submitToWeb3Forms } from '../../../utils/web3forms';
import { ResourcePageTemplate } from '../components/ResourcePageTemplate';
import { resourcesPageData } from '../data/resourcesData';

export const BatteryDecisionGuidePage: React.FC = () => {
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
      page: 'Home Battery Decision Guide PDF',
    }, {
      subject: `New Battery Decision Guide Request - ${formData.name} (${formData.postcode})`,
      from_name: 'Sunny Solar Battery Guide',
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
        {/* Left Column: Recreated Technical Report Preview */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-lg border border-slate-300 p-6 sm:p-8 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="amber" size="sm">Independent Technical Report</Badge>
              <span className="text-xs font-semibold text-slate-500">• 24 Pages • 4 Top Battery Brands Benchmarked</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950 tracking-tight mb-3">
              Is a Home Battery Financially Worth It For You?
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Home batteries are not one-size-fits-all. A battery that delivers a 6-year payback on a time-of-use tariff with high nighttime air-conditioning might take 12 years for a low-consumption home. This technical report gives you the cold, hard engineering facts without sales exaggeration.
            </p>

            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-amber-500" />
              Inside this 24-Page Technical Breakdown:
            </h3>

            <div className="space-y-3 pb-6 border-b border-slate-200">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>LFP vs NMC Chemistry Comparison:</strong> Why Cobalt-free Lithium Iron Phosphate (LFP) has become the gold standard for Australian climate safety and 10,000+ cycle life.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>AC-Coupled vs DC-Coupled Architectures:</strong> Clear engineering criteria on when to install an all-in-one hybrid inverter vs retrofitting an AC battery to existing solar.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Whole-Home vs Essential Backup Wiring:</strong> Realistic power requirements to run ducted air conditioners, electric hot water, and induction cooktops during blackouts.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Financial ROI Tariff Modeling:</strong> Side-by-side payback timelines modeled against Energex and Ergon network flat vs time-of-use tariffs.</span>
              </div>
            </div>

            {/* Hardware Benchmark Callout */}
            <div className="mt-6 flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-700">
              <Cpu className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5 text-slate-900">Brands Benchmarked in this Edition:</span>
                Tesla Powerwall 3 (13.5 kWh), Sungrow SBR Modular (9.6–25.6 kWh), Enphase IQ Battery 5P, and AlphaESS Smile-G3.
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>Zero Bias Guarantee:</strong> We carry CEC accreditation across multiple battery tier-1 manufacturers. This report offers unvarnished pros and cons for every model.
            </span>
          </div>
        </div>

        {/* Right Column: Instant Download Form */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-300 p-6 sm:p-8 shadow-lg sticky top-24">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900">Report Ready!</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                We have emailed your copy of <strong>"The 2025 Home Battery Decision Guide"</strong> to <span className="font-semibold text-slate-800">{formData.email}</span>.
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
                <Badge variant="amber" size="sm">Free Engineering Report</Badge>
                <h3 className="text-xl font-serif font-bold text-slate-950 mt-2">
                  Download the Comparison Guide
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your details to receive the complete PDF report immediately.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Michael Harris"
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
                    placeholder="michael@example.com.au"
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
                  placeholder="e.g. Burleigh 4220"
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
                  {isSubmitting ? 'Submitting to Web3Forms...' : 'Download Battery Guide (PDF)'}
                </Button>
              </div>

              <p className="text-[11px] text-slate-400 text-center pt-1">
                Instant delivery • 100% Free & Vendor-Neutral
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );

  return (
    <ResourcePageTemplate
      data={resourcesPageData.batteryDecisionGuide}
      mainComponent={mainComponent}
    />
  );
};

export default BatteryDecisionGuidePage;

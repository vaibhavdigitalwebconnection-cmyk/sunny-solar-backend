import React, { useState } from 'react';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { FileCheck, CheckCircle2, ShieldCheck, Mail, User, Phone, Upload, Clock, AlertCircle } from 'lucide-react';
import { submitToWeb3Forms, fileToBase64 } from '../../../utils/web3forms';
import { api } from '../../../services/api';
import { ResourcePageTemplate } from '../components/ResourcePageTemplate';
import { resourcesPageData } from '../data/resourcesData';

export const QuoteReviewPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    quoteDetails: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      let fileData: string | undefined;
      if (selectedFile && selectedFile.size <= 5 * 1024 * 1024) {
        try {
          fileData = await fileToBase64(selectedFile);
        } catch (fErr) {
          console.warn('File reading error:', fErr);
        }
      }

      // 1. Save to MongoDB database
      let backendSuccess = false;
      try {
        await api.createLead({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          suburb: formData.postcode,
          service: 'Competitor Quote Audit',
          message: formData.quoteDetails || '',
          sourcePage: 'Solar Quote Review Audit',
          fileName: selectedFile?.name || '',
          fileData,
        });
        backendSuccess = true;
      } catch (dbErr) {
        console.warn('Database lead notice:', dbErr);
      }

      // 2. Dispatch via Web3Forms
      const web3Payload: Record<string, any> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        postcode: formData.postcode,
        quote_details: formData.quoteDetails,
        page: 'Solar Quote Review Audit',
      };

      if (selectedFile) {
        web3Payload.attachment = selectedFile;
        web3Payload.attached_file_name = selectedFile.name;
      }

      const res = await submitToWeb3Forms(web3Payload, {
        subject: `New Solar Quote Audit Request - ${formData.name} (${formData.postcode})`,
        from_name: 'Sunny Solar Quote Review',
      });

      setIsSubmitting(false);
      if (res.success || backendSuccess) {
        setSubmitted(true);
      } else {
        setErrorMessage(res.message || 'Submission failed. Please try again.');
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage('Failed to send request. Please check your connection and try again.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const mainComponent = (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Recreated Engineering Audit Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-lg border border-slate-300 p-6 sm:p-8 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="emerald" size="sm">Independent Engineering Audit</Badge>
              <span className="text-xs font-semibold text-slate-500">• 24-Hour Turnaround • 100% Confidential</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950 tracking-tight mb-3">
              Never Sign a Solar Quote Without a Second Opinion
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Solar contracts are notoriously dense with technical specifications. Sales brokers frequently hide cut-rate string inverters behind reputable panel branding, or quote unrealistic production figures that ignore roof shade and tilt angles. Our senior master electricians give you a clear, line-item verdict.
            </p>

            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              What Our Free Audit Evaluates:
            </h3>

            <div className="space-y-3 pb-6 border-b border-slate-200">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Tier-1 Hardware Authentication:</strong> We verify whether the panels and inverters quoted are active on the Clean Energy Council approved list or risk being discontinued grey-market imports.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Price-Per-Watt Benchmark:</strong> We compare your total price (before and after federal STC discounts) against actual South East Queensland market medians.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Hidden Surcharge Identification:</strong> We identify vague clauses that permit the installer to add $1,000+ switchboard or steep roof pitch fees on installation day.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Generation & Sizing Realism:</strong> We run an independent solar irradiance simulation on your address to verify if the promised annual kWh generation is physically realistic.</span>
              </div>
            </div>

            {/* Turnaround Badge */}
            <div className="mt-6 flex items-start gap-3 bg-emerald-50/80 border border-emerald-200 rounded-lg p-4 text-xs text-emerald-900">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">Rapid 24-Hour Review Window:</span>
                We understand solar sales quotes often carry 7-day deadlines. Your review will be completed by a licensed Australian electrician within 1 business day.
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>Zero Sales Harassment Guarantee:</strong> This is a vendor-neutral review. We will never share your quote or contact details with third-party aggregators or sales sharks.
            </span>
          </div>
        </div>

        {/* Right Column: Quote Submission Form */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-300 p-6 sm:p-8 shadow-lg sticky top-24">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900">Quote Received!</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Our master electricians have received your quote submission. We will email your independent 1-page audit report to <span className="font-semibold text-slate-800">{formData.email}</span> within 24 hours.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => { setSubmitted(false); setSelectedFile(null); }}
                  className="text-xs text-amber-600 font-bold hover:underline cursor-pointer"
                >
                  Submit another quote
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Badge variant="emerald" size="sm">Free Independent Audit</Badge>
                <h3 className="text-xl font-serif font-bold text-slate-950 mt-2">
                  Upload Your Solar Quote
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Upload a PDF/photo or enter the company name and pricing below.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jason Taylor"
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
                    placeholder="jason@example.com.au"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Phone (Optional)</label>
                  <input
                    type="tel"
                    placeholder="0400 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Suburb / Postcode</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Varsity 4227"
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
              </div>

              {/* Upload Dropzone */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Upload Quote PDF or Photo</label>
                <label className="border-2 border-dashed border-slate-300 hover:border-amber-400 rounded-lg p-3 text-center block cursor-pointer bg-slate-50 transition-colors">
                  <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                  <span className="text-xs font-medium text-slate-600 block">
                    {selectedFile ? (
                      <span className="text-emerald-600 font-bold">{selectedFile.name}</span>
                    ) : (
                      'Click to attach quote file (PDF, JPG, PNG)'
                    )}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Or Paste Quote Details (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Installer name, total price, 6.6kW system with Sungrow inverter..."
                  value={formData.quoteDetails}
                  onChange={(e) => setFormData({ ...formData, quoteDetails: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>

              {errorMessage && (
                <div className="p-2 rounded bg-red-50 border border-red-200 text-red-600 text-xs text-center">
                  {errorMessage}
                </div>
              )}

              <div className="pt-1">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  disabled={isSubmitting}
                  icon={<FileCheck className="w-4 h-4" />}
                >
                  {isSubmitting ? 'Submitting to Web3Forms...' : 'Submit Quote for Free Audit'}
                </Button>
              </div>

              <p className="text-[11px] text-slate-400 text-center pt-1">
                100% Confidential • 24-hr turnaround • Zero sales pressure
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );

  return (
    <ResourcePageTemplate
      data={resourcesPageData.quoteReview}
      mainComponent={mainComponent}
    />
  );
};

export default QuoteReviewPage;

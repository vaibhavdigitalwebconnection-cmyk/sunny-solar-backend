import React, { useState } from 'react';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { FileSearch, CheckCircle2, ShieldCheck, Mail, User, Phone, Upload, TrendingDown, DollarSign } from 'lucide-react';
import { submitToWeb3Forms, fileToBase64 } from '../../../utils/web3forms';
import { api } from '../../../services/api';
import { ResourcePageTemplate } from '../components/ResourcePageTemplate';
import { resourcesPageData } from '../data/resourcesData';

export const ElectricityBillReviewPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    quarterlyBill: '$600 - $900',
    notes: '',
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
          service: `Electricity Bill Audit (${formData.quarterlyBill})`,
          message: formData.notes || '',
          sourcePage: 'Electricity Bill Review Page',
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
        quarterly_bill: formData.quarterlyBill,
        notes: formData.notes || 'None provided',
        page: 'Electricity Bill Review Page',
      };

      if (selectedFile) {
        web3Payload.attachment = selectedFile;
        web3Payload.attached_bill_filename = selectedFile.name;
      }

      const res = await submitToWeb3Forms(web3Payload, {
        subject: `New Electricity Bill Review Request - ${formData.name} (${formData.postcode})`,
        from_name: 'Sunny Solar Bill Review',
      });

      setIsSubmitting(false);
      if (res.success || backendSuccess) {
        setSubmitted(true);
      } else {
        setErrorMessage(res.message || 'Error submitting request. Please try again.');
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
        {/* Left Column: Recreated Bill Analysis Overview */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-lg border border-slate-300 p-6 sm:p-8 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="amber" size="sm">Interactive Bill Assessment</Badge>
              <span className="text-xs font-semibold text-slate-500">• Tailored Report • 100% Free</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950 tracking-tight mb-3">
              Turn Your Power Bill Into An Accurate Sizing Model
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Cookie-cutter 6.6 kW solar systems waste energy if your household consumes the bulk of its power after dark. By inspecting your real NMI meter intervals or quarterly power bill, our engineers show you exactly when your household uses electricity and how to eliminate the most expensive peak rates.
            </p>

            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <FileSearch className="w-4 h-4 text-amber-500" />
              What You Will Receive In Your Free Analysis:
            </h3>

            <div className="space-y-3 pb-6 border-b border-slate-200">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Daily Consumption Baseline:</strong> Exact daily average kWh usage calculated across seasonal summer air-conditioning and winter baseline periods.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Peak Tariff Penalty Breakdown:</strong> Identification of 36–42¢/kWh peak pricing traps on your current retailer plan (e.g. Origin, AGL, EnergyAustralia).</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Accurate Solar kW & Battery kWh Recommendation:</strong> A customized system size designed to maximize self-consumption and avoid paying for unneeded hardware.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Projected 1-Year & 10-Year Net Savings:</strong> Realistic dollar savings models incorporating solar degradation and retailer inflation rates.</span>
              </div>
            </div>

            {/* Savings Callout */}
            <div className="mt-6 flex items-start gap-3 bg-emerald-50/80 border border-emerald-200 rounded-lg p-4 text-xs text-emerald-900">
              <TrendingDown className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">Average Household Outcome:</span>
                Gold Coast and Brisbane homeowners who right-size their solar and battery based on real bill data cut grid power expenses by an average of 85% to 94%.
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>Zero Obligation & Privacy Guaranteed:</strong> We use your bill solely to calculate your load profile. Your information is never sold or shared.
            </span>
          </div>
        </div>

        {/* Right Column: Bill Submission Form */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-300 p-6 sm:p-8 shadow-lg sticky top-24">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900">Bill Analysis Underway!</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you! Our engineering team is calculating your usage baseline. We'll email your customized system sizing and savings report to <span className="font-semibold text-slate-800">{formData.email}</span> within 24 hours.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => { setSubmitted(false); setSelectedFile(null); }}
                  className="text-xs text-amber-600 font-bold hover:underline cursor-pointer"
                >
                  Submit another bill
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Badge variant="amber" size="sm">Free Personalized Assessment</Badge>
                <h3 className="text-xl font-serif font-bold text-slate-950 mt-2">
                  Submit Your Bill For Review
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Upload a PDF/photo or select your approximate quarterly spend.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Emma Watson"
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
                    placeholder="emma@example.com.au"
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
                    placeholder="e.g. Coomera 4209"
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Average Quarterly Power Bill</label>
                <select
                  value={formData.quarterlyBill}
                  onChange={(e) => setFormData({ ...formData, quarterlyBill: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                >
                  <option value="Under $400">Under $400 / quarter</option>
                  <option value="$400 - $600">$400 - $600 / quarter</option>
                  <option value="$600 - $900">$600 - $900 / quarter</option>
                  <option value="$900 - $1,400">$900 - $1,400 / quarter</option>
                  <option value="$1,400+">$1,400+ / quarter (High Usage)</option>
                </select>
              </div>

              {/* Upload Dropzone */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Upload Bill (PDF or Photo)</label>
                <label className="border-2 border-dashed border-slate-300 hover:border-amber-400 rounded-lg p-3 text-center block cursor-pointer bg-slate-50 transition-colors">
                  <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                  <span className="text-xs font-medium text-slate-600 block">
                    {selectedFile ? (
                      <span className="text-emerald-600 font-bold">{selectedFile.name}</span>
                    ) : (
                      'Click to attach electricity bill file (PDF, JPG, PNG)'
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
                  icon={<FileSearch className="w-4 h-4" />}
                >
                  {isSubmitting ? 'Submitting to Web3Forms...' : 'Submit Bill for Free Review'}
                </Button>
              </div>

              <p className="text-[11px] text-slate-400 text-center pt-1">
                100% Confidential • Fast turnaround • No sales harassment
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );

  return (
    <ResourcePageTemplate
      data={resourcesPageData.electricityBillReview}
      mainComponent={mainComponent}
    />
  );
};

export default ElectricityBillReviewPage;

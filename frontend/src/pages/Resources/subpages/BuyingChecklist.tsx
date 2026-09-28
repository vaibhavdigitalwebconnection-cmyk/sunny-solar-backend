import React, { useState } from 'react';
import { 
  Check, 
  Download, 
  ShieldCheck, 
  Mail, 
  User, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { generateBuyingChecklistPdf, ChecklistItemData } from '../../../utils/generateChecklistPdf';
import { submitToWeb3Forms } from '../../../utils/web3forms';
import { ResourcePageTemplate } from '../components/ResourcePageTemplate';
import { resourcesPageData } from '../data/resourcesData';

export const CHECKLIST_ITEMS: ChecklistItemData[] = [
  {
    id: 'c1',
    category: 'Contract & Pricing',
    title: 'Is the quote fully fixed with zero variation clauses?',
    description: 'Ensure switchboard upgrades and steep roof pitch fees are explicitly included in writing.',
  },
  {
    id: 'c2',
    category: 'Installer Credentials',
    title: 'Does the company use in-house master electricians?',
    description: 'Avoid retailers who auction your installation contract off to cut-rate third-party sub-contractors.',
  },
  {
    id: 'c3',
    category: 'Installer Credentials',
    title: 'Is the installer CEC Accredited (Clean Energy Council)?',
    description: "Ask for the electrician's personal CEC accreditation number and verify it on the official national registry.",
  },
  {
    id: 'c4',
    category: 'Hardware & Design',
    title: 'Are solar panels genuine Tier-1 BloombergNEF modules?',
    description: 'Confirm N-Type TOPCon technology and proven inverters with direct Australian technical support offices.',
  },
];

export const BuyingChecklistPage: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    c1: true,
    c2: true,
    c4: true,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadInfo, setDownloadInfo] = useState<{ url: string; filename: string } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    postcode: '',
  });

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = CHECKLIST_ITEMS.length;
  const progressPercent = Math.round((checkedCount / totalCount) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const result = generateBuyingChecklistPdf({
        formData,
        items: CHECKLIST_ITEMS,
        checkedMap: checkedItems,
      });

      setDownloadInfo({
        url: result.url,
        filename: result.filename,
      });
      setSubmitted(true);

      // Submit lead to Web3Forms email
      submitToWeb3Forms({
        name: formData.name,
        email: formData.email,
        postcode: formData.postcode,
        verified_count: `${checkedCount} of ${totalCount} (${progressPercent}%)`,
        page: 'Buying Checklist PDF Download',
      }, {
        subject: `New Buying Checklist Download - ${formData.name} (${formData.postcode})`,
        from_name: 'Sunny Solar Resources',
      }).catch((err) => console.error('Web3Forms lead error:', err));
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadAgain = () => {
    const result = generateBuyingChecklistPdf({
      formData,
      items: CHECKLIST_ITEMS,
      checkedMap: checkedItems,
    });
    setDownloadInfo({
      url: result.url,
      filename: result.filename,
    });
  };

  const handleOpenPdf = () => {
    if (downloadInfo?.url) {
      window.open(downloadInfo.url, '_blank');
    } else {
      const result = generateBuyingChecklistPdf({
        formData,
        items: CHECKLIST_ITEMS,
        checkedMap: checkedItems,
      });
      window.open(result.url, '_blank');
    }
  };

  const mainComponent = (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="p-4 sm:p-8">
        {/* Simple & Premium Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-950 tracking-tight">
              Critical Questions to Vet Any Solar Quote
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-lg border border-slate-200 shadow-2xs self-start lg:self-auto shrink-0">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Printable Checklist (PDF)</span>
              <span className="text-[11px] text-slate-500 font-medium">Free instant download</span>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Interactive Questions (Left) + Minimal Premium Download (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: Interactive Checklist */}
          <div className="lg:col-span-7 space-y-4">
            {/* Interactive Progress Bar */}
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Interactive Vetting Progress
                </span>
                <span className="text-sm font-semibold text-slate-600">
                  {checkedCount} of {totalCount} critical criteria verified ({progressPercent}%)
                </span>
              </div>
              <div className="w-full sm:w-48 bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-3">
              {CHECKLIST_ITEMS.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`cursor-pointer rounded-lg border p-4 sm:p-4.5 transition-all duration-200 flex items-start gap-3.5 select-none ${
                      isChecked 
                        ? 'bg-amber-50/40 border-amber-300/90 shadow-2xs' 
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-2xs'
                    }`}
                  >
                    {/* Checkbox Icon */}
                    <div 
                      className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center shrink-0 border transition-all ${
                        isChecked 
                          ? 'bg-amber-500 border-amber-500 text-white' 
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                    </div>

                    <div className="flex-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 block mb-0.5">
                        {item.category}
                      </span>
                      <h4 className={`text-sm sm:text-base font-serif font-bold ${isChecked ? 'text-slate-900' : 'text-slate-800'}`}>
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Sleek Download Card */}
          <div className="lg:col-span-5 bg-white rounded-lg border border-slate-300 p-6 sm:p-8 shadow-lg lg:sticky lg:top-24">
            {submitted ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900">Checklist Downloaded!</h3>
                  <p className="text-xs text-emerald-700 font-medium mt-1">
                    Generated with your live answers ({checkedCount} of {totalCount} verified)
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-left text-xs space-y-1.5 text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Prepared For:</span>
                    <span className="font-bold text-slate-900">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Email:</span>
                    <span className="font-bold text-slate-900">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Suburb / Postcode:</span>
                    <span className="font-bold text-slate-900">{formData.postcode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Document:</span>
                    <span className="font-bold text-amber-700">Printable Checklist (PDF)</span>
                  </div>
                </div>

                <div className="pt-2 space-y-2.5">
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    fullWidth
                    icon={<Download className="w-4 h-4" />}
                    onClick={handleDownloadAgain}
                    className="shadow-md hover:shadow-lg transition-all"
                  >
                    Download PDF Again
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    fullWidth
                    icon={<ExternalLink className="w-4 h-4" />}
                    onClick={handleOpenPdf}
                    className="border-slate-300 text-slate-700 hover:bg-slate-100 transition-all"
                  >
                    Open / Print PDF in Browser
                  </Button>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-amber-600 font-bold hover:underline cursor-pointer"
                  >
                    Edit details or verify more criteria
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Free Instant Download</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-950 mt-2.5">
                    Get the Printable Checklist (PDF)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Personalized with your audit answers, contact details, and the critical questions to vet any solar quote.
                  </p>
                </div>

                <div className="pt-2 space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. David Miller"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
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
                        placeholder="david@example.com.au"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Suburb / Postcode</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Southport 4215"
                      value={formData.postcode}
                      onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={isGenerating}
                    icon={<Download className="w-4 h-4" />}
                    className="shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    {isGenerating ? 'Generating PDF...' : 'Download Free Checklist (PDF)'}
                  </Button>
                </div>

                <div className="pt-2 text-center text-[11px] text-slate-400 space-y-1">
                  <p>Instant PDF access • 100% Free • Includes your checked criteria</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <ResourcePageTemplate
      data={resourcesPageData.buyingChecklist}
      mainComponent={mainComponent}
    />
  );
};

export default BuyingChecklistPage;

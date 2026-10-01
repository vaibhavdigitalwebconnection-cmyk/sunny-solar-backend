import React, { useState, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  User,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  UploadCloud,
  X,
  Copy,
  Check,
  Loader2,
  Clock,
  Sparkles,
  Paperclip,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BorderBeam } from '../../../components/ui/BorderBeam';
import { AnimatedGridPattern } from '../../../components/ui/AnimatedGridPattern';
import { Particles } from '../../../components/ui/Particles';
import { Meteors } from '../../../components/ui/Meteors';
import { cn } from '../../../lib/utils';
import { submitToWeb3Forms, fileToBase64 } from '../../../utils/web3forms';
import { api } from '../../../services/api';
import { Toast } from '../../../components/ui/Toast';

interface FormState {
  name: string;
  phone: string;
  email: string;
  suburb: string;
  service: string;
  bill: string;
  message: string;
}

const SERVICE_OPTIONS = [
  'Solar + Battery Bundle',
  'Solar Installation Only',
  'Battery Storage Retrofit',
  'Commercial Solar / Upgrade',
];

const BILL_OPTIONS = [
  'Under $500 / quarter',
  '$500 – $900 / quarter',
  '$900 – $1,500 / quarter',
  '$1,500+ / quarter',
];

export const FreeAssessmentFormSection: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Form inputs
  const [formData, setFormData] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    suburb: '',
    service: 'Solar + Battery Bundle',
    bill: '$500 – $900 / quarter',
    message: '',
  });

  const [billFile, setBillFile] = useState<File | null>(null);
  const [showExtras, setShowExtras] = useState<boolean>(false);

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [referenceId, setReferenceId] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');
  const [copiedRef, setCopiedRef] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const validateField = (field: keyof FormState, val: string): string => {
    switch (field) {
      case 'name':
        if (!val.trim()) return 'Full name is required.';
        if (val.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';
      case 'phone': {
        const raw = val.trim().replace(/\D/g, '');
        if (!raw) return 'Phone number is required.';
        if (raw.length < 8 || raw.length > 15) {
          return 'Enter a valid phone number (e.g. 0412 345 678).';
        }
        return '';
      }
      case 'email':
        if (!val.trim()) return 'Email address is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) {
          return 'Please enter a valid email address.';
        }
        return '';
      case 'suburb':
        if (!val.trim()) return 'Suburb or postcode is required.';
        if (val.trim().length < 2) return 'Please enter your suburb or postcode.';
        return '';
      default:
        return '';
    }
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, formData[field]),
    }));
  };

  const handleChange = (field: keyof FormState, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, val) }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 15 * 1024 * 1024) {
        alert('File size exceeds 15MB limit.');
        return;
      }
      setBillFile(file);
    }
  };

  const removeBillFile = () => {
    setBillFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    const nameErr = validateField('name', formData.name);
    const phoneErr = validateField('phone', formData.phone);
    const emailErr = validateField('email', formData.email);
    const suburbErr = validateField('suburb', formData.suburb);

    setTouched({ name: true, phone: true, email: true, suburb: true });
    setErrors({ name: nameErr, phone: phoneErr, email: emailErr, suburb: suburbErr });

    if (nameErr || phoneErr || emailErr || suburbErr) return;

    setIsSubmitting(true);
    const refCode = `QLD-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceId(refCode);

    try {
      let fileData = '';
      if (billFile) {
        try {
          fileData = await fileToBase64(billFile);
        } catch {
          // ignore base64 errors
        }
      }

      const fullMessage = [
        `Service: ${formData.service}`,
        `Bill Tier: ${formData.bill}`,
        formData.message ? `Notes: ${formData.message}` : '',
      ]
        .filter(Boolean)
        .join(' | ');

      let backendSuccess = false;
      try {
        await api.createLead({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          suburb: formData.suburb.trim(),
          service: formData.service,
          consultType: 'Free Assessment Form',
          message: fullMessage,
          referenceId: refCode,
          sourcePage: 'Free Assessment Page',
          fileName: billFile?.name || '',
          fileData,
        });
        backendSuccess = true;
      } catch (err) {
        console.warn('Backend lead notice:', err);
      }

      const web3Payload: Record<string, any> = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        suburb: formData.suburb.trim(),
        service: formData.service,
        quarterly_bill: formData.bill,
        message: fullMessage,
        reference_id: refCode,
        page: 'Free Assessment Page Contact Form',
      };

      if (billFile) {
        web3Payload.attachment = billFile;
        web3Payload.bill_file = `${billFile.name} (${(billFile.size / 1024).toFixed(1)} KB)`;
      }

      const res = await submitToWeb3Forms(web3Payload, {
        subject: `Assessment Request: ${formData.name} (${formData.suburb}) [${refCode}]`,
        from_name: 'Sunny Solar Assessment',
      });

      setIsSubmitting(false);

      if (res.success || backendSuccess) {
        setSubmitted(true);
        setToastMessage(`Thank you, ${formData.name}! Your request has been confirmed.`);
        setShowToast(true);
      } else {
        setSubmitError(res.message || 'Could not send request. Please try again.');
      }
    } catch {
      setIsSubmitting(false);
      setSubmitError('Network error. Please check your connection and retry.');
    }
  };

  const copyRef = () => {
    if (referenceId) {
      navigator.clipboard.writeText(referenceId);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      suburb: '',
      service: 'Solar + Battery Bundle',
      bill: '$500 – $900 / quarter',
      message: '',
    });
    setBillFile(null);
    setShowExtras(false);
    setErrors({});
    setTouched({});
    setReferenceId('');
  };

  return (
    <section className="relative py-12 sm:py-20 bg-linear-to-b from-[#F6F9FD] via-white to-slate-50 border-b border-slate-200/80 overflow-hidden">
      {/* ── MAGIC UI ANIMATED BACKGROUND ── */}
      {/* 1. Magic UI Meteors: Diagonal shooting solar light streaks */}
      <Meteors number={20} angle={215} />

      {/* 2. Magic UI AnimatedGridPattern: Pulsing SVG solar grid cells with radial fade mask */}
      <AnimatedGridPattern
        numSquares={36}
        maxOpacity={0.15}
        duration={3.5}
        repeatDelay={0.8}
        className={cn(
          'mask-[radial-gradient(ellipse_85%_75%_at_50%_45%,#000_25%,transparent_100%)]',
          'absolute inset-0 h-full w-full opacity-60 text-[#2B3CB8]'
        )}
      />

      {/* 3. Magic UI Floating Particles: Drifting solar photon energy sparks */}
      <Particles
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        quantity={32}
        color="#2B3CB8"
        size={0.6}
      />

      {/* 4. Ambient Solar Aura Halos: Pulsing subtle light gradients */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#2B3CB8]/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#ED4F11]/10 rounded-full blur-3xl pointer-events-none animate-pulse"
        style={{ animationDuration: '6s' }}
      />
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        title="Assessment Confirmed"
        message={toastMessage}
        referenceId={referenceId}
        type="success"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Card: Left Form, Right Image */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden relative">
          <BorderBeam size={220} duration={12} colorFrom="#2B3CB8" colorTo="#ED4F11" borderWidth={2} />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* ── LEFT SIDE: Normal Form with All Validation (7 cols) ── */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              {submitted ? (
                /* Success View */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 font-serif">Assessment Request Confirmed</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-md mx-auto">
                      Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our local engineering team is analyzing your property at{' '}
                      <strong className="text-slate-900">{formData.suburb}</strong>.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 max-w-xs mx-auto flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Reference Code</span>
                      <span className="text-base font-mono font-bold text-[#2B3CB8]">{referenceId}</span>
                    </div>
                    <button
                      type="button"
                      onClick={copyRef}
                      className="px-2.5 py-1.5 rounded-md text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedRef ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href="tel:1300030479"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#2B3CB8] text-white text-xs font-bold hover:bg-[#1D2984] transition-colors shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call 1300 030 479</span>
                    </a>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Normal Form */
                <div>
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-[#2B3CB8] bg-blue-50 border border-blue-100 mb-2">
                      <Sparkles className="w-3 h-3 text-[#ED4F11]" />
                      <span>Free Engineering Quote • SAA Lic #38192</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                      Request Your Free Assessment
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Get a personalized 3D satellite roof model and honest payback numbers within 24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {submitError && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                        {submitError}
                      </div>
                    )}

                    {/* Service Selection */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        I am interested in:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {SERVICE_OPTIONS.map((svc) => {
                          const isSelected = formData.service === svc;
                          return (
                            <button
                              key={svc}
                              type="button"
                              onClick={() => handleChange('service', svc)}
                              className={`py-2 px-2.5 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-[#2B3CB8] bg-[#2B3CB8] text-white shadow-xs'
                                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              {svc.split(' ')[0]} {svc.split(' ')[1] || ''}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 2-Column Inputs: Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            onBlur={() => handleBlur('name')}
                            placeholder="e.g. John Smith"
                            className={`w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-hidden transition-all ${
                              errors.name && touched.name
                                ? 'border-rose-400 focus:ring-1 focus:ring-rose-400'
                                : 'border-slate-200 focus:border-[#2B3CB8] focus:ring-1 focus:ring-[#2B3CB8]'
                            }`}
                          />
                        </div>
                        {errors.name && touched.name && (
                          <p className="text-[10px] text-rose-500 mt-1">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Mobile Phone <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            onBlur={() => handleBlur('phone')}
                            placeholder="e.g. 0412 345 678"
                            className={`w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-hidden transition-all ${
                              errors.phone && touched.phone
                                ? 'border-rose-400 focus:ring-1 focus:ring-rose-400'
                                : 'border-slate-200 focus:border-[#2B3CB8] focus:ring-1 focus:ring-[#2B3CB8]'
                            }`}
                          />
                        </div>
                        {errors.phone && touched.phone && (
                          <p className="text-[10px] text-rose-500 mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* 2-Column Inputs: Email & Suburb */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            onBlur={() => handleBlur('email')}
                            placeholder="e.g. john@example.com"
                            className={`w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-hidden transition-all ${
                              errors.email && touched.email
                                ? 'border-rose-400 focus:ring-1 focus:ring-rose-400'
                                : 'border-slate-200 focus:border-[#2B3CB8] focus:ring-1 focus:ring-[#2B3CB8]'
                            }`}
                          />
                        </div>
                        {errors.email && touched.email && (
                          <p className="text-[10px] text-rose-500 mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Suburb & Postcode <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            required
                            value={formData.suburb}
                            onChange={(e) => handleChange('suburb', e.target.value)}
                            onBlur={() => handleBlur('suburb')}
                            placeholder="e.g. Robina 4226"
                            className={`w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-hidden transition-all ${
                              errors.suburb && touched.suburb
                                ? 'border-rose-400 focus:ring-1 focus:ring-rose-400'
                                : 'border-slate-200 focus:border-[#2B3CB8] focus:ring-1 focus:ring-[#2B3CB8]'
                            }`}
                          />
                        </div>
                        {errors.suburb && touched.suburb && (
                          <p className="text-[10px] text-rose-500 mt-1">{errors.suburb}</p>
                        )}
                      </div>
                    </div>

                    {/* Quarterly Bill */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Average Quarterly Power Bill:
                      </label>
                      <select
                        value={formData.bill}
                        onChange={(e) => handleChange('bill', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#2B3CB8] focus:ring-1 focus:ring-[#2B3CB8] focus:outline-hidden transition-all"
                      >
                        {BILL_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Optional: Bill Attachment & Notes */}
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => setShowExtras(!showExtras)}
                        className="text-[11px] font-semibold text-[#2B3CB8] hover:text-[#1D2984] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Paperclip className="w-3 h-3" />
                        <span>{showExtras ? 'Hide optional bill upload & message' : '+ Attach power bill or add message (optional)'}</span>
                      </button>

                      <AnimatePresence>
                        {showExtras && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden pt-2 space-y-2"
                          >
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept=".pdf,image/*"
                              onChange={handleFileChange}
                              className="hidden"
                            />

                            {billFile ? (
                              <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50 border border-blue-200 text-xs">
                                <span className="truncate pr-2 font-medium text-slate-800">
                                  📄 {billFile.name} ({(billFile.size / 1024).toFixed(0)} KB)
                                </span>
                                <button
                                  type="button"
                                  onClick={removeBillFile}
                                  className="text-slate-400 hover:text-rose-600 cursor-pointer p-0.5"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full py-2 px-3 rounded-lg border border-dashed border-slate-300 hover:border-[#2B3CB8] text-xs text-slate-600 flex items-center justify-center gap-1.5 bg-slate-50/50 hover:bg-blue-50/30 cursor-pointer transition-all"
                              >
                                <UploadCloud className="w-3.5 h-3.5 text-[#2B3CB8]" />
                                <span>Upload bill PDF or photo (for precise system sizing)</span>
                              </button>
                            )}

                            <textarea
                              rows={2}
                              value={formData.message}
                              onChange={(e) => handleChange('message', e.target.value)}
                              placeholder="Any specific questions? (e.g. tile roof, 3-phase, EV charger)..."
                              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#2B3CB8] focus:ring-1 focus:ring-[#2B3CB8] focus:outline-hidden"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-linear-to-r from-[#2B3CB8] via-[#1D2984] to-[#0C123E] hover:from-[#1D2984] hover:to-[#0C123E] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending Your Request...</span>
                          </>
                        ) : (
                          <>
                            <span>Get My Free Assessment Quote</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1.5 pt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>100% Free & Obligation-Free • Zero Spam • Privacy Protected</span>
                    </p>
                  </form>
                </div>
              )}
            </div>

            {/* ── RIGHT SIDE: Image Only + Direct Help Card (5 cols) ── */}
            <div className="lg:col-span-5 bg-linear-to-b from-[#F6F9FD] via-blue-50/40 to-slate-50  flex flex-col justify-between items-center border-t lg:border-t-0 lg:border-l border-slate-200/80">
              <div className="w-full flex flex-col items-center">
                {/* Illustration with modern frame */}
                <div className="w-full max-w-xl rounded-tr-2xl overflow-hidden bg-white  shadow-md border border-slate-200/80">
                  <img
                    src="/images/contact-advisor.jpg"
                    alt="Sunny Solar Consultant Assistance"
                    className="w-full h-auto object-contain rounded-xl"
                    loading="lazy"
                  />
                </div>

                {/* Micro consultation points below image */}
                <div className="mt-5 p-2 w-full space-y-2">
                  <div className="flex items-center gap-2.5 text-xs text-slate-700 bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-slate-200/60 shadow-2xs">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 leading-tight">Master Electrician Designed</p>
                      <p className="text-[10px] text-slate-500">Engineered by Trent Palmer, not sales reps</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-slate-700 bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-slate-200/60 shadow-2xs">
                    <div className="w-7 h-7 rounded-lg bg-[#2B3CB8]/10 text-[#2B3CB8] flex items-center justify-center shrink-0 font-bold text-xs">
                      <Clock className="w-3.5 h-3.5 text-[#2B3CB8]" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 leading-tight">Fast 24-Hour Turnaround</p>
                      <p className="text-[10px] text-slate-500">Detailed 3D satellite roof model & quote</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Call Hotline Card */}
              <div className="mt-6 w-full p-4 rounded-br-2xl bg-linear-to-r from-[#0C123E] to-[#1D2984] text-white shadow-md flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                    Prefer To Talk Now?
                  </span>
                  <p className="text-xs text-slate-300">Speak directly with our team</p>
                  <a
                    href="tel:1300030479"
                    className="text-base font-extrabold text-white hover:text-amber-400 transition-colors block mt-0.5"
                  >
                    1300 030 479
                  </a>
                </div>

                <a
                  href="tel:1300030479"
                  className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 hover:scale-105 transition-transform shadow-md"
                  aria-label="Call Sunny Solar"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeAssessmentFormSection;

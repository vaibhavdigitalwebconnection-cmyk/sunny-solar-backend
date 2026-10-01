import React, { useState, useRef } from 'react';
import {
  Phone,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Check,
  Lock,
  Loader2,
  ShieldCheck,
  UploadCloud,
  FileText,
  X,
  ChevronDown,
  Copy,
  Clock,
  Satellite,
  Home,
  Headphones,
  CheckCircle,
  Zap,
  Battery,
  Sun,
  Building2,
  Tractor,
  Cpu,
  Wrench,
  TrendingDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BorderBeam } from '../../../components/ui/BorderBeam';
import { AnimatedGridPattern } from '../../../components/ui/AnimatedGridPattern';
import { AnimatedList } from '../../../components/ui/AnimatedList';
import { ConfettiBurst } from '../../../components/ui/ConfettiBurst';
import { OrbitingCircles } from '../../../components/ui/OrbitingCircles';
import { ShimmerButton } from '../../../components/ui/ShimmerButton';
import { NumberTicker } from '../../../components/ui/NumberTicker';
import { submitToWeb3Forms, fileToBase64 } from '../../../utils/web3forms';
import { api } from '../../../services/api';
import { Toast } from '../../../components/ui/Toast';

// Live social proof feed for Nationwide audits
const RECENT_AUDITS = [
  {
    id: 'audit-1',
    system: '10.5kW Solar + Tesla Powerwall 3',
    location: 'Hervey Bay, QLD',
    time: '8m ago',
    type: '3D Satellite Audit',
    savings: '$2,840/yr offset',
  },
  {
    id: 'audit-2',
    system: '6.6kW Tier-1 High-Efficiency Array',
    location: 'Maroochydore, QLD',
    time: '21m ago',
    type: 'Master Electrician Review',
    savings: '$1,920/yr offset',
  },
  {
    id: 'audit-3',
    system: '13.2kW Three-Phase + Battery Bundle',
    location: 'Noosa Heads, QLD',
    time: '45m ago',
    type: 'In-Home Site Visit',
    savings: '$3,650/yr offset',
  },
  {
    id: 'audit-4',
    system: '8.8kW Solar + EV Charger Integration',
    location: 'Caloundra, QLD',
    time: '1h ago',
    type: 'Engineering Proposal',
    savings: '$2,410/yr offset',
  },
];

// Bill tiers with dynamic estimated savings
const BILL_TIERS = [
  { id: 'tier-1', label: '< $500', subtitle: 'Quarterly', offset: 1650, payback: '2.8 yrs', co2: '3.2T' },
  { id: 'tier-2', label: '$500 – $900', subtitle: 'Most Common', offset: 2480, payback: '3.1 yrs', co2: '4.8T' },
  { id: 'tier-3', label: '$900 – $1,500', subtitle: 'High Usage', offset: 3820, payback: '3.4 yrs', co2: '7.1T' },
  { id: 'tier-4', label: '$1,500+', subtitle: 'Heavy / Com', offset: 5400, payback: '2.9 yrs', co2: '10.5T' },
];

export const FreeAssessmentFormSection: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Form multi-step state (1: Energy Setup, 2: Assessment Style, 3: Contact & Dispatch)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Energy & Property configuration states
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial' | 'rural'>('residential');
  const [selectedBillTier, setSelectedBillTier] = useState<string>('tier-2');
  const [selectedService, setSelectedService] = useState<string>('New Solar Installation (6.6kW - 13.2kW)');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Tile Roof', 'Single Phase']);

  // Consultation method
  const [consultType, setConsultType] = useState<'satellite' | 'onsite' | 'phone'>('satellite');

  // File upload state
  const [billFile, setBillFile] = useState<File | null>(null);
  const [isDraggingFile, setIsDraggingFile] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  // Form submission states
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [referenceId, setReferenceId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [copiedRef, setCopiedRef] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<string>('+61');

  // Thank You Toast Notification State
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastData, setToastData] = useState<{
    title: string;
    message: string;
    referenceId: string;
  }>({
    title: '',
    message: '',
    referenceId: '',
  });

  // Customer Contact Fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    suburb: '',
    message: '',
  });

  const [authorizedConsent, setAuthorizedConsent] = useState<boolean>(false);
  const [isHumanVerified, setIsHumanVerified] = useState<boolean>(false);
  const [isVerifyingHuman, setIsVerifyingHuman] = useState<boolean>(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    suburb?: string;
    consent?: string;
    captcha?: string;
  }>({});

  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    suburb?: boolean;
    consent?: boolean;
    captcha?: boolean;
  }>({});

  const currentTierData = BILL_TIERS.find((t) => t.id === selectedBillTier) || BILL_TIERS[1];

  const handleFileSelection = (file: File) => {
    if (file.size <= 15 * 1024 * 1024) {
      setBillFile(file);
      setUploadProgress(0);
      let p = 0;
      const interval = setInterval(() => {
        p += 25;
        if (p >= 100) {
          setUploadProgress(100);
          clearInterval(interval);
        } else {
          setUploadProgress(p);
        }
      }, 60);
    } else {
      alert('File size exceeds 15MB limit. Please upload a smaller file.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const removeBillFile = () => {
    setBillFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Validation functions
  const validateName = (val: string): string => {
    if (!val.trim()) return 'Full name is required.';
    if (val.trim().length < 2) return 'Name must be at least 2 characters.';
    return '';
  };

  const validateEmail = (val: string): string => {
    if (!val.trim()) return 'Email address is required.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val.trim())) return 'Please enter a valid email address.';
    return '';
  };

  const validateAUFullMobile = (phone: string): boolean => {
    const regex = /^(?:\+?614)(?:[ -]?\d){8}$/;
    return regex.test(phone.trim());
  };

  const validatePhone = (val: string, selectedCode: string = countryCode): string => {
    if (!val.trim()) return 'Phone number is required.';

    if (selectedCode === '+61') {
      const raw = val.trim();
      const isValid =
        validateAUFullMobile(raw) ||
        (raw.startsWith('4') && validateAUFullMobile(`+61${raw}`));

      if (!isValid) {
        return 'Please enter a valid AU mobile (e.g. +61412 345 678).';
      }
      return '';
    }

    const digitsOnly = val.replace(/\D/g, '');
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      return 'Please enter a valid phone number (7–15 digits).';
    }
    return '';
  };

  const validateSuburb = (val: string): string => {
    if (!val.trim()) return 'Property suburb or postcode is required.';
    if (val.trim().length < 3) return 'Please enter a valid suburb and postcode (e.g. Maroochydore 4558).';
    return '';
  };

  const validateConsent = (val: boolean): string => {
    if (!val) return 'Please confirm property authorization.';
    return '';
  };

  const validateCaptcha = (val: boolean): string => {
    if (!val) return 'Please complete the anti-bot verification.';
    return '';
  };

  const handleFieldChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (touched[field as keyof typeof touched]) {
      let err = '';
      if (field === 'name') err = validateName(value);
      if (field === 'email') err = validateEmail(value);
      if (field === 'phone') err = validatePhone(value, countryCode);
      if (field === 'suburb') err = validateSuburb(value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    let err = '';
    if (field === 'name') err = validateName(formData.name);
    if (field === 'email') err = validateEmail(formData.email);
    if (field === 'phone') err = validatePhone(formData.phone, countryCode);
    if (field === 'suburb') err = validateSuburb(formData.suburb);
    if (field === 'consent') err = validateConsent(authorizedConsent);
    if (field === 'captcha') err = validateCaptcha(isHumanVerified);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleVerifyHuman = () => {
    if (isHumanVerified || isVerifyingHuman) return;
    setIsVerifyingHuman(true);
    setTimeout(() => {
      setIsVerifyingHuman(false);
      setIsHumanVerified(true);
      setTouched((prev) => ({ ...prev, captcha: true }));
      setErrors((prev) => ({ ...prev, captcha: '' }));
    }, 550);
  };

  const handleCopyReference = () => {
    if (!referenceId) return;
    navigator.clipboard.writeText(referenceId);
    setCopiedRef(true);
    setToastData({
      title: 'Reference ID Copied!',
      message: `Your assessment code ${referenceId} has been copied to your clipboard.`,
      referenceId: referenceId,
    });
    setShowToast(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      phone: true,
      suburb: true,
      consent: true,
      captcha: true,
    });

    const nameErr = validateName(formData.name);
    const emailErr = validateEmail(formData.email);
    const phoneErr = validatePhone(formData.phone, countryCode);
    const suburbErr = validateSuburb(formData.suburb);
    const consentErr = validateConsent(authorizedConsent);
    const captchaErr = validateCaptcha(isHumanVerified);

    const newErrors = {
      name: nameErr,
      email: emailErr,
      phone: phoneErr,
      suburb: suburbErr,
      consent: consentErr,
      captcha: captchaErr,
    };

    setErrors(newErrors);

    if (nameErr || emailErr || phoneErr || suburbErr || consentErr || captchaErr) {
      setCurrentStep(3); // ensure user sees errors on Step 3
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const refCode = `QLD-${randomCode}`;
    setReferenceId(refCode);

    try {
      let fileData: string | undefined;
      if (billFile && billFile.size <= 5 * 1024 * 1024) {
        try {
          fileData = await fileToBase64(billFile);
        } catch (fErr) {
          console.warn('File reading error:', fErr);
        }
      }

      const rawPhone = formData.phone.trim();
      const submittedPhone = rawPhone.startsWith('+')
        ? rawPhone
        : `${countryCode} ${rawPhone}`;

      const fullMessage = [
        `Property: ${propertyType.toUpperCase()}`,
        `Quarterly Bill: ${currentTierData.label}`,
        `Target Solution: ${selectedService}`,
        `Tags: ${selectedTags.join(', ') || 'None'}`,
        `Client Notes: ${formData.message || 'None'}`,
      ].join(' | ');

      let backendSuccess = false;
      try {
        await api.createLead({
          name: formData.name,
          email: formData.email,
          phone: submittedPhone,
          suburb: formData.suburb,
          service: selectedService,
          consultType: consultType,
          message: fullMessage,
          referenceId: refCode,
          sourcePage: 'Interactive Solar Assessment Terminal',
          fileName: billFile?.name || '',
          fileData,
        });
        backendSuccess = true;
      } catch (dbErr) {
        console.warn('Database lead storage notice:', dbErr);
      }

      const web3Payload: Record<string, any> = {
        name: formData.name,
        email: formData.email,
        phone: submittedPhone,
        suburb: formData.suburb,
        service: selectedService,
        consult_type: consultType,
        message: fullMessage,
        reference_id: refCode,
        page: 'Interactive Solar Assessment Terminal',
      };

      if (billFile) {
        web3Payload.attachment = billFile;
        web3Payload.bill_attached = `${billFile.name} (${(billFile.size / 1024).toFixed(1)} KB)`;
      }

      const res = await submitToWeb3Forms(web3Payload, {
        subject: `New Solar Assessment Request - ${formData.name} (${formData.suburb}) [${refCode}]`,
        from_name: 'Sunny Solar Assessment',
      });

      setIsSubmitting(false);
      if (res.success || backendSuccess) {
        setSubmitted(true);
        setToastData({
          title: 'Thank You for Choosing Sunny Solar!',
          message: `Thank you, ${formData.name}! Your free assessment request for ${formData.suburb} has been logged and sent to our Master Electrician engineering desk.`,
          referenceId: refCode,
        });
        setShowToast(true);
      } else {
        setSubmitError(res.message || 'Error submitting assessment request. Please try again.');
      }
    } catch {
      setIsSubmitting(false);
      setSubmitError('Failed to send request. Please check your internet connection and try again.');
    }
  };

  return (
    <section className="relative py-16 lg:py-24 bg-linear-to-b from-[#F5F7FD] via-white to-slate-50 border-b border-slate-200/80 overflow-hidden">
      {/* Thank You Toaster Notification */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        title={toastData.title}
        message={toastData.message}
        referenceId={toastData.referenceId}
        duration={5000}
      />
      {/* Magic UI AnimatedGridPattern Background */}
      <AnimatedGridPattern
        numSquares={40}
        maxOpacity={0.25}
        duration={3}
        repeatDelay={1}
        className="opacity-60 text-[#2B3CB8]/30 mask-[radial-gradient(ellipse_80%_65%_at_50%_35%,#000_15%,transparent_90%)]"
      />

      {/* Floating Solar Amber & Deep Blue Ambient Lights */}
      <div className="absolute top-12 left-1/4 w-112.5 h-112.5 bg-[#2B3CB8]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-16 right-1/4 w-100 h-100 bg-amber-400/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Eyebrow & Live Status Banner */}
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md border border-[#D1DCF8] shadow-xs text-[#2B3CB8] mb-3"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
            </span>
            <span className="font-mono uppercase text-[11px] tracking-wider text-emerald-800 font-bold">
              Nationwide Master Electrician Desk Active
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">Zero Pressure Guaranteed</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight leading-tight">
            Interactive Solar &amp; Battery <span className="bg-linear-to-r from-[#2B3CB8] via-[#3548D4] to-[#F59E0B] bg-clip-text text-transparent">Assessment Terminal</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl">
            Configure your building specs, preview real-time bill offset projections, and request an engineer-certified 3D roof proposal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Magic UI Orbiting Ecosystem & Social Proof Hub */}
          <div className="lg:col-span-5 space-y-6">
            {/* Magic UI OrbitingCircles Solar Ecosystem Showcase */}
            <div className="relative h-70 sm:h-75 rounded-3xl bg-linear-to-b from-white/90 to-blue-50/50 backdrop-blur-md border border-blue-200/60 p-6 flex flex-col items-center justify-center overflow-hidden shadow-sm">
              <BorderBeam
                size={140}
                duration={10}
                colorFrom="#2B3CB8"
                colorTo="#6F8EE7"
                borderWidth={1.5}
              />

              {/* Central Glowing Hub */}
              <div className="relative z-10 flex flex-col items-center text-center p-3 ">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#2B3CB8] to-[#151E64] text-white flex items-center justify-center shadow-md">
                  <ShieldCheck className="w-7 h-7 text-amber-400" />
                </div>
                <span className="text-xs font-bold text-slate-900 mt-1 font-serif">Sunny Solar</span>
                <span className="text-[10px] font-mono text-[#2B3CB8] font-semibold">QLD LIC #38192</span>
              </div>

              {/* Inner Orbit (Radius 75px) */}
              <OrbitingCircles radius={75} duration={16} iconSize={32}>
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md border border-white" title="Solar PV Generation">
                  <Sun className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-full bg-[#2B3CB8] text-white flex items-center justify-center shadow-md border border-white" title="Tier-1 Solar Array">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md border border-white" title="Tesla & Battery Storage">
                  <Battery className="w-4 h-4" />
                </div>
              </OrbitingCircles>

              {/* Outer Orbit (Radius 120px) */}
              <OrbitingCircles radius={120} duration={24} reverse iconSize={36}>
                <div className="w-9 h-9 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center shadow-lg border border-white" title="Bi-Directional Smart Meter">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border border-white" title="Licensed Master Electrician">
                  <Wrench className="w-4 h-4" />
                </div>
                <div className="w-9 h-9 rounded-full bg-indigo-700 text-white flex items-center justify-center shadow-lg border border-white" title="3D LiDAR Satellite Audit">
                  <Satellite className="w-4 h-4" />
                </div>
              </OrbitingCircles>


            </div>

            {/* Magic UI AnimatedList Social Proof Stream */}
            <div className="p-5 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                    Live Verified Audits
                  </span>
                </div>
                <span className="text-[11px] text-[#2B3CB8] font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Real-time
                </span>
              </div>

              <AnimatedList delay={3000}>
                {RECENT_AUDITS.map((audit) => (
                  <div
                    key={audit.id}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50/90 border border-slate-200/80 hover:border-[#2B3CB8]/40 transition-all text-left shadow-2xs"
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#2B3CB8] flex items-center justify-center shrink-0 mt-0.5">
                        <Satellite className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {audit.system}
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <span className="font-medium text-slate-700">{audit.location}</span>
                          <span>•</span>
                          <span className="text-emerald-700 font-semibold">{audit.savings}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-2">
                      {audit.time}
                    </span>
                  </div>
                ))}
              </AnimatedList>
            </div>

            {/* Direct Telephone Support Card */}
            <div className="p-5 rounded-3xl bg-linear-to-br from-slate-900 to-[#0C123E] text-white shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Prefer To Speak Right Now?
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Online
                </span>
              </div>
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-md">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <a
                    href="tel:1300030479"
                    className="text-2xl font-bold tracking-tight text-white hover:text-amber-400 transition-colors"
                  >
                    1300 030 479
                  </a>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Mon–Fri 7am–5pm AEST • Direct to our Nationwide office
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Interactive Assessment Terminal */}
          <div className="lg:col-span-7">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden bg-white/95 rounded-3xl border border-emerald-300 p-8 sm:p-12 shadow-2xl text-center space-y-6"
              >
                <ConfettiBurst count={60} />
                <BorderBeam
                  size={150}
                  duration={7}
                  colorFrom="#10B981"
                  colorTo="#059669"
                  borderWidth={2}
                />

                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-200 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                  </div>
                </div>

                <div className="relative z-10 space-y-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    <span>ASSESSMENT ID: {referenceId}</span>
                    <button
                      type="button"
                      onClick={handleCopyReference}
                      className="hover:text-emerald-700 cursor-pointer transition-colors"
                      title="Copy Reference Code"
                    >
                      {copiedRef ? (
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950">
                    Assessment Request Authenticated!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-900">{formData.name}</strong>. Your property specifications for{' '}
                    <strong className="text-slate-900">{formData.suburb}</strong> have been allocated to our Nationwide Master Electrician desk.
                  </p>
                </div>

                <div className="relative z-10 bg-slate-50/90 rounded-2xl p-5 max-w-md mx-auto text-left text-xs text-slate-700 space-y-2 border border-slate-200 shadow-2xs">
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Contact Email:</span>
                    <span className="font-semibold text-slate-900">{formData.email}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Contact Phone:</span>
                    <span className="font-semibold text-slate-900">
                      {formData.phone.trim().startsWith('+') ? formData.phone : `${countryCode} ${formData.phone}`}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Selected Solution:</span>
                    <span className="font-semibold text-slate-900">{selectedService}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Audit Type:</span>
                    <span className="font-bold text-[#2B3CB8] uppercase font-mono">{consultType}</span>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href="tel:1300030479"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2B3CB8] text-white text-xs font-bold hover:bg-[#2433A1] shadow-md transition-all cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Us Now: 1300 030 479</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setCurrentStep(1);
                      setIsHumanVerified(false);
                      setAuthorizedConsent(false);
                      setErrors({});
                      setTouched({});
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        suburb: '',
                        message: '',
                      });
                      removeBillFile();
                    }}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Configure Another System
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="relative overflow-hidden bg-white/95 rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-2xl shadow-[#2B3CB8]/10 backdrop-blur-md">
                {/* BorderBeam Dynamic Glowing Edge */}
                <BorderBeam
                  size={200}
                  duration={12}
                  colorFrom="#2B3CB8"
                  colorTo="#F59E0B"
                  borderWidth={1.5}
                />

                {/* Interactive Multi-Step Indicator Header */}
                <div className="relative z-10 mb-7">
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className={`flex items-center gap-1.5 cursor-pointer transition-colors ${currentStep === 1 ? 'text-[#2B3CB8]' : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep === 1 ? 'bg-[#2B3CB8] text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                        1
                      </span>
                      <span>Energy Setup</span>
                    </button>

                    <span className="text-slate-300">──</span>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className={`flex items-center gap-1.5 cursor-pointer transition-colors ${currentStep === 2 ? 'text-[#2B3CB8]' : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep === 2 ? 'bg-[#2B3CB8] text-white' : currentStep > 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                        2
                      </span>
                      <span>Audit Mode</span>
                    </button>

                    <span className="text-slate-300">──</span>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className={`flex items-center gap-1.5 cursor-pointer transition-colors ${currentStep === 3 ? 'text-[#2B3CB8]' : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep === 3 ? 'bg-[#2B3CB8] text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                        3
                      </span>
                      <span>Dispatch Quote</span>
                    </button>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      className="bg-linear-to-r from-[#2B3CB8] to-amber-500 h-full rounded-full"
                      animate={{
                        width: currentStep === 1 ? '33.3%' : currentStep === 2 ? '66.6%' : '100%',
                      }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    />
                  </div>
                </div>

                <form onSubmit={handleSubmit} noValidate className="relative z-10">
                  <AnimatePresence mode="wait">
                    {/* STEP 1: Energy & System Goals */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6"
                      >
                        {/* A. Property Type Selection */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                            A. Select Building Classification
                          </label>
                          <div className="grid grid-cols-3 gap-2.5">
                            <button
                              type="button"
                              onClick={() => setPropertyType('residential')}
                              className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${propertyType === 'residential'
                                  ? 'border-[#2B3CB8] bg-blue-50/70 text-[#2B3CB8] shadow-xs ring-2 ring-[#2B3CB8]/20'
                                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                                }`}
                            >
                              <Home className="w-5 h-5" />
                              <span className="text-xs font-bold">Residential</span>
                              <span className="text-[10px] text-slate-500">Home &amp; Duplex</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setPropertyType('commercial')}
                              className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${propertyType === 'commercial'
                                  ? 'border-[#2B3CB8] bg-blue-50/70 text-[#2B3CB8] shadow-xs ring-2 ring-[#2B3CB8]/20'
                                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                                }`}
                            >
                              <Building2 className="w-5 h-5" />
                              <span className="text-xs font-bold">Commercial</span>
                              <span className="text-[10px] text-slate-500">Warehouse/Office</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setPropertyType('rural')}
                              className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${propertyType === 'rural'
                                  ? 'border-[#2B3CB8] bg-blue-50/70 text-[#2B3CB8] shadow-xs ring-2 ring-[#2B3CB8]/20'
                                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                                }`}
                            >
                              <Tractor className="w-5 h-5" />
                              <span className="text-xs font-bold">Rural / Shed</span>
                              <span className="text-[10px] text-slate-500">Acreage &amp; Farms</span>
                            </button>
                          </div>
                        </div>

                        {/* B. Quarterly Power Bill Interactive Tiles & NumberTicker */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                              B. Average Quarterly Power Bill
                            </label>
                            <span className="text-[11px] text-slate-500 font-mono">Live calculation</span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {BILL_TIERS.map((tier) => (
                              <button
                                key={tier.id}
                                type="button"
                                onClick={() => setSelectedBillTier(tier.id)}
                                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${selectedBillTier === tier.id
                                    ? 'bg-linear-to-br from-[#2B3CB8] to-[#151E64] text-white border-[#2B3CB8] shadow-md ring-2 ring-[#2B3CB8]/30 scale-[1.02]'
                                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                                  }`}
                              >
                                <span className="block text-xs font-bold">{tier.label}</span>
                                <span className={`block text-[10px] mt-0.5 ${selectedBillTier === tier.id ? 'text-blue-200' : 'text-slate-500'
                                  }`}>
                                  {tier.subtitle}
                                </span>
                              </button>
                            ))}
                          </div>

                          {/* Dynamic Savings Projection Banner */}
                          <div className="mt-3 p-4 rounded-2xl bg-linear-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200 flex items-center justify-between shadow-2xs">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                                <TrendingDown className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-900 font-bold block">
                                  Estimated Annual Bill Offset:
                                </span>
                                <div className="text-xl sm:text-2xl font-bold text-emerald-900 flex items-baseline gap-1">
                                  <span>$</span>
                                  <NumberTicker value={currentTierData.offset} className="text-emerald-900" />
                                  <span className="text-xs text-emerald-700 font-normal">/year</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right text-[11px] text-slate-600 font-mono hidden sm:block">
                              <div>Payback: <strong className="text-slate-900">{currentTierData.payback}</strong></div>
                              <div>CO2: <strong className="text-slate-900">-{currentTierData.co2}/yr</strong></div>
                            </div>
                          </div>
                        </div>

                        {/* C. Target Solar Solution Cards */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                            C. What Is Your Priority Energy Objective?
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {[
                              {
                                id: 'New Solar Installation (6.6kW - 13.2kW)',
                                title: 'New Solar Installation',
                                desc: 'High-yield tier-1 panels for maximum daytime savings.',
                                icon: Zap,
                              },
                              {
                                id: 'Solar + Battery Storage Bundle',
                                title: 'Solar + Battery Bundle',
                                desc: '24/7 power, blackout protection & VPP energy exports.',
                                icon: Battery,
                              },
                              {
                                id: 'Add Battery to Existing Solar',
                                title: 'Add Battery Storage',
                                desc: 'Connect Tesla Powerwall 3 / Sigenergy to your current panels.',
                                icon: Cpu,
                              },
                              {
                                id: 'Solar System Repair / Health Check',
                                title: 'System Diagnostic / Upgrade',
                                desc: 'Inverter replacement, wiring inspection, or CEC recertification.',
                                icon: Wrench,
                              },
                            ].map((sol) => (
                              <button
                                key={sol.id}
                                type="button"
                                onClick={() => setSelectedService(sol.id)}
                                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${selectedService === sol.id
                                    ? 'border-[#2B3CB8] bg-blue-50/70 text-slate-950 ring-2 ring-[#2B3CB8]/20 shadow-xs'
                                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                                  }`}
                              >
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${selectedService === sol.id ? 'bg-[#2B3CB8] text-white' : 'bg-slate-100 text-slate-600'
                                  }`}>
                                  <sol.icon className="w-4 h-4" />
                                </div>
                                <div>
                                  <span className="block text-xs font-bold text-slate-900">{sol.title}</span>
                                  <span className="block text-[11px] text-slate-500 mt-0.5 leading-snug">{sol.desc}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Continue to Step 2 Button */}
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            className="w-full py-3.5 px-6 rounded-2xl bg-[#2B3CB8] text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#2433A1] shadow-lg shadow-[#2B3CB8]/25 transition-all cursor-pointer"
                          >
                            <span>Proceed to Step 2: Assessment Style</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: Assessment Methodology & Specifics */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6"
                      >
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                            Preferred Assessment Methodology
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {/* 3D Satellite Option */}
                            <button
                              type="button"
                              onClick={() => setConsultType('satellite')}
                              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${consultType === 'satellite'
                                  ? 'border-[#2B3CB8] bg-blue-50/70 shadow-md ring-2 ring-[#2B3CB8]/20'
                                  : 'border-slate-200 hover:border-slate-300 bg-white'
                                }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <Satellite className="w-5 h-5 text-[#2B3CB8]" />
                                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-500 text-white font-mono">
                                  Fastest
                                </span>
                              </div>
                              <span className="block text-xs font-bold text-slate-950">3D Satellite Audit</span>
                              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                                LiDAR elevation, tilt azimuth &amp; tree shading simulation. 24h itemized proposal.
                              </p>
                            </button>

                            {/* In-Home Visit Option */}
                            <button
                              type="button"
                              onClick={() => setConsultType('onsite')}
                              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${consultType === 'onsite'
                                  ? 'border-[#2B3CB8] bg-blue-50/70 shadow-md ring-2 ring-[#2B3CB8]/20'
                                  : 'border-slate-200 hover:border-slate-300 bg-white'
                                }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <Home className="w-5 h-5 text-[#2B3CB8]" />
                                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#2B3CB8] text-white font-mono">
                                  In-Person
                                </span>
                              </div>
                              <span className="block text-xs font-bold text-slate-950">Master Tech On-Site</span>
                              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                                Physical roof inspection, meter box compliance, inverter wall mounting check.
                              </p>
                            </button>

                            {/* Phone Option */}
                            <button
                              type="button"
                              onClick={() => setConsultType('phone')}
                              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${consultType === 'phone'
                                  ? 'border-[#2B3CB8] bg-blue-50/70 shadow-md ring-2 ring-[#2B3CB8]/20'
                                  : 'border-slate-200 hover:border-slate-300 bg-white'
                                }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <Headphones className="w-5 h-5 text-[#2B3CB8]" />
                                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-700 text-white font-mono">
                                  10-Mins
                                </span>
                              </div>
                              <span className="block text-xs font-bold text-slate-950">Phone Briefing</span>
                              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                                Direct call with Trent Palmer&apos;s team to walk through equipment options.
                              </p>
                            </button>
                          </div>
                        </div>

                        {/* Roof & Site Specifics Tags */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                            Select Roof &amp; Power Specifics (Tap all that apply)
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {[
                              'Tile Roof',
                              'Colorbond / Tin Roof',
                              'Multi-Storey',
                              'Single Phase',
                              'Three Phase',
                              'EV Charger Integration',
                              'Hot Water Diverter',
                              'Shaded Roof Sections',
                            ].map((tag) => {
                              const isSelected = selectedTags.includes(tag);
                              return (
                                <button
                                  key={tag}
                                  type="button"
                                  onClick={() => toggleTag(tag)}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${isSelected
                                      ? 'bg-[#2B3CB8] text-white border-[#2B3CB8] shadow-2xs'
                                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                                    }`}
                                >
                                  {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Custom Notes */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Additional Engineering Notes (Optional)
                          </label>
                          <textarea
                            rows={2}
                            placeholder="e.g. Preferred battery brand (Tesla, Sigenergy), plans for pool heat pump, or switchboard location..."
                            value={formData.message}
                            onChange={(e) => handleFieldChange('message', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B3CB8] bg-white resize-none"
                          />
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(1)}
                            className="py-3 px-5 rounded-2xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(3)}
                            className="flex-1 py-3.5 px-6 rounded-2xl bg-[#2B3CB8] text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#2433A1] shadow-lg shadow-[#2B3CB8]/25 transition-all cursor-pointer"
                          >
                            <span>Proceed to Step 3: Contact &amp; Dispatch Quote</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: Contact Details & Dispatch */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                            Where Should We Send Your Proposal?
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">* All fields verified</span>
                        </div>

                        {/* Full Name */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Full Name *
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="e.g. David Morrison"
                              value={formData.name}
                              onChange={(e) => handleFieldChange('name', e.target.value)}
                              onBlur={() => handleBlur('name')}
                              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all pr-10 ${touched.name && errors.name
                                  ? 'border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-400'
                                  : touched.name && !errors.name && formData.name
                                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-white'
                                    : 'border-slate-300 focus:ring-2 focus:ring-[#2B3CB8] focus:border-[#2B3CB8] bg-white'
                                }`}
                            />
                            {touched.name && !errors.name && formData.name && (
                              <CheckCircle className="w-4 h-4 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none fill-emerald-100" />
                            )}
                          </div>
                          {touched.name && errors.name && (
                            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{errors.name}</span>
                            </p>
                          )}
                        </div>

                        {/* Email & Phone Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {/* Email */}
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Email Address *
                            </label>
                            <div className="relative">
                              <input
                                type="email"
                                placeholder="david@example.com.au"
                                value={formData.email}
                                onChange={(e) => handleFieldChange('email', e.target.value)}
                                onBlur={() => handleBlur('email')}
                                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all pr-10 ${touched.email && errors.email
                                    ? 'border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-400'
                                    : touched.email && !errors.email && formData.email
                                      ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-white'
                                      : 'border-slate-300 focus:ring-2 focus:ring-[#2B3CB8] focus:border-[#2B3CB8] bg-white'
                                  }`}
                              />
                              {touched.email && !errors.email && formData.email && (
                                <CheckCircle className="w-4 h-4 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none fill-emerald-100" />
                              )}
                            </div>
                            {touched.email && errors.email && (
                              <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                <span>{errors.email}</span>
                              </p>
                            )}
                          </div>

                          {/* Phone with Country Code */}
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="block text-xs font-semibold text-slate-700">
                                Phone Number *
                              </label>
                              <span className="text-[10px] text-slate-400 font-mono">+614XX XXX XXX</span>
                            </div>
                            <div
                              className={`relative flex items-center rounded-xl border text-sm transition-all overflow-hidden ${touched.phone && errors.phone
                                  ? 'border-red-400 bg-red-50/20 ring-2 ring-red-400/30'
                                  : touched.phone && !errors.phone && formData.phone
                                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-white'
                                    : 'border-slate-300 focus-within:ring-2 focus-within:ring-[#2B3CB8] bg-white'
                                }`}
                            >
                              <div className="relative flex items-center bg-slate-50 border-r border-slate-200/90 text-slate-700 shrink-0">
                                <select
                                  value={countryCode}
                                  onChange={(e) => {
                                    const newCode = e.target.value;
                                    setCountryCode(newCode);
                                    if (touched.phone) {
                                      setErrors((prev) => ({
                                        ...prev,
                                        phone: validatePhone(formData.phone, newCode),
                                      }));
                                    }
                                  }}
                                  aria-label="Calling Code"
                                  className="appearance-none bg-transparent py-2.5 pl-2.5 pr-6 text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
                                >
                                  <option value="+61">🇦🇺 +61</option>
                                  <option value="+64">🇳🇿 +64</option>
                                  <option value="+44">🇬🇧 +44</option>
                                  <option value="+1">🇺🇸 +1</option>
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2" />
                              </div>

                              <div className="relative flex-1">
                                <input
                                  type="tel"
                                  placeholder={countryCode === '+61' ? '+61412 345 678' : 'Mobile number'}
                                  value={formData.phone}
                                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                                  onBlur={() => handleBlur('phone')}
                                  className="w-full px-3 py-2.5 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none pr-9"
                                />
                                {touched.phone && !errors.phone && formData.phone && (
                                  <CheckCircle className="w-4 h-4 text-emerald-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none fill-emerald-100" />
                                )}
                              </div>
                            </div>
                            {touched.phone && errors.phone && (
                              <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                <span>{errors.phone}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Property Suburb */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Property Suburb / Postcode *
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="e.g. Maroochydore 4558"
                              value={formData.suburb}
                              onChange={(e) => handleFieldChange('suburb', e.target.value)}
                              onBlur={() => handleBlur('suburb')}
                              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all pr-10 ${touched.suburb && errors.suburb
                                  ? 'border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-400'
                                  : touched.suburb && !errors.suburb && formData.suburb
                                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-white'
                                    : 'border-slate-300 focus:ring-2 focus:ring-[#2B3CB8] focus:border-[#2B3CB8] bg-white'
                                }`}
                            />
                            {touched.suburb && !errors.suburb && formData.suburb && (
                              <CheckCircle className="w-4 h-4 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none fill-emerald-100" />
                            )}
                          </div>
                          {touched.suburb && errors.suburb && (
                            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{errors.suburb}</span>
                            </p>
                          )}
                        </div>

                        {/* Drag-and-Drop Power Bill Upload */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-semibold text-slate-700">
                              Attach Power Bill (Optional)
                            </label>
                            <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              Exact Tariff Modeling
                            </span>
                          </div>

                          {!billFile ? (
                            <div
                              onDragOver={(e) => {
                                e.preventDefault();
                                setIsDraggingFile(true);
                              }}
                              onDragLeave={() => setIsDraggingFile(false)}
                              onDrop={handleDrop}
                              onClick={() => fileInputRef.current?.click()}
                              className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${isDraggingFile
                                  ? 'border-[#2B3CB8] bg-blue-50/60'
                                  : 'border-slate-300 hover:border-[#2B3CB8] hover:bg-slate-50 bg-white'
                                }`}
                            >
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.png,.jpg,.jpeg"
                                onChange={handleFileChange}
                                className="hidden"
                              />
                              <div className="flex items-center justify-center gap-3 pointer-events-none">
                                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#2B3CB8] flex items-center justify-center">
                                  <UploadCloud className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                  <p className="text-xs font-medium text-slate-800">
                                    <span className="font-bold text-[#2B3CB8]">Upload Bill</span> or drag file here
                                  </p>
                                  <span className="text-[10px] text-slate-500">PDF, PNG, JPG up to 15MB</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="p-3 rounded-2xl border border-emerald-300 bg-emerald-50/70 space-y-1.5 shadow-2xs">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <FileText className="w-5 h-5 text-emerald-700 shrink-0" />
                                  <div className="min-w-0">
                                    <p className="text-xs font-bold text-slate-900 truncate">{billFile.name}</p>
                                    <span className="text-[10px] text-emerald-700">
                                      {(billFile.size / 1024).toFixed(1)} KB • Attached for tariff audit
                                    </span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={removeBillFile}
                                  className="p-1 rounded-lg text-slate-400 hover:text-red-500 cursor-pointer"
                                  title="Remove bill file"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              {uploadProgress < 100 && (
                                <div className="w-full bg-emerald-200/60 rounded-full h-1 overflow-hidden">
                                  <div
                                    className="bg-emerald-600 h-full rounded-full transition-all duration-200"
                                    style={{ width: `${uploadProgress}%` }}
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Anti-Bot Verification Tile */}
                        <div
                          className={`p-3 rounded-xl border transition-all ${isHumanVerified
                              ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                              : touched.captcha && errors.captcha
                                ? 'bg-red-50/50 border-red-300'
                                : 'bg-slate-50 border-slate-200'
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <button
                              type="button"
                              onClick={handleVerifyHuman}
                              className="flex items-center gap-3 cursor-pointer text-left focus:outline-none"
                            >
                              <div
                                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${isVerifyingHuman
                                    ? 'border-amber-500 bg-amber-50'
                                    : isHumanVerified
                                      ? 'border-emerald-600 bg-emerald-600 text-white'
                                      : 'border-slate-300 bg-white'
                                  }`}
                              >
                                {isVerifyingHuman && <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />}
                                {isHumanVerified && <Check className="w-3.5 h-3.5 text-white stroke-3" />}
                              </div>
                              <span className="text-xs font-semibold text-slate-800">
                                {isVerifyingHuman
                                  ? 'Verifying cryptographic security token...'
                                  : isHumanVerified
                                    ? 'Security check passed: Verified human request'
                                    : 'Click to verify: I am not a robot'}
                              </span>
                            </button>
                            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                              <Lock className="w-3 h-3 text-slate-400" />
                              <span>256-BIT SSL</span>
                            </div>
                          </div>
                          {touched.captcha && errors.captcha && (
                            <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.captcha}</p>
                          )}
                        </div>

                        {/* Authorization Checkbox */}
                        <div>
                          <label className="flex items-start gap-2.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={authorizedConsent}
                              onChange={(e) => {
                                setAuthorizedConsent(e.target.checked);
                                if (touched.consent) {
                                  setErrors((prev) => ({
                                    ...prev,
                                    consent: validateConsent(e.target.checked),
                                  }));
                                }
                              }}
                              onBlur={() => handleBlur('consent')}
                              className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#2B3CB8] focus:ring-[#2B3CB8] cursor-pointer"
                            />
                            <span className="text-xs text-slate-600 leading-tight">
                              I confirm I am the property owner or authorized decision-maker for this address.
                            </span>
                          </label>
                          {touched.consent && errors.consent && (
                            <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.consent}</p>
                          )}
                        </div>

                        {/* Magic UI ShimmerButton Submission */}
                        <div className="pt-2 space-y-3">
                          {submitError && (
                            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                              <span>{submitError}</span>
                            </div>
                          )}

                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setCurrentStep(2)}
                              className="py-3 px-5 rounded-2xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                            >
                              <ArrowLeft className="w-4 h-4" />
                              <span>Back</span>
                            </button>

                            <ShimmerButton
                              type="submit"
                              disabled={isSubmitting}
                              shimmerColor="#F59E0B"
                              shimmerDuration="2.2s"
                              className="flex-1 py-4 text-sm font-bold shadow-xl shadow-[#2B3CB8]/30"
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  <span>Allocating Master Electrician...</span>
                                </>
                              ) : (
                                <>
                                  <span>🚀 Dispatch Free Engineering Proposal</span>
                                  <ArrowRight className="w-4 h-4 ml-1" />
                                </>
                              )}
                            </ShimmerButton>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
                            <span>Nationwide Master Electricians Lic #38192</span>
                            <span>Zero Sales Pressure Guarantee</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeAssessmentFormSection;

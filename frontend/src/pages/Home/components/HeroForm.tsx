import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  CheckCircle2,
  Zap,
  Sun,
  ArrowRight,
} from 'lucide-react';
import consultantAvatar from '../../../../src/assets/main-removebg.webp';
import { submitToWeb3Forms } from '../../../utils/web3forms';
import { api } from '../../../services/api';
import { useIsMobile } from '../useIsMobile';
import {
  ANIMATION_CONFIG,
  getHeroFormVariants,
  formFieldsContainerVariants,
  formFieldItemVariants,
} from '../animationConfig';

export interface HeroFormProps {
  /**
   * Controlled by the page-load intro loader.
   * Animation triggers only after loader finishes.
   */
  isLoaded?: boolean;
}

export const HeroForm: React.FC<HeroFormProps> = ({ isLoaded = true }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    postcode: '',
    address: '',
  });
  const [systemType, setSystemType] = useState<'combo' | 'solar' | 'battery'>('combo');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const systemName =
      systemType === 'combo'
        ? 'Solar + Battery Combo'
        : systemType === 'solar'
        ? 'Solar Only'
        : 'Battery Only';

    // 1. Persist lead to database
    let backendSuccess = false;
    try {
      await api.createLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        suburb: formData.postcode || formData.address,
        service: systemName,
        sourcePage: 'Homepage Hero',
      });
      backendSuccess = true;
    } catch (dbErr) {
      console.warn('Database lead notice:', dbErr);
    }

    // 2. Dispatch via Web3Forms
    try {
      const res = await submitToWeb3Forms(
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          postcode: formData.postcode,
          address: formData.address,
          system_type: systemName,
          page: 'Homepage Hero',
        },
        {
          subject: `New Free Quote Request - ${formData.name} (${formData.postcode || formData.address})`,
          from_name: 'Sunny Solar Website',
        }
      );

      setIsSubmitting(false);
      if (res.success || backendSuccess) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(res.message || 'Error submitting request. Please try again.');
      }
    } catch (_err) {
      setIsSubmitting(false);
      if (backendSuccess) {
        setIsSubmitted(true);
      } else {
        setErrorMessage('Error submitting request. Please try again.');
      }
    }
  };

  const formVariants = getHeroFormVariants(isMobile, Boolean(prefersReducedMotion));

  return (
    <motion.div
      initial="hidden"
      animate={isLoaded ? 'visible' : 'hidden'}
      variants={formVariants}
      style={{ willChange: 'transform, opacity' }}
      className="w-full flex justify-center lg:justify-end"
    >
      <div
        id="hero-quote-form"
        className="scroll-mt-24 sm:scroll-mt-32 relative w-full max-w-lg bg-white/95 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-2xl border border-white/60 text-slate-900 transition-shadow duration-300 hover:shadow-[0_20px_45px_-10px_rgba(43,60,184,0.22)]"
      >
        {/* Friendly Solar Specialist Avatar on Top-Right */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -top-5 sm:-top-10 right-2 sm:right-2 pointer-events-none z-20 flex flex-col items-end"
        >
          <div className="relative">
            {/* Subtle pulsing aura behind avatar */}
            <motion.div
              animate={{
                scale: [0.95, 1.1, 0.95],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 bg-[#2B3CB8]/20 rounded-full blur-lg scale-90 -z-10"
            />
            {/* Gentle idle float animation */}
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: 'easeInOut',
              }}
            >
              <img
                src={consultantAvatar}
                alt="Sunny Solar Energy Consultant"
                className="w-36 md:w-45 h-auto object-contain drop-shadow-[0_14px_22px_rgba(0,0,0,0.32)] filter"
                width="180"
                height="180"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Form fields appear one by one after the form lands (stagger 0.1s) */}
        <motion.div
          variants={formFieldsContainerVariants}
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
          className="space-y-3 sm:space-y-3.5"
        >
          {/* Field 1: Header */}
          <motion.div variants={formFieldItemVariants} className="text-left pr-20 sm:pr-28">
            <h3 className="text-base sm:text-2xl font-bold font-serif text-slate-900 leading-snug">
              Find The Right Solar Option For Your Home
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Solar or battery - start with what your home actually needs.
            </p>
          </motion.div>

          {/* Field 2: Interactive System Type Selector */}
          <motion.div
            variants={formFieldItemVariants}
            className="relative grid grid-cols-3 gap-1 sm:gap-2 p-1 bg-slate-100 rounded-lg text-xs font-semibold"
          >
            {(['combo', 'solar', 'battery'] as const).map((type) => {
              const isActive = systemType === type;
              const label =
                type === 'combo'
                  ? 'Solar + Battery'
                  : type === 'solar'
                  ? 'Solar Only'
                  : 'Battery Only';
              const Icon = type === 'battery' ? Zap : Sun;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSystemType(type)}
                  className={`relative py-1.5 px-1 sm:px-2 rounded-md transition-colors flex items-center justify-center gap-1 cursor-pointer text-[10px] sm:text-xs font-bold z-10 ${
                    isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeHeroSystemType"
                      className="absolute inset-0 bg-[#2B3CB8] rounded-md shadow-xs -z-10"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <Icon className="w-3 h-3 shrink-0" />
                  <span className="truncate">{label}</span>
                </button>
              );
            })}
          </motion.div>

          {isSubmitted ? (
            <motion.div
              variants={formFieldItemVariants}
              className="py-6 text-center space-y-2"
            >
              <CheckCircle2 className="w-9 h-9 text-[#2B3CB8] mx-auto" />
              <h4 className="text-sm font-bold text-slate-900">
                Quote Request Sent!
              </h4>
              <p className="text-xs text-slate-600">
                Thanks, <strong className="text-slate-900">{formData.name}</strong>. Our team will be in touch shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', phone: '', email: '', postcode: '', address: '' });
                }}
                className="text-xs font-semibold text-[#2B3CB8] hover:underline pt-1 cursor-pointer"
              >
                Submit another
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3.5 text-left">
              {/* Field 3: Name & Phone */}
              <motion.div variants={formFieldItemVariants} className="grid grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name *"
                    className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2B3CB8] focus:ring-2 focus:ring-[#2B3CB8]/20 focus:bg-white hover:border-slate-400 transition-all duration-200"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number *"
                    className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2B3CB8] focus:ring-2 focus:ring-[#2B3CB8]/20 focus:bg-white hover:border-slate-400 transition-all duration-200"
                  />
                </div>
              </motion.div>

              {/* Field 4: Email & Postcode */}
              <motion.div variants={formFieldItemVariants} className="grid grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2B3CB8] focus:ring-2 focus:ring-[#2B3CB8]/20 focus:bg-white hover:border-slate-400 transition-all duration-200"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="postcode"
                    required
                    value={formData.postcode}
                    onChange={handleChange}
                    placeholder="Post Code *"
                    className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2B3CB8] focus:ring-2 focus:ring-[#2B3CB8]/20 focus:bg-white hover:border-slate-400 transition-all duration-200"
                  />
                </div>
              </motion.div>

              {/* Field 5: House Address */}
              <motion.div variants={formFieldItemVariants}>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House Address *"
                  className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2B3CB8] focus:ring-2 focus:ring-[#2B3CB8]/20 focus:bg-white hover:border-slate-400 transition-all duration-200"
                />
              </motion.div>

              {errorMessage && (
                <div className="p-2 rounded bg-[#F5F7FD] border border-[#2B3CB8] text-[#0C123E] text-xs text-center">
                  {errorMessage}
                </div>
              )}

              {/* Field 6: Submit Button */}
              <motion.div variants={formFieldItemVariants}>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.985 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="relative overflow-hidden group w-full py-2.5 sm:py-3 px-4 rounded-lg font-bold text-xs sm:text-sm text-white bg-[#366A23]  shadow-md hover:shadow-lg hover:shadow-[#2B3CB8]/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-75"
                >
                  <span className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Show My Solar Options →</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </motion.button>
              </motion.div>

              {/* Field 7: Privacy & Trust Footnote */}
              <motion.p
                variants={formFieldItemVariants}
                className="text-[10px] sm:text-[11px] text-center text-slate-500 pt-0.5"
              >
                🔒 No obligation • Personalised assessment • Privacy protected
              </motion.p>
            </form>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroForm;

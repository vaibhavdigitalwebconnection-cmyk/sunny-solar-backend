import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Star,
  ShieldCheck,
  Zap,
  Sparkles,
  Sun
} from 'lucide-react';
const heroBgImage = '/hero-installer.jpg';
import consultantAvatar from '../../../assets/main-removebg.png';
import SplitFlapText from '../../../components/ui/SplitFlapText';

import { submitToWeb3Forms } from '../../../utils/web3forms';
import { api } from '../../../services/api';



export const HeroSection: React.FC = () => {
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
  const navigate = useNavigate();



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const systemName = systemType === 'combo' ? 'Solar + Battery Combo' : systemType === 'solar' ? 'Solar Only' : 'Battery Only';

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
      const res = await submitToWeb3Forms({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        postcode: formData.postcode,
        address: formData.address,
        system_type: systemName,
        page: 'Homepage Hero',
      }, {
        subject: `New Free Quote Request - ${formData.name} (${formData.postcode || formData.address})`,
        from_name: 'Sunny Solar Website',
      });

      setIsSubmitting(false);
      if (res.success || backendSuccess) {
        setIsSubmitted(true);
        navigate('/thank-you');
      } else {
        setErrorMessage(res.message || 'Error submitting request. Please try again.');
      }
    } catch (err: any) {
      setIsSubmitting(false);
      if (backendSuccess) {
        setIsSubmitted(true);
        navigate('/thank-you');
      } else {
        setErrorMessage('Error submitting request. Please try again.');
      }
    }
  };

  return (
    <section className="relative min-h-145 lg:min-h-auto flex items-center overflow-hidden">
      {/* Full-width Responsive Background Image (Clearly Visible) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 4, ease: "easeOut" }}
          src={heroBgImage}
          alt="Sunny Solar Installation"
          className="w-full h-full object-cover object-center"
        />

        {/* Light Overlay to keep image clearly visible while ensuring text contrast */}
        <div className="absolute inset-0 bg-black/55 sm:bg-linear-to-t sm:from-black/65 sm:via-black/30 sm:to-black/10" />

        {/* Dynamic ambient lighting orbs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.28, 0.15] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute -top-24 right-1/4 w-125 h-125 bg-blue-600/20 rounded-full blur-[140px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.16, 0.08] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 left-10 w-96 h-96 bg-amber-500/15 rounded-full blur-[130px] pointer-events-none"
        />
      </div>

      {/* Hero Content & Small Form Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 pt-28 sm:pt-36 lg:pt-48 pb-20 sm:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center">
          {/* Upper-Left Concise Content Block with Text Animations */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 text-left space-y-3.5 sm:space-y-4"
          >
            {/* Top Micro Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold text-white bg-slate-900/80 border border-white/20 backdrop-blur-md shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-[#6F8EE7] animate-pulse shrink-0" />
              <span className="text-[#D1DCF8] font-bold">SOLAR • BATTERY • </span>
              <span className="text-white font-bold">SOLUTIONS</span>
              <motion.span
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", repeatDelay: 2 }}
                className="absolute inset-0 w-1/3 h-full bg-linear-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none"
              />
            </motion.div>

            {/* Animated Headline with Dynamic Cycling Highlight */}
            <div className="space-y-2.5">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.2] drop-shadow-md"
              >
                Make Your Solar Decision With Confidence.
              </motion.h1>
              
              <div className="pt-0.5 sm:pt-1 flex items-center">
                <div className="inline-flex max-w-full overflow-x-auto scrollbar-none py-1">
                  <SplitFlapText
                    words={[
                      'SOLAR MADE SIMPLE',
                      'CLEAN GREEN POWER',
                      'LOWER POWER BILLS',
                      'SMART BATTERY HUB'
                    ]}
                    flipDuration={0.12}
                    stagger={0.05}
                    cycleDelay={2600}
                    charset="alphanumeric"
                    flipsPerChar={6}
                    tileColor="#0B132B"
                    textColor="#FFFFFF"
                    tileRadius="clamp(4px, 0.7vw, 7px)"
                    gap="clamp(3px, 0.5vw, 6px)"
                    fontSize="clamp(16px, 3.2vw, 36px)"
                    loop
                    padTo={17}
                    className="shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Subheading with Smooth Delayed Entrance */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs sm:text-base text-justify text-slate-100 sm:text-white leading-relaxed max-w-lg drop-shadow-sm"
            >
              Solar solutions designed around your home, your energy use and your goals. Understand your options. Choose what works for your home.
            </motion.p>

            {/* CTA Button with Interactive Micro-hover Effect */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="pt-1 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.025, boxShadow: "0 12px 25px -4px rgba(43, 60, 184, 0.45)" }}
                whileTap={{ scale: 0.98 }}
                href="#hero-quote-form"
                className="relative overflow-hidden group inline-flex items-center justify-center gap-2 font-bold px-5 sm:px-6 py-2.5 rounded-lg bg-[#2B3CB8] hover:bg-[#1D2984] text-white shadow-md transition-all text-xs sm:text-sm cursor-pointer w-full sm:w-auto"
              >
                {/* Shimmer light sweep */}
                <span className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
                <span className="relative z-10">Explore Solar Options</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right-Side Small Lead-Gen Form with Subtle Fade-In */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex justify-center lg:justify-end mt-6 sm:mt-10 lg:mt-0"
          >
            <div id="hero-quote-form" className="scroll-mt-24 sm:scroll-mt-32 relative w-full max-w-lg bg-white/95 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-2xl border border-white/60 text-slate-900 transition-shadow duration-300 hover:shadow-[0_20px_45px_-10px_rgba(43,60,184,0.22)]">

              {/* Friendly Solar Specialist Avatar on Top-Right with Animated Float & Ambient Glow (Final Position Preserved) */}
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-10 sm:-top-8 right-2 sm:right-6 pointer-events-none z-20 flex flex-col items-end select-none"
              >
                {/* Cutout with subtle ambient glow and 3D shadow */}
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
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-[#2B3CB8]/20 rounded-full blur-lg scale-90 -z-10"
                  />
                  {/* Gentle idle float animation (maintains center coordinates) */}
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "easeInOut",
                    }}
                  >
                    <img
                      src={consultantAvatar}
                      alt="Sunny Solar Energy Consultant"
                      className="w-36 md:w-40 h-auto object-contain drop-shadow-[0_14px_22px_rgba(0,0,0,0.32)] filter"
                    />
                  </motion.div>
                </div>
              </motion.div>

              <div className="mb-2.5 sm:mb-3 text-left pr-20 sm:pr-28">
                <h3 className="text-base sm:text-2xl font-bold font-serif text-slate-900 leading-snug">
                  Get a Free Quote
                </h3>
                <p className="text-xs text-slate-500">
                  Fixed pricing • No obligation
                </p>
              </div>

              {/* Interactive System Type Selector with Smooth Sliding Tab Animation */}
              <div className="relative mb-3 grid grid-cols-3 gap-1 sm:gap-2 p-1 bg-slate-100 rounded-lg text-xs font-semibold">
                {(['combo', 'solar', 'battery'] as const).map((type) => {
                  const isActive = systemType === type;
                  const label =
                    type === 'combo' ? 'Solar + Battery' : type === 'solar' ? 'Solar Only' : 'Battery Only';
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
                          layoutId="activeSystemType"
                          className="absolute inset-0 bg-[#2B3CB8] rounded-md shadow-xs -z-10"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                      <Icon className="w-3 h-3 shrink-0" />
                      <span className="truncate">{label}</span>
                    </button>
                  );
                })}
              </div>

              {isSubmitted ? (
                <div className="py-6 text-center space-y-2">
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
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-4 text-left">
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
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

                    <div className="col-span-2">
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="House Address *"
                        className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2B3CB8] focus:ring-2 focus:ring-[#2B3CB8]/20 focus:bg-white hover:border-slate-400 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="p-2 rounded bg-[#F5F7FD] border border-[#2B3CB8] text-[#0C123E] text-xs text-center">
                      {errorMessage}
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.985 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="relative overflow-hidden group w-full py-2.5 sm:py-3 px-4 rounded-lg font-bold text-xs sm:text-sm text-white bg-[#2B3CB8] hover:bg-[#1D2984] shadow-md hover:shadow-lg hover:shadow-[#2B3CB8]/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-75"
                  >
                    {/* Interactive sheen sweep */}
                    <span className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Get Free Quote</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-[10px] sm:text-[11px] text-center text-slate-500 pt-0.5">
                    🔒 100% privacy protected • No spam
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


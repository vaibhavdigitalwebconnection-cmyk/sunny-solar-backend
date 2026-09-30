import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, X, Sparkles } from 'lucide-react';

export interface ToastProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  referenceId?: string;
  duration?: number;
  type?: 'success' | 'error' | 'info';
}

export const Toast: React.FC<ToastProps> = ({
  show,
  onClose,
  title = 'Thank You!',
  message,
  referenceId,
  duration = 5000,
  type = 'success',
}) => {
  useEffect(() => {
    if (!show || duration <= 0) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [show, duration, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed top-5 right-5 sm:top-6 sm:right-6 z-100 max-w-[calc(100vw-32px)] sm:max-w-md pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-xl border border-emerald-200/80 p-4 sm:p-5 shadow-2xl shadow-emerald-500/10 ring-1 ring-black/5"
          >
            {/* Top accent gradient line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-emerald-500 via-[#2B3CB8] to-amber-500" />

            <div className="flex items-start gap-3.5">
              {/* Status Icon */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  type === 'success'
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : 'bg-rose-50 text-rose-600 border border-rose-200'
                }`}
              >
                {type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
                )}
              </div>

              {/* Toast Text Content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <h4 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                    <span>{title}</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </h4>
                  {referenceId && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200">
                      {referenceId}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {message}
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Timed progress bar */}
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
              className="absolute bottom-0 left-0 h-0.75 bg-emerald-500/70"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Toast;

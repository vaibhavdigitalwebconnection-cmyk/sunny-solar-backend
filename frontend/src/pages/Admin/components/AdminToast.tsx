import React from 'react';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { ToastInfo } from '../types';

interface AdminToastProps {
  toast: ToastInfo | null;
  onClose?: () => void;
}

export const AdminToast: React.FC<AdminToastProps> = ({ toast, onClose }) => {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div
      data-lenis-prevent
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-6 z-60 w-auto max-w-[calc(100vw-32px)] sm:max-w-md animate-in slide-in-from-bottom-3 fade-in duration-200 pointer-events-auto"
    >
      <div
        className={`flex items-center gap-2.5 sm:gap-3 py-2.5 px-3.5 sm:py-3 sm:px-4 rounded-xl sm:rounded-2xl shadow-xl backdrop-blur-md border ${
          isSuccess
            ? 'bg-neutral-900/95 text-white border-neutral-700/80 shadow-black/30'
            : 'bg-rose-950/95 text-white border-rose-500/40 shadow-rose-950/30'
        }`}
      >
        {/* Status Icon */}
        <div
          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
            isSuccess
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
          }`}
        >
          {isSuccess ? (
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
          ) : (
            <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
          )}
        </div>

        {/* Message */}
        <div className="flex-1 min-w-0 pr-1">
          <p className="text-xs sm:text-xs font-semibold text-white leading-snug wrap-break-word">
            {toast.message}
          </p>
        </div>

        {/* Optional Close Button */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-white/50 hover:text-white transition-colors cursor-pointer shrink-0 ml-1"
            title="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

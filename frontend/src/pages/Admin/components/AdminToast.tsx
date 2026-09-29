import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { ToastInfo } from '../types';

interface AdminToastProps {
  toast: ToastInfo | null;
}

export const AdminToast: React.FC<AdminToastProps> = ({ toast }) => {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div
      data-lenis-prevent
      className="fixed bottom-6 right-6 z-60 max-w-sm w-full animate-in slide-in-from-bottom-4 fade-in duration-200"
    >
      <div
        className={`flex items-center gap-3 p-4 rounded-2xl shadow-2xl backdrop-blur-md border ${
          isSuccess
            ? 'bg-slate-900/95 text-white border-emerald-500/40'
            : 'bg-rose-950/95 text-white border-rose-500/40'
        }`}
      >
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
            isSuccess
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
          }`}
        >
          {isSuccess ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <AlertTriangle className="w-4 h-4" />
          )}
        </div>
        <div className="flex-1 min-w-0 pr-1">
          <span className="text-[11px] font-semibold text-slate-300 block uppercase tracking-wider mb-0.5">
            {isSuccess ? 'Success' : 'Notification'}
          </span>
          <p className="text-xs font-medium text-white leading-snug wrap-break-word">
            {toast.message}
          </p>
        </div>
      </div>
    </div>
  );
};

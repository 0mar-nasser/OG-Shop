'use client';

import React from 'react';
import { useToast } from '@/context/ToastContext';
import { CheckIcon, CloseIcon } from './Icons';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-6 z-[120] flex flex-col gap-2.5 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((toast) => {
        let bgClass = 'bg-stone-900 text-white border-stone-800';
        if (toast.type === 'error') bgClass = 'bg-red-900/95 text-white border-red-800';
        if (toast.type === 'warning') bgClass = 'bg-amber-900/95 text-white border-amber-800';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl shadow-lg border text-sm font-medium animate-fade-in backdrop-blur-md ${bgClass}`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === 'success' && (
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckIcon size={13} />
                </span>
              )}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-white transition-colors p-1 rounded-md"
              aria-label="إغلاق"
            >
              <CloseIcon size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

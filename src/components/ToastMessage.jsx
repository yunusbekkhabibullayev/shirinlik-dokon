import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export default function ToastMessage({ message, type = 'success', onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 3200);
    return () => clearTimeout(t);
  }, [onClose]);

  if (!visible) return null;

  const styles = {
    success: 'bg-emerald-600/95 text-white shadow-emerald-600/20',
    error: 'bg-rose-600/95 text-white shadow-rose-600/20',
    info: 'bg-slate-900/95 text-white shadow-slate-900/20',
  };

  const icons = {
    success: CheckCircleIcon,
    error: ExclamationCircleIcon,
    info: InformationCircleIcon,
  };

  const Icon = icons[type] || CheckCircleIcon;

  return (
    <div className={`fixed bottom-16 md:bottom-6 right-4 sm:right-6 z-[300] flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl backdrop-blur-xl border border-white/20 text-xs sm:text-sm font-medium animate-slideUp ${styles[type]}`}>
      <Icon className="w-5 h-5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}


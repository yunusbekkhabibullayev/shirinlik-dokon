import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { OrderForm } from './OrderForm';

export function NewOrderModal({ isOpen, onClose, onAddOrder }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[480px] rounded-3xl p-6 shadow-2xl border border-slate-200/80 animate-scaleUp relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <OrderForm onAddOrder={onAddOrder} isModal={true} onCloseModal={onClose} />
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import {
  PlusCircleIcon,
  ExclamationCircleIcon,
  SparklesIcon,
  CalendarDaysIcon,
  UserIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';

export function OrderForm({ onAddOrder, isModal = false, onCloseModal }) {
  const [customerName, setCustomerName] = useState('');
  const [orderTitle, setOrderTitle] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  // Validation errors
  const [errors, setErrors] = useState({
    customerName: '',
    orderTitle: '',
    deliveryDate: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate form fields
  const validate = () => {
    const newErrors = {
      customerName: '',
      orderTitle: '',
      deliveryDate: '',
    };

    let isValid = true;

    if (!customerName.trim()) {
      newErrors.customerName = 'Mijoz ismini kiritish majburiy!';
      isValid = false;
    }

    if (!orderTitle.trim()) {
      newErrors.orderTitle = 'Buyurtma tavsifini kiritish majburiy!';
      isValid = false;
    }

    if (!deliveryDate.trim()) {
      newErrors.deliveryDate = 'Topshirish sanasini kiritish majburiy!';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const newOrder = {
      id: 'ORD-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(100 + Math.random() * 900),
      customerName: customerName.trim(),
      orderTitle: orderTitle.trim(),
      deliveryDate: deliveryDate.trim(),
      status: 'Yangi', // Bilet 010: Yangi buyurtma doimo "Yangi" bo'ladi
      createdAt: new Date().toISOString(),
    };

    onAddOrder(newOrder);

    // Reset form
    setCustomerName('');
    setOrderTitle('');
    setDeliveryDate('');
    setErrors({ customerName: '', orderTitle: '', deliveryDate: '' });
    setIsSubmitting(false);

    if (isModal && onCloseModal) {
      onCloseModal();
    }
  };

  // Sinovchi 04 avto-to'ldirish
  const fillSampleData = () => {
    setCustomerName('Sinovchi 04');
    setOrderTitle('1 ta asal tort');
    setDeliveryDate('25.11.2026');
    setErrors({ customerName: '', orderTitle: '', deliveryDate: '' });
  };

  return (
    <div className={`ios-card p-4 sm:p-6 shadow-xs ${isModal ? '' : 'h-full'}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <PlusCircleIcon className="w-4 h-4 stroke-[2]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 leading-tight">
              Yangi buyurtma qo‘shish
            </h3>
            <p className="text-[11px] text-slate-400">
              Uchala maydon ham to‘ldirilishi shart
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={fillSampleData}
          title="Sinovchi 04 ma'lumotlarini tezkor to'ldirish"
          className="text-[11px] font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-200/60 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <SparklesIcon className="w-3.5 h-3.5 text-blue-500" />
          <span>Sinovchi 04</span>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
        {/* 1. Mijoz ismi */}
        <div>
          <label
            htmlFor="customerName"
            className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1"
          >
            Mijoz ismi <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <UserIcon className="w-4 h-4" />
            </div>
            <input
              id="customerName"
              type="text"
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
                if (errors.customerName) setErrors({ ...errors, customerName: '' });
              }}
              placeholder="Masalan: Sinovchi 04"
              className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50/70 rounded-xl border outline-none transition-all focus:bg-white ${
                errors.customerName
                  ? 'border-rose-500 ring-2 ring-rose-100 bg-rose-50/30'
                  : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              }`}
            />
          </div>
          {errors.customerName && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
              <ExclamationCircleIcon className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.customerName}</span>
            </p>
          )}
        </div>

        {/* 2. Buyurtma tavsifi */}
        <div>
          <label
            htmlFor="orderTitle"
            className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1"
          >
            Buyurtma tavsifi <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <ShoppingBagIcon className="w-4 h-4" />
            </div>
            <input
              id="orderTitle"
              type="text"
              value={orderTitle}
              onChange={(e) => {
                setOrderTitle(e.target.value);
                if (errors.orderTitle) setErrors({ ...errors, orderTitle: '' });
              }}
              placeholder="Masalan: 1 ta asal tort"
              className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50/70 rounded-xl border outline-none transition-all focus:bg-white ${
                errors.orderTitle
                  ? 'border-rose-500 ring-2 ring-rose-100 bg-rose-50/30'
                  : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              }`}
            />
          </div>
          {errors.orderTitle && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
              <ExclamationCircleIcon className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.orderTitle}</span>
            </p>
          )}
        </div>

        {/* 3. Topshirish sanasi */}
        <div>
          <label
            htmlFor="deliveryDate"
            className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1"
          >
            Topshirish sanasi <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <CalendarDaysIcon className="w-4 h-4" />
            </div>
            <input
              id="deliveryDate"
              type="text"
              value={deliveryDate}
              onChange={(e) => {
                setDeliveryDate(e.target.value);
                if (errors.deliveryDate) setErrors({ ...errors, deliveryDate: '' });
              }}
              placeholder="Masalan: 25.11.2026"
              className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50/70 rounded-xl border outline-none transition-all focus:bg-white ${
                errors.deliveryDate
                  ? 'border-rose-500 ring-2 ring-rose-100 bg-rose-50/30'
                  : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              }`}
            />
          </div>
          {errors.deliveryDate && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
              <ExclamationCircleIcon className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.deliveryDate}</span>
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <PlusCircleIcon className="w-4 h-4" />
            <span>Buyurtma qo‘shish</span>
          </button>
        </div>
      </form>
    </div>
  );
}

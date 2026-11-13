import React, { useState } from 'react';
import {
  XMarkIcon,
  PlusCircleIcon,
  ExclamationCircleIcon,
  ShoppingBagIcon,
  CalendarDaysIcon,
  UserIcon,
  PhoneIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import { useLanguage } from '../context/useLanguage';

const SAMPLE_IMAGES = {
  TORTLAR: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=80',
  KEKSLAR: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=500&auto=format&fit=crop&q=80',
  PIROGLAR: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=500&auto=format&fit=crop&q=80',
  SHIRINLIKLAR: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=500&auto=format&fit=crop&q=80',
};

export function AdminProductCreateModal({ isOpen, onClose, onAddOrder }) {
  const { t } = useLanguage();

  // Barcha maydonlar bo'sh holatda boshlanadi — faqat placeholder ko'rinadi
  const [customerName, setCustomerName] = useState('');
  const [orderTitle, setOrderTitle] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [phone, setPhone] = useState('');
  const [price, setPrice] = useState('');

  const [errors, setErrors] = useState({
    customerName: '',
    orderTitle: '',
    deliveryDate: '',
  });

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {
      customerName: '',
      orderTitle: '',
      deliveryDate: '',
    };
    let isValid = true;

    if (!customerName.trim()) {
      newErrors.customerName = t('requiredCustomer');
      isValid = false;
    }
    if (!orderTitle.trim()) {
      newErrors.orderTitle = t('requiredTitle');
      isValid = false;
    }
    if (!deliveryDate.trim()) {
      newErrors.deliveryDate = t('requiredDate');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const newOrder = {
      id: 'ORD-' + Math.floor(100 + Math.random() * 900),
      customerName: customerName.trim(),
      orderTitle: orderTitle.trim(),
      deliveryDate: deliveryDate
        ? deliveryDate.split('-').reverse().join('.')  // YYYY-MM-DD → DD.MM.YYYY
        : deliveryDate.trim(),
      category: 'TORTLAR',
      price: price.trim() || '120 000 so\'m',
      quantity: '1 dona',
      phone: phone.trim() || '+998 90 123 45 67',
      address: 'Toshkent sh., Yunusobod tumani',
      image: SAMPLE_IMAGES.TORTLAR,
      status: 'Yangi', // Har doim "Yangi" holatida ro'yxatga qo'shiladi
      createdAt: new Date().toISOString(),
    };

    onAddOrder(newOrder);

    // Formani tozalash
    setCustomerName('');
    setOrderTitle('');
    setDeliveryDate('');
    setPhone('');
    setPrice('');
    setErrors({ customerName: '', orderTitle: '', deliveryDate: '' });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-5 bg-black/50 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-[28px] p-5 sm:p-7 shadow-2xl border border-slate-100 animate-scaleUp max-h-[92vh] overflow-y-auto relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#FFF0F1] text-[#CC1122] flex items-center justify-center border border-[#FFE4E6] shadow-2xs shrink-0">
              <PlusCircleIcon className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                  {t('addOrderTitle')}
                </h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  ● {t('pending')}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                {t('addOrderSubtitle')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Yopish"
          >
            <XMarkIcon className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* 1. Mijoz ismi (Required) */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
              {t('customerNameLabel')} <span className="text-[#CC1122]">*</span>
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  if (errors.customerName) setErrors((prev) => ({ ...prev, customerName: '' }));
                }}
                placeholder={t('customerNamePlaceholder')}
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border outline-none ${
                  errors.customerName
                    ? 'border-rose-400 bg-rose-50/40 text-slate-900 focus:border-rose-500'
                    : 'border-slate-200 bg-white text-slate-900 focus:border-[#CC1122] focus:ring-2 focus:ring-[#FFE4E6]'
                }`}
              />
            </div>
            {errors.customerName && (
              <p className="mt-1 text-[11px] text-[#CC1122] font-bold flex items-center gap-1">
                <ExclamationCircleIcon className="w-3.5 h-3.5" />
                <span>{errors.customerName}</span>
              </p>
            )}
          </div>

          {/* 2. Buyurtma tavsifi (Required) */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
              {t('orderTitleLabel')} <span className="text-[#CC1122]">*</span>
            </label>
            <div className="relative">
              <ShoppingBagIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={orderTitle}
                onChange={(e) => {
                  setOrderTitle(e.target.value);
                  if (errors.orderTitle) setErrors((prev) => ({ ...prev, orderTitle: '' }));
                }}
                placeholder={t('orderTitlePlaceholder')}
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border outline-none ${
                  errors.orderTitle
                    ? 'border-rose-400 bg-rose-50/40 text-slate-900 focus:border-rose-500'
                    : 'border-slate-200 bg-white text-slate-900 focus:border-[#CC1122] focus:ring-2 focus:ring-[#FFE4E6]'
                }`}
              />
            </div>
            {errors.orderTitle && (
              <p className="mt-1 text-[11px] text-[#CC1122] font-bold flex items-center gap-1">
                <ExclamationCircleIcon className="w-3.5 h-3.5" />
                <span>{errors.orderTitle}</span>
              </p>
            )}
          </div>

          {/* 3. Topshirish sanasi (Required) — type="date" date picker */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
              {t('deliveryDateLabel')} <span className="text-[#CC1122]">*</span>
            </label>
            <div className="relative">
              <CalendarDaysIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => {
                  setDeliveryDate(e.target.value);
                  if (errors.deliveryDate) setErrors((prev) => ({ ...prev, deliveryDate: '' }));
                }}
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border outline-none cursor-pointer ${
                  errors.deliveryDate
                    ? 'border-rose-400 bg-rose-50/40 text-slate-900 focus:border-rose-500'
                    : 'border-slate-200 bg-white text-slate-900 focus:border-[#CC1122] focus:ring-2 focus:ring-[#FFE4E6]'
                }`}
              />
            </div>
            {errors.deliveryDate && (
              <p className="mt-1 text-[11px] text-[#CC1122] font-bold flex items-center gap-1">
                <ExclamationCircleIcon className="w-3.5 h-3.5" />
                <span>{errors.deliveryDate}</span>
              </p>
            )}
          </div>

          {/* 4. Telefon va Narx (Ixtiyoriy) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                {t('phoneNumberLabel')}
              </label>
              <div className="relative">
                <PhoneIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  className="w-full pl-8 pr-3 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-800 outline-none focus:border-[#CC1122] font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                {t('priceLabel')}
              </label>
              <div className="relative">
                <BanknotesIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="140 000 so'm"
                  className="w-full pl-8 pr-3 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-800 outline-none focus:border-[#CC1122] font-mono"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all cursor-pointer"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#CC1122] hover:bg-[#A80D1B] text-white text-xs font-black shadow-md shadow-[#CC1122]/20 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
            >
              <PlusCircleIcon className="w-4 h-4 stroke-[2.5]" />
              <span>{t('submitOrder')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React from 'react';
import {
  ShoppingBagIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

export function ProductsSummaryCards({ orders, activeFilter, onFilterChange }) {
  const total = orders.length;
  const ready = orders.filter((o) => o.status === 'Tayyor').length;
  const pending = orders.filter((o) => o.status === 'Yangi').length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5">
      {/* 1. JAMI TOVARLAR / BUYURTMALAR (Dark card matching Image 2) */}
      <div
        onClick={() => onFilterChange('all')}
        className={`bg-[#0F172A] text-white rounded-3xl p-4 sm:p-5 shadow-xs cursor-pointer hover:shadow-md transition-all ${
          activeFilter === 'all' ? 'ring-2 ring-slate-400' : ''
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
            JAMI TOVARLAR
          </span>
          <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center">
            <ShoppingBagIcon className="w-4 h-4" />
          </div>
        </div>
        <div className="text-xl sm:text-2xl font-black tracking-tight">
          {total} ta
        </div>
      </div>

      {/* 2. SOTUVDA MAVJUD (TAYYOR) (White card matching Image 2) */}
      <div
        onClick={() => onFilterChange('ready')}
        className={`bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs cursor-pointer hover:shadow-md transition-all ${
          activeFilter === 'ready' ? 'ring-2 ring-emerald-500 border-emerald-500' : ''
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            SOTUVDA MAVJUD
          </span>
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
            <CheckCircleIcon className="w-4 h-4" />
          </div>
        </div>
        <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
          {ready} ta
        </div>
      </div>

      {/* 3. KAM QOLGAN (KUTILAYOTGAN / YANGI) (White card matching Image 2) */}
      <div
        onClick={() => onFilterChange('pending')}
        className={`bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs cursor-pointer hover:shadow-md transition-all ${
          activeFilter === 'pending' ? 'ring-2 ring-amber-500 border-amber-500' : ''
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            KAM QOLGAN (≤5)
          </span>
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
            <ExclamationTriangleIcon className="w-4 h-4" />
          </div>
        </div>
        <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
          {pending} ta
        </div>
      </div>

      {/* 4. QOLDIG'I TUGAGAN (White card matching Image 2) */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            QOLDIG'I TUGAGAN
          </span>
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
            <XCircleIcon className="w-4 h-4" />
          </div>
        </div>
        <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
          0 ta
        </div>
      </div>
    </div>
  );
}


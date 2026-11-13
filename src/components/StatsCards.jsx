import React from 'react';
import {
  ClipboardDocumentListIcon,
  ClockIcon,
  CheckCircleIcon,
  ChartBarIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

export function StatsCards({ orders, onFilterClick, activeTab }) {
  const total = orders.length;
  const ready = orders.filter((o) => o.status === 'Tayyor').length;
  const pending = orders.filter((o) => o.status === 'Yangi').length;
  const percentage = total > 0 ? Math.round((ready / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* 1. Jami buyurtmalar */}
      <div
        onClick={() => onFilterClick('dashboard')}
        className={`ios-card ios-card-hover p-4 sm:p-5 flex flex-col justify-between cursor-pointer ${
          activeTab === 'dashboard' ? 'ring-2 ring-blue-500/30 border-blue-500/60' : ''
        }`}
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Jami buyurtmalar
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/60 shadow-xs">
              <ClipboardDocumentListIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {total} ta
            </span>
            <span className="text-xs text-slate-400 font-normal">ro‘yxatda</span>
          </div>
        </div>
        <div className="flex items-center text-xs font-medium text-slate-500 hover:text-blue-600 pt-2 border-t border-slate-100 transition-colors">
          <span>Barcha buyurtmalar</span>
          <ArrowRightIcon className="w-3.5 h-3.5 ml-1" />
        </div>
      </div>

      {/* 2. Yangi buyurtmalar */}
      <div
        onClick={() => onFilterClick('pending')}
        className={`ios-card ios-card-hover p-4 sm:p-5 flex flex-col justify-between cursor-pointer ${
          activeTab === 'pending' ? 'ring-2 ring-amber-500/30 border-amber-500/60' : ''
        }`}
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Kutilayotganlar (Yangi)
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100/60 shadow-xs">
              <ClockIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-amber-600">
              {pending} ta
            </span>
            <span className="text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200/60 px-2 py-0.5 rounded-full">
              Yangi
            </span>
          </div>
        </div>
        <div className="flex items-center text-xs font-medium text-slate-500 hover:text-amber-600 pt-2 border-t border-slate-100 transition-colors">
          <span>Tayyorlanishi kutilmoqda</span>
          <ArrowRightIcon className="w-3.5 h-3.5 ml-1" />
        </div>
      </div>

      {/* 3. Tayyor bo'lganlar */}
      <div
        onClick={() => onFilterClick('ready')}
        className={`ios-card ios-card-hover p-4 sm:p-5 flex flex-col justify-between cursor-pointer ${
          activeTab === 'ready' ? 'ring-2 ring-emerald-500/30 border-emerald-500/60' : ''
        }`}
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Tayyor bo‘lganlar
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/60 shadow-xs">
              <CheckCircleIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-emerald-600">
              {ready} ta
            </span>
            <span className="text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2 py-0.5 rounded-full">
              Tayyor
            </span>
          </div>
        </div>
        <div className="flex items-center text-xs font-medium text-slate-500 hover:text-emerald-600 pt-2 border-t border-slate-100 transition-colors">
          <span>Mijozga topshirishga shay</span>
          <ArrowRightIcon className="w-3.5 h-3.5 ml-1" />
        </div>
      </div>

      {/* 4. Bajarilish darajasi */}
      <div className="ios-card ios-card-hover p-4 sm:p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Bajarilish samaradorligi
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/60 shadow-xs">
              <ChartBarIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              %{percentage}
            </span>
            <span className="text-xs text-slate-400 font-normal">
              ({ready}/{total} ta)
            </span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="pt-2 border-t border-slate-100">
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-emerald-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

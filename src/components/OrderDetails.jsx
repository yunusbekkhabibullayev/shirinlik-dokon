import React from 'react';
import {
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  UserIcon,
  ShoppingBagIcon,
  CalendarDaysIcon,
  TagIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export function OrderDetails({
  order,
  onMarkReady,
}) {
  if (!order) {
    return (
      <div className="ios-card p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
          <DocumentTextIcon className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-slate-800 mb-1">
          Buyurtma tanlanmagan
        </h3>
        <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
          Tafsilotlarni ko‘rish va “Tayyor” holatiga o‘tkazish uchun chapdagi ro‘yxatdan istalgan buyurtmani bosing.
        </p>
      </div>
    );
  }

  const isReady = order.status === 'Tayyor';

  return (
    <div className="ios-card p-4 sm:p-6 shadow-xs relative overflow-hidden">
      {/* Top accent line */}
      <div
        className={`absolute top-0 inset-x-0 h-1 ${
          isReady ? 'bg-emerald-500' : 'bg-blue-600'
        }`}
      />

      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4 pt-1">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
              isReady
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                : 'bg-blue-50 text-blue-600 border border-blue-100'
            }`}
          >
            <DocumentTextIcon className="w-4 h-4 stroke-[2]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 leading-tight">
              Buyurtma tafsilotlari
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">
              ID: {order.id}
            </span>
          </div>
        </div>

        {/* Current status pill */}
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
            isReady
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
              : 'bg-amber-50 text-amber-700 border-amber-200/60'
          }`}
        >
          {isReady ? (
            <>
              <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tayyor</span>
            </>
          ) : (
            <>
              <ClockIcon className="w-3.5 h-3.5 text-amber-600" />
              <span>Yangi</span>
            </>
          )}
        </span>
      </div>

      {/* Detail Fields */}
      <div className="space-y-3 mb-5 text-xs sm:text-sm">
        {/* Mijoz */}
        <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white text-slate-600 flex items-center justify-center shadow-xs shrink-0 border border-slate-100">
            <UserIcon className="w-4 h-4 text-blue-600" />
          </div>
          <div className="overflow-hidden min-w-0">
            <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Mijoz
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-900 truncate block">
              {order.customerName}
            </span>
          </div>
        </div>

        {/* Buyurtma tavsifi */}
        <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-white text-slate-600 flex items-center justify-center shadow-xs shrink-0 border border-slate-100 mt-0.5">
            <ShoppingBagIcon className="w-4 h-4 text-blue-600" />
          </div>
          <div className="overflow-hidden w-full">
            <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Buyurtma
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 break-words">
              {order.orderTitle}
            </p>
          </div>
        </div>

        {/* Topshirish sanasi */}
        <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white text-slate-600 flex items-center justify-center shadow-xs shrink-0 border border-slate-100">
            <CalendarDaysIcon className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Topshirish sanasi
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-900">
              {order.deliveryDate}
            </span>
          </div>
        </div>

        {/* Joriy holati */}
        <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-xs shrink-0 border ${
              isReady
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                : 'bg-amber-50 text-amber-600 border-amber-100'
            }`}
          >
            <TagIcon className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Joriy holati
            </span>
            <span
              className={`text-xs sm:text-sm font-semibold ${
                isReady ? 'text-emerald-700' : 'text-amber-700'
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button (Bilet 010 talabi: Tayyor deb belgilash) */}
      <div>
        {!isReady ? (
          <button
            type="button"
            onClick={() => onMarkReady(order.id)}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <CheckCircleIcon className="w-4 h-4" />
            <span>Tayyor deb belgilash</span>
          </button>
        ) : (
          <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200/80 text-center">
            <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-semibold text-xs sm:text-sm">
              <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
              <span>Buyurtma allaqachon tayyorlangan</span>
            </div>
            <p className="text-[11px] text-emerald-700 mt-0.5">
              Holat: <strong>Tayyor</strong>. Mijozga topshirishga shay.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

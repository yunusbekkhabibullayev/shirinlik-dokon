import React from 'react';
import {
  CalendarDaysIcon,
  UserIcon,
  CheckCircleIcon,
  ClockIcon,
  ChevronRightIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';

export function OrderCard({
  order,
  isSelected,
  onSelect,
  onMarkReady,
}) {
  const isReady = order.status === 'Tayyor';

  return (
    <div
      onClick={() => onSelect(order)}
      className={`ios-card p-4 sm:p-5 transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'ring-2 ring-blue-500/40 border-blue-500 bg-blue-50/20 shadow-sm'
          : 'hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      {/* Top row: Customer Name & Status Badge */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
              isReady
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                : 'bg-amber-50 text-amber-700 border border-amber-200/60'
            }`}
          >
            <UserIcon className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-slate-900 truncate">
              {order.customerName}
            </h4>
            <span className="text-[10px] text-slate-400 font-mono block">
              ID: {order.id}
            </span>
          </div>
        </div>

        {/* Status Badge */}
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0 border ${
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

      {/* Middle: Order description */}
      <div className="mb-3 pl-0.5">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium mb-1">
          <ShoppingBagIcon className="w-3.5 h-3.5 text-slate-400" />
          <span>Buyurtma tavsifi:</span>
        </div>
        <p className="text-xs sm:text-sm font-medium text-slate-800 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100 break-words">
          {order.orderTitle}
        </p>
      </div>

      {/* Bottom row: Delivery Date + Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-1.5 text-slate-600 font-normal">
          <CalendarDaysIcon className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-[11px] text-slate-400">Sana:</span>
          <span className="font-semibold text-slate-700">{order.deliveryDate}</span>
        </div>

        <div className="flex items-center gap-2">
          {!isReady && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onMarkReady(order.id);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-transform active:scale-95 cursor-pointer"
              title="Tayyor deb belgilash"
            >
              <CheckCircleIcon className="w-3.5 h-3.5" />
              <span>Tayyor qilish</span>
            </button>
          )}

          <span className="text-xs font-medium text-slate-400 flex items-center">
            {isSelected ? (
              <span className="text-blue-600 font-semibold">Tanlangan</span>
            ) : (
              <span>Tafsilot</span>
            )}
            <ChevronRightIcon className="w-3.5 h-3.5 ml-0.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

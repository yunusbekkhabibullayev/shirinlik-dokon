import React from 'react';
import {
  EyeIcon,
  CheckCircleIcon,
  ShoppingBagIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';

export function ProductOrderCard({
  order,
  isSelected,
  onSelect,
  onMarkReady,
}) {
  const isReady = order.status === 'Tayyor';

  return (
    <div
      onClick={() => onSelect(order)}
      className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between ${
        isSelected
          ? 'ring-2 ring-[#CC1122] border-[#CC1122]'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div>
        {/* Card Header & Product Image */}
        <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden group">
          {/* Category dark pill matching Image 2 */}
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-[#0F172A] text-white px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm">
              {order.category || 'SHIRINLIKLAR'}
            </span>
          </div>

          {/* Delivery date badge on top right */}
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-white/95 backdrop-blur-md text-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-sm border border-slate-200/80 flex items-center gap-1">
              <CalendarDaysIcon className="w-3 h-3 text-[#CC1122]" />
              <span>{order.deliveryDate}</span>
            </span>
          </div>

          {/* Product Image */}
          <img
            src={order.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=80'}
            alt={order.orderTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-2">
          {/* Title & Customer */}
          <div>
            <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1 leading-snug">
              {order.orderTitle}
            </h4>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Mijoz: <span className="font-bold text-slate-800">{order.customerName}</span>
            </p>
          </div>

          {/* Price */}
          <div className="font-extrabold text-sm text-slate-900">
            {order.price || '120 000 so\'m'}
          </div>

          {/* Quantity & Status Badges matching Image 2 */}
          <div className="flex items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 border border-teal-200/70 text-[11px] font-bold">
              <ShoppingBagIcon className="w-3 h-3" />
              <span>{order.quantity || '1 dona'}</span>
            </span>

            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
                isReady
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70'
                  : 'bg-amber-50 text-amber-700 border-amber-200/70'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isReady ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
                }`}
              />
              <span>{order.status}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Card Bottom Actions matching Image 2: Batafsil + Edit / Tayyor qilish */}
      <div className="p-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-1.5">
        {/* Batafsil tugmasi */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(order);
          }}
          className="flex-1 py-1.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <EyeIcon className="w-3.5 h-3.5 text-slate-500" />
          <span>Batafsil</span>
        </button>

        {/* Tayyor deb belgilash tugmasi */}
        {!isReady ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMarkReady(order.id);
            }}
            title="Tayyor deb belgilash"
            className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1 transition-all active:scale-95 shadow-xs cursor-pointer"
          >
            <CheckCircleIcon className="w-3.5 h-3.5" />
            <span>Tayyor</span>
          </button>
        ) : (
          <span className="py-1.5 px-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center gap-1 border border-emerald-200">
            <CheckCircleIcon className="w-3.5 h-3.5" />
            <span>Tayyor</span>
          </span>
        )}
      </div>
    </div>
  );
}

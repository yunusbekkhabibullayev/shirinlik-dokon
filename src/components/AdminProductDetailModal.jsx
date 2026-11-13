import React from 'react';
import {
  XMarkIcon,
  CheckCircleIcon,
  ClockIcon,
  UserIcon,
  ShoppingBagIcon,
  CalendarDaysIcon,
  TagIcon,
  PhoneIcon,
  TrashIcon,
  ArrowPathRoundedSquareIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

const STATUS_OPTIONS = [
  {
    id: 'Yangi',
    label: 'Kutilmoqda',
    activeClass: 'bg-amber-500 text-white shadow-md shadow-amber-500/25',
    inactiveClass: 'bg-white text-slate-600 border border-slate-200 hover:bg-amber-50 hover:text-amber-700',
    icon: ClockIcon,
  },
  {
    id: 'Jarayonda',
    label: 'Tayyorlanmoqda',
    activeClass: 'bg-blue-600 text-white shadow-md shadow-blue-600/25',
    inactiveClass: 'bg-white text-slate-600 border border-slate-200 hover:bg-blue-50 hover:text-blue-700',
    icon: ArrowPathRoundedSquareIcon,
  },
  {
    id: 'Tayyor',
    label: 'Tayyorlandi',
    activeClass: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25',
    inactiveClass: 'bg-white text-slate-600 border border-slate-200 hover:bg-emerald-50 hover:text-emerald-700',
    icon: CheckCircleIcon,
  },
  {
    id: 'Bekor qilingan',
    label: 'Bekor qilingan',
    activeClass: 'bg-rose-600 text-white shadow-md shadow-rose-600/25',
    inactiveClass: 'bg-white text-slate-600 border border-slate-200 hover:bg-rose-50 hover:text-rose-700',
    icon: XCircleIcon,
  },
];

export function AdminProductDetailModal({
  order,
  onClose,
  onMarkReady,
  onUpdateStatus,
  onDeleteOrder,
}) {
  if (!order) return null;

  const handleStatusClick = (newStatus) => {
    if (onUpdateStatus) {
      onUpdateStatus(order.id, newStatus);
    } else if (newStatus === 'Tayyor' && onMarkReady) {
      onMarkReady(order.id);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Haqiqatan ham "${order.customerName}" buyurtmasini o'chirmoqchimisiz?`)) {
      if (onDeleteOrder) {
        onDeleteOrder(order.id);
      }
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-xl rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-100 animate-scaleUp max-h-[92vh] overflow-y-auto relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ─── 1. TOP HEADER BAR ────────────────────────── */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF0F1] text-[#CC1122] flex items-center justify-center font-bold border border-[#FFE4E6] shrink-0">
              <ShoppingBagIcon className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-slate-900 text-base sm:text-lg leading-tight">
                  Buyurtma tafsilotlari
                </h3>
                <span className="text-xs font-mono font-bold text-slate-400">
                  #{order.id}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
                Topshirish muddati: {order.deliveryDate}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Yopish"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* ─── 2. STATUS CHANGING INTERACTIVE CONTROL ─────── */}
        <div className="mb-5 p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200/80">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
              Buyurtma holatini yangilash (Status)
            </span>
            <span className="text-[11px] font-bold text-slate-400">
              Joriy: <strong className="text-slate-800">{order.status}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {STATUS_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isActive = order.status === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleStatusClick(opt.id)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
                    isActive ? opt.activeClass : opt.inactiveClass
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span className="truncate">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── 3. ORDERED ITEM & IMAGE CARD ─────────────── */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 mb-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
              Buyurtma qilingan mahsulot
            </span>
            <span className="bg-[#0F172A] text-white px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider">
              {order.category || 'TORTLAR'}
            </span>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-100 border border-slate-200/80 overflow-hidden shrink-0 shadow-2xs">
              <img
                src={order.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=80'}
                alt={order.orderTitle}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug truncate">
                {order.orderTitle}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-bold text-[#CC1122]">
                  {order.price || '120 000 so\'m'}
                </span>
                <span className="text-slate-300 font-bold">·</span>
                <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                  {order.quantity || '1 dona'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── 4. CUSTOMER & DELIVERY INFO GRID ─────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {/* Mijoz ma'lumotlari */}
          <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/70 space-y-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
              Mijoz ma'lumotlari
            </span>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 font-bold shrink-0">
                <UserIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-extrabold text-slate-900 truncate">
                  {order.customerName}
                </p>
                <p className="text-[10px] text-slate-400 font-medium">Doimiy mijoz</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1 text-[11px] font-semibold text-slate-600">
              <PhoneIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{order.phone || '+998 90 123 45 67'}</span>
            </div>
          </div>

          {/* Topshirish sanasi va holati */}
          <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/70 space-y-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
              Topshirish va Status
            </span>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#CC1122] font-bold shrink-0">
                <CalendarDaysIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-extrabold text-slate-900">
                  {order.deliveryDate}
                </p>
                <p className="text-[10px] text-slate-400 font-medium">Belgilangan muddat</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1 text-[11px]">
              <TagIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-bold text-slate-500">Holat:</span>
              <span className="font-black px-2 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-800">
                {order.status}
              </span>
            </div>
          </div>
        </div>

        {/* ─── 5. ACTION BUTTONS ROW AT BOTTOM ─────────── */}
        <div className="flex items-center gap-2.5 pt-4 border-t border-slate-100">
          {/* Delete button */}
          <button
            type="button"
            onClick={handleDelete}
            className="p-3 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-colors cursor-pointer border border-rose-200/80 active:scale-95"
            title="Buyurtmani o'chirish"
          >
            <TrashIcon className="w-4 h-4" />
          </button>

          {/* Tayyor deb belgilash quick action */}
          <button
            type="button"
            onClick={() => handleStatusClick('Tayyor')}
            className="flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25"
          >
            <CheckCircleIcon className="w-4 h-4 stroke-[2.5]" />
            <span>Tayyor deb belgilash</span>
          </button>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon as SearchIcon,
  CalendarDaysIcon,
  XMarkIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  CreditCardIcon,
  TrashIcon,
  ArrowLeftIcon,
  Squares2X2Icon as GridIcon,
  Bars3Icon as ListIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowPathRoundedSquareIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { useLanguage } from '../context/useLanguage';

function getStatusConfig(status, t) {
  switch (status) {
    case 'Yangi':
      return {
        pill: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
        dot: 'bg-amber-500',
        pulse: true,
        label: t('pending'),
        icon: ClockIcon,
      };
    case 'Jarayonda':
      return {
        pill: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
        dot: 'bg-blue-500',
        pulse: false,
        label: t('processing'),
        icon: ArrowPathRoundedSquareIcon,
      };
    case 'Tayyor':
      return {
        pill: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
        dot: 'bg-emerald-500',
        pulse: false,
        label: t('ready'),
        icon: CheckCircleIcon,
      };
    case 'Bekor qilingan':
      return {
        pill: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
        dot: 'bg-rose-500',
        pulse: false,
        label: t('cancelled'),
        icon: XCircleIcon,
      };
    default:
      return {
        pill: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
        dot: 'bg-amber-500',
        pulse: true,
        label: t('pending'),
        icon: ClockIcon,
      };
  }
}

const ALL_STATUSES = ['Yangi', 'Jarayonda', 'Tayyor', 'Bekor qilingan'];
const ITEMS_PER_PAGE = 8;

// ─────────────────────────────────────────────────────────────────────────────
// STATUS PILL DROPDOWN — HOLATI ustunida bosib o'zgartirish
// ─────────────────────────────────────────────────────────────────────────────
function StatusDropdown({ orderId, currentStatus, onUpdateStatus, t }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const cfg = getStatusConfig(currentStatus, t);
  const CurrentIcon = cfg.icon;

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-2xs ${cfg.pill}`}
        title="Status"
      >
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot} ${cfg.pulse ? 'animate-pulse' : ''}`} />
        <CurrentIcon className="w-3.5 h-3.5 stroke-[2.2]" />
        <span>{cfg.label}</span>
        <ChevronDownIcon className={`w-3 h-3 stroke-[2.5] opacity-60 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          className="absolute z-50 mt-1.5 right-0 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden min-w-[170px] py-1 animate-fadeIn text-left"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-3 py-1.5 text-[10px] font-black uppercase text-slate-400 border-b border-slate-100 tracking-wider">
            {t('status')}
          </div>
          {ALL_STATUSES.map((s) => {
            const c = getStatusConfig(s, t);
            const StatusIcon = c.icon;
            const isActive = s === currentStatus;
            return (
              <button
                key={s}
                type="button"
                onClick={() => {
                  if (!isActive) onUpdateStatus(orderId, s);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-bold transition-colors text-left cursor-pointer ${
                  isActive
                    ? 'bg-slate-100 text-slate-900 font-black'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${c.dot}`} />
                <StatusIcon className="w-3.5 h-3.5 opacity-70" />
                <span className="flex-1">{c.label}</span>
                {isActive && <span className="text-xs text-[#CC1122] font-black">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGINATION COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1.5 py-4 px-4 select-none">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
        title="Oldingi"
      >
        <ChevronLeftIcon className="w-4 h-4 stroke-[2.5]" />
      </button>

      {getPageNumbers().map((page, idx) =>
        page === '...' ? (
          <span key={`dots-${idx}`} className="px-2 text-slate-400 text-xs font-bold">
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`min-w-[36px] h-9 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
              page === currentPage
                ? 'bg-[#CC1122] text-white shadow-xs'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
        title="Keyingi"
      >
        <ChevronRightIcon className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN ORDERS VIEW
// ─────────────────────────────────────────────────────────────────────────────
export function AdminOrdersView({
  orders,
  onMarkReady,
  onUpdateStatus,
  onDeleteOrder,
  onOpenNewOrderModal,
}) {
  const { t } = useLanguage();
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);

  // Sync selectedOrderDetail if orders update
  const currentDetailOrder = useMemo(() => {
    if (!selectedOrderDetail) return null;
    return orders.find((o) => o.id === selectedOrderDetail.id) || selectedOrderDetail;
  }, [orders, selectedOrderDetail]);

  // Counts per status
  const counts = useMemo(() => {
    return {
      all: orders.length,
      Yangi: orders.filter((o) => o.status === 'Yangi').length,
      Tayyor: orders.filter((o) => o.status === 'Tayyor').length,
    };
  }, [orders]);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // 1. Status filter
      if (selectedStatus !== 'all' && order.status !== selectedStatus) return false;

      // 2. Search query filter
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const numId = (order.id || '').replace('ORD-', '').replace('#', '');
        const matchCustomer = (order.customerName || '').toLowerCase().includes(q);
        const matchTitle = (order.orderTitle || '').toLowerCase().includes(q);
        const matchId = (order.id || '').toLowerCase().includes(q) || numId.includes(q);
        const matchDate = (order.deliveryDate || '').toLowerCase().includes(q);
        const matchAddress = (order.address || '').toLowerCase().includes(q);
        if (!matchCustomer && !matchTitle && !matchId && !matchDate && !matchAddress) {
          return false;
        }
      }

      return true;
    });
  }, [orders, selectedStatus, search]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const pagedOrders = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOrders.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  // Reset page when filters change
  const [prevFilter, setPrevFilter] = useState({ selectedStatus, search });
  if (prevFilter.selectedStatus !== selectedStatus || prevFilter.search !== search) {
    setPrevFilter({ selectedStatus, search });
    setCurrentPage(1);
  }

  const handleUpdateStatus = (orderId, newStatus) => {
    if (onUpdateStatus) {
      onUpdateStatus(orderId, newStatus);
    } else if (newStatus === 'Tayyor' && onMarkReady) {
      onMarkReady(orderId);
    }
  };

  const handleDelete = (order) => {
    if (window.confirm(`Haqiqatan ham "${order.customerName}" buyurtmasini o'chirmoqchimisiz?`)) {
      if (onDeleteOrder) onDeleteOrder(order.id);
      if (selectedOrderDetail && selectedOrderDetail.id === order.id) {
        setSelectedOrderDetail(null);
      }
    }
  };

  // ─────────────────────────────────────────────────────────────
  // VIEW 1: ORDER DETAIL PAGE
  // ─────────────────────────────────────────────────────────────
  if (currentDetailOrder) {
    const numId =
      String(currentDetailOrder.id || '').replace('ORD-', '').replace(/^0+/, '') || '1';
    const cfg = getStatusConfig(currentDetailOrder.status, t);
    const priceText = currentDetailOrder.price || '120 000 so\'m';
    const customerPhone = currentDetailOrder.phone || '+998 90 123 45 67';
    const customerAddress = currentDetailOrder.address || 'Toshkent sh., Chilonzor tumani';
    const mapLink = `https://yandex.uz/maps/?text=${encodeURIComponent(customerAddress)}`;

    return (
      <div className="space-y-6 text-left animate-fadeIn">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setSelectedOrderDetail(null)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-black text-slate-700 transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <ArrowLeftIcon className="w-4 h-4 stroke-[2.2]" />
            <span>{t('back')}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenNewOrderModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#CC1122] hover:bg-[#A80D1B] text-white text-xs font-black shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <PlusIcon className="w-4 h-4 stroke-[2.5]" />
              <span>{t('newOrder')}</span>
            </button>
            <button
              type="button"
              onClick={() => handleDelete(currentDetailOrder)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-black transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <TrashIcon className="w-4 h-4 stroke-[2.2]" />
              <span>{t('deleteOrder')}</span>
            </button>
          </div>
        </div>

        {/* Two Columns */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* LEFT: Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xs overflow-hidden p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FFF0F1] text-[#CC1122] flex items-center justify-center font-bold border border-[#FFE4E6]">
                    <ShoppingBagIcon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-base sm:text-lg leading-tight">
                      {t('orderDetailTitle')}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono font-bold mt-0.5">#{numId}</p>
                  </div>
                </div>

                <StatusDropdown
                  orderId={currentDetailOrder.id}
                  currentStatus={currentDetailOrder.status}
                  onUpdateStatus={handleUpdateStatus}
                  t={t}
                />
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <span className="text-xs font-black text-slate-900 block">
                  {t('orderItems')} (1)
                </span>
                <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-2xl overflow-hidden bg-white">
                  <div className="p-3 sm:p-4 flex items-center gap-3.5 text-xs hover:bg-slate-50/60 transition-colors">
                    <div className="w-14 h-14 rounded-xl bg-slate-50 overflow-hidden shrink-0 border border-slate-200/80 flex items-center justify-center shadow-2xs">
                      <img
                        src={
                          currentDetailOrder.image ||
                          'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=80'
                        }
                        alt={currentDetailOrder.orderTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-extrabold text-slate-900 text-xs sm:text-sm truncate">
                        {currentDetailOrder.orderTitle}
                      </p>
                      <p className="text-[11px] text-slate-400 font-bold mt-0.5">
                        {priceText} × {currentDetailOrder.quantity || '1 dona'}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-black text-slate-900 text-xs sm:text-sm font-mono">
                        {priceText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Totals */}
              <div className="space-y-2 pt-4 border-t border-slate-100 text-xs font-bold text-slate-600">
                <div className="flex justify-between">
                  <span>{t('subtotal')}</span>
                  <span className="font-mono text-slate-900">{priceText}</span>
                </div>
                <div className="flex justify-between font-black text-sm sm:text-base text-slate-950 pt-2 border-t border-slate-100">
                  <span>{t('total')}</span>
                  <span className="text-[#CC1122] font-mono">{priceText}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Customer Info */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xs p-5 sm:p-6 space-y-4">
              <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2.5">
                {t('customerInfo')}
              </h3>

              {/* Mijoz */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 font-bold shrink-0">
                  <UserIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                    {t('colCustomer')}
                  </p>
                  <p className="text-xs font-black text-slate-900 mt-0.5 truncate">
                    {currentDetailOrder.customerName}
                  </p>
                </div>
              </div>

              {/* Telefon */}
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                    {t('phone')}
                  </p>
                  <a
                    href={`tel:${customerPhone.replace(/[^0-9+]/g, '')}`}
                    className="text-xs font-black text-emerald-600 mt-0.5 hover:underline font-mono block"
                  >
                    {customerPhone}
                  </a>
                </div>
              </div>

              {/* Manzil */}
              <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 shrink-0 mt-0.5">
                  <MapPinIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1 text-xs">
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                    {t('address')}
                  </p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5 leading-relaxed">
                    {customerAddress}
                  </p>
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-[11px] font-black transition-colors"
                  >
                    <span>{t('viewOnMap')}</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>

              {/* To'lov */}
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                  <CreditCardIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                    {t('paymentMethod')}
                  </p>
                  <p className="text-xs font-bold text-slate-900 mt-0.5">{t('cash')}</p>
                </div>
              </div>

              {/* Sana */}
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                  <CalendarDaysIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                    {t('deliveryTime')}
                  </p>
                  <p className="text-xs font-bold text-slate-900 mt-0.5 font-mono">
                    {currentDetailOrder.deliveryDate} 12:00
                  </p>
                </div>
              </div>

              {/* Status + change */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div>
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                    {t('status')}
                  </p>
                  <p className={`text-xs font-black mt-0.5 ${cfg.pill.includes('emerald') ? 'text-emerald-700' : cfg.pill.includes('amber') ? 'text-amber-700' : cfg.pill.includes('blue') ? 'text-blue-700' : 'text-rose-700'}`}>
                    {cfg.label}
                  </p>
                </div>
                <StatusDropdown
                  orderId={currentDetailOrder.id}
                  currentStatus={currentDetailOrder.status}
                  onUpdateStatus={handleUpdateStatus}
                  t={t}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // VIEW 2: ORDERS LIST
  // ─────────────────────────────────────────────────────────────

  const STATUS_TABS = [
    { id: 'all', label: t('all'), dot: null },
    { id: 'Yangi', label: 'Yangi', dot: 'bg-amber-500' },
    { id: 'Tayyor', label: 'Tayyor', dot: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-4 text-left animate-fadeIn">
      {/* ─── TOP HERO BANNER ─────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#FFF0F1] text-[#CC1122] flex items-center justify-center border border-[#FFE4E6] shadow-2xs shrink-0">
            <ShoppingBagIcon className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900 leading-tight">
              {t('ordersTitle')}
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              {t('ordersSubtitle')}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenNewOrderModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#CC1122] hover:bg-[#A80D1B] text-white text-xs font-black shadow-md shadow-[#CC1122]/20 transition-all cursor-pointer active:scale-95 shrink-0"
        >
          <PlusIcon className="w-4 h-4 stroke-[2.5]" />
          <span>{t('newOrder')}</span>
        </button>
      </div>

      {/* ─── SEARCH & STATUS FILTER ─────────────────────────────── */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-3">
        {/* Row 1: Search bar */}
        <div className="relative">
          <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full bg-[#F8FAFC] border border-slate-200 pl-10 pr-9 py-2.5 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#CC1122] transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Row 2: Status Tabs + View Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1 min-w-0">
            {STATUS_TABS.map((tab) => {
              const count = tab.id === 'all' ? counts.all : (counts[tab.id] || 0);
              const isActive = selectedStatus === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedStatus(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#CC1122] text-white shadow-xs font-black'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {tab.dot && (
                    <span
                      className={`w-2 h-2 rounded-full ${tab.dot} ${isActive ? 'opacity-80' : ''}`}
                    />
                  )}
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                      isActive ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-[#CC1122] shadow-2xs'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Karta"
            >
              <GridIcon className="w-4 h-4 stroke-[2.2]" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-[#CC1122] shadow-2xs'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Jadval"
            >
              <ListIcon className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </div>

      {/* ─── TABLE / GRID VIEW ─────────────────────────────────── */}
      {filteredOrders.length > 0 ? (
        <>
          {viewMode === 'table' ? (
            <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-black text-slate-400 uppercase tracking-wider">
                      <th className="py-4 px-6">{t('colCustomer')}</th>
                      <th className="py-4 px-6">{t('colOrder')}</th>
                      <th className="py-4 px-6">{t('colDate')}</th>
                      <th className="py-4 px-6 text-right">{t('colStatus')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-800">
                    {pagedOrders.map((order) => {
                      const firstLetter = (order.customerName || 'U').charAt(0).toUpperCase();
                      const customerPhone = order.phone || '+998 90 123 45 67';

                      return (
                        <tr
                          key={order.id}
                          onClick={() => setSelectedOrderDetail(order)}
                          className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                        >
                          {/* 1. MIJOZ */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 font-black text-xs border border-slate-200/80 shrink-0">
                                {firstLetter}
                              </div>
                              <div className="min-w-0">
                                <p className="font-black text-slate-900 text-xs truncate">
                                  {order.customerName}
                                </p>
                                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                                  {customerPhone}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* 2. BUYURTMA */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-xs">
                                {order.orderTitle}
                              </span>
                              {order.quantity && (
                                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60 shrink-0">
                                  {order.quantity}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* 3. TOPSHIRISH SANASI */}
                          <td className="py-4 px-6 whitespace-nowrap">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 font-mono">
                              <CalendarDaysIcon className="w-4 h-4 text-slate-400 shrink-0" />
                              <span>{order.deliveryDate}</span>
                            </div>
                          </td>

                          {/* 4. HOLATI */}
                          <td
                            className="py-4 px-6 text-right whitespace-nowrap"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <StatusDropdown
                              orderId={order.id}
                              currentStatus={order.status}
                              onUpdateStatus={handleUpdateStatus}
                              t={t}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="border-t border-slate-100">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </div>
          ) : (
            /* ─── GRID VIEW ─────────────────────────────────────────── */
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pagedOrders.map((order) => {
                  const numId =
                    String(order.id || '').replace('ORD-', '').replace(/^0+/, '') || '1';
                  const cfg = getStatusConfig(order.status, t);
                  const priceText = order.price || '120 000 so\'m';

                  return (
                    <div
                      key={order.id}
                      onClick={() => setSelectedOrderDetail(order)}
                      className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                          <span className="px-2 py-0.5 rounded-lg bg-slate-900 text-white font-mono font-black text-xs">
                            #{numId}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black border ${cfg.pill}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            <span>{cfg.label}</span>
                          </span>
                        </div>
                        <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-[#CC1122] transition-colors truncate">
                          {order.orderTitle}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">{t('colCustomer')}: {order.customerName}</p>
                        <p className="text-xs font-bold text-[#CC1122] mt-2 font-mono">{priceText}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400">
                          {order.deliveryDate}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOrderDetail(order);
                          }}
                          className="px-3 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200"
                        >
                          {t('colActions')}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xs">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <ShoppingBagIcon className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-extrabold text-slate-800 mb-1">Buyurtmalar topilmadi</h4>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            {search
              ? `"${search}" bo'yicha hech qanday buyurtma topilmadi.`
              : 'Ushbu bo\'limda hozircha buyurtma mavjud emas.'}
          </p>
        </div>
      )}
    </div>
  );
}

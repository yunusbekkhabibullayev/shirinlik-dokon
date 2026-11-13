import React, { useState, useMemo } from 'react';
import { OrderCard } from './OrderCard';
import {
  MagnifyingGlassIcon as SearchIcon,
  ClipboardDocumentListIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export function OrderList({
  orders,
  selectedOrder,
  onSelectOrder,
  onMarkReady,
  filterTab,
  setFilterTab,
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (filterTab === 'pending' && order.status !== 'Yangi') return false;
      if (filterTab === 'ready' && order.status !== 'Tayyor') return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchCustomer = order.customerName.toLowerCase().includes(query);
        const matchTitle = order.orderTitle.toLowerCase().includes(query);
        const matchDate = order.deliveryDate.toLowerCase().includes(query);
        const matchStatus = order.status.toLowerCase().includes(query);
        return matchCustomer || matchTitle || matchDate || matchStatus;
      }

      return true;
    });
  }, [orders, filterTab, searchQuery]);

  const totalCount = orders.length;
  const pendingCount = orders.filter((o) => o.status === 'Yangi').length;
  const readyCount = orders.filter((o) => o.status === 'Tayyor').length;

  return (
    <div className="ios-card p-4 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight">
              Buyurtmalar ro‘yxati
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {filteredOrders.length} ta
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Ro‘yxatdan tanlab, tafsilotlarni ko‘rish va tayyor holatga o‘tkazish mumkin
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 p-1 bg-slate-100/80 rounded-xl overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => setFilterTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              filterTab === 'dashboard'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Barchasi ({totalCount})
          </button>

          <button
            type="button"
            onClick={() => setFilterTab('pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              filterTab === 'pending'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-amber-600'
            }`}
          >
            Yangi ({pendingCount})
          </button>

          <button
            type="button"
            onClick={() => setFilterTab('ready')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              filterTab === 'ready'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-600'
            }`}
          >
            Tayyor ({readyCount})
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <SearchIcon className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Mijoz ismi, buyurtma yoki sana bo‘yicha qidirish..."
          className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50/70 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Grid of Order Cards */}
      {filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              isSelected={selectedOrder?.id === order.id}
              onSelect={onSelectOrder}
              onMarkReady={onMarkReady}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 px-4 rounded-2xl bg-slate-50/60 border border-dashed border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2">
            <ClipboardDocumentListIcon className="w-5 h-5" />
          </div>
          <h4 className="text-xs sm:text-sm font-semibold text-slate-800 mb-0.5">
            Buyurtmalar topilmadi
          </h4>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            {searchQuery
              ? `"${searchQuery}" so‘rovi bo‘yicha hech narsa chiqmadi.`
              : 'Ushbu bo‘limda hozircha buyurtma mavjud emas.'}
          </p>
        </div>
      )}
    </div>
  );
}

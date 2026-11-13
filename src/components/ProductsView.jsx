import React, { useState, useMemo } from 'react';
import { ProductsSummaryCards } from './ProductsSummaryCards';
import { ProductOrderCard } from './ProductOrderCard';
import {
  MagnifyingGlassIcon as SearchIcon,
  PlusIcon,
  Squares2X2Icon as GridIcon,
  Bars3Icon as ListIcon,
  XMarkIcon,
  ChevronDownIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

export function ProductsView({
  orders,
  selectedOrder,
  onSelectOrder,
  onMarkReady,
  onOpenNewOrderModal,
}) {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'ready' | 'pending'
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const totalCount = orders.length;
  const readyCount = orders.filter((o) => o.status === 'Tayyor').length;
  const pendingCount = orders.filter((o) => o.status === 'Yangi').length;

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Status filter
      if (filterStatus === 'ready' && order.status !== 'Tayyor') return false;
      if (filterStatus === 'pending' && order.status !== 'Yangi') return false;

      // Category filter
      if (selectedCat !== 'all' && order.category !== selectedCat) return false;

      // Search query
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchCustomer = order.customerName.toLowerCase().includes(q);
        const matchTitle = order.orderTitle.toLowerCase().includes(q);
        const matchId = order.id.toLowerCase().includes(q);
        const matchDate = order.deliveryDate.toLowerCase().includes(q);
        return matchCustomer || matchTitle || matchId || matchDate;
      }

      return true;
    });
  }, [orders, filterStatus, selectedCat, search]);

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* 1. Top 4 Metric Cards matching Image 2 */}
      <ProductsSummaryCards
        orders={orders}
        activeFilter={filterStatus}
        onFilterChange={setFilterStatus}
      />

      {/* 2. Search & Action Row matching Image 2 */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative w-full md:flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <SearchIcon className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nomi yoki ID bo'yicha qidirish..."
            className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-slate-50/70 rounded-2xl border border-slate-200 outline-none focus:bg-white focus:border-[#CC1122] focus:ring-2 focus:ring-[#FFE4E6] transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category dropdown & Red "+ Yangi buyurtma" button */}
        <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
          <div className="relative flex-1 md:flex-initial">
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="w-full md:w-44 pl-3 pr-8 py-2.5 text-xs sm:text-sm font-semibold bg-slate-50/70 border border-slate-200 rounded-2xl appearance-none outline-none focus:bg-white focus:border-[#CC1122] transition-colors cursor-pointer"
            >
              <option value="all">Barcha toifalar</option>
              <option value="TORTLAR">Tortlar</option>
              <option value="KEKSLAR">Kekslar</option>
              <option value="PIROGLAR">Piroglar</option>
            </select>
            <ChevronDownIcon className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            type="button"
            onClick={onOpenNewOrderModal}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#CC1122] hover:bg-[#b00e1e] active:scale-95 text-white font-black text-xs sm:text-sm shadow-md shadow-[#CC1122]/30 transition-all cursor-pointer whitespace-nowrap"
          >
            <PlusIcon className="w-4 h-4 stroke-[3]" />
            <span>Yangi buyurtma</span>
          </button>
        </div>
      </div>

      {/* 3. Filter Pills Row matching Image 2 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        {/* Status filter pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {/* Barchasi */}
          <button
            type="button"
            onClick={() => setFilterStatus('all')}
            className={`px-3.5 py-1.5 rounded-2xl text-xs font-black transition-all cursor-pointer ${
              filterStatus === 'all'
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {totalCount}
          </button>

          {/* Tayyor (Mavjud) */}
          <button
            type="button"
            onClick={() => setFilterStatus('ready')}
            className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              filterStatus === 'ready'
                ? 'bg-emerald-600 text-white shadow-xs font-black'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${filterStatus === 'ready' ? 'bg-white' : 'bg-emerald-500'}`} />
            <span>Tayyor {readyCount}</span>
          </button>

          {/* Yangi (Kutilayotgan) */}
          <button
            type="button"
            onClick={() => setFilterStatus('pending')}
            className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              filterStatus === 'pending'
                ? 'bg-amber-500 text-white shadow-xs font-black'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${filterStatus === 'pending' ? 'bg-white' : 'bg-amber-500'}`} />
            <span>Yangi {pendingCount}</span>
          </button>
        </div>

        {/* Sort & Grid/List toggles */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-2xl appearance-none outline-none cursor-pointer shadow-xs"
            >
              <option value="default">Standart (Yangi qo‘shilganlar)</option>
              <option value="name">Mijoz nomi bo‘yicha</option>
              <option value="date">Sana bo‘yicha</option>
            </select>
            <ChevronDownIcon className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="flex items-center p-1 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-400'
              }`}
              title="Katak ko'rinishi"
            >
              <GridIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-400'
              }`}
              title="Ro'yxat ko'rinishi"
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Products Grid matching Image 2 */}
      {filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredOrders.map((order) => (
            <ProductOrderCard
              key={order.id}
              order={order}
              isSelected={selectedOrder?.id === order.id}
              onSelect={onSelectOrder}
              onMarkReady={onMarkReady}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <ClipboardDocumentListIcon className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-extrabold text-slate-800 mb-1">
            Buyurtmalar topilmadi
          </h4>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            {search
              ? `"${search}" qidiruvi bo‘yicha hech qanday buyurtma chiqmadi.`
              : 'Tanlangan parametrlar bo‘yicha buyurtmalar mavjud emas.'}
          </p>
        </div>
      )}
    </div>
  );
}


import React, { useState } from 'react';
import {
  ShoppingBagIcon,
  BanknotesIcon,
  SparklesIcon,
  ClockIcon,
  ArrowRightIcon,
  ArrowPathIcon,
  PlusIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const SALES_DATA_7 = [
  { day: 'Dush', savdo: 480000, buyurtma: 4 },
  { day: 'Sesh', savdo: 620000, buyurtma: 5 },
  { day: 'Chor', savdo: 510000, buyurtma: 3 },
  { day: 'Pay', savdo: 730000, buyurtma: 6 },
  { day: 'Jum', savdo: 920000, buyurtma: 8 },
  { day: 'Shan', savdo: 1250000, buyurtma: 10 },
  { day: 'Yak', savdo: 1100000, buyurtma: 9 },
];

export function AdminDashboardView({
  orders,
  onSelectOrder,
  onMarkReady: _onMarkReady,
  onOpenNewOrderModal,
  onNavigateToOrders,
}) {
  const [metricTab, setMetricTab] = useState('tushum'); // 'tushum' | 'buyurtmalar'
  const [periodTab, setPeriodTab] = useState('7'); // '7' | '14' | '30'

  const totalCount = orders.length;
  const pendingCount = orders.filter((o) => o.status === 'Yangi').length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Welcome Card matching online store screenshot */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Do‘kon onlayn & faol
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-50 text-slate-600 border border-slate-200">
                <CalendarDaysIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>2026-11-13 12:08</span>
              </span>
            </div>

            <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
              XUSH KELIBSIZ,
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Yunusbek Khabibullayev (Dasturchi)</span>
              <span>✌️</span>
            </h2>

            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
              Bugungi umumiy savdo va operatsiyalar holati
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => {}}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <ArrowPathIcon className="w-4 h-4 text-slate-500" />
              <span>Yangilash</span>
            </button>

            <button
              type="button"
              onClick={onOpenNewOrderModal}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black text-white bg-[#CC1122] hover:bg-[#b00e1e] shadow-md shadow-[#CC1122]/30 transition-all active:scale-95 cursor-pointer"
            >
              <PlusIcon className="w-4 h-4 stroke-[3]" />
              <span>Mahsulot qo‘shish</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. 4 Metric Cards matching online store screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* BUGUNGI BUYURTMALAR */}
        <div
          onClick={onNavigateToOrders}
          className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
              BUGUNGI BUYURTMALAR
            </span>
            <div className="w-9 h-9 rounded-2xl bg-[#FFF0F1] text-[#CC1122] flex items-center justify-center">
              <ShoppingBagIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
            {totalCount} ta
          </div>
          <div className="flex items-center text-xs font-bold text-slate-500 group-hover:text-[#CC1122] transition-colors">
            <span>Barcha buyurtmalar &rarr;</span>
          </div>
        </div>

        {/* BUGUNGI TUSHUM */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
              BUGUNGI TUSHUM
            </span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <BanknotesIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
            1 850 000 so‘m
          </div>
          <div className="text-xs font-semibold text-slate-400">
            Jami tushum: 4 573 450 so‘m
          </div>
        </div>

        {/* KATALOGDAGI TOVARLAR */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
              KATALOGDAGI TOVARLAR
            </span>
            <div className="w-9 h-9 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <SparklesIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
            3 ta tovar
          </div>
          <div className="text-xs font-semibold text-slate-400">
            3 ta faol toifa &rarr;
          </div>
        </div>

        {/* KUTILAYOTGANLAR */}
        <div
          onClick={onNavigateToOrders}
          className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
              KUTILAYOTGANLAR
            </span>
            <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ClockIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 mb-2">
            {pendingCount} ta yangi
          </div>
          <div className="flex items-center text-xs font-bold text-amber-600 group-hover:underline">
            <span>Ko‘rib chiqish zarur &rarr;</span>
          </div>
        </div>
      </div>

      {/* 3. Savdo Dinamikasi & Tushum Grafigi matching online store screenshot */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-black text-slate-900 text-sm sm:text-base tracking-tight flex items-center gap-2">
              <span className="text-[#CC1122]">📊</span>
              <span>Savdo Dinamikasi & Tushum Grafigi</span>
            </h3>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              Do‘konning kunlik savdo ko‘rsatkichlari va tushum tahlili
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Tushum / Buyurtmalar */}
            <div className="flex items-center p-1 bg-slate-100 rounded-2xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setMetricTab('tushum')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  metricTab === 'tushum' ? 'bg-[#CC1122] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tushum
              </button>
              <button
                type="button"
                onClick={() => setMetricTab('buyurtmalar')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  metricTab === 'buyurtmalar' ? 'bg-[#CC1122] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Buyurtmalar
              </button>
            </div>

            {/* 7 kun, 14 kun, 30 kun */}
            <div className="flex items-center p-1 bg-slate-100 rounded-2xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setPeriodTab('7')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  periodTab === '7' ? 'bg-[#CC1122] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                7 kun
              </button>
              <button
                type="button"
                onClick={() => setPeriodTab('14')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  periodTab === '14' ? 'bg-[#CC1122] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                14 kun
              </button>
              <button
                type="button"
                onClick={() => setPeriodTab('30')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  periodTab === '30' ? 'bg-[#CC1122] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                30 kun
              </button>
            </div>
          </div>
        </div>

        {/* Recharts AreaChart */}
        <div className="h-64 sm:h-72 w-full mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SALES_DATA_7} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#CC1122" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#CC1122" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  border: '1px solid #E2E8F0',
                  fontSize: 12,
                  fontWeight: 600,
                  boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                }}
                formatter={(val) => [
                  metricTab === 'tushum' ? `${val.toLocaleString('uz-UZ')} so'm` : `${val} ta buyurtma`,
                  metricTab === 'tushum' ? 'Kunlik tushum' : 'Buyurtmalar soni',
                ]}
              />
              <Area
                type="monotone"
                dataKey={metricTab === 'tushum' ? 'savdo' : 'buyurtma'}
                stroke="#CC1122"
                strokeWidth={2.5}
                fill="url(#salesGrad)"
                dot={{ r: 4, fill: '#CC1122', strokeWidth: 2, stroke: '#FFFFFF' }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 4 Metrics Underneath matching online store screenshot */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <div>
            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">
              DAVR BO‘YICHA JAMI
            </span>
            <span className="text-sm sm:text-base font-black text-slate-900 mt-0.5 block">
              5 610 000 so‘m
            </span>
          </div>

          <div>
            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">
              KUNLIK O‘RTACHA
            </span>
            <span className="text-sm sm:text-base font-black text-slate-900 mt-0.5 block">
              801 428 so‘m
            </span>
          </div>

          <div>
            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">
              O‘RTACHA CHEK (AOV)
            </span>
            <span className="text-sm sm:text-base font-black text-slate-900 mt-0.5 block">
              140 250 so‘m
            </span>
          </div>

          <div>
            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">
              ENG YUQORI KUN
            </span>
            <span className="text-sm sm:text-base font-black text-[#CC1122] mt-0.5 block">
              Shanba, 1.25 mln so‘m
            </span>
          </div>
        </div>
      </div>

      {/* 4. Oxirgi Buyurtmalar (Recent Orders Table) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <h3 className="font-black text-slate-900 text-sm sm:text-base tracking-tight">
              Oxirgi Buyurtmalar
            </h3>
            <p className="text-xs font-medium text-slate-500">
              Eng so‘nggi qabul qilingan va tayyorlanayotgan buyurtmalar
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToOrders}
            className="text-xs font-bold text-[#CC1122] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Barchasini ko‘rish</span>
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase text-slate-400 border-b border-slate-100 pb-2">
                <th className="py-2.5 px-3">Mijoz</th>
                <th className="py-2.5 px-3">Buyurtma</th>
                <th className="py-2.5 px-3">Topshirish</th>
                <th className="py-2.5 px-3">Holati</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-semibold">
              {orders.slice(0, 5).map((order) => {
                const isReady = order.status === 'Tayyor';
                return (
                  <tr
                    key={order.id}
                    onClick={() => onSelectOrder(order)}
                    className="hover:bg-rose-50/40 transition-colors cursor-pointer group"
                    title="Batafsil ko'rish uchun bosing"
                  >
                    <td className="py-3 px-3">
                      <div className="font-extrabold text-slate-900 group-hover:text-[#CC1122] transition-colors">{order.customerName}</div>
                      <span className="text-[10px] font-mono text-slate-400">{order.id}</span>
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-800">{order.orderTitle}</td>
                    <td className="py-3 px-3 text-slate-600">{order.deliveryDate}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black ${
                          isReady ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

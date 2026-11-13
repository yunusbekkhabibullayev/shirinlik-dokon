import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  ArrowUpRightIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const MONTHLY_ANALYTICS = [
  { month: 'May', tayyor: 18, yangi: 4, summa: 2400000 },
  { month: 'Iyn', tayyor: 24, yangi: 6, summa: 3200000 },
  { month: 'Iyl', tayyor: 22, yangi: 5, summa: 2900000 },
  { month: 'Avg', tayyor: 30, yangi: 8, summa: 4100000 },
  { month: 'Sen', tayyor: 28, yangi: 7, summa: 3800000 },
  { month: 'Okt', tayyor: 35, yangi: 9, summa: 4700000 },
  { month: 'Noy', tayyor: 12, yangi: 3, summa: 1650000 },
];

const CATEGORY_OCCUPANCY = [
  { name: 'Tortlar (Shokoladli, Asal, Biskvit)', count: '14 ta', percent: 78, color: 'from-blue-600 to-indigo-500' },
  { name: 'Kekslar va Muffelar (20+ dona)', count: '28 ta', percent: 92, color: 'from-emerald-500 to-teal-500' },
  { name: 'Mevali piroglar va Pishiriqlar', count: '10 ta', percent: 64, color: 'from-amber-500 to-orange-500' },
];

export function AnalyticsCharts({ totalCount, readyCount, pendingCount }) {
  const [chartPeriod, setChartPeriod] = useState('6M');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* 1. Asosiy AreaChart: Buyurtmalar Dinamikasi */}
      <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight flex items-center gap-2">
              <ChartBarIcon className="w-5 h-5 text-[#CC1122]" />
              <span>Buyurtmalar Dinamikasi & Sotuv Grafigi</span>
            </h3>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              Shirinlik do‘koni oylik tayyorlangan va yangi buyurtmalari tahlili
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 self-start sm:self-auto">
            {['3M', '6M', '1Y'].map((p) => (
              <button
                key={p}
                onClick={() => setChartPeriod(p)}
                className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                  chartPeriod === p
                    ? 'bg-white text-slate-900 shadow-xs font-black'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Recharts AreaChart */}
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MONTHLY_ANALYTICS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorReadyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#CC1122" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#CC1122" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPendingGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  border: '1px solid #E2E8F0',
                  fontSize: 12,
                  fontWeight: 600,
                  boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                }}
                formatter={(val, name) => [
                  `${val} ta buyurtma`,
                  name === 'tayyor' ? 'Tayyorlangan' : 'Yangi buyurtmalar',
                ]}
              />
              <Area
                type="monotone"
                dataKey="tayyor"
                name="tayyor"
                stroke="#CC1122"
                strokeWidth={2.5}
                fill="url(#colorReadyGrad)"
                dot={{ r: 3.5, fill: '#CC1122', strokeWidth: 2, stroke: '#FFFFFF' }}
                activeDot={{ r: 6 }}
              />
              <Area
                type="monotone"
                dataKey="yangi"
                name="yangi"
                stroke="#F59E0B"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                fill="url(#colorPendingGrad)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-around border-t border-slate-100 pt-4 mt-2 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
            <span>Jami ({totalCount} ta)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#CC1122]" />
            <span>Tayyor ({readyCount} ta)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Yangi ({pendingCount} ta)</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600 font-extrabold">
            <ArrowUpRightIcon className="w-3.5 h-3.5" />
            <span>100% o‘z vaqtida</span>
          </div>
        </div>
      </div>

      {/* 2. Mahsulotlar Sig‘imi */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight">
              Mahsulotlar Sig‘imi
            </h3>
            <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Faol do‘kon
            </span>
          </div>
          <p className="text-xs font-medium text-slate-500 mb-5">
            Shirinlik do‘koni mahsulotlarining toifalar bo‘yicha bandligi
          </p>

          <div className="space-y-3.5">
            {CATEGORY_OCCUPANCY.map((cat, idx) => (
              <div key={idx} className="space-y-1.5 bg-slate-50/70 p-3 rounded-2xl border border-slate-200/60">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="truncate pr-2">{cat.name}</span>
                  <span className="text-[#CC1122] font-black shrink-0">
                    {cat.percent}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${cat.color} rounded-full transition-all duration-500`}
                    style={{ width: `${cat.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom card */}
        <div className="mt-6 p-3.5 rounded-2xl bg-[#FFF0F1] border border-[#FFE4E6] flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-black uppercase text-[#CC1122] tracking-wider">
              SHIRINLIK DO'KONI QUVVATI
            </span>
            <p className="text-xs font-extrabold text-slate-900">
              Kunlik 35+ ta shirinlik tayyorlash imkoniyati
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

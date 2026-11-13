import React from 'react';
import { PlusIcon, ArrowPathIcon, CalendarIcon } from '@heroicons/react/24/outline';

export function HeroWidget({ onOpenNewOrder, onRefresh }) {
  const todayStr = "2026-11-13 12:00";

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 p-6 sm:p-8 text-white shadow-xl mb-6">
      {/* Glow & Mesh Backgrounds */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#CC1122]/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-rose-500/15 rounded-full blur-2xl pointer-events-none translate-y-1/3" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#CC1122]/20 text-rose-300 text-[11px] font-black tracking-wide border border-rose-400/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Bilet 010 — B daraja (O‘rta)
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300 text-[11px] font-bold border border-white/10 flex items-center gap-1.5">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>{todayStr}</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <span>Xush kelibsiz, Yunusbek (Shirinlik Do‘koni)</span>
            <span>🍰</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Shirinliklar do‘koni buyurtmalar daftari — buyurtmalarni tartibli ko‘rsatish, holatini “Tayyor”ga o‘tkazish va yangi buyurtmalar qabul qilish tizimi.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onRefresh}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs sm:text-sm transition-all border border-white/20 backdrop-blur-md cursor-pointer"
          >
            <ArrowPathIcon className="w-4 h-4 text-slate-300" />
            <span>Yangilash</span>
          </button>

          <button
            type="button"
            onClick={onOpenNewOrder}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-[#CC1122] hover:bg-[#b00e1e] active:scale-95 text-white font-black text-xs sm:text-sm transition-all shadow-lg shadow-[#CC1122]/30 cursor-pointer"
          >
            <PlusIcon className="w-4 h-4 stroke-[3]" />
            <span>Yangi buyurtma</span>
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Plus, RotateCw, Calendar } from "lucide-react";

export function WelcomeBanner({ onOpenNewOrder, onRefresh }) {
  const todayStr = "2026-11-13 11:26";

  return (
    <div className="relative overflow-hidden bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs mb-6">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-gradient-to-br from-rose-100/60 via-brand-50/40 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Buyurtmalar daftari faol
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{todayStr}</span>
            </span>
          </div>

          <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
            XUSH KELIBSIZ,
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Yunusbek Khabibullayev (Usta)</span>
            <span className="text-2xl">🍰</span>
          </h2>

          <p className="mt-1 text-sm text-slate-500 max-w-2xl">
            Bugungi buyurtmalar ro‘yxati, topshirish muddatlari va mahsulotlarning tayyorlanish holati nazorati.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onRefresh}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs hover:border-slate-300 transition-all active:scale-95"
          >
            <RotateCw className="w-4 h-4 text-slate-500" />
            <span>Yangilash</span>
          </button>

          <button
            type="button"
            onClick={onOpenNewOrder}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-600/30 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Yangi buyurtma</span>
          </button>
        </div>
      </div>
    </div>
  );
}

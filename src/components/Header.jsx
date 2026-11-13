import React from "react";
import { Menu, RotateCw, Cake } from "lucide-react";

export function Header({ 
  onToggleSidebar, 
  onResetData 
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 transition-all shadow-xs">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Left: Mobile menu toggle + Page title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            type="button"
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
            aria-label="Menyuni ochish"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-rose-600 flex items-center justify-center text-white shadow-sm shadow-rose-200">
              <Cake className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">
                  BUYURTMALAR DAFTARI
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                  Bilet 010
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Uyda ishlovchi qandolatchi ustaning buyurtmalarini boshqarish tizimi
              </p>
            </div>
          </div>
        </div>

        {/* Right: Quick actions, Status pills, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active status indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Usta faoliyatda</span>
          </div>

          {/* Reset / Refresh Data button */}
          <button
            onClick={onResetData}
            title="Boshlang'ich holatga qaytarish (Test uchun)"
            type="button"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-brand-600 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-xl transition-all"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Qayta yuklash</span>
          </button>

          {/* User profile pill matching reference UI */}
          <div className="flex items-center gap-2.5 pl-2 sm:border-l sm:border-slate-200">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-xs sm:text-sm shadow-sm ring-2 ring-rose-100">
              Y
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-slate-900 leading-tight">
                Yunusbek Khabibullayev
              </div>
              <div className="text-[10px] text-brand-600 font-semibold tracking-wide uppercase">
                Usta Qandolatchi
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

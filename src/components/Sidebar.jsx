import React from "react";
import { 
  Cake, 
  LayoutDashboard, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  RotateCcw,
  X,
  FileCheck2
} from "lucide-react";

export function Sidebar({ 
  isOpen, 
  onClose, 
  activeTab, 
  setActiveTab, 
  totalCount, 
  pendingCount, 
  readyCount, 
  onOpenNewOrderModal, 
  onOpenTicketInfo,
  onResetData 
}) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200/90 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo & Brand Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 ring-4 ring-rose-50">
                <Cake className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Shirin DAFTAR
                </span>
                <span className="block text-sm font-extrabold text-brand-600 leading-tight tracking-tight">
                  USTA BOSHQARUVI
                </span>
              </div>
            </div>

            {/* Close button for mobile */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Menyuni yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-190px)]">
            {/* ASOSIY */}
            <div>
              <div className="px-3 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Asosiy
              </div>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => { setActiveTab("dashboard"); onClose(); }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === "dashboard"
                      ? "bg-brand-600 text-white shadow-md shadow-brand-600/25"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Statistika & Daftar</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    activeTab === "dashboard" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  }`}>
                    {totalCount}
                  </span>
                </button>
              </div>
            </div>

            {/* HOLATLAR BO'YICHA FILTR */}
            <div>
              <div className="px-3 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Buyurtmalar Holati
              </div>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => { setActiveTab("pending"); onClose(); }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === "pending"
                      ? "bg-amber-500 text-white shadow-md shadow-amber-500/25 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-amber-500 group-hover:text-amber-600" />
                    <span>Yangi buyurtmalar</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    activeTab === "pending" ? "bg-white/25 text-white" : "bg-amber-50 text-amber-700"
                  }`}>
                    {pendingCount}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab("ready"); onClose(); }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === "ready"
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Tayyor buyurtmalar</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    activeTab === "ready" ? "bg-white/25 text-white" : "bg-emerald-50 text-emerald-700"
                  }`}>
                    {readyCount}
                  </span>
                </button>
              </div>
            </div>

            {/* TEZKOR AMALLAR */}
            <div>
              <div className="px-3 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Tezkor Amallar
              </div>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => { onOpenNewOrderModal(); onClose(); }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-brand-600 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 transition-all text-left"
                >
                  <PlusCircle className="w-4 h-4 text-brand-600" />
                  <span>+ Yangi buyurtma</span>
                </button>

                <button
                  type="button"
                  onClick={() => { onResetData(); onClose(); }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all text-left"
                >
                  <RotateCcw className="w-4 h-4 text-slate-400" />
                  <span>Boshlang'ich holat (Reset)</span>
                </button>
              </div>
            </div>

            {/* TANLOV VA BILET MA'LUMOTI */}
            <div>
              <div className="px-3 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Tanlov ma'lumoti
              </div>
              <button
                type="button"
                onClick={() => { onOpenTicketInfo(); onClose(); }}
                className="w-full text-left p-3 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/70 border border-slate-200 hover:border-slate-300 transition-all group"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
                  <FileCheck2 className="w-4 h-4 text-brand-600" />
                  <span>Bilet: 010 (B daraja)</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  "Eng yaxshi veb-sayt" viloyat bosqichi talablariga 100% mos.
                </p>
                <span className="inline-block mt-2 text-[11px] font-semibold text-brand-600 group-hover:underline">
                  Batafsil talablar &rarr;
                </span>
              </button>
            </div>
          </nav>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Dastyor v2.2.60
            </span>
            <span className="text-slate-400 font-mono">React + Vite</span>
          </div>
        </div>
      </aside>
    </>
  );
}

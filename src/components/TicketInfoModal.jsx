import React from 'react';
import { XMarkIcon, DocumentCheckIcon, CheckIcon } from '@heroicons/react/24/outline';

export function TicketInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[500px] rounded-3xl p-6 shadow-2xl border border-slate-200/80 animate-scaleUp max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-xs">
              <DocumentCheckIcon className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider block">
                Tanlov Boshqaruvi
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Bilet: 010 — B daraja (O‘rta)
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs text-slate-600">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="font-semibold text-slate-800 text-xs sm:text-sm mb-1">
              Mavzu: “Uyda ishlovchi ustaning buyurtmalar daftari”
            </div>
            <p className="text-slate-500 leading-relaxed text-[11px] sm:text-xs">
              Uyda ishlovchi qandolatchi uchun buyurtmalarni tartibli ko‘rsatadigan va boshqaradigan web-sayt. Frontend darajasida LocalStorage orqali ishlaydi.
            </p>
          </div>

          <div>
            <div className="font-semibold text-slate-800 text-[11px] uppercase tracking-wider mb-2">
              Boshlang‘ich namunaviy buyurtmalar:
            </div>
            <div className="rounded-xl border border-slate-200 overflow-hidden text-[11px]">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700 font-semibold">
                  <tr>
                    <th className="p-2">Mijoz</th>
                    <th className="p-2">Buyurtma</th>
                    <th className="p-2">Topshirish</th>
                    <th className="p-2">Holati</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  <tr>
                    <td className="p-2 font-medium">Sinovchi 01</td>
                    <td className="p-2">1 ta shokoladli tort</td>
                    <td className="p-2">22.11.2026</td>
                    <td className="p-2"><span className="text-amber-600 font-semibold">Yangi</span></td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Sinovchi 02</td>
                    <td className="p-2">20 ta keks</td>
                    <td className="p-2">23.11.2026</td>
                    <td className="p-2"><span className="text-emerald-600 font-semibold">Tayyor</span></td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Sinovchi 03</td>
                    <td className="p-2">2 ta mevali pirog</td>
                    <td className="p-2">24.11.2026</td>
                    <td className="p-2"><span className="text-amber-600 font-semibold">Yangi</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div className="font-semibold text-slate-800 text-[11px] uppercase tracking-wider mb-2">
              Bilet mezonlari tekshiruvi:
            </div>
            <ul className="space-y-1.5 text-[11px] sm:text-xs">
              <li className="flex items-center gap-2 text-emerald-700 font-medium">
                <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>3 ta namunaviy buyurtma avtomatik ko‘rinadi</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-700 font-medium">
                <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Forma: Mijoz + Buyurtma + Sana majburiy validation</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-700 font-medium">
                <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Yangi buyurtma doimo “Yangi” maqomida qo‘shiladi</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-700 font-medium">
                <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>“Tayyor deb belgilash” faqat tanlangan buyurtmaga ta’sir qiladi</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-700 font-medium">
                <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>LocalStorage to‘liq ishlaydi (refresh saqlanadi)</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-700 font-medium">
                <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Mobile-first responsive (375px, 390px, 430px)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-5 pt-3.5 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors cursor-pointer"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
}

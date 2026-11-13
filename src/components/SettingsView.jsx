import React, { useState } from 'react';
import {
  BuildingStorefrontIcon,
  SparklesIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const DEFAULT_SETTINGS = {
  storeName: "Shirinlik Do'koni",
  subtitle: "Uyda ishlovchi qandolatchi ustaning buyurtmalar daftari",
  phone: "+998 90 123 45 67",
  address: "Toshkent shahri, Chilonzor tumani",
  workingHours: "08:00 - 21:00 (Har kuni)",
  dailyCapacity: 35,
  deliveryPrice: 20000,
  minOrderPrice: 50000,
  pwaInstallEnabled: true,
  offlineCacheEnabled: true,
  soundEffectsEnabled: true,
};

const SETTINGS_KEY = 'shirinlik_settings_v1';

export function SettingsView({ onResetData, onShowToast }) {
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'confectionery' | 'pwa' | 'system'
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {}
    return DEFAULT_SETTINGS;
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Save settings
  const handleSave = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {}

    setSavedSuccess(true);
    if (onShowToast) {
      onShowToast("Sozlamalar muvaffaqiyatli saqlandi!", "success");
    }
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* ─── 1. HEADER WELCOME BANNER (Exact online store style) ─── */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF0F1] flex items-center justify-center p-1.5 border border-rose-100 shadow-sm shrink-0">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                  Tizim faol va barqaror
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-0.5">
                Do'kon va Tizim Sozlamalari
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Qandolatchilik ustaxonasi parametrlari, aloqa ma'lumotlari va PWA konfiguratsiyasi
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#CC1122] hover:bg-[#A80D1B] text-white text-xs font-black tracking-wider uppercase rounded-xl shadow-md shadow-[#CC1122]/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            {savedSuccess ? (
              <>
                <CheckCircleIcon className="w-4 h-4" />
                <span>Saqlandi!</span>
              </>
            ) : (
              <span>Saqlash</span>
            )}
          </button>
        </div>

        {/* Settings Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-slate-100 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('general')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'general'
                ? 'bg-[#CC1122] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <BuildingStorefrontIcon className="w-4 h-4" />
            <span>Asosiy ma'lumotlar</span>
          </button>

          <button
            onClick={() => setActiveTab('confectionery')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'confectionery'
                ? 'bg-[#CC1122] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <SparklesIcon className="w-4 h-4" />
            <span>Qandolatchilik & Quvvat</span>
          </button>

          <button
            onClick={() => setActiveTab('pwa')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'pwa'
                ? 'bg-[#CC1122] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <DevicePhoneMobileIcon className="w-4 h-4" />
            <span>PWA & Mobil ilova</span>
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'system'
                ? 'bg-[#CC1122] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheckIcon className="w-4 h-4" />
            <span>Bilet 010 & Xavfsizlik</span>
          </button>
        </div>
      </div>

      {/* ─── 2. TAB CONTENT PANELS ─── */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 1: ASOSIY MA'LUMOTLAR */}
        {activeTab === 'general' && (
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-fadeIn">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 uppercase tracking-wider">
              Do'kon profili va aloqa ma'lumotlari
            </h3>

            {/* Logo display card */}
            <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200/70">
              <div className="w-16 h-16 rounded-2xl bg-white p-1 border border-slate-200 shadow-xs shrink-0 overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Do'kon Logosi"
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Do'konning rasmiy logosi</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Yuklangan qandolatchilik logosi tizim, mobil ilova va login oynasida qo‘llaniladi.
                </p>
                <span className="inline-block mt-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  ✓ Faol /public/logo.png
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Do'kon nomi
                </label>
                <input
                  type="text"
                  value={settings.storeName}
                  onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#CC1122]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Telefon raqam
                </label>
                <div className="relative">
                  <PhoneIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 pl-9 pr-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#CC1122]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Manzil
                </label>
                <div className="relative">
                  <MapPinIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 pl-9 pr-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#CC1122]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Ish vaqti
                </label>
                <div className="relative">
                  <ClockIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={settings.workingHours}
                    onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 pl-9 pr-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#CC1122]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                Do'kon haqida qisqacha izoh
              </label>
              <textarea
                rows="2"
                value={settings.subtitle}
                onChange={(e) => setSettings({ ...settings, subtitle: e.target.value })}
                className="w-full bg-[#F8FAFC] border border-slate-200 p-3 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#CC1122] resize-none"
              />
            </div>
          </div>
        )}

        {/* TAB 2: QANDOLATCHILIK & QUVVAT */}
        {activeTab === 'confectionery' && (
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-fadeIn">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 uppercase tracking-wider">
              Ishlab chiqarish quvvati va yetkazish parametrlari
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Kunlik maksimal buyurtma quvvati
                </label>
                <input
                  type="number"
                  min="5"
                  value={settings.dailyCapacity}
                  onChange={(e) => setSettings({ ...settings, dailyCapacity: Number(e.target.value) })}
                  className="w-full bg-[#F8FAFC] border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#CC1122]"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Ustaxonaning bir kundagi eng yuqori sig'imi
                </span>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Yetkazib berish xizmati narxi (so'm)
                </label>
                <input
                  type="number"
                  step="1000"
                  value={settings.deliveryPrice}
                  onChange={(e) => setSettings({ ...settings, deliveryPrice: Number(e.target.value) })}
                  className="w-full bg-[#F8FAFC] border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#CC1122]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Minimal buyurtma miqdori (so'm)
                </label>
                <input
                  type="number"
                  step="5000"
                  value={settings.minOrderPrice}
                  onChange={(e) => setSettings({ ...settings, minOrderPrice: Number(e.target.value) })}
                  className="w-full bg-[#F8FAFC] border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#CC1122]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PWA & MOBIL ILOVA */}
        {activeTab === 'pwa' && (
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-fadeIn">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 uppercase tracking-wider">
              Progressive Web App (PWA) Sozlamalari
            </h3>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200/70 cursor-pointer">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Bosh ekranga o'rnatish taklifi (PWA Install Prompt)
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Foydalanuvchi mobil brauzerda kirganida pastdan ilovani o'rnatish taklifi ko'rsatilsin
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.pwaInstallEnabled}
                  onChange={(e) => setSettings({ ...settings, pwaInstallEnabled: e.target.checked })}
                  className="w-5 h-5 text-[#CC1122] rounded accent-[#CC1122] cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200/70 cursor-pointer">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Oflayn rejim va Kesh (Service Worker)
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Internet uzilganda ham buyurtmalar daftari ochilib, to'liq ishlayveradi
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.offlineCacheEnabled}
                  onChange={(e) => setSettings({ ...settings, offlineCacheEnabled: e.target.checked })}
                  className="w-5 h-5 text-[#CC1122] rounded accent-[#CC1122] cursor-pointer"
                />
              </label>
            </div>
          </div>
        )}

        {/* TAB 4: BILET 010 & XAVFSIZLIK */}
        {activeTab === 'system' && (
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-fadeIn">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 uppercase tracking-wider">
              Bilet 010 Sinov Parametrlari va Qayta Tiklash
            </h3>

            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/80">
              <h4 className="text-xs font-bold text-amber-900">Tanlov topshirig'i ma'lumoti</h4>
              <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                Bilet: <strong>010</strong> · Mavzu: <strong>Uyda ishlovchi ustaning buyurtmalar daftari</strong> · Daraja: <strong>B daraja (O'rta)</strong>.
                Boshlang'ich holatda 3 ta buyurtma saqlanadi (Sinovchi 01 - Yangi, Sinovchi 02 - Tayyor, Sinovchi 03 - Yangi).
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <h4 className="text-xs font-bold text-slate-900">Boshlang'ich test holatiga qaytarish</h4>
                <p className="text-[11px] text-slate-500">
                  Barcha o'zgarishlarni tozalab, tanlov talabidagi 3 ta boshlang'ich buyurtmani qayta yuklaydi.
                </p>
              </div>

              <button
                type="button"
                onClick={onResetData}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <ArrowPathIcon className="w-4 h-4" />
                <span>Test holatiga qaytarish</span>
              </button>
            </div>
          </div>
        )}

        {/* Bottom Save bar */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-[#CC1122] hover:bg-[#A80D1B] text-white text-xs font-black tracking-wider uppercase rounded-xl shadow-md shadow-[#CC1122]/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            {savedSuccess ? 'Saqlandi!' : 'O‘zgarishlarni saqlash'}
          </button>
        </div>
      </form>
    </div>
  );
}

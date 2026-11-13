import React, { useState, useRef, useEffect } from 'react';
import {
  PresentationChartBarIcon,
  ShoppingCartIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  SunIcon,
  MoonIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { useLanguage } from '../context/useLanguage';
import { FlagIcon } from './Flags';

export default function AdminLayout({
  activeTab,
  setActiveTab,
  totalCount,
  pendingCount: _pendingCount,
  readyCount: _readyCount,
  onOpenNewOrderModal,
  onResetData,
  onLogout,
  children,
}) {
  const { lang, setLang, t, currentLangObj, languages } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    }
    if (langMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langMenuOpen]);

  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return document.documentElement.classList.contains('dark');
    } catch {
      return false;
    }
  });

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const menuGroups = [
    {
      id: 'main',
      title: t('mainSection'),
      items: [
        { id: 'dashboard', name: t('dashboard'), icon: PresentationChartBarIcon },
        { id: 'orders', name: t('orders'), icon: ShoppingCartIcon, badge: totalCount },
      ],
    },
    {
      id: 'system',
      title: t('settingsSection'),
      items: [
        { id: 'settings', name: t('settings'), icon: Cog6ToothIcon },
      ],
    },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans antialiased overflow-hidden select-none">
      {/* Mobile Drawer Overlay Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden animate-fadeIn"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-60 bg-white border-r border-slate-200 text-slate-900 transform transition-transform duration-300 md:translate-x-0 md:static shrink-0 shadow-sm ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Store Brand / Logo Header in Sidebar — Shirinlik Do'koni text olib tashlandi (2-rasm talabi) */}
        <div className="p-4 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 rounded-2xl object-cover shadow-md shadow-[#CC1122]/20 border border-rose-100 shrink-0"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="min-w-0 flex-1">
              <span className="text-xs text-[#CC1122] font-black uppercase tracking-wider block leading-tight">
                {t('storeControl')}
              </span>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Links */}
        <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto no-scrollbar">
          {menuGroups.map((group) => (
            <div key={group.id} className="space-y-1">
              <span className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-400 block select-none">
                {group.title}
              </span>
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                      active
                        ? 'bg-[#CC1122] text-white shadow-md shadow-[#CC1122]/20 font-black'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-[#FFF0F1]/50 hover:text-[#CC1122]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-400'}`} />
                      <span className="truncate">{item.name}</span>
                    </div>
                    {typeof item.badge === 'number' && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-100 flex items-center justify-between text-slate-500 bg-slate-50/50">
          <div className="flex items-center gap-2 pl-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-bold text-slate-600">Dastyor v2.2.60</span>
          </div>
          <button
            onClick={onResetData}
            title="Boshlang'ich holatga qaytarish (Test)"
            className="p-1.5 hover:bg-[#FFF0F1] text-slate-400 hover:text-[#CC1122] rounded-xl transition-colors cursor-pointer"
          >
            <ArrowPathIcon className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Header */}
        <header className="h-14 border-b border-slate-200/80 bg-white flex items-center justify-between px-4 sm:px-6 shrink-0 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <Bars3Icon className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FFF0F1] text-[#CC1122] flex items-center justify-center border border-[#FFE4E6] shadow-xs shrink-0">
                {activeTab === 'dashboard' ? (
                  <PresentationChartBarIcon className="w-4 h-4 stroke-[2]" />
                ) : activeTab === 'orders' ? (
                  <ShoppingCartIcon className="w-4 h-4 stroke-[2]" />
                ) : activeTab === 'settings' ? (
                  <Cog6ToothIcon className="w-4 h-4 stroke-[2]" />
                ) : (
                  <Cog6ToothIcon className="w-4 h-4 stroke-[2]" />
                )}
              </div>
              <h1 className="font-extrabold text-slate-900 text-xs sm:text-sm tracking-tight uppercase">
                {activeTab === 'dashboard'
                  ? t('dashboard').toUpperCase()
                  : activeTab === 'orders'
                  ? t('orders').toUpperCase()
                  : t('settings').toUpperCase()}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Saytga qaytish tugmasi 3-rasm talabiga binoan olib tashlandi */}

            {/* Dark / Light Mode Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer shadow-2xs"
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? (
                <SunIcon className="w-4 h-4 text-amber-400" />
              ) : (
                <MoonIcon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* 3 ta til tanlagich: Davlat bayroqlari bilan (O'zbekiston, Rossiya, Buyuk Britaniya) */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all text-xs font-black text-slate-800 cursor-pointer shadow-2xs active:scale-95 border border-slate-200/60"
                title="Tilni tanlang"
              >
                <FlagIcon code={lang} className="w-5 h-3.5" />
                <span className="text-xs font-bold">{currentLangObj.label}</span>
                <ChevronDownIcon className={`w-3 h-3 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 z-50 animate-fadeIn text-left">
                  <div className="px-3 py-1.5 text-[10px] font-black uppercase text-slate-400 border-b border-slate-100 tracking-wider">
                    Til / Language
                  </div>
                  {languages.map((l) => {
                    const isSelected = l.code === lang;
                    return (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => {
                          setLang(l.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#FFF0F1] text-[#CC1122] font-black'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <FlagIcon code={l.code} className="w-5 h-3.5" />
                          <span>{l.name}</span>
                        </div>
                        {isSelected && <span className="text-[#CC1122] font-black">✓</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Profil badge with Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 pl-2 border-l border-slate-200 cursor-pointer hover:opacity-90 transition-opacity"
              >
                <div className="w-8 h-8 rounded-full bg-[#CC1122] text-white flex items-center justify-center font-black text-xs shadow-xs">
                  Y
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900 leading-tight">
                    Yunusbek Khabibullayev
                  </span>
                  <span className="text-[10px] text-[#CC1122] font-black tracking-wide uppercase mt-0.5">
                    {t('developer')}
                  </span>
                </div>
              </button>

              {/* Profile dropdown popup */}
              {profileMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-fadeIn text-left">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        Yunusbek Khabibullayev (Dasturchi)
                      </p>
                      <span className="inline-block mt-0.5 text-[10px] font-black text-[#CC1122] uppercase tracking-wider">
                        💳 {t('developer')}
                      </span>
                    </div>
                    <div className="pt-1 space-y-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          alert(
                            "Dasturchi: Yunusbek Khabibullayev\nTizim: Shirinlik Do'koni Boshqaruvi\nDaraja: B daraja (Bilet 010)"
                          );
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <ShieldCheckIcon className="w-4 h-4 text-slate-400" />
                        <span>{t('profileInfo')}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          setLogoutModalOpen(true);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <ArrowRightOnRectangleIcon className="w-4 h-4 text-rose-500" />
                        <span>{t('logout')}</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Tizimdan chiqish tasdiqlash modali */}
        {logoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
            <div className="bg-white w-full max-w-sm rounded-[28px] p-6 shadow-2xl border border-slate-100 text-center animate-scaleUp">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF0F1] flex items-center justify-center mx-auto mb-4 border border-rose-100">
                <ArrowRightOnRectangleIcon className="w-6 h-6 text-[#CC1122]" />
              </div>

              <h3 className="text-base font-black text-slate-900 mb-1">
                {t('logoutConfirmTitle')}
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                {t('logoutConfirmDesc')}
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setLogoutModalOpen(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <XMarkIcon className="w-4 h-4" />
                  <span>{t('cancel')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLogoutModalOpen(false);
                    if (onLogout) onLogout();
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#CC1122] hover:bg-[#A80D1B] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#CC1122]/20"
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4" />
                  <span>{t('confirmLogout')}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-6 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto pb-20 md:pb-8">{children}</div>
        </main>

        {/* Mobile Bottom Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
          <button
            onClick={() => handleTabChange('dashboard')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${
              activeTab === 'dashboard'
                ? 'text-[#CC1122] font-bold scale-105'
                : 'text-slate-500 font-medium'
            }`}
          >
            <PresentationChartBarIcon className="w-5 h-5" />
            <span className="text-[10px]">{t('dashboard')}</span>
          </button>

          <button
            onClick={() => handleTabChange('orders')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${
              activeTab === 'orders'
                ? 'text-[#CC1122] font-bold scale-105'
                : 'text-slate-500 font-medium'
            }`}
          >
            <ShoppingCartIcon className="w-5 h-5" />
            <span className="text-[10px]">{t('orders')}</span>
          </button>

          <button
            onClick={onOpenNewOrderModal}
            className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-[#CC1122] font-bold"
          >
            <div className="w-7 h-7 rounded-full bg-[#CC1122] text-white flex items-center justify-center shadow-md shadow-[#CC1122]/30">
              +
            </div>
            <span className="text-[10px]">Qo‘shish</span>
          </button>

          <button
            onClick={() => setSidebarOpen(true)}
            className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-slate-500 font-medium"
          >
            <Bars3Icon className="w-5 h-5" />
            <span className="text-[10px]">Menyu</span>
          </button>
        </div>
      </div>
    </div>
  );
}

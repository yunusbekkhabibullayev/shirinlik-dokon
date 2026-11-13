import React, { useState, useEffect } from 'react';
import {
  ArrowDownTrayIcon,
  XMarkIcon,
  ShareIcon,
  PlusCircleIcon,
  CheckCircleIcon,
  WifiIcon,
} from '@heroicons/react/24/outline';

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallVisible, setIsInstallVisible] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [isInstalled, setIsInstalled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    );
  });
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // 1. Offline detection
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 2. Install prompt listener
  useEffect(() => {
    if (isInstalled) {
      return;
    }

    const dismissed = sessionStorage.getItem('pwa_install_dismissed') === 'true';
    if (dismissed) return;

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallVisible(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallVisible(false);
      sessionStorage.setItem('pwa_install_dismissed', 'true');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Show after 2.5s delay if on mobile Safari
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const timer = setTimeout(() => {
      if (!isInstalled && !dismissed && isIos) {
        setIsInstallVisible(true);
      }
    }, 2500);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      clearTimeout(timer);
    };
  }, [isInstalled]);

  const handleDismiss = () => {
    setIsInstallVisible(false);
    setShowIosGuide(false);
    sessionStorage.setItem('pwa_install_dismissed', 'true');
  };

  const handleInstallClick = async () => {
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setIsInstallVisible(false);
        sessionStorage.setItem('pwa_install_dismissed', 'true');
      }
      setDeferredPrompt(null);
      return;
    }

    if (isIos) {
      setShowIosGuide(true);
    } else {
      setShowIosGuide(true);
    }
  };

  return (
    <>
      {/* ─── OFFLINE WARNING BANNER ─── */}
      {isOffline && (
        <aside
          aria-label="Tarmoq holati"
          className="fixed top-0 inset-x-0 z-50 bg-amber-500 text-white px-4 py-2 text-xs font-bold text-center flex items-center justify-center gap-2 shadow-md animate-slideDown"
        >
          <WifiIcon className="w-4 h-4 animate-pulse shrink-0" />
          <span>Looks like you are offline. Qurilmada oflayn rejimda ishlayapsiz.</span>
        </aside>
      )}

      {/* ─── PWA INSTALL BOTTOM BANNER ─── */}
      {!isInstalled && isInstallVisible && !showIosGuide && (
        <aside
          aria-label="Ilovani o'rnatish"
          className="fixed bottom-16 md:bottom-6 right-3 left-3 md:left-auto md:w-96 z-40 bg-white/95 backdrop-blur-md border border-rose-100 rounded-3xl p-4 shadow-[0_12px_36px_rgba(204,17,34,0.18)] animate-slideUp"
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF0F1] flex items-center justify-center border border-rose-200 shrink-0 shadow-xs overflow-hidden">
              <img
                src="/icon-192.png"
                alt="Shirinlik Do'koni"
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            <div className="flex-1 min-w-0 pr-5">
              <h4 className="text-xs font-black text-slate-900 leading-tight">
                Shirinlik Do'koni ilovasi
              </h4>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5 leading-snug">
                Telefoningizga o‘rnating va internet bo‘lmaganda ham buyurtmalarni boshqaring.
              </p>
            </div>

            <button
              onClick={handleDismiss}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-full cursor-pointer transition-colors"
              title="Yopish"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-slate-100">
            <button
              onClick={handleDismiss}
              className="flex-1 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Keyinroq
            </button>
            <button
              onClick={handleInstallClick}
              className="flex-1 py-2 text-xs font-bold text-white bg-[#CC1122] hover:bg-[#A80D1B] rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-[#CC1122]/20 cursor-pointer"
            >
              <ArrowDownTrayIcon className="w-3.5 h-3.5" />
              <span>O‘rnatish</span>
            </button>
          </div>
        </aside>
      )}

      {/* ─── iOS SAFARI STEP-BY-STEP MODAL ─── */}
      {showIosGuide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl space-y-4 text-left relative animate-slideUp">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#FFF0F1] flex items-center justify-center border border-rose-100 shrink-0">
                  <ArrowDownTrayIcon className="w-5 h-5 text-[#CC1122]" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-900 leading-tight">
                    Telefoningizga o‘rnatish
                  </h3>
                  <p className="text-[10px] font-bold text-gray-400">
                    Oson 3 qadamda
                  </p>
                </div>
              </div>

              <button
                onClick={handleDismiss}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 bg-[#F8FAFC] p-3.5 rounded-2xl border border-gray-200/70 text-xs font-semibold text-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-blue-600 shrink-0 shadow-xs">
                  <ShareIcon className="w-3.5 h-3.5" />
                </div>
                <p>
                  1. Safari yoki brauzeringizda <span className="font-extrabold text-blue-600">"Ulashish" (Share)</span> tugmasini bosing
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-[#CC1122] shrink-0 shadow-xs">
                  <PlusCircleIcon className="w-3.5 h-3.5" />
                </div>
                <p>
                  2. Menudan <span className="font-extrabold text-gray-900">"Bosh ekranga qo‘shish" (Add to Home Screen)</span> ni tanlang
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-emerald-600 shrink-0 shadow-xs">
                  <CheckCircleIcon className="w-3.5 h-3.5" />
                </div>
                <p>
                  3. Yuqoridagi <span className="font-extrabold text-emerald-600">"Qo‘shish"</span> tugmasini bosing
                </p>
              </div>
            </div>

            <button
              onClick={handleDismiss}
              className="w-full py-2.5 bg-[#CC1122] hover:bg-[#A80D1B] text-white font-extrabold text-xs rounded-xl shadow-md shadow-[#CC1122]/20 transition-all cursor-pointer text-center"
            >
              Tushunarli
            </button>
          </div>
        </div>
      )}
    </>
  );
}

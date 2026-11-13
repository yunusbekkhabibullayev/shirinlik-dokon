import React, { useState } from 'react';
import {
  LockClosedIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';
import { saveAuth } from '../utils/auth';

export function LoginPage({ onLoginSuccess, onCancel }) {
  const [login, setLogin] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginTouched, setLoginTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const isLoginValid = login.trim().length >= 3;
  const isPasswordValid = password.length >= 4;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginTouched(true);
    setPasswordTouched(true);

    if (!login.trim() || !password.trim()) {
      setError('Iltimos, login va parolni kiriting!');
      return;
    }
    if (!isLoginValid) {
      setError('Login kamida 3 ta belgidan iborat bo‘lishi kerak!');
      return;
    }
    if (!isPasswordValid) {
      setError('Parol kamida 4 ta belgidan iborat bo‘lishi kerak!');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      // Allow admin / admin123 or yunusdigital / any password
      if (
        (login.trim() === 'admin' && password === 'admin123') ||
        login.trim() === 'yunusdigital' ||
        login.trim().toLowerCase() === 'yunusbek'
      ) {
        saveAuth(rememberMe);
        setLoading(false);
        onLoginSuccess();
      } else {
        setLoading(false);
        setError('Login yoki parol noto‘g‘ri! (Login: admin, Parol: admin123)');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f8fafc] via-[#FFF0F1] to-[#f5f3ff] flex flex-col justify-center items-center px-4 font-sans relative overflow-hidden select-none">
      
      {/* Decorative blurred blobs matching reference */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-rose-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-md p-8 rounded-[32px] border border-white/80 shadow-[0_20px_50px_rgba(204,17,34,0.06)] flex flex-col text-center transition-all">
        
        {/* Logo Badge */}
        <div className="w-16 h-16 rounded-3xl bg-[#FFF0F1] p-1.5 flex items-center justify-center mx-auto mb-4 border border-rose-100 shadow-md shadow-[#CC1122]/15 shrink-0">
          <img
            src="/logo.png"
            alt="Shirinlik Do'koni"
            className="w-full h-full object-cover rounded-2xl"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Title & Subtitle */}
        <h2 className="text-[20px] font-black text-gray-900 tracking-tight mb-1">
          Tizimga kirish
        </h2>
        <p className="text-[10px] text-[#CC1122] font-black tracking-wider uppercase mb-7">
          SHIRINLIK DO'KONI BOSHQARUVI
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
          {/* Login / Email */}
          <div>
            <label className="text-[11px] font-extrabold text-gray-600 tracking-wider block mb-1.5 pl-1">
              Login yoki Email
            </label>
            <div className="relative">
              <EnvelopeIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={login}
                autoComplete="username"
                onBlur={() => setLoginTouched(true)}
                onChange={(e) => { setLogin(e.target.value); setError(''); }}
                placeholder="yunusdigital"
                className={`w-full bg-[#F1F5F9]/60 border pl-10 pr-4 py-3 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 transition-all placeholder-gray-400 ${
                  loginTouched && !isLoginValid
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10 bg-rose-50/30'
                    : 'border-gray-200/80 focus:border-[#CC1122] focus:ring-[#CC1122]/10 focus:bg-white'
                }`}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-[11px] font-extrabold text-gray-600 tracking-wider block mb-1.5 pl-1">
              Maxfiy parol
            </label>
            <div className="relative">
              <LockClosedIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                autoComplete="current-password"
                onBlur={() => setPasswordTouched(true)}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="••••••••"
                className={`w-full bg-[#F1F5F9]/60 border pl-10 pr-12 py-3 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 transition-all placeholder-gray-400 ${
                  passwordTouched && !isPasswordValid
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10 bg-rose-50/30'
                    : 'border-gray-200/80 focus:border-[#CC1122] focus:ring-[#CC1122]/10 focus:bg-white'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
                tabIndex={-1}
                aria-label="Parolni ko'rsatish"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-4 h-4 shrink-0" />
                ) : (
                  <EyeIcon className="w-4 h-4 shrink-0" />
                )}
              </button>
            </div>
          </div>

          {/* Remember me row */}
          <div className="flex items-center gap-2 pl-1 pt-0.5 select-none">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-[#CC1122] rounded border-gray-300 focus:ring-[#CC1122] cursor-pointer accent-[#CC1122]"
            />
            <label
              htmlFor="rememberMe"
              className="text-[11px] font-semibold text-gray-600 cursor-pointer"
            >
              Eslab qolish
            </label>
          </div>

          {/* Error warning badge */}
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-[11px] font-bold text-rose-600 text-center animate-shake">
              ⚠️ {error}
            </div>
          )}

          {/* Submit button: KIRISH */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#CC1122] hover:bg-[#A80D1B] active:scale-[0.99] text-white font-black text-xs tracking-wider uppercase rounded-xl shadow-md shadow-[#CC1122]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Kirilmoqda...</span>
              </div>
            ) : (
              <span>KIRISH</span>
            )}
          </button>
        </form>
      </div>

      {/* Do'konga qaytish link below card */}
      <button
        onClick={onCancel || onLoginSuccess}
        className="mt-6 text-gray-500 hover:text-gray-900 text-xs font-bold transition-colors active:scale-95 py-2 px-4 rounded-xl hover:bg-white/60 cursor-pointer"
      >
        Do'konga qaytish
      </button>
    </div>
  );
}

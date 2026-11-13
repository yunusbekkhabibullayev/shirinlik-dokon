import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export function NotificationToast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === "success";
  const isError = toast.type === "error";

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-bounce-subtle">
      <div className={`p-4 rounded-2xl shadow-xl border flex items-start gap-3 backdrop-blur-md ${
        isSuccess 
          ? "bg-emerald-950/90 text-white border-emerald-500/50 shadow-emerald-950/20" 
          : isError 
          ? "bg-rose-950/90 text-white border-rose-500/50 shadow-rose-950/20" 
          : "bg-slate-900/90 text-white border-slate-700 shadow-slate-900/20"
      }`}>
        <div className="shrink-0 mt-0.5">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-sky-400" />}
        </div>

        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
            {toast.title || (isSuccess ? "Muvaffaqiyatli" : "Xabar")}
          </p>
          <p className="text-sm font-medium mt-0.5 leading-snug">
            {toast.message}
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          aria-label="Yopish"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}


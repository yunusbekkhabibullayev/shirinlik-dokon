import React from 'react';

// 🇺🇿 O'zbekiston bayrog'i SVG
export function FlagUz({ className = 'w-5 h-3.5' }) {
  return (
    <svg
      className={`${className} rounded-xs shadow-2xs shrink-0 overflow-hidden inline-block align-middle`}
      viewBox="0 0 500 250"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="500" height="250" fill="#1EB53A" />
      <rect width="500" height="166.7" fill="#CE1126" />
      <rect width="500" height="160" fill="#FFFFFF" />
      <rect width="500" height="86.7" fill="#CE1126" />
      <rect width="500" height="80" fill="#0099B5" />
      {/* Crescent */}
      <circle cx="70" cy="40" r="30" fill="#FFFFFF" />
      <circle cx="78" cy="40" r="24" fill="#0099B5" />
      {/* 12 Stars */}
      <g fill="#FFFFFF">
        <circle cx="124" cy="20" r="4" />
        <circle cx="140" cy="20" r="4" />
        <circle cx="156" cy="20" r="4" />
        <circle cx="108" cy="35" r="4" />
        <circle cx="124" cy="35" r="4" />
        <circle cx="140" cy="35" r="4" />
        <circle cx="156" cy="35" r="4" />
        <circle cx="92" cy="50" r="4" />
        <circle cx="108" cy="50" r="4" />
        <circle cx="124" cy="50" r="4" />
        <circle cx="140" cy="50" r="4" />
        <circle cx="156" cy="50" r="4" />
      </g>
    </svg>
  );
}

// 🇷🇺 Rossiya bayrog'i SVG
export function FlagRu({ className = 'w-5 h-3.5' }) {
  return (
    <svg
      className={`${className} rounded-xs shadow-2xs shrink-0 overflow-hidden inline-block align-middle`}
      viewBox="0 0 450 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="450" height="300" fill="#D52B1E" />
      <rect width="450" height="200" fill="#0039A6" />
      <rect width="450" height="100" fill="#FFFFFF" />
    </svg>
  );
}

// 🇬🇧 Buyuk Britaniya (Ingliz tili) bayrog'i SVG
export function FlagEn({ className = 'w-5 h-3.5' }) {
  return (
    <svg
      className={`${className} rounded-xs shadow-2xs shrink-0 overflow-hidden inline-block align-middle`}
      viewBox="0 0 60 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="flag_gb_clip">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="flag_gb_diag">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#flag_gb_clip)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#flag_gb_diag)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

// Universal Flag Component
export function FlagIcon({ code, className = 'w-5 h-3.5' }) {
  switch (code) {
    case 'uz':
      return <FlagUz className={className} />;
    case 'ru':
      return <FlagRu className={className} />;
    case 'en':
      return <FlagEn className={className} />;
    default:
      return null;
  }
}

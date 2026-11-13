/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFF0F1',
          100: '#FFE4E6',
          200: '#FECDD3',
          500: '#E11D48',
          600: '#CC1122',
          700: '#B00E1E',
          DEFAULT: '#CC1122',
        },
        primary: {
          DEFAULT: '#CC1122',
          light: '#FFF0F1',
          hover: '#B00E1E',
          border: '#FFE4E6',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'brand': '0 4px 14px 0 rgba(204, 17, 34, 0.25)',
      }
    },
  },
  plugins: [],
}

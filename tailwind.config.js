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
        // Admin & Brand Palette
        admin: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },

        // SyoloTrip Brand Palette
        'primary': '#0c2d6b',
        'on-primary': '#ffffff',
        'primary-container': '#143d8a',
        'on-primary-container': '#d4e3ff',
        'inverse-primary': '#a4c8ff',

        'secondary': '#c05d00',
        'on-secondary': '#ffffff',
        'secondary-container': '#f28c1c',
        'on-secondary-container': '#4a2200',

        'tertiary': '#1a6fb5',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#2988d4',
        'on-tertiary-container': '#d0e8ff',

        'error': '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',

        'surface': '#f7f9ff',
        'on-surface': '#0c1b33',
        'surface-variant': '#d5dff2',
        'on-surface-variant': '#3a4456',
        'surface-dim': '#cdd5ea',
        'surface-bright': '#f7f9ff',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f0f4ff',
        'surface-container': '#e8edfb',
        'surface-container-high': '#dfe6f7',
        'surface-container-highest': '#d5dff2',
        'surface-tint': '#1a5eb5',
        'outline': '#6b778c',
        'outline-variant': '#b9c5d8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};


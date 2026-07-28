/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4',
          400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e',
          800: '#115e59', 900: '#134e4a', 950: '#042b35'
        },
        accent: {
          50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 300: '#f0abfc',
          400: '#e879f9', 500: '#d946ef', 600: '#c026d3', 700: '#a21caf',
          800: '#86198f', 900: '#701a75', 950: '#4a044e'
        },
        emerald: {
          400: '#34d399', 500: '#10b981', 600: '#059669'
        },
        cyan: {
          400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2'
        },
        dark: {
          50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4',
          400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e',
          800: '#073846', 900: '#042b35', 950: '#021e25'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Space Mono', 'Consolas', 'monospace']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'radial-gradient(at 45% 15%, hsla(174,80%,35%,0.15) 0px, transparent 55%), radial-gradient(at 80% 50%, hsla(187,90%,40%,0.12) 0px, transparent 45%), radial-gradient(at 15% 85%, hsla(170,80%,30%,0.12) 0px, transparent 50%)',
        'grid-pattern': 'radial-gradient(circle, rgba(45, 212, 191, 0.08) 1px, transparent 1px)'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'beam': 'beam 3s ease-in-out infinite'
      },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        'gradient-x': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' }
        },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        beam: { '0%, 100%': { opacity: '0.3' }, '50%': { opacity: '0.9' } }
      },
      backdropBlur: { xs: '2px' },
      boxShadow: {
        'glow': '0 0 24px rgba(20, 184, 166, 0.25)',
        'glow-lg': '0 0 48px rgba(20, 184, 166, 0.35)',
        'glow-emerald': '0 0 25px rgba(16, 185, 129, 0.25)',
        'glow-cyan': '0 0 25px rgba(6, 182, 212, 0.25)',
        'studio': '0 16px 40px -8px rgba(2, 30, 37, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        'card': '0 4px 20px rgba(2, 30, 37, 0.2)'
      }
    }
  },
  plugins: []
}

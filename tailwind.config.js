/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCF9',
          100: '#FDFBF7', // Primary Background
          200: '#F7F3EB',
          300: '#EDE5D6',
          400: '#DFD4BE',
        },
        burgundy: {
          50: '#F8EEF0',
          100: '#EBD2D6',
          200: '#D5A7B0',
          500: '#842437',
          700: '#6A1D2D',
          800: '#581825', // Primary Navigation / Elements
          900: '#41101A',
          950: '#2A0910',
        },
        champagne: {
          50: '#FBF8EE',
          100: '#F5EDD5',
          200: '#EADAA7',
          300: '#DFC67A',
          400: '#D9BC59',
          500: '#D4AF37', // Accent / Warm Gold
          600: '#BE9B2C',
          700: '#9E8022',
        },
        charcoal: {
          50: '#F4F4F4',
          100: '#E5E5E5',
          300: '#A3A3A3',
          500: '#525252',
          700: '#383838',
          800: '#2C2C2C', // Deep Charcoal for Pristine Readability
          900: '#1C1C1C',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 35px -5px rgba(88, 24, 37, 0.08), 0 4px 12px -2px rgba(88, 24, 37, 0.04)',
        'luxury-hover': '0 20px 45px -10px rgba(88, 24, 37, 0.16), 0 8px 20px -4px rgba(212, 175, 55, 0.18)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)',
        'burgundy-glow': '0 0 30px rgba(88, 24, 37, 0.25)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(2deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(8px) rotate(-2deg)' },
        },
        celebrateBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.35s ease-out forwards',
        'fade-up': 'fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-up': 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 2.5s infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-reverse': 'floatReverse 4.5s ease-in-out infinite',
        'celebrate': 'celebrateBounce 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};


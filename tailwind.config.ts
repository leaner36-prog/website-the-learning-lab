import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FBF2F3',
          100: '#F5DEE1',
          200: '#E9B9C0',
          300: '#D68E9B',
          400: '#BE5E70',
          500: '#A33246',
          600: '#8E2236',
          700: '#7A1C2E',
          800: '#5E1522',
          900: '#43101A',
        },
        surface: '#FFFFFF',
        alt: '#FAF7F7',
        line: '#ECE4E5',
        ink: '#1F1A1B',
        muted: '#6B6265',
        success: '#15803D',
        danger: '#B91C1C',
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(31,26,27,0.04), 0 4px 16px rgba(31,26,27,0.06)',
        lift: '0 4px 8px rgba(31,26,27,0.06), 0 16px 32px rgba(122,28,46,0.10)',
      },
    },
  },
} satisfies Config;

import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontSize: {
        sm: '0.707rem',
        base: '1rem',
        xl: '1.414rem',
        '2xl': '1.999rem',
        '3xl': '2.827rem',
        '4xl': '3.997rem',
        '5xl': '5.652rem',
        'heading-1': '64px',
        'heading-2': '46px',
        'heading-3': '30px',
        'heading-4': '18px',
        'subtitle-1': '24px',
        'subtitle-2': '20px',
        'paragraph-1': '22px',
        'paragraph-2': '16px',
        'caption': '14px',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg) scale(1.25)' },
          '50%': { transform: 'rotate(3deg) scale(1.25)' },
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        watchlytheme: {
          "primary": "#3b82f6",
          "primary-content": "#f1f5f9",
          "secondary": "#1e3a8a",
          "secondary-content": "#f1f5f9",
          "accent": "#f59e0b",
          "accent-content": "#f1f5f9",
          "neutral": "#1e293b",
          "neutral-content": "#f1f5f9",
          "base-100": "#020617",
          "base-200": "#1e293b",
          "base-300": "#475569",
          "base-content": "#f1f5f9",
          "info": "#2563eb",
          "info-content": "#f1f5f9",
          "success": "#22c55e",
          "success-content": "#020617",
          "warning": "#d97706",
          "warning-content": "#020617",
          "error": "#ef4444",
          "error-content": "#f1f5f9",
        },
      },
    ],
  },
} satisfies Config;

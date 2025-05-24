import { type Config } from 'tailwindcss'
import { withUt } from 'uploadthing/tw'

export default withUt({
  content: ['./src/**/*.tsx'],
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
        caption: '14px',
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
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('daisyui'),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('tailwindcss-animate'),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('tailwind-scrollbar-hide'),
  ],
  daisyui: {
    themes: [
      {
        watchlytheme: {
          primary: '#3b82f6', // Vivid Blue (Brand Core)
          'primary-content': '#f1f5f9', // Soft Neutral White
          secondary: '#9333ea', // Violet (Split-Complement of blue)
          'secondary-content': '#f5f3ff', // Pale Lavender
          accent: '#f472b6', // Rose Pink (Balanced against primary/secondary)
          'accent-content': '#1f0a18', // Deep Eggplant (for contrast)
          neutral: '#1e293b', // Blue-gray (for depth, modern feel)
          'neutral-content': '#f1f5f9', // Soft white
          'base-100': '#0f172a', // Almost black blue
          'base-200': '#1e293b', // Slightly lighter base
          'base-300': '#334155', // Balanced muted blue
          'base-content': '#f1f5f9', // Consistent light text
          info: '#38bdf8', // Sky blue (information feedback)
          'info-content': '#0c0c1d', // Dark contrast
          success: '#22c55e', // Emerald green (classic success)
          'success-content': '#f0fdf4', // Mint white
          warning: '#facc15', // Bright yellow (visible but soft)
          'warning-content': '#1c1500', // Deep gold contrast
          error: '#ef4444', // Vivid red (kept for urgency)
          'error-content': '#fef2f2', // Soft blush
        },
      },
    ],
  },
}) satisfies Config

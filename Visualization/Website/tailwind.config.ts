import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Use the Inter variable from next/font with sensible fallbacks
        sans: ['var(--font-sans)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        base: ['1rem', { lineHeight: '1.75' }],
      },
      colors: {
        night: '#0b1020',
        star: '#f4f6fb',
        accent: '#7cc4ff',
      },
      backgroundImage: {
        starfield: 'radial-gradient(ellipse at top left, rgba(124,196,255,0.12), transparent 40%), radial-gradient(ellipse at bottom right, rgba(255,255,255,0.08), transparent 40%)',
      },
    },
  },
  plugins: [typography],
} satisfies Config

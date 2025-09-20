import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
  plugins: [],
} satisfies Config


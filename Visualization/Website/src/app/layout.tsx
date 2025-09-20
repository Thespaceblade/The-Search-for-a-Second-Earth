export const metadata = {
  title: 'The Search for the Second Earth',
  description: 'Space exploration and exoplanet discovery project',
};

import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-[#0b1020] text-slate-100 antialiased ${inter.variable} ${inter.className}`}>
        <main id="main" className="max-w-3xl mx-auto px-6 py-12 space-y-12">
          {children}
        </main>
      </body>
    </html>
  );
}

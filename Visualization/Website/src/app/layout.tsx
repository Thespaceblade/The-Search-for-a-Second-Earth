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
        <div className="flex min-h-screen flex-col">

          {/* Main content container: full width, no top padding to remove any top gap */}
          <main id="main" className="flex-1 w-full mx-auto px-0 pt-0 pb-8">
            {children}
          </main>

          <footer className="border-t border-white/10 text-sm text-slate-400 text-center py-8">
            <div className="max-w-6xl mx-auto px-6">
              <p>Made by Jason, Aneesh, Josh and Vraj</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

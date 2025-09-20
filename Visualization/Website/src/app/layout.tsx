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
          <nav className="sticky top-0 z-40 border-b border-white/10 backdrop-blur bg-[#0b1220]/80">
            <div className="max-w-6xl mx-auto h-14 flex items-center justify-between px-6">
              <a href="#mission" className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">
                Second Earth
              </a>
              <div className="flex items-center gap-6 text-sm text-slate-300">
                <a href="#mission" className="transition-colors hover:text-white">
                  Mission
                </a>
                <a href="#pressures" className="transition-colors hover:text-white">
                  Pressures
                </a>
                <a href="#visualizations" className="transition-colors hover:text-white">
                  Visualizations
                </a>
              </div>
            </div>
          </nav>

          <main id="main" className="flex-1 max-w-3xl mx-auto px-6 py-12 space-y-12">
            {children}
          </main>

          <footer className="border-t border-white/10 text-sm text-slate-400 text-center py-8">
            <div className="max-w-6xl mx-auto px-6">
              <p>&copy; {new Date().getFullYear()} The Search for the Second Earth Project.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

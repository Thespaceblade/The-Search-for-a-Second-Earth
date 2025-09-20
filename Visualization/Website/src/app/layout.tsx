export const metadata = {
  title: 'The Search for a Second Earth',
  description: 'Space exploration and exoplanet discovery project',
};

import './globals.css';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`starfield min-h-screen flex flex-col ${inter.className}`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white/10 px-3 py-2 rounded-md">Skip to content</a>
        <header className="sticky top-0 z-50 w-full glass border-b border-white/10">
          <div className="mx-auto w-full max-w-6xl px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-accent font-semibold tracking-wide">Second Earth</Link>
            <nav className="text-sm opacity-90">
              <ul className="flex items-center gap-5">
                <li><Link className="hover:opacity-100 opacity-80" href="#mission">Mission</Link></li>
                <li><Link className="hover:opacity-100 opacity-80" href="#explore">Explore</Link></li>
                <li><Link className="hover:opacity-100 opacity-80" href="#about">About</Link></li>
                <li><Link className="hover:opacity-100 opacity-80" href="/api/data">API</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <main id="main" className="flex-1 w-full mx-auto max-w-6xl px-6">
          {children}
        </main>
        <footer className="w-full glass border-t border-white/10 mt-12">
          <div className="mx-auto w-full max-w-6xl px-6 py-6 text-sm opacity-80 flex items-center justify-between gap-4">
            <span>© 2025 The Search for a Second Earth</span>
            <span className="flex items-center gap-4">
              <a className="hover:opacity-100 opacity-80" href="#">GitHub</a>
              <a className="hover:opacity-100 opacity-80" href="#about">Credits</a>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}

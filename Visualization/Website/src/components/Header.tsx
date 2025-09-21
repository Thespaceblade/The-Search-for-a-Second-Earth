"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname() || "/";
  const items = [
    { href: "/", label: "Data Visualizations" },
    { href: "/our-story", label: "Our Story" },
  ];

  return (
    <header className="w-full mt-0">
      {/* Large title (previous size), centered and flush to the top */}
      <section id="hero-title" className="text-center">
        <h1
          className="mx-auto max-w-[95vw] whitespace-nowrap text-[clamp(1rem,4.5vw,4.5rem)] font-extrabold leading-none tracking-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          The Search for a Second Earth
        </h1>
      </section>

      {/* Website nav links under the title, styled as buttons, centered */}
      <nav aria-label="Primary" className="mt-0 sm:mt-0 flex justify-center">
        <div className="flex items-center gap-3">
          {items.map((it) => {
            const active = pathname === it.href;
            return (
              <Link
                key={it.href}
                href={it.href}
                aria-current={active ? "page" : undefined}
                role="button"
                className={`nav-pill ${active ? 'is-active' : ''}`}
              >
                {it.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

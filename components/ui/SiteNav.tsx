"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Timetable", href: "/timetable" },
  { label: "Map", href: "/map" },
  { label: "Library", href: "/library" },
  { label: "Social Events", href: "/events" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header" role="banner">
      <div className="site-header__inner">
        <Link href="/" className="site-logo" aria-label="Campus Companion — go to homepage">
          <span aria-hidden="true">◈</span>
          <span>CampusCompanion</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="site-nav desktop-nav">
          <ul role="list">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`nav-link ${active ? "nav-link--active" : ""}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="hamburger"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile menu */}
      <nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`}
        hidden={!menuOpen}
      >
        <ul role="list">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`nav-link ${active ? "nav-link--active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

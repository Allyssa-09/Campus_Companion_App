"use client";

import Link from "next/link";

/**
 * HomePage
 * ─────────────
 * Structure by Allyssa (hero + 4 cards).
 * Styling uses the project's existing design tokens from globals.css
 * (cream / gold / ink colour palette + Fraunces + DM Sans) so the page
 * sits cleanly alongside the Map and Timetable pages.
 *
 * NOTE: the top navbar and bottom footer are NOT written here — the
 * project's layout.tsx already wraps every page with SiteNav + footer.
 *
 * To add real images later, drop them into:
 *   public/images/timetable.jpg
 *   public/images/societies.jpg
 *   public/images/campusmap.jpg
 *   public/images/accessibility.jpg
 *   public/images/campus.jpg   (hero background)
 * and they'll appear automatically in the coloured placeholder areas below.
 */

type HomeCard = {
  href: string;
  label: string;
  description: string;
  image: string;   // path under /public — shown if the file exists
  color: string;   // fallback panel colour (matches globals.css palette)
  icon: string;    // small emoji/glyph used while no image is present
};

const CARDS: HomeCard[] = [
  {
    href: "/timetable",
    label: "Timetable",
    description: "Your weekly classes at a glance",
    image: "/images/timetable.jpg",
    color: "var(--blue)",
    icon: "◷",
  },
  {
    href: "/events",
    label: "Society Events",
    description: "What's on across campus this week",
    image: "/images/societies.jpg",
    color: "var(--gold)",
    icon: "",
  },
  {
    href: "/map",
    label: "Campus Map",
    description: "Find buildings, rooms and facilities",
    image: "/images/campusmap.jpg",
    color: "var(--green)",
    icon: "◎",
  },
  {
    href: "/library",
    label: "Library",
    description: "Search books and reserve study rooms",
    image: "/images/library.jpg",
    color: "var(--purple)",
    icon: "",
  },
];

export default function HomePage() {
  return (
    <div className="page">

      {/* ── Hero ── */}
      <section
        style={{
          position: "relative",
          marginTop: 32,
          marginBottom: 56,
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          minHeight: 340,
          background:
            "linear-gradient(135deg, var(--ink) 0%, var(--ink-soft) 60%, var(--gold) 140%)",
          boxShadow: "var(--shadow-elevated)",
        }}
      >
        {/* Background image — if /public/images/campus.jpg exists it will sit
            behind the overlay; if not, the gradient above shows through. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/campus.jpg"
          alt=""
          aria-hidden="true"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.55,
          }}
        />

        {/* Dark tint to keep text readable over any image */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(26,22,16,0.15) 0%, rgba(26,22,16,0.55) 100%)",
          }}
        />

        {/* Hero text */}
        <div
          style={{
            position: "relative",
            padding: "64px 40px",
            color: "var(--cream)",
            maxWidth: 640,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--gold-light)",
              marginBottom: 16,
            }}
          >
            Hartwell University
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              marginBottom: 16,
            }}
          >
            Campus{" "}
            <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--gold-light)" }}>
              Companion
            </em>
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.55,
              color: "rgba(250, 247, 242, 0.88)",
              maxWidth: 460,
            }}
          >
            Your student life, simplified — timetables, maps, society events
            and support services, all in one place.
          </p>
        </div>
      </section>

      {/* ── Section label ── */}
      <h2 className="section-label">Explore</h2>

      {/* ── Card grid (2 × 2) ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
          marginBottom: 48,
        }}
      >
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            style={{
              display: "block",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              textDecoration: "none",
              color: "var(--ink)",
              background: "white",
              boxShadow: "var(--shadow-card)",
              border: "1.5px solid transparent",
              transition: "transform 0.15s, box-shadow 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "var(--shadow-elevated)";
              e.currentTarget.style.borderColor = card.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "var(--shadow-card)";
              e.currentTarget.style.borderColor = "transparent";
            }}
          >
            {/* Image / coloured placeholder */}
            <div
              style={{
                position: "relative",
                aspectRatio: "16 / 9",
                background: `linear-gradient(135deg, ${card.color} 0%, var(--ink-soft) 140%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {/* Real image (hidden if file doesn't exist) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image}
                alt=""
                aria-hidden="true"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {/* Icon shown on top of the coloured panel */}
              <span
                aria-hidden="true"
                style={{
                  position: "relative",
                  fontSize: "3rem",
                  color: "var(--cream)",
                  opacity: 0.9,
                  textShadow: "0 2px 8px rgba(0,0,0,0.25)",
                }}
              >
                {card.icon}
              </span>
            </div>

            {/* Card text */}
            <div style={{ padding: "20px 22px" }}>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginBottom: 6,
                  lineHeight: 1.2,
                }}
              >
                {card.label}
              </h3>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--ink-muted)",
                  lineHeight: 1.5,
                }}
              >
                {card.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
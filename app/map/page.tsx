"use client";

import { useState } from "react";

const BUILDINGS = [
  {
    id: "b1",
    name: "Kenwood Building",
    code: "KEN",
    description: "Home to the Computer Science and Engineering departments. Contains labs, lecture theatres and student study spaces.",
    facilities: ["Computer Labs", "Lecture Theatres", "Study Rooms"],
    colour: "#4F6EF7",
    x: 22,
    y: 18,
    w: 18,
    h: 14,
  },
  {
    id: "b2",
    name: "Sciences Block",
    code: "SCI",
    description: "Houses Mathematics, Physics and Chemistry. Features modern laboratory facilities and tutorial rooms.",
    facilities: ["Chemistry Labs", "Physics Labs", "Tutorial Rooms"],
    colour: "#E07A5F",
    x: 60,
    y: 14,
    w: 18,
    h: 14,
  },
  {
    id: "b3",
    name: "Humanities Hub",
    code: "HUM",
    description: "Centre for English, History and Social Sciences. Home to seminar rooms and the writing centre.",
    facilities: ["Seminar Rooms", "Writing Centre", "Common Room"],
    colour: "#3DAB7E",
    x: 12,
    y: 58,
    w: 18,
    h: 14,
  },
  {
    id: "b4",
    name: "Main Library",
    code: "LIB",
    description: "The central library with over 200,000 volumes, silent study floors, group study rooms and 24/7 access.",
    facilities: ["Silent Study", "Group Rooms", "Printing"],
    colour: "#c4901a",
    x: 54,
    y: 52,
    w: 18,
    h: 14,
  },
  {
    id: "b5",
    name: "Student Union",
    code: "SU",
    description: "Your social hub — cafe, common rooms, society offices and the student welfare centre are all here.",
    facilities: ["Cafe", "Common Rooms", "Society Offices"],
    colour: "#9B59B6",
    x: 33,
    y: 70,
    w: 14,
    h: 12,
  },
  {
    id: "b6",
    name: "Welfare House",
    code: "WEL",
    description: "Student wellbeing, counselling and health services. Drop-in sessions available every Wednesday.",
    facilities: ["Counselling", "Health Services", "Drop-in Sessions"],
    colour: "#E74C3C",
    x: 68,
    y: 66,
    w: 16,
    h: 12,
  },
];

const INK = "#1a1610";
const INK_MUTED = "#6b5f4e";
const GOLD = "#c4901a";

export default function MapPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedBuilding = BUILDINGS.find((b) => b.id === selected);

  return (
    <div className="page">

      {/* Header */}
      <div style={{ paddingTop: 48, marginBottom: 40 }}>
        <p style={{
          fontSize: "0.78rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: GOLD,
          marginBottom: 16,
        }}>
          Hartwell University
        </p>
        <h1 style={{
          fontFamily: "Fraunces, Georgia, serif",
          fontSize: "clamp(2.4rem, 5vw, 4rem)",
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          color: INK,
          marginBottom: 12,
        }}>
          Campus{" "}
          <em style={{ fontStyle: "italic", fontWeight: 300, color: GOLD }}>Map</em>
        </h1>
        <p style={{ color: INK_MUTED, fontSize: "0.95rem" }}>
          Click any building to explore facilities and details
        </p>
      </div>

      {/* Map + Sidebar */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 300px",
        gap: 24,
        alignItems: "start",
        marginBottom: 48,
      }}>

        {/* Map */}
        <div style={{
          position: "relative",
          borderRadius: 16,
          border: "2px solid #d4c9b0",
          overflow: "hidden",
          height: 460,
          boxShadow: "0 8px 32px rgba(26,22,16,0.1)",
          background: "#e8e0d0",
        }}>

          {/* SVG map */}
          <svg
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Ground/grass areas */}
            <rect x="0" y="0" width="100" height="100" fill="#e8e0d0" />
            <rect x="8" y="8" width="35" height="35" rx="1" fill="#d4d8c0" opacity="0.6" />
            <rect x="50" y="8" width="40" height="35" rx="1" fill="#d4d8c0" opacity="0.6" />
            <rect x="8" y="50" width="35" height="40" rx="1" fill="#d4d8c0" opacity="0.6" />
            <rect x="50" y="50" width="40" height="40" rx="1" fill="#d4d8c0" opacity="0.6" />

            {/* Roads */}
            <rect x="44" y="0" width="8" height="100" fill="#c8c0b0" />
            <rect x="0" y="44" width="100" height="8" fill="#c8c0b0" />

            {/* Road centre lines */}
            <line x1="48" y1="0" x2="48" y2="44" stroke="white" strokeWidth="0.4" strokeDasharray="2,2" />
            <line x1="48" y1="52" x2="48" y2="100" stroke="white" strokeWidth="0.4" strokeDasharray="2,2" />
            <line x1="0" y1="48" x2="44" y2="48" stroke="white" strokeWidth="0.4" strokeDasharray="2,2" />
            <line x1="52" y1="48" x2="100" y2="48" stroke="white" strokeWidth="0.4" strokeDasharray="2,2" />

            {/* Courtyard / quad */}
            <rect x="44" y="44" width="8" height="8" fill="#b8b090" />

            {/* Road labels */}
            <text x="48" y="98" textAnchor="middle" fill="#8a7e6e" fontSize="2.2" fontWeight="600" letterSpacing="0.3">MAIN ROAD</text>
            <text x="98" y="48" textAnchor="middle" fill="#8a7e6e" fontSize="2.2" fontWeight="600" letterSpacing="0.3" transform="rotate(90, 98, 48)">EAST ROAD</text>

            {/* Quad label */}
            <text x="48" y="47" textAnchor="middle" fill="#8a7e6e" fontSize="1.6" fontWeight="700" letterSpacing="0.2">QUAD</text>

            {/* Building rectangles */}
            {BUILDINGS.map((b) => (
              <g key={b.id} onClick={() => setSelected(selected === b.id ? null : b.id)} style={{ cursor: "pointer" }}>
                <rect
                  x={b.x}
                  y={b.y}
                  width={b.w}
                  height={b.h}
                  rx="0.8"
                  fill={selected === b.id ? b.colour : "#b8b4a8"}
                  stroke={selected === b.id ? b.colour : "#9a9488"}
                  strokeWidth={selected === b.id ? "0.6" : "0.3"}
                  style={{ filter: selected === b.id ? `drop-shadow(0 0 2px ${b.colour}88)` : "none", transition: "all 0.2s" }}
                />
                <text
                  x={b.x + b.w / 2}
                  y={b.y + b.h / 2 + 1}
                  textAnchor="middle"
                  fill={selected === b.id ? "white" : "#3d3529"}
                  fontSize="2.4"
                  fontWeight="800"
                  letterSpacing="0.1"
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  {b.code}
                </text>
              </g>
            ))}
          </svg>

          {/* Legend */}
          <div style={{
            position: "absolute",
            bottom: 12,
            left: 12,
            background: "rgba(255,255,255,0.9)",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: "0.68rem",
            color: INK_MUTED,
            fontWeight: 600,
            border: "1px solid #d4c9b0",
          }}>
            Click a building to explore
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ position: "sticky", top: 88 }}>
          {selectedBuilding ? (
            <div style={{
              background: "white",
              border: `2px solid ${selectedBuilding.colour}`,
              borderRadius: 16,
              padding: 24,
              boxShadow: `0 8px 32px ${selectedBuilding.colour}22`,
              animation: "slideUp 0.2s ease",
            }}>
              <button
                onClick={() => setSelected(null)}
                style={{
                  float: "right",
                  background: "#f0ebe0",
                  border: "none",
                  borderRadius: 4,
                  padding: "4px 10px",
                  cursor: "pointer",
                  color: INK_MUTED,
                  fontSize: "0.9rem",
                }}
              >x</button>

              <div style={{
                display: "inline-block",
                background: selectedBuilding.colour,
                color: "white",
                borderRadius: 4,
                padding: "4px 12px",
                fontSize: "0.75rem",
                fontWeight: 800,
                letterSpacing: "0.12em",
                marginBottom: 12,
              }}>
                {selectedBuilding.code}
              </div>

              <h2 style={{
                fontFamily: "Fraunces, Georgia, serif",
                fontSize: "1.3rem",
                fontWeight: 700,
                color: INK,
                lineHeight: 1.2,
                marginBottom: 12,
              }}>
                {selectedBuilding.name}
              </h2>

              <p style={{
                color: INK_MUTED,
                fontSize: "0.85rem",
                lineHeight: 1.6,
                marginBottom: 20,
              }}>
                {selectedBuilding.description}
              </p>

              <p style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: GOLD,
                marginBottom: 10,
                paddingBottom: 8,
                borderBottom: "1px solid #f0ebe0",
              }}>
                Facilities
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {selectedBuilding.facilities.map((f) => (
                  <span key={f} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: "0.82rem",
                    color: INK,
                  }}>
                    <span style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: selectedBuilding.colour,
                      flexShrink: 0,
                      display: "inline-block",
                    }} />
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div style={{
              background: "white",
              border: "1px solid #e8e0d0",
              borderRadius: 16,
              padding: 24,
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(26,22,16,0.08)",
            }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: `2px solid ${GOLD}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                color: GOLD,
                fontSize: "1.2rem",
                fontWeight: 700,
              }}>
                ?
              </div>
              <p style={{
                fontFamily: "Fraunces, Georgia, serif",
                fontSize: "1.1rem",
                color: INK,
                fontStyle: "italic",
                marginBottom: 8,
              }}>
                Select a building
              </p>
              <p style={{ fontSize: "0.82rem", color: INK_MUTED, lineHeight: 1.5 }}>
                Click any building on the map or a card below to see details and facilities.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Building cards */}
      <h2 className="section-label">All Buildings</h2>
      <div className="quick-links-grid">
        {BUILDINGS.map((b) => (
          <button
            key={b.id}
            onClick={() => setSelected(selected === b.id ? null : b.id)}
            style={{
              background: selected === b.id ? "white" : "white",
              border: selected === b.id ? `1.5px solid ${b.colour}` : "1.5px solid transparent",
              borderRadius: 8,
              padding: "18px 16px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              textAlign: "left",
              boxShadow: selected === b.id
                ? `0 8px 32px rgba(26,22,16,0.12), 0 0 12px ${b.colour}33`
                : "0 2px 8px rgba(26,22,16,0.08)",
              transition: "all 0.15s",
            }}
            aria-pressed={selected === b.id}
          >
            <span style={{
              display: "inline-block",
              background: b.colour,
              color: "white",
              borderRadius: 4,
              padding: "2px 8px",
              fontSize: "0.68rem",
              fontWeight: 800,
              letterSpacing: "0.1em",
              width: "fit-content",
            }}>
              {b.code}
            </span>
            <span style={{
              fontWeight: 700,
              fontSize: "0.9rem",
              color: selected === b.id ? b.colour : INK,
            }}>
              {b.name}
            </span>
            <span style={{ fontSize: "0.75rem", color: INK_MUTED, lineHeight: 1.4 }}>
              {b.facilities.join(" · ")}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
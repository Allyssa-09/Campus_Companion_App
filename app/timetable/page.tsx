"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { TIMETABLE } from "@/lib/db";
import type { TimetableEntry } from "@/types";

const DAYS: TimetableEntry["day"][] = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
];

const HOURS = Array.from({ length: 10 }, (_, i) => i + 8); // 08:00 – 17:00
const START_HOUR = 8;
const PX_PER_HOUR = 72;

function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function classTopPx(startTime: string): number {
  const mins = timeToMinutes(startTime) - START_HOUR * 60;
  return (mins / 60) * PX_PER_HOUR;
}

function classHeightPx(startTime: string, endTime: string): number {
  const duration = timeToMinutes(endTime) - timeToMinutes(startTime);
  return (duration / 60) * PX_PER_HOUR;
}

// Detect actual day of week (default to Monday for weekend)
function getDefaultDay(): TimetableEntry["day"] {
  const d = new Date().getDay(); // 0=Sun, 6=Sat
  if (d === 0 || d === 6) return "Monday";
  return DAYS[d - 1];
}

function DetailPanel({
  entry,
  onClose,
}: {
  entry: TimetableEntry;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, [entry.id]);

  // Trap Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className="detail-panel"
      role="region"
      aria-label={`Details for ${entry.moduleName}`}
      aria-live="polite"
    >
      <button
        ref={closeRef}
        className="detail-panel__close"
        onClick={onClose}
        aria-label="Close module details"
      >
        ✕
      </button>

      <h2>{entry.moduleName}</h2>
      <span className="detail-panel__code">{entry.moduleCode}</span>

      <dl className="detail-meta-grid">
        {[
          { label: "Type", value: entry.type },
          { label: "Day", value: entry.day },
          { label: "Time", value: `${entry.startTime} – ${entry.endTime}` },
          { label: "Room", value: entry.room },
          { label: "Building", value: entry.building },
          { label: "Lecturer", value: entry.lecturer },
        ].map(({ label, value }) => (
          <div key={label} className="detail-meta-item">
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function TimetablePage() {
  const [activeDay, setActiveDay] = useState<TimetableEntry["day"]>(getDefaultDay);
  const [selectedEntry, setSelectedEntry] = useState<TimetableEntry | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const dayClasses = TIMETABLE
    .filter((e) => e.day === activeDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const handleSelectEntry = useCallback((entry: TimetableEntry) => {
    setSelectedEntry((prev) => (prev?.id === entry.id ? null : entry));
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedEntry(null);
  }, []);

  // Scroll detail panel into view when opened
  useEffect(() => {
    if (selectedEntry && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedEntry]);

  const totalHeight = HOURS.length * PX_PER_HOUR;
  const todayDayName = getDefaultDay();

  return (
    <div className="page timetable-page">
      {/* Page header */}
      <header className="timetable-header">
        <h1>
          Your <em>timetable</em>
        </h1>
        <p>Week view · Autumn Term 2025 · Click any class for details</p>
      </header>

      {/* Day tab strip */}
      <div
        role="tablist"
        aria-label="Select day"
        className="day-tabs"
      >
        {DAYS.map((day) => {
          const count = TIMETABLE.filter((e) => e.day === day).length;
          const isActive = activeDay === day;
          const isToday = day === todayDayName;

          return (
            <button
              key={day}
              role="tab"
              aria-selected={isActive}
              aria-controls="timetable-panel"
              id={`tab-${day}`}
              className={[
                "day-tab",
                isActive ? "day-tab--active" : "",
                isToday ? "day-tab--today" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => {
                setActiveDay(day);
                setSelectedEntry(null);
              }}
            >
              <span className="day-tab__label">{day.slice(0, 3)}</span>
              <span className="day-tab__count" aria-hidden="true">
                {count} class{count !== 1 ? "es" : ""}
              </span>
            </button>
          );
        })}
      </div>

      {/* Timetable grid panel */}
      <div
        id="timetable-panel"
        role="tabpanel"
        aria-labelledby={`tab-${activeDay}`}
        aria-label={`${activeDay} timetable`}
      >
        {dayClasses.length === 0 ? (
          <p className="timetable-empty" role="status">
            No classes on {activeDay} — a free day!
          </p>
        ) : (
          <div className="timetable-grid" aria-label="Visual timetable grid">
            {/* Accessible text fallback for screen readers */}
            <section
              aria-label={`${activeDay} classes list`}
              className="sr-only"
            >
              <ul>
                {dayClasses.map((e) => (
                  <li key={e.id}>
                    {e.startTime}–{e.endTime}: {e.moduleName} ({e.type}), {e.room},{" "}
                    {e.building}, {e.lecturer}
                  </li>
                ))}
              </ul>
            </section>

            {/* Visual grid (aria-hidden so screen readers use the list above) */}
            <div className="time-axis" aria-hidden="true">
              {/* Hour labels */}
              <div className="time-slots">
                {HOURS.map((h) => (
                  <div key={h} className="time-label">
                    {String(h).padStart(2, "0")}:00
                  </div>
                ))}
              </div>

              {/* Classes column */}
              <div
                className="classes-column"
                style={{ height: totalHeight }}
              >
                {/* Hour lines */}
                {HOURS.map((h) => (
                  <div
                    key={h}
                    className="hour-line"
                    style={{ top: (h - START_HOUR) * PX_PER_HOUR }}
                  />
                ))}

                {/* Class blocks */}
                {dayClasses.map((entry) => (
                  <button
                    key={entry.id}
                    className="class-block"
                    style={{
                      top: classTopPx(entry.startTime),
                      height: classHeightPx(entry.startTime, entry.endTime),
                      backgroundColor: entry.colour,
                      outline:
                        selectedEntry?.id === entry.id
                          ? "3px solid var(--gold)"
                          : undefined,
                    }}
                    onClick={() => handleSelectEntry(entry)}
                    aria-pressed={selectedEntry?.id === entry.id}
                    aria-label={`${entry.moduleName} ${entry.type}, ${entry.startTime} to ${entry.endTime}, ${entry.room}. Press to ${selectedEntry?.id === entry.id ? "close" : "view"} details.`}
                  >
                    <div className="class-block__code">{entry.moduleCode}</div>
                    <div className="class-block__name">{entry.moduleName}</div>
                    {classHeightPx(entry.startTime, entry.endTime) >= 80 && (
                      <div className="class-block__meta">
                        {entry.room} · {entry.lecturer}
                      </div>
                    )}
                    <span className="class-block__type-badge">{entry.type}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Detail panel */}
        {selectedEntry && (
          <div ref={detailRef}>
            <DetailPanel entry={selectedEntry} onClose={handleCloseDetail} />
          </div>
        )}
      </div>

      {/* Keyboard hint */}
      <p
        style={{
          marginTop: 32,
          fontSize: "0.78rem",
          color: "var(--ink-muted)",
        }}
        aria-live="off"
      >
        <strong>Keyboard tip:</strong> Use Tab to navigate between classes, Enter/Space to
        select, Escape to dismiss detail panel.
      </p>
    </div>
  );
}
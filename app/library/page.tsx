"use client";

import { useMemo, useState } from "react";

type LibraryItemType = "Book" | "eBook" | "Journal" | "Laptop";
type Availability = "Available" | "Limited" | "Checked out";

type LibraryItem = {
  id: string;
  title: string;
  author: string;
  category: string;
  type: LibraryItemType;
  location: string;
  availability: Availability;
  keywords: string[];
};

type StudyRoom = {
  id: string;
  name: string;
  capacity: number;
  features: string[];
  availability: "Available now" | "Busy until 14:00" | "Available from 16:00";
};

const LIBRARY_ITEMS: LibraryItem[] = [
  {
    id: "lib1",
    title: "Python Programming Foundations",
    author: "Nora Walsh",
    category: "Computing",
    type: "Book",
    location: "Floor 2 · Shelf CS-14",
    availability: "Available",
    keywords: ["python", "coding", "software", "programming"],
  },
  {
    id: "lib2",
    title: "Web Design Essentials",
    author: "Lena Murphy",
    category: "Web Development",
    type: "eBook",
    location: "Digital collection",
    availability: "Available",
    keywords: ["html", "css", "ux", "design"],
  },
  {
    id: "lib3",
    title: "Data and Society Review",
    author: "Hartwell Academic Press",
    category: "Research",
    type: "Journal",
    location: "Floor 1 · Journals Zone",
    availability: "Limited",
    keywords: ["research", "data", "analysis"],
  },
  {
    id: "lib4",
    title: "Discrete Mathematics for Beginners",
    author: "Elias Byrne",
    category: "Mathematics",
    type: "Book",
    location: "Floor 2 · Shelf MA-08",
    availability: "Checked out",
    keywords: ["maths", "algebra", "logic"],
  },
  {
    id: "lib5",
    title: "Student Loan Laptop",
    author: "IT Help Desk",
    category: "Equipment",
    type: "Laptop",
    location: "Library Services Desk",
    availability: "Limited",
    keywords: ["laptop", "borrow", "device"],
  },
  {
    id: "lib6",
    title: "Networks and Cybersecurity Basics",
    author: "Adam Okoro",
    category: "Computing",
    type: "Book",
    location: "Floor 2 · Shelf CS-22",
    availability: "Available",
    keywords: ["network", "security", "infrastructure"],
  },
];

const STUDY_ROOMS: StudyRoom[] = [
  {
    id: "room1",
    name: "Quiet Pod A",
    capacity: 2,
    features: ["Silent study", "Power sockets", "Natural light"],
    availability: "Available now",
  },
  {
    id: "room2",
    name: "Collab Room B",
    capacity: 6,
    features: ["Whiteboard", "Screen", "Group discussion"],
    availability: "Busy until 14:00",
  },
  {
    id: "room3",
    name: "Project Room C",
    capacity: 8,
    features: ["Large table", "Display", "Wheelchair accessible"],
    availability: "Available from 16:00",
  },
];

const OPENING_HOURS = [
  { day: "Monday", hours: "08:00 – 21:00" },
  { day: "Tuesday", hours: "08:00 – 21:00" },
  { day: "Wednesday", hours: "08:00 – 21:00" },
  { day: "Thursday", hours: "08:00 – 21:00" },
  { day: "Friday", hours: "08:00 – 18:00" },
  { day: "Saturday", hours: "10:00 – 17:00" },
  { day: "Sunday", hours: "12:00 – 17:00" },
];

const FILTERS: Array<LibraryItemType | "All"> = ["All", "Book", "eBook", "Journal", "Laptop"];

function getTodayName() {
  return new Intl.DateTimeFormat("en-IE", { weekday: "long" }).format(new Date());
}

function badgeStyles(status: Availability | StudyRoom["availability"]) {
  if (status.toLowerCase().includes("available")) {
    return {
      background: "var(--green-light)",
      color: "var(--green)",
      border: "1px solid rgba(26,122,74,0.18)",
    };
  }
  if (status.toLowerCase().includes("limited") || status.toLowerCase().includes("busy")) {
    return {
      background: "var(--blue-light)",
      color: "var(--blue)",
      border: "1px solid rgba(26,79,196,0.16)",
    };
  }
  return {
    background: "#fff1eb",
    color: "var(--rust)",
    border: "1px solid rgba(196,70,26,0.15)",
  };
}

export default function LibraryPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<LibraryItemType | "All">("All");
  const [selectedRoom, setSelectedRoom] = useState(STUDY_ROOMS[0].id);
  const [bookingName, setBookingName] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");

  const today = getTodayName();
  const todayHours = OPENING_HOURS.find((entry) => entry.day === today);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return LIBRARY_ITEMS.filter((item) => {
      const matchesFilter = activeFilter === "All" || item.type === activeFilter;
      const matchesQuery =
        q.length === 0 ||
        item.title.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.keywords.some((keyword) => keyword.includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, query]);

  function handleReserveRoom(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const room = STUDY_ROOMS.find((entry) => entry.id === selectedRoom);
    if (!room) return;
    const safeName = bookingName.trim() || "Student";
    setBookingSuccess(
      `${safeName}, your request for ${room.name} has been saved. Please collect confirmation from the library desk within 15 minutes.`
    );
    setBookingName("");
  }

  return (
    <div className="page" style={{ paddingTop: 32 }}>
      <section
        aria-labelledby="library-title"
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 0.9fr",
          gap: 24,
          alignItems: "start",
          marginBottom: 32,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #fff 0%, #f7f1e7 100%)",
            border: "1px solid var(--cream-dark)",
            borderRadius: 20,
            boxShadow: "var(--shadow-card)",
            padding: 32,
          }}
        >
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontSize: "0.78rem",
              color: "var(--gold)",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            Study smarter
          </p>
          <h1
            id="library-title"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              marginBottom: 16,
            }}
          >
            Campus <em style={{ color: "var(--blue)", fontStyle: "normal" }}>Library</em>
          </h1>
          <p style={{ maxWidth: 700, color: "var(--ink-soft)", fontSize: "1.05rem", marginBottom: 22 }}>
            Search books and digital resources, check availability, and request a study room — all in one place.
            This section uses fictional library data for the CA project.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 14,
            }}
          >
            {[
              ["Resources", "200,000+ titles"],
              ["Study rooms", "12 bookable spaces"],
              ["Today's hours", todayHours?.hours ?? "Check desk"],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  background: "rgba(255,255,255,0.72)",
                  border: "1px solid var(--cream-dark)",
                  borderRadius: 14,
                  padding: 14,
                }}
              >
                <div style={{ fontSize: "0.8rem", color: "var(--ink-muted)", marginBottom: 4 }}>{label}</div>
                <div style={{ fontWeight: 700 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        <aside
          aria-labelledby="hours-title"
          style={{
            background: "white",
            border: "1px solid var(--cream-dark)",
            borderRadius: 20,
            boxShadow: "var(--shadow-card)",
            padding: 24,
          }}
        >
          <h2 id="hours-title" style={{ fontFamily: "var(--font-display)", marginBottom: 14 }}>Opening hours</h2>
          <p style={{ color: "var(--ink-muted)", marginBottom: 14 }}>
            Today is <strong>{today}</strong>. The library is open <strong>{todayHours?.hours ?? "see desk"}</strong>.
          </p>
          <ul role="list" style={{ display: "grid", gap: 10 }}>
            {OPENING_HOURS.map((entry) => (
              <li
                key={entry.day}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  paddingBottom: 10,
                  borderBottom: "1px solid var(--cream-dark)",
                  fontSize: "0.95rem",
                }}
              >
                <span style={{ fontWeight: entry.day === today ? 700 : 500 }}>{entry.day}</span>
                <span style={{ color: "var(--ink-muted)" }}>{entry.hours}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section
        aria-labelledby="search-title"
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        <div
          style={{
            background: "white",
            border: "1px solid var(--cream-dark)",
            borderRadius: 20,
            boxShadow: "var(--shadow-card)",
            padding: 24,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
            <div>
              <h2 id="search-title" style={{ fontFamily: "var(--font-display)", marginBottom: 4 }}>Search the catalogue</h2>
              <p style={{ color: "var(--ink-muted)" }}>Filter resources by keyword and type.</p>
            </div>
            <div
              style={{
                alignSelf: "start",
                padding: "8px 12px",
                borderRadius: 999,
                background: "var(--cream)",
                color: "var(--ink-soft)",
                fontSize: "0.88rem",
                fontWeight: 600,
              }}
            >
              {results.length} result{results.length !== 1 ? "s" : ""}
            </div>
          </div>

          <label htmlFor="library-search" style={{ display: "block", fontWeight: 600, marginBottom: 8 }}>
            Search by title, author or topic
          </label>
          <input
            id="library-search"
            type="search"
            placeholder="Try: python, networks, maths..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%",
              border: "1px solid #cfc3ae",
              borderRadius: 12,
              padding: "14px 16px",
              fontSize: "1rem",
              marginBottom: 16,
              background: "#fffdfa",
            }}
          />

          <div role="toolbar" aria-label="Resource filters" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
            {FILTERS.map((filter) => {
              const active = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveFilter(filter)}
                  style={{
                    borderRadius: 999,
                    border: active ? "2px solid var(--blue)" : "1px solid #d8cdb9",
                    background: active ? "var(--blue-light)" : "white",
                    color: active ? "var(--blue)" : "var(--ink-soft)",
                    fontWeight: 700,
                    padding: "9px 14px",
                    cursor: "pointer",
                  }}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <div style={{ display: "grid", gap: 14 }}>
            {results.length === 0 ? (
              <div
                role="status"
                style={{
                  border: "1px dashed #ccbfa7",
                  background: "#fffaf4",
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                No resources match your search. Try a broader keyword like <strong>programming</strong> or <strong>design</strong>.
              </div>
            ) : (
              results.map((item) => (
                <article
                  key={item.id}
                  style={{
                    border: "1px solid var(--cream-dark)",
                    borderRadius: 18,
                    padding: 18,
                    background: "#fffdfa",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: "0.82rem", color: "var(--ink-muted)", marginBottom: 4 }}>
                        {item.type} · {item.category}
                      </div>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", lineHeight: 1.15 }}>
                        {item.title}
                      </h3>
                    </div>
                    <span
                      style={{
                        ...badgeStyles(item.availability),
                        borderRadius: 999,
                        padding: "7px 12px",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        alignSelf: "start",
                      }}
                    >
                      {item.availability}
                    </span>
                  </div>
                  <p style={{ marginBottom: 12, color: "var(--ink-soft)" }}>By {item.author}</p>
                  <dl style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }}>
                    <div>
                      <dt style={{ fontSize: "0.8rem", color: "var(--ink-muted)" }}>Location</dt>
                      <dd style={{ fontWeight: 600 }}>{item.location}</dd>
                    </div>
                    <div>
                      <dt style={{ fontSize: "0.8rem", color: "var(--ink-muted)" }}>Keywords</dt>
                      <dd>{item.keywords.join(", ")}</dd>
                    </div>
                  </dl>
                </article>
              ))
            )}
          </div>
        </div>

        <div style={{ display: "grid", gap: 24 }}>
          <section
            aria-labelledby="room-title"
            style={{
              background: "white",
              border: "1px solid var(--cream-dark)",
              borderRadius: 20,
              boxShadow: "var(--shadow-card)",
              padding: 24,
            }}
          >
            <h2 id="room-title" style={{ fontFamily: "var(--font-display)", marginBottom: 8 }}>Reserve a study room</h2>
            <p style={{ color: "var(--ink-muted)", marginBottom: 18 }}>Choose a room and send a quick request.</p>
            <div style={{ display: "grid", gap: 12, marginBottom: 18 }}>
              {STUDY_ROOMS.map((room) => (
                <label
                  key={room.id}
                  style={{
                    display: "block",
                    border: selectedRoom === room.id ? "2px solid var(--blue)" : "1px solid var(--cream-dark)",
                    background: selectedRoom === room.id ? "var(--blue-light)" : "#fffdfa",
                    borderRadius: 16,
                    padding: 14,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="study-room"
                    value={room.id}
                    checked={selectedRoom === room.id}
                    onChange={() => setSelectedRoom(room.id)}
                    style={{ marginRight: 10 }}
                  />
                  <strong>{room.name}</strong>
                  <div style={{ color: "var(--ink-muted)", fontSize: "0.92rem", marginTop: 6 }}>
                    Capacity {room.capacity} · {room.features.join(" · ")}
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <span
                      style={{
                        ...badgeStyles(room.availability),
                        borderRadius: 999,
                        padding: "6px 10px",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        display: "inline-block",
                      }}
                    >
                      {room.availability}
                    </span>
                  </div>
                </label>
              ))}
            </div>
            <form onSubmit={handleReserveRoom}>
              <label htmlFor="booking-name" style={{ display: "block", fontWeight: 600, marginBottom: 8 }}>
                Student name
              </label>
              <input
                id="booking-name"
                value={bookingName}
                onChange={(e) => setBookingName(e.target.value)}
                placeholder="Enter a name"
                style={{
                  width: "100%",
                  border: "1px solid #cfc3ae",
                  borderRadius: 12,
                  padding: "12px 14px",
                  fontSize: "1rem",
                  marginBottom: 12,
                  background: "#fffdfa",
                }}
              />
              <button
                type="submit"
                style={{
                  width: "100%",
                  border: "none",
                  background: "var(--ink)",
                  color: "white",
                  borderRadius: 12,
                  padding: "13px 16px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Request booking
              </button>
            </form>
            {bookingSuccess ? (
              <p
                role="status"
                style={{
                  marginTop: 14,
                  borderRadius: 12,
                  padding: 12,
                  background: "var(--green-light)",
                  color: "var(--green)",
                  fontWeight: 600,
                }}
              >
                {bookingSuccess}
              </p>
            ) : null}
          </section>

          <section
            aria-labelledby="services-title"
            style={{
              background: "white",
              border: "1px solid var(--cream-dark)",
              borderRadius: 20,
              boxShadow: "var(--shadow-card)",
              padding: 24,
            }}
          >
            <h2 id="services-title" style={{ fontFamily: "var(--font-display)", marginBottom: 10 }}>Library services</h2>
            <ul role="list" style={{ display: "grid", gap: 12 }}>
              {[
                "Borrow laptops and chargers from the services desk.",
                "Book a library induction session for first-year students.",
                "Use assistive technology stations on Floor 1.",
                "Ask for citation, referencing, and research support.",
              ].map((service) => (
                <li
                  key={service}
                  style={{
                    background: "#fffaf4",
                    border: "1px solid var(--cream-dark)",
                    borderRadius: 14,
                    padding: 14,
                  }}
                >
                  {service}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </div>
  );
}
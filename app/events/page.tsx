"use client";

import { useEffect, useState, useMemo } from "react";
import type { SocietyEvent, SocietyCategory } from "@/types";

export default function SocietyEventsPage() {
  const [events, setEvents] = useState<SocietyEvent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<SocietyCategory | "All">("All");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<SocietyEvent | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedEvent(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/society-events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Failed to load events", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            event.societyName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [events, searchQuery, selectedCategory]);

  const featuredEvents = filteredEvents.filter(e => e.featured);
  const regularEvents = filteredEvents.filter(e => !e.featured);

  return (
    <main className="page timetable-page" id="main-content">
      <header className="timetable-header">
        <h1>Society <em>Events</em></h1>
        <p>Discover what's happening around campus, curated by your student societies.</p>
      </header>

      <section aria-label="Event filtering" className="events-filters">
        <label htmlFor="search-events" className="sr-only">Search events</label>
        <input 
          id="search-events"
          type="search" 
          placeholder="Search by event or society name..." 
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <label htmlFor="category-filter" className="sr-only">Filter by category</label>
        <select 
          id="category-filter"
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as SocietyCategory | "All")}
        >
          <option value="All">All Categories</option>
          <option value="Academic">Academic</option>
          <option value="Arts & Culture">Arts & Culture</option>
          <option value="Hobbies">Hobbies</option>
          <option value="Sports">Sports</option>
          <option value="Tech">Tech</option>
        </select>
      </section>

      {isLoading ? (
        <div aria-live="polite" className="timetable-empty">Loading events...</div>
      ) : filteredEvents.length === 0 ? (
        <div role="status" className="timetable-empty">No events found matching your criteria.</div>
      ) : (
        <div className="events-layout">
          {featuredEvents.length > 0 && (
            <section aria-labelledby="featured-heading" style={{ marginBottom: '40px' }}>
              <h2 id="featured-heading" className="section-label">Featured Events</h2>
              <div className="events-grid">
                {featuredEvents.map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    onViewDetails={() => setSelectedEvent(event)}
                  />
                ))}
              </div>
            </section>
          )}

          {regularEvents.length > 0 && (
            <section aria-labelledby="upcoming-heading">
              <h2 id="upcoming-heading" className="section-label">Upcoming Events</h2>
              <div className="events-grid">
                {regularEvents.map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    onViewDetails={() => setSelectedEvent(event)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Modal Backdrop and Container */}
      {selectedEvent && (
        <div 
          className="modal-overlay" 
          onClick={() => setSelectedEvent(null)}
          role="presentation"
        >
          <div 
            className="modal-container" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="modal-header">
              <h2 id="modal-title">{selectedEvent.title}</h2>
              <button 
                className="modal-close-btn" 
                onClick={() => setSelectedEvent(null)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            
            <div className="modal-content">
              <p className="event-card__society" style={{ marginBottom: '24px', fontSize: '1.2rem' }}>
                Hosted by {selectedEvent.societyName}
              </p>
              
              <dl className="modal-meta">
                <div className="modal-meta-item">
                  <dt>When</dt>
                  <dd>
                    {new Date(`${selectedEvent.date}T${selectedEvent.time}`).toLocaleDateString("en-GB", {
                      day: "numeric", month: "long", year: "numeric"
                    })}
                    <br />
                    {new Date(`${selectedEvent.date}T${selectedEvent.time}`).toLocaleTimeString("en-US", {
                      hour: "numeric", minute: "2-digit", hour12: true
                    })}
                  </dd>
                </div>
                <div className="modal-meta-item">
                  <dt>Where</dt>
                  <dd>{selectedEvent.location}</dd>
                </div>
              </dl>

              <div className="modal-description">
                {selectedEvent.description}
              </div>

              {selectedEvent.tags && selectedEvent.tags.length > 0 && (
                <div className="event-card__tags">
                  {selectedEvent.tags.map(tag => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn--primary" style={{ width: 'auto' }} onClick={() => setSelectedEvent(null)}>
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function EventCard({ event, onViewDetails }: { event: SocietyEvent, onViewDetails: () => void }) {
  const [isSaved, setIsSaved] = useState(false);

  const dateObj = new Date(`${event.date}T${event.time}`);
  const formattedDate = dateObj.toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric"
  });
  const formattedTime = dateObj.toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", hour12: true
  });

  return (
    <article 
      className={`event-card ${event.featured ? "event-card--featured" : ""}`}
      tabIndex={0} 
      role="region"
      aria-label={`Details for ${event.title} hosted by ${event.societyName}`}
    >
      {event.featured && <span className="badge-featured" aria-label="Featured event">Featured</span>}
      <span className="event-card__category">{event.category}</span>
      <h3 className="event-card__title">{event.title}</h3>
      <p className="event-card__society">by {event.societyName}</p>
      
      <div className="event-card__meta">
        <span className="event-card__meta-item">
          <span aria-hidden="true" title="Date">📅</span> 
          <time dateTime={`${event.date}T${event.time}`}>{formattedDate}, {formattedTime}</time>
        </span>
        <span className="event-card__meta-item">
          <span aria-hidden="true" title="Location">📍</span> 
          {event.location}
        </span>
      </div>
      
      {event.tags && event.tags.length > 0 && (
        <div className="event-card__tags" aria-label="Event tags">
          {event.tags.map(tag => <span key={tag} className="tag-pill">{tag}</span>)}
        </div>
      )}
      
      <p className="event-card__desc">{event.description}</p>

      <div className="event-card__actions">
        <button 
          className="btn btn--primary"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails();
          }}
        >
          View Details
        </button>
        <button 
          className="btn btn--outline" 
          onClick={(e) => {
            e.stopPropagation();
            setIsSaved(!isSaved);
          }}
          aria-pressed={isSaved}
          aria-label={isSaved ? "Unsave event" : "Save event"}
        >
          <span aria-hidden="true" style={{marginRight: '6px'}}>{isSaved ? "❤️" : "🤍"}</span>
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </article>
  );
}
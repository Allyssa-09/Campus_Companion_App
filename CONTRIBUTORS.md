# Contributors

This document outlines the contributions of each team member to the Campus Companion App for **Nature of Enterprise Computing — CA3 (TU859, TU Dublin)**.

While GitHub's Contributors graph reflects the current state of the `main` branch, the full team contribution history can also be viewed in the **Activity tab** of this repository, which records every commit made by each member throughout the project.

---

## Team Members

### Allyssa Mae Felipe (`Allyssa-09`)
- **Campus Map page** (`app/map/page.tsx`) — interactive map with building details and accessibility info
- **Project Compiler & Integrator** — combined all team members' contributions into the unified Next.js project, resolved integration conflicts, and ensured the application runs end-to-end
- **Netlify Deployment & CI/CD** — set up automatic deployment from GitHub
- **Project documentation** — problem statement and target user personas (alongside Alia)
- Coordinated team communication and project structure

### Leah Comerford (`leahcomerford13`)
- **Original homepage design** — initial Bootstrap-based homepage layout (later rebuilt in Next.js while preserving Leah's hero + four-card structure and design intent)
- **Architecture Overview** (`docs/Architecture Overview.docx`) — client-server design, Next.js front-end, serverless functions, database, deployment strategy
- **Data Design** (in `README.md`) — entity-relationship modelling for users, timetables, events, locations, accessibility info
- **Usability and UI Decisions** (in `README.md`) — colour scheme rationale, navigation consistency, interactive feedback
- **Accessibility Plan** (in `README.md`) — WCAG considerations, screen reader support, visual contrast, alt text
- **Society Events HTML structure** — initial structure work
- README authorship and revisions

### Cezary (`itscezary13`)
- **Timetable page** (`app/timetable/page.tsx`) — week-view grid, day tabs, click-to-view detail panel, keyboard navigation, full accessibility (ARIA labels, screen-reader support)
- **Site-wide layout & navigation** (`app/layout.tsx`, `components/ui/SiteNav.tsx`, `components/ui/SkipLink.tsx`) — responsive navbar, footer, skip-link
- **Design system** (`app/globals.css`) — editorial cream/gold colour palette, Fraunces + DM Sans typography, custom CSS properties, responsive breakpoints, reduced-motion support
- **API routes** (`app/api/timetable/route.ts`, `app/api/announcements/route.ts`) and **Netlify functions**
- **Type definitions** (`types/index.ts`) — TimetableEntry, Announcement, QuickLink interfaces
- **Seed data** (`lib/db.ts`) — fictional timetable, announcements, and quick links

### Alia
- **Society Events page** (`app/events/page.tsx`) — search, category filtering, featured/regular event sections, modal detail view with save functionality, full ARIA accessibility
- **Project documentation** — problem statement and target user personas (alongside Allyssa)

### Jamiu
- **Library page** (`app/library/page.tsx`) — catalogue search and filtering by type, study room reservation form, opening hours display, accessibility-aware layout

---

## Shared Work
- **AI prompt transcript logs** (`docs/AI Conversation Logs.docx`, `docs/AI Logs/`) — recorded across the team as AI was used during the AI-assisted build phase (CA3 Component 2)
- **Design Ideas** (`docs/Design Ideas.docx`) — collaborative design brainstorming
- **Sample student dataset** (`docs/campus_companion_students.csv`) — fictional data used for ML feature planning

---

## Notes on Git History

Earlier in the project, individual contributors pushed their work as separate commits on `main` (visible in the repository's **Activity** and **Commits** tabs). When the project entered the integration phase, the compiled, working version of the application was force-pushed to `main` to provide a single, coherent codebase for deployment. The full original commit history of each member's work remains accessible via the Activity tab.
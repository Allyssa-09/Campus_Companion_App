# Campus Companion App

A Next.js web application that brings together a student's most-used campus tools — timetable, map, library, and society events — into one accessible, easy-to-navigate interface.

🌐 **Live demo:** [aesthetic-sunburst-e95212.netlify.app](https://aesthetic-sunburst-e95212.netlify.app)

---

## About the project

Campus Companion was built as a group project for **Nature of Enterprise Computing (TU859, TU Dublin) — CA3**. It demonstrates an AI-assisted build process, automated deployment, and accessibility-aware design.

The application addresses the digital fragmentation that students experience across multiple campus services. By centralising timetables, building maps, library resources, and society events in one place, it reduces the cognitive load of switching between disconnected systems.

## Features

- **Timetable** — Weekly grid view with day tabs, click-to-view lesson details, and full keyboard navigation
- **Campus Map** — Interactive map of campus buildings with accessibility information
- **Library** — Catalogue search and filtering, study room reservations, and opening hours
- **Society Events** — Browseable society events with category filters and saveable favourites
- **Homepage** — Single dashboard linking to all features

## Tech stack

- **Next.js 14** (App Router)
- **TypeScript**
- **CSS custom properties** with a custom design system
- **Netlify** for hosting with continuous deployment
- **GitHub** for source control

## Local development

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:3000`.

## Deployment

This project uses Netlify's free tier with continuous deployment. Every push to the `main` branch on GitHub triggers an automatic build and deploy. Build configuration is defined in `netlify.toml`.

## Project structure

```
.
├── app/                # Next.js pages and API routes
├── components/ui/      # Shared UI components (navigation, skip link)
├── lib/                # Seed data and database helpers
├── public/images/      # Static images
├── types/              # Shared TypeScript types
├── docs/               # Team design documents and AI logs
└── CONTRIBUTORS.md     # Team contribution credits
```

## Contributors

See [CONTRIBUTORS.md](./CONTRIBUTORS.md) for a breakdown of each team member's contributions.

## Documentation

Full design documentation (architecture, data design, UI decisions, and accessibility plan) is available in the [`docs/`](./docs) folder.

## Note

All data shown in the application is fictional and was generated for academic demonstration only. No real student information is collected or stored.
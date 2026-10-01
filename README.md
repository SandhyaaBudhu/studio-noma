# STUDIO NOMA

A complete, editorial architecture and interiors portfolio demo. Built with React, Vite, TypeScript, Tailwind CSS, React Router, and Lucide. No backend or environment variables required.

## Run locally

```sh
npm install
npm run dev
```

The development site is available at `http://localhost:5173`.

```sh
npm run build
npm run preview
```

## Routes

- `/` — editorial home, selected work, services accordion, design process, studio introduction, and interactive pavilion.
- `/projects` — six projects with category filtering and shareable filter URLs.
- `/projects/:id` — cinematic case studies, project facts, material palettes, image lightboxes, and next-project navigation.
- `/studio` — team, principles, capabilities, illustrative recognition, and timeline.
- `/contact` — accessible project inquiry with inline validation and local thank-you state.
- Unmatched routes and project IDs display a designed 404 page.

## The spatial study

An actual interactive orthographic pavilion rendered locally as SVG from three-dimensional geometry. Drag or use the keyboard-accessible rotation slider to orbit 360°. Change wall materials, reveal the roof, and adjust the display's daylight intensity. This is an original conceptual model, not a photographed tour or a lighting simulation.

## Demo boundaries

Studio identity, team names, project locations, project descriptions, dates, and press milestones are fictional. Stock photographs are illustrative, not documentation of this fictional studio's projects. Contact validation runs locally and does not send email or store personal information. The `.example` email address is illustrative. Theme preference is persisted in localStorage. Project filters are retained in the URL.

## Assets and structure

Photography is downloaded from Unsplash and stored in `public/images`. Every photo component falls back to the local architectural illustration in `public/fallback.svg`. Image download IDs are recorded in `scripts/download-images.mjs`. The gallery photo source is [Julia Taubitz on Unsplash](https://unsplash.com/photos/empty-modern-art-gallery-with-polished-concrete-floor-eDzZZ7bUlz8). Typography uses Google Fonts (Manrope and DM Sans) with local system fallbacks.

Page compositions live in `src/pages`, reusable components in `src/components`, and mock portfolio data in `src/data/projects.ts`. Color, spacing, type, theme, and responsive styling are in `src/styles.css`, which uses Tailwind's Vite integration and utility composition. Motion uses restrained CSS transitions and respects reduced-motion preferences.

## Browser checks

```sh
npx playwright install chromium
npm run test:e2e
```

Playwright checks desktop and mobile layouts, loaded images, horizontal overflow, filters, gallery keyboard controls and focus restoration, persistent theme, pavilion controls, inquiry validation, confirmation, and mobile navigation. Screenshots are generated in `artifacts/` and excluded from version control. No real data or external submissions are used.

For static hosting, configure an SPA rewrite to `index.html` so direct case-study URLs resolve correctly.

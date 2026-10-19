# Playpower Labs Airbnb Clone Assignment

An Airbnb-style listing page assignment implemented with React, Vite, TypeScript, and CSS. This repository continues an existing implementation; the app is not scaffolded from scratch here.

Reference listing: **Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 - Serviced apartments for Rent in Candolim, Goa, India**

## Features

- Listing header, five-photo hero gallery, host and guest-favorite details, highlights, description, sleeping arrangements, amenities, calendar, booking card, reviews, location, and host profile.
- Photo Tour grouped by photo category. Selecting a photo opens the Lightbox at its matching position.
- Lightbox previous/next buttons and Left/Right arrow navigation, with Escape closing the active Lightbox. When opened from Photo Tour, closing the Lightbox returns to the tour.
- Photo modals include labeled dialogs, focus trapping, focus restoration, and an announced live photo counter.
- Searchable amenities modal and Share and Contact Host dialogs.
- Production-scale system architecture notes in [ARCHITECTURE.md](./ARCHITECTURE.md) and submission-ready [architecture diagram PNG](./ARCHITECTURE.png).

## Run locally

Requirements: Node.js 20.19+ or 22.12+ for the installed Vite 8 toolchain.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

## Production build

```bash
npm run build
```

## Project guidance

- Agent guidance: [.agents/AGENTS.md](./.agents/AGENTS.md)
- Airbnb listing skill: [.agents/skills/airbnb-clone/SKILL.md](./.agents/skills/airbnb-clone/SKILL.md)
- Development prompt record: [PROMPTS.md](./PROMPTS.md)

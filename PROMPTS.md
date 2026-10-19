# Development Prompts

This file records the prompts and acceptance criteria guiding work on this submission. It distinguishes inherited project history from the current continuation; it does not claim that a particular automated browser test was run.

## Assignment brief

> Build an original Airbnb-style listing page based on the supplied reference. Include a listing page, Photo Tour and Lightbox, previous and next controls, Left/Right keyboard navigation, Escape to close, keyboard accessibility, a production architecture diagram, AI sub-agent/skill configuration, PROMPTS.md, and README. Do not copy reference source or publish the repository.

## Existing implementation handoff

> Continue the current Playpower Labs Airbnb Clone assignment. Do not rebuild. Inspect the current codebase first and run the app. Finish only missing work: visual QA against the reference, obvious UI/behavior fixes, Listing Page / Photo Tour / Lightbox verification, keyboard accessibility, build/runtime fixes, production architecture diagram, AI sub-agent/skill config files, PROMPTS.md, README, and final build.

## Continuation work recorded here

- Preserve the existing component architecture and data, and make targeted corrections only.
- Ensure Lightbox keyboard input takes precedence over the Photo Tour below it, focus remains within each photo dialog, and focus returns when a dialog closes.
- Align the README with the actual local app, Vite URL, current data, and included architecture and agent guidance.
- Run `npm run build` after the changes.

## Verification record

- `npm run build`: passed (TypeScript project build and Vite production bundle).
- Local app: served successfully at `http://127.0.0.1:3000/` and returned HTTP 200.
- Headless Chrome: verified listing heading, no closed dialogs overlaying the page, hero-to-Lightbox opening, 15 Photo Tour photos, Left/Right counter navigation, Escape close behavior, nested Lightbox returning to Photo Tour, focus trapping/restoration, and no app runtime exceptions.
- Asset checks: the local browser environment blocks external image requests (`ERR_NETWORK_ACCESS_DENIED`); public Unsplash listing photo URLs returned HTTP 200 in an outbound check.
- Visual comparison against the hosted reference could not be completed because the reference was inaccessible to the available browser/search tool.
- Architecture deliverables: `ARCHITECTURE.md` and the exported `ARCHITECTURE.png` are included.

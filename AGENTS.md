# Project guidance

This is a standalone Home Assistant Lovelace card project, separate from wall-clock-card and the EduPage integration.

## Scope

The first card is `edupage-timetable-card`, built with TypeScript, Lit, and Vite. Keep data access (`src/calendar-controller.ts`) separate from rendering (`src/index.ts`) and timetable calculations (`src/timetable.ts`) testable without Home Assistant.

## Data and privacy

Use Home Assistant authentication and integration entities/endpoints. Never embed EduPage credentials in card configuration. Use synthetic fixtures and never commit actual family data, attachments, tokens, or deployment configuration.

Do not infer that missing calendar results mean no school. Account for Home Assistant time zones, all-day events, gaps, and overlapping lessons. Confirm the integration's available date range before implementing week navigation.

## Validation

Run `npm run type-check`, `npm test`, and `npm run build`. `npm run dev` serves a synthetic browser demo. Test meaningful timetable edge cases and verify the card in Home Assistant before claiming it is ready to install.

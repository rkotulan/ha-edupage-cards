# Project guidance

This is a standalone Home Assistant Lovelace card project, separate from wall-clock-card and the EduPage integration.

## Scope

Start with `edupage-timetable-card`. TypeScript and Lit are the intended stack; build tooling has not yet been set up. Keep data access separate from rendering and keep timetable calculations testable without Home Assistant.

## Data and privacy

Use Home Assistant authentication and integration entities/endpoints. Never embed EduPage credentials in card configuration. Use synthetic fixtures and never commit actual family data, attachments, tokens, or deployment configuration.

Do not infer that missing calendar results mean no school. Account for Home Assistant time zones, all-day events, gaps, and overlapping lessons. Confirm the integration's available date range before implementing week navigation.

## Validation

After adding tooling, document the build, type-check, and test commands in README.md. Test meaningful timetable edge cases and verify the card in Home Assistant before claiming it is ready to install.

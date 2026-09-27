# Roadmap

## 1. Timetable data contract

Inspect the integration's calendar output and document available fields, time zone handling, all-day events, and the available date range. Identify any integration changes needed for period numbers, groups, cancellations, and substitutions.

## 2. First working card

Set up TypeScript, Lit, a reproducible browser build, and tests for timetable layout logic. Implement `edupage-timetable-card` with a configurable calendar entity, week navigation, lesson details, and responsive layouts.

Keep lesson placement based on actual times. Do not merge unrelated adjacent lessons merely because they have the same subject. Render unavailable data distinctly from a confirmed empty day.

## 3. Home Assistant validation

Verify both family accounts, multi-period lessons, gaps, holidays, overlapping lessons, light/dark themes, and phone layouts. Deploy for local testing before publishing an installable release.

## 4. Family overview

Add student selection and explore separate cards for grades, messages with attachments, and attendance. Message history and attachment access may require integration endpoints rather than larger sensor attributes.

Reading a message in a card must not implicitly send an EduPage receipt or confirmation.

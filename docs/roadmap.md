# Roadmap

## Available in 0.3.0

- Responsive timetable with actual lesson times, holidays, overlaps, subject colors and lesson details.
- Shared student selector and visual editors for all three cards.
- School messages with a desktop dialog/mobile bottom sheet, partial-history and stale-data notices.
- Grades in newest-first or subject-grouped views, preserving textual assessments and showing available details.
- Family dashboards composed from one section per child, with synthetic configuration examples.
- Local Home Assistant verification on desktop/mobile and tests for data parsing, missing data, time zones and request races.

## Future work

- Attendance overview based on data available from the integration.
- Message attachments after verifying authentication and the source data contract; deferred for now.
- Richer timetable metadata (period numbers, groups and substitutions) where the integration supports it.
- Grade weights and accurate averages only when the source provides the required data.
- More complete message history through integration endpoints rather than oversized sensor attributes.

Reading a message must not implicitly send an EduPage receipt or confirmation. Missing data must remain distinct from an empty timetable or inbox. Use synthetic fixtures and screenshots in the public repository.

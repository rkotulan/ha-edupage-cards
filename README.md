# EduPage Cards for Home Assistant

A planned collection of Home Assistant dashboard cards for a family overview of school life: timetables, grades, messages, and attendance.

## Status

Project setup. There is no installable card or release yet.

The first card will be `edupage-timetable-card`: a weekly timetable inspired by EduPage, adapted for Home Assistant dashboards and phones.

## First milestone: timetable

- Weekdays in rows, lesson periods and times across the top.
- Subject colors, teacher and classroom details.
- Multi-period lessons and full-width holidays or school events.
- Highlighting of today and the current lesson.
- Week and student selection.
- Lesson details on selection and a readable daily view on phones.

The initial data source will be the calendar entities provided by [EduPage for Home Assistant](https://github.com/rine77/homeassistantedupage). Exact lesson numbering, groups, substitution information, and availability of past/future weeks must be verified before implementation. Subject colors will initially be assigned by the card rather than assumed to match EduPage.

## Architecture direction

Standalone Lovelace custom cards using TypeScript and Lit, bundled as a browser module. Cards will use Home Assistant data and authentication; EduPage credentials belong in the integration, not in dashboard configuration.

Later milestones may add grade, message, and attendance cards. See [the roadmap](docs/roadmap.md).

## Development

The implementation and build setup are the next step. This repository currently contains project documentation only.

Use synthetic data for examples and tests. Do not commit school messages, student details, credentials, local deployment settings, or private attachments.

## License

MIT. This is an independent community project, not an official EduPage product.

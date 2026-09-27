# EduPage Cards for Home Assistant

School timetable cards for a family Home Assistant dashboard. The first card, `edupage-timetable-card`, shows the week on a wide screen and a selectable daily list on phones.

## Status

First release, tested in Home Assistant with two EduPage calendars. The repository supports installation through HACS as a custom repository. Inclusion in the default HACS catalog is requested separately.

## Features

- Weekdays in rows with a real-time horizontal axis; optional weekends.
- Stable subject colors, teacher and classroom details.
- Multi-period events keep their actual duration; adjacent events are not merged.
- Full-width holidays, cancelled lessons, and overlapping events in separate lanes.
- Student and week selection, current-lesson highlighting, and lesson details.
- Czech and English text, Home Assistant theme support, and a mobile daily view.
- Error/retry state and a notice for dates outside the configured data window.

## Requirements and limitations

Use the timetable calendar from [EduPage for Home Assistant](https://github.com/rine77/homeassistantedupage). The card reads HA's authenticated calendar API; it does not log in to EduPage.

The integration currently caches today and the following 13 days. The card defaults to this same window and does not interpret empty responses as confirmed days off. `available_days` changes the card's allowed window only; it does not make the integration fetch more data. Past dates are not supported by this initial version. On weekends, the card initially opens the following week.

The current calendar does not expose lesson numbers, school-defined colors, groups, or detailed substitution metadata. This version uses actual lesson times and card-assigned colors. `[Canceled]` events are shown as cancelled. All-day calendar dates and the integration's 00:00–23:59 holidays are supported. Named events require the integration to provide their title.

Configuration is YAML-only for now. Calendar data refreshes on entity changes, every five minutes, or via the refresh button. The refresh button rereads HA's cache; it does not force a new EduPage poll.

## Install with HACS

1. In HACS, open the menu and choose **Custom repositories**.
2. Add `https://github.com/rkotulan/ha-edupage-cards` with type **Dashboard**.
3. Find **EduPage Cards**, download it, and reload your browser.
4. If the resource was not added automatically, add `/hacsfiles/ha-edupage-cards/edupage-cards.js` as a JavaScript module in dashboard resources.
5. Add a manual card using the configuration below.

Do not load both a manually installed copy and the HACS resource.

## Build and install manually

Requires Node.js 22.12+ and npm.

```sh
npm ci
npm run type-check
npm test
npm run build
```

Copy `dist/edupage-cards.js` to `/config/www/edupage-cards/edupage-cards.js` on Home Assistant. In dashboard resources, add `/local/edupage-cards/edupage-cards.js?v=0.1.0` as a JavaScript module. Reload the browser after installation; change the query version when replacing the file.

Add a manual card:

```yaml
type: custom:edupage-timetable-card
title: Školní rozvrh
language: cs
students:
  - entity: calendar.edupage_student_one
    name: Student 1
  - entity: calendar.edupage_student_two
    name: Student 2
```

For a single calendar, use `entity: calendar.edupage_student` instead of `students`. For the weekly layout, use a panel view or a full-width section card; below 680 px card width, the daily layout is used.

| Option | Default | Meaning |
| --- | --- | --- |
| `entity` | — | One timetable calendar; required unless `students` is supplied |
| `students` | — | List of `{ entity, name? }`; takes precedence over `entity` |
| `title` | Localized “Timetable” | Card heading |
| `language` | HA language | `cs` or `en`; other HA languages fall back to English |
| `show_weekend` | `false` | Include Saturday and Sunday |
| `available_days` | `14` | Available days starting today, matching the integration's cache |
| `subject_labels` | `{}` | Map full subject names to shorter labels; detail retains the full title |
| `subject_colors` | `{}` | Map full subject names to quoted `#RGB` or `#RRGGBB` background colors |

For example, add this to the card configuration:

```yaml
subject_colors:
  Matematika: "#90caf9"
  Český jazyk: "#a5d6a7"
  Anglický jazyk: "#ffe082"
```

Names match the original full subject title (with surrounding whitespace ignored), not `subject_labels`. The mapping applies to all configured students. Subjects without an override keep their automatic colors. Text switches between black and white for contrast; cancelled lessons retain their neutral appearance. Quote hex colors in YAML, otherwise `#` starts a comment. Color configuration is YAML-only in this version.

## Development

```sh
npm run dev
```

Open the local URL printed by Vite for a synthetic demo with light/dark theme and outage controls. It needs no HA credentials. Tests cover time zones and DST, date-only holidays, multi-day clipping, overlaps, invalid input, request races, and unavailable calendars.

Use synthetic fixtures only. Never commit actual school messages, student details, credentials, local deployment settings, or private attachments. See [the roadmap](docs/roadmap.md) for planned grade, message, and attendance cards.

## License

MIT. This is an independent community project, not an official EduPage product.

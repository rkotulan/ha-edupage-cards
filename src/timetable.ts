import type { CalendarEvent, Lesson, Student, TimetableConfig } from './types';

export function dateKey(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(date);
  return ['year', 'month', 'day'].map(k => parts.find(p => p.type === k)!.value).join('-');
}

export function addDays(day: string, offset: number): string {
  const date = new Date(`${day}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + offset);
  return date.toISOString().slice(0, 10);
}

export function monday(day: string): string {
  const dow = new Date(`${day}T12:00:00Z`).getUTCDay();
  return addDays(day, -((dow + 6) % 7));
}

export function initialWeek(today: string): string {
  const dow = new Date(`${today}T12:00:00Z`).getUTCDay();
  return addDays(monday(today), dow === 0 || dow === 6 ? 7 : 0);
}

export function minutes(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(date);
  return Number(parts.find(p => p.type === 'hour')!.value) * 60 + Number(parts.find(p => p.type === 'minute')!.value);
}

export function clock(value: number): string {
  return `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`;
}

export function students(config: TimetableConfig): Student[] {
  const result = config.students ?? (config.entity ? [{ entity: config.entity }] : []);
  if (!Array.isArray(result) || !result.length || result.some(s => !s || typeof s.entity !== 'string' || !s.entity.startsWith('calendar.'))) {
    throw new Error('Configure entity: calendar.… or students: [{ entity: calendar.…, name: … }]');
  }
  if (config.available_days !== undefined && (!Number.isInteger(config.available_days) || config.available_days < 1 || config.available_days > 366)) {
    throw new Error('available_days must be an integer between 1 and 366');
  }
  return result;
}

// Query a UTC envelope around local dates. Filter locally: the integration can
// return the entire last day even when the API end is midnight. This also avoids
// assuming that the browser and Home Assistant share a time zone.
export function queryRange(week: string): string {
  return `start=${encodeURIComponent(addDays(week, -1) + 'T00:00:00Z')}&end=${encodeURIComponent(addDays(week, 8) + 'T00:00:00Z')}`;
}

export function normalize(events: CalendarEvent[], week: string, timeZone: string): Lesson[] {
  const output: Lesson[] = [];
  const days = Array.from({ length: 7 }, (_, i) => addDays(week, i));
  events.forEach((event, index) => {
    const isDate = Boolean(event.start?.date);
    const from = new Date(event.start?.dateTime ?? `${event.start?.date}T00:00:00Z`);
    const to = new Date(event.end?.dateTime ?? `${event.end?.date}T00:00:00Z`);
    if (!Number.isFinite(+from) || !Number.isFinite(+to) || to <= from) return;
    const startDay = isDate ? event.start.date! : dateKey(from, timeZone);
    const endDay = isDate ? event.end.date! : dateKey(to, timeZone);
    const startMinute = isDate ? 0 : minutes(from, timeZone);
    const endMinute = isDate ? 0 : minutes(to, timeZone);
    for (const day of days) {
      if (day < startDay || day > endDay || (day === endDay && endMinute === 0)) continue;
      const start = day === startDay ? startMinute : 0;
      const end = day === endDay ? endMinute : 1440;
      if (end <= start) continue;
      const description = event.description ?? '';
      const teacher = description.match(/^Teacher\(s\):\s*(.*)$/m)?.[1] ?? '';
      output.push({
        id: `${event.uid ?? index}-${day}`, day,
        title: (event.summary ?? '').replace(/^\[Canceled\]\s*/, '') || '—',
        description, teacher: teacher === 'Unknown Teacher' ? '' : teacher,
        location: event.location ?? '', start, end,
        allDay: isDate || (start === 0 && end >= 1439),
        cancelled: (event.summary ?? '').startsWith('[Canceled] '), lane: 0,
      });
    }
  });
  return output.sort((a, b) => a.day.localeCompare(b.day) || a.start - b.start || a.end - b.end);
}

export function layout(lessons: Lesson[]): { lessons: Lesson[]; lanes: number } {
  const ends: number[] = [];
  const placed = [...lessons].sort((a, b) => a.start - b.start || a.end - b.end).map(lesson => {
    let lane = ends.findIndex(end => end <= lesson.start);
    if (lane === -1) lane = ends.length;
    ends[lane] = lesson.end;
    return { ...lesson, lane };
  });
  return { lessons: placed, lanes: Math.max(1, ends.length) };
}

export function hue(subject: string): number {
  let hash = 0;
  for (const char of subject) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  return ((hash % 360) + 360) % 360;
}

export function axis(lessons: Lesson[]): { start: number; end: number } {
  const timed = lessons.filter(l => !l.allDay);
  return {
    start: Math.floor(Math.min(8 * 60, ...timed.map(l => l.start)) / 60) * 60,
    end: Math.ceil(Math.max(15 * 60, ...timed.map(l => l.end)) / 60) * 60,
  };
}

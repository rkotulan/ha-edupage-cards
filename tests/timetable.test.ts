import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addDays, dateKey, initialWeek, layout, normalize, students } from '../src/timetable.ts';
import type { CalendarEvent } from '../src/types.ts';

const event = (start: string, end: string, summary = 'Math'): CalendarEvent => ({
  start: { dateTime: start }, end: { dateTime: end }, summary,
});

test('week arithmetic crosses month/year and selects next week on weekends', () => {
  assert.equal(initialWeek('2026-09-27'), '2026-09-28');
  assert.equal(initialWeek('2026-09-30'), '2026-09-28');
  assert.equal(addDays('2026-12-28', 7), '2027-01-04');
});

test('uses HA timezone rather than browser/UTC date', () => {
  assert.equal(dateKey(new Date('2026-09-27T23:30:00Z'), 'Europe/Prague'), '2026-09-28');
  const lessons = normalize([event('2026-09-28T06:00:00Z', '2026-09-28T06:45:00Z')], '2026-09-28', 'Europe/Prague');
  assert.equal(lessons[0].start, 480);
  assert.equal(lessons[0].end, 525);
});

test('DST transition uses the actual timezone offset on each date', () => {
  const lessons = normalize([
    event('2026-10-24T06:00:00Z', '2026-10-24T06:45:00Z'),
    event('2026-10-25T07:00:00Z', '2026-10-25T07:45:00Z'),
  ], '2026-10-19', 'Europe/Prague');
  assert.deepEqual(lessons.map(l => l.start), [480, 480]);
});

test('all-day end dates are exclusive and 00:00–23:59 holidays span the row', () => {
  const lessons = normalize([
    { start: { date: '2026-09-28' }, end: { date: '2026-09-30' }, summary: 'Holiday' },
    event('2026-10-01T00:00:00+02:00', '2026-10-01T23:59:00+02:00', 'School event'),
  ], '2026-09-28', 'Europe/Prague');
  assert.deepEqual(lessons.map(l => [l.day, l.allDay]), [['2026-09-28', true], ['2026-09-29', true], ['2026-10-01', true]]);
});

test('clips over-returned events and splits overnight entries at local midnight', () => {
  const lessons = normalize([
    event('2026-09-27T23:00:00+02:00', '2026-09-28T01:00:00+02:00'),
    event('2026-10-05T08:00:00+02:00', '2026-10-05T09:00:00+02:00'),
  ], '2026-09-28', 'Europe/Prague');
  assert.equal(lessons.length, 1);
  assert.equal(lessons[0].start, 0);
  assert.equal(lessons[0].end, 60);
});

test('overlaps use separate lanes; touching lessons stay separate in the same lane', () => {
  const lessons = normalize([
    event('2026-09-28T08:00:00Z', '2026-09-28T09:30:00Z'),
    event('2026-09-28T08:30:00Z', '2026-09-28T09:00:00Z'),
    event('2026-09-28T09:30:00Z', '2026-09-28T10:15:00Z'),
  ], '2026-09-28', 'UTC');
  const result = layout(lessons);
  assert.equal(result.lanes, 2);
  assert.deepEqual(result.lessons.map(l => l.lane), [0, 1, 0]);
  assert.equal(result.lessons.length, 3);
  assert.equal(result.lessons[0].end - result.lessons[0].start, 90);
});

test('cancellations, teachers and rooms are preserved without rendering HTML', () => {
  const lessons = normalize([{
    ...event('2026-09-28T08:00:00Z', '2026-09-28T08:45:00Z', '[Canceled] <b>Math</b>'),
    description: 'Teacher(s): Example Teacher\nRoom: 101', location: '101',
  }], '2026-09-28', 'UTC');
  assert.equal(lessons[0].cancelled, true);
  assert.equal(lessons[0].teacher, 'Example Teacher');
  assert.equal(lessons[0].title, '<b>Math</b>');
  assert.equal(lessons[0].location, '101');
});

test('invalid and zero-duration events are ignored', () => {
  assert.deepEqual(normalize([
    event('invalid', 'invalid'), event('2026-09-28T08:00Z', '2026-09-28T08:00Z'),
  ], '2026-09-28', 'UTC'), []);
});

test('validates calendar configuration and explicit availability window', () => {
  assert.throws(() => students({ type: 'x', entity: 'sensor.test' }));
  assert.throws(() => students({ type: 'x', entity: 'calendar.test', available_days: 0 }));
  assert.equal(students({ type: 'x', entity: 'calendar.test' })[0].entity, 'calendar.test');
});

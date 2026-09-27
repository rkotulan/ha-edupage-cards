import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CalendarController } from '../src/calendar-controller.ts';
import type { ReactiveControllerHost } from 'lit';
import type { HomeAssistant, CalendarEvent } from '../src/types.ts';

function setup() {
  const pending: { resolve: (value: CalendarEvent[]) => void; reject: (error: Error) => void }[] = [];
  const host = { addController() {}, requestUpdate() {} } as unknown as ReactiveControllerHost;
  const controller = new CalendarController(host);
  const hass = {
    config: { time_zone: 'UTC' },
    states: { 'calendar.a': { state: 'off', last_updated: '1' }, 'calendar.b': { state: 'off', last_updated: '1' } },
    callApi: () => new Promise((resolve, reject) => pending.push({ resolve, reject })),
  } as unknown as HomeAssistant;
  controller.hostConnected();
  return { controller, hass, pending };
}
const flush = () => new Promise(resolve => setImmediate(resolve));

test('late responses from a previous student cannot overwrite the selected student', async () => {
  const { controller, hass, pending } = setup();
  try {
    controller.update(hass, 'calendar.a', '2026-09-28');
    controller.update(hass, 'calendar.b', '2026-09-28');
    pending[1].resolve([{ summary: 'Student B' } as CalendarEvent]);
    await flush();
    pending[0].resolve([{ summary: 'Student A' } as CalendarEvent]);
    await flush();
    assert.equal(controller.events[0].summary, 'Student B');
  } finally { controller.hostDisconnected(); }
});

test('failures and unavailable entities are not presented as successful empty calendars', async () => {
  const { controller, hass, pending } = setup();
  try {
    controller.update(hass, 'calendar.a', '2026-09-28');
    pending[0].reject(new Error('Offline'));
    await flush();
    assert.equal(controller.error, true);
    assert.equal(controller.updated, undefined);
    controller.update(hass, 'calendar.missing', '2026-09-28');
    await flush();
    assert.equal(controller.error, true);
    assert.equal(pending.length, 1);
  } finally { controller.hostDisconnected(); }
});

test('disconnect ignores in-flight responses and reconnect fetches again', async () => {
  const { controller, hass, pending } = setup();
  controller.update(hass, 'calendar.a', '2026-09-28');
  controller.hostDisconnected();
  pending[0].resolve([{ summary: 'Stale' } as CalendarEvent]);
  await flush();
  assert.equal(controller.events.length, 0);
  controller.hostConnected();
  try {
    controller.update(hass, 'calendar.a', '2026-09-28');
    assert.equal(pending.length, 2);
    pending[1].resolve([]);
    await flush();
    assert.equal(controller.error, false);
    assert.ok(controller.updated);
  } finally { controller.hostDisconnected(); }
});

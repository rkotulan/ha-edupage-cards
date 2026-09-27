import type { ReactiveController, ReactiveControllerHost } from 'lit';
import type { CalendarEvent, HomeAssistant } from './types';
import { queryRange } from './timetable';

export class CalendarController implements ReactiveController {
  events: CalendarEvent[] = [];
  loading = false;
  error = false;
  updated?: Date;
  private request = 0;
  private key = '';
  private active = false;
  private interval?: ReturnType<typeof setInterval>;
  private current?: { hass: HomeAssistant; entity: string; week: string };

  constructor(private host: ReactiveControllerHost) { host.addController(this); }

  hostConnected(): void {
    this.active = true;
    this.key = '';
    this.interval = setInterval(() => { void this.refresh(); }, 300_000);
    this.host.requestUpdate();
  }

  hostDisconnected(): void {
    this.active = false;
    this.request++;
    clearInterval(this.interval);
  }

  update(hass: HomeAssistant, entity: string, week: string): void {
    this.current = { hass, entity, week };
    const state = hass.states[entity];
    const key = `${entity}/${week}/${state?.last_updated}/${hass.config.time_zone}`;
    if (key !== this.key && this.active) {
      this.key = key;
      void this.refresh();
    }
  }

  async refresh(): Promise<void> {
    if (!this.active || !this.current) return;
    const id = ++this.request;
    const { hass, entity, week } = this.current;
    this.events = [];
    this.updated = undefined;
    this.loading = true;
    this.error = false;
    this.host.requestUpdate();
    try {
      const state = hass.states[entity];
      if (!state || ['unavailable', 'unknown'].includes(state.state)) throw new Error('Unavailable');
      const events = await hass.callApi<CalendarEvent[]>('GET', `calendars/${encodeURIComponent(entity)}?${queryRange(week)}`);
      if (!Array.isArray(events)) throw new Error('Invalid calendar response');
      if (id !== this.request || !this.active) return;
      this.events = events;
      this.updated = new Date();
    } catch {
      if (id !== this.request || !this.active) return;
      this.error = true;
    } finally {
      if (id === this.request && this.active) {
        this.loading = false;
        this.host.requestUpdate();
      }
    }
  }
}

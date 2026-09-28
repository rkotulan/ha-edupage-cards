import type { HomeAssistant } from './types';

export interface OverviewConfig {
  type: string;
  name: string;
  notifications: string;
  open_homework: string;
  overdue_homework: string;
  upcoming_exams: string;
  next_deadline: string;
  duties_path?: string;
  accent?: 'blue' | 'green' | 'violet';
  language?: 'cs' | 'en';
}
export function localPath(value?: string): string | undefined {
  return value && /^\/(?!\/)[^\\\s]*$/.test(value) ? value : undefined;
}
export function overviewData(config: OverviewConfig, states: HomeAssistant['states']) {
  const counts = [config.open_homework, config.overdue_homework, config.upcoming_exams].map(id => {
    const raw = states[id]?.state;
    return raw !== undefined && /^\d+$/.test(raw) ? Number(raw) : null;
  });
  const source = states[config.notifications];
  const events = source?.attributes.events;
  const attendance = Array.isArray(events) ? events.filter((e): e is Record<string, unknown> =>
    !!e && typeof e === 'object' && e.type === 'pipnutie' && typeof e.text === 'string' && typeof e.timestamp === 'string')
    .sort((a,b) => String(b.timestamp).localeCompare(String(a.timestamp)))[0] : undefined;
  const deadline = states[config.next_deadline];
  const due = /^\d{4}-\d{2}-\d{2}$/.test(deadline?.state ?? '') ? deadline.state : '';
  const text = (v: unknown) => typeof v === 'string' ? v : '';
  return {
    counts, empty: counts.every(n => n === 0),
    stale: [config.open_homework,config.overdue_homework,config.upcoming_exams,config.next_deadline].some(id => states[id]?.attributes.data_stale === true),
    attendance: text(attendance?.text),
    attendanceUnavailable: !source || ['unknown','unavailable'].includes(source.state) || !Array.isArray(events),
    attendanceStale: source?.attributes.data_stale === true,
    due, subject: text(deadline?.attributes.subject), task: text(deadline?.attributes.text),
  };
}

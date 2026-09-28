import type { Student } from './types';

export interface MessagesConfig {
  type: string;
  entity?: string;
  students?: Student[];
  title?: string;
  show_student?: boolean;
  compact?: boolean;
  more_path?: string;
  language?: 'cs' | 'en';
  max_messages?: number;
}
export interface SchoolMessage { key: string; text: string; author: string; timestamp: string }
export interface MessageData { messages: SchoolMessage[]; unavailable: boolean; unsupported: boolean; stale: boolean; truncated: boolean }

export function messageStudents(config: MessagesConfig): Student[] {
  const result = config.students ?? (config.entity ? [{ entity: config.entity }] : []);
  if (!Array.isArray(result) || !result.length || result.some(s => !s || typeof s.entity !== 'string' || !s.entity.startsWith('sensor.'))) throw new Error('Configure a notification sensor in entity or students.');
  if (config.max_messages !== undefined && (!Number.isInteger(config.max_messages) || config.max_messages < 1 || config.max_messages > 100)) throw new Error('max_messages must be between 1 and 100.');
  return result;
}

// The connector serializes school-local timestamps without an offset. Keep
// their wall-clock values instead of interpreting them in the browser timezone.
export function messageDate(value: string, language: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::\d{2})?$/.exec(value);
  if (!match) return value;
  const [,year,month,day,hour,minute] = match;
  return language.startsWith('cs') ? `${Number(day)}. ${Number(month)}. ${year} · ${hour}:${minute}` : `${day}/${month}/${year} · ${hour}:${minute}`;
}

export function messageData(state?: { state: string; attributes: Record<string, unknown> }): MessageData {
  const unavailable = !state || ['unavailable','unknown'].includes(state.state);
  const attrs = state?.attributes ?? {};
  const events = attrs.events;
  const messages: SchoolMessage[] = [];
  if (Array.isArray(events)) events.forEach((event: unknown, i) => {
    if (!event || typeof event !== 'object') return;
    const row = event as Record<string, unknown>;
    if (row.type !== 'sprava') return;
    messages.push({ key: `${String(row.id ?? i)}-${i}`, text: typeof row.text === 'string' ? row.text : '', author: typeof row.author === 'string' ? row.author : '', timestamp: typeof row.timestamp === 'string' ? row.timestamp : '' });
  });
  messages.sort((a,b) => b.timestamp.localeCompare(a.timestamp));
  return { messages, unavailable, unsupported: !unavailable && !Array.isArray(events), stale: attrs.data_stale === true, truncated: attrs.events_truncated === true };
}

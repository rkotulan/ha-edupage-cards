export interface CalendarEvent {
  start: { date?: string; dateTime?: string };
  end: { date?: string; dateTime?: string };
  summary: string;
  description?: string;
  location?: string;
  uid?: string;
}

export interface HomeAssistant {
  language: string;
  config: { time_zone: string };
  states: Record<string, { state: string; last_updated: string; attributes: Record<string, unknown> }>;
  callApi<T>(method: string, path: string): Promise<T>;
}

export interface Student { entity: string; name?: string }
export interface TimetableConfig {
  type: string;
  entity?: string;
  students?: Student[];
  title?: string;
  show_title?: boolean;
  language?: 'cs' | 'en';
  show_weekend?: boolean;
  available_days?: number;
  subject_labels?: Record<string, string>;
  subject_colors?: Record<string, string>;
}

export interface Lesson {
  id: string;
  day: string;
  title: string;
  description: string;
  teacher: string;
  location: string;
  start: number;
  end: number;
  allDay: boolean;
  cancelled: boolean;
  lane: number;
}

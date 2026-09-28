import type { HomeAssistant, Student } from './types';

export interface GradeStudent { name: string; subjects: Student[] }
export interface GradesConfig {
  type: string;
  students: GradeStudent[];
  title?: string;
  show_student?: boolean;
  compact?: boolean;
  more_path?: string;
  language?: 'cs' | 'en';
  default_view?: 'latest' | 'subjects';
}
export interface Grade {
  key: string; subject: string; value: string; title: string; date: string;
  teacher: string; comment: string; percent: string; maxPoints: string; classAverage: string;
}
const text = (value: unknown): string => typeof value === 'string' || typeof value === 'number' ? String(value) : '';
export function validateGrades(config: GradesConfig) {
  if (!Array.isArray(config.students) || !config.students.length || config.students.some(s =>
    !s || typeof s.name !== 'string' || !s.name.trim() || !Array.isArray(s.subjects) || !s.subjects.length ||
    s.subjects.some(p => !p || typeof p.entity !== 'string' || !p.entity.startsWith('sensor.'))))
    throw new Error('Configure students with a name and subject sensors.');
  if (config.default_view && !['latest', 'subjects'].includes(config.default_view)) throw new Error('Invalid default_view.');
}
export function subjectName(entity: string, state?: HomeAssistant['states'][string]): string {
  const name = text(state?.attributes.friendly_name);
  return name.replace(/^EduPage\s*-\s*.*?\[[^\]]+\]\s*/, '').trim() || entity;
}
export function gradeData(student: GradeStudent, states: HomeAssistant['states']) {
  const grades: Grade[] = [];
  const unavailable: string[] = [], unsupported: string[] = [];
  let stale = false;
  for (const subject of student.subjects) {
    const state = states[subject.entity];
    const name = subject.name || subjectName(subject.entity, state);
    if (!state || ['unknown', 'unavailable'].includes(state.state)) { unavailable.push(name); continue; }
    const a = state.attributes;
    stale ||= a.data_stale === true;
    const keys = Object.keys(a).filter(k => /^grade_\d+_grade_n$/.test(k));
    if (!keys.length && a.info !== 'no grades yet') unsupported.push(name);
    for (const key of keys) {
      const prefix = key.replace(/grade_n$/, '');
      const get = (suffix: string) => text(a[prefix + suffix]);
      grades.push({ key: subject.entity + ':' + prefix, subject: name, value: get('grade_n'), title: get('title'),
        date: get('date'), teacher: get('teacher') === 'unknown' ? '' : get('teacher'), comment: get('comment'),
        percent: get('percent'), maxPoints: get('max_points'), classAverage: get('class_avg_grade') });
    }
  }
  grades.sort((a,b) => b.date.localeCompare(a.date) || a.key.localeCompare(b.key));
  return { grades, unavailable, unsupported, stale };
}
/** Explicit discovery for the editor; configured cards never mix students by name. */
export function discoverGradeStudents(states: HomeAssistant['states']): GradeStudent[] {
  const people = new Map<string, GradeStudent>();
  for (const [entity,state] of Object.entries(states)) {
    if (!entity.startsWith('sensor.edupage') || !Object.keys(state.attributes).some(k => /^grade_\d+_grade_n$/.test(k))) continue;
    const person = state.attributes.student;
    if (!person || typeof person !== 'object') continue;
    const name = text((person as Record<string,unknown>).name);
    if (!name) continue;
    // Discovery groups names for convenience; the saved configuration lists exact entities.
    if (!people.has(name)) people.set(name, { name, subjects: [] });
    people.get(name)!.subjects.push({ entity, name: subjectName(entity,state) });
  }
  return [...people.values()];
}

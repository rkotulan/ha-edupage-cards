import { LitElement, html, nothing } from 'lit';
import type { PropertyValues } from 'lit';
import { CalendarController } from './calendar-controller';
import { addDays, axis, clock, dateKey, initialWeek, layout, minutes, normalize, students } from './timetable';
import type { HomeAssistant, Lesson, TimetableConfig } from './types';
import { styles } from './styles';
import { lessonColors, validateColors } from './colors';
import './editor';

export class EdupageTimetableCard extends LitElement {
  static styles = styles;
  static properties = {
    hass: { attribute: false }, config: { state: true }, week: { state: true },
    studentIndex: { state: true }, selectedDay: { state: true }, detail: { state: true }, now: { state: true },
  };
  declare hass?: HomeAssistant;
  private declare config?: TimetableConfig;
  private week = '';
  private studentIndex = 0;
  private selectedDay = 0;
  private detail?: Lesson;
  private now = new Date();
  private timer?: ReturnType<typeof setInterval>;
  private calendar = new CalendarController(this);
  private detailPointerOutside = false;

  private async openDetail(lesson: Lesson): Promise<void> {
    this.detail = lesson;
    await this.updateComplete;
    if (!this.isConnected || this.detail !== lesson) return;
    const dialog = this.renderRoot.querySelector<HTMLDialogElement>('.detail');
    if (dialog && !dialog.open) dialog.showModal();
  }

  private closeDetail(): void {
    this.renderRoot.querySelector<HTMLDialogElement>('.detail')?.close();
    this.detail = undefined;
    this.detailPointerOutside = false;
  }

  private outsideDetail(event: MouseEvent): boolean {
    const dialog = event.currentTarget as HTMLDialogElement;
    const rect = dialog.getBoundingClientRect();
    return event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom);
  }
  private dismissStudentPicker = (event: Event): void => {
    const picker = this.renderRoot.querySelector<HTMLDetailsElement>('.student-picker');
    if (picker && !event.composedPath().includes(picker)) picker.open = false;
  };

  private closeStudentPicker(focus = false): void {
    const picker = this.renderRoot.querySelector<HTMLDetailsElement>('.student-picker');
    if (picker) {
      picker.open = false;
      if (focus) picker.querySelector('summary')?.focus();
    }
  }

  private studentKeys(event: KeyboardEvent): void {
    const picker = event.currentTarget as HTMLDetailsElement;
    if (event.key === 'Escape') {
      event.preventDefault(); event.stopPropagation(); this.closeStudentPicker(true);
    } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      picker.open = true;
      const items = [...picker.querySelectorAll<HTMLButtonElement>('.student-option')];
      const index = items.indexOf(this.shadowRoot?.activeElement as HTMLButtonElement);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1
        : index < 0 ? (event.key === 'ArrowUp' ? items.length - 1 : 0)
        : (index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items[next]?.focus();
    }
  }

  setConfig(config: TimetableConfig): void {
    students(config);
    validateColors(config.subject_colors);
    this.config = { ...config };
    this.studentIndex = 0;
    this.week = '';
    this.detail = undefined;
  }

  getCardSize(): number { return 8; }
  static getConfigElement(): HTMLElement { return document.createElement('edupage-timetable-editor'); }
  getGridOptions(): object { return { columns: 'full', rows: 'auto', min_columns: 6 }; }

  static getStubConfig(hass: HomeAssistant): TimetableConfig {
    const entity = Object.keys(hass.states).find(id => /^calendar\.edupage_/.test(id) && !/canteen|assignments/.test(id));
    return { type: 'custom:edupage-timetable-card', entity: entity ?? 'calendar.edupage_student' };
  }

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('pointerdown', this.dismissStudentPicker);
    this.now = new Date();
    this.timer = setInterval(() => { this.now = new Date(); }, 30_000);
  }

  disconnectedCallback(): void {
    this.closeDetail();
    super.disconnectedCallback(); clearInterval(this.timer);
    document.removeEventListener('pointerdown', this.dismissStudentPicker);
    this.closeStudentPicker();
  }

  protected willUpdate(_changed: PropertyValues): void {
    if (!this.hass || !this.config) return;
    const today = dateKey(this.now, this.hass.config.time_zone);
    if (!this.week) {
      this.week = initialWeek(today);
      const offset = Array.from({ length: 7 }, (_, i) => addDays(this.week, i)).indexOf(today);
      this.selectedDay = Math.max(0, Math.min(this.config.show_weekend ? 6 : 4, offset));
    }
    this.calendar.update(this.hass, students(this.config)[this.studentIndex].entity, this.week);
  }

  private get cs(): boolean { return (this.config?.language ?? this.hass?.language ?? 'en').startsWith('cs'); }
  private t(cs: string, en: string): string { return this.cs ? cs : en; }
  private format(day: string, weekday = false): string {
    return new Intl.DateTimeFormat(this.cs ? 'cs-CZ' : 'en-GB', {
      timeZone: 'UTC', ...(weekday ? { weekday: 'short' as const } : { day: 'numeric' as const, month: 'numeric' as const }),
    }).format(new Date(`${day}T12:00:00Z`));
  }

  private move(offset: number): void {
    this.week = addDays(this.week, offset * 7);
    this.selectedDay = 0;
    this.detail = undefined;
  }

  private lesson(lesson: Lesson, start: number, end: number, today: string) {
    const current = lesson.day === today && !lesson.cancelled && !lesson.allDay &&
      minutes(this.now, this.hass!.config.time_zone) >= lesson.start && minutes(this.now, this.hass!.config.time_zone) < lesson.end;
    const label = this.config?.subject_labels?.[lesson.title] ?? lesson.title;
    const colors = lessonColors(lesson.title, this.config?.subject_colors);
    return html`<button class="lesson ${lesson.allDay ? 'all-day' : ''} ${lesson.cancelled ? 'cancelled' : ''} ${current ? 'current' : ''}"
      style=${`--lesson-bg:${colors.background};--lesson-text:${colors.text};--lesson-border:${colors.border};--lesson-accent:${colors.accent};--lane:${lesson.lane};--left:${(lesson.start - start) / (end - start) * 100}%;--width:calc(${(lesson.end - lesson.start) / (end - start) * 100}% - 3px)`}
      aria-label=${`${lesson.title}, ${this.format(lesson.day)}, ${lesson.allDay ? this.t('Celý den', 'All day') : clock(lesson.start) + '–' + clock(lesson.end)}${lesson.cancelled ? ', ' + this.t('Zrušeno', 'Cancelled') : ''}`}
      title=${lesson.title} @click=${() => void this.openDetail(lesson)}>
      <span class="meta"><span>${lesson.allDay ? this.t('Celý den', 'All day') : `${clock(lesson.start)}–${clock(lesson.end)}`}</span><span>${lesson.location}</span></span>
      <strong>${label}</strong><span class="teacher">${lesson.cancelled ? this.t('Zrušeno', 'Cancelled') : lesson.teacher}</span>
    </button>`;
  }

  protected render() {
    if (!this.config || !this.hass || !this.week) return nothing;
    const today = dateKey(this.now, this.hass.config.time_zone);
    const lastDay = addDays(today, (this.config.available_days ?? 14) - 1);
    const people = students(this.config);
    const studentName = (index: number) => String(people[index].name ?? this.hass!.states[people[index].entity]?.attributes.friendly_name ?? people[index].entity);
    const count = this.config.show_weekend ? 7 : 5;
    const days = Array.from({ length: count }, (_, i) => addDays(this.week, i));
    const available = (day: string) => day >= today && day <= lastDay;
    const lessons = normalize(this.calendar.events, this.week, this.hass.config.time_zone).filter(l => available(l.day));
    const { start, end } = axis(lessons);
    const ticks = Array.from({ length: (end - start) / 60 + 1 }, (_, i) => start + i * 60);
    const empty = (day: string) => available(day)
      ? this.t('Kalendář nevrátil žádné události.', 'The calendar returned no events.')
      : this.t('Mimo dostupný rozsah konektoru.', 'Outside the integration’s available range.');
    const dayLessons = (day: string) => lessons.filter(l => l.day === day);
    return html`<ha-card>
      ${this.config.show_title ? html`<h2 class="card-title">${this.config.title ?? this.t('Rozvrh', 'Timetable')}</h2>` : nothing}
      <div class="toolbar">
        <div class="navigation"><button class="tool arrow" aria-label=${this.t('Předchozí týden', 'Previous week')} ?disabled=${addDays(this.week, count - 8) < today} @click=${() => this.move(-1)}>‹</button>
          <button class="tool" @click=${() => { this.week = ''; this.detail = undefined; }}>${this.t('Dnes', 'Today')}</button>
          <button class="tool arrow" aria-label=${this.t('Další týden', 'Next week')} ?disabled=${addDays(this.week, 7) > lastDay} @click=${() => this.move(1)}>›</button></div>
        <div class="period-controls"><span class="range">${this.format(this.week)} – ${this.format(addDays(this.week, count - 1))} <span class="muted">${this.week.slice(0, 4)}</span></span>
        <button class="tool refresh" aria-label=${this.t('Obnovit rozvrh', 'Refresh timetable')} @click=${() => { this.detail = undefined; void this.calendar.refresh(); }}>↻</button>
        </div>
      ${this.config.show_student !== false ? html`<div class="student-row">
        ${people.length > 1 ? html`<details class="student-picker" @keydown=${this.studentKeys}
          @focusout=${(e: FocusEvent) => { if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node | null)) this.closeStudentPicker(); }}>
          <summary aria-label=${`${this.t('Vybrat dítě', 'Choose student')}: ${studentName(this.studentIndex)}`}>
            <span class="student-avatar" aria-hidden="true">${studentName(this.studentIndex).trim().slice(0, 1).toLocaleUpperCase()}</span>
            <span class="student-name">${studentName(this.studentIndex)}</span>
            <svg class="student-chevron" aria-hidden="true" viewBox="0 0 24 24"><path d="m7 10 5 5 5-5" /></svg>
          </summary>
          <div class="student-options" role="group" aria-label=${this.t('Dítě', 'Student')}>
            <span class="student-caption">${this.t('Zobrazit rozvrh', 'Show timetable')}</span>
            ${people.map((_s, i) => html`<button class="student-option" aria-pressed=${i === this.studentIndex}
              @click=${() => { this.studentIndex = i; this.detail = undefined; this.closeStudentPicker(true); }}>
              <span class="student-avatar" aria-hidden="true">${studentName(i).trim().slice(0, 1).toLocaleUpperCase()}</span>
              <span class="student-name">${studentName(i)}</span><span class="student-check" aria-hidden="true">${i === this.studentIndex ? '✓' : ''}</span>
            </button>`)}
          </div>
        </details>`
          : html`<div class="student-static">
              <span class="student-avatar" aria-hidden="true">${studentName(this.studentIndex).trim().slice(0, 1).toLocaleUpperCase()}</span>
              <span class="student-name">${studentName(this.studentIndex)}</span>
            </div>`}
      </div>` : nothing}
      </div>
      ${this.calendar.loading ? html`<div class="message" role="status">${this.t('Načítám rozvrh…', 'Loading timetable…')}</div>`
        : this.calendar.error ? html`<div class="message" role="alert">${this.t('Rozvrh se nepodařilo načíst. Zkontrolujte dostupnost kalendáře v HA.', 'Could not load the timetable. Check that the calendar is available in HA.')}<br><button class="tool" @click=${() => void this.calendar.refresh()}>${this.t('Zkusit znovu', 'Try again')}</button></div>`
        : html`<div class="desktop"><div class="grid">
          <div class="axis">${ticks.map(tick => html`<span class="tick" style=${`left:${(tick - start) / (end - start) * 100}%`}>${clock(tick)}</span>`)}</div>
          ${days.map(day => { const list = dayLessons(day); const placed = layout(list.filter(l => !l.allDay)); return html`
            <div class="row ${day === today ? 'today' : ''} ${available(day) ? '' : 'outside'}">
              <div class="day-label"><strong>${this.format(day, true)}</strong><span>${this.format(day)}</span></div>
              <div class="day-content">${list.filter(l => l.allDay).map(l => this.lesson(l, start, end, today))}
                ${placed.lessons.length ? html`<div class="track" style=${`height:calc(${placed.lanes} * var(--lane-height) + 8px);--hour-width:${60 / (end - start) * 100}%`}>${placed.lessons.map(l => this.lesson(l, start, end, today))}</div>`
                  : list.length ? nothing : html`<div class="empty">${empty(day)}</div>`}</div>
            </div>`; })}
        </div></div>
        <div class="mobile"><div class="days">${days.map((day, i) => html`<button aria-pressed=${i === this.selectedDay} @click=${() => { this.selectedDay = i; this.detail = undefined; }}>${this.format(day, true)}<span>${this.format(day)}</span></button>`)}</div>
          ${dayLessons(days[this.selectedDay]).length ? dayLessons(days[this.selectedDay]).map(l => this.lesson(l, start, end, today)) : html`<div class="empty">${empty(days[this.selectedDay])}</div>`}
        </div>`}
      ${this.detail ? html`<dialog class="detail" aria-labelledby="lesson-detail-title"
        style=${`--detail-accent:${lessonColors(this.detail.title, this.config.subject_colors).background}`}
        @cancel=${(e: Event) => { e.preventDefault(); e.stopPropagation(); this.closeDetail(); }}
        @close=${() => { this.detail = undefined; }}
        @pointerdown=${(e: PointerEvent) => { this.detailPointerOutside = this.outsideDetail(e); }}
        @click=${(e: MouseEvent) => { if (this.detailPointerOutside && this.outsideDetail(e)) this.closeDetail(); }}>
        <div class="detail-head"><div><div class="eyebrow">${this.t('DETAIL HODINY', 'LESSON DETAILS')}</div><h3 id="lesson-detail-title">${this.detail.title}</h3></div><button class="tool detail-close" autofocus aria-label=${this.t('Zavřít detail', 'Close details')} @click=${this.closeDetail}>×</button></div>
        <p>${this.format(this.detail.day, true)} ${this.format(this.detail.day)} · ${this.detail.allDay ? this.t('Celý den', 'All day') : `${clock(this.detail.start)}–${clock(this.detail.end)}`}</p>
        ${this.detail.cancelled ? html`<p>${this.t('Zrušená hodina', 'Cancelled lesson')}</p>` : nothing}
        ${this.detail.teacher ? html`<p>${this.t('Vyučující', 'Teacher')}: ${this.detail.teacher}</p>` : nothing}
        ${this.detail.location ? html`<p>${this.t('Učebna', 'Room')}: ${this.detail.location}</p>` : nothing}
        ${this.detail.description && !this.detail.description.startsWith('Teacher(s):') ? html`<p>${this.detail.description}</p>` : nothing}
      </dialog>` : nothing}
      <footer>${this.t('Dostupný rozsah', 'Available range')}: ${this.format(today)} – ${this.format(lastDay)}. ${this.t('Prázdný den nemusí znamenat volno.', 'An empty day does not necessarily mean no school.')}
        ${this.calendar.updated ? html`<br>${this.t('Načteno', 'Loaded')} ${new Intl.DateTimeFormat(this.cs ? 'cs' : 'en', { timeZone: this.hass.config.time_zone, hour: '2-digit', minute: '2-digit' }).format(this.calendar.updated)}` : nothing}</footer>
    </ha-card>`;
  }
}

if (!customElements.get('edupage-timetable-card')) customElements.define('edupage-timetable-card', EdupageTimetableCard);
const registry = window as Window & { customCards?: object[] };
registry.customCards ??= [];
registry.customCards.push({ type: 'edupage-timetable-card', name: 'EduPage Timetable', description: 'A weekly school timetable with a mobile daily view.', preview: true });

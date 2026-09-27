import { LitElement, css, html, nothing } from 'lit';

/** Shared controlled selector; each card owns its selection and data. */
export class EdupageStudentPicker extends LitElement {
  static properties = { names: { attribute: false }, selected: { type: Number }, language: {}, caption: {} };
  names: string[] = [];
  selected = 0;
  language = 'en';
  caption = '';
  static styles = css`
    :host { display:block; min-width:0; max-width:100%; color:inherit; }
    * { box-sizing:border-box; }
    button { font:inherit; color:inherit; cursor:pointer; }
    button:focus-visible, summary:focus-visible { outline:2px solid var(--primary-color,#007b83); outline-offset:3px; }
  .student-picker { position: relative; max-width: 100%; font-size: 14px; }
  .student-picker summary, .student-static { display: flex; align-items: center; gap: 10px; min-height: 46px; padding: 6px 12px 6px 8px; border: 1px solid var(--divider-color, #d9e1e6); border-radius: 14px; background: var(--secondary-background-color, #f6f8fa); }
  .student-picker summary { list-style: none; cursor: pointer; }
  .student-static { max-width: 100%; min-width: 0; font-size: 14px; }
  .student-picker summary::-webkit-details-marker { display: none; }
  .student-picker summary:hover, .student-picker[open] summary { border-color: color-mix(in srgb, var(--primary-color, #007b83) 55%, var(--divider-color, #d9e1e6)); }
  .student-avatar { display: grid; place-items: center; flex: 0 0 30px; width: 30px; height: 30px; border-radius: 10px; background: color-mix(in srgb, var(--primary-color, #007b83) 14%, transparent); color: var(--primary-color, #007b83); font-weight: 700; font-size: 13px; }
  .student-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: left; }
  summary .student-name, .student-static .student-name { max-width: 180px; font-weight: 600; }
  .student-chevron { width: 18px; height: 18px; flex: 0 0 18px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; opacity: .65; }
  .student-picker[open] .student-chevron { transform: rotate(180deg); }
  .student-options { position: absolute; top: calc(100% + 8px); right: 0; z-index: 20; width: max(100%, 220px); max-width: calc(100vw - 40px); max-height: 300px; overflow-y: auto; padding: 7px; border: 1px solid var(--divider-color, #d9e1e6); border-radius: 16px; background: var(--ha-card-background, var(--card-background-color, #fff)); box-shadow: 0 12px 32px #0003; }
  .student-caption { display: block; padding: 7px 9px 10px; font-size: 11px; color: var(--secondary-text-color, #687987); }
  .student-option { display: flex; align-items: center; gap: 10px; width: 100%; min-height: 46px; padding: 8px; margin: 2px 0; border: 0; border-radius: 10px; background: transparent; }
  .student-option:hover { background: var(--secondary-background-color, #f6f8fa); }
  .student-option[aria-pressed=true] { background: color-mix(in srgb, var(--primary-color, #007b83) 12%, transparent); font-weight: 600; }
  .student-check { margin-left: auto; min-width: 18px; color: var(--primary-color, #007b83); }

  `;
  private get picker() { return this.renderRoot.querySelector<HTMLDetailsElement>('details'); }
  private close(focus = false) {
    const picker = this.picker;
    if (picker) { picker.open = false; if (focus) picker.querySelector('summary')?.focus(); }
  }
  private dismiss = (event: Event) => { if (!event.composedPath().includes(this)) this.close(); };
  connectedCallback() { super.connectedCallback(); document.addEventListener('pointerdown', this.dismiss); }
  disconnectedCallback() { this.close(); document.removeEventListener('pointerdown', this.dismiss); super.disconnectedCallback(); }
  private keys(event: KeyboardEvent) {
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); this.close(true); }
    else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      this.picker!.open = true;
      const items = [...this.renderRoot.querySelectorAll<HTMLButtonElement>('.student-option')];
      const index = items.indexOf(this.shadowRoot?.activeElement as HTMLButtonElement);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1
        : index < 0 ? (event.key === 'ArrowUp' ? items.length - 1 : 0)
        : (index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items[next]?.focus();
    }
  }
  private choose(index: number) {
    this.close(true);
    this.dispatchEvent(new CustomEvent('student-changed', { detail: { index }, bubbles: true, composed: true }));
  }
  protected render() {
    if (!this.names.length) return nothing;
    const cs = this.language.startsWith('cs');
    const avatar = (i: number) => html`<span class="student-avatar" aria-hidden="true">${this.names[i].trim().slice(0,1).toLocaleUpperCase()}</span><span class="student-name">${this.names[i]}</span>`;
    if (this.names.length === 1) return html`<div class="student-static">${avatar(0)}</div>`;
    return html`<details class="student-picker" @keydown=${this.keys}
      @focusout=${(e: FocusEvent) => { if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node | null)) this.close(); }}>
      <summary aria-label=${(cs ? 'Vybrat dítě: ' : 'Choose student: ') + this.names[this.selected]}>
        ${avatar(this.selected)}<svg class="student-chevron" aria-hidden="true" viewBox="0 0 24 24"><path d="m7 10 5 5 5-5" /></svg>
      </summary>
      <div class="student-options" role="group" aria-label=${cs ? 'Žák' : 'Student'}>
        ${this.caption ? html`<span class="student-caption">${this.caption}</span>` : nothing}
        ${this.names.map((_, i) => html`<button class="student-option" aria-pressed=${i === this.selected} @click=${() => this.choose(i)}>
          ${avatar(i)}<span class="student-check" aria-hidden="true">${i === this.selected ? '✓' : ''}</span>
        </button>`)}
      </div>
    </details>`;
  }
}
if (!customElements.get('edupage-student-picker')) customElements.define('edupage-student-picker', EdupageStudentPicker);

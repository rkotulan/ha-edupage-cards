import { LitElement, html, css, nothing } from 'lit';
import type { HomeAssistant, Student, TimetableConfig } from './types';

export class EdupageTimetableEditor extends LitElement {
  static properties = { hass: { attribute: false }, config: { state: true }, colorName: { state: true }, colorValue: { state: true } };
  declare hass?: HomeAssistant;
  private config?: TimetableConfig;
  private colorName = '';
  private colorValue = '#90caf9';
  static styles = css`
    :host { display:block; color:var(--primary-text-color); }
    * { box-sizing:border-box; }
    fieldset { border:1px solid var(--divider-color,#ccc); border-radius:12px; margin:0 0 18px; padding:16px; min-width:0; }
    legend { font-weight:600; padding:0 6px; }
    label { display:flex; flex-direction:column; gap:6px; font-size:14px; margin-bottom:12px; min-width:0; }
    input,select,button { font:inherit; color:inherit; }
    input:not([type=checkbox]),select { width:100%; min-width:0; min-height:40px; padding:8px; border:1px solid var(--divider-color,#aaa); border-radius:8px; background:var(--card-background-color,#fff); }
    input[type=color] { width:60px; padding:4px; }
    button { padding:8px 12px; min-height:40px; border:1px solid var(--divider-color,#aaa); border-radius:8px; background:var(--secondary-background-color,#eee); cursor:pointer; }
    button:disabled { opacity:.4; cursor:default; }
    input:focus-visible,select:focus-visible,button:focus-visible { outline:2px solid var(--primary-color); outline-offset:2px; }
    .toggle { flex-direction:row; align-items:center; gap:10px; }
    .toggle input { width:18px; height:18px; }
    .student { border-bottom:1px solid var(--divider-color,#ccc); margin-bottom:12px; padding-bottom:12px; }
    .actions,.color { display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-bottom:10px; }
    .color span { flex:1; overflow-wrap:anywhere; min-width:80px; }
    p { font-size:13px; color:var(--secondary-text-color); line-height:1.5; }
    .new-color { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:10px; align-items:end; }
  `;
  setConfig(config: TimetableConfig): void { this.config = { ...config }; }
  private t(cs: string, en: string) { return (this.config?.language ?? this.hass?.language ?? 'en').startsWith('cs') ? cs : en; }
  private updateConfig(patch: Partial<TimetableConfig>): void {
    const next = { ...this.config!, ...patch };
    for (const key of Object.keys(next)) if (next[key as keyof TimetableConfig] === undefined) delete next[key as keyof TimetableConfig];
    this.config = next;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: next }, bubbles: true, composed: true }));
  }
  private get people(): Student[] { return this.config?.students ?? (this.config?.entity ? [{ entity: this.config.entity }] : []); }
  private savePeople(people: Student[]): void { this.updateConfig({ students: people, entity: undefined }); }
  private editStudent(index: number, patch: Partial<Student>): void { this.savePeople(this.people.map((s, i) => i === index ? { ...s, ...patch } : s)); }
  private moveStudent(index: number, direction: number): void { const list = [...this.people]; [list[index], list[index + direction]] = [list[index + direction], list[index]]; this.savePeople(list); }
  private color(name: string, value?: string): void {
    const colors = { ...this.config?.subject_colors };
    if (value === undefined) delete colors[name]; else Object.defineProperty(colors, name, { value, enumerable: true, configurable: true, writable: true });
    this.updateConfig({ subject_colors: Object.keys(colors).length ? colors : undefined });
  }
  private hex(value: string): string { return value.length === 4 ? '#' + value.slice(1).split('').map(c => c+c).join('') : value; }
  protected render() {
    if (!this.config || !this.hass) return nothing;
    const calendars = Object.keys(this.hass.states).filter(id => id.startsWith('calendar.')).sort();
    const people = this.people;
    const unused = calendars.find(id => !people.some(s => s.entity === id));
    const checkbox = (key: 'show_title'|'show_student'|'show_weekend'|'compact', label: string, fallback = false) => html`<label class="toggle"><input type="checkbox" .checked=${this.config![key] ?? fallback} @change=${(e: Event) => this.updateConfig({ [key]: (e.target as HTMLInputElement).checked })}>${label}</label>`;
    return html`
      <fieldset><legend>${this.t('Žáci a kalendáře','Students and calendars')}</legend>
        <p>${this.t('První žák se zobrazí po otevření karty. Jméno můžete ponechat prázdné a použít název kalendáře.','The first student is selected when the card opens. Leave the name blank to use the calendar name.')}</p>
        ${people.map((s,i) => html`<div class="student">
          <label>${this.t('Kalendář','Calendar')} ${i+1}<select .value=${s.entity} @change=${(e: Event) => this.editStudent(i,{entity:(e.target as HTMLSelectElement).value})}>
            ${!calendars.includes(s.entity) ? html`<option value=${s.entity}>${s.entity} (${this.t('nedostupný','unavailable')})</option>` : nothing}
            ${calendars.map(id=>html`<option value=${id} ?selected=${id===s.entity}>${this.hass!.states[id].attributes.friendly_name ?? id} · ${id}</option>`)}
          </select></label>
          <label>${this.t('Jméno žáka','Student name')} ${i+1}<input .value=${s.name ?? ''} @input=${(e: Event) => this.editStudent(i,{name:(e.target as HTMLInputElement).value || undefined})}></label>
          <div class="actions"><button ?disabled=${i===0} aria-label=${this.t('Posunout žáka nahoru','Move student up')} @click=${()=>this.moveStudent(i,-1)}>↑</button><button ?disabled=${i===people.length-1} aria-label=${this.t('Posunout žáka dolů','Move student down')} @click=${()=>this.moveStudent(i,1)}>↓</button><button ?disabled=${people.length<=1} @click=${()=>this.savePeople(people.filter((_,j)=>j!==i))}>${this.t('Odebrat žáka','Remove student')}</button></div>
        </div>`)}
        <button ?disabled=${!unused} @click=${()=>{if(unused)this.savePeople([...people,{entity:unused}]);}}>${this.t('Přidat žáka','Add student')}</button>
        ${!calendars.length ? html`<p>${this.t('V HA nejsou dostupné žádné kalendáře.','No calendars are available in HA.')}</p>` : nothing}
      </fieldset>
      <fieldset><legend>${this.t('Zobrazení','Display')}</legend>
        ${checkbox('show_student',this.t('Zobrazit jméno a výběr žáka','Show student name and picker'),true)}
        ${this.config.show_student===false ? html`<p>${this.t('Zobrazuje se první žák ze seznamu.','The first student in the list is displayed.')}</p>` : nothing}
        ${checkbox('compact',this.t('Kompaktní přehled','Compact overview'))}
        ${checkbox('show_title',this.t('Zobrazit nadpis','Show title'))}
        ${this.config.show_title ? html`<label>${this.t('Nadpis','Title')}<input .value=${this.config.title ?? ''} @input=${(e: Event)=>this.updateConfig({title:(e.target as HTMLInputElement).value || undefined})}></label>` : nothing}
        ${checkbox('show_weekend',this.t('Zobrazit víkendy','Show weekends'))}
        <label>${this.t('Jazyk','Language')}<select .value=${this.config.language ?? ''} @change=${(e: Event)=>this.updateConfig({language:((e.target as HTMLSelectElement).value || undefined) as TimetableConfig['language']})}>
          <option value="" ?selected=${!this.config.language}>${this.t('Podle Home Assistantu','Use Home Assistant language')}</option><option value="cs" ?selected=${this.config.language==='cs'}>Čeština</option><option value="en" ?selected=${this.config.language==='en'}>English</option>
        </select></label>
      </fieldset>
      <fieldset><legend>${this.t('Barvy předmětů','Subject colors')}</legend>
        <p>${this.t('Barvy se vybírají automaticky. Vlastní barvu přiřaďte přesnému celému názvu předmětu.','Colors are automatic. Assign an override using the exact full subject name.')}</p>
        ${Object.entries(this.config.subject_colors ?? {}).map(([name,value])=>html`<div class="color"><span>${name}</span><input type="color" aria-label=${this.t('Barva: ','Color: ')+name} .value=${this.hex(value)} @input=${(e: Event)=>this.color(name,(e.target as HTMLInputElement).value)}><button aria-label=${this.t('Obnovit automatickou barvu: ','Restore automatic color: ')+name} @click=${()=>this.color(name)}>${this.t('Automaticky','Automatic')}</button></div>`)}
        <div class="new-color"><label>${this.t('Název předmětu','Subject name')}<input .value=${this.colorName} @input=${(e: Event)=>{this.colorName=(e.target as HTMLInputElement).value;}}></label><label>${this.t('Barva','Color')}<input type="color" .value=${this.colorValue} @input=${(e: Event)=>{this.colorValue=(e.target as HTMLInputElement).value;}}></label></div>
        <button ?disabled=${!this.colorName.trim()} @click=${()=>{this.color(this.colorName.trim(),this.colorValue);this.colorName='';}}>${this.t('Nastavit barvu','Set color')}</button>
      </fieldset>
      <details><summary>${this.t('Pokročilé','Advanced')}</summary><p>${this.t('Dostupný rozsah nezvětšuje historii načítanou konektorem.','The available range does not extend the history fetched by the integration.')}</p><label>${this.t('Počet dostupných dnů','Available days')}<input type="number" min="1" max="366" .value=${String(this.config.available_days ?? 14)} @change=${(e: Event)=>{const input=e.target as HTMLInputElement; const value=Number(input.value);if(input.value && Number.isInteger(value) && value>=1 && value<=366)this.updateConfig({available_days:value});else input.value=String(this.config!.available_days ?? 14);}}></label></details>
    `;
  }
}
if (!customElements.get('edupage-timetable-editor')) customElements.define('edupage-timetable-editor',EdupageTimetableEditor);

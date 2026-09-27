import { LitElement, html, css, nothing } from 'lit';
import type { HomeAssistant } from './types';
import { gradeData, validateGrades, discoverGradeStudents } from './grades';
import type { Grade, GradesConfig } from './grades';
import { messageDate } from './messages';
import { styles } from './styles';
import './student-picker';
import './grades-editor';

export class EdupageGradesCard extends LitElement {
  static properties = { hass:{attribute:false}, config:{state:true}, studentIndex:{state:true}, view:{state:true}, detail:{state:true} };
  declare hass?: HomeAssistant;
  private config?: GradesConfig;
  private studentIndex = 0;
  private view = 'latest';
  private detail?: Grade;
  private pointerOutside = false;
  static styles = [styles, css`
    .head { display:flex; align-items:center; justify-content:space-between; gap:14px; padding:20px; flex-wrap:wrap; }
    .head h2 { font-size:20px; }
    .head edupage-student-picker { margin-left:auto; }
    .views { display:flex; gap:8px; padding:0 20px 16px; }
    .views button[aria-pressed=true] { background:var(--primary-color,#007b83); color:var(--text-primary-color,#fff); }
    .list { padding:0 16px 16px; }
    .grade { display:flex; width:100%; align-items:center; gap:14px; text-align:left; padding:14px; margin-bottom:8px; border:1px solid var(--divider-color,#d9e1e6); border-radius:12px; background:transparent; }
    .grade:hover { background:var(--secondary-background-color,#f1f5f7); }
    .value { flex:0 0 auto; min-width:44px; max-width:35%; padding:10px; border-radius:10px; font-size:20px; font-weight:700; text-align:center; overflow-wrap:anywhere; background:color-mix(in srgb,var(--primary-color,#007b83) 12%,transparent); color:var(--primary-color,#007b83); }
    .info { min-width:0; flex:1; }
    .info strong,.info span { display:block; overflow-wrap:anywhere; }
    .info strong { font-size:14px; }
    .info .title { margin:4px 0; font-size:13px; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; }
    .date { font-size:11px; color:var(--secondary-text-color,#687987); }
    .subject { margin:16px 0 10px; font-size:15px; overflow-wrap:anywhere; }
    .notice { margin:0 16px 12px; padding:12px; border-radius:10px; background:var(--secondary-background-color,#f1f5f7); font-size:13px; overflow-wrap:anywhere; }
    .detail { --detail-accent:var(--primary-color,#007b83); }
    .detail .value { display:inline-block; margin-bottom:8px; }
  `];
  setConfig(config: GradesConfig) { validateGrades(config); this.close(); this.config={...config}; this.studentIndex=0; this.view=config.default_view ?? 'latest'; }
  static getConfigElement() { return document.createElement('edupage-grades-editor'); }
  static getStubConfig(hass: HomeAssistant) { return {type:'custom:edupage-grades-card',students:discoverGradeStudents(hass.states)}; }
  getCardSize() { return 6; }
  getGridOptions() { return {columns:12,rows:'auto',min_columns:6}; }
  private t(cs:string,en:string) { return (this.config?.language ?? this.hass?.language ?? 'en').startsWith('cs') ? cs : en; }
  private date(value:string) { return messageDate(value,this.config?.language ?? this.hass?.language ?? 'en') || this.t('Datum neuvedeno','Date unavailable'); }
  private async open(grade:Grade) { this.detail=grade; await this.updateComplete; if(this.isConnected && this.detail===grade) { const d=this.renderRoot.querySelector<HTMLDialogElement>('dialog'); if(d&&!d.open)d.showModal(); } }
  private close() { this.renderRoot?.querySelector<HTMLDialogElement>('dialog')?.close(); this.detail=undefined; this.pointerOutside=false; }
  disconnectedCallback() { this.close(); super.disconnectedCallback(); }
  private outside(e:MouseEvent) { const d=e.currentTarget as HTMLElement,r=d.getBoundingClientRect(); return e.target===d&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom); }
  private row(g:Grade) { return html`<button class="grade" @click=${()=>void this.open(g)}><span class="value">${g.value || '—'}</span><span class="info"><strong>${g.subject}</strong><span class="title">${g.title || this.t('Hodnocení','Assessment')}</span><span class="date">${this.date(g.date)}</span></span><span aria-hidden="true">›</span></button>`; }
  protected render() {
    if(!this.config||!this.hass)return nothing;
    const people=this.config.students,person=people[this.studentIndex],data=gradeData(person,this.hass.states);
    const groups=[...new Set(data.grades.map(g=>g.subject))].sort((a,b)=>a.localeCompare(b,this.config!.language ?? this.hass!.language));
    const g=this.detail;
    return html`<ha-card><div class="head"><h2>${this.config.title ?? this.t('Známky','Grades')}</h2>
      ${this.config.show_student===false ? nothing : html`<edupage-student-picker .names=${people.map(p=>p.name)} .selected=${this.studentIndex} .language=${this.config.language ?? this.hass.language} @student-changed=${(e:CustomEvent<{index:number}>)=>{this.close();this.studentIndex=e.detail.index;}}></edupage-student-picker>`}</div>
      <div class="views" role="group" aria-label=${this.t('Zobrazení známek','Grade view')}><button class="tool" aria-pressed=${this.view==='latest'} @click=${()=>this.view='latest'}>${this.t('Nejnovější','Latest')}</button><button class="tool" aria-pressed=${this.view==='subjects'} @click=${()=>this.view='subjects'}>${this.t('Podle předmětů','By subject')}</button></div>
      ${data.unavailable.length ? html`<div class="notice" role="alert">${this.t('Nedostupné senzory','Unavailable sensors')}: ${data.unavailable.join(', ')}</div>` : nothing}
      ${data.unsupported.length ? html`<div class="notice" role="alert">${this.t('Senzory neposkytují známky','Sensors do not provide grades')}: ${data.unsupported.join(', ')}</div>` : nothing}
      ${data.stale ? html`<div class="notice" role="status">${this.t('Údaje mohou být zastaralé.','Data may be stale.')}</div>` : nothing}
      <div class="list">${data.grades.length ? this.view==='latest' ? data.grades.map(g=>this.row(g)) : groups.map(subject=>html`<h3 class="subject">${subject}</h3>${data.grades.filter(g=>g.subject===subject).map(g=>this.row(g))}`) : html`<div class="empty">${this.t('V dostupných datech nejsou žádné známky.','No grades in the available data.')}</div>`}</div>
      ${g ? html`<dialog class="detail" aria-labelledby="grade-title" @cancel=${(e:Event)=>{e.preventDefault();e.stopPropagation();this.close();}} @close=${()=>this.detail=undefined} @pointerdown=${(e:PointerEvent)=>this.pointerOutside=this.outside(e)} @click=${(e:MouseEvent)=>{if(this.pointerOutside&&this.outside(e))this.close();}}>
        <div class="detail-head"><div><div class="eyebrow">${person.name} · ${g.subject}</div><h3 id="grade-title">${g.title || this.t('Hodnocení','Assessment')}</h3></div><button class="tool detail-close" autofocus aria-label=${this.t('Zavřít detail','Close details')} @click=${this.close}>×</button></div>
        <span class="value">${g.value || '—'}</span><p>${this.date(g.date)}</p>
        ${g.teacher ? html`<p>${this.t('Vyučující','Teacher')}: ${g.teacher}</p>` : nothing}
        ${g.comment ? html`<p>${g.comment}</p>` : nothing}
        ${g.percent!=='' ? html`<p>${this.t('Procenta','Percentage')}: ${g.percent}%</p>` : nothing}
        ${g.maxPoints!=='' ? html`<p>${this.t('Maximum bodů','Maximum points')}: ${g.maxPoints}</p>` : nothing}
        ${g.classAverage!=='' ? html`<p>${this.t('Průměr třídy','Class average')}: ${g.classAverage}</p>` : nothing}
      </dialog>` : nothing}
      <footer>${this.t('Zobrazeno','Showing')} ${data.grades.length} ${this.t('hodnocení z vybraných senzorů. Váhy známek nejsou dostupné; průměr žáka nepočítáme.','assessments from selected sensors. Weights are unavailable; no student average is calculated.')}</footer>
    </ha-card>`;
  }
}
if(!customElements.get('edupage-grades-card'))customElements.define('edupage-grades-card',EdupageGradesCard);
const registry=window as Window & {customCards?:object[]};registry.customCards??=[];
registry.customCards.push({type:'edupage-grades-card',name:'EduPage Grades',description:'Latest grades and grades by subject.',preview:true});

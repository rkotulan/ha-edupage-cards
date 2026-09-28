import { LitElement, html, css, nothing } from 'lit';
import type { HomeAssistant } from './types';
import { overviewData, localPath, type OverviewConfig } from './overview';
import { styles } from './styles';
import './overview-editor';

export class EdupageOverviewCard extends LitElement {
  static properties = { hass:{attribute:false}, config:{state:true} };
  declare hass?: HomeAssistant;
  private config?: OverviewConfig;
  static styles = [styles, css`
    :host { --student-accent:#7eaef8; }
    .identity { display:flex; align-items:center; gap:14px; padding:18px 20px; margin-bottom:12px; min-height:94px; }
    .avatar { display:grid; place-items:center; width:44px; height:44px; flex:0 0 44px; border-radius:50%; font-size:22px; font-weight:650; color:var(--student-accent); background:color-mix(in srgb,var(--student-accent) 16%,transparent); }
    .person { min-width:0; } h2 { font-size:20px; letter-spacing:0; }
    .attendance { font-size:12px; line-height:1.5; color:var(--secondary-text-color); margin-top:5px; overflow-wrap:anywhere; }
    .duties { min-height:230px; display:flex; flex-direction:column; }
    .heading { display:flex; justify-content:space-between; align-items:center; padding:18px 20px 14px; }
    .heading h2 { font-size:18px; }
    .metrics { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:8px; padding:0 20px; }
    .metric { background:var(--secondary-background-color,#f1f5f7); border-radius:10px; padding:10px 6px; text-align:center; }
    .metric strong { display:block; font-size:26px; line-height:1.2; font-weight:650; }
    .metric span { display:block; font-size:11px; margin-top:5px; color:var(--secondary-text-color); }
    .overdue strong { color:#dba649; }
    .next { padding:14px 20px; font-size:13px; line-height:1.5; min-height:72px; overflow-wrap:anywhere; }
    .next small { color:var(--secondary-text-color); display:block; font-size:11px; }
    .next strong { font-weight:550; }
    .status { padding:0 20px 12px; font-size:12px; color:var(--warning-color,#dba649); }
    footer { margin-top:auto; padding:10px 20px; display:flex; gap:12px; align-items:baseline; flex-wrap:wrap; }
    a { color:var(--primary-color); text-decoration:none; font-size:12px; }
    details { font-size:11px; color:var(--secondary-text-color); }
    summary { cursor:pointer; } details p { line-height:1.5; max-width:38em; }
  `];
  setConfig(config: OverviewConfig) {
    if (!config.name?.trim() || [config.notifications,config.open_homework,config.overdue_homework,config.upcoming_exams,config.next_deadline].some(id => typeof id !== 'string' || !id.startsWith('sensor.'))) throw Error('Configure a name and five EduPage sensors.');
    this.config={...config};
  }
  getCardSize() { return 5; }
  static getConfigElement() { return document.createElement('edupage-overview-editor'); }
  getGridOptions() { return {columns:12,rows:'auto'}; }
  private t(cs:string,en:string) { return (this.config?.language ?? this.hass?.language ?? 'en').startsWith('cs') ? cs : en; }
  protected render() {
    if(!this.hass || !this.config) return nothing;
    const c=this.config,d=overviewData(c,this.hass.states),path=localPath(c.duties_path);
    const color={blue:'#7eaef8',green:'#74c9aa',violet:'#b4a0ef'}[c.accent ?? 'blue'];
    const due=d.due ? new Intl.DateTimeFormat(c.language ?? this.hass.language,{day:'numeric',month:'numeric',timeZone:'UTC'}).format(new Date(d.due+'T12:00:00Z')) : '';
    return html`<div style=${`--student-accent:${color}`}><ha-card class="identity"><span class="avatar" aria-hidden="true">${c.name.slice(0,1)}</span><div class="person"><h2>${c.name}</h2><div class="attendance">${d.attendanceUnavailable ? this.t('Docházka není dostupná','Attendance unavailable') : d.attendance ? html`${this.t('Poslední záznam','Last record')}: ${d.attendance}` : this.t('Docházka: bez dostupného záznamu','Attendance: no available record')}${d.attendanceStale ? html` · ${this.t('neaktuální','stale')}` : nothing}</div></div></ha-card>
      <ha-card class="duties"><div class="heading"><h2>${this.t('Povinnosti','Assignments')}</h2></div>
      <div class="metrics">${d.counts.map((n,i)=>html`<div class=${`metric ${i===1 && n ? 'overdue':''}`}><strong>${n ?? '—'}</strong><span>${[this.t('Otevřené úkoly','Open tasks'),this.t('Po termínu','Overdue'),this.t('Písemky','Exams')][i]}</span></div>`)}</div>
      <div class="next">${d.empty ? html`<strong>${this.t('Žádné evidované povinnosti','No recorded assignments')}</strong><small>${this.t('Podle dostupných dat EduPage','According to available EduPage data')}</small>` : due ? html`<small>${this.t('Nejbližší termín','Next deadline')} · ${due}</small><strong>${d.subject}${d.subject && d.task ? ' · ' : ''}${d.task}</strong>` : html`<small>${this.t('Nejbližší termín není dostupný','Next deadline unavailable')}</small>`}</div>
      ${d.counts.includes(null) || d.stale ? html`<div class="status" role="status">${d.stale ? this.t('Údaje mohou být zastaralé.','Data may be stale.') : this.t('Některé údaje nejsou dostupné.','Some data is unavailable.')}</div>` : nothing}
      <footer>${path ? html`<a href=${path}>${this.t('Všechny povinnosti','All assignments')} →</a>` : nothing}<details><summary>${this.t('Informace','Information')}</summary><p>${this.t('Stav dokončení a termíny přebíráme z EduPage. Historie může být neúplná. Záznam docházky neukazuje aktuální přítomnost ve škole.','Completion and deadlines come from EduPage. History may be incomplete. The attendance record does not indicate current presence at school.')}</p></details></footer></ha-card></div>`;
  }
}
customElements.define('edupage-overview-card',EdupageOverviewCard);
const registry=window as Window & {customCards?:object[]};registry.customCards??=[];
registry.customCards.push({type:'edupage-overview-card',name:'EduPage Overview',description:'Student identity, attendance and assignment summary.',preview:true});

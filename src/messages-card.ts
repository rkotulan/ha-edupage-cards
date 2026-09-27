import { LitElement, html, css, nothing } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import type { HomeAssistant } from './types';
import { messageData, messageDate, messageStudents } from './messages';
import type { MessagesConfig } from './messages';
import { styles } from './styles';
import './messages-editor';

export class EdupageMessagesCard extends LitElement {
  static properties = { hass: { attribute:false }, config:{state:true}, studentIndex:{state:true} };
  declare hass?: HomeAssistant;
  private config?: MessagesConfig;
  private studentIndex=0;
  static styles=[styles,css`
    .messages-head { display:flex; gap:14px; align-items:center; justify-content:space-between; padding:20px; }
    .messages-head h2 { font-size:20px; min-width:0; overflow-wrap:anywhere; }
    .messages-head .student-picker,.messages-head .student-static { flex-shrink:1; min-width:0; }
    .messages-list { padding:0 16px 16px; }
    .notice { padding:12px 16px; margin:0 16px 12px; border-radius:10px; background:var(--secondary-background-color,#f1f5f7); font-size:13px; line-height:1.5; }
    .school-message { border:1px solid var(--divider-color,#d9e1e6); border-radius:12px; margin:10px 0; overflow:hidden; }
    .school-message > summary { cursor:pointer; list-style:none; padding:16px; }
    .school-message > summary::-webkit-details-marker { display:none; }
    .message-meta { display:flex; justify-content:space-between; align-items:baseline; gap:10px; flex-wrap:wrap; font-size:12px; color:var(--secondary-text-color,#687987); }
    .message-author { font-size:14px; font-weight:600; color:var(--primary-text-color,#182635); overflow-wrap:anywhere; }
    .message-preview { margin-top:9px; font-size:14px; line-height:1.5; overflow-wrap:anywhere; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
    .message-action { display:block; margin-top:10px; font-size:12px; color:var(--primary-color,#007b83); }
    .when-open { display:none; }
    .school-message[open] .when-open { display:inline; }
    .school-message[open] .when-closed,.school-message[open] .message-preview { display:none; }
    .message-body { white-space:pre-wrap; overflow-wrap:anywhere; line-height:1.65; font-size:14px; padding:0 16px 18px; }
    .message-count { padding:0 20px; font-size:12px; color:var(--secondary-text-color,#687987); }
    @container(max-width:460px) { .messages-head { flex-wrap:wrap; } .messages-head .student-picker,.messages-head .student-static { margin-left:auto; } }
  `];
  setConfig(config: MessagesConfig) { messageStudents(config); this.config={...config}; this.studentIndex=0; }
  static getConfigElement() { return document.createElement('edupage-messages-editor'); }
  static getStubConfig(hass: HomeAssistant) { return {type:'custom:edupage-messages-card',entity:Object.keys(hass.states).find(id=>id.startsWith('sensor.edupage_notification_')) ?? 'sensor.edupage_notification_student'}; }
  getCardSize() { return 5; }
  getGridOptions() { return {columns:12,rows:'auto',min_columns:6}; }
  private t(cs:string,en:string) { return (this.config?.language ?? this.hass?.language ?? 'en').startsWith('cs') ? cs : en; }
  private dismiss=(event:Event)=>{const picker=this.renderRoot.querySelector<HTMLDetailsElement>('.student-picker');if(picker && !event.composedPath().includes(picker))picker.open=false;};
  connectedCallback() { super.connectedCallback();document.addEventListener('pointerdown',this.dismiss); }
  disconnectedCallback() { super.disconnectedCallback();document.removeEventListener('pointerdown',this.dismiss); }
  private closePicker() { const p=this.renderRoot.querySelector<HTMLDetailsElement>('.student-picker');if(p){p.open=false;p.querySelector('summary')?.focus();} }
  protected render() {
    if(!this.config || !this.hass)return nothing;
    const people=messageStudents(this.config);
    const person=people[this.studentIndex];
    const name=(i:number)=>String(people[i].name ?? this.hass!.states[people[i].entity]?.attributes.student ?? this.hass!.states[people[i].entity]?.attributes.friendly_name ?? people[i].entity);
    const avatar=(i:number)=>html`<span class="student-avatar" aria-hidden="true">${name(i).trim().slice(0,1).toLocaleUpperCase()}</span><span class="student-name">${name(i)}</span>`;
    const data=messageData(this.hass.states[person.entity]);
    const messages=data.messages.slice(0,this.config.max_messages ?? 10);
    return html`<ha-card>
      <div class="messages-head"><h2>${this.config.title ?? this.t('Zprávy ze školy','School messages')}</h2>
        ${this.config.show_student===false ? nothing : people.length===1 ? html`<div class="student-static">${avatar(0)}</div>` : html`<details class="student-picker" @keydown=${(e:KeyboardEvent)=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();this.closePicker();}}} @focusout=${(e:FocusEvent)=>{if(!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node | null))(e.currentTarget as HTMLDetailsElement).open=false;}}>
          <summary aria-label=${this.t('Vybrat dítě: ','Choose student: ')+name(this.studentIndex)}>${avatar(this.studentIndex)}<svg class="student-chevron" aria-hidden="true" viewBox="0 0 24 24"><path d="m7 10 5 5 5-5" /></svg></summary>
          <div class="student-options" role="group" aria-label=${this.t('Žák','Student')}>${people.map((_,i)=>html`<button class="student-option" aria-pressed=${i===this.studentIndex} @click=${()=>{this.studentIndex=i;this.closePicker();}}>${avatar(i)}<span class="student-check" aria-hidden="true">${i===this.studentIndex?'✓':''}</span></button>`)}</div>
        </details>`}
      </div>
      ${data.unavailable ? html`<div class="notice" role="alert">${this.t('Senzor zpráv není dostupný. Zkontrolujte připojení konektoru.','The message sensor is unavailable. Check the integration connection.')}</div>` : data.unsupported ? html`<div class="notice" role="alert">${this.t('Senzor neposkytuje seznam událostí. Vyberte senzor oznámení EduPage s atributem events.','The sensor does not provide an event list. Select an EduPage notification sensor with the events attribute.')}</div>` : html`
        ${data.stale ? html`<div class="notice" role="status">${this.t('Údaje mohou být zastaralé. Zobrazuje se poslední dostupná historie.','Data may be stale. Showing the last available history.')}</div>` : nothing}
        ${data.truncated ? html`<div class="notice">${this.t('Konektor poskytuje jen část historie. Starší zprávy zde mohou chybět.','The integration provides only part of the history. Older messages may be missing.')}</div>` : nothing}
        <div class="message-count">${this.t('Zobrazeno','Showing')} ${messages.length} ${this.t('z','of')} ${data.messages.length} ${this.t('dostupných zpráv','available messages')}</div>
        ${keyed(person.entity,html`<div class="messages-list">${messages.length ? messages.map(message=>keyed(message.key,html`<details class="school-message">
          <summary><span class="message-meta"><span class="message-author">${message.author || this.t('Odesílatel neuveden','Sender unavailable')}</span><span>${messageDate(message.timestamp,this.config!.language ?? this.hass!.language) || this.t('Datum neuvedeno','Date unavailable')}</span></span>
          <div class="message-preview">${(message.text.length > 200 ? message.text.slice(0,200) + '…' : message.text) || this.t('Text zprávy není dostupný.','Message text is unavailable.')}</div><span class="message-action"><span class="when-closed">${this.t('Číst zprávu','Read message')} ↓</span><span class="when-open">${this.t('Sbalit','Collapse')} ↑</span></span></summary>
          <div class="message-body">${message.text || this.t('Text zprávy není dostupný.','Message text is unavailable.')}</div>
        </details>`)) : html`<div class="empty">${this.t('V dostupné historii nejsou žádné zprávy.','There are no messages in the available history.')}</div>`}</div>`)}
      `}
      <footer>${this.t('Zobrazení zprávy zde nemění stav přečtení v EduPage.','Viewing a message here does not mark it as read in EduPage.')}</footer>
    </ha-card>`;
  }
}
if(!customElements.get('edupage-messages-card'))customElements.define('edupage-messages-card',EdupageMessagesCard);
const registry=window as Window & {customCards?:object[]};registry.customCards??=[];
registry.customCards.push({type:'edupage-messages-card',name:'EduPage Messages',description:'School messages from EduPage notification sensors.',preview:true});

import { LitElement, html, css, nothing } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import type { HomeAssistant } from './types';
import { messageData, messageDate, messageStudents } from './messages';
import type { MessagesConfig, SchoolMessage } from './messages';
import { localPath } from './overview';
import { styles } from './styles';
import './messages-editor';
import './student-picker';

export class EdupageMessagesCard extends LitElement {
  static properties = { hass: { attribute:false }, config:{state:true}, studentIndex:{state:true}, detail:{state:true} };
  declare hass?: HomeAssistant;
  private config?: MessagesConfig;
  private studentIndex=0;
  private detail?: SchoolMessage;
  private detailPointerOutside=false;
  static styles=[styles,css`
    .messages-head { display:flex; gap:14px; align-items:center; justify-content:space-between; padding:20px; }
    .messages-head h2 { font-size:20px; min-width:0; overflow-wrap:anywhere; }
    .messages-head edupage-student-picker { flex-shrink:1; min-width:0; }
    .messages-list { padding:0 16px 16px; }
    .notice { padding:12px 16px; margin:0 16px 12px; border-radius:10px; background:var(--secondary-background-color,#f1f5f7); font-size:13px; line-height:1.5; }
    .school-message { display:block; width:100%; text-align:left; color:inherit; background:transparent; border:1px solid var(--divider-color,#d9e1e6); border-radius:12px; margin:10px 0; padding:16px; }
    .school-message:hover { background:var(--secondary-background-color,#f1f5f7); }
    .message-detail { --detail-accent:var(--primary-color,#007b83); }
    @media (min-width: 601px) { .message-detail { width:min(760px, calc(100vw - 32px)); } }
    .message-detail .message-body { padding:18px 0 0; }
    .message-meta { display:flex; justify-content:space-between; align-items:baseline; gap:10px; flex-wrap:wrap; font-size:12px; color:var(--secondary-text-color,#687987); }
    .message-author { font-size:14px; font-weight:600; color:var(--primary-text-color,#182635); overflow-wrap:anywhere; }
    .message-preview { margin-top:9px; font-size:14px; line-height:1.5; overflow-wrap:anywhere; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
    .message-action { display:block; margin-top:10px; font-size:12px; color:var(--primary-color,#007b83); }
    .message-body { white-space:pre-wrap; overflow-wrap:anywhere; line-height:1.65; font-size:14px; padding:0 16px 18px; }
    .message-count { padding:0 20px; font-size:12px; color:var(--secondary-text-color,#687987); }
    @container(max-width:460px) { .messages-head { flex-wrap:wrap; } .messages-head edupage-student-picker { margin-left:auto; } }
  `];
  setConfig(config: MessagesConfig) { messageStudents(config); this.closeDetail(); this.config={...config}; this.studentIndex=0; }
  static getConfigElement() { return document.createElement('edupage-messages-editor'); }
  static getStubConfig(hass: HomeAssistant) { return {type:'custom:edupage-messages-card',entity:Object.keys(hass.states).find(id=>id.startsWith('sensor.edupage_notification_')) ?? 'sensor.edupage_notification_student'}; }
  getCardSize() { return 5; }
  getGridOptions() { return {columns:12,rows:'auto',min_columns:6}; }
  private t(cs:string,en:string) { return (this.config?.language ?? this.hass?.language ?? 'en').startsWith('cs') ? cs : en; }
  private async openDetail(message: SchoolMessage) {
    this.detail=message;
    await this.updateComplete;
    if (!this.isConnected || this.detail!==message) return;
    const dialog=this.renderRoot.querySelector<HTMLDialogElement>('.detail');
    if (dialog && !dialog.open) dialog.showModal();
  }
  private closeDetail() {
    this.renderRoot?.querySelector<HTMLDialogElement>('.detail')?.close();
    this.detail=undefined;
    this.detailPointerOutside=false;
  }
  disconnectedCallback() { this.closeDetail(); super.disconnectedCallback(); }
  private outsideDetail(event: MouseEvent) {
    const dialog=event.currentTarget as HTMLDialogElement;
    const rect=dialog.getBoundingClientRect();
    return event.target===dialog && (event.clientX<rect.left || event.clientX>rect.right || event.clientY<rect.top || event.clientY>rect.bottom);
  }
  protected render() {
    if(!this.config || !this.hass)return nothing;
    const people=messageStudents(this.config);
    const person=people[this.studentIndex];
    const name=(i:number)=>String(people[i].name ?? this.hass!.states[people[i].entity]?.attributes.student ?? this.hass!.states[people[i].entity]?.attributes.friendly_name ?? people[i].entity);
    const data=messageData(this.hass.states[person.entity]);
    const messages=data.messages.slice(0,this.config.max_messages ?? 10);
    return html`<ha-card class=${this.config.compact ? "compact messages-compact" : ""}>
      <div class="messages-head"><h2>${this.config.title ?? this.t('Zprávy ze školy','School messages')}</h2>
        ${this.config.show_student===false ? nothing : html`<edupage-student-picker
          .names=${people.map((_,i)=>name(i))} .selected=${this.studentIndex} .language=${this.config.language ?? this.hass.language}
          .caption=${this.t('Zobrazit zprávy','Show messages')}
          @student-changed=${(e:CustomEvent<{index:number}>)=>{this.closeDetail();this.studentIndex=e.detail.index;}}></edupage-student-picker>`}
      </div>
      ${data.unavailable ? html`<div class="notice" role="alert">${this.t('Senzor zpráv není dostupný. Zkontrolujte připojení konektoru.','The message sensor is unavailable. Check the integration connection.')}</div>` : data.unsupported ? html`<div class="notice" role="alert">${this.t('Senzor neposkytuje seznam událostí. Vyberte senzor oznámení EduPage s atributem events.','The sensor does not provide an event list. Select an EduPage notification sensor with the events attribute.')}</div>` : html`
        ${data.stale ? html`<div class="notice" role="status">${this.t('Údaje mohou být zastaralé. Zobrazuje se poslední dostupná historie.','Data may be stale. Showing the last available history.')}</div>` : nothing}
        <div class="message-count">${this.t('Zobrazeno','Showing')} ${messages.length} ${this.t('z','of')} ${data.messages.length} ${this.t('dostupných zpráv','available messages')}</div>
        ${keyed(person.entity,html`<div class="messages-list">${messages.length ? messages.map(message=>keyed(message.key,html`<button class="school-message" @click=${()=>void this.openDetail(message)}>
          <span class="message-meta"><span class="message-author">${message.author || this.t('Odesílatel neuveden','Sender unavailable')}</span><span>${messageDate(message.timestamp,this.config!.language ?? this.hass!.language) || this.t('Datum neuvedeno','Date unavailable')}</span></span>
          <div class="message-preview">${(message.text.length > 200 ? message.text.slice(0,200) + '…' : message.text) || this.t('Text zprávy není dostupný.','Message text is unavailable.')}</div><span class="message-action">${this.t('Číst zprávu','Read message')} →</span>
        </button>`)) : html`<div class="empty">${this.t('V dostupné historii nejsou žádné zprávy.','There are no messages in the available history.')}</div>`}</div>`)}
      `}
      ${this.detail ? html`<dialog class="detail message-detail" aria-labelledby="message-detail-title"
        @cancel=${(e:Event)=>{e.preventDefault();e.stopPropagation();this.closeDetail();}}
        @close=${()=>{this.detail=undefined;}}
        @pointerdown=${(e:PointerEvent)=>{this.detailPointerOutside=this.outsideDetail(e);}}
        @click=${(e:MouseEvent)=>{if(this.detailPointerOutside && this.outsideDetail(e))this.closeDetail();}}>
        <div class="detail-head"><div><div class="eyebrow">${this.t('ZPRÁVA PRO','MESSAGE FOR')} ${name(this.studentIndex)}</div>
          <h3 id="message-detail-title">${this.detail.author || this.t('Odesílatel neuveden','Sender unavailable')}</h3></div>
          <button class="tool detail-close" autofocus aria-label=${this.t('Zavřít zprávu','Close message')} @click=${this.closeDetail}>×</button></div>
        <div class="message-meta">${messageDate(this.detail.timestamp,this.config.language ?? this.hass.language) || this.t('Datum neuvedeno','Date unavailable')}</div>
        <div class="message-body">${this.detail.text || this.t('Text zprávy není dostupný.','Message text is unavailable.')}</div>
      </dialog>` : nothing}
      <footer>${localPath(this.config.more_path) ? html`<a class="more" href=${localPath(this.config.more_path)!}>${this.t('Všechny zprávy','All messages')} →</a>` : nothing}<details ?open=${!this.config.compact}><summary>${this.t('Informace','Information')}</summary>${data.truncated && !data.unavailable && !data.unsupported ? html`<div>${this.t('Konektor poskytuje jen část historie. Starší zprávy zde mohou chybět.','The integration provides only part of the history. Older messages may be missing.')}</div>` : nothing}
        <div>${this.t('Zobrazení zprávy zde nemění stav přečtení v EduPage.','Viewing a message here does not mark it as read in EduPage.')}</div></details></footer>
    </ha-card>`;
  }
}
if(!customElements.get('edupage-messages-card'))customElements.define('edupage-messages-card',EdupageMessagesCard);
const registry=window as Window & {customCards?:object[]};registry.customCards??=[];
registry.customCards.push({type:'edupage-messages-card',name:'EduPage Messages',description:'School messages from EduPage notification sensors.',preview:true});

import { LitElement, html, nothing } from 'lit';
import { EdupageTimetableEditor } from './editor';
import type { HomeAssistant } from './types';
import type { OverviewConfig } from './overview';

export class EdupageOverviewEditor extends LitElement {
  static properties={hass:{attribute:false},config:{state:true}};
  static styles=EdupageTimetableEditor.styles;
  declare hass?: HomeAssistant;
  private config?: OverviewConfig;
  setConfig(config:OverviewConfig) { this.config={...config}; }
  private change(key:string,value:string) { this.config={...this.config!,[key]:value}; this.dispatchEvent(new CustomEvent('config-changed',{detail:{config:this.config},bubbles:true,composed:true})); }
  protected render() {
    if(!this.config)return nothing;
    const cs=(this.config.language ?? this.hass?.language ?? 'en').startsWith('cs');
    const fields=[['name',cs?'Jméno žáka':'Student name'],['notifications',cs?'Senzor oznámení':'Notification sensor'],['open_homework',cs?'Otevřené úkoly':'Open homework'],['overdue_homework',cs?'Úkoly po termínu':'Overdue homework'],['upcoming_exams',cs?'Nadcházející písemky':'Upcoming exams'],['next_deadline',cs?'Nejbližší termín':'Next deadline'],['duties_path',cs?'Odkaz na povinnosti (cesta v HA)':'Assignments link (HA path)']];
    return html`<fieldset>${fields.map(([key,label])=>html`<label>${label}<input .value=${String(this.config![key as keyof OverviewConfig] ?? '')} list=${key!=='name'&&key!=='duties_path'?'sensors':'none'} @change=${(e:Event)=>this.change(key,(e.target as HTMLInputElement).value)}></label>`)}
    <datalist id="sensors">${Object.keys(this.hass?.states ?? {}).filter(id=>id.startsWith('sensor.')).map(id=>html`<option value=${id}></option>`)}</datalist>
    <label>${cs?'Barva':'Color'}<select .value=${this.config.accent ?? 'blue'} @change=${(e:Event)=>this.change('accent',(e.target as HTMLSelectElement).value)}>${['blue','green','violet'].map((value,i)=>html`<option value=${value}>${cs?['Modrá','Zelená','Fialová'][i]:value}</option>`)}</select></label></fieldset>`;
  }
}
customElements.define('edupage-overview-editor',EdupageOverviewEditor);

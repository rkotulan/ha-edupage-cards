import { LitElement, html, nothing } from 'lit';
import { EdupageTimetableEditor } from './editor';
import type { HomeAssistant, Student } from './types';
import type { MessagesConfig } from './messages';
export class EdupageMessagesEditor extends LitElement {
 static properties={hass:{attribute:false},config:{state:true}};
 static styles=EdupageTimetableEditor.styles;
 declare hass?:HomeAssistant;
 private config?:MessagesConfig;
 setConfig(config:MessagesConfig){this.config={...config};}
 private t(cs:string,en:string){return(this.config?.language??this.hass?.language??'en').startsWith('cs')?cs:en;}
 private updateConfig(patch:Partial<MessagesConfig>){const next={...this.config!,...patch};if(next.students)delete next.entity;this.config=next;this.dispatchEvent(new CustomEvent('config-changed',{detail:{config:next},bubbles:true,composed:true}));}
 protected render(){
  if(!this.config||!this.hass)return nothing;
  const people=this.config.students??(this.config.entity?[{entity:this.config.entity}]:[]);
  const sensors=Object.keys(this.hass.states).filter(id=>id.startsWith('sensor.')&&(id.startsWith('sensor.edupage_notification_')||Array.isArray(this.hass!.states[id].attributes.events))).sort();
  const unused=sensors.find(id=>!people.some(s=>s.entity===id));
  const edit=(index:number,patch:Partial<Student>)=>this.updateConfig({students:people.map((s,i)=>i===index?{...s,...patch}:s)});
  return html`<fieldset><legend>${this.t('Žáci a zprávy','Students and messages')}</legend><p>${this.t('Vyberte senzory oznámení EduPage. První žák je výchozí.','Select EduPage notification sensors. The first student is the default.')}</p>
  ${people.map((s,i)=>html`<div class="student"><label>${this.t('Senzor zpráv','Message sensor')} ${i+1}<select .value=${s.entity} @change=${(e:Event)=>edit(i,{entity:(e.target as HTMLSelectElement).value})}>${!sensors.includes(s.entity)?html`<option value=${s.entity}>${s.entity}</option>`:nothing}${sensors.map(id=>html`<option value=${id} ?selected=${id===s.entity}>${this.hass!.states[id].attributes.friendly_name??id} · ${id}</option>`)}</select></label>
  <label>${this.t('Jméno žáka','Student name')} ${i+1}<input .value=${s.name??''} @input=${(e:Event)=>edit(i,{name:(e.target as HTMLInputElement).value||undefined})}></label>
  <div class="actions"><button ?disabled=${i===0} aria-label=${this.t('Posunout nahoru','Move up')} @click=${()=>{const next=[...people];[next[i-1],next[i]]=[next[i],next[i-1]];this.updateConfig({students:next});}}>↑</button><button ?disabled=${people.length<=1} @click=${()=>this.updateConfig({students:people.filter((_,j)=>i!==j)})}>${this.t('Odebrat žáka','Remove student')}</button></div></div>`)}
  <button ?disabled=${!unused} @click=${()=>{if(unused)this.updateConfig({students:[...people,{entity:unused}]});}}>${this.t('Přidat žáka','Add student')}</button></fieldset>
  <fieldset><legend>${this.t('Zobrazení','Display')}</legend><label class="toggle"><input type="checkbox" .checked=${this.config.compact===true} @change=${(e:Event)=>this.updateConfig({compact:(e.target as HTMLInputElement).checked})}>${this.t('Kompaktní přehled','Compact overview')}</label>
      <label>${this.t('Odkaz na celý seznam (cesta v HA)','Full list link (HA path)')}<input .value=${this.config.more_path??''} @change=${(e:Event)=>this.updateConfig({more_path:(e.target as HTMLInputElement).value||undefined})}></label><label>${this.t('Nadpis','Title')}<input .value=${this.config.title??''} @input=${(e:Event)=>this.updateConfig({title:(e.target as HTMLInputElement).value||undefined})}></label>
  <label class="toggle"><input type="checkbox" .checked=${this.config.show_student!==false} @change=${(e:Event)=>this.updateConfig({show_student:(e.target as HTMLInputElement).checked})}>${this.t('Zobrazit jméno a výběr žáka','Show student name and picker')}</label>
  <label>${this.t('Počet zpráv','Message limit')}<input type="number" min="1" max="100" .value=${String(this.config.max_messages??10)} @change=${(e:Event)=>{const input=e.target as HTMLInputElement;const n=Number(input.value);if(Number.isInteger(n)&&n>=1&&n<=100)this.updateConfig({max_messages:n});else input.value=String(this.config!.max_messages??10);}}></label>
  <label>${this.t('Jazyk','Language')}<select .value=${this.config.language??''} @change=${(e:Event)=>this.updateConfig({language:((e.target as HTMLSelectElement).value||undefined) as MessagesConfig['language']})}><option value="" ?selected=${!this.config.language}>Home Assistant</option><option value="cs" ?selected=${this.config.language==='cs'}>Čeština</option><option value="en" ?selected=${this.config.language==='en'}>English</option></select></label></fieldset>`;
 }
}
if(!customElements.get('edupage-messages-editor'))customElements.define('edupage-messages-editor',EdupageMessagesEditor);

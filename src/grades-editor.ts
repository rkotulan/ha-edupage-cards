import { LitElement, html, nothing } from 'lit';
import { EdupageTimetableEditor } from './editor';
import { discoverGradeStudents, subjectName } from './grades';
import type { GradesConfig, GradeStudent } from './grades';
import type { HomeAssistant } from './types';
export class EdupageGradesEditor extends LitElement {
  static properties={hass:{attribute:false},config:{state:true}};
  static styles=EdupageTimetableEditor.styles;
  declare hass?:HomeAssistant;
  private config?:GradesConfig;
  setConfig(config:GradesConfig){this.config={...config};}
  private t(cs:string,en:string){return(this.config?.language??this.hass?.language??'en').startsWith('cs')?cs:en;}
  private updateConfig(patch:Partial<GradesConfig>){this.config={...this.config!,...patch};this.dispatchEvent(new CustomEvent('config-changed',{detail:{config:this.config},bubbles:true,composed:true}));}
  protected render(){
    if(!this.config||!this.hass)return nothing;
    const people=this.config.students??[],found=discoverGradeStudents(this.hass.states);
    const sensors=found.flatMap(p=>p.subjects);
    const edit=(i:number,patch:Partial<GradeStudent>)=>this.updateConfig({students:people.map((p,j)=>i===j?{...p,...patch}:p)});
    return html`<fieldset><legend>${this.t('Žáci a předměty','Students and subjects')}</legend><p>${this.t('První žák je výchozí. U každého vyberte jeho předmětové senzory.','The first student is the default. Select subject sensors for each student.')}</p>
      ${people.map((p,i)=>html`<div class="student"><label>${this.t('Jméno žáka','Student name')} ${i+1}<input .value=${p.name} @change=${(e:Event)=>{const name=(e.target as HTMLInputElement).value.trim();if(name)edit(i,{name});}}></label>
        ${p.subjects.map((s,j)=>html`<label>${this.t('Předmět','Subject')} ${j+1}<select .value=${s.entity} @change=${(e:Event)=>{const entity=(e.target as HTMLSelectElement).value;edit(i,{subjects:p.subjects.map((s,k)=>k===j?{entity,name:subjectName(entity,this.hass!.states[entity])}:s)});}}><option value=${s.entity}>${s.name??s.entity} · ${s.entity}</option>${sensors.filter(x=>!p.subjects.some(y=>y.entity===x.entity)).map(x=>html`<option value=${x.entity}>${x.name} · ${x.entity}</option>`)}</select></label><button ?disabled=${p.subjects.length<=1} @click=${()=>edit(i,{subjects:p.subjects.filter((_,k)=>k!==j)})}>${this.t('Odebrat předmět','Remove subject')}</button>`)}
        <div class="actions"><button @click=${()=>{const next=sensors.find(s=>!p.subjects.some(x=>x.entity===s.entity));if(next)edit(i,{subjects:[...p.subjects,next]});}}>${this.t('Přidat předmět','Add subject')}</button><button ?disabled=${i===0} @click=${()=>{const next=[...people];[next[i-1],next[i]]=[next[i],next[i-1]];this.updateConfig({students:next});}}>↑</button><button ?disabled=${people.length<=1} @click=${()=>this.updateConfig({students:people.filter((_,j)=>i!==j)})}>${this.t('Odebrat žáka','Remove student')}</button></div></div>`)}
      ${found.filter(p=>!people.some(x=>x.subjects.some(s=>p.subjects.some(y=>y.entity===s.entity)))).map(p=>html`<button @click=${()=>this.updateConfig({students:[...people,p]})}>+ ${p.name}</button>`)}
    </fieldset><fieldset><legend>${this.t('Zobrazení','Display')}</legend>
      <label>${this.t('Nadpis','Title')}<input .value=${this.config.title??''} @input=${(e:Event)=>this.updateConfig({title:(e.target as HTMLInputElement).value||undefined})}></label>
      <label class="toggle"><input type="checkbox" .checked=${this.config.show_student!==false} @change=${(e:Event)=>this.updateConfig({show_student:(e.target as HTMLInputElement).checked})}>${this.t('Zobrazit výběr žáka','Show student picker')}</label>
      <label>${this.t('Výchozí pohled','Default view')}<select .value=${this.config.default_view??'latest'} @change=${(e:Event)=>this.updateConfig({default_view:(e.target as HTMLSelectElement).value as 'latest'|'subjects'})}><option value="latest" ?selected=${this.config.default_view!=='subjects'}>${this.t('Nejnovější','Latest')}</option><option value="subjects" ?selected=${this.config.default_view==='subjects'}>${this.t('Podle předmětů','By subject')}</option></select></label>
      <label>${this.t('Jazyk','Language')}<select .value=${this.config.language??''} @change=${(e:Event)=>this.updateConfig({language:((e.target as HTMLSelectElement).value||undefined) as GradesConfig['language']})}><option value="" ?selected=${!this.config.language}>Home Assistant</option><option value="cs" ?selected=${this.config.language==='cs'}>Čeština</option><option value="en" ?selected=${this.config.language==='en'}>English</option></select></label>
    </fieldset>`;
  }
}
if(!customElements.get('edupage-grades-editor'))customElements.define('edupage-grades-editor',EdupageGradesEditor);

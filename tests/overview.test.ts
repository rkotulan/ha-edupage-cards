import test from 'node:test';
import assert from 'node:assert/strict';
import { overviewData, localPath, type OverviewConfig } from '../src/overview';
const c:OverviewConfig={type:'x',name:'Student',notifications:'sensor.events',open_homework:'sensor.open',overdue_homework:'sensor.late',upcoming_exams:'sensor.exams',next_deadline:'sensor.next'};
const state=(value:string,attributes:Record<string,unknown>={})=>({state:value,attributes,last_updated:''});
test('missing counts never imply no assignments, but three known zero counts do',()=>{
  assert.equal(overviewData(c,{}).empty,false);
  const states={'sensor.open':state('0'),'sensor.late':state('0'),'sensor.exams':state('0')};
  assert.equal(overviewData(c,states).empty,true);
  states['sensor.open']=state('unavailable');assert.equal(overviewData(c,states).empty,false);
  states['sensor.open']=state('8',{data_stale:true});assert.equal(overviewData(c,states).stale,true);
});
test('attendance uses latest attendance event, preserves departure, ignores newer messages',()=>{
  const d=overviewData(c,{'sensor.events':state('3',{events:[{type:'pipnutie',text:'Arrival',timestamp:'2026-09-25 08:00:00'},{type:'sprava',text:'Message',timestamp:'2026-09-26 08:00:00'},{type:'pipnutie',text:'Departure',timestamp:'2026-09-25 12:00:00'},null]})});
  assert.equal(d.attendance,'Departure');assert.equal(d.attendanceUnavailable,false);
  assert.equal(overviewData(c,{'sensor.events':state('0',{events:[]})}).attendance,'');
  assert.equal(overviewData(c,{}).attendanceUnavailable,true);
});
test('navigation only accepts local HA paths',()=>{
  assert.equal(localPath('/school/messages'),'/school/messages');
  for(const value of ['//outside.example','javascript:alert(1)','/\\outside.example','https://outside.example'])assert.equal(localPath(value),undefined);
});

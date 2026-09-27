import { test } from 'node:test';
import assert from 'node:assert/strict';
import { messageData, messageDate, messageStudents } from '../src/messages.ts';

test('messages exclude other event types and sort newest first without dropping duplicate IDs', () => {
 const result=messageData({state:'3',attributes:{events:[{id:'x',type:'sprava',text:'Older',timestamp:'2026-09-20 10:00:00'},{type:'znamka',text:'Grade'},{id:'x',type:'sprava',text:'Newer',timestamp:'2026-09-21 08:00:00'},null],events_truncated:true,data_stale:true}});
 assert.deepEqual(result.messages.map(m=>m.text),['Newer','Older']);
 assert.equal(new Set(result.messages.map(m=>m.key)).size,2);
 assert.equal(result.truncated,true); assert.equal(result.stale,true);
});
test('unavailable and unsupported sensors are distinct from a valid empty history',()=>{
 assert.equal(messageData().unavailable,true);
 assert.equal(messageData({state:'unavailable',attributes:{events:[]}}).unavailable,true);
 assert.equal(messageData({state:'0',attributes:{}}).unsupported,true);
 assert.equal(messageData({state:'0',attributes:{events:[]}}).unsupported,false);
});
test('missing message fields use safe defaults and markup remains a plain string',()=>{
 const result=messageData({state:'1',attributes:{events:[{type:'sprava',text:'<img src=x onerror=alert(1)>',author:null}]}});
 assert.equal(result.messages[0].text,'<img src=x onerror=alert(1)>'); assert.equal(result.messages[0].author,''); assert.equal(result.messages[0].timestamp,'');
});
test('school wall time is displayed without a browser timezone conversion',()=>{
 assert.equal(messageDate('2026-09-26 01:19:30','cs'),'26. 9. 2026 · 01:19');
 assert.equal(messageDate('2026-09-26 01:19:30','en'),'26/09/2026 · 01:19');
 assert.equal(messageDate('unknown','cs'),'unknown');
});
test('requires sensor students and bounds the message limit',()=>{
 assert.throws(()=>messageStudents({type:'x',entity:'calendar.demo'}));
 assert.throws(()=>messageStudents({type:'x',entity:'sensor.demo',max_messages:0}));
 assert.equal(messageStudents({type:'x',entity:'sensor.demo'})[0].entity,'sensor.demo');
});


import test from 'node:test';
import assert from 'node:assert/strict';
import { gradeData, validateGrades, discoverGradeStudents } from '../src/grades';
const student={name:'Student',subjects:[{entity:'sensor.math',name:'Math'}]};
const state=(attributes:Record<string,unknown>,value='2')=>({state:value,last_updated:'',attributes});
test('grades preserve textual and zero values, comments and missing fields and sort newest first',()=>{
 const result=gradeData(student,{'sensor.math':state({grade_1_grade_n:'1−',grade_1_date:'2026-09-01 08:00:00',grade_2_grade_n:0,grade_2_percent:0,grade_2_date:'2026-09-02 08:00:00',grade_2_comment:'<text>'})});
 assert.deepEqual(result.grades.map(g=>g.value),['0','1−']);assert.equal(result.grades[0].percent,'0');assert.equal(result.grades[0].comment,'<text>');assert.equal(result.grades[0].teacher,'');
});
test('unavailable, unsupported and known empty sensors are distinct; stale is reported',()=>{
 assert.equal(gradeData(student,{}).unavailable.length,1);
 assert.equal(gradeData(student,{'sensor.math':state({},'unavailable')}).unavailable.length,1);
 assert.equal(gradeData(student,{'sensor.math':state({})}).unsupported.length,1);
 const empty=gradeData(student,{'sensor.math':state({info:'no grades yet',data_stale:true},'0')});assert.equal(empty.unsupported.length,0);assert.equal(empty.stale,true);
});
test('only explicitly configured sensors contribute grades',()=>{
 const s=state({grade_1_grade_n:1});assert.equal(gradeData(student,{'sensor.math':s,'sensor.other_student':s}).grades.length,1);
});
test('discovery only selects grade sensors and records explicit entities',()=>{
 const result=discoverGradeStudents({'sensor.edupage_math':state({student:{name:'Student'},friendly_name:'EduPage - Student [ST] Math',grade_1_grade_n:1}),'sensor.edupage_messages':state({student:{name:'Student'},events:[]})});
 assert.deepEqual(result,[{name:'Student',subjects:[{entity:'sensor.edupage_math',name:'Math'}]}]);
 assert.throws(()=>validateGrades({type:'x',students:[]}));validateGrades({type:'x',students:[student]});
});

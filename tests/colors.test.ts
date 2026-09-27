import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lessonColors, validateColors } from '../src/colors.ts';

test('custom backgrounds select legible text for dark and light colors', () => {
  assert.equal(lessonColors('Math', { Math: '#123' }).text, '#ffffff');
  assert.equal(lessonColors('Math', { Math: '#90caf9' }).text, '#000000');
  assert.equal(lessonColors('Math', { Math: '#90caf9' }).background, '#90caf9');
});

test('unconfigured subjects retain automatic colors; matching tolerates source trailing spaces', () => {
  assert.deepEqual(lessonColors('Math', { English: '#fff' }), lessonColors('Math'));
  assert.equal(lessonColors('Math ', { Math: '#abc' }).background, '#abc');
  assert.ok(lessonColors('constructor', {}).background.startsWith('hsl('));
});

test('rejects malformed maps and CSS declarations, accepts quoted RGB hex', () => {
  for (const colors of [null, [], '#fff', { Math: 123 }, { Math: 'red' }, { Math: '#fff;display:none' }, { Math: '#12345678' }]) {
    assert.throws(() => validateColors(colors));
  }
  validateColors(undefined);
  validateColors({ Math: '#abc', English: '#AABBCC' });
});

import { hue } from './timetable';

export function validateColors(colors: unknown): void {
  if (colors === undefined) return;
  if (!colors || typeof colors !== 'object' || Array.isArray(colors) ||
      Object.entries(colors).some(([name, value]) => !name.trim() || typeof value !== 'string' || !/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(value))) {
    throw new Error('subject_colors must map subject names to quoted hex colors, e.g. Matematika: "#90caf9"');
  }
}

export function lessonColors(subject: string, colors?: Record<string, string>) {
  const color = colors && Object.hasOwn(colors, subject.trim()) ? colors[subject.trim()] : undefined;
  if (!color) {
    const value = hue(subject);
    return { background: `hsl(${value} 60% 90%)`, text: '#182635', border: `hsl(${value} 35% 72%)`, accent: `hsl(${value} 45% 42%)` };
  }
  const hex = color.length === 4 ? color.slice(1).split('').map(c => c + c).join('') : color.slice(1);
  const rgb = [0, 2, 4].map(offset => parseInt(hex.slice(offset, offset + 2), 16));
  const linear = rgb.map(channel => {
    const s = channel / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  const luminance = linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
  const text = luminance > 0.179 ? '#000000' : '#ffffff';
  return { background: color, text, border: `color-mix(in srgb, ${color}, ${text} 25%)`, accent: `color-mix(in srgb, ${color}, ${text} 45%)` };
}

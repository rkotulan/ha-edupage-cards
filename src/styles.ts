import { css } from 'lit';

export const styles = css`
  :host { display: block; container-type: inline-size; color: var(--primary-text-color, #182635); }
  * { box-sizing: border-box; }
  ha-card { display: block; overflow: visible; background: var(--ha-card-background, var(--card-background-color, #fff)); border-radius: var(--ha-card-border-radius, 18px); }
  button, select { font: inherit; color: inherit; }
  button { cursor: pointer; }
  button:focus-visible, summary:focus-visible { outline: 2px solid var(--primary-color, #007b83); outline-offset: 3px; }
  button:disabled { opacity: .35; cursor: default; }
  header { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 22px 24px 14px; flex-wrap: wrap; }
  .eyebrow { font-size: 10px; letter-spacing: .16em; font-weight: 700; color: var(--secondary-text-color, #687987); margin-bottom: 5px; }
  h2 { font-size: 23px; letter-spacing: -.03em; line-height: 1.2; margin: 0; font-weight: 650; }
  .student-picker { position: relative; max-width: 100%; font-size: 14px; }
  .student-picker summary { display: flex; align-items: center; gap: 10px; list-style: none; cursor: pointer; min-height: 46px; padding: 6px 12px 6px 8px; border: 1px solid var(--divider-color, #d9e1e6); border-radius: 14px; background: var(--secondary-background-color, #f6f8fa); }
  .student-picker summary::-webkit-details-marker { display: none; }
  .student-picker summary:hover, .student-picker[open] summary { border-color: color-mix(in srgb, var(--primary-color, #007b83) 55%, var(--divider-color, #d9e1e6)); }
  .student-avatar { display: grid; place-items: center; flex: 0 0 30px; width: 30px; height: 30px; border-radius: 10px; background: color-mix(in srgb, var(--primary-color, #007b83) 14%, transparent); color: var(--primary-color, #007b83); font-weight: 700; font-size: 13px; }
  .student-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: left; }
  summary .student-name { max-width: 180px; font-weight: 600; }
  .student-chevron { width: 18px; height: 18px; flex: 0 0 18px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; opacity: .65; }
  .student-picker[open] .student-chevron { transform: rotate(180deg); }
  .student-options { position: absolute; top: calc(100% + 8px); right: 0; z-index: 20; width: max(100%, 220px); max-width: calc(100vw - 40px); max-height: 300px; overflow-y: auto; padding: 7px; border: 1px solid var(--divider-color, #d9e1e6); border-radius: 16px; background: var(--ha-card-background, var(--card-background-color, #fff)); box-shadow: 0 12px 32px #0003; }
  .student-caption { display: block; padding: 7px 9px 10px; font-size: 11px; color: var(--secondary-text-color, #687987); }
  .student-option { display: flex; align-items: center; gap: 10px; width: 100%; min-height: 46px; padding: 8px; margin: 2px 0; border: 0; border-radius: 10px; background: transparent; }
  .student-option:hover { background: var(--secondary-background-color, #f6f8fa); }
  .student-option[aria-pressed=true] { background: color-mix(in srgb, var(--primary-color, #007b83) 12%, transparent); font-weight: 600; }
  .student-check { margin-left: auto; min-width: 18px; color: var(--primary-color, #007b83); }
  .toolbar { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 4px 24px 18px; flex-wrap: wrap; }
  .navigation { display: flex; align-items: center; gap: 7px; }
  .tool { border: 1px solid var(--divider-color, #d9e1e6); background: transparent; border-radius: 9px; padding: 7px 12px; min-height: 36px; }
  .arrow { font-size: 19px; line-height: 20px; }
  .range { font-size: 14px; font-weight: 600; }
  .muted, footer { color: var(--secondary-text-color, #687987); }
  .badge { font-size: 11px; background: var(--secondary-background-color, #f0f5f6); border-radius: 6px; padding: 5px 8px; }
  .desktop { overflow-x: auto; padding: 0 20px 12px; }
  .grid { min-width: 800px; }
  .row { display: grid; grid-template-columns: 70px 1fr; border-top: 1px solid var(--divider-color, #e7edf0); }
  .axis { height: 34px; position: relative; margin-left: 70px; font-size: 11px; color: var(--secondary-text-color, #687987); }
  .tick { position: absolute; transform: translateX(-50%); top: 5px; }
  .tick:first-child { transform: none; }
  .tick:last-child { transform: translateX(-100%); }
  .day-label { padding: 15px 8px 8px 0; display: flex; flex-direction: column; gap: 3px; }
  .day-label strong { font-size: 14px; }
  .day-label span { font-size: 11px; color: var(--secondary-text-color, #687987); }
  .today .day-label strong { color: var(--primary-color, #007b83); }
  .today { background: color-mix(in srgb, var(--primary-color, #007b83) 5%, transparent); }
  .track { position: relative; min-height: 94px; background: repeating-linear-gradient(to right, var(--divider-color, #e7edf0) 0 1px, transparent 1px var(--hour-width)); }
  .lesson { position: absolute; top: calc(7px + var(--lane) * 86px); left: var(--left); width: var(--width); height: 77px; padding: 8px; text-align: left; border: 1px solid var(--lesson-border); border-left: 3px solid var(--lesson-accent); border-radius: 7px; overflow: hidden; background: var(--lesson-bg); color: var(--lesson-text); display: flex; flex-direction: column; gap: 3px; }
  .lesson:hover { filter: brightness(.96); }
  .lesson .meta { display: flex; justify-content: space-between; gap: 5px; font-size: 10px; white-space: nowrap; }
  .lesson strong { font-size: 12px; line-height: 1.2; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .lesson .teacher { font-size: 10px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; margin-top: auto; }
  .lesson.current { outline: 2px solid var(--primary-color, #007b83); outline-offset: -2px; }
  .lesson.cancelled { opacity: .7; color: var(--primary-text-color, #182635); background: var(--secondary-background-color, #eee); border-color: var(--divider-color, #ccc); }
  .lesson.cancelled strong { text-decoration: line-through; }
  .all-day { position: static; width: 100%; min-height: 55px; height: auto; margin: 7px 0; justify-content: center; }
  .all-day strong { font-size: 13px; }
  .day-content { min-width: 0; }
  .empty { padding: 26px 12px; font-size: 12px; color: var(--secondary-text-color, #687987); }
  .outside { opacity: .65; }
  .message { padding: 28px 24px; text-align: center; line-height: 1.6; }
  .message button { margin-top: 12px; }
  footer { font-size: 11px; line-height: 1.6; padding: 12px 24px 18px; border-top: 1px solid var(--divider-color, #e7edf0); }
  .detail { margin: 4px 20px 16px; padding: 16px; background: var(--secondary-background-color, #f6f8fa); border: 1px solid var(--divider-color, #d9e1e6); border-radius: 12px; }
  .detail-head { display: flex; justify-content: space-between; align-items: start; gap: 12px; }
  .detail h3 { margin: 0 0 10px; font-size: 18px; }
  .detail p { font-size: 14px; margin: 7px 0; white-space: pre-wrap; overflow-wrap: anywhere; }
  .mobile { display: none; padding: 0 16px 16px; }
  .days { display: flex; gap: 5px; margin-bottom: 16px; }
  .days button { flex: 1; min-width: 0; border-radius: 10px; padding: 10px 3px; border: 1px solid var(--divider-color, #d9e1e6); background: transparent; font-size: 11px; }
  .days button span { display: block; margin-top: 4px; }
  .days button[aria-pressed=true] { background: var(--primary-color, #007b83); color: var(--text-primary-color, #fff); border-color: transparent; }
  .mobile .lesson { position: static; width: 100%; height: auto; min-height: 80px; margin: 8px 0; padding: 12px; }
  .mobile .lesson strong { font-size: 15px; }
  .mobile .lesson .teacher, .mobile .lesson .meta { font-size: 12px; }
  @container (max-width: 680px) {
    header { padding: 18px 16px 12px; gap: 12px; }
    h2 { font-size: 21px; }
    .toolbar { padding: 0 16px 16px; }
    .desktop { display: none; }
    .mobile { display: block; }
    .range { width: 100%; }
    footer { padding: 12px 16px 16px; }
    .detail { margin: 0 16px 16px; }
  }
`;

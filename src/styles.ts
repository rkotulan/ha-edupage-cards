import { css } from 'lit';

export const styles = css`
  :host { --lesson-height: 88px; --lane-height: 98px; display: block; container-type: inline-size; color: var(--primary-text-color, #182635); }
  * { box-sizing: border-box; }
  ha-card { display: block; overflow: visible; background: var(--ha-card-background, var(--card-background-color, #fff)); border-radius: var(--ha-card-border-radius, 18px); }
  button, select { font: inherit; color: inherit; }
  button { cursor: pointer; }
  button:focus-visible, summary:focus-visible { outline: 2px solid var(--primary-color, #007b83); outline-offset: 3px; }
  button:disabled { opacity: .35; cursor: default; }
  .card-title { padding: 22px 24px 0; overflow-wrap: anywhere; }
  .student-row { display: flex; justify-content: flex-end; min-width: 0; }
  .eyebrow { font-size: 10px; letter-spacing: .16em; font-weight: 700; color: var(--secondary-text-color, #687987); margin-bottom: 5px; }
  h2 { font-size: 23px; letter-spacing: -.03em; line-height: 1.2; margin: 0; font-weight: 650; }
  .toolbar { display: grid; grid-template-columns: auto auto minmax(0, 1fr); align-items: center; gap: 12px; padding: 18px 24px 16px; }
  .period-controls { display: flex; align-items: center; gap: 10px; min-width: 0; }
  .refresh { flex-shrink: 0; }
  .navigation { display: flex; align-items: center; gap: 7px; }
  .tool { border: 1px solid var(--divider-color, #d9e1e6); background: transparent; border-radius: 9px; padding: 7px 12px; min-height: 36px; }
  .arrow { font-size: 19px; line-height: 20px; }
  .range { font-size: 14px; font-weight: 600; }
  .muted, footer { color: var(--secondary-text-color, #687987); }
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
  .track { position: relative; min-height: calc(var(--lane-height) + 8px); background: repeating-linear-gradient(to right, var(--divider-color, #e7edf0) 0 1px, transparent 1px var(--hour-width)); }
  .lesson { position: absolute; top: calc(7px + var(--lane) * var(--lane-height)); left: var(--left); width: var(--width); height: var(--lesson-height); padding: 8px; text-align: left; border: 1px solid var(--lesson-border); border-left: 3px solid var(--lesson-accent); border-radius: 7px; overflow: hidden; background: var(--lesson-bg); color: var(--lesson-text); display: flex; flex-direction: column; gap: 3px; }
  .lesson:hover { filter: brightness(.96); }
  .lesson .meta { display: flex; justify-content: space-between; gap: 5px; font-size: 10px; line-height: 1.4; flex-shrink: 0; white-space: nowrap; }
  .lesson .meta > :first-child { flex: 0 0 auto; }
  .lesson .meta > :last-child { flex: 1 1 0; min-width: 0; overflow: hidden; text-overflow: ellipsis; text-align: right; }
  .lesson strong { flex-shrink: 0; font-size: 12px; line-height: 1.25; max-height: 2.5em; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .lesson .teacher { flex-shrink: 0; font-size: 10px; line-height: 1.4; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; margin-top: auto; }
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
  .detail { position: fixed; inset: 0; margin: auto; width: min(480px, calc(100vw - 32px)); max-height: 85dvh; overflow-y: auto; padding: 24px; color: var(--primary-text-color, #182635); background: var(--ha-card-background, var(--card-background-color, #fff)); border: 1px solid var(--divider-color, #d9e1e6); border-top: 6px solid var(--detail-accent); border-radius: 20px; box-shadow: 0 24px 80px #0006; }
  .detail::backdrop { background: #0008; }
  .detail-close { flex-shrink: 0; min-width: 44px; min-height: 44px; font-size: 22px; }
  .detail-head { display: flex; justify-content: space-between; align-items: start; gap: 12px; }
  .detail-head > div { min-width: 0; }
  .detail h3 { margin: 0 0 16px; font-size: 22px; line-height: 1.3; overflow-wrap: anywhere; }
  .detail p { font-size: 14px; line-height: 1.6; margin: 10px 0; white-space: pre-wrap; overflow-wrap: anywhere; }
  @media (max-width: 600px) {
    .detail { inset: auto 0 0; margin: 0; width: 100%; max-width: none; max-height: 85dvh; border-radius: 24px 24px 0 0; padding: 24px 20px calc(24px + env(safe-area-inset-bottom, 0px)); }
  }
  .mobile { display: none; padding: 0 16px 16px; }
  .days { display: flex; gap: 5px; margin-bottom: 16px; }
  .days button { flex: 1; min-width: 0; border-radius: 10px; padding: 10px 3px; border: 1px solid var(--divider-color, #d9e1e6); background: transparent; font-size: 11px; }
  .days button span { display: block; margin-top: 4px; }
  .days button[aria-pressed=true] { background: var(--primary-color, #007b83); color: var(--text-primary-color, #fff); border-color: transparent; }
  .mobile .lesson { position: static; width: 100%; height: auto; min-height: 80px; margin: 8px 0; padding: 12px; }
  .mobile .lesson strong { font-size: 15px; }
  .mobile .lesson .teacher, .mobile .lesson .meta { font-size: 12px; }
  @container (max-width: 680px) {
    .card-title { padding: 18px 16px 0; }
    h2 { font-size: 21px; }
    .toolbar { padding: 16px; gap: 10px; grid-template-columns: auto minmax(0, 1fr); }
    .student-row { grid-row: 1; grid-column: 2; }
    .period-controls { grid-row: 2; grid-column: 1 / -1; }
    .desktop { display: none; }
    .mobile { display: block; }
    footer { padding: 12px 16px 16px; }
  }
`;

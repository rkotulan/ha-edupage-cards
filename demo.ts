import './src/index';
import type { EdupageTimetableCard } from './src/index';
import type { CalendarEvent, HomeAssistant } from './src/types';
import { addDays, dateKey, initialWeek } from './src/timetable';

const zone = 'UTC';
const week = initialWeek(dateKey(new Date(), zone));
let offline = false;
const data: CalendarEvent[] = [{ start: { date: week }, end: { date: addDays(week, 1) }, summary: 'Školní volno' }];
for (let day = 1; day < 5; day++) {
  const date = addDays(week, day);
  ['Matematika', 'Český jazyk', 'Programování', 'Anglický jazyk', 'Tělesná výchova'].forEach((subject, i) => {
    const hour = String(8 + i).padStart(2, '0');
    data.push({
      start: { dateTime: `${date}T${hour}:00:00Z` },
      end: { dateTime: `${date}T${i === 4 ? '13:30' : hour + ':45'}:00Z` },
      summary: day === 3 && i === 1 ? `[Canceled] ${subject}` : subject,
      location: `U${101 + i}`, description: 'Teacher(s): Ukázkový učitel',
    });
  });
}
const card = document.querySelector('edupage-timetable-card') as EdupageTimetableCard;
card.setConfig({ type: 'custom:edupage-timetable-card', language: 'cs', entity: 'calendar.demo' });
function update() {
  card.hass = {
    language: 'cs', config: { time_zone: zone },
    states: { 'calendar.demo': { state: 'off', last_updated: String(Date.now()), attributes: { friendly_name: 'Ukázkový student' } } },
    callApi: async () => { if (offline) throw new Error('Demo offline'); return data; },
  } as HomeAssistant;
}
document.querySelector('#theme')!.addEventListener('click', () => document.body.classList.toggle('dark'));
document.querySelector('#offline')!.addEventListener('click', () => { offline = !offline; update(); });
update();

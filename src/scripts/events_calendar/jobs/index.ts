import { extractMotoekipaEvents } from '../organizers/motoekipa';
import { extractKirekEvents } from '../organizers/kirek';
import { extract3mmEvents } from '../organizers/3mm';
import { extractRobsonEvents } from '../organizers/robson';
import { ScrapedEvent } from '../common/types';
import { parsePlDate, saveJsonFile } from '../common/utils';

function dedupeEvents(events: ScrapedEvent[]): ScrapedEvent[] {
  const seen = new Set<string>();

  return events.filter((event) => {
    const key = JSON.stringify([
      event.name.toLowerCase(),
      event.date.toLowerCase(),
      event.link.toLowerCase(),
      (event.track ?? '').toLowerCase(),
    ]);

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export async function main(): Promise<ScrapedEvent[]> {
  const eventsNested: ScrapedEvent[][] = await Promise.all([
    // extractKirekEvents(),

    extractMotoekipaEvents(),
    extract3mmEvents(),
    extractRobsonEvents(),
  ]);

  const events = dedupeEvents(eventsNested.flat()).sort(
    (a: ScrapedEvent, b: ScrapedEvent) => parsePlDate(a.date) - parsePlDate(b.date),
  );

  await saveJsonFile('src/scripts/events_calendar/events/events.json', events);

  return events;
}
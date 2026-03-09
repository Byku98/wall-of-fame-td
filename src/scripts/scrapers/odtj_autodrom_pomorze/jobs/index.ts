import { extractMotoekipaEvents } from '../organizers/motoekipa';
import { extractKirekEvents } from '../organizers/kirek';
import { extract3mmEvents } from '../organizers/3mm';
import { ScrapedEvent } from '../../common/types';
import { parsePlDate, saveJsonFile } from '../../common/utils';

export async function main(): Promise<ScrapedEvent[]> {
  const eventsNested: ScrapedEvent[][] = await Promise.all([
    extractMotoekipaEvents(),
    extractKirekEvents(),
    extract3mmEvents(),
  ]);

  const events: ScrapedEvent[] = eventsNested.flat();

  const sortedEvents = events.sort(
    (a: ScrapedEvent, b: ScrapedEvent) => parsePlDate(a.date) - parsePlDate(b.date),
  );

  await saveJsonFile('src/scripts/scrapers/odtj_autodrom_pomorze/events.json', sortedEvents);

  return sortedEvents;
}
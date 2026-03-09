import { crawl } from '../../common/crawler';
import { ScrapedEvent } from '../../common/types';
import { formatDateIsoToPl, getPageContent } from '../../common/utils';

async function getTdKirekData(url: string): Promise<ScrapedEvent | null> {
  const html = await getPageContent(url);

  const dateMatch = html.match(/<strong class="start-date"[^>]*content="([^"]+)"/);
  if (!dateMatch) return null;

  const dateIso = dateMatch[1].split('T')[0];
  const date = formatDateIsoToPl(dateIso);

  const nameMatch = html.match(/<div class="event-location">\s*<strong>(.*?)<\/strong>/s);
  const hourMatch = html.match(/<span class="event-meta-value">\s*([^<]+)\s*<\/span>/);

  const name = nameMatch?.[1]?.trim() ?? '';
  const time = hourMatch?.[1]?.trim() ?? '';

  if (!name || !date || !time) return null;

  return {
    name,
    date,
    time,
    link: url,
    organizer: 'Kirek',
    track: 'ODTJ Autodrom Pomorze',
  };
}

export async function extractKirekEvents(): Promise<ScrapedEvent[]> {
  const start = 'https://trackspace.pl/events-home/';
  const allLinks = await crawl(start, 'kirek', 1);

  const events: ScrapedEvent[] = [];

  for (const link of allLinks) {
    if (!link.includes('/kirek-')) continue;

    const data = await getTdKirekData(link);
    if (data) {
      events.push(data);
    }
  }

  return events;
}
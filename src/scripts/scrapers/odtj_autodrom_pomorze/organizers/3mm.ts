import * as cheerio from 'cheerio';
import { crawl } from '../../common/crawler';
import { ScrapedEvent } from '../../common/types';
import { getPageContent } from '../../common/utils';

async function getTd3mmData(url: string): Promise<ScrapedEvent | null> {
  const html = await getPageContent(url);
  const $ = cheerio.load(html);

  const dateMatch = html.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (!dateMatch) return null;

  const [, year, month, day] = dateMatch;
  const date = `${day}.${month}.${year}`;

  const timeParagraphs = $('p')
    .map((_i, p) => $(p).text().trim())
    .get()
    .filter((text) => /\d{2}:\d{2}/.test(text));

  if (timeParagraphs.length === 0) return null;

  const firstMatch = timeParagraphs[0].match(/(\d{2}:\d{2})/);
  const lastMatch = timeParagraphs[timeParagraphs.length - 1].match(/-\s*(\d{2}:\d{2})/);

  const startTime = firstMatch?.[1] ?? '';
  const endTime = lastMatch?.[1] ?? '';

  if (!startTime || !endTime) return null;

  return {
    name: '3MM Racing Academy',
    date,
    time: `${startTime} - ${endTime}`,
    link: url,
    organizer: '3MM Racing Academy',
    track: 'ODTJ Autodrom Pomorze',
  };
}

export async function extract3mmEvents(): Promise<ScrapedEvent[]> {
  const start = 'https://3mmracingacademy.pl/track-days/';
  const allLinks = await crawl(start, '3mm', 1);

  const events: ScrapedEvent[] = [];

  for (const link of allLinks) {
    if (!link.includes('/produkt/')) continue;

    const data = await getTd3mmData(link);
    if (data) {
      events.push(data);
    }
  }

  return events;
}
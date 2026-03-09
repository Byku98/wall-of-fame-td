import * as cheerio from 'cheerio';
import { crawl } from '../../common/crawler';
import { ScrapedEvent } from '../../common/types';
import { getPageContent } from '../../common/utils';

async function getTdMeData(url: string): Promise<ScrapedEvent | null> {
  const html = await getPageContent(url);
  const $ = cheerio.load(html);

  const title = $('h2[itemprop="name"].mkdf-single-product-title').first().text().trim();
  if (!title) return null;

  const pattern = /^(.*?)\s+(\d{2}\.\d{2}\.\d{4})\s+\((\d{2}:\d{2}-\d{2}:\d{2})\)\s*(.*)$/;
  const match = title.match(pattern);

  if (!match) return null;

  return {
    name: match[1].trim(),
    date: match[2].trim(),
    time: match[3].trim(),
    link: url,
    organizer: 'Motoekipa',
    track: 'ODTJ Autodrom Pomorze',
  };
}

export async function extractMotoekipaEvents(): Promise<ScrapedEvent[]> {
  const start = 'https://www.motoekipa.pl/torowanie/';
  const allLinks = await crawl(start, 'motoekipa', 1);

  const events: ScrapedEvent[] = [];

  for (const link of allLinks) {
    if (!link.includes('/produkt/')) continue;

    const data = await getTdMeData(link);
    if (data) {
      events.push(data);
    }
  }

  return events;
}
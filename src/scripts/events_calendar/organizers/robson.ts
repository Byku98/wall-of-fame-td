import * as cheerio from 'cheerio';
import { ScrapedEvent } from '../common/types';
import {
  cleanText,
  formatDateIsoToPl,
  getPageContent,
  toAbsoluteUrl,
} from '../common/utils';

const START_URL = 'https://www.robsonmotosport.com/wydarzenia';
const SITE_ORIGIN = 'https://www.robsonmotosport.com';

function pad2(value: string): string {
  return value.padStart(2, '0');
}

function normalizeTime(value: string): string {
  const match = value.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return value.trim();

  return `${pad2(match[1])}:${match[2]}`;
}

function extractDate(html: string, text: string): string {
  const metaMatch = html.match(/content="(\d{4}-\d{2}-\d{2})(?:T[^"]*)?"/i);
  if (metaMatch) {
    return formatDateIsoToPl(metaMatch[1]);
  }

  const plMatch = text.match(/\b(\d{1,2})[./-](\d{1,2})[./-](\d{4})\b/);
  if (plMatch) {
    return `${pad2(plMatch[1])}.${pad2(plMatch[2])}.${plMatch[3]}`;
  }

  const isoMatch = text.match(/\b(\d{4})-(\d{2})-(\d{2})\b/);
  if (isoMatch) {
    return `${isoMatch[3]}.${isoMatch[2]}.${isoMatch[1]}`;
  }

  const monthMap: Record<string, string> = {
    stycznia: '01',
    lutego: '02',
    marca: '03',
    kwietnia: '04',
    maja: '05',
    czerwca: '06',
    lipca: '07',
    sierpnia: '08',
    września: '09',
    wrzesnia: '09',
    października: '10',
    pazdziernika: '10',
    listopada: '11',
    grudnia: '12',
  };

  const wordMatch = text.match(
    /\b(\d{1,2})\s+(stycznia|lutego|marca|kwietnia|maja|czerwca|lipca|sierpnia|września|wrzesnia|października|pazdziernika|listopada|grudnia)\s+(\d{4})\b/i,
  );

  if (wordMatch) {
    const day = pad2(wordMatch[1]);
    const month = monthMap[wordMatch[2].toLowerCase()];
    const year = wordMatch[3];

    if (month) {
      return `${day}.${month}.${year}`;
    }
  }

  return '';
}

function extractTime(text: string): string {
  const rangeMatch = text.match(/\b(\d{1,2}:\d{2})\s*[-–]\s*(\d{1,2}:\d{2})\b/);
  if (rangeMatch) {
    return `${normalizeTime(rangeMatch[1])} - ${normalizeTime(rangeMatch[2])}`;
  }

  const singleMatch = text.match(/\b(\d{1,2}:\d{2})\b/);
  if (singleMatch) {
    return normalizeTime(singleMatch[1]);
  }

  return '';
}

function normalizeTrackName(value: string): string {
  const source = cleanText(value).toLowerCase();

  if (!source) {
    return '';
  }

  if (
    source.includes('autodrom pomorze') ||
    source.includes('odtj autodrom pomorze')
  ) {
    return 'ODTJ Autodrom Pomorze';
  }

  if (
    source.includes('kartodrom bydgoszcz') ||
    source.includes('tor bydgoszcz')
  ) {
    return 'Kartodrom Bydgoszcz';
  }

  if (
    source.includes('autodrom biłgoraj') ||
    source.includes('autodrom bilgoraj')
  ) {
    return 'Autodrom Biłgoraj';
  }

  if (
    source.includes('tor łódź') ||
    source.includes('tor lodz')
  ) {
    return 'Tor Łódź';
  }

  if (
    source.includes('tor poznań') ||
    source.includes('tor poznan')
  ) {
    return 'Tor Poznań';
  }

  if (source.includes('slovakiaring') || source.includes('slovakia ring')) {
    return 'Slovakiaring';
  }

  if (source.includes('silesia ring')) {
    return 'Silesia Ring';
  }

  if (
    source.includes('autodrom jastrząb') ||
    source.includes('autodrom jastrzab')
  ) {
    return 'Autodrom Jastrząb';
  }

  if (source.includes('bednary')) {
    return 'Bednary';
  }

  if (source.includes('modlin')) {
    return 'Modlin';
  }

  return '';
}

function extractTrackFromRobson(name: string, url: string, text: string): string | undefined {
  const sources = [name, url, text];

  for (const source of sources) {
    const normalized = normalizeTrackName(source);
    if (normalized) {
      return normalized;
    }
  }

  return undefined;
}

function isEventLink(url: string): boolean {
  try {
    const parsed = new globalThis.URL(url);
    const pathname = parsed.pathname.toLowerCase().replace(/\/+$/, '');

    if (parsed.origin !== SITE_ORIGIN) return false;
    if (pathname === '' || pathname === '/wydarzenia') return false;
    if (/\.(jpg|jpeg|png|webp|svg|gif|pdf)$/i.test(pathname)) return false;

    const blockedPrefixes = [
      '/kontakt',
      '/o-nas',
      '/regulamin',
      '/polityka',
      '/sklep',
      '/koszyk',
      '/konto',
      '/cart',
      '/checkout',
      '/my-account',
      '/wp-content',
      '/wp-json',
      '/tag',
      '/author',
      '/category',
    ];

    if (blockedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

async function getRobsonEventLinks(): Promise<string[]> {
  const html = await getPageContent(START_URL);
  const $ = cheerio.load(html);

  const links = new Set<string>();

  $('a[href]').each((_i, element) => {
    const href = $(element).attr('href');
    if (!href) return;

    const absolute = toAbsoluteUrl(href, START_URL);
    if (!absolute) return;
    if (!isEventLink(absolute)) return;

    links.add(absolute);
  });

  return [...links];
}

async function getRobsonEventData(url: string): Promise<ScrapedEvent | null> {
  const html = await getPageContent(url);
  const $ = cheerio.load(html);

  const pageText = cleanText($('body').text());

  let name =
    cleanText($('h1').first().text()) ||
    cleanText($('h2').first().text()) ||
    cleanText($('title').text());

  name = name.replace(/\s*[\-|–]\s*Robson.*$/i, '').trim();

  const date = extractDate(html, pageText);
  const time = extractTime(pageText);
  const track = extractTrackFromRobson(name, url, pageText);

  if (!name || !date) {
    return null;
  }

  return {
    name,
    date,
    link: url,
    organizer: 'Robson Motosport',
    track,
  };
}

export async function extractRobsonEvents(): Promise<ScrapedEvent[]> {
  console.log('\nCollecting links from Robson Motosport:');

  const links = await getRobsonEventLinks();
  const events: ScrapedEvent[] = [];

  for (const link of links) {
    console.log(`Checking: ${link}`);

    try {
      const event = await getRobsonEventData(link);
      if (event) {
        events.push(event);
      }
    } catch (error) {
      console.error(`Failed to parse Robson event: ${link}`, error);
    }
  }

  return events;
}
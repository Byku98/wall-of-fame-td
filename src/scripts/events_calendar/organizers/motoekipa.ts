import * as cheerio from 'cheerio';
import { crawl } from '../common/crawler';
import { ScrapedEvent } from '../common/types';
import {
  cleanText,
  extractDateFromText,
  getPageContent,
} from '../common/utils';

const START_URL = 'https://www.motoekipa.pl/torowanie/';

function normalizeEventName(title: string): string {
  return cleanText(title)
    .replace(/^motoekipa\s*/i, '')
    .replace(/^track\s*day\s*/i, '')
    .replace(/^motoekipa\s+track\s*day\s*/i, '')
    .replace(/^szkolenie\s*/i, '')
    .replace(/\b\d{1,2}[./-]\d{1,2}[./-]\d{4}\b/g, '')
    .replace(/\b\d{4}-\d{2}-\d{2}\b/g, '')
    .replace(/\(\s*\d{1,2}:\d{2}\s*[-–]\s*\d{1,2}:\d{2}\s*\)/g, '')
    .replace(/\b\d{1,2}:\d{2}\s*[-–]\s*\d{1,2}:\d{2}\b/g, '')
    .replace(/\b\d{1,2}:\d{2}\b/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/[|,.-]\s*$/g, '')
    .trim();
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
    source.includes('tor bydgoszcz') ||
    source.includes('bydgoszcz')
  ) {
    return 'Kartodrom Bydgoszcz';
  }

  if (
    source.includes('tor poznań') ||
    source.includes('tor poznan') ||
    source === 'poznań' ||
    source === 'poznan'
  ) {
    return 'Tor Poznań';
  }

  if (
    source.includes('tor łódź') ||
    source.includes('tor lodz') ||
    source === 'łódź' ||
    source === 'lodz'
  ) {
    return 'Tor Łódź';
  }

  if (source.includes('slovakiaring') || source.includes('slovakia ring')) {
    return 'Slovakiaring';
  }

  if (source.includes('silesia ring')) {
    return 'Silesia Ring';
  }

  if (source.includes('modlin')) {
    return 'Modlin';
  }

  if (source.includes('jast') || source.includes('autodrom jastrząb') || source.includes('autodrom jastrzab')) {
    return 'Autodrom Jastrząb';
  }

  if (source.includes('bednary')) {
    return 'Bednary';
  }

  return cleanText(value);
}

function extractTrackFromTitle(title: string): string {
  const cleanedTitle = cleanText(title);

  const dateAndTimePrefixMatch = cleanedTitle.match(
    /\b\d{1,2}[./-]\d{1,2}[./-]\d{4}\b(?:\s*\(\s*\d{1,2}:\d{2}\s*[-–]\s*\d{1,2}:\d{2}\s*\))?\s+(.+)$/i,
  );

  if (dateAndTimePrefixMatch?.[1]) {
    const normalized = normalizeTrackName(dateAndTimePrefixMatch[1]);
    if (normalized) {
      return normalized;
    }
  }

  const knownTrackPatterns = [
    /\bODTJ\s+Autodrom\s+Pomorze\b/i,
    /\bAutodrom\s+Pomorze\b/i,
    /\bKartodrom\s+Bydgoszcz\b/i,
    /\bTor\s+Poznań\b/i,
    /\bTor\s+Poznan\b/i,
    /\bTor\s+Łódź\b/i,
    /\bTor\s+Lodz\b/i,
    /\bSlovakiaring\b/i,
    /\bSlovakia Ring\b/i,
    /\bSilesia Ring\b/i,
    /\bAutodrom\s+Jastrząb\b/i,
    /\bAutodrom\s+Jastrzab\b/i,
    /\bBednary\b/i,
    /\bModlin\b/i,
  ];

  for (const pattern of knownTrackPatterns) {
    const match = cleanedTitle.match(pattern);
    if (match?.[0]) {
      return normalizeTrackName(match[0]);
    }
  }

  return '';
}

function extractTrackFromUrl(url: string): string {
  const lowerUrl = url.toLowerCase();

  if (lowerUrl.includes('autodrom-pomorze')) {
    return 'ODTJ Autodrom Pomorze';
  }

  if (lowerUrl.includes('kartodrom-bydgoszcz') || lowerUrl.includes('tor-bydgoszcz')) {
    return 'Kartodrom Bydgoszcz';
  }

  if (lowerUrl.includes('tor-poznan') || lowerUrl.includes('poznan')) {
    return 'Tor Poznań';
  }

  if (lowerUrl.includes('tor-lodz') || lowerUrl.includes('lodz')) {
    return 'Tor Łódź';
  }

  if (lowerUrl.includes('slovakiaring') || lowerUrl.includes('slovakia-ring')) {
    return 'Slovakiaring';
  }

  if (lowerUrl.includes('silesia-ring')) {
    return 'Silesia Ring';
  }

  if (lowerUrl.includes('jastrzab') || lowerUrl.includes('jastrzab')) {
    return 'Autodrom Jastrząb';
  }

  if (lowerUrl.includes('bednary')) {
    return 'Bednary';
  }

  if (lowerUrl.includes('modlin')) {
    return 'Modlin';
  }

  return '';
}

function getRelevantMotoekipaText($: cheerio.CheerioAPI): string {
  const selectors = [
    'h1.product_title',
    '.summary',
    '.woocommerce-product-details__short-description',
    '.woocommerce-tabs',
    '.woocommerce-Tabs-panel',
    '.product_meta',
    'article.product',
    '.product',
    'main',
  ];

  const parts = selectors
    .map((selector) => cleanText($(selector).first().text()))
    .filter(Boolean);

  return cleanText(parts.join(' | '));
}

function extractTrackFromRelevantText(text: string): string {
  const labelledPatterns = [
    /(?:tor|miejsce|lokalizacja|obiekt|track)\s*[:\-]\s*([^|;\n]{3,100})/i,
    /(?:na torze|na obiekcie)\s*[:\-]?\s*([^|;\n]{3,100})/i,
  ];

  for (const pattern of labelledPatterns) {
    const match = text.match(pattern);
    const value = normalizeTrackName(match?.[1] ?? '');

    if (value) {
      return value;
    }
  }

  const knownTrackPatterns = [
    /\bODTJ\s+Autodrom\s+Pomorze\b/i,
    /\bAutodrom\s+Pomorze\b/i,
    /\bKartodrom\s+Bydgoszcz\b/i,
    /\bTor\s+Poznań\b/i,
    /\bTor\s+Poznan\b/i,
    /\bTor\s+Łódź\b/i,
    /\bTor\s+Lodz\b/i,
    /\bSlovakiaring\b/i,
    /\bSlovakia Ring\b/i,
    /\bSilesia Ring\b/i,
    /\bAutodrom\s+Jastrząb\b/i,
    /\bAutodrom\s+Jastrzab\b/i,
    /\bBednary\b/i,
    /\bModlin\b/i,
  ];

  for (const pattern of knownTrackPatterns) {
    const match = text.match(pattern);
    if (match?.[0]) {
      return normalizeTrackName(match[0]);
    }
  }

  return '';
}

async function getMotoekipaData(url: string): Promise<ScrapedEvent | null> {
  const html = await getPageContent(url);
  const $ = cheerio.load(html);

  const title =
    cleanText($('h1.product_title').first().text()) ||
    cleanText($('h2.mkdf-single-product-title').first().text()) ||
    cleanText($('h1').first().text()) ||
    cleanText($('title').text());

  if (!title) {
    return null;
  }

  const relevantText = getRelevantMotoekipaText($);

  const date =
    extractDateFromText(title) ||
    extractDateFromText(relevantText, html);

  const track =
    extractTrackFromTitle(title) ||
    extractTrackFromRelevantText(relevantText) ||
    extractTrackFromUrl(url) ||
    undefined;

  if (!date) {
    return null;
  }

  return {
    name: normalizeEventName(title) || title,
    date,
    link: url,
    organizer: 'Motoekipa',
    track: 'ODTJ Autodrom Pomorze', // Default track for Motoekipa if none found
  };
}

export async function extractMotoekipaEvents(): Promise<ScrapedEvent[]> {
  console.log('\nCollecting links from Motoekipa:');

  const allLinks = await crawl(START_URL, 'motoekipa', 1);
  const events: ScrapedEvent[] = [];

  for (const link of allLinks) {
    if (!link.includes('/produkt/')) {
      continue;
    }

    try {
      const data = await getMotoekipaData(link);
      if (data) {
        events.push(data);
      }
    } catch (error) {
      console.error(`Failed to parse Motoekipa event: ${link}`, error);
    }
  }

  return events;
}
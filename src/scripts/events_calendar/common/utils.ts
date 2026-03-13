import * as cheerio from 'cheerio';
import * as fs from 'fs/promises';
import * as path from 'path';

export async function getPageContent(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }

  return await response.text();
}

function normalizeUrl(url: string): string {
  try {
    const parsed = new globalThis.URL(url);

    parsed.hash = '';

    if (
      parsed.pathname.length > 1 &&
      parsed.pathname.endsWith('/')
    ) {
      parsed.pathname = parsed.pathname.slice(0, -1);
    }

    return parsed.toString();
  } catch {
    return url;
  }
}

export function toAbsoluteUrl(href: string, baseUrl: string): string | null {
  try {
    return normalizeUrl(new globalThis.URL(href, baseUrl).toString());
  } catch {
    return null;
  }
}

export async function getLinks(url: string): Promise<string[]> {
  const html = await getPageContent(url);
  const $ = cheerio.load(html);

  const links = $('a[href]')
    .map((_i, a) => {
      const href = $(a).attr('href');
      if (!href) return null;

      return toAbsoluteUrl(href, url);
    })
    .get()
    .filter((link): link is string => Boolean(link));

  return [...new Set(links)];
}

export function cleanText(value?: string | null): string {
  return (value ?? '')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function pad2(value: string): string {
  return value.padStart(2, '0');
}

export function formatDateIsoToPl(dateIso: string): string {
  const [year, month, day] = dateIso.split('-');

  if (!year || !month || !day) {
    return '';
  }

  return `${day}.${month}.${year}`;
}

export function extractDateFromText(text: string, html = ''): string {
  const normalizedText = cleanText(text);

  const htmlIsoMatch = html.match(/\b(\d{4}-\d{2}-\d{2})(?:T\d{2}:\d{2}(?::\d{2})?)?\b/);
  if (htmlIsoMatch) {
    return formatDateIsoToPl(htmlIsoMatch[1]);
  }

  const plMatch = normalizedText.match(/\b(\d{1,2})[./-](\d{1,2})[./-](\d{4})\b/);
  if (plMatch) {
    return `${pad2(plMatch[1])}.${pad2(plMatch[2])}.${plMatch[3]}`;
  }

  const isoMatch = normalizedText.match(/\b(\d{4})-(\d{2})-(\d{2})\b/);
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

  const wordMatch = normalizedText.match(
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

function cleanupTrack(value: string): string {
  return cleanText(value)
    .replace(/\b\d{1,2}[./-]\d{1,2}[./-]\d{4}\b.*$/i, '')
    .replace(/\b\d{4}-\d{2}-\d{2}\b.*$/i, '')
    .replace(/[|,;.-]\s*$/g, '')
    .trim();
}

export function extractTrackFromText(...parts: string[]): string {
  const text = cleanText(parts.filter(Boolean).join(' | '));

  const labelledPatterns = [
    /(?:tor|miejsce|lokalizacja|obiekt|track)\s*[:\-]\s*([^|;,]{3,100})/i,
    /(?:na torze|na obiekcie)\s*[:\-]?\s*([^|;,]{3,100})/i,
  ];

  for (const pattern of labelledPatterns) {
    const match = text.match(pattern);
    const value = cleanupTrack(match?.[1] ?? '');

    if (value) {
      return value;
    }
  }

  const knownPatterns = [
    /\bAutodrom\s+[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż0-9 .-]{2,60}\b/i,
    /\bTor\s+[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż0-9 .-]{2,60}\b/i,
    /\bODTJ\s+[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż0-9 .-]{2,60}\b/i,
    /\bSilesia Ring\b/i,
    /\bAutodrom Jastrząb\b/i,
    /\bJastrząb\b/i,
    /\bModlin\b/i,
    /\bBednary\b/i,
    /\bTor Poznań\b/i,
    /\bPoznań\b/i,
    /\bTor Łódź\b/i,
    /\bŁódź\b/i,
    /\bLodz\b/i,
  ];

  for (const pattern of knownPatterns) {
    const match = text.match(pattern);
    const value = cleanupTrack(match?.[0] ?? '');

    if (value) {
      return value;
    }
  }

  return '';
}

export function normalizeEventName(title: string): string {
  return cleanText(title)
    .replace(/\s*[-–|]\s*(3MM Racing Academy|Motoekipa|Robson Motosport).*$/i, '')
    .replace(/\b\d{1,2}[./-]\d{1,2}[./-]\d{4}\b/g, '')
    .replace(/\b\d{4}-\d{2}-\d{2}\b/g, '')
    .replace(/\(\s*\d{1,2}:\d{2}\s*[-–]\s*\d{1,2}:\d{2}\s*\)/g, '')
    .replace(/\b\d{1,2}:\d{2}\s*[-–]\s*\d{1,2}:\d{2}\b/g, '')
    .replace(/\b\d{1,2}:\d{2}\b/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/[|,;.-]\s*$/g, '')
    .trim();
}

export function parsePlDate(date: string): number {
  const [day, month, year] = date.split('.');

  if (!day || !month || !year) {
    return Number.MAX_SAFE_INTEGER;
  }

  return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
}

export async function saveJsonFile(relativeFilePath: string, data: unknown): Promise<void> {
  const filePath = path.resolve(process.cwd(), relativeFilePath);
  const dirPath = path.dirname(filePath);

  await fs.mkdir(dirPath, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

  console.log(`Saved JSON: ${filePath}`);
}
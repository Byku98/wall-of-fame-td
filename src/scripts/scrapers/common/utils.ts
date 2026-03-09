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

export async function getLinks(url: string): Promise<string[]> {
  const html = await getPageContent(url);
  const $ = cheerio.load(html);

  const links = $('a[href]')
    .map((_i, a) => {
      const href = $(a).attr('href');
      if (!href) return null;

      try {
        return new globalThis.URL(href, url).toString();
      } catch {
        return null;
      }
    })
    .get()
    .filter((link): link is string => Boolean(link));

  return [...new Set(links)];
}

export function formatDateIsoToPl(dateIso: string): string {
  const [year, month, day] = dateIso.split('-');
  if (!year || !month || !day) return '';
  return `${day}.${month}.${year}`;
}

export function parsePlDate(date: string): number {
  const [day, month, year] = date.split('.');
  if (!day || !month || !year) return Number.MAX_SAFE_INTEGER;

  return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
}

export async function saveJsonFile(relativeFilePath: string, data: unknown): Promise<void> {
  const filePath = path.resolve(process.cwd(), relativeFilePath);
  const dirPath = path.dirname(filePath);

  await fs.mkdir(dirPath, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

  console.log(`Saved JSON: ${filePath}`);
}

import { OrganizerFlag } from './types';
import { getLinks } from './utils';

function shouldFollowLink(link: string, organizerFlag: OrganizerFlag): boolean {
  const lower = link.toLowerCase();

  if (/\.(jpg|jpeg|png|webp|svg|gif|pdf|zip)$/i.test(lower)) {
    return false;
  }

  if (organizerFlag === 'motoekipa') {
    return lower.includes('/produkt/') || lower.includes('/torowanie/');
  }

  if (organizerFlag === 'kirek') {
    return lower.includes('/kirek-');
  }

  if (organizerFlag === '3mm') {
    return lower.includes('/produkt/') || lower.includes('/track-days/');
  }

  if (organizerFlag === 'robson') {
    return lower.includes('/wydarzenia/');
  }

  return false;
}

export async function crawl(
  startUrl: string,
  organizerFlag: OrganizerFlag,
  depth = 1,
): Promise<string[]> {
  const visited = new Set<string>();
  const toVisit: Array<{ url: string; depth: number }> = [{ url: startUrl, depth: 0 }];

  while (toVisit.length > 0) {
    const current = toVisit.shift();
    if (!current) continue;

    const { url, depth: currentDepth } = current;

    if (visited.has(url) || currentDepth > depth) {
      continue;
    }

    visited.add(url);
    console.log(`Visiting (${currentDepth}): ${url}`);

    try {
      const links = await getLinks(url);

      for (const link of links) {
        if (!visited.has(link) && shouldFollowLink(link, organizerFlag)) {
          toVisit.push({ url: link, depth: currentDepth + 1 });
        }
      }
    } catch (error) {
      console.error(`Failed: ${url}`, error);
    }
  }

  return [...visited];
}
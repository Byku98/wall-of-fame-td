import { OrganizerFlag } from './types';
import { getLinks } from './utils';

function shouldFollowLink(link: string, organizerFlag: OrganizerFlag): boolean {
  if (organizerFlag === 'motoekipa') {
    return link.includes('/produkt/');
  }

  if (organizerFlag === 'kirek') {
    return link.includes('/kirek-');
  }

  if (organizerFlag === '3mm') {
    return link.includes('-autodrom-pomorze-');
  }

  return false;
}

export async function crawl(
  startUrl: string,
  organizerFlag: OrganizerFlag,
  depth = 1,
): Promise<string[]> {
  const visited = new Set<string>();
  const toVisit: Array<{ url: string; depth: number }> = [
    { url: startUrl, depth: 0 },
  ];

  while (toVisit.length > 0) {
    const current = toVisit.shift();
    if (!current) continue;

    const { url, depth: currentDepth } = current;

    if (visited.has(url) || currentDepth > depth) {
      continue;
    }

    console.log(`Visiting (${currentDepth}): ${url}`);
    visited.add(url);

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
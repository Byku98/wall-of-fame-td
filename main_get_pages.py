import urllib.request
import re
from bs4 import BeautifulSoup
from urllib.parse import urljoin

def get_td_data(url):
    
    # extract trackday full info from name
    html = get_page_content(url)
    soup = BeautifulSoup(html, "html.parser")
    full_info = soup.find("h2", {"itemprop": "name", "class": "mkdf-single-product-title"})
    
    if full_info:
        full_info = full_info.text.strip()
        print(f"-- Full TD info is: {full_info}")
    
    match = re.match(r"(.+?)\s+(\d{2}\.\d{2}\.\d{4})\s+\(([^)]+)\)\s*(.*)?", full_info)

    if match:
        organizer = match.group(1).strip()
        date = match.group(2).strip()
        hour = match.group(3).strip()
        additional_info = match.group(4).strip() 
        if additional_info:
            return [organizer, date, hour, url, additional_info]
        else:
            return [organizer, date, hour, url]    
    
    return None


def get_page_content(url):
    """Fetch page content as text."""
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0"}
    )
    with urllib.request.urlopen(req) as response:
        return response.read().decode("utf-8", errors="ignore")

def get_links(url):
    """Return absolute links from a given page."""
    html = get_page_content(url)
    soup = BeautifulSoup(html, "html.parser")
    links = [urljoin(url, a["href"]) for a in soup.find_all("a", href=True)]
    return links

def crawl(start_url, depth=1):
    """Navigate through links recursively (like clicking)."""
    visited = set()
    to_visit = [(start_url, 0)]

    while to_visit:
        url, d = to_visit.pop(0)
        if url in visited or d > depth :
            continue

        print(f"Visiting ({d}): {url}")
        visited.add(url)

        try:
            
            print(f"Visiting ({d}): {url}")
            links = get_links(url)
            for link in links:
                if link not in visited and "/produkt/" in link:
                    to_visit.append((link, d+1))
        except Exception as e:
            print(f"  Failed: {e}")

    return visited

# Example usage:
if __name__ == "__main__":
    start = "https://www.motoekipa.pl/torowanie/"
    all_links = crawl(start, depth=1)  # depth=1 → follow 1 layer of links
    print("\nCollected links:")
    events = []
    for link in all_links:
        print(f"Checking: {link}")
        if "/produkt/" not in link:
            continue
        new_data = get_td_data(link)
        if new_data:
            events.append(new_data)
        
    print(events)
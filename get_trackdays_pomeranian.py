import urllib.request
from datetime import datetime
import re
from bs4 import BeautifulSoup
from urllib.parse import urljoin

def get_td_kirek_data(url):
    
    html = get_page_content(url)
    soup = BeautifulSoup(html, "html.parser")

    # extract date
    date_match = re.search(r'<strong class="start-date"[^>]*content="([^"]+)"', html)
    date_iso = date_match.group(1).split("T")[0]  # take YYYY-MM-DD
    dt = datetime.strptime(date_iso, "%Y-%m-%d")
    date = dt.strftime("%d.%m.%Y")

    match_name = re.search(r'<div class="event-location">\s*<strong>(.*?)</strong>', html, re.DOTALL)
    if match_name:
        name = match_name.group(1).strip()
    
    match_hour = re.search(r'<span class="event-meta-value">\s*([^<]+)\s*</span>', html)
    if match_hour:
        hour = match_hour.group(1).strip()
    
    # print(f"Specific one - name: {name}, date: {date}, and hour: {hour}")
        
    return [name, date, hour, url]

def get_td_me_data(url):
    
    # extract trackday full info from name
    html = get_page_content(url)
    soup = BeautifulSoup(html, "html.parser")
    title = soup.get_text(strip=True)

    # Regex: group 1 - organiser, group 2 - date, group 3 - hour, group 4 - additional info
    title = soup.find("h2", {"itemprop": "name", "class": "mkdf-single-product-title"})
    text = title.get_text(strip=True)
    
    print(f"Title: {title}")
    
    if title == None:
        return None
    
    pattern = r"^(.*?)\s+(\d{2}\.\d{2}\.\d{4})\s+\((\d{2}:\d{2}-\d{2}:\d{2})\)\s*(.*)$"
    match = re.match(pattern, text)

    if match:
        organiser = match.group(1)
        date = match.group(2)
        hour = match.group(3)
    
    return [organiser, date, hour, url]

def get_td_3mm_data(url):
    
    html = get_page_content(url)
    soup = BeautifulSoup(html, "html.parser")

    name = "3MM Racing Academy"

    date_match = re.search(r'(\d{4})-(\d{2})-(\d{2})', html)
    if date_match:
        year, month, day = date_match.groups()
        date = f"{day}.{month}.{year}"
    
    # Regex for HH:MM format
    time_pattern = re.compile(r"\d{2}:\d{2}")

    # Find all <p> tags that contain time
    time_paragraphs = [p.get_text(strip=True) for p in soup.find_all("p") if time_pattern.search(p.get_text())]

    # First <p> - hour before dash
    first_match = re.search(r"(\d{2}:\d{2})", time_paragraphs[0])
    start_hour = first_match.group(1) if first_match else None

    # Last <p> - hour after dash
    last_match = re.search(r"-\s*(\d{2}:\d{2})", time_paragraphs[-1])
    end_hour = last_match.group(1) if last_match else None

    hour = f"{start_hour} - {end_hour}"

    return [name, date, hour, url]

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

def crawl(start_url, organizer_flag, depth=1):
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
                if organizer_flag == "motoekipa":
                    if link not in visited and "/produkt/" in link:
                        to_visit.append((link, d+1))    
                if (organizer_flag == "kirek"):
                    if link not in visited and "/kirek-" in link:
                        to_visit.append((link, d+1))
                if (organizer_flag == "3mm"):
                    if link not in visited and "-autodrom-pomorze-" in link:
                        to_visit.append((link, d+1))    
                
                
        except Exception as e:
            print(f"  Failed: {e}")

    return visited

def extract_motoekipa_events():
    
    start = "https://www.motoekipa.pl/torowanie/"
    
    print("\nCollecing links from MotoEkipa:")
    all_links = crawl(start, "motoekipa", depth=1)  # depth=1 → follow 1 layer of links
    
    local_events = []
    for link in all_links:
        print(f"Checking: {link}")
        if "/produkt/" not in link:
            continue
        new_data = get_td_me_data(link)
        if new_data:
            local_events.append(new_data)
    return local_events

def extract_kirek_events():
    start = "https://trackspace.pl/events-home/"
    
    print("\nCollecting links from Kirek:")
    all_links = crawl(start, "kirek", depth=1)  # depth=1 → follow 1 layer of links
    
    local_events = []
    for link in all_links:
        print(f"Checking: {link}")
        if "/kirek-" not in link:
            continue
        new_data = get_td_kirek_data(link)
        if new_data:
            local_events.append(new_data)
    return local_events

def extract_3mm_events():
    start = "https://3mmracingacademy.pl/track-days/"
    
    print("\nCollecting links from 3MM Racing Academy:")
    all_links = crawl(start, "3mm", depth=1)  # depth=1 → follow 1 layer of links
    
    local_events = []
    for link in all_links:
        # print(f"Checking: {link}")
        if "/produkt/" not in link:
            continue
        new_data = get_td_3mm_data(link)
        if new_data:
            local_events.append(new_data)
    return local_events

# Example usage:
if __name__ == "__main__":
        
    events_nested = [
    extract_motoekipa_events(),
    extract_kirek_events(),
    extract_3mm_events()
    ]

    # Flatten into one 2D list
    events = [row for table in events_nested for row in table]
    
    events_sorted = sorted(events, key=lambda x: datetime.strptime(x[1], "%d.%m.%Y"))

    print(events_sorted)
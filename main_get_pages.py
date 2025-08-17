import requests

def get_page_content(url="https://www.motoekipa.pl/torowanie/"):
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()  # raise exception for HTTP errors
        return response.text
    except requests.RequestException as e:
        print(f"Error fetching page: {e}")
        return None

# Example usage:
if __name__ == "__main__":
    content = get_page_content()
    if content:
        print(content)  # print first 1000 chars
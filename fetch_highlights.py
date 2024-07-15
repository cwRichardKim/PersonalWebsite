import os
import json
import requests
from datetime import datetime

# You'll set this as an environment variable
READWISE_TOKEN = os.environ.get('READWISE_TOKEN')
API_URL = 'https://readwise.io/api/v2/highlights/'
OUTPUT_FILE = 'data/highlights.json'

def fetch_highlights():
    if not READWISE_TOKEN:
        raise ValueError("READWISE_TOKEN environment variable is not set")
    
    headers = {'Authorization': f'Token {READWISE_TOKEN}'}
    highlights = []
    next_page_cursor = None

    while True:
        params = {'page_size': 1000}
        if next_page_cursor:
            params['pageCursor'] = next_page_cursor

        response = requests.get(API_URL, headers=headers, params=params)
        response.raise_for_status()
        data = response.json()

        highlights.extend(data['results'])

        next_page_cursor = data.get('nextPageCursor')
        if not next_page_cursor:
            break

    return highlights

def filter_highlights(highlights):
    return [h for h in highlights if any(tag['name'] == 'share' for tag in h['tags'])]

def main():
    try:
        highlights = fetch_highlights()
        filtered_highlights = filter_highlights(highlights)
        with open(OUTPUT_FILE, 'w') as f:
            json.dump(filtered_highlights, f, indent=2)
        print(f"Successfully fetched {len(highlights)} highlights, filtered to {len(filtered_highlights)} and saved to {OUTPUT_FILE}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == '__main__':
    main()

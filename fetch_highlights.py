import os
import requests
from datetime import datetime
import re
import yaml

READWISE_TOKEN = os.environ.get('READWISE_TOKEN')
EXPORT_API_URL = 'https://readwise.io/api/v2/export/'
OUTPUT_DIR = '_highlights'

def fetch_exports():
    if not READWISE_TOKEN:
        raise ValueError("READWISE_TOKEN environment variable is not set")
    
    headers = {'Authorization': f'Token {READWISE_TOKEN}'}
    all_results = []
    next_page_cursor = None

    while True:
        params = {'pageCursor': next_page_cursor} if next_page_cursor else {}
        response = requests.get(EXPORT_API_URL, headers=headers, params=params)
        response.raise_for_status()
        data = response.json()

        all_results.extend(data['results'])
        next_page_cursor = data.get('nextPageCursor')
        if not next_page_cursor:
            break

    return all_results

def filter_highlights(highlights):
    return [h for h in highlights 
        if any(
            tag['name'] == 'share' or h['is_favorite']
            for tag in h.get('tags', [])
        )
    ]

def slugify(text):
    text = text.lower()
    return re.sub(r'[\W_]+', '-', text)

def create_markdown_file(highlight, book):
    try:
        book_slug = slugify(book['title'])
        highlight_date = datetime.fromisoformat(highlight['highlighted_at'].rstrip('Z'))
        date_str = highlight_date.strftime('%Y-%m-%d')
        filename = f"{date_str}-{book_slug}-{highlight.get('location', '')}.md"
        
        front_matter = {
            'layout': 'highlight',
            'title': book['title'],
            'author': book['author'],
            'category': book['category'],
            'source': book['source'],
            'highlight_id': highlight['id'],
            'book_id': book['user_book_id'],
            'book_url': book['readwise_url'],
            'source_url': book['source_url'],
            'date': highlight_date.strftime('%Y-%m-%d %H:%M:%S'),
            'note': highlight.get('note', ''),
            'is_favorite': highlight['is_favorite']
        }

        front_matter_yaml = yaml.dump(front_matter, default_flow_style=False, allow_unicode=True)
        content = highlight['text']
        
        with open(os.path.join(OUTPUT_DIR, filename), 'w', encoding='utf-8') as f:
            f.write(f"---\n{front_matter_yaml}---\n\n{content}")
    except IOError as e:
        print(f"Error writing file {filename}: {str(e)}")

def main():
    try:
        if not os.path.exists(OUTPUT_DIR):
            os.makedirs(OUTPUT_DIR)

        print("Fetching exports...")
        exports = fetch_exports()
        print(f"Fetched {len(exports)} books")

        print("Processing highlights...")
        for book in exports:
            filtered_highlights = filter_highlights(book['highlights'])
            print(f"Processing {len(filtered_highlights)} highlights for '{book['title']}'")            
            for highlight in filtered_highlights:
                create_markdown_file(highlight, book)
        
        print(f"Successfully created markdown files in {OUTPUT_DIR}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == '__main__':
    main()
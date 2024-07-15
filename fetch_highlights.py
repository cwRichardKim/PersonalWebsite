import os
import requests
from datetime import datetime
import re
import yaml

READWISE_TOKEN = os.environ.get('READWISE_TOKEN')
HIGHLIGHTS_API_URL = 'https://readwise.io/api/v2/highlights/'
BOOKS_API_URL = 'https://readwise.io/api/v2/books/'
OUTPUT_DIR = '_highlights'

def fetch_data(url):
    if not READWISE_TOKEN:
        raise ValueError("READWISE_TOKEN environment variable is not set")
    
    headers = {'Authorization': f'Token {READWISE_TOKEN}'}
    all_data = []
    next_page_cursor = None

    while True:
        params = {'page_size': 1000}
        if next_page_cursor:
            params['pageCursor'] = next_page_cursor

        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        data = response.json()

        all_data.extend(data['results'])

        next_page_cursor = data.get('nextPageCursor')
        if not next_page_cursor:
            break

    return all_data

def create_book_lookup(books):
    return {book['id']: book for book in books}

def filter_highlights(highlights):
    return [h for h in highlights if any(tag['name'] == 'share' for tag in h['tags'])]

def slugify(text):
    text = text.lower()
    return re.sub(r'[\W_]+', '-', text)

def create_markdown_file(highlight, book):
    try:
        book_slug = slugify(book.get('title', ''))
        highlight_date = datetime.fromisoformat(highlight.get('highlighted_at', '').rstrip('Z'))
        date_str = highlight_date.strftime('%Y-%m-%d')
        filename = f"{date_str}-{book_slug}-{highlight.get('location', '')}.md"
        
        front_matter = {
            'layout': 'highlight',
            'title': book.get('title', ''),
            'author': book.get('author', ''),
            'category': book.get('category', ''),
            'source': book.get('source', ''),
            'highlight_id': highlight.get('id', ''),
            'book_id': book.get('id', ''),
            'book_url': book.get('highlights_url', ''),
            'source_url': book.get('source_url', ''),
            'date': highlight_date.strftime('%Y-%m-%d %H:%M:%S'),
            'note': highlight.get('note', '')
        }

        front_matter_yaml = yaml.dump(front_matter, default_flow_style=False, allow_unicode=True)
        content = highlight.get('text', '')
        
        with open(os.path.join(OUTPUT_DIR, filename), 'w', encoding='utf-8') as f:
            f.write(f"---\n{front_matter_yaml}---\n\n{content}")
    except IOError as e:
        print(f"Error writing file {filename}: {str(e)}")

def main():
    try:
        if not os.path.exists(OUTPUT_DIR):
            os.makedirs(OUTPUT_DIR)

        print("Fetching books...")
        books = fetch_data(BOOKS_API_URL)
        book_lookup = create_book_lookup(books)
        print(f"Fetched {len(books)} books")

        print("Fetching highlights...")
        highlights = fetch_data(HIGHLIGHTS_API_URL)
        filtered_highlights = filter_highlights(highlights)
        print(f"Fetched {len(highlights)} highlights, filtered to {len(filtered_highlights)}")
        
        print("Creating markdown files...")
        for highlight in filtered_highlights:
            book = book_lookup.get(highlight['book_id'])
            if book:
                create_markdown_file(highlight, book)
            else:
                print(f"Warning: Book not found for highlight {highlight['id']}")
        
        print(f"Successfully created markdown files in {OUTPUT_DIR}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == '__main__':
    main()
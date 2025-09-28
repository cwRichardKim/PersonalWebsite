import * as fs from 'fs';
import { parseStringPromise } from 'xml2js';

interface Post {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

async function readSubstack(): Promise<Post[]> {
  const xml = fs.readFileSync('./rss.xml', 'utf-8');
  const result: any = await parseStringPromise(xml);
  const items = result?.rss?.channel?.[0]?.item || [];
  return items.map((item: any) => ({
    title: item.title?.[0] || '',
    link: item.link?.[0] || '',
    pubDate: item.pubDate?.[0] || '',
    source: 'Substack'
  }));
}

function readMedium(): Post[] {
  try {
    const raw = fs.readFileSync('./_data/medium_posts.json', 'utf-8');
    const items = JSON.parse(raw);
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

async function generatePosts(): Promise<void> {
  const substackPosts = await readSubstack();
  const mediumPosts = readMedium();
  const posts = [...substackPosts, ...mediumPosts].sort((a, b) => {
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
  });

  fs.mkdirSync('./_data', { recursive: true });
  fs.writeFileSync('./_data/posts.json', JSON.stringify(posts, null, 2));
  console.log(`Generated _data/posts.json with ${posts.length} posts`);
}

generatePosts().catch(err => {
  console.error('Error generating posts:', err);
  process.exit(1);
});

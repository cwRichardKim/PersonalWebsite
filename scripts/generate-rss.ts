import * as https from 'https';
import * as fs from 'fs';
import { parseStringPromise, Builder } from 'xml2js';

interface RSSConfig {
  SUBSTACK_URL: string;
  SITE_URL: string;
  RSS_OUTPUT: string;
  AUTHOR: string;
  TITLE: string;
  DESCRIPTION: string;
}

interface RSSItem {
  title?: string[];
  link?: string[];
  description?: string[];
  author?: string[];
  guid?: Array<{
    _: string;
    $: { isPermaLink: string };
  }>;
  pubDate?: string[];
  [key: string]: any;
}

interface RSSChannel {
  title?: string[];
  link?: string[];
  description?: string[];
  generator?: string[];
  webMaster?: string[];
  lastBuildDate?: string[];
  ttl?: string[];
  'atom:link'?: Array<{
    $: {
      href: string;
      rel?: string;
      type?: string;
    };
  }>;
  item?: RSSItem[];
  [key: string]: any;
}

interface RSSFeed {
  rss: {
    $?: any;
    channel: RSSChannel[];
  };
}

const CONFIG: RSSConfig = {
  SUBSTACK_URL: 'https://www.bootstoobig.com',
  SITE_URL: 'https://cwrichardkim.com',
  RSS_OUTPUT: './rss.xml',
  AUTHOR: 'Richard Kim',
  TITLE: "Richard Kim's Blog",
  DESCRIPTION: 'Thoughts on technology, design, and building things'
};

function fetchSubstackFeed(): Promise<string> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Request timeout after 10 seconds'));
    }, 10000);

    const req = https.get(`${CONFIG.SUBSTACK_URL}/feed`, {
      headers: {
        'User-Agent': 'cwrichardkim.com RSS Generator'
      }
    }, (res) => {
      clearTimeout(timeout);
      
      if (res.statusCode && res.statusCode >= 400) {
        reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        return;
      }

      let data = '';
      res.on('data', (chunk: Buffer) => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });

    req.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });

    req.on('timeout', () => {
      clearTimeout(timeout);
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function generateRSS(): Promise<void> {
  try {
    console.log('📡 Fetching Substack RSS feed...');
    const substackXml = await fetchSubstackFeed();
    
    console.log('🔄 Processing RSS feed...');
    
    // Parse XML to JSON for easier manipulation
    const result: RSSFeed = await parseStringPromise(substackXml);
    
    // Validate feed structure
    const channel = result?.rss?.channel?.[0];
    if (!channel) {
      throw new Error('Unexpected feed structure: missing rss.channel[0]');
    }
    
    // Update channel information to your branding
    channel.title = [CONFIG.TITLE];
    channel.link = [CONFIG.SITE_URL];
    channel.description = [CONFIG.DESCRIPTION];
    channel.lastBuildDate = [new Date().toUTCString()];
    channel.ttl = ['60'];
    
    // Update atom:link to point to your RSS
    if (channel['atom:link']?.[0]?.$) {
      channel['atom:link'][0].$.href = `${CONFIG.SITE_URL}/rss.xml`;
    }
    
    // Add custom metadata
    channel.generator = ['cwrichardkim.com RSS Generator'];
    channel.webMaster = [`hi@cwrichardkim.com (${CONFIG.AUTHOR})`];
    
    // Process each item to ensure links work correctly
    if (Array.isArray(channel.item)) {
      channel.item = channel.item.map((item: RSSItem) => {
        // Keep original Substack links for now
        // When you migrate, you can modify these to point to your own site
        
        // Add author if not present
        if (!item.author) {
          item.author = [CONFIG.AUTHOR];
        }
        
        // Ensure GUIDs are present for reader tracking
        if (!item.guid && item.link?.[0]) {
          item.guid = [{
            _: item.link[0],
            $: { isPermaLink: 'true' }
          }];
        }
        
        return item;
      });
    }
    
    // Convert back to XML
    const builder = new Builder({
      xmldec: { version: '1.0', encoding: 'UTF-8' },
      cdata: true
    });
    const xml = builder.buildObject(result);
    
    // Write to file
    fs.writeFileSync(CONFIG.RSS_OUTPUT, xml);
    console.log(`✅ RSS feed generated successfully at ${CONFIG.RSS_OUTPUT}`);
    console.log(`📝 Found ${channel.item ? channel.item.length : 0} posts`);
    
  } catch (error) {
    console.error('❌ Error generating RSS feed:', error);
    process.exit(1);
  }
}

// Run the generator
generateRSS();

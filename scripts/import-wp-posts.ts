import pg from "pg";

const DATABASE_URL = process.env.DATABASE_URL!;
const WP_API_BASE = "https://wp.thomasandwan.com/wp-json/wp/v2";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const pool = new pg.Pool({ connectionString: DATABASE_URL });

async function fetchAllPosts(): Promise<any[]> {
  const allPosts: any[] = [];
  let page = 1;
  const perPage = 20;

  while (true) {
    const url = `${WP_API_BASE}/posts?per_page=${perPage}&page=${page}`;
    console.log(`Fetching page ${page}...`);
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "ThomasWanWebsite/1.0",
      },
    });

    if (!response.ok) {
      if (response.status === 400) break;
      const text = await response.text();
      console.error(`Error fetching page ${page}: ${response.status} - ${text}`);
      break;
    }

    const posts = await response.json();
    if (!Array.isArray(posts) || posts.length === 0) break;

    allPosts.push(...posts);
    console.log(`  Got ${posts.length} posts (total: ${allPosts.length})`);

    if (posts.length < perPage) break;
    page++;
  }

  return allPosts;
}

async function fetchAllMedia(): Promise<any[]> {
  const allMedia: any[] = [];
  let page = 1;
  const perPage = 50;

  while (true) {
    const url = `${WP_API_BASE}/media?per_page=${perPage}&page=${page}`;
    console.log(`Fetching media page ${page}...`);
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "ThomasWanWebsite/1.0",
      },
    });

    if (!response.ok) {
      if (response.status === 400) break;
      const text = await response.text();
      console.error(`Error fetching media page ${page}: ${response.status} - ${text}`);
      break;
    }

    const media = await response.json();
    if (!Array.isArray(media) || media.length === 0) break;

    allMedia.push(...media);
    console.log(`  Got ${media.length} media items (total: ${allMedia.length})`);

    if (media.length < perPage) break;
    page++;
  }

  return allMedia;
}

async function importPosts(posts: any[]) {
  for (const post of posts) {
    await pool.query(
      `INSERT INTO wp_posts_cache (id, slug, date, date_gmt, status, type, link, title, content, excerpt, author, featured_media, categories, tags, cached_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW())
       ON CONFLICT (id) DO UPDATE SET
         slug = EXCLUDED.slug,
         date = EXCLUDED.date,
         date_gmt = EXCLUDED.date_gmt,
         status = EXCLUDED.status,
         type = EXCLUDED.type,
         link = EXCLUDED.link,
         title = EXCLUDED.title,
         content = EXCLUDED.content,
         excerpt = EXCLUDED.excerpt,
         author = EXCLUDED.author,
         featured_media = EXCLUDED.featured_media,
         categories = EXCLUDED.categories,
         tags = EXCLUDED.tags,
         cached_at = NOW()`,
      [
        post.id,
        post.slug,
        post.date,
        post.date_gmt,
        post.status,
        post.type,
        post.link,
        post.title?.rendered || "",
        post.content?.rendered || "",
        post.excerpt?.rendered || "",
        post.author,
        post.featured_media || 0,
        JSON.stringify(post.categories || []),
        JSON.stringify(post.tags || []),
      ]
    );
  }
  console.log(`Imported ${posts.length} posts`);
}

async function importMedia(mediaItems: any[]) {
  for (const media of mediaItems) {
    await pool.query(
      `INSERT INTO wp_media_cache (id, source_url, alt_text, media_details, cached_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (id) DO UPDATE SET
         source_url = EXCLUDED.source_url,
         alt_text = EXCLUDED.alt_text,
         media_details = EXCLUDED.media_details,
         cached_at = NOW()`,
      [
        media.id,
        media.source_url,
        media.alt_text || "",
        JSON.stringify(media.media_details || {}),
      ]
    );
  }
  console.log(`Imported ${mediaItems.length} media items`);
}

async function main() {
  try {
    console.log("Starting WordPress data import...");

    const posts = await fetchAllPosts();
    if (posts.length > 0) {
      await importPosts(posts);
    } else {
      console.log("No posts fetched from WordPress API (may be blocked). Skipping post import.");
    }

    const media = await fetchAllMedia();
    if (media.length > 0) {
      await importMedia(media);
    } else {
      console.log("No media fetched from WordPress API. Skipping media import.");
    }

    console.log("Import complete!");
  } catch (error) {
    console.error("Import error:", error);
  } finally {
    await pool.end();
  }
}

main();

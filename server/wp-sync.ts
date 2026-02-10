import { db } from "./db";
import { wpPostsCache, wpMediaCache, wpCategoriesCache } from "@shared/schema";
import { sql } from "drizzle-orm";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const WP_API_BASE = process.env.WP_API_BASE || "https://wp.thomasandwan.com/wp-json/wp/v2";

async function fetchJson(url: string): Promise<any> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`WP API error: ${res.status} ${res.statusText} for ${url}`);
  }
  return res.json();
}

async function fetchAllPaginated(endpoint: string, perPage = 100): Promise<any[]> {
  const all: any[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const url = `${WP_API_BASE}/${endpoint}?per_page=${perPage}&page=${page}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`WP API error on page ${page}: ${res.status}`);
      break;
    }
    const tp = res.headers.get("x-wp-totalpages");
    if (tp) totalPages = parseInt(tp);

    const data = await res.json();
    all.push(...data);
    console.log(`  Fetched ${endpoint} page ${page}/${totalPages} (${data.length} items)`);
    page++;
  }

  return all;
}

export async function syncWordPressCache(): Promise<void> {
  try {
    const [postCount] = await db.select({ count: sql<number>`count(*)::int` }).from(wpPostsCache);

    if (postCount.count > 0) {
      console.log(`WordPress cache already populated (${postCount.count} posts). Skipping sync.`);
      return;
    }

    console.log("WordPress cache is empty. Starting sync from live API...");

    console.log("Fetching categories...");
    const categories = await fetchAllPaginated("categories");
    if (categories.length > 0) {
      await db.insert(wpCategoriesCache).values(
        categories.map((c: any) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          count: c.count,
        }))
      ).onConflictDoNothing();
      console.log(`  Synced ${categories.length} categories`);
    }

    console.log("Fetching posts...");
    const posts = await fetchAllPaginated("posts");
    if (posts.length > 0) {
      for (const post of posts) {
        await db.insert(wpPostsCache).values({
          id: post.id,
          slug: post.slug,
          date: post.date,
          dateGmt: post.date_gmt,
          status: post.status,
          type: post.type,
          link: post.link,
          title: post.title.rendered,
          content: post.content.rendered,
          excerpt: post.excerpt.rendered,
          author: post.author,
          featuredMedia: post.featured_media || 0,
          categories: post.categories || [],
          tags: post.tags || [],
        }).onConflictDoNothing();
      }
      console.log(`  Synced ${posts.length} posts`);
    }

    console.log("Fetching media...");
    const media = await fetchAllPaginated("media");
    if (media.length > 0) {
      for (const m of media) {
        await db.insert(wpMediaCache).values({
          id: m.id,
          sourceUrl: m.source_url,
          altText: m.alt_text || "",
          mediaDetails: m.media_details || {},
        }).onConflictDoNothing();
      }
      console.log(`  Synced ${media.length} media items`);
    }

    const [finalCount] = await db.select({ count: sql<number>`count(*)::int` }).from(wpPostsCache);
    console.log(`WordPress cache sync complete! ${finalCount.count} posts in database.`);
  } catch (error) {
    console.error("Error syncing WordPress cache:", error);
    console.log("The app will continue but blog content may be unavailable until sync succeeds.");
  }
}

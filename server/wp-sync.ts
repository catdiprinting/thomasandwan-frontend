import { db } from "./db";
import { wpPostsCache, wpMediaCache, wpCategoriesCache, wpPagesCache } from "@shared/schema";
import { sql, eq } from "drizzle-orm";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const WP_API_BASE = process.env.WP_API_BASE || "https://wp.thomasandwan.com/wp-json/wp/v2";

async function fetchAllPaginated(endpoint: string, params = "", perPage = 100): Promise<any[]> {
  const all: any[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const separator = params ? "&" : "";
    const url = `${WP_API_BASE}/${endpoint}?per_page=${perPage}&page=${page}${separator}${params}`;
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

function postToRow(post: any) {
  return {
    id: post.id,
    slug: post.slug,
    date: post.date,
    dateGmt: post.date_gmt,
    modified: post.modified || "",
    modifiedGmt: post.modified_gmt || "",
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
    cachedAt: new Date(),
  };
}

function pageToRow(page: any) {
  return {
    id: page.id,
    slug: page.slug,
    date: page.date,
    dateGmt: page.date_gmt,
    modified: page.modified || "",
    modifiedGmt: page.modified_gmt || "",
    status: page.status,
    title: page.title.rendered,
    content: page.content.rendered,
    excerpt: page.excerpt?.rendered || "",
    author: page.author,
    featuredMedia: page.featured_media || 0,
    parent: page.parent || 0,
    menuOrder: page.menu_order || 0,
    cachedAt: new Date(),
  };
}

export async function syncWordPressCache(): Promise<void> {
  try {
    const [postCount] = await db.select({ count: sql<number>`count(*)::int` }).from(wpPostsCache);
    const [pageCount] = await db.select({ count: sql<number>`count(*)::int` }).from(wpPagesCache);

    if (postCount.count > 0 && pageCount.count > 0) {
      console.log(`WordPress cache already populated (${postCount.count} posts, ${pageCount.count} pages). Skipping full sync.`);
      return;
    }

    if (postCount.count > 0 && pageCount.count === 0) {
      console.log(`Posts cached but pages missing. Syncing pages...`);
      const pages = await fetchAllPaginated("pages");
      if (pages.length > 0) {
        for (const page of pages) {
          await db.insert(wpPagesCache).values(pageToRow(page)).onConflictDoNothing();
        }
        console.log(`  Synced ${pages.length} pages`);
      }
      return;
    }

    console.log("WordPress cache is empty. Starting full sync from live API...");
    await fullSync();
  } catch (error) {
    console.error("Error syncing WordPress cache:", error);
    console.log("The app will continue but blog content may be unavailable until sync succeeds.");
  }
}

async function fullSync(): Promise<void> {
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
      await db.insert(wpPostsCache).values(postToRow(post)).onConflictDoNothing();
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

  console.log("Fetching pages...");
  const pages = await fetchAllPaginated("pages");
  if (pages.length > 0) {
    for (const page of pages) {
      await db.insert(wpPagesCache).values(pageToRow(page)).onConflictDoNothing();
    }
    console.log(`  Synced ${pages.length} pages`);
  }

  const [finalCount] = await db.select({ count: sql<number>`count(*)::int` }).from(wpPostsCache);
  const [pageCount] = await db.select({ count: sql<number>`count(*)::int` }).from(wpPagesCache);
  console.log(`WordPress cache sync complete! ${finalCount.count} posts, ${pageCount.count} pages in database.`);
}

export async function refreshWordPressCache(): Promise<{ postsUpdated: number; postsCreated: number; mediaUpdated: number; categoriesUpdated: number; pagesUpdated: number; pagesCreated: number }> {
  const result = { postsUpdated: 0, postsCreated: 0, mediaUpdated: 0, categoriesUpdated: 0, pagesUpdated: 0, pagesCreated: 0 };

  try {
    console.log("Refreshing WordPress cache — checking for updates...");

    console.log("Refreshing categories...");
    const categories = await fetchAllPaginated("categories");
    for (const c of categories) {
      const existing = await db.select().from(wpCategoriesCache).where(eq(wpCategoriesCache.id, c.id));
      if (existing.length > 0) {
        await db.update(wpCategoriesCache).set({
          name: c.name,
          slug: c.slug,
          count: c.count,
          cachedAt: new Date(),
        }).where(eq(wpCategoriesCache.id, c.id));
        result.categoriesUpdated++;
      } else {
        await db.insert(wpCategoriesCache).values({
          id: c.id,
          name: c.name,
          slug: c.slug,
          count: c.count,
        });
        result.categoriesUpdated++;
      }
    }
    console.log(`  Refreshed ${result.categoriesUpdated} categories`);

    console.log("Refreshing posts...");
    const posts = await fetchAllPaginated("posts");
    for (const post of posts) {
      const existing = await db.select({ id: wpPostsCache.id, modified: wpPostsCache.modified }).from(wpPostsCache).where(eq(wpPostsCache.id, post.id));

      if (existing.length > 0) {
        const wpModified = post.modified || "";
        if (wpModified !== existing[0].modified) {
          await db.update(wpPostsCache).set(postToRow(post)).where(eq(wpPostsCache.id, post.id));
          result.postsUpdated++;
          console.log(`  Updated post: "${post.title.rendered}" (modified ${wpModified})`);
        }
      } else {
        await db.insert(wpPostsCache).values(postToRow(post));
        result.postsCreated++;
        console.log(`  New post: "${post.title.rendered}"`);
      }
    }
    console.log(`  Posts: ${result.postsUpdated} updated, ${result.postsCreated} new`);

    console.log("Refreshing media...");
    const media = await fetchAllPaginated("media");
    for (const m of media) {
      const existing = await db.select({ id: wpMediaCache.id }).from(wpMediaCache).where(eq(wpMediaCache.id, m.id));
      if (existing.length > 0) {
        await db.update(wpMediaCache).set({
          sourceUrl: m.source_url,
          altText: m.alt_text || "",
          mediaDetails: m.media_details || {},
          cachedAt: new Date(),
        }).where(eq(wpMediaCache.id, m.id));
      } else {
        await db.insert(wpMediaCache).values({
          id: m.id,
          sourceUrl: m.source_url,
          altText: m.alt_text || "",
          mediaDetails: m.media_details || {},
        });
      }
      result.mediaUpdated++;
    }
    console.log(`  Refreshed ${result.mediaUpdated} media items`);

    console.log("Refreshing pages...");
    const pages = await fetchAllPaginated("pages");
    for (const page of pages) {
      const existing = await db.select({ id: wpPagesCache.id, modified: wpPagesCache.modified }).from(wpPagesCache).where(eq(wpPagesCache.id, page.id));

      if (existing.length > 0) {
        const wpModified = page.modified || "";
        if (wpModified !== existing[0].modified) {
          await db.update(wpPagesCache).set(pageToRow(page)).where(eq(wpPagesCache.id, page.id));
          result.pagesUpdated++;
          console.log(`  Updated page: "${page.title.rendered}" (modified ${wpModified})`);
        }
      } else {
        await db.insert(wpPagesCache).values(pageToRow(page));
        result.pagesCreated++;
        console.log(`  New page: "${page.title.rendered}"`);
      }
    }
    console.log(`  Pages: ${result.pagesUpdated} updated, ${result.pagesCreated} new`);

    console.log("WordPress cache refresh complete!");
    return result;
  } catch (error) {
    console.error("Error refreshing WordPress cache:", error);
    throw error;
  }
}

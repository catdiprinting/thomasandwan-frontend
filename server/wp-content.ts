import { db } from "./db";
import { wpPostsCache, wpPagesCache, wpMediaCache } from "@shared/schema";
import { eq } from "drizzle-orm";
import { log } from "./index";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const WP_BASE_URL = process.env.WP_BASE_URL || "https://wp.thomasandwan.com";
const WP_API = `${WP_BASE_URL}/wp-json/wp/v2`;
const CACHE_TTL = parseInt(process.env.CACHE_TTL_SECONDS || "30", 10) * 1000;

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const memoryCache = new Map<string, CacheEntry<any>>();

function cacheKey(type: "post" | "page", slug: string): string {
  return `${type}:${slug}`;
}

function getCached<T>(key: string): T | null {
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    memoryCache.delete(key);
    log(`[wp-content] TTL expired for "${key}", purged from memory cache`, "wp-content");
    return null;
  }
  return entry.data;
}

function setCache<T>(key: string, data: T): void {
  memoryCache.set(key, { data, expiresAt: Date.now() + CACHE_TTL });
  log(`[wp-content] Cached "${key}" (TTL ${CACHE_TTL / 1000}s)`, "wp-content");
}

export function purgeCache(key: string): boolean {
  const existed = memoryCache.has(key);
  memoryCache.delete(key);
  if (existed) {
    log(`[wp-content] Purged "${key}" from memory cache`, "wp-content");
  }
  return existed;
}

export function purgeCacheBySlug(type: "post" | "page", slug: string): boolean {
  return purgeCache(cacheKey(type, slug));
}

export function purgeAllCache(): void {
  const size = memoryCache.size;
  memoryCache.clear();
  log(`[wp-content] Purged entire memory cache (${size} entries)`, "wp-content");
}

export function getCacheStats(): { size: number; keys: string[] } {
  return { size: memoryCache.size, keys: Array.from(memoryCache.keys()) };
}

async function fetchFromWP(endpoint: string): Promise<any | null> {
  const url = `${WP_API}/${endpoint}`;
  log(`[wp-content] Fetching from WordPress: ${url}`, "wp-content");
  try {
    const res = await fetch(url);
    if (!res.ok) {
      log(`[wp-content] WP API error: ${res.status} for ${url}`, "wp-content");
      return null;
    }
    const data = await res.json();
    log(`[wp-content] WP fetch success: ${url}`, "wp-content");
    return data;
  } catch (err: any) {
    log(`[wp-content] WP fetch failed: ${err.message}`, "wp-content");
    return null;
  }
}

export async function getPostBySlug(slug: string): Promise<any | null> {
  const key = cacheKey("post", slug);

  const cached = getCached(key);
  if (cached) {
    log(`[wp-content] Memory cache HIT for post "${slug}"`, "wp-content");
    return cached;
  }
  log(`[wp-content] Memory cache MISS for post "${slug}"`, "wp-content");

  const dbRows = await db.select().from(wpPostsCache).where(eq(wpPostsCache.slug, slug)).limit(1);
  if (dbRows.length > 0) {
    const post = dbRows[0];
    setCache(key, post);
    log(`[wp-content] Served post "${slug}" from DB cache`, "wp-content");
    return post;
  }

  const wpData = await fetchFromWP(`posts?slug=${encodeURIComponent(slug)}&_embed`);
  if (wpData && Array.isArray(wpData) && wpData.length > 0) {
    const post = wpData[0];
    const row = {
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
    await db.insert(wpPostsCache).values(row).onConflictDoUpdate({
      target: wpPostsCache.id,
      set: row,
    });
    setCache(key, row);
    log(`[wp-content] Fetched post "${slug}" from WP API and cached in DB + memory`, "wp-content");
    return row;
  }

  log(`[wp-content] Post "${slug}" not found anywhere`, "wp-content");
  return null;
}

export async function getPageBySlug(slug: string): Promise<any | null> {
  const key = cacheKey("page", slug);

  const cached = getCached(key);
  if (cached) {
    log(`[wp-content] Memory cache HIT for page "${slug}"`, "wp-content");
    return cached;
  }
  log(`[wp-content] Memory cache MISS for page "${slug}"`, "wp-content");

  const dbRows = await db.select().from(wpPagesCache).where(eq(wpPagesCache.slug, slug)).limit(1);
  const dbPage = dbRows.length > 0 ? dbRows[0] : null;

  const wpCheck = await fetchFromWP(`pages?slug=${encodeURIComponent(slug)}&_fields=id,modified`);
  if (wpCheck && Array.isArray(wpCheck) && wpCheck.length > 0) {
    const wpModified = wpCheck[0].modified || "";
    const dbModified = dbPage?.modified || "";

    if (dbPage && wpModified === dbModified) {
      setCache(key, dbPage);
      log(`[wp-content] Page "${slug}" unchanged (modified: ${wpModified}), served from DB cache`, "wp-content");
      return dbPage;
    }

    log(`[wp-content] Page "${slug}" changed (WP: ${wpModified}, DB: ${dbModified}), fetching full content...`, "wp-content");
    const wpData = await fetchFromWP(`pages?slug=${encodeURIComponent(slug)}&_embed`);
    if (wpData && Array.isArray(wpData) && wpData.length > 0) {
      const page = wpData[0];
      const row = {
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
      await db.insert(wpPagesCache).values(row).onConflictDoUpdate({
        target: wpPagesCache.id,
        set: row,
      });
      setCache(key, row);
      log(`[wp-content] Updated page "${slug}" from WP API (new content cached)`, "wp-content");
      return row;
    }
  }

  if (dbPage) {
    setCache(key, dbPage);
    log(`[wp-content] WP API unreachable for page "${slug}", served from DB cache (fallback)`, "wp-content");
    return dbPage;
  }

  log(`[wp-content] Page "${slug}" not found anywhere`, "wp-content");
  return null;
}

export async function warmSlug(type: "post" | "page", slug: string): Promise<boolean> {
  log(`[wp-content] Warming cache for ${type} "${slug}"...`, "wp-content");

  const endpoint = type === "post" ? "posts" : "pages";
  const wpData = await fetchFromWP(`${endpoint}?slug=${encodeURIComponent(slug)}&_embed`);

  if (!wpData || !Array.isArray(wpData) || wpData.length === 0) {
    log(`[wp-content] Warm failed: ${type} "${slug}" not found in WordPress`, "wp-content");
    return false;
  }

  const item = wpData[0];

  if (type === "post") {
    const row = {
      id: item.id,
      slug: item.slug,
      date: item.date,
      dateGmt: item.date_gmt,
      modified: item.modified || "",
      modifiedGmt: item.modified_gmt || "",
      status: item.status,
      type: item.type,
      link: item.link,
      title: item.title.rendered,
      content: item.content.rendered,
      excerpt: item.excerpt.rendered,
      author: item.author,
      featuredMedia: item.featured_media || 0,
      categories: item.categories || [],
      tags: item.tags || [],
      cachedAt: new Date(),
    };
    await db.insert(wpPostsCache).values(row).onConflictDoUpdate({
      target: wpPostsCache.id,
      set: row,
    });
    setCache(cacheKey("post", slug), row);
  } else {
    const row = {
      id: item.id,
      slug: item.slug,
      date: item.date,
      dateGmt: item.date_gmt,
      modified: item.modified || "",
      modifiedGmt: item.modified_gmt || "",
      status: item.status,
      title: item.title.rendered,
      content: item.content.rendered,
      excerpt: item.excerpt?.rendered || "",
      author: item.author,
      featuredMedia: item.featured_media || 0,
      parent: item.parent || 0,
      menuOrder: item.menu_order || 0,
      cachedAt: new Date(),
    };
    await db.insert(wpPagesCache).values(row).onConflictDoUpdate({
      target: wpPagesCache.id,
      set: row,
    });
    setCache(cacheKey("page", slug), row);
  }

  log(`[wp-content] Cache warmed for ${type} "${slug}" (DB + memory)`, "wp-content");
  return true;
}

export async function purgeAndWarm(type: "post" | "page", slug: string): Promise<{ purged: boolean; warmed: boolean }> {
  log(`[wp-content] === PURGE & WARM: ${type} "${slug}" ===`, "wp-content");

  const purged = purgeCacheBySlug(type, slug);

  if (type === "post") {
    await db.delete(wpPostsCache).where(eq(wpPostsCache.slug, slug));
    log(`[wp-content] Deleted post "${slug}" from DB cache`, "wp-content");
  } else {
    await db.delete(wpPagesCache).where(eq(wpPagesCache.slug, slug));
    log(`[wp-content] Deleted page "${slug}" from DB cache`, "wp-content");
  }

  const warmed = await warmSlug(type, slug);

  log(`[wp-content] === PURGE & WARM COMPLETE: ${type} "${slug}" — purged=${purged}, warmed=${warmed} ===`, "wp-content");
  return { purged, warmed };
}

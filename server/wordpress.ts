import { db } from "./db";
import { wpPostsCache, wpMediaCache, wpCategoriesCache, wpPagesCache } from "@shared/schema";
import { eq, desc, inArray, sql, ilike, and } from "drizzle-orm";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const WP_API_BASE = process.env.WP_API_BASE || "https://wp.thomasandwan.com/wp-json/wp/v2";

export interface WPPost {
  id: number;
  date: string;
  date_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt: { rendered: string; protected: boolean };
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
}

export interface WPPage {
  id: number;
  date: string;
  date_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt: { rendered: string; protected: boolean };
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  yoast_head_json?: {
    title?: string;
    description?: string;
    og_title?: string;
    og_description?: string;
    og_image?: { url: string }[];
    canonical?: string;
    schema?: object;
  };
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    sizes?: Record<string, { source_url: string; width: number; height: number }>;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface WPAuthor {
  id: number;
  name: string;
  slug: string;
  avatar_urls?: Record<string, string>;
}

const LIVE_DOMAIN = "https://thomasandwan.catdi.com";
const WP_DOMAINS = [
  "https://wp.thomasandwan.com",
  "http://wp.thomasandwan.com",
  "https://www.thomasandwan.com",
  "http://www.thomasandwan.com",
  "https://thomasandwan.com",
  "http://thomasandwan.com",
];

function rewriteUrls(html: string): string {
  let result = html;
  for (const domain of WP_DOMAINS) {
    result = result.replaceAll(domain, LIVE_DOMAIN);
  }
  return result;
}

function dbPostToWPPost(row: typeof wpPostsCache.$inferSelect): WPPost {
  return {
    id: row.id,
    date: row.date,
    date_gmt: row.dateGmt,
    slug: row.slug,
    status: row.status,
    type: row.type,
    link: rewriteUrls(row.link),
    title: { rendered: row.title },
    content: { rendered: rewriteUrls(row.content), protected: false },
    excerpt: { rendered: rewriteUrls(row.excerpt), protected: false },
    author: row.author,
    featured_media: row.featuredMedia,
    categories: (row.categories as number[]) || [],
    tags: (row.tags as number[]) || [],
  };
}

function dbPageToWPPage(row: typeof wpPagesCache.$inferSelect): WPPage {
  return {
    id: row.id,
    date: row.date,
    date_gmt: row.dateGmt,
    slug: row.slug,
    status: row.status,
    type: "page",
    link: rewriteUrls(`https://wp.thomasandwan.com/${row.slug}/`),
    title: { rendered: row.title },
    content: { rendered: rewriteUrls(row.content), protected: false },
    excerpt: { rendered: rewriteUrls(row.excerpt), protected: false },
    author: row.author,
    featured_media: row.featuredMedia,
    parent: row.parent,
    menu_order: row.menuOrder,
  };
}

function dbMediaToWPMedia(row: typeof wpMediaCache.$inferSelect): WPMedia {
  return {
    id: row.id,
    source_url: row.sourceUrl,
    alt_text: row.altText,
    media_details: (row.mediaDetails as any) || { width: 0, height: 0 },
  };
}

export async function fetchPosts(params?: {
  per_page?: number;
  page?: number;
  categories?: number[];
  search?: string;
}): Promise<WPPost[]> {
  const perPage = params?.per_page || 10;
  const page = params?.page || 1;
  const offset = (page - 1) * perPage;

  let query = db.select().from(wpPostsCache).orderBy(desc(wpPostsCache.date));

  const conditions: any[] = [];
  if (params?.categories?.length) {
    conditions.push(
      sql`${wpPostsCache.categories} ?| array[${sql.join(params.categories.map(c => sql`${String(c)}`), sql`, `)}]`
    );
  }

  const rows = await db.select().from(wpPostsCache)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(wpPostsCache.date))
    .limit(perPage)
    .offset(offset);

  return rows.map(dbPostToWPPost);
}

export async function fetchPostsWithPagination(params?: {
  per_page?: number;
  page?: number;
}): Promise<{ posts: WPPost[]; totalPages: number; total: number }> {
  const perPage = params?.per_page || 10;
  const page = params?.page || 1;
  const offset = (page - 1) * perPage;

  const [rows, countResult] = await Promise.all([
    db.select().from(wpPostsCache)
      .orderBy(desc(wpPostsCache.date))
      .limit(perPage)
      .offset(offset),
    db.select({ count: sql<number>`count(*)::int` }).from(wpPostsCache),
  ]);

  const total = countResult[0]?.count || 0;
  const totalPages = Math.ceil(total / perPage);

  return {
    posts: rows.map(dbPostToWPPost),
    totalPages,
    total,
  };
}

export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  const rows = await db.select().from(wpPostsCache)
    .where(eq(wpPostsCache.slug, slug))
    .limit(1);

  return rows[0] ? dbPostToWPPost(rows[0]) : null;
}

export async function fetchPostById(id: number): Promise<WPPost | null> {
  const rows = await db.select().from(wpPostsCache)
    .where(eq(wpPostsCache.id, id))
    .limit(1);

  return rows[0] ? dbPostToWPPost(rows[0]) : null;
}

export async function fetchPages(params?: {
  per_page?: number;
  page?: number;
  parent?: number;
}): Promise<WPPage[]> {
  const rows = await db.select().from(wpPagesCache);
  return rows.map(dbPageToWPPage);
}

export async function fetchPageBySlug(slug: string): Promise<WPPage | null> {
  const rows = await db.select().from(wpPagesCache)
    .where(eq(wpPagesCache.slug, slug))
    .limit(1);
  return rows[0] ? dbPageToWPPage(rows[0]) : null;
}

export async function fetchPageWithMedia(slug: string): Promise<(WPPage & { featured_image?: WPMedia }) | null> {
  const page = await fetchPageBySlug(slug);
  if (!page) return null;
  if (page.featured_media) {
    const media = await fetchMedia(page.featured_media);
    return { ...page, featured_image: media || undefined };
  }
  return page;
}

export async function fetchMedia(id: number): Promise<WPMedia | null> {
  const rows = await db.select().from(wpMediaCache)
    .where(eq(wpMediaCache.id, id))
    .limit(1);

  return rows[0] ? dbMediaToWPMedia(rows[0]) : null;
}

export async function fetchCategories(): Promise<WPCategory[]> {
  const rows = await db.select().from(wpCategoriesCache);
  return rows.map(row => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    count: row.count,
  }));
}

export async function fetchAuthor(id: number): Promise<WPAuthor | null> {
  return {
    id: 1,
    name: "Thomas & Wan",
    slug: "thomas-wan",
  };
}

export async function fetchCategoriesByIds(ids: number[]): Promise<WPCategory[]> {
  if (ids.length === 0) return [];
  const rows = await db.select().from(wpCategoriesCache)
    .where(inArray(wpCategoriesCache.id, ids));
  return rows.map(row => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    count: row.count,
  }));
}

export async function fetchPostsWithMedia(params?: {
  per_page?: number;
  page?: number;
}): Promise<(WPPost & { featured_image?: WPMedia })[]> {
  const posts = await fetchPosts(params);

  const postsWithMedia = await Promise.all(
    posts.map(async (post) => {
      if (post.featured_media) {
        const media = await fetchMedia(post.featured_media);
        return { ...post, featured_image: media || undefined };
      }
      return post;
    })
  );

  return postsWithMedia;
}

export async function fetchAuthorBySlug(slug: string): Promise<WPAuthor | null> {
  return {
    id: 1,
    name: "Thomas & Wan",
    slug: "thomas-wan",
  };
}

export async function fetchCategoryBySlug(slug: string): Promise<WPCategory | null> {
  const rows = await db.select().from(wpCategoriesCache)
    .where(eq(wpCategoriesCache.slug, slug))
    .limit(1);
  return rows[0] ? {
    id: rows[0].id,
    name: rows[0].name,
    slug: rows[0].slug,
    count: rows[0].count,
  } : null;
}

export async function fetchPostsByAuthor(authorId: number, params?: {
  per_page?: number;
  page?: number;
}): Promise<WPPost[]> {
  const perPage = params?.per_page || 10;
  const page = params?.page || 1;
  const offset = (page - 1) * perPage;

  const rows = await db.select().from(wpPostsCache)
    .where(eq(wpPostsCache.author, authorId))
    .orderBy(desc(wpPostsCache.date))
    .limit(perPage)
    .offset(offset);

  return rows.map(dbPostToWPPost);
}

export async function fetchPostsByCategory(categoryId: number, params?: {
  per_page?: number;
  page?: number;
}): Promise<WPPost[]> {
  const perPage = params?.per_page || 10;
  const page = params?.page || 1;
  const offset = (page - 1) * perPage;

  const rows = await db.select().from(wpPostsCache)
    .where(sql`${wpPostsCache.categories} @> ${JSON.stringify([categoryId])}::jsonb`)
    .orderBy(desc(wpPostsCache.date))
    .limit(perPage)
    .offset(offset);

  return rows.map(dbPostToWPPost);
}

export async function fetchPostsByAuthorWithMedia(authorId: number, params?: {
  per_page?: number;
  page?: number;
}): Promise<(WPPost & { featured_image?: WPMedia })[]> {
  const posts = await fetchPostsByAuthor(authorId, params);

  const postsWithMedia = await Promise.all(
    posts.map(async (post) => {
      if (post.featured_media) {
        const media = await fetchMedia(post.featured_media);
        return { ...post, featured_image: media || undefined };
      }
      return post;
    })
  );

  return postsWithMedia;
}

export async function fetchPostsByCategoryWithMedia(categoryId: number, params?: {
  per_page?: number;
  page?: number;
}): Promise<(WPPost & { featured_image?: WPMedia })[]> {
  const posts = await fetchPostsByCategory(categoryId, params);

  const postsWithMedia = await Promise.all(
    posts.map(async (post) => {
      if (post.featured_media) {
        const media = await fetchMedia(post.featured_media);
        return { ...post, featured_image: media || undefined };
      }
      return post;
    })
  );

  return postsWithMedia;
}

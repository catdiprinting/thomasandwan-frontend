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

export async function fetchPosts(params?: {
  per_page?: number;
  page?: number;
  categories?: number[];
  search?: string;
}): Promise<WPPost[]> {
  const searchParams = new URLSearchParams();
  if (params?.per_page) searchParams.set("per_page", String(params.per_page));
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.categories?.length) searchParams.set("categories", params.categories.join(","));
  if (params?.search) searchParams.set("search", params.search);

  const url = `${WP_API_BASE}/posts?${searchParams.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.status}`);
  }
  return response.json();
}

export async function fetchPostsWithPagination(params?: {
  per_page?: number;
  page?: number;
}): Promise<{ posts: WPPost[]; totalPages: number; total: number }> {
  const searchParams = new URLSearchParams();
  if (params?.per_page) searchParams.set("per_page", String(params.per_page));
  if (params?.page) searchParams.set("page", String(params.page));

  const url = `${WP_API_BASE}/posts?${searchParams.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.status}`);
  }
  const posts = await response.json();
  const totalPages = parseInt(response.headers.get("X-WP-TotalPages") || "1", 10);
  const total = parseInt(response.headers.get("X-WP-Total") || "0", 10);
  return { posts, totalPages, total };
}

export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  const url = `${WP_API_BASE}/posts?slug=${encodeURIComponent(slug)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${response.status}`);
  }
  const posts: WPPost[] = await response.json();
  return posts[0] || null;
}

export async function fetchPostById(id: number): Promise<WPPost | null> {
  const url = `${WP_API_BASE}/posts/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Failed to fetch post: ${response.status}`);
  }
  return response.json();
}

export async function fetchPages(params?: {
  per_page?: number;
  page?: number;
  parent?: number;
}): Promise<WPPage[]> {
  const searchParams = new URLSearchParams();
  if (params?.per_page) searchParams.set("per_page", String(params.per_page));
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.parent !== undefined) searchParams.set("parent", String(params.parent));

  const url = `${WP_API_BASE}/pages?${searchParams.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch pages: ${response.status}`);
  }
  return response.json();
}

export async function fetchPageBySlug(slug: string): Promise<WPPage | null> {
  const url = `${WP_API_BASE}/pages?slug=${encodeURIComponent(slug)}&_embed`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch page: ${response.status}`);
  }
  const pages: WPPage[] = await response.json();
  return pages[0] || null;
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
  const url = `${WP_API_BASE}/media/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Failed to fetch media: ${response.status}`);
  }
  return response.json();
}

export async function fetchCategories(): Promise<WPCategory[]> {
  const url = `${WP_API_BASE}/categories?per_page=100`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }
  return response.json();
}

export async function fetchAuthor(id: number): Promise<WPAuthor | null> {
  const url = `${WP_API_BASE}/users/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Failed to fetch author: ${response.status}`);
  }
  return response.json();
}

export async function fetchCategoriesByIds(ids: number[]): Promise<WPCategory[]> {
  if (ids.length === 0) return [];
  const url = `${WP_API_BASE}/categories?include=${ids.join(",")}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }
  return response.json();
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
  const url = `${WP_API_BASE}/users?slug=${encodeURIComponent(slug)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch author: ${response.status}`);
  }
  const authors: WPAuthor[] = await response.json();
  return authors[0] || null;
}

export async function fetchCategoryBySlug(slug: string): Promise<WPCategory | null> {
  const url = `${WP_API_BASE}/categories?slug=${encodeURIComponent(slug)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch category: ${response.status}`);
  }
  const categories: WPCategory[] = await response.json();
  return categories[0] || null;
}

export async function fetchPostsByAuthor(authorId: number, params?: {
  per_page?: number;
  page?: number;
}): Promise<WPPost[]> {
  const searchParams = new URLSearchParams();
  searchParams.set("author", String(authorId));
  if (params?.per_page) searchParams.set("per_page", String(params.per_page));
  if (params?.page) searchParams.set("page", String(params.page));

  const url = `${WP_API_BASE}/posts?${searchParams.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch posts by author: ${response.status}`);
  }
  return response.json();
}

export async function fetchPostsByCategory(categoryId: number, params?: {
  per_page?: number;
  page?: number;
}): Promise<WPPost[]> {
  const searchParams = new URLSearchParams();
  searchParams.set("categories", String(categoryId));
  if (params?.per_page) searchParams.set("per_page", String(params.per_page));
  if (params?.page) searchParams.set("page", String(params.page));

  const url = `${WP_API_BASE}/posts?${searchParams.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch posts by category: ${response.status}`);
  }
  return response.json();
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

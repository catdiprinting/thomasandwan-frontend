const WP_API_URL = process.env.WORDPRESS_API_URL || 'https://www.thomasandwan.com/wp-json/wp/v2';

export interface WPPost {
  id: number;
  date: string;
  modified: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  slug: string;
  categories: number[];
  _embedded?: {
    author?: Array<{ name: string }>;
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text?: string }>;
  };
  yoast_head_json?: {
    title?: string;
    description?: string;
    canonical?: string;
    og_title?: string;
    og_description?: string;
    og_image?: Array<{ url: string }>;
  };
}

export interface WPPage {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  yoast_head_json?: {
    title?: string;
    description?: string;
    canonical?: string;
    og_title?: string;
    og_description?: string;
    og_image?: Array<{ url: string }>;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export async function fetchPosts(
  page = 1, 
  perPage = 12, 
  category?: number
): Promise<{ posts: WPPost[]; total: number; totalPages: number }> {
  let url = `${WP_API_URL}/posts?_embed&page=${page}&per_page=${perPage}`;
  if (category) {
    url += `&categories=${category}`;
  }
  
  const response = await fetch(url, { next: { revalidate: 300 } });
  
  if (!response.ok) {
    return { posts: [], total: 0, totalPages: 0 };
  }
  
  const posts = await response.json();
  const total = parseInt(response.headers.get('X-WP-Total') || '0');
  const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0');
  
  return { posts, total, totalPages };
}

export async function fetchPost(slug: string): Promise<WPPost | null> {
  const response = await fetch(
    `${WP_API_URL}/posts?_embed&slug=${encodeURIComponent(slug)}`,
    { next: { revalidate: 60 } }
  );
  
  if (!response.ok) return null;
  
  const posts = await response.json();
  return posts[0] || null;
}

export async function fetchPage(slug: string): Promise<WPPage | null> {
  const response = await fetch(
    `${WP_API_URL}/pages?_embed&slug=${encodeURIComponent(slug)}`,
    { next: { revalidate: 60 } }
  );
  
  if (!response.ok) return null;
  
  const pages = await response.json();
  return pages[0] || null;
}

export async function fetchPages(): Promise<WPPage[]> {
  const response = await fetch(
    `${WP_API_URL}/pages?per_page=100`,
    { next: { revalidate: 300 } }
  );
  
  if (!response.ok) return [];
  
  return response.json();
}

export async function fetchCategories(): Promise<WPCategory[]> {
  const response = await fetch(
    `${WP_API_URL}/categories?per_page=100`,
    { next: { revalidate: 300 } }
  );
  
  if (!response.ok) return [];
  
  return response.json();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
}

export function getAuthorName(post: WPPost): string {
  return post._embedded?.author?.[0]?.name || 'Thomas & Wan';
}

export function getCategoryName(post: WPPost): string {
  return post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized';
}

export function getFeaturedImage(post: WPPost): string | null {
  return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
}

export function getSeoData(content: WPPost | WPPage) {
  const yoast = content.yoast_head_json;
  return {
    title: yoast?.title || stripHtml(content.title.rendered),
    description: yoast?.description || stripHtml(content.excerpt.rendered).substring(0, 160),
    canonical: yoast?.canonical,
    ogTitle: yoast?.og_title,
    ogDescription: yoast?.og_description,
    ogImage: yoast?.og_image?.[0]?.url,
  };
}

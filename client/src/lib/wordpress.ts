const WP_API_URL = import.meta.env.VITE_WORDPRESS_API_URL || 'https://www.thomasandwan.com/wp-json/wp/v2';

export interface WPPost {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  slug: string;
  categories: number[];
  _embedded?: {
    author?: Array<{ name: string }>;
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
}

export interface WPPage {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  slug: string;
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export async function fetchPosts(page = 1, perPage = 12, category?: number): Promise<{ posts: WPPost[]; total: number; totalPages: number }> {
  let url = `${WP_API_URL}/posts?_embed&page=${page}&per_page=${perPage}`;
  if (category) {
    url += `&categories=${category}`;
  }
  
  const response = await fetch(url);
  const posts = await response.json();
  const total = parseInt(response.headers.get('X-WP-Total') || '0');
  const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0');
  
  return { posts, total, totalPages };
}

export async function fetchPost(slug: string): Promise<WPPost | null> {
  const response = await fetch(`${WP_API_URL}/posts?_embed&slug=${slug}`);
  const posts = await response.json();
  return posts[0] || null;
}

export async function fetchPage(slug: string): Promise<WPPage | null> {
  const response = await fetch(`${WP_API_URL}/pages?slug=${slug}`);
  const pages = await response.json();
  return pages[0] || null;
}

export async function fetchCategories(): Promise<WPCategory[]> {
  const response = await fetch(`${WP_API_URL}/categories?per_page=100`);
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
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

export function getAuthorName(post: WPPost): string {
  return post._embedded?.author?.[0]?.name || 'Thomas & Wan';
}

export function getCategoryName(post: WPPost): string {
  return post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized';
}

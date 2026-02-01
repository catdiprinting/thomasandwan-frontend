import { fetchPosts, fetchPostBySlug, fetchMedia, fetchPostsWithMedia, type WPPost } from "./wordpress";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

const BASE_STYLES = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Lato', system-ui, sans-serif; line-height: 1.7; color: #334155; background: #fff; }
  .container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
  .nav { background: #1F2937; padding: 20px; }
  .nav-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
  .nav a { color: #fff; text-decoration: none; font-weight: bold; }
  .nav-links { display: flex; gap: 24px; }
  .nav-links a { color: rgba(255,255,255,0.8); font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; }
  .nav-links a:hover { color: #F59E0B; }
  .hero { background: #1F2937; color: #fff; padding: 60px 20px; text-align: center; }
  .hero h1 { font-family: 'Playfair Display', Georgia, serif; font-size: 2.5rem; margin-bottom: 16px; }
  .hero p { color: rgba(255,255,255,0.8); font-size: 1.125rem; }
  .meta { font-size: 0.875rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; }
  h1, h2, h3 { font-family: 'Playfair Display', Georgia, serif; color: #1F2937; }
  .post-title { font-size: 2.5rem; margin-bottom: 24px; line-height: 1.2; }
  .featured-image { width: 100%; height: auto; margin-bottom: 32px; border-radius: 8px; }
  .content { font-size: 1.125rem; }
  .content p { margin-bottom: 1.5em; }
  .content h2, .content h3 { margin-top: 2em; margin-bottom: 1em; }
  .content h2 { font-size: 1.75rem; }
  .content h3 { font-size: 1.5rem; }
  .content ul, .content ol { margin-bottom: 1.5em; padding-left: 1.5em; }
  .content li { margin-bottom: 0.5em; }
  .content a { color: #F59E0B; text-decoration: underline; }
  .content img { max-width: 100%; height: auto; margin: 1.5em 0; border-radius: 8px; }
  .cta { background: #1F2937; color: #fff; padding: 40px; margin-top: 48px; text-align: center; border-radius: 8px; }
  .cta h3 { font-size: 1.5rem; margin-bottom: 16px; }
  .cta p { color: rgba(255,255,255,0.8); margin-bottom: 24px; }
  .cta a { display: inline-block; background: #F59E0B; color: #fff; padding: 16px 32px; text-decoration: none; text-transform: uppercase; font-weight: bold; letter-spacing: 0.1em; font-size: 0.875rem; border-radius: 4px; }
  .cta a:hover { background: #D97706; }
  .back-link { display: inline-flex; align-items: center; gap: 8px; color: #1F2937; font-weight: bold; text-decoration: none; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 24px; }
  .back-link:hover { color: #F59E0B; }
  .posts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 32px; max-width: 1200px; margin: 0 auto; padding: 40px 20px; }
  .post-card { text-decoration: none; color: inherit; }
  .post-card:hover .post-card-title { color: #F59E0B; }
  .post-card-image { width: 100%; aspect-ratio: 16/10; object-fit: cover; background: #f1f5f9; margin-bottom: 16px; border-radius: 8px; }
  .post-card-date { font-size: 0.75rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }
  .post-card-title { font-family: 'Playfair Display', Georgia, serif; font-size: 1.5rem; color: #1F2937; margin-bottom: 12px; transition: color 0.2s; }
  .post-card-excerpt { color: #64748b; line-height: 1.6; }
  .footer { background: #1F2937; color: #fff; padding: 40px 20px; text-align: center; margin-top: 60px; }
  .footer p { color: rgba(255,255,255,0.6); font-size: 0.875rem; }
`;

function wrapInLayout(content: string, title: string, description: string, ogImage?: string): string {
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const image = ogImage || "/images/partners-hero.jpg";
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeTitle} | Thomas & Wan</title>
  <meta name="description" content="${safeDesc}">
  <meta property="og:title" content="${safeTitle}">
  <meta property="og:description" content="${safeDesc}">
  <meta property="og:type" content="article">
  <meta property="og:image" content="${image}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${safeTitle}">
  <meta name="twitter:description" content="${safeDesc}">
  <meta name="twitter:image" content="${image}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
  <style>${BASE_STYLES}</style>
</head>
<body>
  <nav class="nav">
    <div class="nav-inner">
      <a href="/">Thomas & Wan</a>
      <div class="nav-links">
        <a href="/about">About</a>
        <a href="/cases-we-handle">Cases</a>
        <a href="/blog">Blog</a>
        <a href="/contact">Contact</a>
      </div>
    </div>
  </nav>
  ${content}
  <footer class="footer">
    <p>&copy; ${new Date().getFullYear()} Thomas & Wan LLP. All rights reserved.</p>
  </footer>
</body>
</html>`;
}

export async function renderBlogPost(slug: string): Promise<string | null> {
  const post = await fetchPostBySlug(slug);
  if (!post) return null;

  let featuredImageHtml = "";
  let ogImage: string | undefined;
  if (post.featured_media) {
    const media = await fetchMedia(post.featured_media);
    if (media) {
      featuredImageHtml = `<img src="${media.source_url}" alt="${escapeHtml(media.alt_text || post.title.rendered)}" class="featured-image">`;
      ogImage = media.source_url;
    }
  }

  const excerpt = stripHtml(post.excerpt.rendered).slice(0, 160);
  const date = formatDate(post.date);

  const content = `
    <article class="container">
      <a href="/blog" class="back-link">← Back to Blog</a>
      <div class="meta">${date}</div>
      <h1 class="post-title">${post.title.rendered}</h1>
      ${featuredImageHtml}
      <div class="content">
        ${post.content.rendered}
      </div>
      <div class="cta">
        <h3>Talk to an Attorney</h3>
        <p>If you believe medical negligence played a role in your situation, reach out for a free consultation.</p>
        <a href="/contact">Contact Thomas & Wan</a>
      </div>
    </article>
  `;

  return wrapInLayout(content, stripHtml(post.title.rendered), excerpt, ogImage);
}

export async function renderBlogIndex(): Promise<string> {
  const posts = await fetchPostsWithMedia({ per_page: 12 });

  const postsHtml = posts.map((post: WPPost & { featured_image?: { source_url: string; alt_text?: string } }) => {
    const excerpt = stripHtml(post.excerpt.rendered).slice(0, 150) + "...";
    const date = formatDate(post.date);
    const imageUrl = post.featured_image?.source_url || "";
    const imageHtml = imageUrl 
      ? `<img src="${imageUrl}" alt="${escapeHtml(stripHtml(post.title.rendered))}" class="post-card-image">`
      : `<div class="post-card-image"></div>`;

    return `
      <a href="/blog/${post.slug}" class="post-card">
        ${imageHtml}
        <div class="post-card-date">${date}</div>
        <h2 class="post-card-title">${post.title.rendered}</h2>
        <p class="post-card-excerpt">${escapeHtml(excerpt)}</p>
      </a>
    `;
  }).join("");

  const content = `
    <div class="hero">
      <h1>Blog</h1>
      <p>Stay informed with our latest articles on medical malpractice and your legal rights.</p>
    </div>
    <div class="posts-grid">
      ${postsHtml}
    </div>
  `;

  return wrapInLayout(
    content, 
    "Blog - Medical Malpractice Articles", 
    "Read the latest articles from Thomas & Wan about medical malpractice, birth injuries, and your legal rights."
  );
}

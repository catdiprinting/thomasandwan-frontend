import { 
  fetchPosts, 
  fetchPostBySlug, 
  fetchMedia, 
  fetchCategories,
  fetchAuthor,
  fetchCategoriesByIds,
  fetchAuthorBySlug,
  fetchPostsByAuthorWithMedia,
  fetchPostsByCategoryWithMedia,
  type WPPost, 
  type WPAuthor, 
  type WPCategory,
  type WPMedia 
} from "./wordpress";
import * as fs from "fs";
import * as path from "path";

const SITE_URL = "https://thomasandwan.com";
const SITE_NAME = "Thomas & Wan LLP";

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

function generateSchemaOrg(post: WPPost, author?: WPAuthor, featuredImage?: string): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": stripHtml(post.title.rendered),
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": author?.name || "Thomas & Wan"
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/images/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`
    },
    ...(featuredImage && { "image": featuredImage })
  };
  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}

function generatePostHtml(
  post: WPPost, 
  author?: WPAuthor, 
  categories?: WPCategory[], 
  featuredImage?: WPMedia
): string {
  const title = stripHtml(post.title.rendered);
  const description = stripHtml(post.excerpt.rendered).substring(0, 160);
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = featuredImage?.source_url || `${SITE_URL}/images/partners-hero.jpg`;
  
  const categoryTags = categories?.map(cat => 
    `<meta property="article:tag" content="${escapeHtml(cat.name)}">`
  ).join('\n  ') || '';

  const categoryLinks = categories?.map(cat => 
    `<a href="/category/${cat.slug}" class="category-tag">${escapeHtml(cat.name)}</a>`
  ).join(' ') || '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} | ${SITE_NAME}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonicalUrl}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:site_name" content="${SITE_NAME}">
  ${author ? `<meta property="article:author" content="${escapeHtml(author.name)}">` : ''}
  <meta property="article:published_time" content="${post.date}">
  ${categoryTags}
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${imageUrl}">
  
  <!-- Schema.org -->
  ${generateSchemaOrg(post, author, imageUrl)}
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Lato', system-ui, sans-serif; line-height: 1.8; color: #334155; background: #fff; }
    .container { max-width: 800px; margin: 0 auto; padding: 0 20px; }
    .nav { background: #1F2937; padding: 20px; }
    .nav-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .nav a { color: #fff; text-decoration: none; font-weight: bold; }
    .nav-links { display: flex; gap: 24px; }
    .nav-links a { color: rgba(255,255,255,0.8); font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; }
    .nav-links a:hover { color: #F59E0B; }
    .hero { background: #1F2937; color: #fff; padding: 60px 20px; }
    .hero h1 { font-family: 'Playfair Display', Georgia, serif; font-size: 2.5rem; margin-bottom: 16px; line-height: 1.2; }
    .meta { font-size: 0.875rem; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 0.05em; }
    .meta a { color: #F59E0B; text-decoration: none; }
    .meta a:hover { text-decoration: underline; }
    .categories { margin-top: 16px; }
    .category-tag { display: inline-block; background: rgba(245,158,11,0.2); color: #F59E0B; padding: 4px 12px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; margin-right: 8px; text-decoration: none; }
    .category-tag:hover { background: #F59E0B; color: #fff; }
    .content { padding: 48px 20px; }
    .featured-image { width: 100%; height: auto; margin-bottom: 32px; }
    .article-body { font-size: 1.125rem; }
    .article-body p { margin-bottom: 1.5em; }
    .article-body h2 { font-family: 'Playfair Display', Georgia, serif; font-size: 1.75rem; color: #1F2937; margin-top: 2em; margin-bottom: 1em; }
    .article-body h3 { font-family: 'Playfair Display', Georgia, serif; font-size: 1.5rem; color: #1F2937; margin-top: 1.5em; margin-bottom: 0.75em; }
    .article-body ul, .article-body ol { margin-bottom: 1.5em; padding-left: 1.5em; }
    .article-body li { margin-bottom: 0.5em; }
    .article-body a { color: #F59E0B; text-decoration: underline; }
    .article-body img { max-width: 100%; height: auto; margin: 1.5em 0; }
    .article-body blockquote { border-left: 4px solid #F59E0B; padding-left: 20px; margin: 1.5em 0; font-style: italic; color: #64748b; }
    .cta { background: #1F2937; color: #fff; padding: 48px; margin-top: 48px; text-align: center; }
    .cta h3 { font-family: 'Playfair Display', Georgia, serif; font-size: 1.75rem; margin-bottom: 16px; }
    .cta p { color: rgba(255,255,255,0.8); margin-bottom: 24px; max-width: 500px; margin-left: auto; margin-right: auto; }
    .cta .btn { display: inline-block; background: #F59E0B; color: #fff; padding: 16px 32px; text-decoration: none; text-transform: uppercase; font-weight: bold; letter-spacing: 0.1em; font-size: 0.875rem; }
    .cta .btn:hover { background: #D97706; }
    .footer { background: #1F2937; color: rgba(255,255,255,0.6); padding: 40px 20px; text-align: center; font-size: 0.875rem; }
    .footer a { color: #F59E0B; text-decoration: none; }
    @media (max-width: 768px) {
      .hero h1 { font-size: 1.75rem; }
      .nav-links { display: none; }
    }
  </style>
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

  <header class="hero">
    <div class="container">
      <div class="meta">
        <span>${formatDate(post.date)}</span>
        ${author ? ` · <a href="/author/${author.slug}">${escapeHtml(author.name)}</a>` : ''}
      </div>
      <h1>${post.title.rendered}</h1>
      ${categories && categories.length > 0 ? `
      <div class="categories">
        ${categoryLinks}
      </div>
      ` : ''}
    </div>
  </header>

  <main class="content">
    <div class="container">
      ${featuredImage ? `<img src="${featuredImage.source_url}" alt="${escapeHtml(featuredImage.alt_text || title)}" class="featured-image">` : ''}
      <article class="article-body">
        ${post.content.rendered}
      </article>

      <div class="cta">
        <h3>Talk to an Attorney</h3>
        <p>If you believe medical negligence played a role in your situation, reach out for a free consultation.</p>
        <a href="/contact" class="btn">Contact Thomas & Wan</a>
      </div>
    </div>
  </main>

  <footer class="footer">
    <p>&copy; ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.</p>
    <p><a href="tel:713-529-1177">(713) 529-1177</a> · <a href="mailto:info@thomasandwan.com">info@thomasandwan.com</a></p>
  </footer>
</body>
</html>`;
}

function generateCategoryHtml(category: WPCategory, posts: (WPPost & { featured_image?: WPMedia })[]): string {
  const title = `${category.name} Articles`;
  const description = `Browse ${category.count} articles about ${category.name}. Learn about your legal rights from Thomas & Wan.`;
  const canonicalUrl = `${SITE_URL}/category/${category.slug}`;

  const postsHtml = posts.map(post => `
    <a href="/blog/${post.slug}" class="post-card">
      ${post.featured_image ? `<img src="${post.featured_image.source_url}" alt="${escapeHtml(post.featured_image.alt_text || stripHtml(post.title.rendered))}" class="post-image">` : `<div class="post-image-placeholder">No image</div>`}
      <div class="post-meta">${formatDate(post.date)}</div>
      <h3 class="post-title">${post.title.rendered}</h3>
      <p class="post-excerpt">${stripHtml(post.excerpt.rendered).substring(0, 120)}...</p>
    </a>
  `).join('');

  return generateListingPage(title, description, canonicalUrl, postsHtml, `${category.count} articles`);
}

function generateAuthorHtml(author: WPAuthor, posts: (WPPost & { featured_image?: WPMedia })[]): string {
  const title = `Articles by ${author.name}`;
  const description = `Read ${posts.length} articles by ${author.name} on medical malpractice and birth injuries.`;
  const canonicalUrl = `${SITE_URL}/author/${author.slug}`;

  const postsHtml = posts.map(post => `
    <a href="/blog/${post.slug}" class="post-card">
      ${post.featured_image ? `<img src="${post.featured_image.source_url}" alt="${escapeHtml(post.featured_image.alt_text || stripHtml(post.title.rendered))}" class="post-image">` : `<div class="post-image-placeholder">No image</div>`}
      <div class="post-meta">${formatDate(post.date)}</div>
      <h3 class="post-title">${post.title.rendered}</h3>
      <p class="post-excerpt">${stripHtml(post.excerpt.rendered).substring(0, 120)}...</p>
    </a>
  `).join('');

  return generateListingPage(title, description, canonicalUrl, postsHtml, `${posts.length} articles`);
}

function generateListingPage(title: string, description: string, canonicalUrl: string, postsHtml: string, subtitle: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} | ${SITE_NAME}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonicalUrl}">
  
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:site_name" content="${SITE_NAME}">
  
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Lato', system-ui, sans-serif; line-height: 1.7; color: #334155; background: #fff; }
    .nav { background: #1F2937; padding: 20px; }
    .nav-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .nav a { color: #fff; text-decoration: none; font-weight: bold; }
    .nav-links { display: flex; gap: 24px; }
    .nav-links a { color: rgba(255,255,255,0.8); font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; }
    .hero { background: #1F2937; color: #fff; padding: 60px 20px; text-align: center; }
    .hero h1 { font-family: 'Playfair Display', Georgia, serif; font-size: 2.5rem; margin-bottom: 12px; }
    .hero p { color: rgba(255,255,255,0.7); }
    .container { max-width: 1200px; margin: 0 auto; padding: 48px 20px; }
    .posts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 32px; }
    .post-card { text-decoration: none; color: inherit; }
    .post-card:hover .post-title { color: #F59E0B; }
    .post-image { width: 100%; aspect-ratio: 16/10; object-fit: cover; background: #f1f5f9; margin-bottom: 16px; }
    .post-image-placeholder { width: 100%; aspect-ratio: 16/10; background: #f1f5f9; display: flex; align-items: center; justify-content: center; color: #94a3b8; margin-bottom: 16px; }
    .post-meta { font-size: 0.75rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }
    .post-title { font-family: 'Playfair Display', Georgia, serif; font-size: 1.25rem; color: #1F2937; margin-bottom: 8px; transition: color 0.2s; }
    .post-excerpt { color: #64748b; font-size: 0.9rem; line-height: 1.6; }
    .footer { background: #1F2937; color: rgba(255,255,255,0.6); padding: 40px 20px; text-align: center; font-size: 0.875rem; margin-top: 48px; }
    .footer a { color: #F59E0B; text-decoration: none; }
    @media (max-width: 768px) {
      .hero h1 { font-size: 1.75rem; }
      .nav-links { display: none; }
    }
  </style>
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

  <header class="hero">
    <h1>${escapeHtml(title)}</h1>
    <p>${subtitle}</p>
  </header>

  <main class="container">
    <div class="posts-grid">
      ${postsHtml}
    </div>
  </main>

  <footer class="footer">
    <p>&copy; ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.</p>
    <p><a href="tel:713-529-1177">(713) 529-1177</a></p>
  </footer>
</body>
</html>`;
}

function generateSitemap(urls: string[]): string {
  const urlEntries = urls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlEntries}
</urlset>`;
}

export async function exportStaticSite(outputDir: string): Promise<{ success: boolean; files: string[]; errors: string[] }> {
  const files: string[] = [];
  const errors: string[] = [];

  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.mkdirSync(path.join(outputDir, 'blog'), { recursive: true });
    fs.mkdirSync(path.join(outputDir, 'category'), { recursive: true });
    fs.mkdirSync(path.join(outputDir, 'author'), { recursive: true });

    const allUrls: string[] = [];

    console.log('Fetching all posts...');
    const posts = await fetchPosts({ per_page: 100 });
    console.log(`Found ${posts.length} posts`);

    for (const post of posts) {
      try {
        const [featured_image, author, post_categories] = await Promise.all([
          post.featured_media ? fetchMedia(post.featured_media) : Promise.resolve(undefined),
          post.author ? fetchAuthor(post.author) : Promise.resolve(null),
          post.categories?.length ? fetchCategoriesByIds(post.categories) : Promise.resolve([]),
        ]);

        const html = generatePostHtml(post, author || undefined, post_categories, featured_image || undefined);
        const filePath = path.join(outputDir, 'blog', `${post.slug}.html`);
        fs.writeFileSync(filePath, html);
        files.push(`blog/${post.slug}.html`);
        allUrls.push(`${SITE_URL}/blog/${post.slug}`);
        console.log(`Exported: blog/${post.slug}.html`);
      } catch (err) {
        errors.push(`Failed to export post ${post.slug}: ${err}`);
        console.error(`Error exporting post ${post.slug}:`, err);
      }
    }

    console.log('Fetching categories...');
    const categories = await fetchCategories();
    for (const category of categories) {
      try {
        const categoryPosts = await fetchPostsByCategoryWithMedia(category.id, { per_page: 50 });
        const html = generateCategoryHtml(category, categoryPosts);
        const filePath = path.join(outputDir, 'category', `${category.slug}.html`);
        fs.writeFileSync(filePath, html);
        files.push(`category/${category.slug}.html`);
        allUrls.push(`${SITE_URL}/category/${category.slug}`);
        console.log(`Exported: category/${category.slug}.html`);
      } catch (err) {
        errors.push(`Failed to export category ${category.slug}: ${err}`);
        console.error(`Error exporting category ${category.slug}:`, err);
      }
    }

    console.log('Fetching authors...');
    const authorSlugs = ['admin'];
    for (const authorSlug of authorSlugs) {
      try {
        const author = await fetchAuthorBySlug(authorSlug);
        if (author) {
          const authorPosts = await fetchPostsByAuthorWithMedia(author.id, { per_page: 50 });
          const html = generateAuthorHtml(author, authorPosts);
          const filePath = path.join(outputDir, 'author', `${author.slug}.html`);
          fs.writeFileSync(filePath, html);
          files.push(`author/${author.slug}.html`);
          allUrls.push(`${SITE_URL}/author/${author.slug}`);
          console.log(`Exported: author/${author.slug}.html`);
        }
      } catch (err) {
        errors.push(`Failed to export author ${authorSlug}: ${err}`);
        console.error(`Error exporting author ${authorSlug}:`, err);
      }
    }

    const sitemap = generateSitemap(allUrls);
    fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemap);
    files.push('sitemap.xml');
    console.log('Generated sitemap.xml');

    const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Static Export Index | ${SITE_NAME}</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
    h1 { color: #1F2937; }
    ul { list-style: none; padding: 0; }
    li { padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
    a { color: #F59E0B; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .section { margin-top: 24px; }
    .section h2 { font-size: 1.25rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }
  </style>
</head>
<body>
  <h1>Static Export - ${new Date().toLocaleDateString()}</h1>
  <p>Total files exported: ${files.length}</p>
  
  <div class="section">
    <h2>Blog Posts (${posts.length})</h2>
    <ul>
      ${posts.map(p => `<li><a href="blog/${p.slug}.html">${stripHtml(p.title.rendered)}</a></li>`).join('')}
    </ul>
  </div>
  
  <div class="section">
    <h2>Categories (${categories.length})</h2>
    <ul>
      ${categories.map(c => `<li><a href="category/${c.slug}.html">${c.name}</a> (${c.count})</li>`).join('')}
    </ul>
  </div>
  
  <div class="section">
    <h2>Resources</h2>
    <ul>
      <li><a href="sitemap.xml">sitemap.xml</a></li>
    </ul>
  </div>
</body>
</html>`;
    fs.writeFileSync(path.join(outputDir, 'index.html'), indexHtml);
    files.push('index.html');

    return { success: true, files, errors };
  } catch (err) {
    errors.push(`Export failed: ${err}`);
    return { success: false, files, errors };
  }
}

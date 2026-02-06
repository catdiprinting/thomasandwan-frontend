import { fetchPosts, fetchPostBySlug, fetchMedia, fetchPostsWithMedia, fetchAuthor, fetchAuthorBySlug, fetchCategoryBySlug, fetchCategoriesByIds, fetchPostsByAuthorWithMedia, fetchPostsByCategoryWithMedia, type WPPost, type WPAuthor, type WPCategory, type WPMedia } from "./wordpress";

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

function processContent(html: string): string {
  let processed = html;
  
  processed = processed.replace(/href="https?:\/\/wp\.thomasandwan\.com\//g, 'href="/blog/');
  processed = processed.replace(/href="https?:\/\/thomasandwan\.com\/test\//g, 'href="/blog/');
  
  processed = processed.replace(/<li>\s*<\/li>/g, '');
  
  processed = processed.replace(
    /(<h2[^>]*>[\s\S]*?<\/h2>)\s*(<p>[\s\S]*?<\/p>)/g,
    (match, heading, firstPara) => {
      return `${heading}\n<div class="key-point"><p>${stripHtml(firstPara)}</p></div>`;
    }
  );
  
  return processed;
}

const BASE_STYLES = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Lato', system-ui, sans-serif; line-height: 1.7; color: #334155; background: #fff; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
  .container-narrow { max-width: 800px; margin: 0 auto; padding: 0 20px; }
  .nav { background: #1F2937; padding: 20px; position: fixed; top: 0; left: 0; right: 0; z-index: 50; }
  .nav-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
  .nav a { color: #fff; text-decoration: none; font-weight: bold; }
  .nav-links { display: flex; gap: 24px; }
  .nav-links a { color: rgba(255,255,255,0.8); font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; }
  .nav-links a:hover { color: #F59E0B; }
  .hero { background: #1F2937; color: #fff; padding: 100px 20px 60px; }
  .hero-home { min-height: 90vh; display: flex; align-items: center; padding-top: 80px; background: #fff; }
  .hero h1 { font-family: 'Playfair Display', Georgia, serif; font-size: 2.5rem; margin-bottom: 16px; line-height: 1.1; }
  .hero p { color: rgba(255,255,255,0.8); font-size: 1.125rem; }
  .section { padding: 80px 20px; }
  .section-light { background: #fff; }
  .section-alt { background: #F9F7F5; }
  .section-dark { background: #1F2937; color: #fff; }
  .meta { font-size: 0.875rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; }
  h1, h2, h3 { font-family: 'Playfair Display', Georgia, serif; color: #1F2937; }
  .text-secondary { color: #F59E0B; }
  .post-title { font-size: 2.5rem; margin-bottom: 24px; line-height: 1.2; }
  .featured-image { width: 100%; height: auto; margin-bottom: 32px; border-radius: 8px; }
  .content { font-size: 1.125rem; }
  .content p { margin-bottom: 1.5em; }
  .content h2, .content h3 { margin-top: 2em; margin-bottom: 1em; }
  .content h2 { font-size: 1.75rem; border-bottom: 2px solid #F59E0B; padding-bottom: 12px; }
  .content h3 { font-size: 1.5rem; padding-left: 16px; border-left: 4px solid #F59E0B; }
  .content ul, .content ol { margin-bottom: 1.5em; padding-left: 1.5em; }
  .content li { margin-bottom: 0.5em; }
  .content a { color: #B45309; text-decoration: underline; }
  .content a:hover { color: #F59E0B; }
  .content img { max-width: 100%; height: auto; margin: 1.5em 0; border-radius: 8px; }
  .content figure { margin: 2em 0; }
  .content figure img { margin: 0; }
  .content figcaption { font-size: 0.875rem; color: #64748b; text-align: center; margin-top: 8px; font-style: italic; }
  .content blockquote { border-left: 4px solid #F59E0B; padding: 16px 24px; margin: 2em 0; background: #FFFBEB; font-style: italic; color: #92400E; border-radius: 0 8px 8px 0; }
  .content .wp-block-heading strong { color: #1F2937; }
  .content .wp-block-list { background: #f8fafc; padding: 20px 20px 20px 40px; border-radius: 8px; border: 1px solid #e2e8f0; }
  .content .wp-block-list li { padding: 4px 0; }
  .content .wp-block-image { text-align: center; }
  .info-box { background: linear-gradient(135deg, #1F2937 0%, #374151 100%); color: #fff; padding: 32px; margin: 2em 0; border-radius: 8px; }
  .info-box h4 { font-family: 'Playfair Display', Georgia, serif; font-size: 1.25rem; color: #F59E0B; margin-bottom: 16px; }
  .info-box p { color: rgba(255,255,255,0.85); margin-bottom: 0; }
  .key-point { background: #FFFBEB; border: 1px solid #FDE68A; padding: 20px 24px; margin: 2em 0; border-radius: 8px; display: flex; gap: 16px; align-items: flex-start; }
  .key-point::before { content: "⚖️"; font-size: 1.5rem; flex-shrink: 0; }
  .key-point p { margin: 0; color: #92400E; font-weight: 500; }
  .stat-highlight { display: flex; gap: 24px; flex-wrap: wrap; margin: 2em 0; }
  .stat-box { flex: 1; min-width: 150px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 24px; text-align: center; border-radius: 8px; }
  .stat-box .number { font-size: 2rem; font-family: 'Playfair Display', Georgia, serif; color: #F59E0B; font-weight: 700; }
  .stat-box .label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; margin-top: 4px; }
  .cta { background: #1F2937; color: #fff; padding: 40px; margin-top: 48px; text-align: center; border-radius: 8px; }
  .cta h3 { font-size: 1.5rem; margin-bottom: 16px; color: #fff; }
  .cta p { color: rgba(255,255,255,0.8); margin-bottom: 24px; }
  .cta a, .btn { display: inline-block; background: #F59E0B; color: #fff; padding: 16px 32px; text-decoration: none; text-transform: uppercase; font-weight: bold; letter-spacing: 0.1em; font-size: 0.875rem; border-radius: 4px; }
  .cta a:hover, .btn:hover { background: #D97706; }
  .back-link { display: inline-flex; align-items: center; gap: 8px; color: #1F2937; font-weight: bold; text-decoration: none; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 24px; }
  .back-link:hover { color: #F59E0B; }
  .posts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 32px; }
  .post-card { text-decoration: none; color: inherit; }
  .post-card:hover .post-card-title { color: #F59E0B; }
  .post-card-image { width: 100%; aspect-ratio: 16/10; object-fit: cover; background: #f1f5f9; margin-bottom: 16px; border-radius: 8px; }
  .post-card-date { font-size: 0.75rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }
  .post-card-title { font-family: 'Playfair Display', Georgia, serif; font-size: 1.5rem; color: #1F2937; margin-bottom: 12px; transition: color 0.2s; }
  .post-card-excerpt { color: #64748b; line-height: 1.6; }
  .footer { background: #1F2937; color: #fff; padding: 40px 20px; text-align: center; }
  .footer p { color: rgba(255,255,255,0.6); font-size: 0.875rem; }
  .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
  .card { background: #fff; padding: 32px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  .card-alt { background: #F9F7F5; padding: 32px; }
  .stat { text-align: center; padding: 24px; }
  .stat-number { font-size: 3rem; font-family: 'Playfair Display', Georgia, serif; color: #F59E0B; margin-bottom: 8px; }
  .stat-label { font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.8; }
  .faq-item { border-bottom: 1px solid #e5e7eb; padding: 24px 0; }
  .faq-q { font-family: 'Playfair Display', Georgia, serif; font-size: 1.25rem; color: #1F2937; margin-bottom: 12px; }
  .faq-a { color: #64748b; line-height: 1.7; }
  @media (max-width: 768px) {
    .grid-2, .grid-3 { grid-template-columns: 1fr; }
    .hero h1 { font-size: 2rem; }
    .nav-links { display: none; }
  }
`;

function wrapInLayout(content: string, title: string, description: string, options?: { ogImage?: string; canonicalPath?: string; ogType?: string; author?: string; publishedTime?: string; modifiedTime?: string; tags?: string[] }): string {
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const image = options?.ogImage || "/images/partners-hero.jpg";
  const ogType = options?.ogType || "website";
  const canonicalUrl = options?.canonicalPath ? `https://thomasandwan.com${options.canonicalPath}` : "";
  
  let articleMeta = "";
  if (ogType === "article") {
    if (options?.author) articleMeta += `\n  <meta property="article:author" content="${escapeHtml(options.author)}">`;
    if (options?.publishedTime) articleMeta += `\n  <meta property="article:published_time" content="${options.publishedTime}">`;
    if (options?.modifiedTime) articleMeta += `\n  <meta property="article:modified_time" content="${options.modifiedTime}">`;
    if (options?.tags) {
      options.tags.forEach(tag => {
        articleMeta += `\n  <meta property="article:tag" content="${escapeHtml(tag)}">`;
      });
    }
  }
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeTitle} | Thomas & Wan</title>
  <meta name="description" content="${safeDesc}">
  ${canonicalUrl ? `<link rel="canonical" href="${canonicalUrl}">` : ""}
  <meta property="og:title" content="${safeTitle}">
  <meta property="og:description" content="${safeDesc}">
  <meta property="og:type" content="${ogType}">${articleMeta}
  <meta property="og:image" content="${image}">
  <meta property="og:site_name" content="Thomas & Wan LLP">
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
    <p style="margin-top: 8px;">1710 Sunset Blvd, Houston, TX 77005 | (713) 529-1177</p>
  </footer>
</body>
</html>`;
}

export async function renderBlogPost(slug: string): Promise<string | null> {
  const post = await fetchPostBySlug(slug);
  if (!post) return null;

  const [media, author, categories] = await Promise.all([
    post.featured_media ? fetchMedia(post.featured_media) : Promise.resolve(null),
    post.author ? fetchAuthor(post.author) : Promise.resolve(null),
    post.categories?.length ? fetchCategoriesByIds(post.categories) : Promise.resolve([]),
  ]);

  let featuredImageHtml = "";
  let ogImage: string | undefined;
  if (media) {
    featuredImageHtml = `<img src="${media.source_url}" alt="${escapeHtml(media.alt_text || post.title.rendered)}" class="featured-image">`;
    ogImage = media.source_url;
  }

  const authorName = author?.name || "";
  const categoryNames = categories.map((c: WPCategory) => c.name);
  const excerpt = stripHtml(post.excerpt.rendered).slice(0, 160);
  const date = formatDate(post.date);

  const authorHtml = authorName ? `<span style="margin-left: 16px;">By ${escapeHtml(authorName)}</span>` : "";
  const categoriesHtml = categoryNames.length > 0 
    ? `<div style="margin-top: 12px;">${categoryNames.map((name: string) => `<span style="background: rgba(245,158,11,0.1); color: #F59E0B; padding: 4px 12px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin-right: 8px;">${escapeHtml(name)}</span>`).join("")}</div>`
    : "";

  const content = `
    <article class="container-narrow" style="padding-top: 100px; padding-bottom: 60px;">
      <a href="/blog" class="back-link">← Back to Blog</a>
      <div class="meta">${date}${authorHtml}</div>
      ${categoriesHtml}
      <h1 class="post-title">${post.title.rendered}</h1>
      ${featuredImageHtml}
      <div class="content">
        ${processContent(post.content.rendered)}
      </div>
      <div class="cta">
        <h3>Talk to an Attorney</h3>
        <p>If you believe medical negligence played a role in your situation, reach out for a free consultation.</p>
        <a href="/contact">Contact Thomas & Wan</a>
      </div>
    </article>
  `;

  return wrapInLayout(content, stripHtml(post.title.rendered), excerpt, {
    ogImage,
    canonicalPath: `/blog/${slug}`,
    ogType: "article",
    author: authorName,
    publishedTime: post.date,
    tags: categoryNames,
  });
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
      <a href="/${post.slug}" class="post-card">
        ${imageHtml}
        <div class="post-card-date">${date}</div>
        <h2 class="post-card-title">${post.title.rendered}</h2>
        <p class="post-card-excerpt">${escapeHtml(excerpt)}</p>
      </a>
    `;
  }).join("");

  const content = `
    <div class="hero">
      <div class="container">
        <div class="meta">Latest Articles</div>
        <h1>Blog</h1>
        <p>Stay informed with our latest articles on medical malpractice, birth injuries, and your legal rights.</p>
      </div>
    </div>
    <section class="section section-light">
      <div class="container">
        <div class="posts-grid">
          ${postsHtml}
        </div>
        <div class="cta" style="margin-top: 60px;">
          <h3>Need help with a case?</h3>
          <p>If you believe medical negligence played a role in your situation, reach out for a free consultation.</p>
          <a href="/contact">Contact Us</a>
        </div>
      </div>
    </section>
  `;

  return wrapInLayout(
    content, 
    "Blog - Medical Malpractice Articles", 
    "Read the latest articles from Thomas & Wan about medical malpractice, birth injuries, and your legal rights.",
    { canonicalPath: "/blog" }
  );
}

export function renderHomepage(): string {
  const content = `
    <section class="hero-home">
      <div class="container">
        <div style="max-width: 600px;">
          <div class="meta" style="color: #F59E0B;">Medical Malpractice Attorneys</div>
          <h1 style="font-size: 3.5rem; color: #1F2937;">
            Dedicated to <br/>
            <span class="text-secondary" style="font-style: italic;">Justice</span> for <br/>
            Your Family.
          </h1>
          <p style="font-size: 1.25rem; color: #64748b; margin: 24px 0; line-height: 1.8;">
            With over 60+ years of combined experience in medical malpractice, 
            Linda Thomas and Michelle Wan fight for the answers and compensation you deserve.
          </p>
          <div style="display: flex; gap: 16px; margin-top: 32px;">
            <a href="/contact" class="btn">Schedule Free Consultation</a>
          </div>
          <div style="display: flex; gap: 24px; margin-top: 32px; color: #1F2937;">
            <span>● Available 24/7</span>
            <span>● No Win, No Fee</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section-alt section">
      <div class="container">
        <div style="text-align: center; max-width: 800px; margin: 0 auto 48px;">
          <div class="meta" style="color: #F59E0B;">Our Expertise</div>
          <h2 style="font-size: 2.5rem;">Focused Exclusively on <span class="text-secondary" style="font-style: italic;">Medical Malpractice</span></h2>
          <p style="color: #64748b; margin-top: 16px;">We don't handle car accidents or divorces. Our sole focus is mastering the complex realm of medical malpractice to win for you.</p>
        </div>
        <div class="grid-3">
          <div class="card">
            <h3 style="font-size: 1.5rem; margin-bottom: 12px;">Birth Injuries</h3>
            <p style="color: #64748b;">Cerebral palsy, hypoxia, shoulder dystocia, and preventable birth trauma.</p>
          </div>
          <div class="card">
            <h3 style="font-size: 1.5rem; margin-bottom: 12px;">Surgical Errors</h3>
            <p style="color: #64748b;">Mistakes during surgery, anesthesia errors, and post-operative negligence.</p>
          </div>
          <div class="card">
            <h3 style="font-size: 1.5rem; margin-bottom: 12px;">Brain Injuries</h3>
            <p style="color: #64748b;">Traumatic brain injuries resulting from medical negligence or malpractice.</p>
          </div>
          <div class="card">
            <h3 style="font-size: 1.5rem; margin-bottom: 12px;">Misdiagnosis</h3>
            <p style="color: #64748b;">Failure to diagnose cancer, heart attacks, strokes, and critical conditions.</p>
          </div>
          <div class="card">
            <h3 style="font-size: 1.5rem; margin-bottom: 12px;">Wrongful Death</h3>
            <p style="color: #64748b;">Seeking justice for the loss of a loved one due to medical carelessness.</p>
          </div>
          <div class="card" style="background: #1F2937; color: #fff;">
            <h3 style="font-size: 1.5rem; margin-bottom: 12px; color: #fff;">Do You Have a Case?</h3>
            <p style="color: rgba(255,255,255,0.8); margin-bottom: 16px;">Get a free review of your medical records by our expert team.</p>
            <a href="/contact" class="btn">Contact Us Today</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-light">
      <div class="container">
        <div class="grid-2" style="align-items: center; gap: 64px;">
          <div>
            <div class="meta" style="color: #F59E0B;">Why Choose Us</div>
            <h2 style="font-size: 2.5rem;">A Women-Owned Firm <br/><span style="color: #64748b; font-style: italic;">Fighting for Families</span></h2>
            <p style="color: #64748b; margin: 24px 0; line-height: 1.8;">
              At Thomas & Wan, we bring a unique perspective to medical malpractice law. 
              As a women-owned firm, we understand the deep emotional toll that medical negligence takes on families.
              We don't just see a case; we see a mother, a child, a family that has been wronged.
            </p>
            <p style="color: #64748b; line-height: 1.8;">
              With over 55 years of combined experience, we have successfully resolved cases for millions of dollars 
              against major hospitals throughout Texas. But what truly sets us apart is our personal commitment.
            </p>
            <div style="margin-top: 32px;">
              <p style="font-style: italic; font-family: 'Playfair Display', serif; font-size: 1.25rem; color: #1F2937; border-left: 4px solid #F59E0B; padding-left: 20px;">
                "We don't refer cases out. When you hire Thomas & Wan, you get Thomas & Wan."
              </p>
            </div>
          </div>
          <div>
            <div class="card-alt">
              <h3 style="margin-bottom: 24px;">What Sets Us Apart</h3>
              <div style="margin-bottom: 16px;">
                <h4 style="color: #1F2937; margin-bottom: 4px;">Direct Representation</h4>
                <p style="color: #64748b; font-size: 0.9rem;">You work directly with the partners, not junior associates.</p>
              </div>
              <div style="margin-bottom: 16px;">
                <h4 style="color: #1F2937; margin-bottom: 4px;">Medical Expertise</h4>
                <p style="color: #64748b; font-size: 0.9rem;">We hire top experts from Harvard, Yale, and premier institutions.</p>
              </div>
              <div style="margin-bottom: 16px;">
                <h4 style="color: #1F2937; margin-bottom: 4px;">Compassionate Advocacy</h4>
                <p style="color: #64748b; font-size: 0.9rem;">We fight aggressively in court while treating you with care.</p>
              </div>
              <div>
                <h4 style="color: #1F2937; margin-bottom: 4px;">Proven Results</h4>
                <p style="color: #64748b; font-size: 0.9rem;">Millions recovered for birth injuries and wrongful death.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-dark">
      <div class="container">
        <div class="grid-3" style="text-align: center;">
          <div class="stat">
            <div class="stat-number">55+</div>
            <div class="stat-label">Years Combined Experience</div>
          </div>
          <div class="stat">
            <div class="stat-number">$50M+</div>
            <div class="stat-label">Recovered for Clients</div>
          </div>
          <div class="stat">
            <div class="stat-number">100%</div>
            <div class="stat-label">Medical Malpractice Focus</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-light">
      <div class="container">
        <div class="grid-2" style="gap: 64px;">
          <div>
            <div class="meta" style="color: #F59E0B;">Common Questions</div>
            <h2 style="font-size: 2.5rem;">Frequently Asked Questions</h2>
            <p style="color: #64748b; margin: 16px 0;">Navigating medical malpractice claims can be confusing. Here are answers to some of the most common questions our clients ask.</p>
            <div class="cta" style="margin-top: 32px; text-align: left;">
              <h3>Still have questions?</h3>
              <p>We are available 24/7 to answer your questions and help you understand your rights.</p>
              <a href="/contact">Contact Us Now</a>
            </div>
          </div>
          <div>
            <div class="faq-item">
              <div class="faq-q">Do I have a case?</div>
              <div class="faq-a">The first step is for us to help you get a copy of all your medical records. Then we work with our team of expert doctors and nurses to review the records to let us know if you have a case.</div>
            </div>
            <div class="faq-item">
              <div class="faq-q">What kind of help can my family receive?</div>
              <div class="faq-a">If we feel you have a case, we will have our team of experts determine how much money it will take to pay for the past medical bills and future quality medical care for you or your loved one for the rest of his or her life.</div>
            </div>
            <div class="faq-item">
              <div class="faq-q">How much do you charge?</div>
              <div class="faq-a">We work on a contingency basis. This means that you only pay a percentage for our services if we win a verdict or settlement for your family. If no recovery is made, you pay nothing.</div>
            </div>
            <div class="faq-item">
              <div class="faq-q">Why should we hire you?</div>
              <div class="faq-a">There are very few attorneys in Texas who specialize in medical malpractice, and those are the only kind of cases we do. Linda Thomas and Michelle Wan have over 55 years of combined experience. If we take your case, we work on your case ourselves; we don't "flip" it to another firm.</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-dark" style="text-align: center;">
      <div class="container" style="max-width: 800px;">
        <h2 style="font-size: 2.5rem; color: #fff;">Ready to Discuss Your Case?</h2>
        <p style="color: rgba(255,255,255,0.8); margin: 16px 0 32px; font-size: 1.125rem;">
          Call us today for a free consultation. If you have the medical records, you can send them to us for a free review with no obligation.
        </p>
        <a href="tel:713-529-1177" class="btn" style="font-size: 1.25rem; padding: 20px 40px;">Call (713) 529-1177</a>
      </div>
    </section>
  `;

  return wrapInLayout(
    content,
    "Medical Malpractice Attorneys | Women-Owned Law Firm",
    "With over 60+ years of combined experience in medical malpractice, Linda Thomas and Michelle Wan fight for the answers and compensation you deserve.",
    { canonicalPath: "/" }
  );
}

export function renderAbout(): string {
  const content = `
    <div class="hero">
      <div class="container">
        <div class="meta" style="color: #F59E0B;">About Our Firm</div>
        <h1 style="font-size: 3rem;">Compassionate Texas <br/><span class="text-secondary" style="font-style: italic;">Medical Malpractice</span> Lawyers</h1>
        <p style="font-size: 1.25rem;">We Care, and Our Dedication Shines Through. Representing our clients in the pursuit of justice is both an honor and a privilege.</p>
      </div>
    </div>

    <section class="section section-light">
      <div class="container">
        <div class="grid-2" style="gap: 64px;">
          <div>
            <h2 style="font-size: 2rem;">Empowering Citizens through the Legal System</h2>
            <p style="color: #64748b; margin: 24px 0; line-height: 1.8;">
              We firmly believe that juries play a pivotal role in safeguarding the rights of citizens. 
              In the courtroom, an injured individual stands on equal ground with even the largest hospital corporations.
            </p>
            <p style="color: #64748b; line-height: 1.8;">
              Whether your case can be resolved amicably without the need for a lawsuit or requires a tenacious battle that extends all the way to trial, we're here to stand by your side. Every client, without exception, deserves the highest standard of legal representation and an equitable opportunity to present their case in court.
            </p>
          </div>
          <div class="card-alt">
            <h3 style="margin-bottom: 24px;">Why Choose Thomas & Wan</h3>
            <div style="margin-bottom: 20px;">
              <h4 style="color: #1F2937; margin-bottom: 4px;">Unwavering Dedication</h4>
              <p style="color: #64748b;">Our commitment to seeking justice knows no bounds. We ensure our clients receive the compensation they deserve.</p>
            </div>
            <div style="margin-bottom: 20px;">
              <h4 style="color: #1F2937; margin-bottom: 4px;">Advocates for Change</h4>
              <p style="color: #64748b;">We strive to effect meaningful change in the medical industry to prevent future instances of malpractice.</p>
            </div>
            <div style="margin-bottom: 20px;">
              <h4 style="color: #1F2937; margin-bottom: 4px;">Equal Footing</h4>
              <p style="color: #64748b;">Regardless of the size or influence of the opposing party, we stand ready to fight for your rights.</p>
            </div>
            <div>
              <h4 style="color: #1F2937; margin-bottom: 4px;">Quality Legal Representation</h4>
              <p style="color: #64748b;">Every client is entitled to top-notch legal representation handled with the utmost care and expertise.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="grid-2" style="gap: 64px; margin-bottom: 80px;">
          <div>
            <h2 style="font-size: 2.5rem;">Linda Laurent Thomas</h2>
            <p class="meta" style="color: #F59E0B;">Partner | Since 1987</p>
            <p style="color: #64748b; margin: 24px 0; line-height: 1.8;">
              Since 1987, Linda Laurent Thomas has pursued aggressive legal representation on behalf of injury victims. 
              Whether the wrongdoer is a Fortune 500 corporate giant or a reckless driver, Thomas has dedicated her career to fighting for individuals to obtain the maximum amount of damages available under the law.
            </p>
            <p style="color: #64748b; line-height: 1.8;">
              Every case that the firm takes on is handled with the highest level of care and attention. This representation involves all phases of a complex personal injury action: early and thorough factual investigation, retention of expert witnesses, thorough case value assessment, aggressive pre-trial discovery, and proactive negotiations.
            </p>
            <div class="grid-2" style="margin-top: 32px;">
              <div>
                <h4 style="margin-bottom: 8px;">Education</h4>
                <ul style="color: #64748b; padding-left: 20px;">
                  <li>South Texas College of Law (Cum Laude)</li>
                  <li>University of Texas at Austin</li>
                </ul>
              </div>
              <div>
                <h4 style="margin-bottom: 8px;">Recognition</h4>
                <ul style="color: #64748b; padding-left: 20px;">
                  <li>Multi-Million Dollar Advocates Forum</li>
                  <li>Elite Lawyers of America</li>
                  <li>H Texas Magazine Top Lawyer</li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <img src="/images/partner-thomas.jpg" alt="Linda Laurent Thomas" style="width: 100%; max-width: 400px; box-shadow: 0 10px 40px rgba(0,0,0,0.15);">
          </div>
        </div>

        <div class="grid-2" style="gap: 64px;">
          <div style="order: 2;">
            <h2 style="font-size: 2.5rem;">Michelle W. Wan</h2>
            <p class="meta" style="color: #F59E0B;">Partner</p>
            <p style="color: #64748b; margin: 24px 0; line-height: 1.8;">
              Michelle W. Wan has worked exclusively representing clients in personal injury matters, handling numerous matters involving toxic exposures, medical negligence, and product defects. 
              Like Thomas, Wan has dedicated her career to fighting on behalf of persons injured by the negligence of others.
            </p>
            <p style="color: #64748b; line-height: 1.8;">
              Wan and Thomas work as a team in trial. Wan enjoys the ability to stand in front of juries and bring her clients' side of the story to the light of a courtroom. 
              As a former law journal editor, she enjoys in-depth legal research and strives for concise and clear writing.
            </p>
            <div class="grid-2" style="margin-top: 32px;">
              <div>
                <h4 style="margin-bottom: 8px;">Education</h4>
                <ul style="color: #64748b; padding-left: 20px;">
                  <li>University of Texas School of Law (2001)</li>
                  <li>Rice University (B.A., National Merit Scholar)</li>
                </ul>
              </div>
              <div>
                <h4 style="margin-bottom: 8px;">Recognition</h4>
                <ul style="color: #64748b; padding-left: 20px;">
                  <li>Multi-Million Dollar Advocates Forum</li>
                  <li>Texas Monthly SuperLawyer</li>
                  <li>Houstonia Magazine Top Lawyer</li>
                </ul>
              </div>
            </div>
          </div>
          <div style="order: 1;">
            <img src="/images/partner-wan.jpg" alt="Michelle W. Wan" style="width: 100%; max-width: 400px; box-shadow: 0 10px 40px rgba(0,0,0,0.15);">
          </div>
        </div>
      </div>
    </section>

    <section class="section section-dark" style="text-align: center;">
      <div class="container" style="max-width: 800px;">
        <h2 style="font-size: 2.5rem; color: #fff;">Do You Have a Medical Malpractice Case?</h2>
        <p style="color: rgba(255,255,255,0.8); margin: 16px 0 32px; font-size: 1.125rem;">
          Call us today for a free consultation. If you have the medical records, you can send them to us for a free review with no obligation. Remember, strict deadlines apply.
        </p>
        <a href="tel:713-529-1177" class="btn" style="font-size: 1.25rem; padding: 20px 40px;">Call (713) 529-1177</a>
      </div>
    </section>
  `;

  return wrapInLayout(
    content,
    "About Our Firm - Medical Malpractice Attorneys",
    "Linda Thomas and Michelle Wan are compassionate Texas medical malpractice lawyers with over 55 years of combined experience fighting for families.",
    { canonicalPath: "/about" }
  );
}

export function renderCases(): string {
  const content = `
    <div class="hero">
      <div class="container">
        <div class="meta" style="color: #F59E0B;">Medical Malpractice Focus</div>
        <h1 style="font-size: 3rem;">Cases We Handle</h1>
      </div>
    </div>

    <section class="section section-light">
      <div class="container">
        <div class="grid-2" style="gap: 64px;">
          <div>
            <h2 style="font-size: 2rem;">Advocating for You and Your Family</h2>
            <p style="color: #64748b; margin: 24px 0; line-height: 1.8;">
              If you're in need of legal guidance and support, you've come to the right place. Meet the dedicated team at Thomas & Wan, who bring 55 years of experience to the table.
            </p>
            <p style="color: #64748b; line-height: 1.8;">
              We've successfully handled numerous multi-million dollar cases related to serious medical malpractice and wrongful death issues across the nation. We're not afraid to take on challenging cases, and our commitment to justice is unwavering.
            </p>
            <a href="/contact" class="btn" style="margin-top: 32px;">Request a Free Consultation</a>
          </div>
          <div>
            <div class="grid-2" style="gap: 16px;">
              <div class="card-alt">
                <h3 style="font-size: 1.25rem; margin-bottom: 8px;">Brain Injuries</h3>
                <p style="color: #64748b; font-size: 0.9rem;">We understand the physical, emotional, and financial toll brain injuries can take on individuals and their families.</p>
              </div>
              <div class="card-alt">
                <h3 style="font-size: 1.25rem; margin-bottom: 8px;">Birth Injuries</h3>
                <p style="color: #64748b; font-size: 0.9rem;">When things go wrong due to medical negligence, the consequences can be devastating. We help families protect a child's future.</p>
              </div>
              <div class="card-alt">
                <h3 style="font-size: 1.25rem; margin-bottom: 8px;">Surgical Errors</h3>
                <p style="color: #64748b; font-size: 0.9rem;">Surgical procedures are meant to improve your health. When errors occur, the results can be catastrophic. We fight for your rights.</p>
              </div>
              <div class="card-alt">
                <h3 style="font-size: 1.25rem; margin-bottom: 8px;">Medication Errors</h3>
                <p style="color: #64748b; font-size: 0.9rem;">Mistakes in medication administration can have severe consequences. Our team seeks justice on your behalf.</p>
              </div>
              <div class="card-alt">
                <h3 style="font-size: 1.25rem; margin-bottom: 8px;">Misdiagnosis</h3>
                <p style="color: #64748b; font-size: 0.9rem;">A misdiagnosis can delay proper treatment and exacerbate health issues. We pursue accountability and compensation.</p>
              </div>
              <div class="card-alt">
                <h3 style="font-size: 1.25rem; margin-bottom: 8px;">More Complex Harms</h3>
                <p style="color: #64748b; font-size: 0.9rem;">Including burns, cerebral palsy, paralysis, hospital-acquired infections, HIE, anesthesia errors, wrong-site surgery, pulmonary embolism, stroke, and failure to diagnose or treat disease.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-dark" style="text-align: center;">
      <div class="container" style="max-width: 800px;">
        <h2 style="font-size: 2.5rem; color: #fff;">Call Us Now For a Free Consultation</h2>
        <p style="color: rgba(255,255,255,0.8); margin: 16px 0 32px; font-size: 1.125rem;">
          Call us today for a free consultation—we will discuss what your legal options are for your medical malpractice case. If you have the medical records, you can send them to us for a free review with no obligation.
        </p>
        <a href="/contact" class="btn">Contact Us</a>
      </div>
    </section>
  `;

  return wrapInLayout(
    content,
    "Cases We Handle - Medical Malpractice",
    "Thomas & Wan handles brain injuries, birth injuries, surgical errors, medication errors, misdiagnosis, and other complex medical malpractice cases.",
    { canonicalPath: "/cases-we-handle" }
  );
}

export function renderContact(): string {
  const content = `
    <div class="hero">
      <div class="container">
        <div class="meta" style="color: #F59E0B;">Free consultation · No fee unless we win</div>
        <h1 style="font-size: 3rem;">Contact Us</h1>
      </div>
    </div>

    <section class="section section-light">
      <div class="container">
        <div class="grid-2" style="gap: 64px;">
          <div>
            <h2 style="font-size: 2rem;">Speak with a medical malpractice attorney.</h2>
            <p style="color: #64748b; margin: 16px 0; line-height: 1.8;">
              Tell us what happened. We'll review your situation and explain your options—no obligation.
            </p>

            <div class="grid-3" style="gap: 16px; margin: 32px 0;">
              <div class="card" style="padding: 20px;">
                <h4 style="font-size: 1rem; margin-bottom: 4px;">Confidential</h4>
                <p style="color: #64748b; font-size: 0.8rem;">Your details stay private.</p>
              </div>
              <div class="card" style="padding: 20px;">
                <h4 style="font-size: 1rem; margin-bottom: 4px;">No pressure</h4>
                <p style="color: #64748b; font-size: 0.8rem;">Clear, straightforward guidance.</p>
              </div>
              <div class="card" style="padding: 20px;">
                <h4 style="font-size: 1rem; margin-bottom: 4px;">Free review</h4>
                <p style="color: #64748b; font-size: 0.8rem;">No fee unless we win.</p>
              </div>
            </div>

            <div class="card-alt" style="margin-top: 32px;">
              <h3 style="margin-bottom: 24px;">Our Office</h3>
              <div style="margin-bottom: 16px;">
                <strong style="color: #1F2937;">Thomas & Wan – Medical Malpractice Attorneys</strong><br>
                <a href="https://maps.app.goo.gl/dZzpBComUgnyvp5f6" style="color: #64748b;">1710 Sunset Blvd, Houston, TX 77005</a>
              </div>
              <div style="margin-bottom: 16px;">
                <strong>Phone:</strong> <a href="tel:713-529-1177" style="color: #F59E0B;">(713) 529-1177</a>
              </div>
              <div style="margin-bottom: 16px;">
                <strong>Email:</strong> <a href="mailto:info@thomasandwan.com" style="color: #F59E0B;">info@thomasandwan.com</a>
              </div>
              <div>
                <strong>Hours:</strong><br>
                <span style="color: #64748b;">Mon - Fri: 8:00 AM - 6:00 PM</span><br>
                <span style="color: #64748b;">Weekends: By Appointment</span>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 style="margin-bottom: 8px;">Send a message</h3>
            <p style="color: #64748b; margin-bottom: 24px;">We typically respond the same business day.</p>

            <p style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; margin-bottom: 12px;">Quick topic (optional)</p>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
              <span style="background: #f1f5f9; padding: 8px 16px; border-radius: 20px; font-size: 0.9rem;">Surgical Error</span>
              <span style="background: #f1f5f9; padding: 8px 16px; border-radius: 20px; font-size: 0.9rem;">Misdiagnosis</span>
              <span style="background: #f1f5f9; padding: 8px 16px; border-radius: 20px; font-size: 0.9rem;">Birth Injury</span>
              <span style="background: #f1f5f9; padding: 8px 16px; border-radius: 20px; font-size: 0.9rem;">Medication Error</span>
              <span style="background: #f1f5f9; padding: 8px 16px; border-radius: 20px; font-size: 0.9rem;">Hospital Negligence</span>
              <span style="background: #f1f5f9; padding: 8px 16px; border-radius: 20px; font-size: 0.9rem;">Not Sure</span>
            </div>

            <p style="color: #64748b; margin-bottom: 16px;">
              To send us a message, please call <a href="tel:713-529-1177" style="color: #F59E0B; font-weight: bold;">(713) 529-1177</a> or email <a href="mailto:info@thomasandwan.com" style="color: #F59E0B;">info@thomasandwan.com</a>.
            </p>

            <div class="cta" style="margin-top: 32px;">
              <h3>Prefer to talk?</h3>
              <p>Call for a free consultation—we'll discuss your options and next steps. If you already have medical records, we can review them.</p>
              <a href="tel:713-529-1177">Call (713) 529-1177</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  return wrapInLayout(
    content,
    "Contact Us - Free Consultation",
    "Contact Thomas & Wan for a free medical malpractice consultation. Call (713) 529-1177 or email info@thomasandwan.com. No fee unless we win.",
    { canonicalPath: "/contact" }
  );
}

export function renderFAQ(): string {
  const faqs = [
    { q: "I think I have a legal claim. What do I do now?", a: "If you think you have a legal claim, your first step is finding a lawyer to represent you. You can contact Thomas & Wan to discuss your claim by filling out a form or by calling 713.529.1177. A lawyer will evaluate your case." },
    { q: "How do I know which lawyer to use?", a: "Use an attorney who has experience dealing with your type of claim and a proven track record of success. Ask about experience, how long they've practiced, how much time they spend on cases like yours, and whether they will personally handle the case or refer it to another firm." },
    { q: "Why should I hire Thomas & Wan?", a: "Linda Laurent Thomas and Michelle Wan have extensive experience handling personal injury matters and are routinely asked to handle difficult cases by other law firms. They approach practicing law as a profession, not a factory. They handle cases with personal service and focus on results, keeping you informed of your options." },
    { q: "How do I pay for an attorney?", a: "Most personal injury firms, including Thomas & Wan, work on a contingency basis. This means you only pay for services if there is a verdict or settlement. If no recovery is made, you pay nothing." },
    { q: "Thomas & Wan has taken my case. What now?", a: "The first part of the lawsuit process is called discovery. In this phase, both sides gather evidence and information that proves or disproves the claim." },
    { q: "What do I have to do during discovery?", a: "You may answer written questions (interrogatories) regarding personal information, witnesses, injuries, medical treatment, and other details. Your lawyer or paralegal may request additional information to strengthen the case." },
    { q: "What if I have to give a deposition?", a: "A deposition is testimony under oath recorded for later use in court. The attorneys will ask questions, and a court reporter records testimony. Your attorney will prepare you and be by your side to ensure the process is fair." },
    { q: "What is mediation?", a: "Mediation is a meeting with all parties to attempt settlement. A neutral mediator helps communicate between sides. Courts often require mediation before trial." },
    { q: "What if my case goes to trial?", a: "A judge or jury determines responsibility and damages. If Thomas & Wan wins a settlement or verdict, the fee is taken from that recovery." },
  ];

  const faqHtml = faqs.map(f => `
    <div class="faq-item">
      <div class="faq-q">${f.q}</div>
      <div class="faq-a">${f.a}</div>
    </div>
  `).join("");

  const content = `
    <div class="hero">
      <div class="container">
        <div class="meta" style="color: #F59E0B;">What to Expect</div>
        <h1 style="font-size: 3rem;">Frequently Asked Questions</h1>
      </div>
    </div>

    <section class="section section-light">
      <div class="container">
        <div class="grid-2" style="gap: 64px;">
          <div>
            <div class="card-alt">
              <h2 style="font-size: 1.5rem; margin-bottom: 16px;">Clear answers. Real guidance.</h2>
              <p style="color: #64748b; line-height: 1.8;">
                This page is designed to be easier to scan and more helpful than the typical FAQ. If you don't see your question here, call us.
              </p>
              <a href="/contact" class="btn" style="margin-top: 24px;">Contact Us</a>
            </div>
            <div class="cta" style="margin-top: 24px;">
              <div style="font-size: 2.5rem; color: #F59E0B;">24/7</div>
              <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.7;">Available to help</div>
              <div style="margin-top: 16px;">Call <a href="tel:713-529-1177" style="color: #F59E0B; font-weight: bold;">713-529-1177</a></div>
            </div>
          </div>
          <div>
            ${faqHtml}
            <div class="cta" style="margin-top: 48px; text-align: left;">
              <h3>Call Us Now For a Free Consultation</h3>
              <p>Call us today for a free consultation—we will discuss what your legal options are for your medical malpractice case. If you have the medical records, you can send them to us for a free review with no obligation.</p>
              <a href="/contact">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  return wrapInLayout(
    content,
    "Frequently Asked Questions",
    "Get answers to common questions about medical malpractice cases, hiring a lawyer, discovery, depositions, mediation, and trial. Free consultation available.",
    { canonicalPath: "/faq" }
  );
}

export function renderTestimonials(): string {
  const testimonials = [
    { quote: "After a heart transplant in August 2016, Ernest \"Chris\" Keys can't talk or walk. The Houston hospital is under pressure for the quality of its once-renowned heart program. Now it is being sued by Mr. Keys's family.", author: "Houston Chronicle", date: "July 5, 2018" },
    { quote: "Thomas & Wan represented my baby who was seriously harmed by nurses at a hospital who did not know what they were doing. Linda and Michelle were able to guide us through what to do in getting help for my baby for the rest of his life.", author: "Stephanie S" },
    { quote: "Linda and Michelle represented me when I was hurt at a refinery. I had tried using a different lawyer, but he never returned my calls or talked to me. Linda and Michelle did a good job and they care about your case.", author: "Rogelio L" },
    { quote: "After being abandoned by my original lawyer who was greedy for money, Linda was a TRUE answer to my prayers. She is after JUSTICE, not money. She has spent COUNTLESS hours researching my case and asking just the right questions.", author: "Lauren" },
    { quote: "Thomas & Wan did a great job representing me and my family against the owner of our apartment complex. We have just moved in when our daughter was shot in the head by a stray bullet while she was sleeping in her bed. It was a miracle she survived.", author: "Lisa A" },
    { quote: "I had a hard time coming to the terms with what happened to my baby at birth..and as I was looking thru and for a Medical Mal Practice attorney and her face was so welcoming I loved what I read and how long she has been an attorney.", author: "Alyssa" }
  ];

  const testimonialsHtml = testimonials.map(t => `
    <div class="card-alt" style="padding: 32px; margin-bottom: 24px;">
      <div style="color: #F59E0B; margin-bottom: 12px;">★★★★★</div>
      <p style="color: #64748b; font-style: italic; font-size: 1.1rem; line-height: 1.8; margin-bottom: 16px;">"${t.quote}"</p>
      <div style="border-top: 1px solid #e5e7eb; padding-top: 16px;">
        <strong style="color: #1F2937;">${t.author}</strong>
        ${t.date ? `<span style="color: #64748b; font-size: 0.9rem;"> · ${t.date}</span>` : ''}
      </div>
    </div>
  `).join("");

  const content = `
    <div class="hero">
      <div class="container">
        <div class="meta" style="color: #F59E0B;">Client Stories</div>
        <h1 style="font-size: 3rem;">Voices of <span class="text-secondary" style="font-style: italic;">Justice & Hope</span></h1>
        <p style="font-size: 1.25rem; margin-top: 16px;">Don't just take our word for it. Read what our clients have to say about their experience working with Thomas & Wan.</p>
      </div>
    </div>

    <section class="section section-light">
      <div class="container">
        <div class="grid-2" style="gap: 32px;">
          ${testimonialsHtml}
        </div>
      </div>
    </section>

    <section class="section section-dark" style="text-align: center;">
      <div class="container" style="max-width: 800px;">
        <h2 style="font-size: 2.5rem; color: #fff;">Let Us Fight for Your Family Too</h2>
        <p style="color: rgba(255,255,255,0.8); margin: 16px 0 32px; font-size: 1.125rem;">
          If you or a loved one has suffered due to medical negligence, we are here to listen. Contact us today for a free, confidential consultation.
        </p>
        <a href="/contact" class="btn" style="font-size: 1.25rem; padding: 20px 40px;">Share Your Story With Us</a>
      </div>
    </section>
  `;

  return wrapInLayout(
    content,
    "Client Testimonials",
    "Read testimonials from Thomas & Wan clients. Real stories of families we've helped with medical malpractice, birth injuries, and hospital negligence cases.",
    { canonicalPath: "/testimonials" }
  );
}

export function renderMedicalMalpractice(): string {
  const examples = [
    { title: "Surgical Errors", desc: "Operating on the wrong part of the body, leaving instruments inside the body, or removing the wrong organ." },
    { title: "Failure to Diagnose", desc: "Failing to diagnose a disease or injury; ignoring obvious signs of infection, stroke, heart attack, or respiratory arrest." },
    { title: "Medication Errors", desc: "Giving the wrong medication, overdosing a patient, or severe burns from medications." },
    { title: "Anesthesia Monitoring", desc: "Failing to monitor anesthesia properly and preventable complications during procedures." },
    { title: "Birth-Related Negligence", desc: "Birth injuries such as cerebral palsy, shoulder dystocia, oxygen deprivation, and umbilical cord strangulation." },
    { title: "Accountability", desc: "Suit against nurses, doctors, medical techs, pharmacists, and other providers whose negligence caused harm." },
  ];

  const examplesHtml = examples.map(e => `
    <div class="card" style="padding: 28px;">
      <h3 style="font-size: 1.5rem; margin-bottom: 12px;">${e.title}</h3>
      <p style="color: #64748b;">${e.desc}</p>
    </div>
  `).join("");

  const content = `
    <div class="hero">
      <div class="container">
        <div class="meta" style="color: #F59E0B;">Cases We Handle</div>
        <h1 style="font-size: 3rem;">Medical Malpractice</h1>
      </div>
    </div>

    <section class="section section-light">
      <div class="container">
        <div class="grid-2" style="gap: 64px;">
          <div>
            <p style="font-size: 1.125rem; color: #64748b; line-height: 1.8; margin-bottom: 32px;">
              We have successfully resolved numerous multi-million dollar matters for serious medical malpractice and wrongful death across the nation.
            </p>
            <div class="card-alt">
              <h3 style="margin-bottom: 16px;">Medical negligence can include:</h3>
              <p style="color: #64748b; line-height: 1.8;">
                Claims against negligent hospitals, nurses, doctors, pharmacists, medical technicians, and other providers.
              </p>
              <a href="/contact" class="btn" style="margin-top: 24px;">Request Free Consultation</a>
            </div>
          </div>
          <div class="grid-2" style="gap: 20px;">
            ${examplesHtml}
          </div>
        </div>

        <div class="cta" style="margin-top: 64px; text-align: left;">
          <h3>Call Us Now For a Free Consultation</h3>
          <p>Call us today for a free consultation—we will discuss what your legal options are for your medical malpractice case. If you have medical records, you can send them to us for a free review with no obligation.</p>
          <a href="/contact">Contact Us</a>
        </div>
      </div>
    </section>
  `;

  return wrapInLayout(
    content,
    "Medical Malpractice Lawyers in Houston",
    "Thomas & Wan medical malpractice attorneys handle surgical errors, misdiagnosis, medication errors, anesthesia negligence, and hospital malpractice cases. Free consultation.",
    { canonicalPath: "/cases-we-handle/medical-malpractice" }
  );
}

export function renderBirthInjuries(): string {
  const birthInjuryTypes = [
    "Hypoxic ischemic encephalopathy", "Cerebral palsy", "Forceps/vacuum injuries", "Induction problems",
    "Gestational Diabetes mismanagement", "Preeclampsia mismanagement", "Shoulder Dystocia/Erb's palsy",
    "Fetal heart monitoring problems", "Delay in C-Section", "Delay in delivery", "Fetal acidosis",
    "Umbilical cord compression", "Infection mismanagement", "Group B Strep mismanagement",
    "Intubation problems", "Placental abruption"
  ];

  const preventableCauses = [
    "Pulling and/or twisting the infant improperly during the delivery period",
    "Improper handling and use of birth-assisting tools, such as forceps or a vacuum extraction tool",
    "Administering the wrong amount or the wrong type of medication to the mother during pregnancy and during labor",
    "Failure to monitor the infant properly for distress, including failure to regularly monitor fetal heartbeat",
    "Failure to schedule and perform an emergency cesarean surgery (C-section)"
  ];

  const hieSymptoms = [
    "Meconium-stained amniotic fluid", "Low heart rate", "Poor muscle tone",
    "Weak breathing or no breathing at all", "Bluish or pale skin color", "Excessive acid in the blood"
  ];

  const typesHtml = birthInjuryTypes.map(t => `<div style="background: #fff; padding: 12px 16px; border-left: 4px solid #F59E0B;">${t}</div>`).join("");
  const causesHtml = preventableCauses.map(c => `<div style="display: flex; gap: 12px; margin-bottom: 12px;"><span style="color: #F59E0B;">⚠</span><p style="color: #64748b;">${c}</p></div>`).join("");
  const symptomsHtml = hieSymptoms.map(s => `<div style="background: #fff; padding: 12px 16px; display: flex; gap: 12px; align-items: center;"><span style="color: #F59E0B;">●</span>${s}</div>`).join("");

  const content = `
    <div class="hero">
      <div class="container">
        <div class="meta" style="color: #F59E0B;">Cases We Handle</div>
        <h1 style="font-size: 3rem;">Birth <span class="text-secondary" style="font-style: italic;">Injuries</span></h1>
        <p style="font-size: 1.25rem; margin-top: 16px;">Sometimes babies are born with medical problems that don't match their parents' expectations. Sometimes it is because the baby is a victim of a birth injury that occurs during labor and delivery.</p>
      </div>
    </div>

    <section class="section section-light">
      <div class="container">
        <div class="grid-2" style="gap: 64px;">
          <div>
            <p style="font-size: 1.125rem; color: #64748b; line-height: 1.8; margin-bottom: 24px;">
              Giving birth is one of the most exciting events in a mother's life. Parents prepare for the big day when their new baby is born, and they hope and pray for a healthy baby. At Thomas & Wan, our lawyers have represented many Texas families who have suffered injuries to their baby as a result of gross negligence and malpractice.
            </p>
            <p style="font-size: 1.125rem; color: #64748b; line-height: 1.8;">
              We are very familiar with the medicine, the law and the policies of hospitals all across Texas concerning the need for monitoring and possible emergency delivery of laboring moms to prevent injuries to babies. Many times these injuries are preventable if hospitals only ensured that safety policies were followed by their labor nurses, midwives and doctors.
            </p>
          </div>
          <div>
            <img src="/images/birth-injuries.jpg" alt="Newborn baby receiving care" style="width: 100%; box-shadow: 0 10px 40px rgba(0,0,0,0.15);">
          </div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <h2 style="font-size: 2.5rem; text-align: center; margin-bottom: 40px;">Types of Birth Injuries We Handle</h2>
        <div class="grid-2" style="gap: 16px;">
          ${typesHtml}
        </div>
      </div>
    </section>

    <section class="section section-light">
      <div class="container" style="max-width: 900px;">
        <h2 style="font-size: 2.5rem; margin-bottom: 32px;">Birth Defects Versus Birth Negligence</h2>
        
        <div class="grid-2" style="gap: 32px; margin-bottom: 48px;">
          <div class="card" style="border-top: 4px solid #64748b;">
            <h3 style="margin-bottom: 16px;">Birth Defects</h3>
            <p style="color: #64748b; line-height: 1.8;">A birth defect is a health problem that affects your baby based on your child's genetic material or DNA. Examples include Down's Syndrome, a cleft palate, or heart murmurs. <strong>A birth defect is generally NOT medical malpractice.</strong></p>
          </div>
          <div class="card" style="border-top: 4px solid #F59E0B;">
            <h3 style="margin-bottom: 16px;">Birth Injuries</h3>
            <p style="color: #64748b; line-height: 1.8;">A birth injury is a medical issue that an infant is born with that is, in most cases, <strong>completely preventable</strong>. These are often caused by negligence during labor and delivery.</p>
          </div>
        </div>

        <h3 style="font-size: 1.5rem; margin-bottom: 24px;">Common Causes of Preventable Birth Injuries:</h3>
        ${causesHtml}
      </div>
    </section>

    <section class="section section-alt">
      <div class="container" style="max-width: 1000px;">
        <div class="grid-2" style="gap: 64px;">
          <div>
            <div class="meta" style="color: #F59E0B;">Case Example</div>
            <h2 style="font-size: 2rem; margin-bottom: 24px;">Lack Of Oxygen To The Brain During Labor</h2>
            <p style="color: #64748b; line-height: 1.8; margin-bottom: 24px;">
              Hypoxic Ischemic Encephalopathy (HIE) is a type of brain damage that occurs when an infant's brain doesn't receive enough oxygen. It is a dangerous condition that requires immediate medical intervention. HIE is the leading cause of infant fatalities in the United States, as well as the primary source of severe impairments.
            </p>
            <h3 style="font-size: 1.25rem; margin-bottom: 16px;">Symptoms Associated with HIE:</h3>
            <div style="display: grid; gap: 8px;">
              ${symptomsHtml}
            </div>
          </div>
          <div>
            <img src="/images/newborn-care.jpg" alt="Mother holding newborn baby" style="width: 100%; box-shadow: 0 10px 40px rgba(0,0,0,0.15);">
          </div>
        </div>
        <p style="color: #64748b; line-height: 1.8; margin-top: 32px;">
          Effects of HIE may include developmental delays, epilepsy, cognitive issues, motor skill development delays, and neurodevelopment delays. The true severity of HIE generally cannot be determined until the baby reaches three to four years of age.
        </p>
      </div>
    </section>

    <section class="section section-dark" style="text-align: center;">
      <div class="container" style="max-width: 800px;">
        <h2 style="font-size: 2.5rem; color: #fff;">Legal Help for The Youngest Victims</h2>
        <p style="color: rgba(255,255,255,0.8); margin: 16px 0 32px; font-size: 1.125rem;">
          At Thomas & Wan, we have the training, experience and knowledge to sue grossly negligent hospitals, doctors, nurses and midwives for birth injuries. Please call us today for free—we are here to listen to you.
        </p>
        <a href="tel:713-529-1177" class="btn" style="font-size: 1.25rem; padding: 20px 40px;">Call (713) 529-1177</a>
      </div>
    </section>
  `;

  return wrapInLayout(
    content,
    "Birth Injury Lawyers in Houston",
    "Texas birth injury attorneys at Thomas & Wan represent families whose babies were harmed by medical negligence. We handle HIE, cerebral palsy, Erb's palsy cases. Free consultation.",
    { canonicalPath: "/cases-we-handle/birth-injuries" }
  );
}

export function renderComplicationsOfChildbirth(): string {
  const complications = [
    "Preeclampsia and eclampsia", "Obstetrical complications for the mother or obstetrical nurse negligence",
    "C-section injuries", "Postpartum hemorrhage", "Infections", "Prolapsed umbilical cord",
    "Failure to monitor the infant", "Vaginal tears", "Ruptured uterus", "Abruptio placenta",
    "Cephalopelvic disproportion", "Delivery trauma or improper resuscitation of the baby",
    "Other pregnancy-related negligence"
  ];

  const complicationsHtml = complications.map(c => `
    <div style="background: #fff; padding: 16px 20px; display: flex; gap: 12px; align-items: center; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
      <span style="color: #F59E0B;">●</span>
      <span style="color: #1F2937; font-weight: 500;">${c}</span>
    </div>
  `).join("");

  const content = `
    <div class="hero">
      <div class="container">
        <div class="meta" style="color: #F59E0B;">Cases We Handle</div>
        <h1 style="font-size: 3rem;">Complications of <span class="text-secondary" style="font-style: italic;">Childbirth</span></h1>
        <p style="font-size: 1.25rem; margin-top: 16px;">At Thomas & Wan, we have helped families dealing with the devastating loss of a mother or serious permanent brain damage due to gross negligence during pregnancy and childbirth.</p>
      </div>
    </div>

    <section class="section section-light">
      <div class="container">
        <div class="grid-2" style="gap: 64px;">
          <div>
            <p style="font-size: 1.125rem; color: #64748b; line-height: 1.8; margin-bottom: 24px;">
              For an expectant mother, childbirth is an exciting and nerve-wracking time. Most of the time, doctors, midwives and nurses do an excellent job of keeping mom and baby safe during labor and delivery.
            </p>
            <p style="font-size: 1.125rem; color: #64748b; line-height: 1.8;">
              Sometimes, however, medical providers can be grossly negligent in their medical care to the laboring mother. Thomas & Wan represent mothers who have been injured or made ill due to malpractice by a doctor, midwife, nurse or other health care professional during pregnancy, labor and delivery, or after delivery.
            </p>
          </div>
          <div>
            <img src="/images/complications-childbirth.jpg" alt="Pregnant woman receiving medical care" style="width: 100%; box-shadow: 0 10px 40px rgba(0,0,0,0.15);">
          </div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <h2 style="font-size: 2.5rem; text-align: center; margin-bottom: 16px;">Cases We Handle</h2>
        <p style="font-size: 1.125rem; color: #64748b; text-align: center; margin-bottom: 40px;">We represent mothers and families in cases involving:</p>
        <div class="grid-3" style="gap: 16px; max-width: 1000px; margin: 0 auto;">
          ${complicationsHtml}
        </div>
      </div>
    </section>

    <section class="section section-light" style="text-align: center;">
      <div class="container" style="max-width: 700px;">
        <h2 style="font-size: 2rem; margin-bottom: 24px;">We're Here to Help Your Family</h2>
        <p style="font-size: 1.125rem; color: #64748b; line-height: 1.8;">
          At Thomas & Wan, we have helped families dealing with the devastating loss of a mother or serious permanent brain damage due to gross negligence during pregnancy and childbirth. Please contact us today for a free and candid consultation.
        </p>
      </div>
    </section>

    <section class="section section-dark" style="text-align: center;">
      <div class="container" style="max-width: 800px;">
        <h2 style="font-size: 2.5rem; color: #fff;">Call Us Now For a Free Consultation</h2>
        <p style="color: rgba(255,255,255,0.8); margin: 16px 0 32px; font-size: 1.125rem;">
          Call us today for a free consultation—we will discuss what your legal options are for your medical malpractice case. If you have the medical records, you can send them to us for a free review with no obligation to you. Remember, in Texas there are strict deadlines for filing a medical malpractice lawsuit.
        </p>
        <a href="tel:713-529-1177" class="btn" style="font-size: 1.25rem; padding: 20px 40px;">Call Today - Don't Delay</a>
      </div>
    </section>
  `;

  return wrapInLayout(
    content,
    "Complications of Childbirth Lawyers in Houston",
    "Texas attorneys at Thomas & Wan represent mothers who suffered injuries due to medical negligence during pregnancy and childbirth. Free consultation.",
    { canonicalPath: "/cases-we-handle/complications-of-childbirth" }
  );
}

export async function renderAuthorPage(slug: string): Promise<string | null> {
  const author = await fetchAuthorBySlug(slug);
  if (!author) return null;

  const posts = await fetchPostsByAuthorWithMedia(author.id, { per_page: 20 });

  const postsHtml = posts.map((post: WPPost & { featured_image?: WPMedia }) => `
    <a href="/blog/${post.slug}" class="post-card">
      ${post.featured_image ? `<img src="${post.featured_image.source_url}" alt="${escapeHtml(post.featured_image.alt_text || stripHtml(post.title.rendered))}" class="post-card-image">` : `<div class="post-card-image" style="display: flex; align-items: center; justify-content: center; color: #94a3b8;">No image</div>`}
      <div class="post-card-date">${formatDate(post.date)}</div>
      <h3 class="post-card-title">${post.title.rendered}</h3>
      <p class="post-card-excerpt">${stripHtml(post.excerpt.rendered).substring(0, 150)}...</p>
    </a>
  `).join('');

  const content = `
    <section class="hero">
      <div class="container">
        <a href="/blog" class="back-link" style="color: rgba(255,255,255,0.8);">&larr; Back to Blog</a>
        <h1>Articles by ${escapeHtml(author.name)}</h1>
        <p>${posts.length} article${posts.length !== 1 ? 's' : ''} published</p>
      </div>
    </section>

    <section class="section section-light">
      <div class="container">
        <div class="posts-grid">
          ${postsHtml}
        </div>
      </div>
    </section>

    <div class="cta container" style="margin-bottom: 48px;">
      <h3>Need Legal Help?</h3>
      <p>If you believe medical negligence played a role in your situation, reach out for a free consultation.</p>
      <a href="/contact">Contact Us Today</a>
    </div>
  `;

  return wrapInLayout(
    content,
    `Articles by ${author.name} | Thomas & Wan`,
    `Read ${posts.length} article${posts.length !== 1 ? 's' : ''} by ${author.name} on medical malpractice and birth injuries.`,
    { canonicalPath: `/author/${slug}` }
  );
}

export async function renderCategoryPage(slug: string): Promise<string | null> {
  const category = await fetchCategoryBySlug(slug);
  if (!category) return null;

  const posts = await fetchPostsByCategoryWithMedia(category.id, { per_page: 20 });

  const postsHtml = posts.map((post: WPPost & { featured_image?: WPMedia }) => `
    <a href="/blog/${post.slug}" class="post-card">
      ${post.featured_image ? `<img src="${post.featured_image.source_url}" alt="${escapeHtml(post.featured_image.alt_text || stripHtml(post.title.rendered))}" class="post-card-image">` : `<div class="post-card-image" style="display: flex; align-items: center; justify-content: center; color: #94a3b8;">No image</div>`}
      <div class="post-card-date">${formatDate(post.date)}</div>
      <h3 class="post-card-title">${post.title.rendered}</h3>
      <p class="post-card-excerpt">${stripHtml(post.excerpt.rendered).substring(0, 150)}...</p>
    </a>
  `).join('');

  const content = `
    <section class="hero">
      <div class="container">
        <a href="/blog" class="back-link" style="color: rgba(255,255,255,0.8);">&larr; Back to Blog</a>
        <h1>${escapeHtml(category.name)}</h1>
        <p>${category.count} article${category.count !== 1 ? 's' : ''} in this category</p>
      </div>
    </section>

    <section class="section section-light">
      <div class="container">
        <div class="posts-grid">
          ${postsHtml}
        </div>
      </div>
    </section>

    <div class="cta container" style="margin-bottom: 48px;">
      <h3>Need Legal Help?</h3>
      <p>If you believe medical negligence played a role in your situation, reach out for a free consultation.</p>
      <a href="/contact">Contact Us Today</a>
    </div>
  `;

  return wrapInLayout(
    content,
    `${category.name} Articles | Thomas & Wan`,
    `Browse ${category.count} article${category.count !== 1 ? 's' : ''} about ${category.name}. Learn about your legal rights from Thomas & Wan.`,
    { canonicalPath: `/category/${slug}` }
  );
}

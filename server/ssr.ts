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
  .content h2 { font-size: 1.75rem; }
  .content h3 { font-size: 1.5rem; }
  .content ul, .content ol { margin-bottom: 1.5em; padding-left: 1.5em; }
  .content li { margin-bottom: 0.5em; }
  .content a { color: #F59E0B; text-decoration: underline; }
  .content img { max-width: 100%; height: auto; margin: 1.5em 0; border-radius: 8px; }
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
  <meta property="og:type" content="website">
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
    <p style="margin-top: 8px;">1710 Sunset Blvd, Houston, TX 77005 | (713) 529-1177</p>
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
    <article class="container-narrow" style="padding-top: 100px; padding-bottom: 60px;">
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
    "Read the latest articles from Thomas & Wan about medical malpractice, birth injuries, and your legal rights."
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
    "With over 60+ years of combined experience in medical malpractice, Linda Thomas and Michelle Wan fight for the answers and compensation you deserve."
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
    "Linda Thomas and Michelle Wan are compassionate Texas medical malpractice lawyers with over 55 years of combined experience fighting for families."
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
    "Thomas & Wan handles brain injuries, birth injuries, surgical errors, medication errors, misdiagnosis, and other complex medical malpractice cases."
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
    "Contact Thomas & Wan for a free medical malpractice consultation. Call (713) 529-1177 or email info@thomasandwan.com. No fee unless we win."
  );
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const WP_API_BASE = "https://wp.thomasandwan.com/wp-json/wp/v2";
const CASES_PARENT_ID = 8;

interface PageDefinition {
  id?: number;
  title: string;
  slug: string;
  content: string;
  parent?: number;
  status?: string;
}

function getAuthHeaders(): Record<string, string> {
  const user = process.env.WP_ADMIN_USER;
  const pass = process.env.WP_ADMIN_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error("WP_ADMIN_USER and WP_ADMIN_APP_PASSWORD environment variables are required");
  }
  const token = Buffer.from(`${user}:${pass}`).toString("base64");
  return {
    "Authorization": `Basic ${token}`,
    "Content-Type": "application/json",
  };
}

async function updatePage(id: number, data: { title: string; content: string; status?: string }): Promise<any> {
  const headers = getAuthHeaders();
  const url = `${WP_API_BASE}/pages/${id}`;
  console.log(`  Updating page ID ${id}: "${data.title}"...`);

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      title: data.title,
      content: data.content,
      status: data.status || "publish",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update page ${id}: ${res.status} ${res.statusText} - ${text}`);
  }

  const result = await res.json();
  console.log(`  ✓ Updated page ID ${id}: "${data.title}"`);
  return result;
}

async function createPage(data: { title: string; slug: string; content: string; parent?: number; status?: string }): Promise<any> {
  const headers = getAuthHeaders();
  const url = `${WP_API_BASE}/pages`;
  console.log(`  Creating page: "${data.title}" (slug: ${data.slug})...`);

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      title: data.title,
      slug: data.slug,
      content: data.content,
      parent: data.parent || 0,
      status: data.status || "publish",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create page "${data.title}": ${res.status} ${res.statusText} - ${text}`);
  }

  const result = await res.json();
  console.log(`  ✓ Created page ID ${result.id}: "${data.title}"`);
  return result;
}

function buildHomepageContent(): string {
  const starSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="hsl(35 92% 50%)" stroke="hsl(35 92% 50%)" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  const stars5 = `${starSvg}${starSvg}${starSvg}${starSvg}${starSvg}`;
  const checkSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(35 92% 50%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>`;

  const babySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/></svg>`;
  const stethSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>`;
  const brainSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>`;
  const activitySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>`;
  const heartSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></svg>`;

  return `<!-- wp:html -->
<div class="hp-hero">
  <div>
    <div class="hp-hero-label">Medical Malpractice Attorneys</div>
    <h1>Hurt by a Doctor or Hospital? <em>We Help Families</em> Get Answers.</h1>
    <p class="hp-hero-text">If you or someone you love was seriously harmed by a doctor or hospital, you have rights. Hospitals have lawyers on day one. You deserve someone fighting for you too.</p>
    <div class="hp-hero-buttons">
      <a href="/contact-us">Free Case Review</a>
      <a href="/cases-we-handle">Learn More &rarr;</a>
    </div>
    <div class="hp-hero-badges">
      <span><span class="dot"></span> Available 24/7</span>
      <span><span class="dot"></span> No Win, No Fee</span>
    </div>
  </div>
  <div class="hp-hero-image">
    <div class="hp-img-border"></div>
    <div class="hp-img-wrap">
      <img src="/images/partners-hero.jpg" alt="Linda Thomas and Michelle Wan" />
    </div>
  </div>
</div>
<!-- /wp:html -->

<!-- wp:html -->
<div class="hp-trust">
  <div class="hp-trust-badges">
    <img src="/images/trust-badges.png" alt="Award Badges: Million Dollar Advocates, Super Lawyers, Top 25 Trial Lawyers" />
  </div>
  <div class="hp-trust-signals">
    <div class="hp-trust-rating">
      <div class="rating-top">
        <strong>5.0</strong>
        ${stars5}
      </div>
      <div class="rating-label">Google Reviews</div>
    </div>
    <div class="hp-trust-av">
      <div class="av-title">AV Preeminent&reg;</div>
      <div class="av-sub">Peer Rated for Highest Level of Excellence</div>
    </div>
  </div>
</div>
<!-- /wp:html -->

<!-- wp:html -->
<div class="hp-section" style="background:#F9F7F5;">
  <div class="hp-section-header">
    <span class="hp-section-label">Our Expertise</span>
    <h2>Focused Exclusively on Medical Malpractice</h2>
    <p>We don&rsquo;t handle car accidents or divorces. Our sole focus is mastering the complex realm of medical malpractice to win for you.</p>
  </div>
  <div class="hp-practice-grid">
    <div class="hp-practice-card">
      <div class="hp-practice-icon">${babySvg}</div>
      <h3>Birth Injuries</h3>
      <p>Cerebral palsy, hypoxia, shoulder dystocia, and preventable birth trauma.</p>
    </div>
    <div class="hp-practice-card">
      <div class="hp-practice-icon">${stethSvg}</div>
      <h3>Surgical Errors</h3>
      <p>Mistakes during surgery, anesthesia errors, and post-operative negligence.</p>
    </div>
    <div class="hp-practice-card">
      <div class="hp-practice-icon">${brainSvg}</div>
      <h3>Brain Injuries</h3>
      <p>Traumatic brain injuries resulting from medical negligence or malpractice.</p>
    </div>
    <div class="hp-practice-card">
      <div class="hp-practice-icon">${activitySvg}</div>
      <h3>Misdiagnosis</h3>
      <p>Failure to diagnose cancer, heart attacks, strokes, and critical conditions.</p>
    </div>
    <div class="hp-practice-card">
      <div class="hp-practice-icon">${heartSvg}</div>
      <h3>Wrongful Death</h3>
      <p>Seeking justice for the loss of a loved one due to medical carelessness.</p>
    </div>
    <div class="hp-practice-cta">
      <h3>Do You Have a Case?</h3>
      <p>Get a free review of your medical records by our expert team.</p>
      <a href="/contact-us">Contact Us Today</a>
    </div>
  </div>
</div>
<!-- /wp:html -->

<!-- wp:html -->
<div class="hp-about">
  <div style="position:relative;">
    <div class="hp-about-photos">
      <div class="photo-card">
        <img src="/images/partner-thomas.jpg" alt="Linda Thomas" />
        <div class="photo-name">Linda Thomas</div>
      </div>
      <div class="photo-card">
        <img src="/images/partner-wan.jpg" alt="Michelle Wan" />
        <div class="photo-name">Michelle Wan</div>
      </div>
    </div>
    <div class="hp-about-quote">
      <div class="quote-mark">&ldquo;</div>
      <p>We don&rsquo;t refer cases out. When you hire Thomas &amp; Wan, you get Thomas &amp; Wan.</p>
      <div class="quote-bar"></div>
    </div>
  </div>
  <div class="hp-about-content">
    <span class="hp-section-label">Why Choose Us</span>
    <h2 style="font-family:var(--font-serif);font-size:2.5rem;color:hsl(215 28% 17%);margin:0 0 1.5rem;border:none;padding:0;">When You Hire Us, You Work with Us.</h2>
    <p class="hp-about-text">At Thomas &amp; Wan, you will work directly with Linda Thomas and Michelle Wan. We do not pass your case to junior associates. We do not refer cases out to other attorneys. We prepare every case as if it will go to trial.</p>
    <p class="hp-about-text">With over 60 years of combined experience, we have held major Texas hospitals accountable over and over again.</p>
    <div class="hp-about-features">
      <div class="feature">
        ${checkSvg}
        <div>
          <h4>Direct Representation</h4>
          <p>You work directly with the partners, not junior associates.</p>
        </div>
      </div>
      <div class="feature">
        ${checkSvg}
        <div>
          <h4>Medical Expertise</h4>
          <p>We hire top experts from Harvard, Yale, and premier institutions.</p>
        </div>
      </div>
      <div class="feature">
        ${checkSvg}
        <div>
          <h4>Compassionate Advocacy</h4>
          <p>We fight aggressively in court while treating you with care.</p>
        </div>
      </div>
      <div class="feature">
        ${checkSvg}
        <div>
          <h4>Proven Results</h4>
          <p>Millions recovered for birth injuries and wrongful death.</p>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- /wp:html -->

<!-- wp:html -->
<div class="hp-team" style="background:#F9F7F5;padding:4rem 0;">
  <div class="hp-section-header">
    <span class="hp-section-label">Team Behind This Work</span>
    <h2>Dedicated to Your Family&rsquo;s Future</h2>
  </div>
  <div class="hp-team-grid">
    <div class="hp-team-card">
      <div class="team-photo">
        <img src="/images/partner-thomas.jpg" alt="Linda Laurent Thomas" />
        <div class="hp-team-name">
          <h3>Linda Laurent Thomas</h3>
          <span>Partner</span>
        </div>
      </div>
      <p class="team-bio">Since 1987, Linda Laurent Thomas has pursued aggressive legal representation on behalf of injury victims. She specializes in cases involving personal injuries, wrongful death, and medical malpractice.</p>
    </div>
    <div class="hp-team-card">
      <div class="team-photo">
        <img src="/images/partner-wan.jpg" alt="Michelle W. Wan" />
        <div class="hp-team-name">
          <h3>Michelle W. Wan</h3>
          <span>Partner</span>
        </div>
      </div>
      <p class="team-bio">Michelle W. Wan has worked exclusively representing clients in personal injury matters. Like Thomas, Wan has dedicated her career to fighting on behalf of persons injured by the negligence of others.</p>
    </div>
  </div>
</div>
<!-- /wp:html -->

<!-- wp:html -->
<div class="hp-results">
  <div class="hp-section-header">
    <span class="hp-section-label">Proven Track Record</span>
    <h2>Recent Case Results</h2>
  </div>
  <div class="hp-result-grid">
    <div class="hp-result-card">
      <div class="hp-result-amount">$6.5 Million</div>
      <div class="result-type">Birth Injury Settlement</div>
      <p class="result-desc">Settlement for a child who suffered brain damage due to delayed delivery.</p>
    </div>
    <div class="hp-result-card">
      <div class="hp-result-amount">$2.1 Million</div>
      <div class="result-type">Surgical Error</div>
      <p class="result-desc">Verdict for a patient who suffered permanent nerve damage during routine surgery.</p>
    </div>
    <div class="hp-result-card">
      <div class="hp-result-amount">$4.8 Million</div>
      <div class="result-type">Wrongful Death</div>
      <p class="result-desc">Settlement for a family who lost a mother due to misdiagnosis of heart condition.</p>
    </div>
  </div>
</div>
<!-- /wp:html -->

<!-- wp:html -->
<div class="hp-testimonials">
  <div class="hp-section-header">
    <h2>Client Stories</h2>
  </div>
  <div class="hp-testimonial-grid">
    <div class="hp-testimonial-card">
      <div class="hp-testimonial-stars">${stars5}</div>
      <p class="testimonial-text">&ldquo;I had a hard time coming to terms with what happened to my baby at birth&hellip; and as I was looking for a Medical Malpractice attorney, her face was so welcoming. I instantly relaxed and what helped me thru my childbirth complications was she said it wasn&rsquo;t my fault.&rdquo;</p>
      <div class="testimonial-name">Alyssa</div>
      <div class="testimonial-label">Verified Client</div>
    </div>
    <div class="hp-testimonial-card">
      <div class="hp-testimonial-stars">${stars5}</div>
      <p class="testimonial-text">&ldquo;Thomas &amp; Wan did a great job representing me and my family. The lawyers went to work right away and through research found out critical information. They were aggressive and fought hard for us. I highly recommend them.&rdquo;</p>
      <div class="testimonial-name">Lisa A.</div>
      <div class="testimonial-label">Verified Client</div>
    </div>
    <div class="hp-testimonial-card">
      <div class="hp-testimonial-stars">${stars5}</div>
      <p class="testimonial-text">&ldquo;Linda Thomas and Michelle Wan are the dedicated attorneys you need. They explained everything clearly and were always available to answer my questions. Their expertise in birth injury cases is unmatched.&rdquo;</p>
      <div class="testimonial-name">Sarah M.</div>
      <div class="testimonial-label">Verified Client</div>
    </div>
  </div>
</div>
<!-- /wp:html -->

<!-- wp:html -->
<div class="hp-stats">
  <div class="hp-stats-grid">
    <div class="hp-stat">
      <div class="hp-stat-number">60+</div>
      <div class="stat-label">Years Combined Experience</div>
    </div>
    <div class="hp-stat">
      <div class="hp-stat-number">$50M+</div>
      <div class="stat-label">Recovered for Clients</div>
    </div>
    <div class="hp-stat">
      <div class="hp-stat-number">100%</div>
      <div class="stat-label">Medical Malpractice Focus</div>
    </div>
  </div>
</div>
<!-- /wp:html -->

<!-- wp:html -->
<div class="hp-faq">
  <div class="hp-faq-sidebar">
    <span class="hp-section-label">Common Questions</span>
    <h2 style="font-family:var(--font-serif);font-size:2.5rem;color:hsl(215 28% 17%);margin:0 0 1rem;border:none;padding:0;">Frequently Asked Questions</h2>
    <p style="font-size:1.125rem;color:hsl(215 16% 47%);font-weight:300;line-height:1.75;margin-bottom:2rem;">Navigating medical malpractice claims can be confusing. Here are answers to some of the most common questions our clients ask.</p>
    <div class="sidebar-box">
      <h3>Still have questions?</h3>
      <p>We are available 24/7 to answer your questions and help you understand your rights.</p>
      <a href="/contact-us">Contact Us Now</a>
    </div>
  </div>
  <div class="hp-faq-list">
    <div class="hp-faq-item">
      <div class="hp-faq-q">Do I have a case?</div>
      <div class="hp-faq-a">The first step is for us to help you get a copy of all your medical records. Then we work with our team of expert doctors and nurses to review the records to let us know if you have a case.</div>
    </div>
    <div class="hp-faq-item">
      <div class="hp-faq-q">What kind of help can my family receive?</div>
      <div class="hp-faq-a">If we feel you have a case, we will have our team of experts determine how much money it will take to pay for the past medical bills and future quality medical care for you or your loved one for the rest of his or her life.</div>
    </div>
    <div class="hp-faq-item">
      <div class="hp-faq-q">How much do you charge?</div>
      <div class="hp-faq-a">We work on a contingency basis. This means that you only pay a percentage for our services if we win a verdict or settlement for your family. If no recovery is made, you pay nothing.</div>
    </div>
    <div class="hp-faq-item">
      <div class="hp-faq-q">Why should we hire you?</div>
      <div class="hp-faq-a">There are very few attorneys in Texas who specialize in medical malpractice, and those are the only kind of cases we do. Linda Thomas and Michelle Wan have over 60 years of combined experience. If we take your case, we work on your case ourselves; we don&rsquo;t &ldquo;flip&rdquo; it to another firm.</div>
    </div>
  </div>
</div>
<!-- /wp:html -->

<!-- wp:html -->
<div class="hp-lead">
  <div class="hp-lead-box">
    <h3>Injured by Medical Negligence?</h3>
    <p>Tell us what happened. We&rsquo;ll review your case for free &mdash; no obligation, no cost.</p>
    <a href="/contact-us">Contact Us for a Free Review</a>
  </div>
</div>
<!-- /wp:html -->

<!-- wp:html -->
<div class="hp-blog">
  <div class="hp-blog-header">
    <div>
      <span class="hp-section-label">Latest Insights</span>
      <h2 style="font-family:var(--font-serif);font-size:2.5rem;color:hsl(215 28% 17%);margin:0;border:none;padding:0;">Legal Resources &amp; News</h2>
    </div>
    <a href="/blog" class="view-all">View All Articles &rarr;</a>
  </div>
  <div class="hp-blog-grid">
    <div class="hp-blog-card">
      <div class="blog-body">
        <div class="blog-meta">
          <span class="blog-cat">Birth Injury</span>
          <span>Jan 15, 2026</span>
        </div>
        <h3>Understanding Birth Injury Claims in Texas</h3>
        <p>Birth injuries can be devastating for families. Learn about your rights and the legal process for seeking justice in Texas.</p>
      </div>
    </div>
    <div class="hp-blog-card">
      <div class="blog-body">
        <div class="blog-meta">
          <span class="blog-cat">Surgical Errors</span>
          <span>Dec 28, 2025</span>
        </div>
        <h3>The Impact of Surgical Errors on Patient Safety</h3>
        <p>Surgical errors are more common than you might think. We discuss the most frequent types of surgical mistakes and how to prevent them.</p>
      </div>
    </div>
    <div class="hp-blog-card">
      <div class="blog-body">
        <div class="blog-meta">
          <span class="blog-cat">Medical Malpractice</span>
          <span>Nov 12, 2025</span>
        </div>
        <h3>Misdiagnosis: When Doctors Miss the Signs</h3>
        <p>Failure to diagnose a serious condition can have life-altering consequences. Here&rsquo;s what you need to know about medical misdiagnosis cases.</p>
      </div>
    </div>
  </div>
</div>
<!-- /wp:html -->`;
}

function buildAboutContent(): string {
  return `<!-- wp:heading {"level":1} -->
<h1>Compassionate Texas Medical Malpractice Lawyers</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>We Care, and Our Dedication Shines Through. Representing our clients in the pursuit of justice is both an honor and a privilege.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2>Empowering Citizens through the Legal System</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>We firmly believe that juries play a pivotal role in safeguarding the rights of citizens. In the courtroom, an injured individual stands on equal ground with even the largest hospital corporations.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Whether your case can be resolved amicably without the need for a lawsuit or requires a tenacious battle that extends all the way to trial, we're here to stand by your side. Every client, without exception, deserves the highest standard of legal representation and an equitable opportunity to present their case in court.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Why Choose Thomas &amp; Wan</h2>
<!-- /wp:heading -->

<!-- wp:heading {"level":3} -->
<h3>Unwavering Dedication</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Our commitment to seeking justice knows no bounds. We ensure our clients receive the compensation they deserve.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Advocates for Change</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>We strive to effect meaningful change in the medical industry to prevent future instances of malpractice.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Equal Footing</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Regardless of the size or influence of the opposing party, we stand ready to fight for your rights.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Quality Legal Representation</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Every client is entitled to top-notch legal representation handled with the utmost care and expertise.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2>Linda Laurent Thomas</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"className":"subtitle"} -->
<p><strong>Partner | Since 1987</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Since 1987, Linda Laurent Thomas has pursued aggressive legal representation on behalf of injury victims. Whether the wrongdoer is a Fortune 500 corporate giant or a reckless driver, Thomas has dedicated her career to fighting for individuals to obtain the maximum amount of damages available under the law.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Every case that the firm takes on is handled with the highest level of care and attention. This representation involves all phases of a complex personal injury action: early and thorough factual investigation, retention of expert witnesses, thorough case value assessment, aggressive pre-trial discovery, and proactive negotiations.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Education</h3>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li>South Texas College of Law (Cum Laude)</li>
<li>University of Texas at Austin</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->
<h3>Recognition</h3>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li>Multi-Million Dollar Advocates Forum</li>
<li>Elite Lawyers of America</li>
<li>H Texas Magazine Top Lawyer</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><em>Linda enjoys gardening, watercolor painting, photography, travel, and rescuing stray animals.</em></p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2>Michelle W. Wan</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"className":"subtitle"} -->
<p><strong>Partner</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Michelle W. Wan has worked exclusively representing clients in personal injury matters, handling numerous matters involving toxic exposures, medical negligence, and product defects. Like Thomas, Wan has dedicated her career to fighting on behalf of persons injured by the negligence of others.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Wan and Thomas work as a team in trial. Wan enjoys the ability to stand in front of juries and bring her clients' side of the story to the light of a courtroom. As a former law journal editor, she enjoys in-depth legal research and strives for concise and clear writing.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Education</h3>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li>University of Texas School of Law (2001)</li>
<li>Rice University (B.A., National Merit Scholar)</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->
<h3>Recognition</h3>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li>Multi-Million Dollar Advocates Forum</li>
<li>Texas Monthly SuperLawyer</li>
<li>Houstonia Magazine Top Lawyer</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><em>Michelle enjoys being a mother, cooking, and rescuing stray animals to give to Ms. Thomas.</em></p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2>Do You Have a Medical Malpractice Case?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Call us today for a free consultation. If you have the medical records, you can send them to us for a free review with no obligation. Remember, strict deadlines apply.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"cta"} -->
<p class="cta"><strong><a href="tel:713-529-1177">Call (713) 529-1177</a></strong></p>
<!-- /wp:paragraph -->`;
}

function buildCasesContent(): string {
  return `<!-- wp:heading {"level":1} -->
<h1>Cases We Handle</h1>
<!-- /wp:heading -->

<!-- wp:heading {"level":2} -->
<h2>Advocating for You and Your Family</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>If you're in need of legal guidance and support, you've come to the right place. Meet the dedicated team at Thomas &amp; Wan, who bring 60+ years of experience to the table.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>We've successfully handled numerous multi-million dollar cases related to serious medical malpractice and wrongful death issues across the nation. We're not afraid to take on challenging cases, and our commitment to justice is unwavering.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Brain Injuries</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>We understand the physical, emotional, and financial toll brain injuries can take on individuals and their families.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Birth Injuries</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>When things go wrong due to medical negligence, the consequences can be devastating. We help families protect a child's future.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Surgical Errors</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Surgical procedures are meant to improve your health. When errors occur, the results can be catastrophic. We fight for your rights.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Medication Errors</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Mistakes in medication administration can have severe consequences. Our team seeks justice on your behalf.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Misdiagnosis</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A misdiagnosis can delay proper treatment and exacerbate health issues. We pursue accountability and compensation.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>More Complex Harms</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Including burns, cerebral palsy, paralysis, hospital-acquired infections, HIE, anesthesia errors, wrong-site surgery, pulmonary embolism, stroke, and failure to diagnose or treat disease.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2>We handle the following types of cases:</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li><a href="/cases-we-handle/birth-injuries">Birth Injuries</a></li>
<li><a href="/cases-we-handle/complications-of-childbirth">Complications of Childbirth</a></li>
<li><a href="/cases-we-handle/medical-malpractice">Medical Malpractice</a></li>
<li><a href="/cases-we-handle/brain-injuries">Brain Injuries</a></li>
<li><a href="/cases-we-handle/surgical-errors">Surgical Errors</a></li>
<li><a href="/cases-we-handle/medication-errors">Medication Errors</a></li>
<li><a href="/cases-we-handle/misdiagnosis">Misdiagnosis</a></li>
</ul>
<!-- /wp:list -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2>Call Us Now For a Free Consultation</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Call us today for a free consultation—we will discuss what your legal options are for your medical malpractice case. If you have the medical records, you can send them to us for a free review with no obligation.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"cta"} -->
<p class="cta"><strong><a href="/contact-us">Contact Us</a></strong></p>
<!-- /wp:paragraph -->`;
}

function buildFAQContent(): string {
  return `<!-- wp:heading {"level":1} -->
<h1>Frequently Asked Questions</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Clear answers. Real guidance. If you don't see your question here, call us.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>I think I have a legal claim. What do I do now?</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>If you think you have a legal claim, your first step is finding a lawyer to represent you. You can contact Thomas &amp; Wan to discuss your claim by filling out a form or by calling 713.529.1177. A lawyer will evaluate your case.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>How do I know which lawyer to use?</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Use an attorney who has experience dealing with your type of claim and a proven track record of success. Ask about experience, how long they've practiced, how much time they spend on cases like yours, and whether they will personally handle the case or refer it to another firm.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Why should I hire Thomas &amp; Wan?</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Linda Laurent Thomas and Michelle Wan have extensive experience handling personal injury matters and are routinely asked to handle difficult cases by other law firms. They approach practicing law as a profession, not a factory. They handle cases with personal service and focus on results, keeping you informed of your options.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>How do I pay for an attorney?</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Most personal injury firms, including Thomas &amp; Wan, work on a contingency basis. This means you only pay for services if there is a verdict or settlement. If no recovery is made, you pay nothing.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Thomas &amp; Wan has taken my case. What now?</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The first part of the lawsuit process is called discovery. In this phase, both sides gather evidence and information that proves or disproves the claim.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>What do I have to do during discovery?</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>You may answer written questions (interrogatories) regarding personal information, witnesses, injuries, medical treatment, and other details. Your lawyer or paralegal may request additional information to strengthen the case.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>What if I have to give a deposition?</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A deposition is testimony under oath recorded for later use in court. The attorneys will ask questions, and a court reporter records testimony. Your attorney will prepare you and be by your side to ensure the process is fair.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>What is mediation?</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Mediation is a meeting with all parties to attempt settlement. A neutral mediator helps communicate between sides. Courts often require mediation before trial.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>What if my case goes to trial?</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A judge or jury determines responsibility and damages. If Thomas &amp; Wan wins a settlement or verdict, the fee is taken from that recovery.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2>Call Us Now For a Free Consultation</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Call us today for a free consultation—we will discuss what your legal options are for your medical malpractice case. If you have the medical records, you can send them to us for a free review with no obligation.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"cta"} -->
<p class="cta"><strong><a href="/contact-us">Contact Us</a></strong></p>
<!-- /wp:paragraph -->`;
}

function buildTestimonialsContent(): string {
  return `<!-- wp:heading {"level":1} -->
<h1>Testimonials</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Don't just take our word for it. Read what our clients have to say about their experience working with Thomas &amp; Wan.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p>"After a heart transplant in August 2016, Ernest 'Chris' Keys can't talk or walk. The Houston hospital is under pressure for the quality of its once-renowned heart program. Now it is being sued by Mr. Keys's family."</p><cite>— Houston Chronicle, July 5, 2018</cite></blockquote>
<!-- /wp:quote -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p>"Thomas &amp; Wan represented my baby who was seriously harmed by nurses at a hospital who did not know what they were doing. Linda and Michelle were able to guide us through what to do in getting help for my baby for the rest of his life."</p><cite>— Stephanie S.</cite></blockquote>
<!-- /wp:quote -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p>"Linda and Michelle represented me when I was hurt at a refinery. I had tried using a different lawyer, but he never returned my calls or talked to me. Linda and Michelle did a good job and they care about your case."</p><cite>— Rogelio L.</cite></blockquote>
<!-- /wp:quote -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p>"After being abandoned by my original lawyer who was greedy for money, Linda was a TRUE answer to my prayers. She is after JUSTICE, not money. She has spent COUNTLESS hours researching my case and asking just the right questions. She has the heart of a saint; she really cares about her clients and it shows. I have emailed her outside of our visits asking for updates or just addressing concerns I have, and she answers right away. I also have been very anxious and stressed with my case."</p><cite>— Lauren</cite></blockquote>
<!-- /wp:quote -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p>"Thomas &amp; Wan did a great job representing me and my family against the owner of our apartment complex. We have just moved in when our daughter was shot in the head by a stray bullet while she was sleeping in her bed. It was a miracle she survived. The lawyers at Thomas &amp; Wan went to work right away and through research found out that there had been five murders at that complex the year before. They also found out that the complex didn't hire security to patrol at night. They were aggressive and fought hard for us."</p><cite>— Lisa A.</cite></blockquote>
<!-- /wp:quote -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p>"I had a hard time coming to the terms with what happened to my baby at birth..and as I was looking thru and for a Medical Mal Practice attorney and her face was so welcoming I loved what I read and how long she has been an attorney. our first meet and greet I was anxious and emotional and she had a comfortable vibe in her tone of voice..her concern about what's happened..and her smile… I instantly relaxed and what helped me thru my childbirth complications was she said it wasn't my fault."</p><cite>— Alyssa</cite></blockquote>
<!-- /wp:quote -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2>Let Us Fight for Your Family Too</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>If you or a loved one has suffered due to medical negligence, we are here to listen. Contact us today for a free, confidential consultation.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"cta"} -->
<p class="cta"><strong><a href="/contact-us">Share Your Story With Us</a></strong></p>
<!-- /wp:paragraph -->`;
}

function buildContactContent(): string {
  return `<!-- wp:heading {"level":1} -->
<h1>Contact Us</h1>
<!-- /wp:heading -->

<!-- wp:heading {"level":2} -->
<h2>Speak with a medical malpractice attorney.</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Tell us what happened. We'll review your situation and explain your options—no obligation.</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column -->
<div class="wp-block-column">
<p><strong>Confidential</strong> — Your details stay private.</p>
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column">
<p><strong>No pressure</strong> — Clear, straightforward guidance.</p>
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column">
<p><strong>Free review</strong> — No fee unless we win.</p>
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2>Our Office</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Thomas &amp; Wan – Medical Malpractice Attorneys</strong><br>1710 Sunset Blvd<br>Houston, TX 77005</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Phone:</strong> <a href="tel:713-529-1177">(713) 529-1177</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Email:</strong> <a href="mailto:info@thomasandwan.com">info@thomasandwan.com</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Hours:</strong><br>Mon - Fri: 8:00 AM - 6:00 PM<br>Weekends: By Appointment</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2>Prefer to talk?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Call for a free consultation—we'll discuss your options and next steps. If you already have medical records, we can review them.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"cta"} -->
<p class="cta"><strong><a href="tel:713-529-1177">Call (713) 529-1177</a></strong></p>
<!-- /wp:paragraph -->`;
}

function buildBirthInjuriesContent(): string {
  return `<!-- wp:heading {"level":1} -->
<h1>Birth Injuries</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Sometimes babies are born with medical problems that don't match their parents' expectations. Sometimes it is because the baby is a victim of a birth injury that occurs during labor and delivery.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Giving birth is one of the most exciting events in a mother's life. Parents prepare for the big day when their new baby is born, and they hope and pray for a healthy baby. At Thomas &amp; Wan, our lawyers have represented many Texas families who have suffered injuries to their baby as a result of gross negligence and malpractice.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>We are very familiar with the medicine, the law and the policies of hospitals all across Texas concerning the need for monitoring and possible emergency delivery of laboring moms to prevent injuries to babies. Many times these injuries are preventable if hospitals only ensured that safety policies were followed by their labor nurses, midwives and doctors.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Types of Birth Injuries We Handle</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li>Hypoxic ischemic encephalopathy (HIE)</li>
<li>Cerebral palsy</li>
<li>Forceps/vacuum injuries</li>
<li>Induction problems</li>
<li>Gestational Diabetes mismanagement</li>
<li>Preeclampsia mismanagement</li>
<li>Shoulder Dystocia/Erb's palsy</li>
<li>Fetal heart monitoring problems</li>
<li>Delay in C-Section</li>
<li>Delay in delivery</li>
<li>Fetal acidosis</li>
<li>Umbilical cord compression</li>
<li>Infection mismanagement</li>
<li>Group B Strep mismanagement</li>
<li>Intubation problems</li>
<li>Placental abruption</li>
</ul>
<!-- /wp:list -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2>Birth Defects Versus Birth Negligence</h2>
<!-- /wp:heading -->

<!-- wp:heading {"level":3} -->
<h3>Birth Defects</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A birth defect is a health problem that affects your baby based on your child's genetic material or DNA. Examples include Down's Syndrome, a cleft palate, or heart murmurs. <strong>A birth defect is generally NOT medical malpractice.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Birth Injuries</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A birth injury is a medical issue that an infant is born with that is, in most cases, <strong>completely preventable</strong>. These are often caused by negligence during labor and delivery.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Common Causes of Preventable Birth Injuries</h3>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li>Pulling and/or twisting the infant improperly during the delivery period</li>
<li>Improper handling and use of birth-assisting tools, such as forceps or a vacuum extraction tool</li>
<li>Administering the wrong amount or the wrong type of medication to the mother during pregnancy and during labor</li>
<li>Failure to monitor the infant properly for distress, including failure to regularly monitor fetal heartbeat</li>
<li>Failure to schedule and perform an emergency cesarean surgery (C-section)</li>
</ul>
<!-- /wp:list -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2>Case Example: Lack Of Oxygen To The Brain During Labor</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Hypoxic Ischemic Encephalopathy (HIE) is a type of brain damage that occurs when an infant's brain doesn't receive enough oxygen. It is a dangerous condition that requires immediate medical intervention. HIE is the leading cause of infant fatalities in the United States, as well as the primary source of severe impairments.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Symptoms Associated with HIE</h3>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li>Meconium-stained amniotic fluid</li>
<li>Low heart rate</li>
<li>Poor muscle tone</li>
<li>Weak breathing or no breathing at all</li>
<li>Bluish or pale skin color</li>
<li>Excessive acid in the blood</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Effects of HIE may include developmental delays, epilepsy, cognitive issues, motor skill development delays, and neurodevelopment delays. The true severity of HIE generally cannot be determined until the baby reaches three to four years of age.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2>Legal Help for The Youngest Victims</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>At Thomas &amp; Wan, we have the training, experience and knowledge to sue grossly negligent hospitals, doctors, nurses and midwives for birth injuries. Please call us today for free—we are here to listen to you.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"cta"} -->
<p class="cta"><strong><a href="tel:713-529-1177">Call (713) 529-1177</a></strong></p>
<!-- /wp:paragraph -->`;
}

function buildMedicalMalpracticeContent(): string {
  return `<!-- wp:heading {"level":1} -->
<h1>Medical Malpractice</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>We have successfully resolved numerous multi-million dollar matters for serious medical malpractice and wrongful death across the nation.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Medical negligence can include claims against negligent hospitals, nurses, doctors, pharmacists, medical technicians, and other providers.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Types of Medical Malpractice We Handle</h2>
<!-- /wp:heading -->

<!-- wp:heading {"level":3} -->
<h3>Surgical Errors</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Operating on the wrong part of the body, leaving instruments inside the body, or removing the wrong organ.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Failure to Diagnose</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Failing to diagnose a disease or injury; ignoring obvious signs of infection, stroke, heart attack, or respiratory arrest.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Medication Errors</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Giving the wrong medication, overdosing a patient, or severe burns from medications.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Anesthesia Monitoring</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Failing to monitor anesthesia properly and preventable complications during procedures.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Birth-Related Negligence</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Birth injuries such as cerebral palsy, shoulder dystocia, oxygen deprivation, and umbilical cord strangulation.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Accountability</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Suit against nurses, doctors, medical techs, pharmacists, and other providers whose negligence caused harm.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2>Call Us Now For a Free Consultation</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Call us today for a free consultation—we will discuss what your legal options are for your medical malpractice case. If you have medical records, you can send them to us for a free review with no obligation.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"cta"} -->
<p class="cta"><strong><a href="/contact-us">Contact Us</a></strong></p>
<!-- /wp:paragraph -->`;
}

function buildComplicationsContent(): string {
  return `<!-- wp:heading {"level":1} -->
<h1>Complications of Childbirth</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>At Thomas &amp; Wan, we have helped families dealing with the devastating loss of a mother or serious permanent brain damage due to gross negligence during pregnancy and childbirth.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>For an expectant mother, childbirth is an exciting and nerve-wracking time. Most of the time, doctors, midwives and nurses do an excellent job of keeping mom and baby safe during labor and delivery.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Sometimes, however, medical providers can be grossly negligent in their medical care to the laboring mother. Thomas &amp; Wan represent mothers who have been injured or made ill due to malpractice by a doctor, midwife, nurse or other health care professional during pregnancy, labor and delivery, or after delivery.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Cases We Handle</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>We represent mothers and families in cases involving:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li>Preeclampsia and eclampsia</li>
<li>Obstetrical complications for the mother or obstetrical nurse negligence</li>
<li>C-section injuries</li>
<li>Postpartum hemorrhage</li>
<li>Infections</li>
<li>Prolapsed umbilical cord</li>
<li>Failure to monitor the infant</li>
<li>Vaginal tears</li>
<li>Ruptured uterus</li>
<li>Abruptio placenta</li>
<li>Cephalopelvic disproportion</li>
<li>Delivery trauma or improper resuscitation of the baby</li>
<li>Other pregnancy-related negligence</li>
</ul>
<!-- /wp:list -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2>We're Here to Help Your Family</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>At Thomas &amp; Wan, we have helped families dealing with the devastating loss of a mother or serious permanent brain damage due to gross negligence during pregnancy and childbirth. Please contact us today for a free and candid consultation.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2>Call Us Now For a Free Consultation</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Call us today for a free consultation—we will discuss what your legal options are for your medical malpractice case. If you have the medical records, you can send them to us for a free review with no obligation to you. Remember, in Texas there are strict deadlines for filing a medical malpractice lawsuit.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"cta"} -->
<p class="cta"><strong><a href="tel:713-529-1177">Call Today - Don't Delay</a></strong></p>
<!-- /wp:paragraph -->`;
}

function buildBrainInjuriesContent(): string {
  const syringeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/><path d="m14 4 6 6"/></svg>`;
  const brainSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>`;
  const scissorsSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/></svg>`;
  const alertSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`;
  const searchSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`;
  const arrowSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;
  const warningSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`;

  return `<!-- wp:html -->
<div class="pa-grid">
  <div>
    <p class="pa-intro">At Thomas &amp; Wan, we are deeply committed to representing individuals and families affected by brain injuries as a result of medical negligence. We understand that brain injuries can be life-altering, affecting every aspect of life. Compassionate, diligent, and thorough — we work to unravel the complex circumstances surrounding the incidents to seek justice for our clients.</p>
    <div class="pa-sidebar-box">
      <h3>Brain injury cases we handle:</h3>
      <p>Claims against negligent hospitals, nurses, doctors, and other providers whose actions caused preventable brain injuries.</p>
      <a href="/contact-us" class="pa-btn">Free Case Review ${arrowSvg}</a>
    </div>
  </div>
  <div>
    <div class="pa-cards">
      <div class="pa-card">
        <div class="pa-card-icon">${syringeSvg}</div>
        <h3>Anesthesia Errors</h3>
        <p>Improper management during anesthesia can lead to brain damage. Oxygen deprivation and improper medication are some of the causes.</p>
      </div>
      <div class="pa-card">
        <div class="pa-card-icon">${brainSvg}</div>
        <h3>Birth-Related Brain Injury</h3>
        <p>Proper care is critical during childbirth. Negligence can result in serious brain injury with lifelong consequences for the child.</p>
      </div>
      <div class="pa-card">
        <div class="pa-card-icon">${scissorsSvg}</div>
        <h3>Surgical Errors</h3>
        <p>Wrong site surgery, poor surgical technique, among others can result in traumatic brain injuries.</p>
      </div>
      <div class="pa-card">
        <div class="pa-card-icon">${alertSvg}</div>
        <h3>Emergency Room Negligence</h3>
        <p>Delays in assessments or treatments in emergency rooms can lead to preventable brain injuries.</p>
      </div>
      <div class="pa-card">
        <div class="pa-card-icon">${searchSvg}</div>
        <h3>Misdiagnosis of Stroke or Tumor</h3>
        <p>Incorrect or delayed diagnosis of a condition like stroke or brain tumor can lead to severe brain injuries.</p>
      </div>
    </div>
  </div>
</div>

<div class="pa-warning">
  <h2>Warning Signs of Brain Injury</h2>
  <div class="pa-warning-grid">
    <div class="pa-warning-item">${warningSvg}<p>Sudden changes in cognitive function or behavior</p></div>
    <div class="pa-warning-item">${warningSvg}<p>Long-term or worsening headache</p></div>
    <div class="pa-warning-item">${warningSvg}<p>Frequent dizziness or loss of balance</p></div>
    <div class="pa-warning-item">${warningSvg}<p>Prolonged periods of unconsciousness</p></div>
  </div>
</div>

<div class="pa-cta">
  <h2>Call Us Now For a Free Consultation</h2>
  <p>Call us today for a free consultation—we will discuss what your legal options are for your brain injury case. If you have medical records, you can send them to us for a free review with no obligation.</p>
  <a href="/contact-us" class="pa-btn">Free Case Review ${arrowSvg}</a>
</div>
<!-- /wp:html -->`;
}

function buildSurgicalErrorsContent(): string {
  return `<!-- wp:heading {"level":1} -->
<h1>Surgical Errors</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Surgical procedures carry inherent risks. However, preventable errors due to the negligence of healthcare providers can lead to grave consequences for patients. At Thomas &amp; Wan, we strive to hold these professionals accountable for their actions.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Claims against negligent surgeons, anesthesiologists, nurses, and hospitals whose errors caused preventable surgical harm.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Surgical Error Cases We Handle</h2>
<!-- /wp:heading -->

<!-- wp:heading {"level":3} -->
<h3>Anesthesia Complications</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>These can range from incorrect dosages to failure in monitoring vital signs, leading to serious patient harm.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Wrong Patient Surgery</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A horrifying but real mistake where surgery is performed on the wrong patient.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Wrong Site Surgery</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Operating on the wrong part of the patient's body, a preventable error with devastating consequences.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Retained Surgical Instruments</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Postoperative complications arise when surgical tools are unintentionally left inside the patient's body.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Post-Surgical Infections</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Poor hygiene standards and negligent post-operative care can lead to dangerous infections.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2>Warning Signs After Surgery</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li>Unexpected and severe pain post-surgery</li>
<li>Alarming changes at the site of surgery</li>
<li>Symptoms or illness unconnected to known surgical risks</li>
<li>Lack of improvement or worsening condition post-surgery</li>
</ul>
<!-- /wp:list -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2>Call Us Now For a Free Consultation</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Call us today for a free consultation—we will discuss what your legal options are for your surgical error case. If you have medical records, you can send them to us for a free review with no obligation.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"cta"} -->
<p class="cta"><strong><a href="/contact-us">Contact Us</a></strong></p>
<!-- /wp:paragraph -->`;
}

function buildMedicationErrorsContent(): string {
  return `<!-- wp:heading {"level":1} -->
<h1>Medication Errors</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>At Thomas &amp; Wan, we believe in the importance of safe, effective medication practices. Unfortunately, medication errors are common and can lead to severe health consequences. We fight for patients who have been harmed by preventable medication mistakes.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Claims against negligent doctors, pharmacists, nurses, and hospitals whose medication errors caused preventable patient harm.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Medication Error Cases We Handle</h2>
<!-- /wp:heading -->

<!-- wp:heading {"level":3} -->
<h3>Wrong Medication</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>When healthcare providers mistakenly give a patient a drug meant for another patient, or simply the wrong drug.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Overdose</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Administering or prescribing an excessive dose of medication, which can cause harmful or potentially lethal effects.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Drug Interactions</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The failure to consider how different drugs might interact in a patient's body, potentially leading to adverse effects.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Pharmacy Errors</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Errors made in the pharmacy, such as dispensing the wrong medication or incorrect dosage instructions.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Failure to Monitor Side Effects</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Neglecting the responsibility to monitor a patient's reaction to medication, missing crucial signs of adverse side effects.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2>Warning Signs of Medication Errors</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li>Unexpected or severe side effects after taking a new medication</li>
<li>Your medication looks different from what you usually take</li>
<li>You receive a medication you don't recognize</li>
<li>No changes or improvements after taking prescribed medication</li>
</ul>
<!-- /wp:list -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2>Call Us Now For a Free Consultation</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Call us today for a free consultation—we will discuss what your legal options are for your medication error case. If you have medical records, you can send them to us for a free review with no obligation.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"cta"} -->
<p class="cta"><strong><a href="/contact-us">Contact Us</a></strong></p>
<!-- /wp:paragraph -->`;
}

function buildMisdiagnosisContent(): string {
  return `<!-- wp:heading {"level":1} -->
<h1>Misdiagnosis</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Navigating the medical landscape can be daunting, more so when you're faced with the potential of a misdiagnosis. At Thomas &amp; Wan, we understand the gravity of these situations and are committed to helping victims of misdiagnosis understand their rights and pursue justice.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Claims against negligent doctors, specialists, and hospitals whose diagnostic failures caused preventable patient harm.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Misdiagnosis Cases We Handle</h2>
<!-- /wp:heading -->

<!-- wp:heading {"level":3} -->
<h3>Failure to Diagnose Cancer</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Missing the symptoms and indicators that point to a cancer diagnosis, delaying critical treatment.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Misdiagnosed Heart Attack</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Misinterpreting the signs of a heart attack, potentially leading to severe damage or even death.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Misdiagnosed Stroke</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Failure to recognize and properly diagnose stroke symptoms which may seriously worsen the patient's condition.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Misdiagnosed Infection</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Misidentifying or ignoring signs of an infection, leading to delayed treatment and possible complications.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Delayed Diagnosis</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>General delays in identifying a disease or condition, prolonging the patient's discomfort and causing preventable damage.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2>Warning Signs of Misdiagnosis</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li>Symptoms persist or worsen despite following a treatment plan</li>
<li>A diagnosis was made without comprehensive testing</li>
<li>Your healthcare provider dismisses your concerns or symptoms</li>
<li>A second opinion significantly differs from your original diagnosis</li>
</ul>
<!-- /wp:list -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2>Call Us Now For a Free Consultation</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Call us today for a free consultation—we will discuss what your legal options are for your misdiagnosis case. If you have medical records, you can send them to us for a free review with no obligation.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"cta"} -->
<p class="cta"><strong><a href="/contact-us">Contact Us</a></strong></p>
<!-- /wp:paragraph -->`;
}

function getAllPages(): PageDefinition[] {
  return [
    { id: 2, title: "Home", slug: "home", content: buildHomepageContent() },
    { id: 6, title: "About Thomas & Wan, LLP", slug: "about-thomas-wan-llp", content: buildAboutContent() },
    { id: 8, title: "Cases We Handle", slug: "cases-we-handle", content: buildCasesContent() },
    { id: 10, title: "FAQ", slug: "faq", content: buildFAQContent() },
    { id: 12, title: "Testimonials", slug: "testimonials", content: buildTestimonialsContent() },
    { id: 16, title: "Contact Us", slug: "contact-us", content: buildContactContent() },
    { id: 104, title: "Birth Injuries", slug: "birth-injuries", content: buildBirthInjuriesContent(), parent: CASES_PARENT_ID },
    { id: 108, title: "Medical Malpractice", slug: "medical-malpractice", content: buildMedicalMalpracticeContent(), parent: CASES_PARENT_ID },
    { id: 110, title: "Complications of Childbirth", slug: "complications-of-childbirth", content: buildComplicationsContent(), parent: CASES_PARENT_ID },
    { title: "Brain Injuries", slug: "brain-injuries", content: buildBrainInjuriesContent(), parent: CASES_PARENT_ID },
    { title: "Surgical Errors", slug: "surgical-errors", content: buildSurgicalErrorsContent(), parent: CASES_PARENT_ID },
    { title: "Medication Errors", slug: "medication-errors", content: buildMedicationErrorsContent(), parent: CASES_PARENT_ID },
    { title: "Misdiagnosis", slug: "misdiagnosis", content: buildMisdiagnosisContent(), parent: CASES_PARENT_ID },
  ];
}

export async function pushAllPagesToWordPress(): Promise<{
  updated: string[];
  created: string[];
  errors: string[];
}> {
  console.log("=== Starting WordPress Page Push ===");
  console.log(`API Base: ${WP_API_BASE}`);

  const pages = getAllPages();
  const updated: string[] = [];
  const created: string[] = [];
  const errors: string[] = [];

  for (const page of pages) {
    try {
      if (page.id) {
        await updatePage(page.id, {
          title: page.title,
          content: page.content,
          status: "publish",
        });
        updated.push(`${page.title} (ID: ${page.id})`);
      } else {
        const result = await createPage({
          title: page.title,
          slug: page.slug,
          content: page.content,
          parent: page.parent,
          status: "publish",
        });
        created.push(`${page.title} (ID: ${result.id}, slug: ${page.slug})`);
      }
    } catch (error: any) {
      const msg = `Failed: ${page.title} — ${error.message}`;
      console.error(`  ✗ ${msg}`);
      errors.push(msg);
    }
  }

  console.log("\n=== WordPress Page Push Complete ===");
  console.log(`Updated: ${updated.length} pages`);
  console.log(`Created: ${created.length} pages`);
  console.log(`Errors: ${errors.length}`);

  if (updated.length > 0) {
    console.log("\nUpdated pages:");
    updated.forEach((p) => console.log(`  - ${p}`));
  }
  if (created.length > 0) {
    console.log("\nCreated pages:");
    created.forEach((p) => console.log(`  - ${p}`));
  }
  if (errors.length > 0) {
    console.log("\nErrors:");
    errors.forEach((e) => console.log(`  - ${e}`));
  }

  return { updated, created, errors };
}

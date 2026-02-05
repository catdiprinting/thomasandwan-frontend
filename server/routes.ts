import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  fetchPosts,
  fetchPostBySlug,
  fetchPages,
  fetchPageBySlug,
  fetchCategories,
  fetchPostsWithMedia,
  fetchMedia,
  fetchAuthor,
  fetchAuthorBySlug,
  fetchCategoryBySlug,
  fetchCategoriesByIds,
  fetchPostsByAuthorWithMedia,
  fetchPostsByCategoryWithMedia,
  type WPPost,
  type WPPage,
} from "./wordpress";
import { 
  renderBlogPost, 
  renderHomepage, 
  renderAbout, 
  renderContact, 
  renderFAQ, 
  renderTestimonials, 
  renderCases,
  renderMedicalMalpractice,
  renderBirthInjuries,
  renderComplicationsOfChildbirth,
  renderBlogIndex,
  renderAuthorPage,
  renderCategoryPage
} from "./ssr";
import { exportStaticSite } from "./static-export";

// Detect search engine crawlers for SSR
function isBot(userAgent: string): boolean {
  const bots = [
    'googlebot', 'bingbot', 'yandexbot', 'duckduckbot', 'slurp', 
    'baiduspider', 'facebookexternalhit', 'twitterbot', 'linkedinbot',
    'whatsapp', 'telegram', 'applebot', 'pinterest', 'semrushbot',
    'ahrefsbot', 'mj12bot', 'dotbot', 'petalbot', 'bytespider'
  ];
  const ua = userAgent.toLowerCase();
  return bots.some(bot => ua.includes(bot));
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/posts", async (req: Request, res: Response) => {
    try {
      const perPage = parseInt(req.query.per_page as string) || 10;
      const page = parseInt(req.query.page as string) || 1;
      const withMedia = req.query.with_media === "true";

      if (withMedia) {
        const posts = await fetchPostsWithMedia({ per_page: perPage, page });
        res.json(posts);
      } else {
        const posts = await fetchPosts({ per_page: perPage, page });
        res.json(posts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  app.get("/api/posts/:slug", async (req: Request, res: Response) => {
    try {
      const slug = req.params.slug as string;
      const post = await fetchPostBySlug(slug);
      if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
      }

      const [featured_image, author, post_categories] = await Promise.all([
        post.featured_media ? fetchMedia(post.featured_media) : Promise.resolve(undefined),
        post.author ? fetchAuthor(post.author) : Promise.resolve(null),
        post.categories?.length ? fetchCategoriesByIds(post.categories) : Promise.resolve([]),
      ]);

      res.json({ ...post, featured_image, author_info: author, post_categories });
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  app.get("/api/pages", async (req: Request, res: Response) => {
    try {
      const perPage = parseInt(req.query.per_page as string) || 10;
      const page = parseInt(req.query.page as string) || 1;
      const pages = await fetchPages({ per_page: perPage, page });
      res.json(pages);
    } catch (error) {
      console.error("Error fetching pages:", error);
      res.status(500).json({ error: "Failed to fetch pages" });
    }
  });

  app.get("/api/pages/:slug", async (req: Request, res: Response) => {
    try {
      const slug = req.params.slug as string;
      const wpPage = await fetchPageBySlug(slug);
      if (!wpPage) {
        res.status(404).json({ error: "Page not found" });
        return;
      }
      res.json(wpPage);
    } catch (error) {
      console.error("Error fetching page:", error);
      res.status(500).json({ error: "Failed to fetch page" });
    }
  });

  app.get("/api/categories", async (_req: Request, res: Response) => {
    try {
      const categories = await fetchCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/authors/:slug", async (req: Request, res: Response) => {
    try {
      const slug = req.params.slug as string;
      const author = await fetchAuthorBySlug(slug);
      if (!author) {
        res.status(404).json({ error: "Author not found" });
        return;
      }
      
      const perPage = parseInt(req.query.per_page as string) || 12;
      const page = parseInt(req.query.page as string) || 1;
      const posts = await fetchPostsByAuthorWithMedia(author.id, { per_page: perPage, page });
      
      res.json({ author, posts });
    } catch (error) {
      console.error("Error fetching author:", error);
      res.status(500).json({ error: "Failed to fetch author" });
    }
  });

  app.get("/api/categories/:slug/posts", async (req: Request, res: Response) => {
    try {
      const slug = req.params.slug as string;
      const category = await fetchCategoryBySlug(slug);
      if (!category) {
        res.status(404).json({ error: "Category not found" });
        return;
      }
      
      const perPage = parseInt(req.query.per_page as string) || 12;
      const page = parseInt(req.query.page as string) || 1;
      const posts = await fetchPostsByCategoryWithMedia(category.id, { per_page: perPage, page });
      
      res.json({ category, posts });
    } catch (error) {
      console.error("Error fetching category posts:", error);
      res.status(500).json({ error: "Failed to fetch category posts" });
    }
  });

  // Contact form submission - proxies to Contact Form 7 on main site
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const { name, email, phone, address, message } = req.body;

      // Validate required fields
      if (!name || !email || !message) {
        res.status(400).json({ 
          success: false, 
          message: "Please fill in all required fields (name, email, message)." 
        });
        return;
      }

      // Create FormData for CF7 submission
      const formData = new FormData();
      // Required CF7 hidden fields
      formData.append("_wpcf7", "163");
      formData.append("_wpcf7_version", "6.1.4");
      formData.append("_wpcf7_locale", "en_US");
      formData.append("_wpcf7_unit_tag", "wpcf7-f163-p16-o1");
      formData.append("_wpcf7_container_post", "16");
      formData.append("_wpcf7_posted_data_hash", "");
      formData.append("_wpcf7_recaptcha_response", "");
      // Form fields
      formData.append("your-name", name);
      formData.append("your-email", email);
      formData.append("phone-no", phone || "");
      formData.append("Address", address || "");
      formData.append("your-message", message);

      // Submit to Contact Form 7 on main site (form ID: 163)
      const cf7Response = await fetch(
        "https://www.thomasandwan.com/wp-json/contact-form-7/v1/contact-forms/163/feedback",
        {
          method: "POST",
          body: formData,
        }
      );

      const cf7Result = await cf7Response.json();

      if (cf7Result.status === "mail_sent") {
        res.json({ 
          success: true, 
          message: "Your message has been sent successfully." 
        });
      } else if (cf7Result.status === "validation_failed") {
        res.status(400).json({ 
          success: false, 
          message: cf7Result.message || "Please check your form and try again." 
        });
      } else if (cf7Result.status === "spam") {
        res.status(400).json({ 
          success: false, 
          message: "Your message was flagged as spam. Please try calling us instead." 
        });
      } else {
        console.error("CF7 unexpected response:", cf7Result);
        res.status(500).json({ 
          success: false, 
          message: "Unable to send message. Please try calling us at (713) 529-1177." 
        });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      res.status(500).json({ 
        success: false, 
        message: "Unable to send message. Please try calling us at (713) 529-1177." 
      });
    }
  });

  app.get("/api/export/post/:slug", async (req: Request, res: Response) => {
    try {
      const slug = req.params.slug as string;
      const post = await fetchPostBySlug(slug);
      if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
      }

      let featuredImageHtml = "";
      if (post.featured_media) {
        const media = await fetchMedia(post.featured_media);
        if (media) {
          featuredImageHtml = `<img src="${media.source_url}" alt="${media.alt_text || post.title.rendered}" class="featured-image" />`;
        }
      }

      const html = generatePostHtml(post, featuredImageHtml);
      res.setHeader("Content-Type", "text/html");
      res.setHeader("Content-Disposition", `attachment; filename="${post.slug}.html"`);
      res.send(html);
    } catch (error) {
      console.error("Error exporting post:", error);
      res.status(500).json({ error: "Failed to export post" });
    }
  });

  app.get("/api/export/page/:slug", async (req: Request, res: Response) => {
    try {
      const slug = req.params.slug as string;
      const wpPage = await fetchPageBySlug(slug);
      if (!wpPage) {
        res.status(404).json({ error: "Page not found" });
        return;
      }

      const html = generatePageHtml(wpPage);
      res.setHeader("Content-Type", "text/html");
      res.setHeader("Content-Disposition", `attachment; filename="${wpPage.slug}.html"`);
      res.send(html);
    } catch (error) {
      console.error("Error exporting page:", error);
      res.status(500).json({ error: "Failed to export page" });
    }
  });

  app.get("/api/export/all-posts", async (req: Request, res: Response) => {
    try {
      const posts = await fetchPosts({ per_page: 100 });
      const exportData = await Promise.all(
        posts.map(async (post) => {
          let featuredImageHtml = "";
          if (post.featured_media) {
            const media = await fetchMedia(post.featured_media);
            if (media) {
              featuredImageHtml = `<img src="${media.source_url}" alt="${media.alt_text || post.title.rendered}" class="featured-image" />`;
            }
          }
          return {
            slug: post.slug,
            title: post.title.rendered,
            html: generatePostHtml(post, featuredImageHtml),
          };
        })
      );
      res.json(exportData);
    } catch (error) {
      console.error("Error exporting all posts:", error);
      res.status(500).json({ error: "Failed to export posts" });
    }
  });

  app.post("/api/export/static", async (req: Request, res: Response) => {
    try {
      console.log("Starting static site export...");
      const outputDir = "./static-export";
      const result = await exportStaticSite(outputDir);
      
      if (result.success) {
        res.json({
          success: true,
          message: `Successfully exported ${result.files.length} files to ${outputDir}`,
          files: result.files,
          errors: result.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Export completed with errors",
          files: result.files,
          errors: result.errors
        });
      }
    } catch (error) {
      console.error("Error during static export:", error);
      res.status(500).json({ error: "Failed to export static site" });
    }
  });

  app.get("/api/export/static/status", async (req: Request, res: Response) => {
    try {
      const outputDir = "./static-export";
      const fs = await import("fs");
      
      if (!fs.existsSync(outputDir)) {
        res.json({ exists: false, files: [] });
        return;
      }
      
      const files: string[] = [];
      const readDir = (dir: string, prefix: string = "") => {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          if (entry.isFile()) {
            files.push(prefix + entry.name);
          } else if (entry.isDirectory()) {
            readDir(`${dir}/${entry.name}`, `${prefix}${entry.name}/`);
          }
        }
      };
      readDir(outputDir);
      
      res.json({ exists: true, files });
    } catch (error) {
      console.error("Error checking export status:", error);
      res.status(500).json({ error: "Failed to check export status" });
    }
  });

  // SSR Routes - serve to bots only, regular users get React app
  app.get("/", (req: Request, res: Response, next: Function) => {
    const ua = req.headers['user-agent'] || '';
    if (!isBot(ua)) return next();
    res.setHeader("Content-Type", "text/html");
    res.send(renderHomepage());
  });

  app.get("/about", (req: Request, res: Response, next: Function) => {
    const ua = req.headers['user-agent'] || '';
    if (!isBot(ua)) return next();
    res.setHeader("Content-Type", "text/html");
    res.send(renderAbout());
  });

  app.get("/contact", (req: Request, res: Response, next: Function) => {
    const ua = req.headers['user-agent'] || '';
    if (!isBot(ua)) return next();
    res.setHeader("Content-Type", "text/html");
    res.send(renderContact());
  });

  app.get("/faq", (req: Request, res: Response, next: Function) => {
    const ua = req.headers['user-agent'] || '';
    if (!isBot(ua)) return next();
    res.setHeader("Content-Type", "text/html");
    res.send(renderFAQ());
  });

  app.get("/testimonials", (req: Request, res: Response, next: Function) => {
    const ua = req.headers['user-agent'] || '';
    if (!isBot(ua)) return next();
    res.setHeader("Content-Type", "text/html");
    res.send(renderTestimonials());
  });

  app.get("/blog", async (req: Request, res: Response, next: Function) => {
    const ua = req.headers['user-agent'] || '';
    if (!isBot(ua)) return next();
    res.setHeader("Content-Type", "text/html");
    res.send(await renderBlogIndex());
  });

  app.get("/cases-we-handle", (req: Request, res: Response, next: Function) => {
    const ua = req.headers['user-agent'] || '';
    if (!isBot(ua)) return next();
    res.setHeader("Content-Type", "text/html");
    res.send(renderCases());
  });

  app.get("/cases-we-handle/medical-malpractice", (req: Request, res: Response, next: Function) => {
    const ua = req.headers['user-agent'] || '';
    if (!isBot(ua)) return next();
    res.setHeader("Content-Type", "text/html");
    res.send(renderMedicalMalpractice());
  });

  app.get("/cases-we-handle/birth-injuries", (req: Request, res: Response, next: Function) => {
    const ua = req.headers['user-agent'] || '';
    if (!isBot(ua)) return next();
    res.setHeader("Content-Type", "text/html");
    res.send(renderBirthInjuries());
  });

  app.get("/cases-we-handle/complications-of-childbirth", (req: Request, res: Response, next: Function) => {
    const ua = req.headers['user-agent'] || '';
    if (!isBot(ua)) return next();
    res.setHeader("Content-Type", "text/html");
    res.send(renderComplicationsOfChildbirth());
  });

  // Add ?ssr=true to force SSR for testing
  app.get("/author/:slug", async (req: Request, res: Response, next: Function) => {
    try {
      const ua = req.headers['user-agent'] || '';
      const forceSSR = req.query.ssr === 'true';
      if (!forceSSR && !isBot(ua)) return next();
      
      const slug = req.params.slug as string;
      const html = await renderAuthorPage(slug);
      if (!html) return next();
      
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } catch (error) {
      console.error("Error rendering author page:", error);
      next();
    }
  });

  // Add ?ssr=true to force SSR for testing
  app.get("/category/:slug", async (req: Request, res: Response, next: Function) => {
    try {
      const ua = req.headers['user-agent'] || '';
      const forceSSR = req.query.ssr === 'true';
      if (!forceSSR && !isBot(ua)) return next();
      
      const slug = req.params.slug as string;
      const html = await renderCategoryPage(slug);
      if (!html) return next();
      
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } catch (error) {
      console.error("Error rendering category page:", error);
      next();
    }
  });

  // Blog post SSR route - /blog/:slug path
  // Add ?ssr=true to force SSR for testing
  app.get("/blog/:slug", async (req: Request, res: Response, next: Function) => {
    try {
      const ua = req.headers['user-agent'] || '';
      const forceSSR = req.query.ssr === 'true';
      if (!forceSSR && !isBot(ua)) return next();
      
      const slug = req.params.slug as string;
      const html = await renderBlogPost(slug);
      if (!html) return next();
      
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } catch (error) {
      console.error("Error rendering blog post:", error);
      next();
    }
  });

  // Dynamic blog post route - SSR for blog posts at root level (bots get full SSR, users get React)
  app.get("/:slug", async (req: Request, res: Response, next: Function) => {
    try {
      const ua = req.headers['user-agent'] || '';
      if (!isBot(ua)) return next();
      
      const slug = req.params.slug as string;
      
      if (slug.includes('.') || ['api', 'assets', 'src', 'node_modules'].includes(slug)) {
        return next();
      }
      
      const html = await renderBlogPost(slug);
      if (!html) {
        return next();
      }
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } catch (error) {
      console.error("Error rendering blog post:", error);
      next();
    }
  });

  return httpServer;
}

function generatePostHtml(post: WPPost, featuredImageHtml: string): string {
  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${post.title.rendered} | Thomas & Wan</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.7; color: #334155; background: #fff; }
    .container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
    .meta { font-size: 0.875rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; }
    h1 { font-family: Georgia, serif; font-size: 2.5rem; color: #0f172a; margin-bottom: 24px; line-height: 1.2; }
    .featured-image { width: 100%; height: auto; margin-bottom: 32px; }
    .content { font-size: 1.125rem; }
    .content p { margin-bottom: 1.5em; }
    .content h2, .content h3 { font-family: Georgia, serif; color: #0f172a; margin-top: 2em; margin-bottom: 1em; }
    .content h2 { font-size: 1.75rem; }
    .content h3 { font-size: 1.5rem; }
    .content ul, .content ol { margin-bottom: 1.5em; padding-left: 1.5em; }
    .content li { margin-bottom: 0.5em; }
    .content a { color: #B8860B; text-decoration: underline; }
    .content img { max-width: 100%; height: auto; margin: 1.5em 0; }
    .cta { background: #0f172a; color: #fff; padding: 40px; margin-top: 48px; text-align: center; }
    .cta h3 { font-family: Georgia, serif; font-size: 1.5rem; margin-bottom: 16px; }
    .cta p { color: rgba(255,255,255,0.8); margin-bottom: 24px; }
    .cta a { display: inline-block; background: #B8860B; color: #fff; padding: 16px 32px; text-decoration: none; text-transform: uppercase; font-weight: bold; letter-spacing: 0.1em; font-size: 0.875rem; }
  </style>
</head>
<body>
  <article class="container">
    <div class="meta">${date}</div>
    <h1>${post.title.rendered}</h1>
    ${featuredImageHtml}
    <div class="content">
      ${post.content.rendered}
    </div>
    <div class="cta">
      <h3>Talk to an Attorney</h3>
      <p>If you believe medical negligence played a role in your situation, reach out for a free consultation.</p>
      <a href="https://www.thomasandwan.com/contact-us/">Contact Thomas & Wan</a>
    </div>
  </article>
</body>
</html>`;
}

function generatePageHtml(page: WPPage): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title.rendered} | Thomas & Wan</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.7; color: #334155; background: #fff; }
    .container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
    h1 { font-family: Georgia, serif; font-size: 2.5rem; color: #0f172a; margin-bottom: 24px; line-height: 1.2; }
    .content { font-size: 1.125rem; }
    .content p { margin-bottom: 1.5em; }
    .content h2, .content h3 { font-family: Georgia, serif; color: #0f172a; margin-top: 2em; margin-bottom: 1em; }
    .content a { color: #B8860B; text-decoration: underline; }
  </style>
</head>
<body>
  <article class="container">
    <h1>${page.title.rendered}</h1>
    <div class="content">
      ${page.content.rendered}
    </div>
  </article>
</body>
</html>`;
}

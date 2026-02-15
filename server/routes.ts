import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import OpenAI from "openai";
import { storage } from "./storage";
import {
  fetchPosts,
  fetchPostBySlug,
  fetchCategories,
  fetchPostsWithMedia,
  fetchPostsWithPagination,
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
  renderBrainInjuries,
  renderSurgicalErrors,
  renderMedicationErrors,
  renderMisdiagnosis,
  renderBlogIndex,
  renderAuthorPage,
  renderCategoryPage
} from "./ssr";
import { exportStaticSite } from "./static-export";
import { db } from "./db";
import { wpPagesCache } from "@shared/schema";
import { eq } from "drizzle-orm";
import { getPostBySlug, getPageBySlug, purgeAndWarm, getCacheStats, purgeAllCache } from "./wp-content";
import { getHomepageFields, getAboutFields, getPracticeAreaFields, purgeCmsCache } from "./wp-graphql";


export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/posts", async (req: Request, res: Response) => {
    try {
      const perPage = parseInt(req.query.per_page as string) || 10;
      const page = parseInt(req.query.page as string) || 1;
      const withMedia = req.query.with_media === "true";

      const { posts, totalPages, total } = await fetchPostsWithPagination({ per_page: perPage, page });

      res.set("X-WP-TotalPages", String(totalPages));
      res.set("X-WP-Total", String(total));
      res.set("Access-Control-Expose-Headers", "X-WP-TotalPages, X-WP-Total");

      if (withMedia) {
        const postsWithMedia = await Promise.all(
          posts.map(async (post: any) => {
            if (post.featured_media) {
              const media = await fetchMedia(post.featured_media);
              return { ...post, featured_image: media || undefined };
            }
            return post;
          })
        );
        res.json(postsWithMedia);
      } else {
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
      const allPages = await db.select().from(wpPagesCache).where(eq(wpPagesCache.status, "publish"));
      res.json(allPages.map(p => ({
        id: p.id,
        slug: p.slug,
        date: p.date,
        modified: p.modified,
        title: { rendered: p.title },
        content: { rendered: p.content },
        excerpt: { rendered: p.excerpt },
        author: p.author,
        featured_media: p.featuredMedia,
        parent: p.parent,
        menu_order: p.menuOrder,
      })));
    } catch (error) {
      console.error("Error fetching pages:", error);
      res.status(500).json({ error: "Failed to fetch pages" });
    }
  });

  app.get("/api/pages/:slug", async (req: Request, res: Response) => {
    try {
      const slug = req.params.slug as string;
      const page = await getPageBySlug(slug);
      if (!page) {
        res.status(404).json({ error: "Page not found" });
        return;
      }
      res.json({
        id: page.id,
        slug: page.slug,
        date: page.date,
        modified: page.modified,
        title: { rendered: page.title },
        content: { rendered: page.content },
        excerpt: { rendered: page.excerpt },
        author: page.author,
        featured_media: page.featuredMedia,
        parent: page.parent,
        menu_order: page.menuOrder,
      });
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

  // Manual sync endpoint - triggers WordPress cache population
  app.post("/api/sync-wordpress", async (_req: Request, res: Response) => {
    try {
      const { syncWordPressCache } = await import("./wp-sync");
      await syncWordPressCache();
      res.json({ success: true, message: "WordPress cache sync completed" });
    } catch (error: any) {
      console.error("Error syncing WordPress cache:", error);
      res.status(500).json({ error: error.message || "Sync failed" });
    }
  });

  // Refresh cache - pulls updated content from WordPress
  app.post("/api/refresh-wordpress", async (_req: Request, res: Response) => {
    try {
      purgeAllCache();
      const { refreshWordPressCache } = await import("./wp-sync");
      const result = await refreshWordPressCache();
      res.json({ success: true, message: "WordPress cache refreshed", ...result });
    } catch (error: any) {
      console.error("Error refreshing WordPress cache:", error);
      res.status(500).json({ error: error.message || "Refresh failed" });
    }
  });

  app.get("/webhooks/wp/test", async (_req: Request, res: Response) => {
    console.log(`[webhook] Test endpoint hit`);
    res.json({ 
      status: "ok", 
      message: "Webhook endpoint is reachable",
      timestamp: new Date().toISOString(),
      secretConfigured: !!process.env.WP_WEBHOOK_SECRET,
    });
  });

  async function nukeAndRefreshAll(): Promise<{ success: boolean; message: string }> {
    console.log(`[nuke] Purging ALL caches...`);
    purgeAllCache();
    purgeCmsCache();
    console.log(`[nuke] All memory caches cleared. Refreshing from WordPress...`);
    const { refreshWordPressCache } = await import("./wp-sync");
    const result = await refreshWordPressCache();
    console.log(`[nuke] Full refresh complete: ${result.postsUpdated} posts updated, ${result.pagesUpdated} pages updated, ${result.mediaUpdated} media`);
    return { success: true, message: "All caches nuked and content refreshed from WordPress" };
  }

  async function notifyProductionRefresh(): Promise<void> {
    const prodUrl = process.env.PRODUCTION_URL;
    const secret = process.env.WP_WEBHOOK_SECRET;
    if (!prodUrl || !secret) {
      console.log(`[webhook] No PRODUCTION_URL configured, skipping production notification`);
      return;
    }
    const revalidateUrl = `${prodUrl}/api/revalidate-all?secret=${encodeURIComponent(secret)}`;
    try {
      console.log(`[webhook] Notifying production site to refresh: ${prodUrl}`);
      const resp = await fetch(revalidateUrl, { signal: AbortSignal.timeout(15000) });
      const body = await resp.text();
      console.log(`[webhook] Production refresh response (${resp.status}): ${body}`);
    } catch (err: any) {
      console.error(`[webhook] Failed to notify production: ${err.message}`);
    }
  }

  app.post("/webhooks/wp", async (req: Request, res: Response) => {
    console.log(`[webhook] === INCOMING REQUEST ===`);
    console.log(`[webhook] Body: ${JSON.stringify(req.body)}`);

    const secret = req.headers["x-webhook-secret"] as string;
    const expectedSecret = process.env.WP_WEBHOOK_SECRET;

    if (!expectedSecret) {
      console.error("[webhook] WP_WEBHOOK_SECRET not configured on server");
      res.status(500).json({ error: "Webhook secret not configured" });
      return;
    }

    if (!secret || secret !== expectedSecret) {
      console.warn(`[webhook] Unauthorized`);
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    try {
      const result = await nukeAndRefreshAll();
      notifyProductionRefresh().catch(() => {});
      res.json(result);
    } catch (err: any) {
      console.error(`[webhook] Error:`, err);
      res.status(500).json({ error: "Failed to refresh", details: err.message });
    }
  });

  app.get("/api/revalidate-all", async (req: Request, res: Response) => {
    const secret = req.query.secret as string;
    const expectedSecret = process.env.WP_WEBHOOK_SECRET;

    if (!expectedSecret || !secret || secret !== expectedSecret) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    try {
      const result = await nukeAndRefreshAll();
      res.json(result);
    } catch (err: any) {
      console.error(`[revalidate-all] Error:`, err);
      res.status(500).json({ error: "Failed to refresh", details: err.message });
    }
  });

  app.get("/api/cache-stats", async (_req: Request, res: Response) => {
    const stats = getCacheStats();
    res.json(stats);
  });

  app.get("/api/cms/homepage", async (_req: Request, res: Response) => {
    try {
      const fields = await getHomepageFields();
      if (!fields) {
        res.json({ source: "default", fields: null });
        return;
      }
      res.json({ source: "wordpress", fields });
    } catch (error: any) {
      console.error("Error fetching homepage CMS fields:", error);
      res.json({ source: "default", fields: null });
    }
  });

  app.get("/api/cms/about", async (_req: Request, res: Response) => {
    try {
      const fields = await getAboutFields();
      if (!fields) {
        res.json({ source: "default", fields: null });
        return;
      }
      res.json({ source: "wordpress", fields });
    } catch (error: any) {
      console.error("Error fetching about CMS fields:", error);
      res.json({ source: "default", fields: null });
    }
  });

  app.get("/api/cms/practice-area/:slug", async (req: Request, res: Response) => {
    try {
      const slug = req.params.slug;
      const fields = await getPracticeAreaFields(slug);
      if (!fields) {
        res.json({ source: "default", fields: null });
        return;
      }
      res.json({ source: "wordpress", fields });
    } catch (error: any) {
      console.error("Error fetching practice area CMS fields:", error);
      res.json({ source: "default", fields: null });
    }
  });

  app.get("/api/cms/page/:slug", async (req: Request, res: Response) => {
    try {
      const slug = req.params.slug;
      const { getGenericPageFields } = await import("./wp-graphql");
      const fields = await getGenericPageFields(slug);
      if (!fields) {
        res.json({ source: "default", fields: null });
        return;
      }
      res.json({ source: "wordpress", fields });
    } catch (error: any) {
      console.error("Error fetching page CMS fields:", error);
      res.json({ source: "default", fields: null });
    }
  });

  app.post("/api/cms/purge", async (_req: Request, res: Response) => {
    purgeCmsCache();
    res.json({ success: true, message: "CMS cache purged" });
  });

  // Push content to WordPress
  app.post("/api/push-to-wordpress", async (_req: Request, res: Response) => {
    try {
      const { pushAllPagesToWordPress } = await import("./wp-push");
      const result = await pushAllPagesToWordPress();
      res.json({ success: true, ...result });
    } catch (error: any) {
      console.error("Error pushing to WordPress:", error);
      res.status(500).json({ error: error.message || "Push to WordPress failed" });
    }
  });

  // OpenAI Assistant API
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const assistantId = process.env.OPENAI_ASSISTANT_ID || "";

  app.post("/api/assistant/thread", async (req: Request, res: Response) => {
    try {
      const thread = await openai.beta.threads.create();
      res.json({ threadId: thread.id });
    } catch (error: any) {
      console.error("Error creating thread:", error);
      res.status(500).json({ error: error.message || "Failed to create thread" });
    }
  });

  app.post("/api/assistant/message", async (req: Request, res: Response) => {
    try {
      const { threadId, message } = req.body;
      if (!threadId || !message) {
        res.status(400).json({ error: "threadId and message are required" });
        return;
      }

      await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: message,
      });

      const run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: assistantId,
      });

      let runStatus = await openai.beta.threads.runs.retrieve(run.id, { thread_id: threadId as string });
      let attempts = 0;
      while (runStatus.status !== "completed" && runStatus.status !== "failed" && attempts < 60) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        runStatus = await openai.beta.threads.runs.retrieve(run.id, { thread_id: threadId as string });
        attempts++;
      }

      if (runStatus.status === "failed") {
        res.status(500).json({ error: "Assistant run failed", details: runStatus.last_error });
        return;
      }

      if (runStatus.status !== "completed") {
        res.status(504).json({ error: "Assistant timed out" });
        return;
      }

      const messages = await openai.beta.threads.messages.list(threadId);
      const assistantMessage = messages.data.find((m) => m.role === "assistant");

      if (!assistantMessage) {
        res.status(500).json({ error: "No response from assistant" });
        return;
      }

      const content = assistantMessage.content
        .filter((c) => c.type === "text")
        .map((c) => (c as any).text.value)
        .join("\n");

      res.json({ response: content, threadId });
    } catch (error: any) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: error.message || "Failed to send message" });
    }
  });

  app.get("/api/assistant/history/:threadId", async (req: Request, res: Response) => {
    try {
      const threadId = req.params.threadId as string;
      const messages = await openai.beta.threads.messages.list(threadId);
      
      const history = messages.data
        .map((m) => ({
          role: m.role,
          content: m.content
            .filter((c) => c.type === "text")
            .map((c) => (c as any).text.value)
            .join("\n"),
          createdAt: m.created_at,
        }))
        .reverse();

      res.json({ messages: history });
    } catch (error: any) {
      console.error("Error fetching history:", error);
      res.status(500).json({ error: error.message || "Failed to fetch history" });
    }
  });

  // Sitemap cache
  let sitemapCache: { content: string; timestamp: number } | null = null;
  const SITEMAP_CACHE_DURATION = 60 * 60 * 1000; // 1 hour

  function escapeXml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  app.get("/sitemap.xml", async (_req: Request, res: Response) => {
    try {
      const now = Date.now();
      if (sitemapCache && (now - sitemapCache.timestamp) < SITEMAP_CACHE_DURATION) {
        res.setHeader("Content-Type", "application/xml");
        res.send(sitemapCache.content);
        return;
      }

      const [posts, categories] = await Promise.all([
        fetchPosts({ per_page: 100 }),
        fetchCategories(),
      ]);

      const staticPages = [
        { loc: '/about-thomas-wan-llp', priority: '0.8', changefreq: 'weekly' },
        { loc: '/cases-we-handle', priority: '0.8', changefreq: 'weekly' },
        { loc: '/contact-us', priority: '0.8', changefreq: 'weekly' },
        { loc: '/faq', priority: '0.8', changefreq: 'weekly' },
        { loc: '/testimonials', priority: '0.8', changefreq: 'weekly' },
        { loc: '/blog', priority: '0.8', changefreq: 'weekly' },
      ];

      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://thomasandwan.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

      for (const page of staticPages) {
        xml += `
  <url>
    <loc>https://thomasandwan.com${page.loc}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
      }

      for (const post of posts) {
        const lastmod = new Date(post.date).toISOString().split('T')[0];
        xml += `
  <url>
    <loc>https://thomasandwan.com/blog/${escapeXml(post.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      }

      for (const category of categories) {
        xml += `
  <url>
    <loc>https://thomasandwan.com/category/${escapeXml(category.slug)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
      }

      xml += `
  <url>
    <loc>https://thomasandwan.com/author/admin</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;

      sitemapCache = { content: xml, timestamp: now };
      res.setHeader("Content-Type", "application/xml");
      res.send(xml);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Failed to generate sitemap");
    }
  });

  app.get("/robots.txt", (_req: Request, res: Response) => {
    const content = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://thomasandwan.com/sitemap.xml`;
    res.setHeader("Content-Type", "text/plain");
    res.send(content);
  });

  app.get("/feed", async (_req: Request, res: Response) => {
    try {
      const posts = await fetchPostsWithMedia({ per_page: 20 });
      const now = new Date().toUTCString();

      let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Thomas &amp; Wan LLP - Medical Malpractice Blog</title>
    <link>https://thomasandwan.com/blog</link>
    <description>Expert legal insights on medical malpractice, birth injuries, and patient rights from Thomas &amp; Wan LLP, Houston&apos;s trusted medical malpractice attorneys.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>`;

      for (const post of posts) {
        const title = escapeXml(post.title.rendered);
        const link = `https://thomasandwan.com/blog/${escapeXml(post.slug)}`;
        const pubDate = new Date(post.date).toUTCString();
        const excerpt = post.excerpt?.rendered || '';

        rss += `
    <item>
      <title>${title}</title>
      <link>${link}</link>
      <description><![CDATA[${excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
      <guid>${link}</guid>
    </item>`;
      }

      rss += `
  </channel>
</rss>`;

      res.setHeader("Content-Type", "application/rss+xml");
      res.send(rss);
    } catch (error) {
      console.error("Error generating RSS feed:", error);
      res.status(500).send("Failed to generate RSS feed");
    }
  });

  // SSR Routes - serve full HTML content to all visitors
  app.get("/", async (req: Request, res: Response, next: Function) => {
    res.setHeader("Content-Type", "text/html");
    res.send(await renderHomepage());
  });

  app.get("/about-thomas-wan-llp", async (req: Request, res: Response, next: Function) => {
    res.setHeader("Content-Type", "text/html");
    res.send(await renderAbout());
  });

  app.get("/contact-us", async (req: Request, res: Response, next: Function) => {
    res.setHeader("Content-Type", "text/html");
    res.send(await renderContact());
  });

  app.get("/faq", async (req: Request, res: Response, next: Function) => {
    res.setHeader("Content-Type", "text/html");
    res.send(await renderFAQ());
  });

  app.get("/testimonials", async (req: Request, res: Response, next: Function) => {
    res.setHeader("Content-Type", "text/html");
    res.send(await renderTestimonials());
  });

  app.get("/blog", async (req: Request, res: Response, next: Function) => {
    res.setHeader("Content-Type", "text/html");
    res.send(await renderBlogIndex());
  });

  app.get("/cases-we-handle", async (req: Request, res: Response, next: Function) => {
    res.setHeader("Content-Type", "text/html");
    res.send(await renderCases());
  });

  app.get("/cases-we-handle/medical-malpractice", async (req: Request, res: Response, next: Function) => {
    res.setHeader("Content-Type", "text/html");
    res.send(await renderMedicalMalpractice());
  });

  app.get("/cases-we-handle/birth-injuries", async (req: Request, res: Response, next: Function) => {
    res.setHeader("Content-Type", "text/html");
    res.send(await renderBirthInjuries());
  });

  app.get("/cases-we-handle/complications-of-childbirth", async (req: Request, res: Response, next: Function) => {
    res.setHeader("Content-Type", "text/html");
    res.send(await renderComplicationsOfChildbirth());
  });

  app.get("/cases-we-handle/brain-injuries", async (req: Request, res: Response, next: Function) => {
    res.setHeader("Content-Type", "text/html");
    res.send(await renderBrainInjuries());
  });

  app.get("/cases-we-handle/surgical-errors", async (req: Request, res: Response, next: Function) => {
    res.setHeader("Content-Type", "text/html");
    res.send(await renderSurgicalErrors());
  });

  app.get("/cases-we-handle/medication-errors", async (req: Request, res: Response, next: Function) => {
    res.setHeader("Content-Type", "text/html");
    res.send(await renderMedicationErrors());
  });

  app.get("/cases-we-handle/misdiagnosis", async (req: Request, res: Response, next: Function) => {
    res.setHeader("Content-Type", "text/html");
    res.send(await renderMisdiagnosis());
  });

  app.get("/author/:slug", async (req: Request, res: Response, next: Function) => {
    try {
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

  app.get("/category/:slug", async (req: Request, res: Response, next: Function) => {
    try {
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
  app.get("/blog/:slug", async (req: Request, res: Response, next: Function) => {
    try {
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

  // Dynamic blog post route - SSR for blog posts at root level
  app.get("/:slug", async (req: Request, res: Response, next: Function) => {
    try {
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

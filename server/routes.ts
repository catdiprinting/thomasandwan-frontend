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
  type WPPost,
  type WPPage,
} from "./wordpress";
import { 
  renderBlogPost, 
  renderBlogIndex, 
  renderHomepage, 
  renderAbout, 
  renderContact, 
  renderFAQ, 
  renderTestimonials, 
  renderCases,
  renderMedicalMalpractice,
  renderBirthInjuries,
  renderComplicationsOfChildbirth
} from "./ssr";

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

      let featured_image = undefined;
      if (post.featured_media) {
        featured_image = await fetchMedia(post.featured_media);
      }

      res.json({ ...post, featured_image });
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

  // SSR Routes for all pages
  app.get("/", async (_req: Request, res: Response, next: Function) => {
    try {
      const html = renderHomepage();
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } catch (error) {
      console.error("Error rendering homepage:", error);
      next();
    }
  });

  app.get("/about", async (_req: Request, res: Response, next: Function) => {
    try {
      const html = renderAbout();
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } catch (error) {
      console.error("Error rendering about page:", error);
      next();
    }
  });

  app.get("/contact", async (_req: Request, res: Response, next: Function) => {
    try {
      const html = renderContact();
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } catch (error) {
      console.error("Error rendering contact page:", error);
      next();
    }
  });

  app.get("/faq", async (_req: Request, res: Response, next: Function) => {
    try {
      const html = renderFAQ();
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } catch (error) {
      console.error("Error rendering FAQ page:", error);
      next();
    }
  });

  app.get("/testimonials", async (_req: Request, res: Response, next: Function) => {
    try {
      const html = renderTestimonials();
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } catch (error) {
      console.error("Error rendering testimonials page:", error);
      next();
    }
  });

  app.get("/blog", async (_req: Request, res: Response, next: Function) => {
    try {
      const html = await renderBlogIndex();
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } catch (error) {
      console.error("Error rendering blog index:", error);
      next();
    }
  });

  app.get("/cases-we-handle", async (_req: Request, res: Response, next: Function) => {
    try {
      const html = renderCases();
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } catch (error) {
      console.error("Error rendering cases page:", error);
      next();
    }
  });

  app.get("/cases-we-handle/medical-malpractice", async (_req: Request, res: Response, next: Function) => {
    try {
      const html = renderMedicalMalpractice();
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } catch (error) {
      console.error("Error rendering medical malpractice page:", error);
      next();
    }
  });

  app.get("/cases-we-handle/birth-injuries", async (_req: Request, res: Response, next: Function) => {
    try {
      const html = renderBirthInjuries();
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } catch (error) {
      console.error("Error rendering birth injuries page:", error);
      next();
    }
  });

  app.get("/cases-we-handle/complications-of-childbirth", async (_req: Request, res: Response, next: Function) => {
    try {
      const html = renderComplicationsOfChildbirth();
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } catch (error) {
      console.error("Error rendering complications of childbirth page:", error);
      next();
    }
  });

  // Dynamic blog post route (must be after specific routes)
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

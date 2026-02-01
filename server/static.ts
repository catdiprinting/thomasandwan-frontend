import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { renderBlogPost } from "./ssr";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // Handle blog posts at root level with SSR
  app.get("/:slug", async (req, res, next) => {
    try {
      const slug = req.params.slug as string;
      
      // Skip static files and known paths
      if (slug.includes('.') || ['api', 'assets', 'src', 'node_modules', 'about', 'contact', 'cases-we-handle', 'blog'].includes(slug)) {
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

  // fall through to index.html if the file doesn't exist
  app.use("/{*path}", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

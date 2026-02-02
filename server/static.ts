import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { renderBlogPost, renderBlogIndex, renderHomepage, renderAbout, renderCases, renderContact } from "./ssr";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  app.get("/", async (_req, res) => {
    try {
      const html = renderHomepage();
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } catch (error) {
      console.error("Error rendering homepage:", error);
      res.status(500).send("Failed to render homepage");
    }
  });

  app.get("/about", async (_req, res) => {
    try {
      const html = renderAbout();
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } catch (error) {
      console.error("Error rendering about page:", error);
      res.status(500).send("Failed to render about page");
    }
  });

  app.get("/cases-we-handle", async (_req, res) => {
    try {
      const html = renderCases();
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } catch (error) {
      console.error("Error rendering cases page:", error);
      res.status(500).send("Failed to render cases page");
    }
  });

  app.get("/contact", async (_req, res) => {
    try {
      const html = renderContact();
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } catch (error) {
      console.error("Error rendering contact page:", error);
      res.status(500).send("Failed to render contact page");
    }
  });

  app.get("/blog", async (_req, res) => {
    try {
      const html = await renderBlogIndex();
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } catch (error) {
      console.error("Error rendering blog index:", error);
      res.status(500).send("Failed to render blog");
    }
  });

  app.get("/:slug", async (req, res, next) => {
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

  // fall through to index.html if the file doesn't exist
  app.use("/{*path}", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

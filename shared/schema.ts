import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const wpPostsCache = pgTable("wp_posts_cache", {
  id: integer("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  date: text("date").notNull(),
  dateGmt: text("date_gmt").notNull(),
  modified: text("modified").notNull().default(""),
  modifiedGmt: text("modified_gmt").notNull().default(""),
  status: text("status").notNull().default("publish"),
  type: text("type").notNull().default("post"),
  link: text("link").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  author: integer("author").notNull().default(1),
  featuredMedia: integer("featured_media").notNull().default(0),
  categories: jsonb("categories").$type<number[]>().notNull().default([]),
  tags: jsonb("tags").$type<number[]>().notNull().default([]),
  cachedAt: timestamp("cached_at").defaultNow(),
});

export const wpMediaCache = pgTable("wp_media_cache", {
  id: integer("id").primaryKey(),
  sourceUrl: text("source_url").notNull(),
  altText: text("alt_text").notNull().default(""),
  mediaDetails: jsonb("media_details").$type<Record<string, any>>().notNull().default({}),
  cachedAt: timestamp("cached_at").defaultNow(),
});

export const wpCategoriesCache = pgTable("wp_categories_cache", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  count: integer("count").notNull().default(0),
  cachedAt: timestamp("cached_at").defaultNow(),
});

export type WpPostCache = typeof wpPostsCache.$inferSelect;
export type WpMediaCache = typeof wpMediaCache.$inferSelect;
export type WpCategoryCache = typeof wpCategoriesCache.$inferSelect;

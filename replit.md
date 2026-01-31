# Thomas & Wan Law Firm Website

## Overview

This is a professional law firm website for Thomas & Wan, a women-owned medical malpractice law firm based in Houston, Texas. The site uses **WordPress as a headless CMS** with **Next.js for server-side rendering**, providing SEO-friendly HTML output while allowing content to be managed directly in WordPress.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture (Next.js 15 App Router)
- **Framework**: Next.js 15 with React 19 and TypeScript
- **Rendering**: Server-Side Rendering (SSR) with revalidation for auto-updates
- **Styling**: Tailwind CSS v4 with @tailwindcss/postcss
- **Fonts**: Playfair Display (headings) + Source Sans 3 (body) via next/font/google
- **Content Source**: WordPress REST API (headless CMS)

### Backend Architecture
- **Runtime**: Node.js with Express 5 as custom server for Next.js
- **Language**: TypeScript compiled with tsx
- **API Design**: RESTful endpoints under `/api` prefix (Express routes)
- **CMS**: WordPress at thomasandwan.com provides content via REST API

### WordPress Integration (Headless CMS)
- **API Endpoint**: `https://www.thomasandwan.com/wp-json/wp/v2/`
- **Content Types**:
  - Posts: `/posts?_embed&slug=...` - Blog articles
  - Pages: `/pages?_embed&slug=...` - Static pages
  - Categories: `/categories` - Blog categories
- **Revalidation**: 60 seconds for posts, 300 seconds for listings
- **SEO**: Yoast fields supported when available, fallback to WP title/excerpt

### Data Storage
- **Database**: PostgreSQL via `pg` driver (for contact form submissions)
- **ORM**: Drizzle ORM with drizzle-zod for validation
- **Schema Location**: `shared/schema.ts` contains table definitions

### Project Structure
```
├── app/                 # Next.js App Router
│   ├── layout.tsx       # Root layout with fonts and metadata
│   ├── page.tsx         # Homepage (SSR from WordPress)
│   ├── globals.css      # Global styles with Tailwind
│   ├── blog/
│   │   ├── page.tsx     # Blog index with pagination
│   │   └── [slug]/page.tsx  # Individual blog posts
│   ├── [slug]/page.tsx  # Dynamic WordPress pages
│   └── components/      # Shared React components
│       ├── Navigation.tsx
│       └── Footer.tsx
├── lib/
│   └── wordpress.ts     # WordPress REST API client
├── server/              # Express custom server
│   ├── index.ts         # Next.js + Express integration
│   ├── routes.ts        # API route definitions
│   └── storage.ts       # Database access layer
├── shared/              # Shared code
│   └── schema.ts        # Drizzle database schema
└── client/              # Legacy Vite/React app (preserved)
```

### Key Features
- **True SSR**: Full HTML rendered on server for SEO
- **Auto-Updates**: `revalidate` setting refreshes content from WordPress
- **SEO Optimized**: Dynamic meta tags from WordPress, JSON-LD schema markup
- **Blog Routes**: `/blog` (index) and `/blog/[slug]` (posts)
- **Dynamic Pages**: `/[slug]` fetches any WordPress page by slug

### WordPress API Client (lib/wordpress.ts)
- `fetchPosts(page, perPage, category)` - Blog listings with pagination
- `fetchPost(slug)` - Single post with embeds
- `fetchPage(slug)` - WordPress pages
- `fetchCategories()` - Blog categories
- `getSeoData(content)` - Extract SEO fields from Yoast or fallback

## External Dependencies

### CMS
- **WordPress**: Headless CMS at thomasandwan.com
- **REST API**: Standard WordPress REST API v2

### Database
- **PostgreSQL**: Primary database for contact form submissions

### Frontend Libraries
- **next**: Server-side rendering framework
- **tailwindcss**: Utility-first CSS
- **@tailwindcss/postcss**: PostCSS plugin for Tailwind v4

### Build & Development
- **tsx**: TypeScript execution for development
- **Express**: Custom server wrapping Next.js

## Routes

| Route | Source | Description |
|-------|--------|-------------|
| `/` | WordPress 'home' page | Homepage with hero and practice areas |
| `/blog` | WordPress posts | Blog listing with categories |
| `/blog/[slug]` | WordPress single post | Individual blog article |
| `/[slug]` | WordPress pages | Dynamic pages from CMS |
| `/api/*` | Express routes | Contact form and API endpoints |

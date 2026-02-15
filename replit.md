# Thomas & Wan Law Firm Website

## Overview

This is a marketing website for Thomas & Wan, a Houston-based medical malpractice law firm. The site showcases the firm's expertise, practice areas, attorney profiles, and includes a blog that pulls content from an external WordPress installation. The application follows a full-stack architecture with a React frontend and Express backend, designed for deployment on Replit.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS v4 with custom theme variables
- **UI Components**: Shadcn/ui component library (New York style) built on Radix UI primitives
- **State Management**: TanStack React Query for server state and data fetching
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Typography**: Google Fonts (Playfair Display for headings, Lato for body, Crimson Text for accents)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Build Tool**: Vite for development, esbuild for production server bundling
- **API Pattern**: RESTful endpoints prefixed with `/api`
- **WordPress Integration**: Dual-layer headless CMS architecture:
  - **Blog posts**: Fetched via REST API (`/wp-json/wp/v2`), cached in PostgreSQL, rendered with DOMPurify (rich HTML content)
  - **Page content (CMS text)**: Fetched via WPGraphQL (`/graphql`) as structured ACF field values, fed into React components as plain text props — React controls all layout/design, WordPress only supplies editable text
  - **Generic page CMS**: Any WordPress page's editor content is auto-parsed into structured fields (headings, paragraphs, quotes) via `/api/cms/page/:slug` — no ACF setup needed
  - **Caching**: PostgreSQL DB cache + in-memory TTL cache (300s default), auto-sync every 5 minutes, instant webhook purge/refresh
  - **Safe updates**: Changing text in WordPress fields cannot break site design since React components always control rendering

### Data Storage
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: `shared/schema.ts` contains database table definitions
- **Current Schema**: users, wp_posts_cache, wp_pages_cache, wp_media_cache, wp_categories_cache, contact_submissions
- **In-Memory TTL Cache**: `server/wp-content.ts` provides fast in-memory caching with configurable TTL (CACHE_TTL_SECONDS env var, default 300s)

### Build and Development
- **Development**: `npm run dev` starts the Express server with Vite middleware for HMR
- **Production Build**: `npm run build` compiles both client (Vite) and server (esbuild) to `dist/`
- **Database Migrations**: `npm run db:push` uses Drizzle Kit to sync schema with PostgreSQL

### Project Structure
```
client/           # React frontend application
  src/
    components/   # Reusable UI components
    pages/        # Route-level page components
    hooks/        # Custom React hooks
    lib/          # Utilities and query client
server/           # Express backend
  routes.ts       # API endpoint definitions
  wordpress.ts    # WordPress DB cache queries (read layer)
  wp-content.ts   # In-memory TTL cache + WP REST API fetch layer + purge/warm
  wp-graphql.ts   # WPGraphQL client for ACF structured content (CMS text fields)
  wp-sync.ts      # Full WordPress sync (initial + periodic 5-min refresh)
  storage.ts      # Data access layer
shared/           # Shared code between client/server
  schema.ts       # Drizzle database schema
```

### Internal Linking & Navigation Components
- **Footer**: Comprehensive 4-column footer with Practice Areas links (7), Quick Links (7), Contact info, and Free Case Review CTA
- **Breadcrumbs**: `Breadcrumbs` component with JSON-LD BreadcrumbList schema markup; integrated into `PageShell` via `breadcrumbs` prop
- **RelatedPracticeAreas**: Cross-links to sibling practice areas on every practice area page, excluding current page
- **PracticeAreas (homepage)**: All 5 practice area cards link to their pages; includes "View All Cases" link to /cases-we-handle
- **PageShell**: Shared layout wrapper for most pages; supports optional `breadcrumbs` prop

### Lead Generation Features
- **StickyMobileCTA**: Fixed call bar at bottom on mobile with tap-to-call (713) 529-1177 and "Free Review" link
- **SmartCTA**: Reusable component that shows tel: link on mobile, /contact-us link on desktop
- **LeadCaptureForm**: Compact lead form (name, phone, message) in 3 variants (inline, card, sidebar) - submits to Contact Form 7 via /api/contact
- **FloatingWidget**: Bottom-right floating button with Quick Contact form tab and AI Assistant chat tab (uses OpenAI assistant API)
- **Trust Badges**: Shield/Award/Scale icons with "No Fee Unless We Win", "55+ Years Experience", "$50M+ Recovered" displayed on lead capture cards
- **Click-to-Call CTAs**: All "Call Us Now" sections across practice area pages use direct tel: links

### Key Design Decisions
1. **Headless WordPress CMS**: Dual-layer approach — blog posts use REST API (rich HTML), page content uses WPGraphQL + ACF (structured plain text props). React components always control design; WordPress only supplies editable text values, so CMS edits can never break the site layout
2. **Server-side API Proxy**: WordPress requests go through the Express server to handle CORS and add caching capabilities
3. **HTML Export**: Posts can be exported as standalone HTML files for static hosting or offline use
4. **Component Library**: Shadcn/ui provides accessible, customizable components without the overhead of a full design system
5. **Path Aliases**: TypeScript path aliases (`@/`, `@shared/`) simplify imports across the codebase

### WordPress API Endpoints
- `GET /api/posts` - Fetch blog posts (supports `per_page`, `page`, `with_media=true` query params)
- `GET /api/posts/:slug` - Fetch a single post by slug (includes featured image)
- `GET /api/pages` - Fetch WordPress pages (from DB cache)
- `GET /api/pages/:slug` - Fetch a single page by slug (via TTL memory cache → DB cache → WP REST API)
- `GET /api/categories` - Fetch all categories
- `GET /api/cache-stats` - View in-memory cache stats (size, keys)
- `POST /api/refresh-wordpress` - Trigger full WordPress cache refresh
- `GET /api/export/post/:slug` - Export a post as standalone HTML file
- `GET /api/export/page/:slug` - Export a page as standalone HTML file
- `GET /api/export/all-posts` - Export all posts as JSON with HTML content

### CMS Content Endpoints (GraphQL/ACF)
- `GET /api/cms/homepage` - Structured text fields for the homepage (hero, trust bar, team, practice areas, FAQ, testimonials, etc.)
- `GET /api/cms/about` - Structured text fields for the about page (firm story, attorney bios, values)
- `GET /api/cms/practice-area/:slug` - Structured text fields for a specific practice area page
- `GET /api/cms/page/:slug` - Generic page content parser — returns pageHeading, pageSubheading, pageIntro, sectionNHeading, paragraphN, quoteN, quoteNAuthor for any WordPress page
- `GET /api/cms/purge` - Purge the in-memory CMS content cache

### CMS-Connected Pages (all text editable from WordPress)
- **Homepage** → `useHomepageData()` — hero, trust bar, practice areas, team, results, FAQ, lead capture
- **About** → `useAboutData()` — hero, mission, attorney bios, CTA
- **Practice Areas (7)** → `usePracticeAreaData(slug)` — intro, sidebar, CTA (brain-injuries, birth-injuries, surgical-errors, misdiagnosis, medical-malpractice, medication-errors, complications-of-childbirth)
- **Cases** → `usePageCms("cases-we-handle")` — heading, intro paragraphs
- **FAQ** → `usePageCms("faq")` — sidebar text, all Q&A pairs
- **Testimonials** → `usePageCms("testimonials")` — hero subtitle, all quotes & authors
- **Contact** → `usePageCms("contact-us")` — heading, subheading

### Adding CMS to a New Page
1. Create the WordPress page in wp-admin (content auto-parsed into structured fields)
2. In React: `const { data: d } = usePageCms("your-slug");`
3. Replace text: `{cms(d, "pageHeading", "Fallback Text")}`
4. Available auto-parsed fields: pageHeading, pageSubheading, pageIntro, sectionNHeading, paragraphN, quoteN, quoteNAuthor

### Webhook Endpoints
- `POST /webhooks/wp` - WordPress webhook receiver; requires `x-webhook-secret` header matching `WP_WEBHOOK_SECRET` env var; body: `{ type: "post"|"page", slug: "..." }`; purges cached content and immediately refetches from WordPress

### OpenAI Assistant Endpoints
- `POST /api/assistant/thread` - Create a new conversation thread
- `POST /api/assistant/message` - Send a message to the assistant (body: `{ threadId, message }`)
- `GET /api/assistant/history/:threadId` - Fetch conversation history for a thread

### SEO & Feed Endpoints
- `GET /sitemap.xml` - Dynamic XML sitemap with all posts, categories, pages (1-hour cache)
- `GET /robots.txt` - Robots file pointing to sitemap, allows all crawling except /api/
- `GET /feed` - RSS 2.0 feed with latest 20 blog posts

### SSR Endpoints (SEO-Friendly)
- `GET /:slug` - Server-rendered blog post at root level with full content, Open Graph tags, and featured images

## External Dependencies

### Third-Party Services
- **WordPress REST API**: External CMS at `wp.thomasandwan.com/wp-json/wp/v2` provides blog posts, pages, and media (env: `WP_BASE_URL`)
- **WPGraphQL + ACF**: Structured page content via `wp.thomasandwan.com/graphql` — ACF custom fields supply plain text values to React components (plugins: WPGraphQL, ACF, WPGraphQL for ACF)
- **WordPress Webhook**: Incoming `POST /webhooks/wp` for instant content updates (env: `WP_WEBHOOK_SECRET`)
- **OpenAI Assistants API**: Connected via user's own API key and Assistant ID for content creation (secrets: `OPENAI_API_KEY`, `OPENAI_ASSISTANT_ID`)
- **Google Fonts**: Typography loaded from fonts.googleapis.com

### Database
- **PostgreSQL**: Required for production; connection string provided via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management

### Key NPM Packages
- **@tanstack/react-query**: Data fetching and caching
- **@radix-ui/***: Accessible UI primitives for Shadcn components
- **framer-motion**: Animation library
- **drizzle-orm** / **drizzle-kit**: Database ORM and migration tools
- **wouter**: Client-side routing
- **zod**: Schema validation (integrated with Drizzle via drizzle-zod)

### SEO & Schema Markup
- **SEO Component** (`client/src/components/SEO.tsx`): Centralized meta tags (title, description, canonical, OG, Twitter Card, geo tags)
- **Schema Helpers**: `lawFirmSchema` (LegalService + GeoCoordinates), `createPracticeAreaSchema`, `createFAQSchema`, `attorneySchemas`, `createReviewSchema`
- **Every page has SEO**: Home, About, Testimonials, FAQ, Cases, BlogIndex, Contact, BlogPost, all practice area pages
- **Rich Results**: FAQ page (FAQPage schema), Testimonials (Review/AggregateRating schema), About (Person schemas for attorneys), Blog posts (Article schema)
- **Geo/Local SEO**: US-TX region, Houston placename, GeoCoordinates (29.723317, -95.401952) on all pages
- **SSR for bots**: Search engine crawlers get server-rendered HTML with full content and meta tags

### Replit-Specific Integrations
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Development tooling (dev only)
- **@replit/vite-plugin-dev-banner**: Development banner (dev only)
- **vite-plugin-meta-images**: Custom plugin for OpenGraph image URL handling on Replit deployments
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
- **WordPress Integration**: Server acts as a proxy to fetch blog posts from an external WordPress REST API (`thomasandwan.com/test/wp-json/wp/v2`)

### Data Storage
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: `shared/schema.ts` contains database table definitions
- **Current Schema**: Basic users table with id, username, and password fields
- **In-Memory Fallback**: `MemStorage` class provides runtime storage when database isn't needed

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
  wordpress.ts    # WordPress API integration
  storage.ts      # Data access layer
shared/           # Shared code between client/server
  schema.ts       # Drizzle database schema
```

### Lead Generation Features
- **StickyMobileCTA**: Fixed call bar at bottom on mobile with tap-to-call (713) 529-1177 and "Free Review" link
- **SmartCTA**: Reusable component that shows tel: link on mobile, /contact-us link on desktop
- **LeadCaptureForm**: Compact lead form (name, phone, message) in 3 variants (inline, card, sidebar) - submits to Contact Form 7 via /api/contact
- **FloatingWidget**: Bottom-right floating button with Quick Contact form tab and AI Assistant chat tab (uses OpenAI assistant API)
- **Trust Badges**: Shield/Award/Scale icons with "No Fee Unless We Win", "55+ Years Experience", "$50M+ Recovered" displayed on lead capture cards
- **Click-to-Call CTAs**: All "Call Us Now" sections across practice area pages use direct tel: links

### Key Design Decisions
1. **Headless WordPress CMS**: Blog content is fetched from an existing WordPress installation via REST API, allowing the law firm to continue using their familiar CMS while the frontend is built with React
2. **Server-side API Proxy**: WordPress requests go through the Express server to handle CORS and add caching capabilities
3. **HTML Export**: Posts can be exported as standalone HTML files for static hosting or offline use
4. **Component Library**: Shadcn/ui provides accessible, customizable components without the overhead of a full design system
5. **Path Aliases**: TypeScript path aliases (`@/`, `@shared/`) simplify imports across the codebase

### WordPress API Endpoints
- `GET /api/posts` - Fetch blog posts (supports `per_page`, `page`, `with_media=true` query params)
- `GET /api/posts/:slug` - Fetch a single post by slug (includes featured image)
- `GET /api/pages` - Fetch WordPress pages
- `GET /api/pages/:slug` - Fetch a single page by slug
- `GET /api/categories` - Fetch all categories
- `GET /api/export/post/:slug` - Export a post as standalone HTML file
- `GET /api/export/page/:slug` - Export a page as standalone HTML file
- `GET /api/export/all-posts` - Export all posts as JSON with HTML content

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
- **WordPress REST API**: External CMS at `wp.thomasandwan.com/wp-json/wp/v2` provides blog posts, pages, and media
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

### Replit-Specific Integrations
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Development tooling (dev only)
- **@replit/vite-plugin-dev-banner**: Development banner (dev only)
- **vite-plugin-meta-images**: Custom plugin for OpenGraph image URL handling on Replit deployments
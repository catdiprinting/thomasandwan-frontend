# Thomas & Wan Law Firm Website

## Overview

This is a professional law firm website for Thomas & Wan, a women-owned medical malpractice law firm based in Houston, Texas. The site showcases their expertise in birth injuries, surgical errors, brain injuries, and misdiagnosis cases. It features a contact form with database storage, multiple practice area pages, testimonials, blog sections, and a modern, elegant design with Georgia/Playfair Display typography.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming
- **UI Components**: shadcn/ui (New York style) with Radix UI primitives
- **Animations**: Framer Motion for page transitions and scroll effects
- **State Management**: TanStack React Query for server state
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript compiled with tsx
- **API Design**: RESTful endpoints under `/api` prefix
- **Development**: Vite middleware serves the React app in dev mode
- **Production**: Static files served from `dist/public`

### Data Storage
- **Database**: PostgreSQL via `pg` driver
- **ORM**: Drizzle ORM with drizzle-zod for validation
- **Schema Location**: `shared/schema.ts` contains table definitions
- **Migrations**: Drizzle Kit manages schema with `db:push` command

### Project Structure
```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route page components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities and query client
│   └── public/      # Static assets (images, favicon)
├── server/          # Express backend
│   ├── index.ts     # Server entry point
│   ├── routes.ts    # API route definitions
│   ├── storage.ts   # Database access layer
│   └── static.ts    # Static file serving
├── shared/          # Shared code between client/server
│   └── schema.ts    # Drizzle database schema
└── db/              # Database connection setup
```

### Key Design Patterns
- **Path Aliases**: `@/` for client, `@shared/` for shared code, `@db` for database
- **Storage Interface**: `IStorage` interface abstracts database operations for testability
- **Form Validation**: Zod schemas generated from Drizzle tables using `drizzle-zod`
- **Component Library**: shadcn/ui components installed in `client/src/components/ui/`

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **connect-pg-simple**: Session storage for Express (available but not currently used for auth)

### Frontend Libraries
- **@tanstack/react-query**: Async state management and API caching
- **framer-motion**: Animation library for page transitions
- **lucide-react**: Icon library
- **wouter**: Client-side routing
- **embla-carousel-react**: Carousel component for testimonials

### Build & Development
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server bundling for production
- **@replit/vite-plugin-***: Replit-specific development plugins

### Styling
- **Tailwind CSS v4**: Utility-first CSS with `@tailwindcss/vite` plugin
- **tw-animate-css**: Animation utilities
- **class-variance-authority**: Component variant management
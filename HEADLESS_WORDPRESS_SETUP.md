# Headless WordPress Setup Guide

This guide explains how to connect this React frontend to your WordPress site as a headless CMS.

## How It Works

```
┌─────────────────┐      REST API      ┌─────────────────┐
│                 │  ←───────────────  │                 │
│  React Frontend │     /wp-json/      │    WordPress    │
│  (This Site)    │  ───────────────→  │   (Your CMS)    │
│                 │                    │                 │
└─────────────────┘                    └─────────────────┘
        ↓                                      ↓
   Displays Content                    Manages Content
   (Design/Layout)                  (Posts, Pages, Media)
```

## Step 1: Enable CORS on Your WordPress Site

Add this to your WordPress theme's `functions.php` file:

```php
// Enable CORS for headless WordPress
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        $origin = get_http_origin();
        $allowed_origins = array(
            'https://your-replit-app.replit.app',
            'http://localhost:5000',
            'https://thomasandwan.com',
            'https://www.thomasandwan.com'
        );
        
        if (in_array($origin, $allowed_origins)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Headers: Authorization, Content-Type');
        }
        
        return $value;
    });
}, 15);
```

Or install the **WP CORS** plugin from WordPress plugin directory.

## Step 2: Set Environment Variables

In Replit, add these environment variables:

```
VITE_USE_HEADLESS_WP=true
VITE_WORDPRESS_API_URL=https://www.thomasandwan.com/wp-json/wp/v2
```

## Step 3: Test the Connection

After setting the environment variables, restart the application. The blog page will now pull posts directly from your WordPress site.

## Step 4: Deploy the React Frontend

Once everything works:
1. Click "Publish" in Replit to deploy
2. Point your domain (thomasandwan.com) to the Replit deployment
3. Keep WordPress running for content management (can be on a subdomain like `cms.thomasandwan.com`)

---

## WordPress REST API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `/wp-json/wp/v2/posts` | Fetch blog posts |
| `/wp-json/wp/v2/posts?slug={slug}` | Fetch single post by slug |
| `/wp-json/wp/v2/pages` | Fetch pages |
| `/wp-json/wp/v2/categories` | Fetch categories |

## Recommended WordPress Plugins

1. **WP REST Cache** - Caches API responses for faster loading
2. **WP CORS** - Easy CORS configuration
3. **ACF to REST API** - If using Advanced Custom Fields

## Troubleshooting

### CORS Errors
If you see "Access-Control-Allow-Origin" errors:
- Verify the CORS code is added to functions.php
- Check that your Replit URL is in the allowed origins list
- Clear any caching plugins

### Posts Not Loading
- Verify the WordPress API is accessible: visit `https://yoursite.com/wp-json/wp/v2/posts`
- Check that posts are published (not draft)
- Ensure the `VITE_WORDPRESS_API_URL` is correct

### Images Not Displaying
- WordPress media URLs will still point to your WordPress server
- This is normal - images are served from WordPress

---

## Architecture Benefits

1. **Performance**: React frontend is faster than WordPress themes
2. **Security**: WordPress admin is separate from public site
3. **Flexibility**: Update design without touching WordPress
4. **Scalability**: Frontend can be cached globally via CDN
5. **SEO**: Can add SSR/SSG later for better SEO

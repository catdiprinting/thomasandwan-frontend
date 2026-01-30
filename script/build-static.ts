import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

const staticExportDir = path.resolve(process.cwd(), "static-export");
const clientPublicDir = path.resolve(process.cwd(), "client/public");

console.log("Building static HTML export...");

execSync("npx vite build --config vite.static.config.ts", {
  stdio: "inherit",
});

if (fs.existsSync(clientPublicDir)) {
  const publicFiles = fs.readdirSync(clientPublicDir);
  for (const file of publicFiles) {
    const src = path.join(clientPublicDir, file);
    const dest = path.join(staticExportDir, file);
    if (!fs.existsSync(dest)) {
      fs.cpSync(src, dest, { recursive: true });
    }
  }
}

const routes = [
  "about",
  "practice-areas",
  "practice-areas/birth-injuries",
  "practice-areas/childbirth-complications", 
  "practice-areas/medical-malpractice",
  "testimonials",
  "contact",
  "blog",
];

const indexHtml = fs.readFileSync(path.join(staticExportDir, "index.html"), "utf-8");

for (const route of routes) {
  const routeDir = path.join(staticExportDir, route);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, "index.html"), indexHtml);
}

const htaccessContent = `# Enable URL rewriting
RewriteEngine On

# Handle trailing slashes
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} (.+)/$
RewriteRule ^ %1 [L,R=301]

# Handle SPA routing - serve index.html for all non-file requests
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ /index.html [L]

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>

# Caching for static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/x-icon "access plus 1 year"
</IfModule>
`;

fs.writeFileSync(path.join(staticExportDir, ".htaccess"), htaccessContent);

const netlifyToml = `[build]
  publish = "static-export"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`;

fs.writeFileSync(path.join(staticExportDir, "netlify.toml"), netlifyToml);

const vercelJson = `{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`;

fs.writeFileSync(path.join(staticExportDir, "vercel.json"), vercelJson);

console.log("\nStatic HTML export complete!");
console.log(`Output directory: ${staticExportDir}`);
console.log("\nIncluded files:");
console.log("- index.html (main entry)");
console.log("- Route-specific index.html files for SEO");
console.log("- .htaccess (Apache servers)");
console.log("- netlify.toml (Netlify deployment)");
console.log("- vercel.json (Vercel deployment)");
console.log("- All static assets (CSS, JS, images)");
console.log("\nTo deploy: Upload the static-export folder to any web host!");

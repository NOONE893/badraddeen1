// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { writeFileSync } from "node:fs";
import { SITE_URL, BLOG_SLUGS, BLOG_PUBLISHED_AT } from "./src/lib/site-config";

// Retain the original static sitemap mechanism; regenerate only from public editorial data.
const blogPaths = ["/blog", ...BLOG_SLUGS.map(slug => `/blog/${slug}`)];
writeFileSync("public/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE_URL}/</loc></url>\n${blogPaths.map(path => `  <url><loc>${SITE_URL}${path}</loc><lastmod>${BLOG_PUBLISHED_AT}</lastmod></url>`).join("\n")}\n</urlset>\n`);
writeFileSync("public/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

export default defineConfig({
  tanstackStart: {
    pages: blogPaths.map(path => ({ path })),
    prerender: { enabled: true, autoStaticPathsDiscovery: false },
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});

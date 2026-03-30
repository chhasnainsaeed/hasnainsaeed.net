import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { blogPosts } from '../src/data/blogPosts.js'
import { projects } from '../src/data/projects.js'
import { getPrerenderRoutes } from '../src/seo/prerender-routes.js'
import { getAbsoluteUrl, siteConfig } from '../src/utils/site.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const publicDir = path.resolve(__dirname, '../public')
const buildDate = new Date().toISOString().slice(0, 10)

const lastModifiedByRoute = new Map([
  ...projects.map((project) => [`/portfolio/${project.slug}`, buildDate]),
  ...blogPosts.map((post) => [`/blog/${post.slug}`, post.date]),
])

function renderSitemap() {
  const uniqueRoutes = Array.from(new Set(getPrerenderRoutes()))
  const urls = uniqueRoutes.map((route) => {
    const lastmod = lastModifiedByRoute.get(route) || buildDate
    return [
      '  <url>',
      `    <loc>${getAbsoluteUrl(route)}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      '  </url>',
    ].join('\n')
  })

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')
}

function renderRobots() {
  return [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${siteConfig.url}/sitemap.xml`,
    '',
  ].join('\n')
}

await mkdir(publicDir, { recursive: true })
await writeFile(path.join(publicDir, 'sitemap.xml'), renderSitemap(), 'utf8')
await writeFile(path.join(publicDir, 'robots.txt'), renderRobots(), 'utf8')

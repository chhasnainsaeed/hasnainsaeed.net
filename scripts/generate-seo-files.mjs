import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { blogCategories } from '../src/data/blogCategories.js'
import { blogPosts } from '../src/data/blogPosts.js'
import { projects } from '../src/data/projects.js'
import { services } from '../src/data/services.js'
import { getPrerenderRoutes } from '../src/seo/prerender-routes.js'
import { getBlogCategoryPath, routes } from '../src/utils/routes.js'
import { getAbsoluteUrl, siteConfig } from '../src/utils/site.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const publicDir = path.resolve(__dirname, '../public')
const buildDate = new Date().toISOString().slice(0, 10)
const latestBlogDate = blogPosts.reduce((latest, post) => (post.date > latest ? post.date : latest), buildDate)

function getCategoryLastModified(categorySlug) {
  const postDates = blogPosts.filter((post) => post.categorySlug === categorySlug).map((post) => post.date)
  return postDates.length ? postDates.sort().at(-1) : buildDate
}

const lastModifiedByRoute = new Map([
  [routes.blog, latestBlogDate],
  ...services.map((service) => [`/services/${service.slug}`, buildDate]),
  ...projects.map((project) => [`/portfolio/${project.slug}`, project.year === '2026' ? buildDate : `${project.year}-12-31`]),
  ...blogCategories.map((category) => [getBlogCategoryPath(category.slug), getCategoryLastModified(category.slug)]),
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
    '# Keep public pages and rendering assets crawlable.',
    'User-agent: Googlebot',
    'Allow: /',
    '',
    'User-agent: Bingbot',
    'Allow: /',
    '',
    '# Keep AI search and answer-engine discovery open.',
    'User-agent: OAI-SearchBot',
    'Allow: /',
    '',
    'User-agent: Google-Extended',
    'Allow: /',
    '',
    '# GPTBot is training-oriented and not required for ChatGPT search visibility.',
    'User-agent: GPTBot',
    'Disallow: /',
    '',
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

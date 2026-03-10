import { defaultKeywords, getAbsoluteUrl, siteConfig } from '../utils/site'

const defaultRobots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

export function createHeadState() {
  return buildSeoState({
    title: siteConfig.siteTitle,
    description: siteConfig.description,
    pathname: '/',
  })
}

export function buildSeoState({
  title,
  description,
  pathname = '/',
  image,
  type = 'website',
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
  keywords = [],
  noindex = false,
  jsonLd = [],
}) {
  const canonical = getAbsoluteUrl(pathname)
  const imageUrl = image ? (image.startsWith('http') ? image : getAbsoluteUrl(image)) : getAbsoluteUrl(siteConfig.baseOgImage)
  const dedupedKeywords = Array.from(new Set([...defaultKeywords, ...keywords]))
  const resolvedTitle = title || siteConfig.siteTitle
  const resolvedDescription = description || siteConfig.description
  const resolvedOgTitle = ogTitle || resolvedTitle
  const resolvedOgDescription = ogDescription || resolvedDescription
  const resolvedTwitterTitle = twitterTitle || resolvedOgTitle
  const resolvedTwitterDescription = twitterDescription || resolvedOgDescription

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    canonical,
    pathname,
    image: imageUrl,
    type,
    ogTitle: resolvedOgTitle,
    ogDescription: resolvedOgDescription,
    twitterTitle: resolvedTwitterTitle,
    twitterDescription: resolvedTwitterDescription,
    robots: noindex ? 'noindex, nofollow' : defaultRobots,
    keywords: dedupedKeywords.join(', '),
    jsonLd,
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function renderHeadTags(head) {
  const scripts = (head.jsonLd || [])
    .map((item) => `<script type="application/ld+json">${JSON.stringify(item)}</script>`)
    .join('')

  return [
    `<title>${escapeHtml(head.title)}</title>`,
    `<meta name="description" content="${escapeHtml(head.description)}">`,
    `<meta name="keywords" content="${escapeHtml(head.keywords)}">`,
    `<meta name="robots" content="${escapeHtml(head.robots)}">`,
    `<link rel="canonical" href="${escapeHtml(head.canonical)}">`,
    `<meta property="og:site_name" content="${escapeHtml(siteConfig.name)}">`,
    `<meta property="og:locale" content="${escapeHtml(siteConfig.locale)}">`,
    `<meta property="og:type" content="${escapeHtml(head.type)}">`,
    `<meta property="og:title" content="${escapeHtml(head.ogTitle)}">`,
    `<meta property="og:description" content="${escapeHtml(head.ogDescription)}">`,
    `<meta property="og:url" content="${escapeHtml(head.canonical)}">`,
    `<meta property="og:image" content="${escapeHtml(head.image)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(head.twitterTitle)}">`,
    `<meta name="twitter:description" content="${escapeHtml(head.twitterDescription)}">`,
    `<meta name="twitter:image" content="${escapeHtml(head.image)}">`,
    scripts,
  ].join('')
}

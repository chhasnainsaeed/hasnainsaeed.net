import { getAbsoluteUrl, siteConfig } from '../utils/site'

const schemaLanguage = siteConfig.locale.replace('_', '-')

function cleanSchema(value) {
  if (Array.isArray(value)) {
    const cleaned = value.map((item) => cleanSchema(item)).filter((item) => item !== undefined)
    return cleaned.length ? cleaned : undefined
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value)
      .map(([key, item]) => [key, cleanSchema(item)])
      .filter(([, item]) => item !== undefined)

    return entries.length ? Object.fromEntries(entries) : undefined
  }

  if (typeof value === 'string' && !value.trim()) return undefined

  return value === null ? undefined : value
}

function withContext(schema) {
  return cleanSchema({
    '@context': 'https://schema.org',
    ...schema,
  })
}

function getWebPageId(path) {
  return `${getAbsoluteUrl(path)}#webpage`
}

function getBreadcrumbId(path) {
  return `${getAbsoluteUrl(path)}#breadcrumb`
}

function getCaseStudyId(slug) {
  return `${getAbsoluteUrl(`/portfolio/${slug}`)}#case-study`
}

function getArticleId(slug) {
  return `${getAbsoluteUrl(`/blog/${slug}`)}#article`
}

export function createBreadcrumbSchema(items) {
  const currentPath = items[items.length - 1]?.path || '/'

  return withContext({
    '@type': 'BreadcrumbList',
    '@id': getBreadcrumbId(currentPath),
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.path),
    })),
  })
}

export function createWebsiteSchema() {
  return withContext({
    '@type': 'WebSite',
    '@id': `${siteConfig.url}#website`,
    name: siteConfig.name,
    alternateName: siteConfig.siteTitle,
    url: siteConfig.url,
    description: siteConfig.description,
    sameAs: siteConfig.sameAs,
    inLanguage: schemaLanguage,
  })
}

export function createPersonSchema() {
  return withContext({
    '@type': 'Person',
    '@id': `${siteConfig.url}#person`,
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.contactEmail,
    telephone: siteConfig.contactPhone,
    jobTitle: siteConfig.jobTitle,
    description: siteConfig.authorBio,
    sameAs: siteConfig.sameAs,
    homeLocation: {
      '@type': 'Place',
      name: siteConfig.location,
    },
  })
}

export function createProfessionalServiceSchema(serviceNames = []) {
  return withContext({
    '@type': 'ProfessionalService',
    '@id': `${siteConfig.url}#professional-service`,
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.contactEmail,
    telephone: siteConfig.contactPhone,
    description: siteConfig.description,
    founder: { '@id': `${siteConfig.url}#person` },
    employee: { '@id': `${siteConfig.url}#person` },
    sameAs: siteConfig.sameAs,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'project inquiries',
        email: siteConfig.contactEmail,
        telephone: siteConfig.contactPhone,
        availableLanguage: [schemaLanguage],
      },
    ],
    areaServed: siteConfig.serviceMarkets.map((market) => ({
      '@type': 'Place',
      name: market,
    })),
    knowsAbout: serviceNames,
    availableLanguage: [schemaLanguage],
  })
}

export function createWebPageSchema({ path, title, description, type = 'WebPage', mainEntity, about = [], image }) {
  return withContext({
    '@type': type,
    '@id': getWebPageId(path),
    url: getAbsoluteUrl(path),
    name: title,
    description,
    isPartOf: { '@id': `${siteConfig.url}#website` },
    about,
    mainEntity,
    breadcrumb: { '@id': getBreadcrumbId(path) },
    primaryImageOfPage: image ? getAbsoluteUrl(image) : undefined,
    inLanguage: schemaLanguage,
  })
}

export function createCollectionPageSchema({ name, description, path, items = [], about = [], image }) {
  return withContext({
    '@type': 'CollectionPage',
    '@id': getWebPageId(path),
    url: getAbsoluteUrl(path),
    name,
    description,
    isPartOf: { '@id': `${siteConfig.url}#website` },
    breadcrumb: { '@id': getBreadcrumbId(path) },
    about,
    mainEntity: items.length
      ? {
          '@type': 'ItemList',
          '@id': `${getAbsoluteUrl(path)}#itemlist`,
          itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            url: getAbsoluteUrl(item.path),
          })),
        }
      : undefined,
    primaryImageOfPage: image ? getAbsoluteUrl(image) : undefined,
    inLanguage: schemaLanguage,
  })
}

export function createFAQSchema(items = [], path) {
  if (!items.length) return null

  return withContext({
    '@type': 'FAQPage',
    '@id': path ? `${getAbsoluteUrl(path)}#faq` : undefined,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  })
}

export function createCaseStudySchema(project) {
  const keywords = Array.from(new Set([project.platform, project.category, 'case study', 'portfolio'].filter(Boolean)))

  return withContext({
    '@type': 'CreativeWork',
    '@id': getCaseStudyId(project.slug),
    name: project.title,
    headline: project.title,
    description: project.shortResult || project.heroSummary,
    genre: 'Case Study',
    author: { '@id': `${siteConfig.url}#person` },
    creator: { '@id': `${siteConfig.url}#person` },
    publisher: { '@id': `${siteConfig.url}#professional-service` },
    url: getAbsoluteUrl(`/portfolio/${project.slug}`),
    mainEntityOfPage: { '@id': getWebPageId(`/portfolio/${project.slug}`) },
    image: getAbsoluteUrl(project.cover || siteConfig.baseOgImage),
    keywords: keywords.join(', '),
  })
}

export function createArticleSchema(post) {
  return withContext({
    '@type': 'Article',
    '@id': getArticleId(post.slug),
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    alternativeHeadline: post.excerpt,
    author: { '@id': `${siteConfig.url}#person` },
    publisher: { '@id': `${siteConfig.url}#professional-service` },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: { '@id': getWebPageId(`/blog/${post.slug}`) },
    isPartOf: { '@id': `${siteConfig.url}#website` },
    image: getAbsoluteUrl(post.image || siteConfig.baseOgImage),
    articleSection: post.category,
    keywords: (post.keywords || []).join(', '),
    inLanguage: schemaLanguage,
    isAccessibleForFree: true,
  })
}

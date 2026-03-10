import { services } from '../data/services'
import { getAbsoluteUrl, siteConfig } from '../utils/site'

const schemaLanguage = siteConfig.locale.replace('_', '-')

export const schemaIds = {
  website: `${siteConfig.url}#website`,
  person: `${siteConfig.url}#person`,
  professionalService: `${siteConfig.url}#professional-service`,
}

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

function createThing(value) {
  if (!value) return undefined
  if (typeof value === 'string') {
    return {
      '@type': 'Thing',
      name: value,
    }
  }

  return value
}

function createPlaceList(values = []) {
  return values.map((value) => ({
    '@type': 'Place',
    name: value,
  }))
}

function getWebPageId(path) {
  return `${getAbsoluteUrl(path)}#webpage`
}

function getBreadcrumbId(path) {
  return `${getAbsoluteUrl(path)}#breadcrumb`
}

function getServiceId(slug) {
  return `${getAbsoluteUrl(`/services/${slug}`)}#service`
}

function getArticleId(slug) {
  return `${getAbsoluteUrl(`/blog/${slug}`)}#article`
}

function getCaseStudyId(slug) {
  return `${getAbsoluteUrl(`/portfolio/${slug}`)}#case-study`
}

function createItemList(path, items = []) {
  if (!items.length) return undefined

  return {
    '@type': 'ItemList',
    '@id': `${getAbsoluteUrl(path)}#itemlist`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: getAbsoluteUrl(item.path),
    })),
  }
}

function createServiceReferences(slugs = []) {
  return services
    .filter((service) => slugs.includes(service.slug))
    .map((service) => ({
      '@type': 'Service',
      '@id': getServiceId(service.slug),
      name: service.title,
      url: getAbsoluteUrl(`/services/${service.slug}`),
    }))
}

export function createPersonReference() {
  return { '@id': schemaIds.person }
}

export function createProfessionalServiceReference() {
  return { '@id': schemaIds.professionalService }
}

export function createWebsiteReference() {
  return { '@id': schemaIds.website }
}

export function createServiceReference(slug) {
  return { '@id': getServiceId(slug) }
}

export function createArticleReference(slug) {
  return { '@id': getArticleId(slug) }
}

export function createCaseStudyReference(slug) {
  return { '@id': getCaseStudyId(slug) }
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

export function createPersonSchema(serviceNames = []) {
  return withContext({
    '@type': 'Person',
    '@id': schemaIds.person,
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.contactEmail,
    jobTitle: siteConfig.jobTitle,
    description: siteConfig.authorBio,
    sameAs: siteConfig.sameAs,
    worksFor: createProfessionalServiceReference(),
    knowsAbout: serviceNames,
    homeLocation: {
      '@type': 'Place',
      name: siteConfig.location,
    },
  })
}

export function createProfessionalServiceSchema(serviceNames = []) {
  return withContext({
    '@type': 'ProfessionalService',
    '@id': schemaIds.professionalService,
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.contactEmail,
    description: siteConfig.description,
    sameAs: siteConfig.sameAs,
    founder: createPersonReference(),
    employee: createPersonReference(),
    areaServed: createPlaceList(siteConfig.serviceMarkets),
    knowsAbout: serviceNames,
    availableLanguage: [schemaLanguage],
    address: {
      '@type': 'PostalAddress',
      addressCountry: siteConfig.location,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: siteConfig.contactEmail,
      areaServed: createPlaceList(siteConfig.serviceMarkets),
      availableLanguage: [schemaLanguage],
    },
  })
}

export function createWebsiteSchema() {
  return withContext({
    '@type': 'WebSite',
    '@id': schemaIds.website,
    name: siteConfig.name,
    alternateName: siteConfig.siteTitle,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: schemaLanguage,
    publisher: createProfessionalServiceReference(),
    about: createPersonReference(),
  })
}

export function createWebPageSchema({
  path,
  title,
  description,
  type = 'WebPage',
  mainEntity,
  about = [],
  image,
}) {
  return withContext({
    '@type': type,
    '@id': getWebPageId(path),
    url: getAbsoluteUrl(path),
    name: title,
    description,
    isPartOf: createWebsiteReference(),
    about: about.map((item) => createThing(item)),
    mainEntity,
    breadcrumb: {
      '@id': getBreadcrumbId(path),
    },
    primaryImageOfPage: image ? getAbsoluteUrl(image) : undefined,
    inLanguage: schemaLanguage,
  })
}

export function createProfilePageSchema({ path, title, description, about = [] }) {
  return createWebPageSchema({
    path,
    title,
    description,
    type: 'ProfilePage',
    mainEntity: createPersonReference(),
    about: [createPersonReference(), createProfessionalServiceReference(), ...about],
  })
}

export function createCollectionPageSchema({ name, description, path, items = [], about = [], image }) {
  return withContext({
    '@type': 'CollectionPage',
    '@id': getWebPageId(path),
    url: getAbsoluteUrl(path),
    name,
    description,
    isPartOf: createWebsiteReference(),
    breadcrumb: {
      '@id': getBreadcrumbId(path),
    },
    about: about.map((item) => createThing(item)),
    mainEntity: createItemList(path, items),
    primaryImageOfPage: image ? getAbsoluteUrl(image) : undefined,
    inLanguage: schemaLanguage,
  })
}

export function createServiceSchema(service) {
  const offeredItems = (service.deliverableItems || []).map((item) => item.title)
  const fallbackItems = service.deliverables || []
  const itemList = [...offeredItems, ...fallbackItems].slice(0, 6)
  const path = `/services/${service.slug}`

  return withContext({
    '@type': 'Service',
    '@id': getServiceId(service.slug),
    name: service.title,
    description: service.metaDescription,
    serviceType: service.title,
    provider: createProfessionalServiceReference(),
    areaServed: createPlaceList(siteConfig.serviceMarkets),
    url: getAbsoluteUrl(path),
    mainEntityOfPage: {
      '@id': getWebPageId(path),
    },
    audience: {
      '@type': 'Audience',
      audienceType: service.idealFor,
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: getAbsoluteUrl(path),
      availableLanguage: [schemaLanguage],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} scope`,
      itemListElement: itemList.map((item) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: item,
        },
      })),
    },
  })
}

export function createArticleSchema(post) {
  const path = `/blog/${post.slug}`

  return withContext({
    '@type': 'Article',
    '@id': getArticleId(post.slug),
    headline: post.title,
    description: post.metaDescription,
    alternativeHeadline: post.excerpt,
    author: createPersonReference(),
    publisher: createProfessionalServiceReference(),
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@id': getWebPageId(path),
    },
    isPartOf: createWebsiteReference(),
    image: getAbsoluteUrl(post.image || siteConfig.baseOgImage),
    articleSection: post.categoryName || post.category,
    keywords: (post.keywords || []).join(', '),
    audience: post.audience
      ? {
          '@type': 'Audience',
          audienceType: post.audience,
        }
      : undefined,
    about: [post.categoryName || post.category, ...createServiceReferences(post.relatedServiceSlugs)],
    inLanguage: schemaLanguage,
    isAccessibleForFree: true,
  })
}

export function createCaseStudySchema(project) {
  const path = `/portfolio/${project.slug}`

  return withContext({
    '@type': 'CreativeWork',
    '@id': getCaseStudyId(project.slug),
    name: project.title,
    headline: project.title,
    description: project.metaDescription || project.seoDescription,
    abstract: project.shortResult,
    genre: 'Case Study',
    about: [project.platform, project.category, project.industry, project.clientType],
    author: createPersonReference(),
    creator: createPersonReference(),
    publisher: createProfessionalServiceReference(),
    url: getAbsoluteUrl(path),
    mainEntityOfPage: {
      '@id': getWebPageId(path),
    },
    image: getAbsoluteUrl(project.cover || siteConfig.baseOgImage),
    keywords: [project.platform, project.industry, project.clientType, project.category].filter(Boolean).join(', '),
    mentions: createServiceReferences(project.relatedServiceSlugs),
  })
}

export function createCaseStudyPageSchema(project) {
  return createWebPageSchema({
    path: `/portfolio/${project.slug}`,
    title: project.metaTitle || `${project.title} Case Study | Hasnain Saeed`,
    description: project.metaDescription || project.seoDescription,
    image: project.cover || siteConfig.baseOgImage,
    mainEntity: createCaseStudyReference(project.slug),
    about: [project.platform, project.category, project.industry, project.clientType, createProfessionalServiceReference()],
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

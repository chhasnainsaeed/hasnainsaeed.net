import { getBlogPath, getProjectPath, getServicePath, routes } from '../utils/routes'
import { siteConfig } from '../utils/site'

const shareImages = {
  default: siteConfig.baseOgImage,
  home: '/images/project-mapx-cover.png',
  about: '/images/project-suave-cover.png',
  services: '/images/project-mapx-cover.png',
  portfolio: '/images/project-feyre-cover.png',
  blog: '/images/project-pixeltrue-cover.png',
  contact: '/images/project-suave-cover.png',
  packages: '/images/project-mapx-cover.png',
}

const brandKeywords = [
  'hasnain saeed portfolio',
  'freelance web developer pakistan',
  'hire web developer pakistan',
  'freelance web developer for international clients',
]

const platformKeywords = ['shopify developer pakistan', 'wordpress developer pakistan', 'webflow developer pakistan']

const geoIntentKeywords = [
  'freelance shopify developer pakistan',
  'shopify expert pakistan',
  'hire wordpress developer pakistan',
  'remote webflow developer',
]

function mergeKeywords(...groups) {
  return Array.from(new Set(groups.flat().filter(Boolean)))
}

function trimMetaDescription(value, maxLength = 160) {
  if (!value) return value
  if (value.length <= maxLength) return value

  const trimmed = value.slice(0, maxLength + 1)
  const lastSpaceIndex = trimmed.lastIndexOf(' ')

  return `${trimmed.slice(0, lastSpaceIndex > 120 ? lastSpaceIndex : maxLength).trimEnd()}...`
}

function createMetadata({
  title,
  description,
  pathname,
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
  image = shareImages.default,
  type = 'website',
  author = siteConfig.name,
  publishedTime,
  modifiedTime,
  keywords = [],
}) {
  const resolvedTitle = title || siteConfig.siteTitle
  const resolvedDescription = description || siteConfig.description
  const resolvedOgTitle = ogTitle || resolvedTitle
  const resolvedOgDescription = ogDescription || resolvedDescription

  return {
    title: resolvedTitle,
    description: trimMetaDescription(resolvedDescription),
    pathname,
    ogTitle: resolvedOgTitle,
    ogDescription: trimMetaDescription(resolvedOgDescription),
    twitterTitle: twitterTitle || resolvedOgTitle,
    twitterDescription: trimMetaDescription(twitterDescription || resolvedOgDescription),
    image,
    type,
    author,
    publishedTime,
    modifiedTime,
    keywords,
  }
}

const staticPageMetadata = {
  home: createMetadata({
    title: 'Hasnain Saeed | Freelance Shopify, WordPress & Webflow Developer',
    description:
      'Freelance web developer in Pakistan helping international clients with Shopify, WordPress, Webflow, technical SEO, and QA-backed delivery.',
    pathname: routes.home,
    ogTitle: 'Hasnain Saeed | Freelance Shopify, WordPress & Webflow Developer',
    ogDescription:
      'Explore services, case studies, packages, and practical guides from a freelance Shopify, WordPress, and Webflow developer in Pakistan.',
    image: shareImages.home,
    keywords: mergeKeywords(brandKeywords, platformKeywords, geoIntentKeywords, [
      'hire shopify developer',
      'hire wordpress developer',
      'hire webflow developer',
    ]),
  }),
  about: createMetadata({
    title: 'About Hasnain Saeed | Freelance Web Developer in Pakistan',
    description:
      'Hasnain Saeed, freelance Shopify, WordPress and Webflow developer from Pakistan. QA-backed builds with direct collaboration from start to launch.',
    pathname: routes.about,
    image: shareImages.about,
    keywords: mergeKeywords(brandKeywords, platformKeywords, ['about hasnain saeed', 'web developer pakistan']),
  }),
  services: createMetadata({
    title: 'Hire Hasnain Saeed | Shopify, WordPress & Webflow Developer Services',
    description:
      'Hire Hasnain Saeed in Pakistan for Shopify, WordPress, and Webflow development, plus QA, bug fixing, and technical SEO setup.',
    pathname: routes.services,
    image: shareImages.services,
    keywords: mergeKeywords(brandKeywords, platformKeywords, geoIntentKeywords, [
      'hire shopify developer',
      'hire wordpress developer',
      'hire webflow developer',
    ]),
  }),
  portfolio: createMetadata({
    title: 'Hasnain Saeed Portfolio | Shopify, WordPress & Webflow Case Studies',
    description:
      'Explore the Hasnain Saeed portfolio with Shopify, WordPress, and Webflow case studies, screenshots, technical notes, outcomes, and live-site references.',
    pathname: routes.portfolio,
    image: shareImages.portfolio,
    keywords: mergeKeywords(brandKeywords, ['web developer portfolio pakistan', 'shopify portfolio', 'wordpress portfolio', 'webflow portfolio']),
  }),
  packages: createMetadata({
    title: 'Web Development Packages | Hasnain Saeed',
    description:
      'Compare website packages for startup sites, growth builds, premium implementation, and ongoing support before requesting a tailored project scope.',
    pathname: routes.packages,
    image: shareImages.packages,
    keywords: mergeKeywords(brandKeywords, ['web development packages', 'freelance developer packages', 'website pricing pakistan']),
  }),
  blog: createMetadata({
    title: 'Hasnain Saeed Blog | Shopify, WordPress & Webflow Insights',
    description:
      'Read practical insights from Hasnain Saeed on Shopify, WordPress, Webflow, technical SEO, website performance, QA, and implementation quality.',
    pathname: routes.blog,
    image: shareImages.blog,
    keywords: mergeKeywords(brandKeywords, ['web development blog pakistan', 'technical seo blog', 'shopify wordpress webflow blog']),
  }),
  contact: createMetadata({
    title: 'Hire Hasnain Saeed | Freelance Web Developer in Pakistan',
    description:
      'Hire Hasnain Saeed, a freelance web developer in Pakistan. Share your Shopify, WordPress, Webflow, or support scope.',
    pathname: routes.contact,
    image: shareImages.contact,
    keywords: mergeKeywords(brandKeywords, platformKeywords, geoIntentKeywords, ['contact hasnain saeed', 'hire freelance web developer']),
  }),
  notFound: createMetadata({
    title: 'Page Not Found | Hasnain Saeed',
    description: "The page you requested does not exist on Hasnain Saeed's website.",
    pathname: '/404',
    image: shareImages.default,
  }),
}

export function getStaticPageMetadata(pageKey) {
  return staticPageMetadata[pageKey] || staticPageMetadata.home
}

export function getProjectMetadata(project) {
  return createMetadata({
    title: project.seoTitle || `${project.title} | Case Study | Hasnain Saeed`,
    description: project.metaDescription || project.shortResult || project.heroSummary || siteConfig.description,
    pathname: getProjectPath(project.slug),
    ogTitle: project.ogTitle || project.title,
    ogDescription: project.metaDescription || project.heroSummary || project.shortResult || siteConfig.description,
    image: project.cover || shareImages.portfolio,
    keywords: Array.from(
      new Set(
        [
          project.platform,
          project.category,
          `${project.platform} case study`,
          `${project.platform} portfolio`,
          project.clientName,
          'case study',
          'portfolio',
        ].filter(Boolean),
      ),
    ),
  })
}

export function getBlogPostMetadata(post) {
  return createMetadata({
    title: post.metaTitle || `${post.title} | Hasnain Saeed`,
    description: post.metaDescription || post.excerpt || siteConfig.description,
    pathname: getBlogPath(post.slug),
    ogTitle: post.title,
    ogDescription: post.excerpt || post.metaDescription || siteConfig.description,
    image: post.image || shareImages.blog,
    type: 'article',
    author: siteConfig.name,
    publishedTime: post.date,
    modifiedTime: post.date,
    keywords: post.keywords || [],
  })
}

export function getServiceMetadata(service) {
  return createMetadata({
    title: service.metaTitle || `${service.title} by Hasnain Saeed`,
    description: service.metaDescription || service.intro || service.summary || siteConfig.description,
    pathname: getServicePath(service.slug),
    ogTitle: service.ogTitle || service.title,
    ogDescription: service.metaDescription || service.summary || service.intro || siteConfig.description,
    image: service.image || shareImages.services,
    keywords: service.keywords || [],
  })
}

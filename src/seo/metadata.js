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
    keywords,
  }
}

const staticPageMetadata = {
  home: createMetadata({
    title: 'Hasnain Saeed | Freelance Shopify, WordPress & Webflow Developer in Pakistan',
    description:
      'Hire Hasnain Saeed for Shopify, WordPress, and Webflow development, bug fixing, technical SEO setup, UI implementation, and ongoing website support.',
    pathname: routes.home,
    ogTitle: 'Freelance Shopify, WordPress & Webflow Developer',
    ogDescription:
      'Explore services, case studies, packages, and practical guides for businesses that need a dependable freelance web developer.',
    image: shareImages.home,
  }),
  about: createMetadata({
    title: 'About Hasnain Saeed | Shopify, WordPress & Webflow Developer',
    description:
      'Learn how Hasnain Saeed approaches Shopify, WordPress, and Webflow projects with direct communication, QA-minded delivery, and technical implementation discipline.',
    pathname: routes.about,
    image: shareImages.about,
  }),
  services: createMetadata({
    title: 'Shopify, WordPress & Webflow Services | Hasnain Saeed',
    description:
      'Review Shopify, WordPress, and Webflow development services, plus landing pages, QA, bug fixing, UI implementation, and technical SEO setup.',
    pathname: routes.services,
    image: shareImages.services,
  }),
  portfolio: createMetadata({
    title: 'Shopify, WordPress & Webflow Case Studies | Hasnain Saeed',
    description:
      'Review detailed case studies covering Shopify, WordPress, and Webflow projects with screenshots, technical notes, outcomes, and live-site references.',
    pathname: routes.portfolio,
    image: shareImages.portfolio,
  }),
  packages: createMetadata({
    title: 'Web Development Packages | Hasnain Saeed',
    description:
      'Compare website packages for startup sites, growth builds, premium implementation, and ongoing support before requesting a tailored project scope.',
    pathname: routes.packages,
    image: shareImages.packages,
  }),
  blog: createMetadata({
    title: 'Shopify, WordPress & Webflow Insights | Hasnain Saeed',
    description:
      'Read practical insights on Shopify, WordPress, Webflow, technical SEO, website performance, QA, and implementation quality.',
    pathname: routes.blog,
    image: shareImages.blog,
  }),
  contact: createMetadata({
    title: 'Contact Hasnain Saeed | Web Development Inquiries',
    description:
      'Start a project with Hasnain Saeed. Share your scope, platform, timeline, and goals for Shopify, WordPress, Webflow, optimization, or support work.',
    pathname: routes.contact,
    image: shareImages.contact,
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
    keywords: Array.from(new Set([project.platform, project.category, 'case study', 'portfolio'].filter(Boolean))),
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

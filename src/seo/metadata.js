import { getBlogPath, getProjectPath, routes } from '../utils/routes'
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
    description: resolvedDescription,
    pathname,
    ogTitle: resolvedOgTitle,
    ogDescription: resolvedOgDescription,
    twitterTitle: twitterTitle || resolvedOgTitle,
    twitterDescription: twitterDescription || resolvedOgDescription,
    image,
    type,
    keywords,
  }
}

const staticPageMetadata = {
  home: createMetadata({
    title: 'Freelance Web Developer for Shopify, WordPress, and Webflow | Hasnain Saeed',
    description:
      'Hire Hasnain Saeed for Shopify, WordPress, and Webflow development, technical SEO foundations, bug fixing, UI implementation, and ongoing website support.',
    pathname: routes.home,
    ogTitle: 'Freelance Web Developer for Shopify, WordPress, and Webflow',
    ogDescription:
      'Explore services, case studies, packages, and practical guides for businesses that need a dependable freelance web developer.',
    image: shareImages.home,
  }),
  about: createMetadata({
    title: 'About Hasnain Saeed | Freelance Web Developer',
    description:
      'Learn how Hasnain Saeed approaches Shopify, WordPress, and Webflow projects with direct communication, QA-minded delivery, and technical implementation discipline.',
    pathname: routes.about,
    image: shareImages.about,
  }),
  services: createMetadata({
    title: 'Web Development Services | Shopify, WordPress, Webflow, SEO, QA',
    description:
      'Review freelance web development services covering Shopify, WordPress, Webflow, optimization, UI implementation, QA support, and SEO-ready website structure.',
    pathname: routes.services,
    image: shareImages.services,
  }),
  portfolio: createMetadata({
    title: 'Portfolio Case Studies | Shopify, WordPress, and Webflow Projects',
    description:
      'Review detailed case studies covering Shopify, WordPress, and Webflow projects with screenshots, technical notes, outcomes, and live-site references.',
    pathname: routes.portfolio,
    image: shareImages.portfolio,
  }),
  packages: createMetadata({
    title: 'Website Packages and Pricing Guidance | Hasnain Saeed',
    description:
      'Compare website packages for startup sites, growth builds, premium implementation, and ongoing support before requesting a tailored project scope.',
    pathname: routes.packages,
    image: shareImages.packages,
  }),
  blog: createMetadata({
    title: 'Web Development Insights and Guides | Hasnain Saeed',
    description:
      'Read practical insights on Shopify, WordPress, Webflow, technical SEO, website performance, QA, and implementation quality.',
    pathname: routes.blog,
    image: shareImages.blog,
  }),
  contact: createMetadata({
    title: 'Contact Hasnain Saeed | Freelance Web Developer',
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
    title: `${project.title} Case Study | Hasnain Saeed`,
    description: project.shortResult || project.heroSummary || siteConfig.description,
    pathname: getProjectPath(project.slug),
    ogTitle: project.title,
    ogDescription: project.heroSummary || project.shortResult || siteConfig.description,
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

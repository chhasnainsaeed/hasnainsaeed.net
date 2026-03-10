import {
  getBlogCategoryPath,
  getBlogPath,
  getProjectPath,
  getServicePath,
  routes,
} from '../utils/routes'
import { siteConfig } from '../utils/site'

const shareImages = {
  default: siteConfig.baseOgImage,
  home: '/images/project-suave.svg',
  about: '/images/project-suave.svg',
  services: '/images/project-wordpress.svg',
  portfolio: '/images/project-shopify.svg',
  blog: '/images/project-webflow.svg',
  contact: '/images/project-suave.svg',
  packages: '/images/project-optimization.svg',
}

const serviceShareImages = {
  'shopify-development': '/images/project-shopify.svg',
  'wordpress-development': '/images/project-wordpress.svg',
  'webflow-development': '/images/project-webflow.svg',
  'woocommerce-development': '/images/project-optimization.svg',
  'website-speed-optimization': '/images/project-optimization.svg',
  'website-maintenance-support': '/images/project-qa.svg',
  'figma-to-website-development': '/images/project-webflow.svg',
  'ui-ux-implementation': '/images/project-suave.svg',
  'bug-fixing-qa-support': '/images/project-qa.svg',
}

const blogCategoryShareImages = {
  'platform-selection-and-project-planning': '/images/project-suave.svg',
  'ecommerce-growth-and-store-optimization': '/images/project-shopify.svg',
  'performance-maintenance-and-qa': '/images/project-optimization.svg',
  'design-to-development-and-ui-implementation': '/images/project-webflow.svg',
  'conversion-and-service-website-strategy': '/images/project-wordpress.svg',
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
    canonicalPath: pathname,
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
    title: 'Freelance Web Developer for Shopify, WordPress, Webflow, and WooCommerce | Hasnain Saeed',
    description:
      'Hire Hasnain Saeed, a freelance web developer for Shopify, WordPress, Webflow, and WooCommerce projects. Get conversion-focused builds, website optimization, bug fixes, and ongoing support.',
    pathname: routes.home,
    ogTitle: 'Need a Freelance Web Developer for Shopify, WordPress, or Webflow? | Hasnain Saeed',
    ogDescription:
      'Explore services, case studies, and direct support for Shopify, WordPress, Webflow, WooCommerce, website optimization, and ongoing maintenance.',
    image: shareImages.home,
    keywords: [
      'freelance web developer',
      'shopify developer',
      'wordpress developer',
      'webflow developer',
      'woocommerce developer',
      'website optimization',
      'website maintenance',
    ],
  }),
  about: createMetadata({
    title: 'About Hasnain Saeed | Freelance Web Developer for Premium Website Builds',
    description:
      'Learn how Hasnain Saeed works across Shopify, WordPress, Webflow, and WooCommerce to deliver clean implementation, technical quality, and ongoing support for international clients.',
    pathname: routes.about,
    ogTitle: 'Meet Hasnain Saeed, the Freelance Developer Behind the Work',
    ogDescription:
      'See how Hasnain approaches Shopify, WordPress, Webflow, and WooCommerce projects with direct communication, QA-minded delivery, and long-term maintainability.',
    image: shareImages.about,
  }),
  services: createMetadata({
    title: 'Freelance Web Development Services | Shopify, WordPress, Webflow, WooCommerce, Speed, Support',
    description:
      'Explore Shopify, WordPress, Webflow, WooCommerce, speed optimization, maintenance, Figma-to-website, and QA support services by Hasnain Saeed.',
    pathname: routes.services,
    ogTitle: 'Explore Web Development Services by Platform and Scope | Hasnain Saeed',
    ogDescription:
      'Compare platform builds, optimization work, maintenance support, Figma implementation, and QA services before starting your project.',
    image: shareImages.services,
  }),
  portfolio: createMetadata({
    title: 'Web Development Case Studies | Shopify, WordPress, Webflow, Optimization | Hasnain Saeed',
    description:
      'Review detailed case studies from Hasnain Saeed covering Shopify, WordPress, Webflow, ecommerce optimization, and QA-backed website improvements.',
    pathname: routes.portfolio,
    ogTitle: 'See Real Shopify, WordPress, and Webflow Case Studies | Hasnain Saeed',
    ogDescription:
      'Browse proof-focused case studies that explain the business goal, the implementation work, the technology used, and the result.',
    image: shareImages.portfolio,
  }),
  blog: createMetadata({
    title: 'Web Development Insights and SEO Guides | Hasnain Saeed',
    description:
      'Read practical articles on Shopify, WordPress, Webflow, WooCommerce, website optimization, maintenance, and high-converting service websites.',
    pathname: routes.blog,
    ogTitle: 'Read Web Development Guides and Platform Insights | Hasnain Saeed',
    ogDescription:
      'Explore practical guides on platform selection, ecommerce growth, website speed, maintenance, QA, and conversion-focused website structure.',
    image: shareImages.blog,
  }),
  contact: createMetadata({
    title: 'Contact Hasnain Saeed | Freelance Shopify, WordPress, Webflow, and WooCommerce Developer',
    description:
      'Start a project with Hasnain Saeed. Share your platform, scope, timeline, and goals for Shopify, WordPress, Webflow, WooCommerce, optimization, or support work.',
    pathname: routes.contact,
    ogTitle: 'Book a Consultation With Hasnain Saeed | Freelance Web Developer',
    ogDescription:
      'Send your project scope, platform, timeline, and goals to get a direct reply on fit, likely scope, and the best next step.',
    image: shareImages.contact,
  }),
  packages: createMetadata({
    title: 'Website Packages and Pricing Guidance | Freelance Web Development by Hasnain Saeed',
    description:
      'Review structured website packages for startups, growth-focused rebuilds, premium implementations, and ongoing support before requesting a custom scope.',
    pathname: routes.packages,
    ogTitle: 'Compare Website Package Paths Before You Inquire | Hasnain Saeed',
    ogDescription:
      'Use the package page to understand likely scope, support level, and pricing direction before requesting a tailored proposal.',
    image: shareImages.packages,
  }),
}

function getServiceShareImage(slug) {
  return serviceShareImages[slug] || shareImages.services
}

function getBlogCategoryShareImage(slug) {
  return blogCategoryShareImages[slug] || shareImages.blog
}

export function getStaticPageMetadata(pageKey) {
  return staticPageMetadata[pageKey] || staticPageMetadata.home
}

export function getServiceMetadata(service) {
  return createMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    pathname: getServicePath(service.slug),
    ogTitle: service.heroTitle || service.title,
    ogDescription: service.heroDescription || service.quoteSummary || service.summary || service.metaDescription,
    image: getServiceShareImage(service.slug),
  })
}

export function getProjectMetadata(project) {
  return createMetadata({
    title: project.metaTitle || `${project.title} Case Study | Hasnain Saeed`,
    description: project.metaDescription || project.seoDescription,
    pathname: getProjectPath(project.slug),
    ogTitle: project.title,
    ogDescription: project.shortResult || project.heroSummary || project.metaDescription || project.seoDescription,
    image: project.cover || shareImages.portfolio,
  })
}

export function getBlogCategoryMetadata(category) {
  return createMetadata({
    title: category.metaTitle,
    description: category.metaDescription,
    pathname: getBlogCategoryPath(category.slug),
    ogTitle: category.heroTitle || category.name,
    ogDescription: category.heroDescription || category.description || category.metaDescription,
    image: getBlogCategoryShareImage(category.slug),
    keywords: category.keywordThemes || [],
  })
}

export function getBlogPostMetadata(post) {
  return createMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    pathname: getBlogPath(post.slug),
    ogTitle: post.title,
    ogDescription: post.excerpt || post.intro || post.metaDescription,
    image: post.image || getBlogCategoryShareImage(post.categorySlug),
    type: 'article',
    keywords: post.keywords || [],
  })
}

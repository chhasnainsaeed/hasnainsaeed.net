import { routes } from './routes.js'

export const siteConfig = {
  name: 'Hasnain Saeed',
  shortName: 'Hasnain',
  jobTitle: 'Freelance Shopify, WordPress & Webflow Developer',
  siteTitle: 'Hasnain Saeed | Freelance Shopify, WordPress & Webflow Developer in Pakistan',
  description:
    'Hasnain Saeed is a freelance Shopify, WordPress, and Webflow developer in Pakistan helping US, UK, and Canada clients with website builds, technical SEO foundations, bug fixing, UI implementation, and ongoing support.',
  authorBio:
    'Hasnain Saeed is a freelance web developer in Pakistan helping US, UK, and Canada clients build, improve, and maintain Shopify, WordPress, and Webflow websites with a focus on content clarity, technical quality, and dependable execution.',
  firstPersonIntro:
    "I'm Hasnain Saeed, a freelance Shopify, WordPress, and Webflow developer from Pakistan working with US, UK, and Canada clients. I build, refine, and launch websites with cleaner structure, dependable frontend implementation, and QA-backed delivery.",
  firstPersonDifferentiator:
    'Most of the work I take on already has direction behind it. Clients hire me as a freelance web developer for US clients and international teams when they need direct collaboration, careful QA, and a live site that feels polished, performs reliably, and stays manageable after launch.',
  url: 'https://hasnainsaeed.net',
  locale: 'en_US',
  contactEmail: 'hello@hasnainsaeed.net',
  contactPhone: '+923496295916',
  whatsAppUrl: 'https://api.whatsapp.com/send?phone=923496295916',
  availability: 'Available for freelance projects',
  responseTimeNote: 'Most project inquiries receive a reply within one business day.',
  baseOgImage: '/images/project-mapx-cover.png',
  headshotImage: '/images/hasnain-email-signature.jpg',
  sameAs: [],
  serviceMarkets: ['USA', 'UK', 'Canada', 'International'],
  location: 'Pakistan',
  timezoneNote: 'Remote collaboration across USA, UK, Canada, and international time zones.',
  directContactNote: 'You speak directly with Hasnain from first reply to delivery.',
  corePlatforms: ['Shopify', 'WordPress', 'Webflow', 'WooCommerce'],
}

export const defaultKeywords = [
  'hasnain saeed portfolio',
  'freelance web developer',
  'freelance web developer pakistan',
  'hire web developer pakistan',
  'shopify developer',
  'shopify developer pakistan',
  'wordpress developer',
  'wordpress developer pakistan',
  'webflow developer',
  'webflow developer pakistan',
  'technical seo',
  'website maintenance',
  'website optimization',
  'ui implementation',
  'bug fixing',
]

export function normalizePublicPath(pathname = '/') {
  const normalizedInput = pathname.startsWith('/') ? pathname : `/${pathname}`

  if (normalizedInput === '/') return '/'

  const [, pathOnly = '/', suffix = ''] = normalizedInput.match(/^([^?#]*)(.*)$/) || []
  const trimmedPath = pathOnly.replace(/\/+$/, '') || '/'
  const hasFileExtension = /\.[a-z0-9]+$/i.test(trimmedPath)

  if (trimmedPath === '/' || hasFileExtension) {
    return `${trimmedPath}${suffix}`
  }

  return `${trimmedPath}/${suffix}`
}

export function getAbsoluteUrl(pathname = '/') {
  return new URL(normalizePublicPath(pathname), siteConfig.url).toString()
}

export function getWhatsAppUrl(message = '') {
  const url = new URL(siteConfig.whatsAppUrl)

  if (message) {
    url.searchParams.set('text', message)
  }

  return url.toString()
}

export const navLinks = [
  { name: 'Home', href: routes.home },
  { name: 'About', href: routes.about },
  { name: 'Services', href: routes.services },
  { name: 'Portfolio', href: routes.portfolio },
  { name: 'Packages', href: routes.packages },
  { name: 'Blog', href: routes.blog },
  { name: 'Contact', href: routes.contact },
]

export const trustStats = [
  { label: 'Years Experience', value: 5, suffix: '+' },
  { label: 'Live Case Studies', value: 11, suffix: '' },
  { label: 'Core Platforms', value: 4, suffix: '' },
  { label: 'Service Markets', value: 4, suffix: '' },
]

export const clientLogos = ['D2C Ecommerce', 'Service Businesses', 'SaaS Teams', 'Creative Agencies', 'Consulting Brands', 'Marketing Teams']

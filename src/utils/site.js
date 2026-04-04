import { routes } from './routes.js'

export const siteConfig = {
  name: 'Hasnain Saeed',
  shortName: 'Hasnain',
  jobTitle: 'Freelance Web Developer',
  siteTitle: 'Hasnain Saeed | Freelance Web Developer for Shopify, WordPress, and Webflow',
  description:
    'Hasnain Saeed is a freelance web developer helping businesses with Shopify, WordPress, and Webflow websites, technical SEO foundations, bug fixing, UI implementation, and ongoing website support.',
  authorBio:
    'Hasnain Saeed is a freelance web developer helping businesses build, improve, and maintain Shopify, WordPress, and Webflow websites with a focus on content clarity, technical quality, and dependable execution.',
  url: 'https://hasnainsaeed.net',
  locale: 'en_US',
  contactEmail: 'hello@hasnainsaeed.net',
  contactPhone: '+923496295916',
  whatsAppUrl: 'https://api.whatsapp.com/send?phone=923496295916',
  availability: 'Available for freelance projects',
  responseTimeNote: 'Most project inquiries receive a reply within one business day.',
  baseOgImage: '/images/project-mapx-cover.png',
  sameAs: [],
  serviceMarkets: ['USA', 'UK', 'Canada', 'International'],
  location: 'Pakistan',
  timezoneNote: 'Remote collaboration across USA, UK, Canada, and international time zones.',
  directContactNote: 'You speak directly with Hasnain from first reply to delivery.',
  corePlatforms: ['Shopify', 'WordPress', 'Webflow', 'WooCommerce'],
}

export const defaultKeywords = [
  'freelance web developer',
  'shopify developer',
  'wordpress developer',
  'webflow developer',
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

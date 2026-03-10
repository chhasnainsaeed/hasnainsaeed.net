import { routes } from './routes.js'

export const siteConfig = {
  name: 'Hasnain Saeed',
  shortName: 'Hasnain',
  jobTitle: 'Freelance Web Developer',
  siteTitle: 'Hasnain Saeed | Freelance Web Developer for Shopify, WordPress, Webflow, and WooCommerce',
  description:
    'Hasnain Saeed is a freelance web developer helping businesses with Shopify development, WordPress development, Webflow development, WooCommerce development, website optimization, bug fixing, and ongoing website maintenance.',
  answerSummary:
    'Hasnain Saeed is a freelance web developer who helps businesses build, improve, and maintain Shopify, WordPress, Webflow, and WooCommerce websites with a focus on conversion quality, speed, and dependable execution.',
  authorBio:
    'Hasnain Saeed is a freelance web developer helping businesses build high-converting websites, implement pixel-perfect UI, improve speed, fix technical issues, and provide ongoing support across Shopify, WordPress, Webflow, and WooCommerce.',
  url: 'https://hasnainsaeed.net',
  locale: 'en_US',
  contactEmail: 'hello@hasnainsaeed.net',
  availability: 'Available for freelance projects',
  responseTimeNote: 'Most project inquiries receive a reply within one business day.',
  baseOgImage: '/images/project-suave.svg',
  sameAs: [],
  serviceMarkets: ['USA', 'UK', 'Canada', 'International'],
  location: 'Pakistan',
  timezoneNote: 'Remote collaboration across USA, UK, Canada, and international time zones.',
  directContactNote: 'You speak directly with Hasnain. There is no sales layer or agency handoff.',
  corePlatforms: ['Shopify', 'WordPress', 'Webflow', 'WooCommerce'],
  bestFitClients:
    'Service businesses, ecommerce brands, agencies, SaaS teams, and founder-led companies that need a website to convert better, load faster, and stay easier to maintain.',
}

export const defaultKeywords = [
  'freelance web developer',
  'freelance Shopify developer',
  'freelance WordPress developer',
  'freelance Webflow developer',
  'WooCommerce developer',
  'website maintenance',
  'website optimization',
  'website speed optimization',
  'figma to website developer',
  'UI UX implementation developer',
  'bug fixing and QA support',
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

export const navLinks = [
  { name: 'Home', href: routes.home },
  { name: 'About', href: routes.about },
  { name: 'Services', href: routes.services },
  { name: 'Case Studies', href: routes.portfolio },
  { name: 'Packages', href: routes.packages },
  { name: 'Insights', href: routes.blog },
  { name: 'Contact', href: routes.contact },
]

export const platformProfiles = [
  {
    title: 'Shopify',
    description: 'Theme customization, storefront UX refinement, mobile buying-flow improvements, and launch-ready QA for ecommerce brands.',
    note: 'Best for stores that need clearer merchandising, stronger conversion flow, and cleaner performance.',
  },
  {
    title: 'WordPress',
    description: 'Lead-generation websites, service-page builds, content-structure cleanup, and editor-friendly implementation for business websites.',
    note: 'Best for service businesses, consultants, agencies, and teams that need flexible content control.',
  },
  {
    title: 'Webflow',
    description: 'Marketing sites, launch pages, CMS-backed landing pages, and polished design-to-development execution with responsive discipline.',
    note: 'Best for SaaS teams, creators, personal brands, and agencies with approved designs.',
  },
  {
    title: 'WooCommerce',
    description: 'Store UX improvements, template cleanup, plugin-friction reduction, and ecommerce QA for WordPress-based stores.',
    note: 'Best for ecommerce teams that need technical stability and a cleaner purchase path.',
  },
]

export const industryProfiles = [
  {
    title: 'D2C Ecommerce',
    description: 'Storefronts that need better product-page clarity, merchandising hierarchy, and stronger mobile conversion flow.',
  },
  {
    title: 'Service Businesses',
    description: 'Websites that need clearer positioning, stronger trust sections, and a better lead-generation structure.',
  },
  {
    title: 'SaaS Teams',
    description: 'Launch pages and marketing sites that need sharper message hierarchy, cleaner CTAs, and dependable frontend execution.',
  },
  {
    title: 'Creative Agencies',
    description: 'White-label or partner delivery where implementation quality, responsiveness, and QA have to stay dependable.',
  },
  {
    title: 'Consulting and Founder-Led Brands',
    description: 'Premium business sites that need a more credible digital presence without bloated process or agency overhead.',
  },
  {
    title: 'Marketing and Internal Teams',
    description: 'Ongoing implementation, landing-page updates, bug fixing, and support when there is no in-house developer.',
  },
]

export const projectTypeProfiles = [
  {
    title: 'Platform builds and rebuilds',
    description: 'New websites or major rebuilds across Shopify, WordPress, Webflow, and WooCommerce.',
  },
  {
    title: 'Figma-to-website implementation',
    description: 'Turning approved designs into production-ready pages with responsive quality and cleaner handoff.',
  },
  {
    title: 'Ecommerce UX and storefront refinement',
    description: 'Improving product pages, collections, cart flow, speed, and conversion-sensitive templates.',
  },
  {
    title: 'Service-page and landing-page optimization',
    description: 'Sharpening trust, message hierarchy, CTA visibility, and page flow on high-intent pages.',
  },
  {
    title: 'Speed, bug fixing, and QA support',
    description: 'Stabilizing live websites, reducing launch risk, and improving technical quality after the build.',
  },
]

export const supportPromisePoints = [
  'Direct communication from first scope discussion to delivery.',
  'QA before launch on important templates, forms, and conversion flows.',
  'Post-launch support available for fixes, updates, and follow-up improvements.',
  'Remote collaboration structured for clients in the USA, UK, Canada, and other international markets.',
]

export const stackTags = [
  'Shopify Liquid',
  'WordPress CMS',
  'Webflow CMS',
  'WooCommerce',
  'HTML',
  'CSS',
  'JavaScript',
  'Responsive QA',
  'Technical SEO',
  'Schema Markup',
  'Core Web Vitals',
  'GA4',
]

export const trustStats = [
  { label: 'Years Experience', value: 5, suffix: '+' },
  { label: 'Projects Delivered', value: 100, suffix: '+' },
  { label: 'Core Service Lines', value: 9, suffix: '' },
  { label: 'International Clients', value: 20, suffix: '+' },
]

export const resultStats = [
  { title: 'Faster Load Speed', value: 45, suffix: '%', note: 'Average improvement after a focused speed optimization sprint.' },
  { title: 'Conversion Lift', value: 30, suffix: '%', note: 'Typical uplift after clarifying CTA flow, hierarchy, and UX friction.' },
  { title: 'PageSpeed Benchmark', value: 90, suffix: '+', note: 'Target score for revenue-driving pages where speed directly impacts lead quality.' },
  { title: 'Responsive QA Coverage', value: 100, suffix: '%', note: 'Cross-device and cross-browser checks before launch or handoff.' },
  { title: 'Critical Bugs Resolved', value: 38, suffix: '+', note: 'Common issue volume addressed during QA-backed release cycles.' },
  { title: 'Script Bloat Reduced', value: 25, suffix: '%', note: 'Typical cleanup after removing unused scripts, app conflicts, and heavy assets.' },
]

export const clientLogos = ['D2C Ecommerce', 'Service Businesses', 'SaaS Teams', 'Creative Agencies', 'Consulting Brands', 'Marketing Teams']

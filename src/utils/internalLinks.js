import { getBlogCategoryBySlug } from '../data/blogCategories'
import { getBlogPostBySlug } from '../data/blogPosts'
import { getProjectBySlug } from '../data/projects'
import { getServiceBySlug } from '../data/services'
import { getBlogCategoryPath, getBlogPath, getProjectPath, getServicePath, routes } from './routes'

function compact(values) {
  return values.filter(Boolean)
}

function createServiceLink(slug, label, note) {
  const service = getServiceBySlug(slug)
  if (!service) return null

  return {
    label: label || service.title,
    to: getServicePath(service.slug),
    note: note || service.quoteSummary || service.summary,
  }
}

function createProjectLink(slug, label, note) {
  const project = getProjectBySlug(slug)
  if (!project) return null

  return {
    label: label || project.title,
    to: getProjectPath(project.slug),
    note: note || project.shortResult || project.heroSummary,
  }
}

function createPostLink(slug, label, note) {
  const post = getBlogPostBySlug(slug)
  if (!post) return null

  return {
    label: label || post.title,
    to: getBlogPath(post.slug),
    note: note || post.excerpt,
  }
}

function createCategoryLink(slug, label, note) {
  const category = getBlogCategoryBySlug(slug)
  if (!category) return null

  return {
    label: label || category.name,
    to: getBlogCategoryPath(category.slug),
    note: note || category.description,
  }
}

export const homeInternalLinkGroups = [
  {
    title: 'Need a new website or redesign build?',
    description: 'Start with the page that matches the platform and delivery model you need most.',
    links: compact([
      createServiceLink('wordpress-development', 'Plan a WordPress build'),
      createServiceLink('webflow-development', 'Launch in Webflow'),
      createServiceLink('figma-to-website-development', 'Turn Figma into a live website'),
      createProjectLink('suave-florida-website-revamp', 'See a service-website case study'),
    ]),
  },
  {
    title: 'Improving an ecommerce store?',
    description: 'These paths connect store development, proof, and supporting guidance around ecommerce growth.',
    links: compact([
      createServiceLink('shopify-development', 'Shopify storefront work'),
      createServiceLink('woocommerce-development', 'WooCommerce improvements'),
      createProjectLink('ecommerce-ux-revamp', 'Review ecommerce UX proof'),
      createCategoryLink('ecommerce-growth-and-store-optimization', 'Read ecommerce growth guides'),
    ]),
  },
  {
    title: 'Fixing performance or launch risk?',
    description: 'Use these pages when the site is already live but speed, stability, or release quality need attention.',
    links: compact([
      createServiceLink('website-speed-optimization', 'Improve website speed'),
      createServiceLink('website-maintenance-support', 'Get ongoing website support'),
      createServiceLink('bug-fixing-qa-support', 'Resolve bugs and QA risk'),
      createCategoryLink('performance-maintenance-and-qa', 'Browse performance and QA guidance'),
    ]),
  },
]

export const portfolioInternalLinkGroups = [
  {
    title: 'Match the proof to your scope',
    description: 'Use the closest service page if one of these case studies looks similar to your project.',
    links: compact([
      createServiceLink('shopify-development', 'Shopify development services'),
      createServiceLink('wordpress-development', 'WordPress development services'),
      createServiceLink('webflow-development', 'Webflow development services'),
      createServiceLink('woocommerce-development', 'WooCommerce development services'),
    ]),
  },
  {
    title: 'Need improvement work instead of a full rebuild?',
    description: 'These service lines fit projects where the website already exists but still needs technical or conversion-focused cleanup.',
    links: compact([
      createServiceLink('website-speed-optimization', 'Website speed optimization'),
      createServiceLink('website-maintenance-support', 'Website maintenance and support'),
      createServiceLink('bug-fixing-qa-support', 'Bug fixing and QA support'),
      createPostLink('website-speed-optimization-for-service-and-ecommerce-sites', 'Read the speed optimization guide'),
    ]),
  },
  {
    title: 'Move from proof to planning',
    description: 'These pages help turn the case studies into a clearer next step if you are still deciding on scope.',
    links: compact([
      { label: 'Browse all services', to: routes.services, note: 'See the full commercial service stack and choose the best fit.' },
      createCategoryLink('platform-selection-and-project-planning', 'Read planning and platform guides'),
      { label: 'Contact Hasnain', to: routes.contact, note: 'Send the current platform, blocker, and timeline for a direct response.' },
    ]),
  },
]

export const blogHubInternalLinkGroups = [
  {
    title: 'Choosing a platform or planning a project?',
    description: 'Start with the pages that help narrow the platform and scope before development begins.',
    links: compact([
      createCategoryLink('platform-selection-and-project-planning', 'Explore planning guides'),
      createServiceLink('wordpress-development', 'See WordPress project options'),
      createServiceLink('webflow-development', 'See Webflow project options'),
      createServiceLink('shopify-development', 'See Shopify project options'),
    ]),
  },
  {
    title: 'Want to connect articles to live services?',
    description: 'These service pages sit closest to the informational content in the archive.',
    links: compact([
      createServiceLink('website-speed-optimization', 'Website speed optimization'),
      createServiceLink('figma-to-website-development', 'Figma to website development'),
      createServiceLink('website-maintenance-support', 'Website maintenance and support'),
      { label: 'Review all service pages', to: routes.services, note: 'Use the service hub to compare build, optimization, and support options.' },
    ]),
  },
  {
    title: 'Need proof before making contact?',
    description: 'These case studies and contact paths support buyers moving from research into evaluation.',
    links: compact([
      { label: 'Browse case studies', to: routes.portfolio, note: 'See how strategy, implementation, QA, and performance work translate into live outcomes.' },
      createProjectLink('shopify-store-customization', 'See Shopify storefront proof'),
      createProjectLink('webflow-landing-page', 'See Webflow launch proof'),
      { label: 'Contact Hasnain', to: routes.contact, note: 'Share the platform and project goal to get the most practical next step.' },
    ]),
  },
]

export const contactInternalLinkGroups = [
  {
    title: 'Clarify the right scope first',
    description: 'If the project still feels broad, these pages narrow the service path before you send the inquiry.',
    links: compact([
      { label: 'Explore all services', to: routes.services, note: 'Use the services hub to compare builds, optimization, maintenance, and QA support.' },
      createServiceLink('figma-to-website-development', 'Review Figma-to-website work'),
      createServiceLink('website-speed-optimization', 'Review performance improvement work'),
      createCategoryLink('platform-selection-and-project-planning', 'Read planning guides'),
    ]),
  },
  {
    title: 'Review proof before you inquire',
    description: 'These pages help qualify fit if you want to compare recent project examples first.',
    links: compact([
      { label: 'Browse all case studies', to: routes.portfolio, note: 'See proof across Shopify, WordPress, Webflow, and QA-backed delivery.' },
      createProjectLink('ecommerce-ux-revamp', 'See ecommerce improvement proof'),
      createProjectLink('suave-florida-website-revamp', 'See service-website proof'),
      createProjectLink('qa-testing-resolution', 'See QA and bug-fixing proof'),
    ]),
  },
  {
    title: 'Read the buying and implementation context',
    description: 'Use these pages if you want more context around cost, planning, maintenance, or execution quality before contacting.',
    links: compact([
      createCategoryLink('conversion-and-service-website-strategy', 'Read service-website strategy guides'),
      createCategoryLink('performance-maintenance-and-qa', 'Read performance and QA guides'),
      createPostLink('figma-to-website-handoff-process', 'Read the Figma handoff guide'),
      createPostLink('website-qa-launch-checklist', 'Read the website QA checklist'),
    ]),
  },
]

export const footerLinkGroups = [
  {
    title: 'Core Pages',
    links: [
      { label: 'Home', to: routes.home },
      { label: 'About', to: routes.about },
      { label: 'Services', to: routes.services },
      { label: 'Case Studies', to: routes.portfolio },
      { label: 'Insights', to: routes.blog },
      { label: 'Contact', to: routes.contact },
    ],
  },
  {
    title: 'Core Services',
    links: compact([
      createServiceLink('shopify-development'),
      createServiceLink('wordpress-development'),
      createServiceLink('webflow-development'),
      createServiceLink('woocommerce-development'),
      createServiceLink('website-speed-optimization'),
      createServiceLink('website-maintenance-support'),
    ]),
  },
  {
    title: 'Proof and Planning',
    links: compact([
      createCategoryLink('platform-selection-and-project-planning', 'Platform planning guides'),
      createCategoryLink('performance-maintenance-and-qa', 'Performance and QA articles'),
      createProjectLink('shopify-store-customization', 'Shopify case study'),
      createProjectLink('suave-florida-website-revamp', 'WordPress case study'),
      { label: 'Start a project inquiry', to: routes.contact, note: 'Send the platform, blocker, and timeline for a direct response.' },
    ]),
  },
]

export function getServiceInternalLinkGroups({ relatedServices = [], relatedProjects = [], relatedPosts = [] }) {
  return [
    {
      title: 'Compare adjacent service paths',
      description: 'Use these links when the scope overlaps more than one bottleneck.',
      links: compact([
        ...relatedServices.slice(0, 3).map((service) => ({
          label: service.title,
          to: getServicePath(service.slug),
          note: service.quoteSummary || service.summary,
        })),
        { label: 'Browse all services', to: routes.services, note: 'Compare build, optimization, maintenance, and QA service paths in one place.' },
      ]),
    },
    {
      title: 'See similar proof',
      description: 'These case studies show how related work translated into live improvements.',
      links: compact([
        ...relatedProjects.slice(0, 2).map((project) => ({
          label: project.title,
          to: getProjectPath(project.slug),
          note: project.shortResult || project.heroSummary,
        })),
        { label: 'Browse all case studies', to: routes.portfolio, note: 'Review more proof across platforms, business types, and engagement models.' },
      ]),
    },
    {
      title: 'Read the supporting guidance',
      description: 'These articles add commercial and technical context before work begins.',
      links: compact([
        ...relatedPosts.slice(0, 2).map((post) => ({
          label: post.title,
          to: getBlogPath(post.slug),
          note: post.excerpt,
        })),
        { label: 'Browse all insights', to: routes.blog, note: 'Follow the topic clusters that support service selection and technical decision-making.' },
      ]),
    },
  ]
}

export function getProjectInternalLinkGroups({ relatedServices = [], relatedPosts = [], nextProject = null }) {
  return [
    {
      title: 'Hire for similar work',
      description: 'These service pages sit closest to the execution shown in this case study.',
      links: compact([
        ...relatedServices.slice(0, 3).map((service) => ({
          label: service.title,
          to: getServicePath(service.slug),
          note: service.quoteSummary || service.summary,
        })),
        { label: 'Review all services', to: routes.services, note: 'Compare platform builds, optimization, maintenance, and QA support.' },
      ]),
    },
    {
      title: 'Read the strategy behind the result',
      description: 'These guides explain the implementation and decision-making behind similar work.',
      links: compact([
        ...relatedPosts.slice(0, 2).map((post) => ({
          label: post.title,
          to: getBlogPath(post.slug),
          note: post.excerpt,
        })),
        { label: 'Browse the insights hub', to: routes.blog, note: 'Follow related articles across platform choice, optimization, and conversion strategy.' },
      ]),
    },
    {
      title: 'Continue through the proof stack',
      description: 'Stay in the proof path if you want to compare more examples before inquiring.',
      links: compact([
        nextProject
          ? {
              label: `Next case study: ${nextProject.title}`,
              to: getProjectPath(nextProject.slug),
              note: nextProject.shortResult || nextProject.heroSummary,
            }
          : null,
        { label: 'Browse all case studies', to: routes.portfolio, note: 'See more work across Shopify, WordPress, Webflow, ecommerce optimization, and QA.' },
        { label: 'Contact Hasnain', to: routes.contact, note: 'Share the current project and ask for a similar scope recommendation.' },
      ]),
    },
  ]
}

export function getBlogPostInternalLinkGroups({ category, relatedServices = [], relatedProjects = [], relatedPosts = [] }) {
  return [
    {
      title: 'Apply this to a live site',
      description: 'These service pages turn the guidance in the article into implementation work.',
      links: compact([
        ...relatedServices.slice(0, 3).map((service) => ({
          label: service.title,
          to: getServicePath(service.slug),
          note: service.quoteSummary || service.summary,
        })),
        { label: 'See all services', to: routes.services, note: 'Compare the service paths connected to planning, build quality, optimization, and support.' },
      ]),
    },
    {
      title: 'See proof behind the advice',
      description: 'These case studies show how similar recommendations were implemented on live projects.',
      links: compact([
        ...relatedProjects.slice(0, 2).map((project) => ({
          label: project.title,
          to: getProjectPath(project.slug),
          note: project.shortResult || project.heroSummary,
        })),
        { label: 'Browse all case studies', to: routes.portfolio, note: 'Review more proof across platforms and business goals.' },
      ]),
    },
    {
      title: 'Continue this topic path',
      description: 'Use these links to stay inside the same cluster or move toward a direct next step.',
      links: compact([
        category
          ? {
              label: category.name,
              to: getBlogCategoryPath(category.slug),
              note: category.description,
            }
          : null,
        ...relatedPosts.slice(0, 2).map((post) => ({
          label: post.title,
          to: getBlogPath(post.slug),
          note: post.excerpt,
        })),
        { label: 'Contact Hasnain', to: routes.contact, note: 'Use the contact page when the question has turned into an active project need.' },
      ]),
    },
  ]
}

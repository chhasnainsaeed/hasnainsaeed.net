import { blogPosts } from '../data/blogPosts'
import { projects } from '../data/projects'
import { services } from '../data/services'

const projectContentMap = {
  wordpress: {
    serviceSlug: 'wordpress-development',
    postSlugs: ['wordpress-speed-tips', 'website-maintenance-priorities', 'technical-seo-launch-checklist'],
  },
  shopify: {
    serviceSlug: 'shopify-store-development',
    postSlugs: ['shopify-optimization-playbook', 'technical-seo-launch-checklist'],
  },
  webflow: {
    serviceSlug: 'webflow-development',
    postSlugs: ['webflow-best-practices', 'landing-page-ui-implementation', 'technical-seo-launch-checklist'],
  },
}

function uniqueBySlug(items) {
  return items.filter((item, index, collection) => collection.findIndex((candidate) => candidate.slug === item.slug) === index)
}

export function getServicesBySlugs(slugs = []) {
  return uniqueBySlug(
    slugs
      .map((slug) => services.find((service) => service.slug === slug))
      .filter(Boolean),
  )
}

export function getProjectsBySlugs(slugs = []) {
  return uniqueBySlug(
    slugs
      .map((slug) => projects.find((project) => project.slug === slug))
      .filter(Boolean),
  )
}

export function getBlogPostsBySlugs(slugs = []) {
  return uniqueBySlug(
    slugs
      .map((slug) => blogPosts.find((post) => post.slug === slug))
      .filter(Boolean),
  )
}

export function getRelatedPostsForService(service) {
  return getBlogPostsBySlugs(service.relatedPosts || [])
}

export function getRelatedProjectsForService(service) {
  return getProjectsBySlugs(service.relatedProjects || [])
}

export function getRelatedServicesForPost(post) {
  return getServicesBySlugs(post.relatedServices || [])
}

export function getRelatedProjectsForPost(post) {
  return getProjectsBySlugs(post.relatedProjects || [])
}

export function getPrimaryServiceForProject(project) {
  const platformKey = (project.platform || project.category || '').toLowerCase()
  const serviceSlug = projectContentMap[platformKey]?.serviceSlug

  return serviceSlug ? services.find((service) => service.slug === serviceSlug) : undefined
}

export function getRelatedPostsForProject(project) {
  const platformKey = (project.platform || project.category || '').toLowerCase()

  return getBlogPostsBySlugs(projectContentMap[platformKey]?.postSlugs || [])
}

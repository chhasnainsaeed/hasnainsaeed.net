import { blogPosts } from '../data/blogPosts'
import { blogTopicOutlines } from '../data/blogTopicOutlines'
import { projects } from '../data/projects'
import { services } from '../data/services'

export function getRelatedServices(slugs = []) {
  return services.filter((service) => slugs.includes(service.slug))
}

export function getRelatedProjects(slugs = []) {
  return projects.filter((project) => slugs.includes(project.slug))
}

export function getRelatedPosts(slugs = []) {
  return blogPosts.filter((post) => slugs.includes(post.slug))
}

export function sortPostsByDate(items) {
  return [...items].sort((left, right) => new Date(right.date) - new Date(left.date))
}

export function getFeaturedPosts(limit = 3) {
  return sortPostsByDate(blogPosts.filter((post) => post.featured)).slice(0, limit)
}

export function getPostsByCategory(categorySlug) {
  return sortPostsByDate(blogPosts.filter((post) => post.categorySlug === categorySlug))
}

export function getTopicOutlinesByCategory(categorySlug) {
  return blogTopicOutlines.filter((topic) => topic.categorySlug === categorySlug)
}

export function getRecommendedPosts(post, limit = 3) {
  const explicit = getRelatedPosts(post.relatedPostSlugs || []).filter((candidate) => candidate.slug !== post.slug)
  const fallback = sortPostsByDate(
    blogPosts.filter((candidate) => {
      if (candidate.slug === post.slug) return false

      const sharesCategory = candidate.categorySlug && candidate.categorySlug === post.categorySlug
      const sharesService = (candidate.relatedServiceSlugs || []).some((slug) => (post.relatedServiceSlugs || []).includes(slug))

      return sharesCategory || sharesService
    })
  )

  return Array.from(new Map([...explicit, ...fallback].map((candidate) => [candidate.slug, candidate])).values()).slice(0, limit)
}

import { blogCategories } from '../data/blogCategories.js'
import { blogPosts } from '../data/blogPosts.js'
import { projects } from '../data/projects.js'
import { services } from '../data/services.js'
import { getBlogCategoryPath, getBlogPath, getProjectPath, getServicePath, routes } from '../utils/routes.js'

export const baseRoutes = [routes.home, routes.about, routes.services, routes.portfolio, routes.packages, routes.blog, routes.contact]

export function getPrerenderRoutes() {
  return [
    ...baseRoutes,
    ...services.map((service) => getServicePath(service.slug)),
    ...projects.map((project) => getProjectPath(project.slug)),
    ...blogCategories.map((category) => getBlogCategoryPath(category.slug)),
    ...blogPosts.map((post) => getBlogPath(post.slug)),
  ]
}

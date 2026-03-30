import { blogPosts } from '../data/blogPosts.js'
import { projects } from '../data/projects.js'
import { services } from '../data/services.js'
import { getBlogPath, getProjectPath, getServicePath, routes } from '../utils/routes.js'

export const baseRoutes = [routes.home, routes.about, routes.services, routes.portfolio, routes.packages, routes.blog, routes.contact]

export function getPrerenderRoutes() {
  return [
    ...baseRoutes,
    ...services.map((service) => getServicePath(service.slug)),
    ...projects.map((project) => getProjectPath(project.slug)),
    ...blogPosts.map((post) => getBlogPath(post.slug)),
  ]
}

export const routes = {
  home: '/',
  about: '/about',
  services: '/services',
  portfolio: '/portfolio',
  packages: '/packages',
  blog: '/blog',
  contact: '/contact',
}

export function getServicePath(slug) {
  return `${routes.services}/${slug}`
}

export function getProjectPath(slug) {
  return `${routes.portfolio}/${slug}`
}

export function getBlogPath(slug) {
  return `${routes.blog}/${slug}`
}

export function getBlogCategoryPath(slug) {
  return `${routes.blog}/category/${slug}`
}

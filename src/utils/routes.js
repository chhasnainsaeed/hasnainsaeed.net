export const routes = {
  home: '/',
  about: '/about',
  services: '/services',
  portfolio: '/portfolio',
  packages: '/packages',
  blog: '/blog',
  contact: '/contact',
}

export function getProjectPath(slug) {
  return `${routes.portfolio}/${slug}`
}

export function getBlogPath(slug) {
  return `${routes.blog}/${slug}`
}

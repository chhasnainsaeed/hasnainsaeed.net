export const routes = {
  home: '/',
  about: '/about',
  services: '/services',
  portfolio: '/portfolio',
  packages: '/packages',
  blog: '/blog',
  contact: '/contact',
}

export function getRouteHref(pathname = '/') {
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

export function getProjectPath(slug) {
  return getRouteHref(`${routes.portfolio}/${slug}`)
}

export function getBlogPath(slug) {
  return getRouteHref(`${routes.blog}/${slug}`)
}

export function getServicePath(slug) {
  return getRouteHref(`${routes.services}/${slug}`)
}

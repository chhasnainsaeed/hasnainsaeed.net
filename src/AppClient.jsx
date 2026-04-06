import { useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import RouteLoadingFallback from './components/ui/RouteLoadingFallback'
import { routes } from './utils/routes'

function loadablePage(loader) {
  let LoadedComponent = null
  let pendingPromise = null

  const load = async () => {
    if (LoadedComponent) return LoadedComponent

    pendingPromise ??= loader().then((module) => {
      LoadedComponent = module.default
      return LoadedComponent
    })

    return pendingPromise
  }

  function LoadablePage() {
    const [Component, setComponent] = useState(() => LoadedComponent)

    useEffect(() => {
      if (Component) return undefined

      let cancelled = false

      void load().then((ResolvedComponent) => {
        if (!cancelled) {
          setComponent(() => ResolvedComponent)
        }
      })

      return () => {
        cancelled = true
      }
    }, [Component])

    return Component ? <Component /> : <RouteLoadingFallback />
  }

  LoadablePage.preload = load

  return LoadablePage
}

function normalizePathname(pathname = '/') {
  const [pathOnly = '/'] = pathname.split(/[?#]/, 1)

  if (!pathOnly || pathOnly === '/') return '/'

  return pathOnly.endsWith('/') ? pathOnly.slice(0, -1) : pathOnly
}

const HomePage = loadablePage(() => import('./pages/HomePage'))
const AboutPage = loadablePage(() => import('./pages/AboutPage'))
const ServicesPage = loadablePage(() => import('./pages/ServicesPage'))
const ServiceDetailPage = loadablePage(() => import('./pages/ServiceDetailPage'))
const PortfolioPage = loadablePage(() => import('./pages/PortfolioPage'))
const ProjectDetailPage = loadablePage(() => import('./pages/ProjectDetailPage'))
const PackagesPage = loadablePage(() => import('./pages/PackagesPage'))
const BlogPage = loadablePage(() => import('./pages/BlogPage'))
const BlogDetailPage = loadablePage(() => import('./pages/BlogDetailPage'))
const ContactPage = loadablePage(() => import('./pages/ContactPage'))
const NotFoundPage = loadablePage(() => import('./pages/NotFoundPage'))

const clientRoutePreloaders = [
  { test: (pathname) => pathname === routes.home, preload: HomePage.preload },
  { test: (pathname) => pathname === routes.about, preload: AboutPage.preload },
  { test: (pathname) => pathname === routes.services, preload: ServicesPage.preload },
  { test: (pathname) => pathname.startsWith(`${routes.services}/`), preload: ServiceDetailPage.preload },
  { test: (pathname) => pathname === routes.portfolio, preload: PortfolioPage.preload },
  { test: (pathname) => pathname.startsWith(`${routes.portfolio}/`), preload: ProjectDetailPage.preload },
  { test: (pathname) => pathname === routes.packages, preload: PackagesPage.preload },
  { test: (pathname) => pathname === routes.blog, preload: BlogPage.preload },
  { test: (pathname) => pathname.startsWith(`${routes.blog}/`), preload: BlogDetailPage.preload },
  { test: (pathname) => pathname === routes.contact, preload: ContactPage.preload },
  { test: () => true, preload: NotFoundPage.preload },
]

export function preloadRouteModule(pathname = '/') {
  const normalizedPathname = normalizePathname(pathname)
  const match = clientRoutePreloaders.find((item) => item.test(normalizedPathname))

  return match ? match.preload() : Promise.resolve()
}

export default function AppClient() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'about', element: <AboutPage /> },
        { path: 'services', element: <ServicesPage /> },
        { path: 'services/:slug', element: <ServiceDetailPage /> },
        { path: 'portfolio', element: <PortfolioPage /> },
        { path: 'portfolio/:slug', element: <ProjectDetailPage /> },
        { path: 'packages', element: <PackagesPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'blog/:slug', element: <BlogDetailPage /> },
        { path: 'contact', element: <ContactPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ])
}

import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import HomePage from './pages/HomePage'

const AboutPage = lazy(() => import('./pages/AboutPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'))
const PackagesPage = lazy(() => import('./pages/PackagesPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function AppRoutes() {
  const element = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'about', element: <AboutPage /> },
        { path: 'services', element: <ServicesPage /> },
        { path: 'portfolio', element: <PortfolioPage /> },
        { path: 'portfolio/:slug', element: <ProjectDetailPage /> },
        { path: 'packages', element: <PackagesPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'contact', element: <ContactPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ])

  return element
}

export default function App() {
  return <AppRoutes />
}

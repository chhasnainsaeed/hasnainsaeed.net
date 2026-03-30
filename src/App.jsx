import { useRoutes } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import PortfolioPage from './pages/PortfolioPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import PackagesPage from './pages/PackagesPage'
import BlogPage from './pages/BlogPage'
import BlogDetailPage from './pages/BlogDetailPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

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
        { path: 'blog/:slug', element: <BlogDetailPage /> },
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

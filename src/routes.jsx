import MainLayout from './components/layout/MainLayout'
import AboutPage from './pages/AboutPage'
import BlogDetailPage from './pages/BlogDetailPage'
import BlogCategoryPage from './pages/BlogCategoryPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import PackagesPage from './pages/PackagesPage'
import PortfolioPage from './pages/PortfolioPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import ServicesPage from './pages/ServicesPage'

export const appRoutes = [
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
      { path: 'blog/category/:slug', element: <BlogCategoryPage /> },
      { path: 'blog/:slug', element: <BlogDetailPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

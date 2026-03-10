import { Link } from 'react-router-dom'
import Seo from '../seo/Seo'
import { routes } from '../utils/routes'

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page Not Found | Hasnain Saeed" description="The page you are looking for could not be found." pathname="/404" noindex />
      <section className="section-pad py-24">
        <div className="section-wrap premium-card p-10 text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">404</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Page not found</h1>
          <p className="mt-3 text-zinc-300">The page you requested does not exist or has moved. Use the main navigation or return to the homepage.</p>
          <Link to={routes.home} className="mt-6 inline-flex rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black">
            Return Home
          </Link>
        </div>
      </section>
    </>
  )
}

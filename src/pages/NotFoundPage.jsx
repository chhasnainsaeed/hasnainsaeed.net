import { Link } from 'react-router-dom'
import Seo from '../seo/Seo'
import { getStaticPageMetadata } from '../seo/metadata'
import { getRouteHref, routes } from '../utils/routes'

export default function NotFoundPage() {
  const metadata = getStaticPageMetadata('notFound')

  return (
    <>
      <Seo
        title={metadata.title}
        description={metadata.description}
        pathname={metadata.pathname}
        ogTitle={metadata.ogTitle}
        ogDescription={metadata.ogDescription}
        twitterTitle={metadata.twitterTitle}
        twitterDescription={metadata.twitterDescription}
        image={metadata.image}
        noindex
      />
      <section className="section-pad py-24">
        <div className="section-wrap premium-card p-10 text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">404</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Page not found</h1>
          <p className="mt-3 text-zinc-300">The page you requested does not exist or is no longer part of the current site structure.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to={getRouteHref(routes.home)} className="inline-flex rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black">
              Return Home
            </Link>
            <Link
              to={getRouteHref(routes.portfolio)}
              className="inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-zinc-200"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

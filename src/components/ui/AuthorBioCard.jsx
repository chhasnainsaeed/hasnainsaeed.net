import { Link } from 'react-router-dom'
import { getRelatedServices } from '../../utils/content'
import { getServicePath, routes } from '../../utils/routes'
import { siteConfig } from '../../utils/site'
import ButtonLink from './ButtonLink'

const defaultServiceSlugs = [
  'shopify-development',
  'wordpress-development',
  'webflow-development',
  'website-speed-optimization',
]

export default function AuthorBioCard({ serviceSlugs = [] }) {
  const visibleServices = getRelatedServices(serviceSlugs.length ? serviceSlugs : defaultServiceSlugs).slice(0, 4)

  return (
    <section className="premium-card p-6 sm:p-8" aria-labelledby="author-bio-heading">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-orange-300/90">About the Author</p>
          <h2 id="author-bio-heading" className="mt-2 text-2xl font-semibold text-white">
            Who is {siteConfig.name}?
          </h2>
        </div>
        <div className="inline-flex rounded-full border border-emerald-400/35 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-emerald-300">
          {siteConfig.availability}
        </div>
      </div>

      <p className="mt-4 max-w-3xl text-zinc-300">{siteConfig.answerSummary}</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-sm font-semibold text-white">Key facts</p>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-zinc-400">Role</dt>
              <dd className="mt-2 text-sm text-zinc-100">{siteConfig.jobTitle}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-zinc-400">Core platforms</dt>
              <dd className="mt-2 text-sm text-zinc-100">{siteConfig.corePlatforms.join(', ')}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-zinc-400">Best-fit clients</dt>
              <dd className="mt-2 text-sm text-zinc-100">{siteConfig.bestFitClients}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-zinc-400">Markets served</dt>
              <dd className="mt-2 text-sm text-zinc-100">{siteConfig.serviceMarkets.join(', ')}</dd>
            </div>
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">
            {visibleServices.map((service) => (
              <Link
                key={service.slug}
                to={getServicePath(service.slug)}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-zinc-200 transition hover:border-orange-300/60 hover:text-orange-200"
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-sm font-semibold text-white">What can he help with?</p>
          <p className="mt-2 text-sm text-zinc-300">
            Shopify development, WordPress development, Webflow development, WooCommerce development, website optimization, website maintenance, Figma to website delivery, and QA-backed technical support.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <ButtonLink to={routes.contact}>Book Consultation</ButtonLink>
            <ButtonLink to={routes.about} variant="ghost">
              About Hasnain
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}

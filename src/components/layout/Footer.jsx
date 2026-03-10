import { Link } from 'react-router-dom'
import ButtonLink from '../ui/ButtonLink'
import { routes } from '../../utils/routes'
import { footerLinkGroups } from '../../utils/internalLinks'
import { siteConfig } from '../../utils/site'

export default function Footer() {
  return (
    <footer className="section-pad pb-10 pt-20">
      <div className="section-wrap premium-card p-7 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.8fr_0.9fr_1fr]">
          <div>
            <p className="text-xl font-semibold text-white">Hasnain Saeed</p>
            <p className="mt-3 max-w-sm text-zinc-300">
              Freelance web developer for Shopify, WordPress, Webflow, and WooCommerce projects, website optimization, bug fixing, and ongoing website maintenance.
            </p>

            <div className="mt-5 inline-flex rounded-full border border-emerald-400/35 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-emerald-300">
              {siteConfig.availability}
            </div>

            <div className="mt-5 space-y-2 text-sm text-zinc-300">
              <p>
                <span className="text-zinc-400">Email:</span>{' '}
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-orange-300 transition hover:text-orange-200">
                  {siteConfig.contactEmail}
                </a>
              </p>
              <p>
                <span className="text-zinc-400">Markets:</span> {siteConfig.serviceMarkets.join(', ')}
              </p>
              <p>
                <span className="text-zinc-400">Location:</span> {siteConfig.location}
              </p>
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">{siteConfig.responseTimeNote}</p>
            </div>

            <ButtonLink to={routes.contact} className="mt-6">
              Book Consultation
            </ButtonLink>
          </div>

          {footerLinkGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-400">{group.title}</h3>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {group.links.map((item) => (
                  <li key={`${group.title}-${item.to}`}>
                    <Link className="inline-flex text-sm font-medium transition hover:text-orange-300" to={item.to}>
                      {item.label}
                    </Link>
                    {item.note ? <p className="mt-1 text-sm text-zinc-500">{item.note}</p> : null}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-sm text-zinc-400 sm:flex sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} Hasnain Saeed. All rights reserved.</p>
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-zinc-500 sm:mt-0">Built for speed and conversion</p>
        </div>
      </div>
    </footer>
  )
}

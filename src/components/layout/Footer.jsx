import { Link } from 'react-router-dom'
import ButtonLink from '../ui/ButtonLink'
import { navLinks, siteConfig } from '../../utils/site'

export default function Footer() {
  return (
    <footer className="section-pad pb-10 pt-20">
      <div className="section-wrap premium-card p-7 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="text-xl font-semibold text-white">Hasnain Saeed</p>
            <p className="mt-3 max-w-sm text-zinc-300">
              Freelance web developer for Shopify, WordPress, and Webflow projects that need cleaner execution, stronger structure, and reliable launch support.
            </p>

            <div className="mt-5 inline-flex rounded-full border border-emerald-400/35 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-emerald-300">
              {siteConfig.availability}
            </div>

            <div className="mt-5 space-y-1 text-sm text-zinc-300">
              <p>
                <span className="text-zinc-400">Email:</span>{' '}
                <a href={`mailto:${siteConfig.contactEmail}`} className="transition hover:text-orange-300">
                  {siteConfig.contactEmail}
                </a>
              </p>
              <p>
                <span className="text-zinc-400">WhatsApp:</span>{' '}
                <a href={siteConfig.whatsAppUrl} target="_blank" rel="noreferrer" className="transition hover:text-orange-300">
                  {siteConfig.contactPhone}
                </a>
              </p>
              <p>
                <span className="text-zinc-400">Location:</span> {siteConfig.location}
              </p>
              <p>
                <span className="text-zinc-400">Markets:</span> {siteConfig.serviceMarkets.join(', ')}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to="/contact">Book Consultation</ButtonLink>
              <ButtonLink href={siteConfig.whatsAppUrl} variant="ghost" target="_blank" rel="noreferrer">
                Chat on WhatsApp
              </ButtonLink>
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-400">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-zinc-300">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link className="inline-flex rounded-md px-1 py-1 transition hover:text-orange-300" to={link.href}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-400">Work Setup</h3>
            <div className="mt-4 space-y-4 text-sm text-zinc-300">
              <p>{siteConfig.responseTimeNote}</p>
              <p>{siteConfig.timezoneNote}</p>
              <p>{siteConfig.directContactNote}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-sm text-zinc-400 sm:flex sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} Hasnain Saeed. All rights reserved.</p>
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-zinc-500 sm:mt-0">Built for speed and conversion</p>
        </div>
      </div>
    </footer>
  )
}

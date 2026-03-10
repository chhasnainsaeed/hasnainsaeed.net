import { Link } from 'react-router-dom'
import { services } from '../../data/services'
import { getServicePath, routes } from '../../utils/routes'
import { siteConfig } from '../../utils/site'
import ButtonLink from '../ui/ButtonLink'

const trustBullets = [
  'Shopify, WordPress, Webflow, and WooCommerce project delivery',
  'Conversion-focused implementation, website optimization, and QA',
  'Remote collaboration for USA, UK, Canada, and international clients',
]

const primaryServiceSlugs = [
  'shopify-development',
  'wordpress-development',
  'webflow-development',
  'woocommerce-development',
  'website-speed-optimization',
  'website-maintenance-support',
]

const supportServiceSlugs = ['figma-to-website-development', 'ui-ux-implementation', 'bug-fixing-qa-support']

const primaryServices = services.filter((service) => primaryServiceSlugs.includes(service.slug))
const supportServices = services.filter((service) => supportServiceSlugs.includes(service.slug))

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-12 sm:px-8 sm:pb-24 lg:px-14 lg:pt-16">
      <div className="section-wrap">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_8%_10%,rgba(255,115,0,0.18),transparent_38%),radial-gradient(circle_at_92%_18%,rgba(255,77,45,0.16),transparent_34%),linear-gradient(145deg,#0d0f14,#080a0f)] p-6 sm:p-9 lg:p-12">
          <div className="absolute -left-16 top-24 h-56 w-56 rounded-full bg-orange-500/20 blur-[90px]" aria-hidden="true" />
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-red-500/16 blur-[95px]" aria-hidden="true" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-orange-300/90">Hasnain Saeed | Freelance Web Developer</p>

              <h1 className="max-w-[18ch] text-[2.25rem] font-semibold leading-[1.08] text-white sm:text-[3.2rem] xl:text-[4rem]">
                Freelance Web Developer
                <span className="block text-gradient">for Shopify, WordPress,</span>
                Webflow, and WooCommerce
              </h1>

              <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-zinc-300 sm:text-lg">
                I help businesses build high-converting websites, implement pixel-perfect UI, improve website optimization, fix technical issues, and provide ongoing website maintenance without agency overhead.
              </p>
              <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-zinc-400 sm:text-base">
                Work includes Shopify development, WordPress development, Webflow development, WooCommerce development, Figma to website delivery, bug fixing, QA support, and post-launch maintenance.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink to={routes.contact}>Book Consultation</ButtonLink>
                <ButtonLink to={routes.portfolio} variant="ghost">
                  View Work
                </ButtonLink>
              </div>

              <ul className="mt-7 grid gap-3 sm:grid-cols-3">
                {trustBullets.map((bullet) => (
                  <li key={bullet} className="rounded-2xl border border-white/12 bg-white/[0.03] px-4 py-4 text-sm text-zinc-200">
                    <span className="mb-3 inline-flex h-2.5 w-2.5 rounded-full bg-orange-300" aria-hidden="true" />
                    <p>{bullet}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative lg:pl-2">
              <div className="premium-card relative p-5 sm:p-6 lg:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">Core Services</p>
                  <span className="rounded-2xl border border-orange-300/30 bg-orange-500/12 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-orange-200">
                    {siteConfig.availability}
                  </span>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {primaryServices.map((service, index) => (
                    <Link
                      key={service.slug}
                      to={getServicePath(service.slug)}
                      className={`rounded-2xl border p-4 text-sm transition duration-300 hover:-translate-y-1 hover:border-orange-300/45 hover:bg-orange-500/[0.08] ${
                        index === 0 ? 'border-orange-400/40 bg-orange-500/[0.08]' : 'border-white/12 bg-white/[0.03]'
                      }`}
                    >
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-orange-300/30 bg-orange-500/12 text-[11px] font-semibold uppercase tracking-[0.12em] text-orange-200">
                        {service.icon}
                      </span>
                      <h3 className="mt-3 text-base font-semibold text-white">{service.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-300">{service.summary}</p>
                    </Link>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-white/12 bg-black/25 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Also Available For</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {supportServices.map((service) => (
                      <Link
                        key={service.slug}
                        to={getServicePath(service.slug)}
                        className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-200 transition hover:border-orange-300/45 hover:text-orange-200"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                    Based in Pakistan and working remotely with {siteConfig.serviceMarkets.join(', ')} clients who need stronger implementation quality, clearer conversion flow, and dependable support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

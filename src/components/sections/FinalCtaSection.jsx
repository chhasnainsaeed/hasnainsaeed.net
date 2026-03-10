import ButtonLink from '../ui/ButtonLink'
import Reveal from '../ui/Reveal'
import { routes } from '../../utils/routes'

export default function FinalCtaSection() {
  return (
    <section className="section-pad py-24">
      <div className="section-wrap">
        <Reveal className="premium-card p-8 text-center sm:p-14">
          <p className="text-xs uppercase tracking-[0.28em] text-orange-300/90">Ready to Start</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">Need a freelance web developer who can actually ship the work?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-300">
            Whether you need Shopify development, a WordPress rebuild, a Webflow landing page, WooCommerce fixes, website optimization, or ongoing website maintenance, the next step is a clear conversation about scope and priorities.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink to={routes.contact}>Book Consultation</ButtonLink>
            <ButtonLink to={routes.portfolio} variant="ghost">
              View Work
            </ButtonLink>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs uppercase tracking-[0.16em] text-zinc-300">
            <span className="rounded-full border border-white/15 px-3 py-1">Fast Response</span>
            <span className="rounded-full border border-white/15 px-3 py-1">USA, UK, Canada, and International Clients</span>
            <span className="rounded-full border border-white/15 px-3 py-1">Maintenance Available After Launch</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

import ButtonLink from '../ui/ButtonLink'
import Reveal from '../ui/Reveal'
import { siteConfig } from '../../utils/site'

export default function FinalCtaSection() {
  return (
    <section className="section-pad py-24">
      <div className="section-wrap">
        <Reveal className="premium-card p-8 text-center sm:p-14">
          <p className="text-xs uppercase tracking-[0.28em] text-orange-300/90">Ready to Start</p>
          <h2 className="mx-auto mt-4 max-w-[16ch] text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-[3.2rem]">
            Let's Build a Website That Converts
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-300">
            Need a premium, high-performing website for your business? Let's discuss goals, scope, and a practical launch plan.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/contact">Book Consultation</ButtonLink>
            <ButtonLink href={siteConfig.whatsAppUrl} variant="ghost" target="_blank" rel="noreferrer">
              Message on WhatsApp
            </ButtonLink>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs uppercase tracking-[0.16em] text-zinc-300">
            <span className="rounded-full border border-white/15 px-3 py-1">Fast Response</span>
            <span className="rounded-full border border-white/15 px-3 py-1">International Clients Welcome</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

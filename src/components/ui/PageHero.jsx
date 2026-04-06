import Breadcrumbs from './Breadcrumbs'
import Reveal from './Reveal'

export default function PageHero({ eyebrow, title, description, breadcrumbs = [] }) {
  return (
    <section className="section-pad pb-12 pt-16 sm:pb-16 sm:pt-20">
      <div className="section-wrap">
        <Reveal className="premium-card overflow-hidden p-8 sm:p-12">
          {breadcrumbs.length ? <Breadcrumbs items={breadcrumbs} className="mb-5" /> : null}
          <p className="text-xs uppercase tracking-[0.28em] text-orange-300/90">{eyebrow}</p>
          <h1 className="mt-4 max-w-[22ch] text-balance text-[2.4rem] font-semibold leading-[1.06] tracking-[-0.035em] text-white sm:text-[3.2rem] lg:text-[4rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-[64ch] text-base leading-7 text-zinc-300 sm:text-lg">{description}</p>
        </Reveal>
      </div>
    </section>
  )
}

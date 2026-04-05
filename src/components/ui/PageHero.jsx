import Breadcrumbs from './Breadcrumbs'
import Reveal from './Reveal'

export default function PageHero({ eyebrow, title, description, breadcrumbs = [] }) {
  return (
    <section className="section-pad pb-12 pt-16 sm:pb-16 sm:pt-20">
      <div className="section-wrap">
        <Reveal className="premium-card overflow-hidden p-8 sm:p-12">
          {breadcrumbs.length ? <Breadcrumbs items={breadcrumbs} className="mb-5" /> : null}
          <p className="text-xs uppercase tracking-[0.28em] text-orange-300/90">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg text-zinc-300">{description}</p>
        </Reveal>
      </div>
    </section>
  )
}

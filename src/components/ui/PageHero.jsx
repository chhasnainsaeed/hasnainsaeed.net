import Reveal from './Reveal'
import Breadcrumbs from './Breadcrumbs'

export default function PageHero({ eyebrow, title, description, breadcrumbs = [], chips = [], actions = null, children = null }) {
  return (
    <section className="section-pad pb-12 pt-16 sm:pb-16 sm:pt-20">
      <div className="section-wrap">
        <Reveal className="premium-card overflow-hidden p-8 sm:p-12" priority>
          <Breadcrumbs items={breadcrumbs} />
          <p className="text-xs uppercase tracking-[0.28em] text-orange-300/90">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg text-zinc-300">{description}</p>
          {chips.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <span key={chip} className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-zinc-200">
                  {chip}
                </span>
              ))}
            </div>
          ) : null}
          {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
          {children}
        </Reveal>
      </div>
    </section>
  )
}
